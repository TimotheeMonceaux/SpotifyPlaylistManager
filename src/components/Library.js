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

const getLibrarySortingFunction = (librarySort) => {
    if (librarySort.sort === LibrarySort.ARTIST)
        return (t1, t2) => (t1.track.artists[0].name > t2.track.artists[0].name) ? librarySort.asc : -1 * librarySort.asc;
    if (librarySort.sort === LibrarySort.ALBUM)
        return (t1, t2) => (t1.track.album.name > t2.track.album.name) ? librarySort.asc : -1 * librarySort.asc;
    return (t1, t2) => (t1.track.name > t2.track.name) ? librarySort.asc : -1 * librarySort.asc;
}

// Presentational Component
const Track = ({track}) =>
    <tr key={track.track.id}>
        <td><a href={track.track.uri}><img src="/img/play-button.svg" alt="Play Button" /></a></td>
        <td>{track.track.name}</td>
        <td>{track.track.artists[0].name}</td>
        <td>{track.track.album.name}</td>
    </tr>;
const PLibrary = ({library, librarySort, onTitleClicked, onArtistClicked, onAlbumClicked}) => (
    <StyledLibrary>
        <table>
            <tr>
                <th></th>
                <th onClick={onTitleClicked}>Title</th>
                <th onClick={onArtistClicked}>Artist</th>
                <th onClick={onAlbumClicked}>Album</th>
            </tr>
            {librarySort.sort === LibrarySort.DEFAULT ? library.map((track) => <Track track={track}/>) : library.sort(getLibrarySortingFunction(librarySort)).map((track) => <Track track={track}/>)}
        </table>
    </StyledLibrary>
)
PLibrary.propTypes = {
    library: PropTypes.array.isRequired,
    librarySort: PropTypes.object.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        library: state.library,
        librarySort: state.librarySort
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