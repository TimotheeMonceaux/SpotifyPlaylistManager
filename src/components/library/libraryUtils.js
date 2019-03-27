import { isNullOrEmpty } from '../../utils/object.js';
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
    return playlist.tracks[track.id] > 0;
}

export const getLibraryFilteringFunction = (libraryFilter, playlists) => {
    console.log(libraryFilter);
    if (isNullOrEmpty(libraryFilter.playlists) && libraryFilter.text === "")
        return () => true;

    if (isNullOrEmpty(libraryFilter.playlists))
        return () => true; // TODO

    let mustBeInPlaylist = playlists.filter((p) => libraryFilter.playlists.includes(p.id));
    return (track) => mustBeInPlaylist.some((p) => trackInPlaylist(track, p));
}