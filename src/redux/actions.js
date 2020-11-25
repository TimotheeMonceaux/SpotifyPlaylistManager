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
    CHANGE_LIBRARY_SORT: "CHANGE_LIBRARY_SORT",
    TOGGLE_LIBRARY_PLAYLIST_FILTER: "TOGGLE_LIBRARY_PLAYLIST_FILTER",
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
                                                           dispatch(ActionCreator.setClientId(json.clientId));})),

    // Spotify Token
    addUserToken: (userToken) => ({type: ActionType.SET_USER_TOKEN, userToken: userToken}),

    // User Profile
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

    // User Playlists
    loadUserPlaylists: (userToken) => ((dispatch) => fetch("https://api.spotify.com/v1/me/playlists",
                                                {
                                                    method: 'GET',
                                                    headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                    mode: 'cors',
                                                    cache: 'default' 
                                                })
                                        .then(response => response.json(), error => console.log(error))
                                        .then(json => dispatch(ActionCreator.addUserPlaylists(json.items)))),
    addUserPlaylists: (userPlaylists) => (dispatch) => dispatch({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists}),

    // User Liked Songs
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

    // User Playlists tracks
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
    isPlaylistLoaded: () => ({type: ActionType.IS_PLAYLIST_LOADED}),

    // Library displays
    toggleUserPlaylist: (playlistId) => ({type: ActionType.TOGGLE_USER_PLAYLIST, playlistId: playlistId}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort}),
    toggleLibraryPlaylistFilter: (playlistId) => ({type: ActionType.TOGGLE_LIBRARY_PLAYLIST_FILTER, playlistId: playlistId}),
    changeLibraryFilter: (text) => ({type: ActionType.CHANGE_LIBRARY_FILTER, text: text}),
   
    // Add / Remove Liked Songs
    addLikedSong: (userToken, trackId) => ((dispatch) => fetch("https://api.spotify.com/v1/me/tracks?ids="+trackId,
                                                    {
                                                        method: 'PUT',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(() => dispatch({type: ActionType.ADD_LIKED_SONG, trackId: trackId}), error => console.log(error))),
    deleteLikedSong: (userToken, trackId) => ((dispatch) => fetch("https://api.spotify.com/v1/me/tracks?ids="+trackId,
                                                    {
                                                        method: 'DELETE',
                                                        headers: new Headers({"Authorization": "Bearer " + userToken}),
                                                        mode: 'cors',
                                                        cache: 'default' 
                                                    })
                                                .then(() => dispatch({type: ActionType.DELETE_LIKED_SONG, trackId: trackId}), error => console.log(error))),

    // Add / Remove Playlists tracks
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