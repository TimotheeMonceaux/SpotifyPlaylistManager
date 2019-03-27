import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import { VLayout, HLayout } from './Layout';
import SpotifyLogin from 'react-spotify-login';
import styled from 'styled-components';
import Loading from './Loading';
import Controller from './Controller';

const SSpotifyLogin = styled(SpotifyLogin)`
    color: white;
    background-color: forestgreen;
    padding: 25px;
    font-weight: bold;
    border-radius: 20px;
    font-family: Arial;
    font-size: 150%;
    border: none;
    cursor: pointer;
`;

// Presentational Component
class PGatekeeper extends React.Component {
    componentWillMount() {
        this.props.loadInitialConfig();
    }

    render() {
        // Step 1 - Retrieve the app's client id
        if (this.props.clientId === "") {
            return <VLayout><HLayout><Loading /></HLayout></VLayout>;
        }
        // Step 2 - Retrieve the user token
        if (this.props.userToken === "") {
            return <VLayout><HLayout>
                    <SSpotifyLogin   clientId={this.props.clientId}
                                    redirectUri={window.location.href + "callback/"}
                                    scope="user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private"
                                    onSuccess={json => this.props.onUserTokenRetrieved(json)}
                                    onFailure={json => console.error(json)}/>
                </HLayout></VLayout>;
        }
        return <Controller />;
        
    }
}
PGatekeeper.propTypes = {
    clientId: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    library: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        clientId: state.clientId,
        userToken: state.userToken,
        userProfile: state.userProfile,
        userPlaylists: state.userPlaylists,
        library: state.library
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadInitialConfig: () => {dispatch(ActionCreator.loadInitialConfig())},
        onUserTokenRetrieved: (json) => {dispatch(ActionCreator.addUserToken(json.access_token))},
        loadUserProfile: (token) => {dispatch(ActionCreator.loadUserProfile(token))},
        loadUserPlaylists: (token) => {dispatch(ActionCreator.loadUserPlaylists(token))},
        loadLibraryTracks: (token) => {dispatch(ActionCreator.loadLibraryTracks(token))}
    }
}
const Gatekeeper = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PGatekeeper)


export default Gatekeeper