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
    // Text input section
    let textFilter = libraryFilter.text === "" ?
                         () => true :
                          (track) => filterTrack(track, libraryFilter.text);

    // Playlists section
    let mustBeInPlaylist = playlists.filter((p) => libraryFilter.playlists.includes(p.id));
    let playlistFilter = isNullOrEmpty(libraryFilter.playlists) ? 
                            () => true :
                            (track) => mustBeInPlaylist.some((p) => trackInPlaylist(track, p));

    // Liked songs section
    let likedSongsFilter = !libraryFilter.likedSongs ? 
                            () => true :
                            (track) => track.liked;

    return (track) => textFilter(track)
                      && playlistFilter(track) 
                      && likedSongsFilter(track);
}