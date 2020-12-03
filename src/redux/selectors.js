import { createSelector } from 'reselect';
import { getLibraryFilteringFunction, getLibrarySortingFunction } from '../components/library/libraryUtils';

const getLibrary = (state) => state.library;
const getLibraryFilter = (state) => state.libraryFilter;
const getUserPlaylists = (state) => state.userPlaylists;
const getLibrarySort = (state) => state.librarySort;
const getLibraryDisplay = (state) => state.libraryDisplay;

export const getLibrarySize = createSelector(
    getLibrary,
    (library) => Object.values(library).length
);

export const getFilteredLibrary = createSelector(
    getLibrary,
    getLibraryFilter,
    getUserPlaylists,
    (library, libraryFilter, userPlaylists) => Object.values(library).filter(getLibraryFilteringFunction(libraryFilter, userPlaylists))
);

export const getFilteredLibrarySize = createSelector(
    getFilteredLibrary,
    (filteredLibrary) => filteredLibrary.length
);

export const getFilteredLibrarySorted = createSelector(
    getFilteredLibrary,
    getLibrarySort,
    (filteredLibrary, librarySort) => filteredLibrary.sort(getLibrarySortingFunction(librarySort))
);

export const getLibrarySliced = createSelector(
    getFilteredLibrarySorted,
    getLibraryDisplay,
    (filteredLibrarySorted, libraryDisplay) => filteredLibrarySorted.slice((libraryDisplay.page - 1) * libraryDisplay.rows, libraryDisplay.page * libraryDisplay.rows)
);