export const ActionType = {
    ADD_USER_TOKEN: 0,

    // Spotify Client Id
    LOAD_CLIENT_ID: 1,
    ADD_CLIENT_ID: 2,

    // User Profile
    LOAD_USER_PROFILE: 3,
    ADD_USER_PROFILE: 4,

    // User PLaylists
    LOAD_USER_PLAYLISTS: 5,
    ADD_USER_PLAYLISTS: 6,

    // Library
    LOAD_LIBRARY_TRACKS: 7,
    APPEND_LIBRARY_TRACKS: 8,
    CHANGE_LIBRARY_SORT: 9,

    // Playlist tracks
    LOAD_PLAYLIST_TRACKS: 10,
    APPEND_PLAYLIST_TRACKS: 11
}

// other constants

export const LibrarySort = {
  DEFAULT: 0,
  TITLE: 1,
  ARTIST: 2,
  ALBUM: 3
}

export const ActionCreator = {
    addUserToken: (userToken) => ({type: ActionType.ADD_USER_TOKEN, userToken: userToken}),
    loadClientId: () => ((dispatch) => fetch("/config/spotify.json")
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => dispatch(ActionCreator.addClientId(json.clientId)))),
    addClientId: (clientId) => ({type: ActionType.ADD_CLIENT_ID, clientId: clientId}),
    loadUserProfile: (userToken) => ((dispatch) => fetch("https://api.spotify.com/v1/me",
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => dispatch(ActionCreator.addUserProfile(json)))),
    addUserProfile: (userProfile) => ({type: ActionType.ADD_USER_PROFILE, userProfile: userProfile}),
    loadUserPlaylists: (userToken) => ((dispatch) => fetch("https://api.spotify.com/v1/me/playlists",
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => dispatch(ActionCreator.addUserPlaylists(json.items)))),
    addUserPlaylists: (userPlaylists) => ({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists}),
    loadLibraryTracks: (userToken) => ((dispatch) => fetch("https://api.spotify.com/v1/me/tracks?limit=50",
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => dispatch(ActionCreator.appendLibraryTracks(json.items)))),
    appendLibraryTracks: (tracks) => ({type: ActionType.APPEND_LIBRARY_TRACKS, tracks: tracks}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort}),
    loadPlaylistTracks: (userToken, playlistId) => ((dispatch) => fetch("https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?fields=items(track(id))&limit=100",
                                                    {
                                                        method: 'GET',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(response => response.json(), error => console.log(error))
                                                .then(json => dispatch(ActionCreator.appendLibraryTracks(json.items)))),
    appendPlaylistTracks: (playlistId, tracks) => ({type: ActionType.APPEND_PLAYLIST_TRACKS, playlistId: playlistId, tracks: tracks})
};