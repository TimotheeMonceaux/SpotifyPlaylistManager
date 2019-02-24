import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import { VLayout, HLayout } from './Layout';
import LoginButton from './LoginButton';
import UserProfileCard from './UserProfileCard';
import Playlists from './Playlists';
import Library from './Library';
import Loading from './Loading';
import queryString from 'query-string';
import { isNullOrEmpty } from '../utils/object';


// Presentational Component
const PController = ({clientId, userToken, userProfile, userPlaylists, library,
    location, onClientIdFetched, onUserTokenInHash, onUserProfileFetched, onUserPlaylistsFetched, onLibraryFetched}) => {
    // Step 1 - Retrieve the app's client id
    if (clientId === "") {
        fetch("/config/spotify.json")
            .then(response => response.json())
            .then(json => onClientIdFetched(json))
            .catch(error => console.log(error));

        return <VLayout><HLayout><Loading /></HLayout></VLayout>;
    }
    // Step 2 - Retrieve the user token
    if (userToken === "") {
        if (location.hash !== "") {
            var parsed = queryString.parse(location.hash);
            onUserTokenInHash(parsed);
            return <VLayout><HLayout><Loading /></HLayout></VLayout>;
        }
        return <VLayout><HLayout><LoginButton /></HLayout></VLayout>;
    }
    // Step 3 - Retrieve the user profile
    if (isNullOrEmpty(userProfile)) {
        fetch("https://api.spotify.com/v1/me",
                {
                    method: 'GET',
                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                    mode: 'cors',
                    cache: 'default' 
                })
                .then(response => response.json())
                .then(json => onUserProfileFetched(json))
                .catch(error => console.log(error))
        return <VLayout><HLayout><Loading /></HLayout></VLayout>;
    }
    // Step 4 - Retrieve the user's playlists
    if (isNullOrEmpty(userPlaylists)) {
        fetch("https://api.spotify.com/v1/me/playlists",
                {
                    method: 'GET',
                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                    mode: 'cors',
                    cache: 'default' 
                })
                .then(response => response.json())
                .then(json => onUserPlaylistsFetched(json))
                .catch(error => console.log(error))
        return  <VLayout>
                    <HLayout><UserProfileCard /></HLayout>
                    <HLayout><Loading /></HLayout>
                </VLayout>;
    }
    // Step 5 - Retrieve the user's library
    if (isNullOrEmpty(library)) {
        fetch("https://api.spotify.com/v1/me/tracks?limit=50",
                {
                    method: 'GET',
                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                    mode: 'cors',
                    cache: 'default' 
                })
                .then(response => response.json())
                .then(json => onLibraryFetched(json))
                .catch(error => console.log(error))
        return <HLayout>
               <VLayout>
                   <UserProfileCard />
                   <Playlists />
                </VLayout>
                <VLayout><Loading /></VLayout>
            </HLayout>;
    }
    return <HLayout>
               <VLayout>
                   <UserProfileCard />
                   <Playlists />
                </VLayout>
                <VLayout><Library /></VLayout>
            </HLayout>;
    
}
PController.propTypes = {
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
         onClientIdFetched: (json) => {dispatch(ActionCreator.addClientId(json.clientId))},
         onUserTokenInHash: (json) => {dispatch(ActionCreator.addUserToken(json.access_token))},
         onUserProfileFetched: (json) => {dispatch(ActionCreator.addUserProfile(json))},
         onUserPlaylistsFetched: (json) => {dispatch(ActionCreator.addUserPlaylists(json.items))},
         onLibraryFetched: (json) => {dispatch(ActionCreator.appendLibraryTracks(json.items))}
    }
}
const Controller = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PController)


export default Controller