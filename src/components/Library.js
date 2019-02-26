import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionCreator, LibrarySort } from '../redux/actions';
import './Library.css';

// Styled
const StyledLibrary = styled.div`
    color: white;
`;

// Utils
const getLibrarySortingFunction = (librarySort) => {
    if (librarySort.sort === LibrarySort.ARTIST)
        return (t1, t2) => (t1.track.artists[0].name > t2.track.artists[0].name) ? librarySort.asc : -1 * librarySort.asc;
    if (librarySort.sort === LibrarySort.ALBUM)
        return (t1, t2) => (t1.track.album.name > t2.track.album.name) ? librarySort.asc : -1 * librarySort.asc;
    return (t1, t2) => (t1.track.name > t2.track.name) ? librarySort.asc : -1 * librarySort.asc;
}
const getTitleArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.TITLE)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}
const getArtistArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.ARTIST)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}
const getAlbumArrowsUrl = (librarySort) => {
    if (librarySort.sort === LibrarySort.ALBUM)
        return librarySort.asc === 1 ? "/img/sort-arrows-asc.svg" : "/img/sort-arrows-desc.svg";
    return "/img/sort-arrows.svg"
}

// Presentational Component
const Track = ({track, userPlaylists}) =>
    <tr key={track.track.id}>
        <td><a href={track.track.uri}><img src="/img/play-button.svg" alt="Play Button" /></a></td>
        <td>{track.track.name}</td>
        <td>{track.track.artists[0].name}</td>
        <td>{track.track.album.name}</td>   
        {userPlaylists.filter(p => p.enabled).map(p => <td key={p.id+track.track.id}><img src={p.tracks[track.track.id] === true ? "/img/tick.svg" : "/img/plus.svg"} alt="Not In Playlist" /></td>)}
    </tr>;
const PLibrary = ({library, librarySort, userPlaylists,  onTitleClicked, onArtistClicked, onAlbumClicked}) => (
    <StyledLibrary>
        <table><tbody>
            <tr>
                <th></th>
                <th onClick={onTitleClicked}><img src={getTitleArrowsUrl(librarySort)} alt="Sorting Arrows"/> Title</th>
                <th onClick={onArtistClicked}><img src={getArtistArrowsUrl(librarySort)} alt="Sorting Arrows"/> Artist</th>
                <th onClick={onAlbumClicked}><img src={getAlbumArrowsUrl(librarySort)} alt="Sorting Arrows"/> Album</th>
                {userPlaylists.filter(p => p.enabled).map(p => <th key={p.id}>{p.name}</th>)}
            </tr>
            {librarySort.sort === LibrarySort.DEFAULT ? library.map((track) => <Track track={track} userPlaylists={userPlaylists}/>) : library.sort(getLibrarySortingFunction(librarySort)).map((track) => <Track track={track} userPlaylists={userPlaylists}/>)}
        </tbody></table>
    </StyledLibrary>
)
PLibrary.propTypes = {
    library: PropTypes.array.isRequired,
    librarySort: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        library: state.library,
        librarySort: state.librarySort,
        userPlaylists: state.userPlaylists
    };
}
const mapDispatchToProps = dispatch => {
    return {
         onTitleClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.TITLE))},
         onArtistClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.ARTIST))},
         onAlbumClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.ALBUM))}
    }
}
const Library = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PLibrary)

export default Library