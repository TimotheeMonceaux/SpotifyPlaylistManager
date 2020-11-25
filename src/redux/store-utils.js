export function isStateLoaded(loadingStatus) {
    return loadingStatus.userProfile >= 1 
        && loadingStatus.playlistsList >= 1
        && loadingStatus.library >= 1
        && loadingStatus.playlists >= 1;
}