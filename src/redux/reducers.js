import { combineReducers } from 'redux';
import { ActionType, LibrarySort } from './actions';
import mapTrack from '../model/track';

const environment = (environment = "", action) => {
    if (environment !== "PROD")
        console.log(action);

    if (action.type === ActionType.FORCE_STATE)
        return action.newState.environment;

    if (action.type === ActionType.SET_ENVIRONMENT)
        return action.environment;

    return environment;
}

const clientId = (clientId = "", action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.clientId;

    if (action.type === ActionType.SET_CLIENT_ID)
        return action.clientId;

    return clientId;
};

const userToken = (userToken = "", action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.userToken;

    if (action.type === ActionType.SET_USER_TOKEN)
        return action.userToken;

    return userToken;
};

const userProfile = (userProfile = {}, action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.userProfile;

    if (action.type === ActionType.ADD_USER_PROFILE) {
        return action.userProfile;}

    return userProfile;
}

const userPlaylists = (userPlaylists = [], action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.userPlaylists;

    if (action.type === ActionType.ADD_USER_PLAYLISTS)
        return action.userPlaylists.map((p) => Object.assign({}, p, {enabled: true, tracks: {}}));

    if (action.type === ActionType.TOGGLE_USER_PLAYLIST) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        return [...userPlaylists.slice(0,index),
                Object.assign({}, userPlaylists[index], {enabled: !userPlaylists[index].enabled}),
                ...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    if (action.type === ActionType.APPEND_PLAYLIST_TRACKS) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        return [...userPlaylists.slice(0,index),
                Object.assign({}, userPlaylists[index], {tracks: {...userPlaylists[index].tracks, ...action.tracks.map(t => t.track.id).reduce((o, id) => {o[id] = true; return o;}, {})}})
                ,...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    if (action.type === ActionType.ADD_PLAYLIST_TRACK) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        let tracks = Object.assign({}, userPlaylists[index].tracks)
        tracks[action.trackId] = true;
        return [...userPlaylists.slice(0,index),
            Object.assign({}, userPlaylists[index], {tracks: tracks})
            ,...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    if (action.type === ActionType.DELETE_PLAYLIST_TRACK) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        let tracks = Object.assign({}, userPlaylists[index].tracks)
        tracks[action.trackId] = false;
        return [...userPlaylists.slice(0,index),
            Object.assign({}, userPlaylists[index], {tracks: tracks})
            ,...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    return userPlaylists;
}

const library = (library = [], action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.library;

    if (action.type === ActionType.APPEND_LIBRARY_TRACKS)
        return library.concat(action.tracks.map(item => mapTrack(item)));

    return library;
}

const librarySort = (librarySort = {sort: LibrarySort.DEFAULT, asc: 1}, action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.librarySort;

    if (action.type === ActionType.CHANGE_LIBRARY_SORT && action.librarySort !== LibrarySort.DEFAULT) {
        if (librarySort.sort === action.librarySort)
            return Object.assign({}, librarySort, {asc: -1 * librarySort.asc});
        return {sort: action.librarySort, asc: 1};
    }

    return librarySort;
}

const libraryFilterPlaylists = (playlists = [], action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.libraryFilter.playlists;

    if (action.type === ActionType.TOGGLE_LIBRARY_PLAYLIST_FILTER) {
        if (playlists.includes(action.playlistId)) {
            let index = playlists.indexOf(action.playlistId);
            return [...playlists.slice(0, index), ...playlists.slice(index+1)];
        }
        else {
            return [...playlists, action.playlistId];
        }
    }

    return playlists;
}


const libraryFilterText = (text = "", action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.libraryFilter.text;

    if (action.type === ActionType.CHANGE_LIBRARY_FILTER)
        return action.text;
    
    return text;
}

const libraryFilter = combineReducers({
    playlists: libraryFilterPlaylists,
    text: libraryFilterText
})

const reducer = combineReducers ({
    environment,
    clientId, 
    userToken,
    userProfile,
    userPlaylists,
    library,
    librarySort,
    libraryFilter
});

export default reducer;