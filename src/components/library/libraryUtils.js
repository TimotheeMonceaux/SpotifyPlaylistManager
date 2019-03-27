import { LibrarySort } from '../../redux/actions.js';

export const getLibrarySortingFunction = (librarySort) => {
    if (librarySort.sort === LibrarySort.ARTIST)
        return (t1, t2) => (t1.track.artists[0].name > t2.track.artists[0].name) ? librarySort.asc : -1 * librarySort.asc;
    if (librarySort.sort === LibrarySort.ALBUM)
        return (t1, t2) => (t1.track.album.name > t2.track.album.name) ? librarySort.asc : -1 * librarySort.asc;
    return (t1, t2) => (t1.track.name > t2.track.name) ? librarySort.asc : -1 * librarySort.asc;
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