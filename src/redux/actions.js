export const ActionType = {
    ADD_CLIENT_ID: 0,
    ADD_USER_TOKEN: 1,
    ADD_USER_PROFILE: 2,
    ADD_USER_PLAYLISTS: 3,
    APPEND_LIBRARY_TRACKS: 4,
    CHANGE_LIBRARY_SORT: 5
}

// other constants

export const LibrarySort = {
  DEFAULT: 0,
  TITLE: 1,
  ARTIST: 2,
  ALBUM: 3
}

export const ActionCreator = {
    addClientId: (clientId) => ({type: ActionType.ADD_CLIENT_ID, clientId: clientId}),
    addUserToken: (userToken) => ({type: ActionType.ADD_USER_TOKEN, userToken: userToken}),
    addUserProfile: (userProfile) => ({type: ActionType.ADD_USER_PROFILE, userProfile: userProfile}),
    addUserPlaylists: (userPlaylists) => ({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists}),
    appendLibraryTracks: (tracks) => ({type: ActionType.APPEND_LIBRARY_TRACKS, tracks: tracks}),
    changeLibrarySort: (librarySort) => ({type: ActionType.CHANGE_LIBRARY_SORT, librarySort: librarySort})
};