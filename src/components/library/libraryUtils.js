import { isNullOrEmpty } from '../../utils/object.js';
import { cleanString } from '../../utils/string.js';
import { LibrarySort } from '../../redux/actions.js';

export const getLibrarySortingFunction = (librarySort) => {
    if (librarySort.sort === LibrarySort.TITLE)
        return (t1, t2) => (t1.name > t2.name) ? librarySort.asc : -1 * librarySort.asc;
    if (librarySort.sort === LibrarySort.ARTIST)
        return (t1, t2) => (t1.artist > t2.artist) ? librarySort.asc : -1 * librarySort.asc;
    if (librarySort.sort === LibrarySort.ALBUM)
        return (t1, t2) => (t1.album > t2.album) ? librarySort.asc : -1 * librarySort.asc;
    return () => 1;
}
export const getTitleArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.TITLE)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}
export const getArtistArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.ARTIST)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}
export const getAlbumArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.ALBUM)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}

export const trackInPlaylist = (track, playlist) => {
    return track.inPlaylists[playlist.id] === true;
}

export const filterTrack = (track, text) => {
    return cleanString(track.name).indexOf(text) > -1
           || cleanString(track.artist).indexOf(text) > -1
           || cleanString(track.album).indexOf(text) > -1;
}

export const getLibraryFilteringFunction = (libraryFilter, playlists) => {
    if (isNullOrEmpty(libraryFilter.playlists) && libraryFilter.text === "")
        return () => true;

    if (isNullOrEmpty(libraryFilter.playlists))
        return (track) => filterTrack(track, libraryFilter.text);

    let mustBeInPlaylist = playlists.filter((p) => libraryFilter.playlists.includes(p.id));
    if (isNullOrEmpty(libraryFilter.text))
        return (track) => mustBeInPlaylist.some((p) => trackInPlaylist(track, p));

    return (track) => mustBeInPlaylist.some((p) => trackInPlaylist(track, p)) && filterTrack(track, libraryFilter.text);
}