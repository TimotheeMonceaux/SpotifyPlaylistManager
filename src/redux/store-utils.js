import { ActionType } from './actions';

export const isStateLoaded = (loadingStatus) => (loadingStatus.userProfile >= 1 
                                                && loadingStatus.playlistsList >= 1
                                                && loadingStatus.library >= 1
                                                && loadingStatus.playlists >= 1);

const shouldResetPageSet = new Set([
    ActionType.LIBRARY_DISPLAY_ROWS_CHOOSE,
    ActionType.CHANGE_LIBRARY_SORT,
    ActionType.TOGGLE_LIBRARY_PLAYLIST_FILTER,
    ActionType.TOGGLE_LIKED_SONGS_FILTER,
    ActionType.CHANGE_LIBRARY_FILTER
]);

export const shouldResetPage = (actionType) => shouldResetPageSet.has(actionType);