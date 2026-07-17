import { spotifyApiFetch } from '../utils/spotifyAuth';

export const ActionType = {
    FORCE_STATE: "FORCE_STATE",
    SET_ENVIRONMENT: "SET_ENVIRONMENT",

    // Spotify Client Id
    LOAD_CLIENT_ID: "LOAD_CLIENT_ID",
    SET_CLIENT_ID: "SET_CLIENT_ID",

    // Spotify Token
    SET_USER_TOKEN: "SET_USER_TOKEN",

    // User Profile
    LOAD_USER_PROFILE: "LOAD_USER_PROFILE",
    ADD_USER_PROFILE: "ADD_USER_PROFILE",

    // User PLaylists
    LOAD_USER_PLAYLISTS: "LOAD_USER_PLAYLISTS",
    ADD_USER_PLAYLISTS: "ADD_USER_PLAYLISTS",
    TOGGLE_USER_PLAYLIST: "TOGGLE_USER_PLAYLIST",

    // Library
    LOAD_LIBRARY_TRACKS: "LOAD_LIBRARY_TRACKS",
    APPEND_LIBRARY_TRACKS: "APPEND_LIBRARY_TRACKS",

    // Library Display
    LIBRARY_DISPLAY_PAGE_FIRST: "LIBRARY_DISPLAY_PAGE_FIRST",
    LIBRARY_DISPLAY_PAGE_PREVIOUS: "LIBRARY_DISPLAY_PAGE_PREVIOUS",
    LIBRARY_DISPLAY_PAGE_NEXT: "LIBRARY_DISPLAY_PAGE_NEXT",
    LIBRARY_DISPLAY_PAGE_LAST: "LIBRARY_DISPLAY_PAGE_LAST",
    LIBRARY_DISPLAY_PAGE_CHOOSE: "LIBRARY_DISPLAY_PAGE_CHOOSE",
    LIBRARY_DISPLAY_ROWS_CHOOSE: "LIBRARY_DISPLAY_ROWS_CHOOSE",
    CHANGE_LIBRARY_SORT: "CHANGE_LIBRARY_SORT",
    TOGGLE_LIBRARY_PLAYLIST_FILTER: "TOGGLE_LIBRARY_PLAYLIST_FILTER",
    TOGGLE_LIKED_SONGS_FILTER: "TOGGLE_LIKED_SONGS_FILTER",
    CHANGE_LIBRARY_FILTER: "CHANGE_LIBRARY_FILTER",

    // Liked songs
    ADD_LIKED_SONG: "ADD_LIKED_SONG",
    DELETE_LIKED_SONG: "DELETE_LIKED_SONG",

    // Playlist tracks
    LOAD_PLAYLIST_TRACKS: "LOAD_PLAYLIST_TRACKS",
    APPEND_PLAYLIST_TRACKS: "APPEND_PLAYLIST_TRACKS",
    ADD_PLAYLIST_TRACK: "ADD_PLAYLIST_TRACK",
    DELETE_PLAYLIST_TRACK: "DELETE_PLAYLIST_TRACK",

    // Loading Status
    IS_USER_PROFILE_LOADED: "IS_USER_PROFILE_LOADED",
    IS_PLAYLISTS_LIST_LOADED: "IS_PLAYLISTS_LIST_LOADED",
    IS_LIBRARY_LOADED: "IS_LIBRARY_LOADED",
    IS_PLAYLIST_LOADED: "IS_PLAYLIST_LOADED"
}

// other constants

export const LibrarySort = {
  DEFAULT: 0,
  TITLE: 1,
  ARTIST: 2,
  ALBUM: 3
}

export const ActionCreator = {
    forceState: (newState) => ({type: ActionType.FORCE_STATE, newState: newState}),
    setEnvironment: (environment) => ({type: ActionType.SET_ENVIRONMENT, environment: environment}),

    // Spotify Client Id & Project Config
    setClientId: (clientId) => ({type: ActionType.SET_CLIENT_ID, clientId: clientId}),
    loadInitialConfig: () => ((dispatch) => fetch("/config/spotify.json")
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => {dispatch(ActionCreator.setEnvironment(json.environment));
                                                       if (json.environment === "TEST")
                                                            fetch(json.testState)
                                                                .then(response => response.json(), error => console.log(error))
                                                                .then(testState => {dispatch(ActionCreator.forceState(testState))})
                                                       else
                                                           dispatch(ActionCreator.setClientId(process.env.REACT_APP_SPOTIFY_CLIENT_ID || json.clientId));})),

    // Spotify Token
    addUserToken: (userToken) => ({type: ActionType.SET_USER_TOKEN, userToken: userToken}),

    // User Profile
    // GET /me is unaffected by the Feb 2026 migration - still works as-is.
    // Note the response no longer includes country/email/explicit_content/followers/product.
    loadUserProfile: (userToken) => ((dispatch) => spotifyApiFetch('/me')
                                        .then(profile => dispatch(ActionCreator.addUserProfile(profile)))
                                        .catch(error => console.error('Failed to load user profile:', error.message))),
    addUserProfile: (userProfile) => ({type: ActionType.ADD_USER_PROFILE, userProfile: userProfile}),

    // User Playlists
    // GET /me/playlists is unaffected by the migration.
    // NOTE: this list includes playlists you follow but don't own/collaborate
    // on. Spotify only returns track items (via GET /playlists/{id}/items)
    // for playlists you own or collaborate on - see loadPlaylistTracks below,
    // which now skips (rather than crashes on) the rest.
    loadUserPlaylists: (userToken) => ((dispatch) => spotifyApiFetch('/me/playlists?limit=50')
                                        .then(json => dispatch(ActionCreator.addUserPlaylists(json.items.filter((p) => p.owner.display_name !== "Spotify"))))
                                        .catch(error => console.error('Failed to load playlists:', error.message))),
    addUserPlaylists: (userPlaylists) => (dispatch) => dispatch({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists}),

    // User Liked Songs
    // Listing saved tracks is still GET /me/tracks - the migration only
    // replaced the *save/remove/contains* calls with /me/library, not this
    // GET. (There is no GET /me/library for listing.)
    // "market=from_token" is also no longer a valid market value - omit the
    // param and Spotify infers the market from the user's token.
    loadLibraryTracks: (userToken, offset = 0) => ((dispatch) => spotifyApiFetch('/me/tracks?limit=50&offset=' + offset)
                                        .then(json => {
                                            dispatch(ActionCreator.appendLibraryTracks(json.items));
                                            if (json.next !== null) {
                                                dispatch(ActionCreator.loadLibraryTracks(userToken, offset + json.limit));
                                            } else {
                                                dispatch(ActionCreator.isLibraryLoaded());
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Failed to load library tracks:', error.message);
                                            dispatch(ActionCreator.isLibraryLoaded());
                                        })),
    appendLibraryTracks: (tracks) => ({type: ActionType.APPEND_LIBRARY_TRACKS, tracks: tracks}),
    isLibraryLoaded: () => ({type: ActionType.IS_LIBRARY_LOADED}),

    // User Playlists tracks
    // GET /playlists/{id}/tracks was renamed to GET /playlists/{id}/items,
    // AND the "track" field inside each item was renamed to "item" - so the
    // `fields` filter has to ask for item(...) rather than track(...), or
    // you'll get back empty objects.
    // This also 403s for playlists you follow but don't own/collaborate on -
    // that's expected now, so we skip the playlist rather than looping.
    loadPlaylistTracks: (userToken, playlistId, offset = 0) => ((dispatch) => spotifyApiFetch(
                                            '/playlists/' + playlistId + '/items?fields=items(item(id%2Cname%2Calbum(name)%2Cartists(name)%2Curi))%2Climit%2Cnext%2Coffset%2Cprevious%2Ctotal&limit=100&offset=' + offset
                                        )
                                        .then(json => {
                                            // Spotify renamed each entry's `track` field to `item` for this
                                            // endpoint. Map it back to `track` here so the rest of the app
                                            // (reducers, display components) can keep using the old shape.
                                            const tracks = json.items.map(entry => ({ ...entry, track: entry.item }));
                                            dispatch(ActionCreator.appendPlaylistTracks(playlistId, tracks));
                                            if (json.next !== null) {
                                                dispatch(ActionCreator.loadPlaylistTracks(userToken, playlistId, offset + json.limit));
                                            } else {
                                                dispatch(ActionCreator.isPlaylistLoaded());
                                            }
                                        })
                                        .catch(error => {
                                            // Expected for playlists you follow but don't own/collaborate on.
                                            console.warn(`Skipping playlist ${playlistId}: ${error.message}`);
                                            dispatch(ActionCreator.isPlaylistLoaded());
                                        })),
    appendPlaylistTracks: (playlistId, tracks) => ({type: ActionType.APPEND_PLAYLIST_TRACKS, playlistId: playlistId, tracks: tracks}),
    isPlaylistLoaded: () => ({type: ActionType.IS_PLAYLIST_LOADED}),

    // Library displays
    libraryDisplayPageFirst: () => ({type: ActionType.LIBRARY_DISPLAY_PAGE_FIRST}),
    libraryDisplayPagePrevious: () => ({type: ActionType.LIBRARY_DISPLAY_PAGE_PREVIOUS}),
    libraryDisplayPageNext: (lastPage) => ({type: ActionType.LIBRARY_DISPLAY_PAGE_NEXT, lastPage: lastPage}),
    libraryDisplayPageLast: (lastPage) => ({type: ActionType.LIBRARY_DISPLAY_PAGE_LAST, lastPage: lastPage}),
    libraryDisplayPageChoose: (choice, lastPage) => ({type: ActionType.LIBRARY_DISPLAY_PAGE_CHOOSE, choice: choice, lastPage: lastPage}),
    libraryDisplayRowsChoose: (choice) => ({type: ActionType.LIBRARY_DISPLAY_ROWS_CHOOSE, choice}),
    toggleUserPlaylist: (playlistId) => ({type: ActionType.TOGGLE_USER_PLAYLIST, playlistId: playlistId}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort}),
    toggleLibraryPlaylistFilter: (playlistId) => ({type: ActionType.TOGGLE_LIBRARY_PLAYLIST_FILTER, playlistId: playlistId}),
    toggleLikedSongsFilter: () => ({type: ActionType.TOGGLE_LIKED_SONGS_FILTER}),
    changeLibraryFilter: (text) => ({type: ActionType.CHANGE_LIBRARY_FILTER, text: text}),

    // Add / Remove Liked Songs
    // PUT/DELETE /me/library replace the old per-type /me/tracks calls, but
    // they take a JSON body of Spotify URIs - not an `ids` query string.
    addLikedSong: (userToken, trackId) => ((dispatch) => spotifyApiFetch('/me/library', {
                                                        method: 'PUT',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ uris: ['spotify:track:' + trackId] })
                                                    })
                                                .then(() => dispatch({type: ActionType.ADD_LIKED_SONG, trackId: trackId}))
                                                .catch(error => console.error('Failed to save track:', error.message))),
    deleteLikedSong: (userToken, trackId) => ((dispatch) => spotifyApiFetch('/me/library', {
                                                        method: 'DELETE',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ uris: ['spotify:track:' + trackId] })
                                                    })
                                                .then(() => dispatch({type: ActionType.DELETE_LIKED_SONG, trackId: trackId}))
                                                .catch(error => console.error('Failed to remove track:', error.message))),

    // Add / Remove Playlists tracks
    // POST .../items still accepts `uris` as a query param, unchanged.
    addPlaylistTrack: (userToken, playlistId, trackId) => ((dispatch) => spotifyApiFetch(
                                                        '/playlists/' + playlistId + '/items?uris=spotify:track:' + trackId,
                                                        { method: 'POST' }
                                                    )
                                                .then(() => dispatch({type: ActionType.ADD_PLAYLIST_TRACK, playlistId: playlistId, trackId: trackId}))
                                                .catch(error => console.error('Failed to add track to playlist:', error.message))),
    // DELETE .../items renamed the body parameter from `tracks` to `items`.
    deletePlaylistTrack: (userToken, playlistId, trackId) => ((dispatch) => spotifyApiFetch(
                                                        '/playlists/' + playlistId + '/items',
                                                        {
                                                            method: 'DELETE',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ items: [{ uri: 'spotify:track:' + trackId }] })
                                                        }
                                                    )
                                                .then(() => dispatch({type: ActionType.DELETE_PLAYLIST_TRACK, playlistId: playlistId, trackId: trackId}))
                                                .catch(error => console.error('Failed to remove track from playlist:', error.message)))
};