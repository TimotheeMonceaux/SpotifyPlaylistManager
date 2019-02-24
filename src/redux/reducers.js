import {combineReducers} from 'redux';
import {ActionType} from './actions';


const clientId = (clientId = "", action) => {
    if (action.type === ActionType.ADD_CLIENT_ID)
        return action.clientId;
    return clientId;
};

const userToken = (userToken = "", action) => {
    if (action.type === ActionType.ADD_USER_TOKEN)
        return action.userToken;
    return userToken;
};

const userProfile = (userProfile = {}, action) => {
    if (action.type === ActionType.ADD_USER_PROFILE) {
        return action.userProfile;}
    return userProfile;
}

const userPlaylists = (userPlaylists = [], action) => {
    if (action.type === ActionType.ADD_USER_PLAYLISTS)
        return action.userPlaylists.map((p) => {p.enabled = true; return p;});
    return userPlaylists;
}

const reducer = combineReducers ({
    clientId, 
    userToken,
    userProfile,
    userPlaylists
});

export default reducer;