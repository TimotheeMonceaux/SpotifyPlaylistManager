export const ActionType = {
    FORCE_STATE: 0,
    SET_ENVIRONMENT: 1,

    // Spotify Client Id
    LOAD_CLIENT_ID: 10,
    SET_CLIENT_ID: 11,

    // Spotify Token
    SET_USER_TOKEN: 12,

    // User Profile
    LOAD_USER_PROFILE: 20,
    ADD_USER_PROFILE: 21,

    // User PLaylists
    LOAD_USER_PLAYLISTS: 30,
    ADD_USER_PLAYLISTS: 31,
    TOGGLE_USER_PLAYLIST: 32,

    // Library
    LOAD_LIBRARY_TRACKS: 40,
    APPEND_LIBRARY_TRACKS: 41,
    CHANGE_LIBRARY_SORT: 42,
    TOGGLE_LIBRARY_PLAYLIST_FILTER: 43,
    CHANGE_LIBRARY_FILTER: 44,

    // Playlist tracks
    LOAD_PLAYLIST_TRACKS: 50,
    APPEND_PLAYLIST_TRACKS: 51,
    ADD_PLAYLIST_TRACK: 52,
    DELETE_PLAYLIST_TRACK: 53,

    // Loading Status
    IS_LIBRARY_LOADED: 60,
    IS_PLAYLIST_LOADED: 61
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
                                                            fetch(json.testState)
                                                                .then(response => response.json(), error => console.log(error))
                                                                .then(testState => {dispatch(ActionCreator.forceState(testState))})
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
    loadLibraryTracks: (userToken, offset = 0) => ((dispatch) => fetch("https://api.spotify.com/v1/me/tracks?market=from_token&limit=50&offset="+offset,
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => {dispatch(ActionCreator.appendLibraryTracks(json.items))
                                                        if (json.next !== null)
                                                            dispatch(ActionCreator.loadLibraryTracks(userToken, offset + json.limit))
                                                        else 
                                                            dispatch(ActionCreator.isLibraryLoaded())})),
    appendLibraryTracks: (tracks) => ({type: ActionType.APPEND_LIBRARY_TRACKS, tracks: tracks}),
    isLibraryLoaded: () => ({type: ActionType.IS_LIBRARY_LOADED}),
    isPlaylistLoaded: () => ({type: ActionType.IS_PLAYLIST_LOADED}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort}),
    toggleLibraryPlaylistFilter: (playlistId) => ({type: ActionType.TOGGLE_LIBRARY_PLAYLIST_FILTER, playlistId: playlistId}),
    changeLibraryFilter: (text) => ({type: ActionType.CHANGE_LIBRARY_FILTER, text: text}),
    loadPlaylistTracks: (userToken, playlistId, offset = 0) => ((dispatch) => fetch("https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?fields=items(track(id%2Cname%2Calbum(name)%2Cartists(name)%2Curi))%2Climit%2Cnext%2Coffset%2Cprevious%2Ctotal&market=from_token&limit=100&offset="+offset,
                                                    {
                                                        method: 'GET',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(response => response.json(), error => console.log(error))
                                                .then(json => {dispatch(ActionCreator.appendPlaylistTracks(playlistId, json.items))
                                                               if (json.next !== null)
                                                                    dispatch(ActionCreator.loadPlaylistTracks(userToken, playlistId, offset + json.limit))
                                                                else
                                                                    dispatch(ActionCreator.isPlaylistLoaded())})),
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