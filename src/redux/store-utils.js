export function isStateLoaded(loadingStatus) {
    return loadingStatus[0] === 1 && loadingStatus[1] === 1;
}