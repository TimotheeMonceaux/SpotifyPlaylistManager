import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
import { VLayout, HLayout } from '../Layout';
import Loading from '../Loading';
import './Gatekeeper.css';
import { Redirect } from 'react-router-dom';
import {
    setClientId,
    redirectToSpotifyLogin,
    handleAuthorizationCallback
} from '../../utils/spotifyAuth';

// Presentational Component
class PGatekeeper extends React.Component {
    state = {
        error: null,
        exchangingCode: false
    };

    componentDidMount() {
        this.props.loadInitialConfig();
        if (this.props.clientId) {
            setClientId(this.props.clientId);
        }
        this.completeLoginIfRedirectedBack();
    }

    componentDidUpdate(prevProps) {
        if (this.props.clientId && this.props.clientId !== prevProps.clientId) {
            setClientId(this.props.clientId);
        }
    }

    // If Spotify just redirected the browser back here with an
    // authorization `code` (and `state`), exchange it for an access token.
    // See https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
    async completeLoginIfRedirectedBack() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const authError = params.get('error');

        if (authError) {
            this.setState({ error: `Spotify login failed: ${authError}` });
            this.cleanUrl();
            return;
        }
        if (!code) {
            return;
        }

        this.setState({ exchangingCode: true, error: null });
        try {
            const accessToken = await handleAuthorizationCallback(code, state);
            this.props.onUserTokenRetrieved(accessToken);
        } catch (err) {
            this.setState({ error: err.message });
        } finally {
            this.setState({ exchangingCode: false });
            this.cleanUrl();
        }
    }

    // Strip ?code=...&state=... etc. from the URL once we're done with them.
    cleanUrl() {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    handleLoginClick = () => {
        this.setState({ error: null });
        redirectToSpotifyLogin().catch(err => this.setState({ error: err.message }));
    };

    render() {
        // Step 1 - Retrieve the app's client id
        if (this.props.clientId === "") {
            return <VLayout><HLayout><Loading /></HLayout></VLayout>;
        }

        // Step 2 - Retrieve the user token
        if (this.props.userToken === "") {
            if (this.state.exchangingCode) {
                return <VLayout><HLayout><Loading /></HLayout></VLayout>;
            }

            return <VLayout className="login">
                <HLayout>
                    <VLayout>
                        <h1>Spotify Playlists Manager</h1>
                        <i>An all-in-one tool to help with your personal playlists &amp; library organization</i>
                    </VLayout>
                </HLayout>
                <HLayout>
                    <VLayout>
                        {this.state.error && <p className="login-error">{this.state.error}</p>}
                        <button className="spotify-login-button" onClick={this.handleLoginClick}>
                            Log in with Spotify
                        </button>
                    </VLayout>
                </HLayout>
            </VLayout>;
        }
        return <Redirect to="/loading" />;

    }
}
PGatekeeper.propTypes = {
    clientId: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        clientId: state.clientId,
        userToken: state.userToken
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadInitialConfig: () => {dispatch(ActionCreator.loadInitialConfig())},
        onUserTokenRetrieved: (accessToken) => {dispatch(ActionCreator.addUserToken(accessToken))}
    }
}
const Gatekeeper = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PGatekeeper)


export default Gatekeeper