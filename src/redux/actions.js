export const ActionType = {
    ADD_CLIENT_ID: 0,
    ADD_USER_TOKEN: 1,
    ADD_USER_PROFILE: 2,
    ADD_USER_PLAYLISTS: 3
}

// other constants

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

export const ActionCreator = {
    addClientId: (clientId) => ({type: ActionType.ADD_CLIENT_ID, clientId: clientId}),
    addUserToken: (userToken) => ({type: ActionType.ADD_USER_TOKEN, userToken: userToken}),
    addUserProfile: (userProfile) => ({type: ActionType.ADD_USER_PROFILE, userProfile: userProfile}),
    addUserPlaylists: (userPlaylists) => ({type: ActionType.ADD_USER_PLAYLISTS, userPlaylists: userPlaylists})
};