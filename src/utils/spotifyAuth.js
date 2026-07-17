// src/utils/spotifyAuth.js
//
// Spotify authentication using the Authorization Code with PKCE flow.
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
//
// Notes:
// - This is a pure client-side app (no server to keep a secret on), so PKCE
//   is the correct flow here - never the deprecated Implicit Grant, and
//   never Authorization Code without PKCE (that needs a client secret).
// - Tokens are kept in sessionStorage rather than localStorage. That still
//   isn't XSS-proof, but it at least doesn't persist across browser
//   restarts / tabs the way localStorage does.
// - The client ID is provided by the app at runtime via setClientId() (the
//   existing redux flow already fetches it through loadInitialConfig), with
//   a REACT_APP_SPOTIFY_CLIENT_ID env var as a fallback for convenience.

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Only the scopes this app actually needs for playlist/library management -
// no broad scopes requested "just in case".
// https://developer.spotify.com/documentation/web-api/concepts/scopes
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private'
].join(' ');

const STORAGE_KEYS = {
    verifier: 'spotify_code_verifier',
    state: 'spotify_auth_state',
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expiresAt: 'spotify_expires_at'
};

let cachedClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || null;

export function setClientId(clientId) {
    if (clientId) {
        cachedClientId = clientId;
    }
}

function getClientId() {
    if (!cachedClientId) {
        throw new Error(
            'Spotify client ID is not set yet. Call setClientId() once it is ' +
            'available, or set REACT_APP_SPOTIFY_CLIENT_ID in your .env file.'
        );
    }
    return cachedClientId;
}

// Spotify only accepts https redirect URIs, with one documented exception:
// http://127.0.0.1 (any port) for local development. http://localhost and
// wildcard URIs are both rejected.
// https://developer.spotify.com/documentation/web-api/concepts/redirect_uri
function getRedirectUri() {
    return `${window.location.origin}/callback/`;
}

function randomString(length) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function sha256(plain) {
    const data = new TextEncoder().encode(plain);
    return crypto.subtle.digest('SHA-256', data);
}

function base64UrlEncode(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

/**
 * fetch() wrapper that retries on 429 / 5xx with exponential backoff,
 * honoring a Retry-After header when Spotify sends one.
 * https://developer.spotify.com/documentation/web-api/concepts/rate-limits
 */
export async function fetchWithBackoff(url, options = {}, maxRetries = 4) {
    for (let attempt = 0; ; attempt += 1) {
        const response = await fetch(url, options);

        const shouldRetry = response.status === 429 || response.status >= 500;
        if (!shouldRetry || attempt >= maxRetries) {
            return response;
        }

        const retryAfterHeader = response.headers.get('Retry-After');
        const waitMs = retryAfterHeader
            ? Number(retryAfterHeader) * 1000
            : Math.min(1000 * 2 ** attempt, 15000);

        await new Promise(resolve => setTimeout(resolve, waitMs));
    }
}

/**
 * Redirects the browser to Spotify's consent screen to start login.
 * Call this from a click handler (not automatically), since it navigates
 * away from the app.
 */
export async function redirectToSpotifyLogin() {
    const clientId = getClientId();
    const codeVerifier = randomString(64);
    const state = randomString(16);
    const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

    sessionStorage.setItem(STORAGE_KEYS.verifier, codeVerifier);
    sessionStorage.setItem(STORAGE_KEYS.state, state);

    const url = new URL(SPOTIFY_AUTHORIZE_URL);
    url.search = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: getRedirectUri(),
        scope: SCOPES,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state
    }).toString();

    window.location.href = url.toString();
}

function persistTokenResponse(json) {
    sessionStorage.setItem(STORAGE_KEYS.accessToken, json.access_token);
    sessionStorage.setItem(
        STORAGE_KEYS.expiresAt,
        String(Date.now() + json.expires_in * 1000)
    );
    if (json.refresh_token) {
        sessionStorage.setItem(STORAGE_KEYS.refreshToken, json.refresh_token);
    }
    return json.access_token;
}

async function postToken(body) {
    const response = await fetchWithBackoff(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body)
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            (json && (json.error_description || json.error)) ||
            `Spotify token request failed (HTTP ${response.status})`;
        throw new Error(message);
    }
    return json;
}

/**
 * Call this once from whichever route Spotify redirects back to
 * (the redirect_uri above) with the `code` and `state` query params it
 * received. Resolves with a fresh access token on success.
 */
export async function handleAuthorizationCallback(code, state) {
    const expectedState = sessionStorage.getItem(STORAGE_KEYS.state);
    sessionStorage.removeItem(STORAGE_KEYS.state);
    if (!state || state !== expectedState) {
        throw new Error('Login state did not match - please try logging in again.');
    }

    const codeVerifier = sessionStorage.getItem(STORAGE_KEYS.verifier);
    sessionStorage.removeItem(STORAGE_KEYS.verifier);
    if (!codeVerifier) {
        throw new Error('Missing PKCE code verifier - please try logging in again.');
    }

    const json = await postToken({
        client_id: getClientId(),
        grant_type: 'authorization_code',
        code,
        redirect_uri: getRedirectUri(),
        code_verifier: codeVerifier
    });

    return persistTokenResponse(json);
}

async function refreshAccessToken() {
    const refreshToken = sessionStorage.getItem(STORAGE_KEYS.refreshToken);
    if (!refreshToken) {
        return null;
    }

    try {
        const json = await postToken({
            client_id: getClientId(),
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });
        return persistTokenResponse(json);
    } catch (err) {
        // Refresh token expired or was revoked - the user has to go through
        // the full login flow again.
        clearStoredTokens();
        return null;
    }
}

export function clearStoredTokens() {
    Object.values(STORAGE_KEYS).forEach(key => sessionStorage.removeItem(key));
}

export function getStoredAccessToken() {
    return sessionStorage.getItem(STORAGE_KEYS.accessToken) || '';
}

/**
 * Returns a currently-valid access token, transparently refreshing it if
 * it has expired (or is about to, within the next 30s). Returns '' if the
 * user needs to log in again.
 */
export async function getValidAccessToken() {
    const expiresAt = Number(sessionStorage.getItem(STORAGE_KEYS.expiresAt) || 0);
    if (Date.now() < expiresAt - 30000) {
        return getStoredAccessToken();
    }
    const refreshed = await refreshAccessToken();
    return refreshed || '';
}

/**
 * Authenticated fetch against the Spotify Web API - attaches a valid
 * access token and retries with backoff on 429 / 5xx.
 *
 * Always check endpoint paths, params and response shapes against the
 * OpenAPI schema rather than guessing:
 * https://developer.spotify.com/reference/web-api/open-api-schema.yaml
 *
 * Prefer the current, non-deprecated endpoints, e.g.:
 *   - /playlists/{id}/items   (not /playlists/{id}/tracks)
 *   - /me/library              (not the type-specific library endpoints)
 */
export async function spotifyApiFetch(path, options = {}) {
    const token = await getValidAccessToken();
    if (!token) {
        throw new Error('Not authenticated with Spotify.');
    }

    const response = await fetchWithBackoff(`${SPOTIFY_API_BASE}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 204) {
        return null;
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
        // Surface Spotify's own error message so the UI can show something
        // meaningful instead of a generic failure.
        const message =
            (json && json.error && json.error.message) ||
            `Spotify API request failed (HTTP ${response.status})`;
        throw new Error(message);
    }
    return json;
}