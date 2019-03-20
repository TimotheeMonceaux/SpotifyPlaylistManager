export const ActionType = {
    FORCE_STATE: 0,
    SET_ENVIRONMENT: 1,

    // Spotify Client Id
    LOAD_CLIENT_ID: 2,
    SET_CLIENT_ID: 3,

    // Spotify Token
    SET_USER_TOKEN: 4,

    // User Profile
    LOAD_USER_PROFILE: 5,
    ADD_USER_PROFILE: 6,

    // User PLaylists
    LOAD_USER_PLAYLISTS: 7,
    ADD_USER_PLAYLISTS: 8,
    TOGGLE_USER_PLAYLIST: 9,

    // Library
    LOAD_LIBRARY_TRACKS: 10,
    APPEND_LIBRARY_TRACKS: 11,
    CHANGE_LIBRARY_SORT: 12,

    // Playlist tracks
    LOAD_PLAYLIST_TRACKS: 13,
    APPEND_PLAYLIST_TRACKS: 14,
    ADD_PLAYLIST_TRACK: 15,
    DELETE_PLAYLIST_TRACK: 16
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
    setClientId: (clientId) => ({type: ActionType.SET_CLIENT_ID, clientId: clientId}),
    loadInitialConfig: () => ((dispatch) => fetch("/config/spotify.json")
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => {dispatch(ActionCreator.setEnvironment(json.environment));
                                                       if (json.environment === "TEST")
                                                           dispatch(ActionCreator.forceState(json.testState));
                                                       else
                                                           dispatch(ActionCreator.setClientId(json.clientId));})),
    addUserToken: (userToken) => ({type: ActionType.SET_USER_TOKEN, userToken: userToken}),
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
                                        .then(json => dispatch(ActionCreator.addUserPlaylists(json.items, userToken)))),
    addUserPlaylists: (userPlaylists, userToken) => ((dispatch) => {dispatch({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists});
                                                         userPlaylists.map(p => dispatch(ActionCreator.loadPlaylistTracks(userToken, p.id)));}),
    toggleUserPlaylist: (playlistId) => ({type: ActionType.TOGGLE_USER_PLAYLIST, playlistId: playlistId}),
    loadLibraryTracks: (userToken, offset = 0) => ((dispatch) => fetch("https://api.spotify.com/v1/me/tracks?limit=50&offset="+offset,
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => {dispatch(ActionCreator.appendLibraryTracks(json.items))
                                                        if (json.next !== null)
                                                            dispatch(ActionCreator.loadLibraryTracks(userToken, offset + json.limit))})),
    appendLibraryTracks: (tracks) => ({type: ActionType.APPEND_LIBRARY_TRACKS, tracks: tracks}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort}),
    loadPlaylistTracks: (userToken, playlistId, offset = 0) => ((dispatch) => fetch("https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?fields=items(track(id))%2Climit%2Cnext%2Coffset%2Cprevious%2Ctotal&limit=100&offset="+offset,
                                                    {
                                                        method: 'GET',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(response => response.json(), error => console.log(error))
                                                .then(json => {dispatch(ActionCreator.appendPlaylistTracks(playlistId, json.items))
                                                               if (json.next !== null)
                                                                    dispatch(ActionCreator.loadPlaylistTracks(userToken, playlistId, offset + json.limit))})),
    appendPlaylistTracks: (playlistId, tracks) => ({type: ActionType.APPEND_PLAYLIST_TRACKS, playlistId: playlistId, tracks: tracks}),
    addPlaylistTrack: (userToken, playlistId, trackId) => ((dispatch) => fetch("https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?uris=spotify:track:"+trackId,
                                                    {
                                                        method: 'POST',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(() => dispatch({type: ActionType.ADD_PLAYLIST_TRACK, playlistId: playlistId, trackId: trackId}), error => console.log(error))),
    deletePlaylistTrack: (userToken, playlistId, trackId) => ((dispatch) => fetch("https://api.spotify.com/v1/playlists/"+playlistId+"/tracks",
                                                    {
                                                        method: 'DELETE',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken, "Content-Type": "application/json"}),
                                                        mode: 'cors',
                                                        cache: 'default' ,
                                                        body: JSON.stringify({tracks: [{uri: "spotify:track:"+trackId}]})
                                                    })
                                                .then(() => dispatch({type: ActionType.DELETE_PLAYLIST_TRACK, playlistId: playlistId, trackId: trackId}), error => console.log(error)))
};