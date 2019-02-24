import { combineReducers } from 'redux';
import { ActionType, LibrarySort } from './actions';


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
        return action.userPlaylists.map((p) => Object.assign({}, p, {enabled: true}));
    return userPlaylists;
}

const library = (library = [], action) => {
    if (action.type === ActionType.APPEND_LIBRARY_TRACKS)
        return library.concat(action.tracks);
    return library;
}

const librarySort = (librarySort = {sort: LibrarySort.DEFAULT, asc: 1}, action) => {
    if (action.type === ActionType.CHANGE_LIBRARY_SORT && action.librarySort !== LibrarySort.DEFAULT) {
        if (librarySort.sort === action.librarySort)
            return Object.assign({}, librarySort, {asc: -1 * librarySort.asc});
        return {sort: action.librarySort, asc: 1};
    }
    return librarySort;
}

const reducer = combineReducers ({
    clientId, 
    userToken,
    userProfile,
    userPlaylists,
    library,
    librarySort
});

export default reducer;