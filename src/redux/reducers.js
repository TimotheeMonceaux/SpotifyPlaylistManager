import { combineReducers } from 'redux';
import { ActionType, LibrarySort } from './actions';
import mapTrack from '../model/track';
import { isNullOrEmpty } from '../utils/object.js';
import { cleanString } from '../utils/string.js';

const environment = (environment = "", action) => {
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
                Object.assign({}, userPlaylists[index], {tracks: {...userPlaylists[index].tracks, ...action.tracks.map(t => mapTrack(t)).reduce((o, t) => {o[t.id] = isNullOrEmpty(o[t.id]) ? {...t, count: 1} : {...t, count: o[t.id].count + 1}; return o;}, {})}})
                ,...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    if (action.type === ActionType.ADD_PLAYLIST_TRACK) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        let tracks = Object.assign({}, userPlaylists[index].tracks)
        tracks[action.trackId] = {count: 1, id: action.trackId};
        return [...userPlaylists.slice(0,index),
            Object.assign({}, userPlaylists[index], {tracks: tracks})
            ,...userPlaylists.slice(index+1, userPlaylists.length)];
    }

    if (action.type === ActionType.DELETE_PLAYLIST_TRACK) {
        let index = userPlaylists.findIndex((p) => p.id === action.playlistId);
        let tracks = Object.assign({}, userPlaylists[index].tracks)
        tracks[action.trackId] = {};
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

const loadingStatus = (loadingStatus = {userProfile: 0, playlistsList: 0, library: 0, playlists: 0}, action) => {
    if (action.type === ActionType.FORCE_STATE)
        return action.newState.loadingStatus;

    if (action.type === ActionType.ADD_USER_PROFILE)
        return {...loadingStatus, userProfile: 1}

    if (action.type === ActionType.ADD_USER_PLAYLISTS)
        return {...loadingStatus, playlistsList: 1, playlists: -1 * action.userPlaylists.length + 1};

    if (action.type === ActionType.IS_LIBRARY_LOADED)
        return {...loadingStatus, library: 1};

    if (action.type === ActionType.IS_PLAYLIST_LOADED)
        return {...loadingStatus, playlists: loadingStatus.playlists + 1};
    return loadingStatus;
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
        return cleanString(action.text);
    
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
    loadingStatus,
    librarySort,
    libraryFilter
});

export default reducer;