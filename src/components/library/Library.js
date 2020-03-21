import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionCreator, LibrarySort } from '../../redux/actions';
import './Library.css';
import { getLibrarySortingFunction, getTitleArrowsUrl, getArtistArrowsUrl, getAlbumArrowsUrl, getLibraryFilteringFunction } from './libraryUtils';
import Track from './track';

// Styled
const StyledLibrary = styled.div`
    color: white;
`;

const PLibrary = ({userToken, library, librarySort, userPlaylists, libraryFilter,
                   onTitleClicked, onArtistClicked, onAlbumClicked, onPlaylistClicked, 
                   onNotInPlaylistClicked, onInPlaylistClicked}) => (
    <StyledLibrary>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th onClick={onTitleClicked}><img src={getTitleArrowsUrl(librarySort)} alt="Sorting Arrows"/> Title</th>
                    <th onClick={onArtistClicked}><img src={getArtistArrowsUrl(librarySort)} alt="Sorting Arrows"/> Artist</th>
                    <th onClick={onAlbumClicked}><img src={getAlbumArrowsUrl(librarySort)} alt="Sorting Arrows"/> Album</th>
                    {userPlaylists.filter(p => p.enabled).map(p => <th key={p.id} onClick={onPlaylistClicked(p.id)} style={libraryFilter.playlists.includes(p.id) ? {backgroundColor: "#555"} : {}}>{p.name}</th>)}
                </tr>
            </thead>
            <tbody>
            {library.filter(getLibraryFilteringFunction(libraryFilter, userPlaylists))
                    .sort(getLibrarySortingFunction(librarySort))
                    .map((track) => <Track key={track.id} userToken={userToken} track={track} userPlaylists={userPlaylists} onNotInPlaylistClicked={onNotInPlaylistClicked} onInPlaylistClicked={onInPlaylistClicked} />)}
            </tbody>
        </table>
    </StyledLibrary>
)
PLibrary.propTypes = {
    userToken: PropTypes.string.isRequired,
    library: PropTypes.array.isRequired,
    librarySort: PropTypes.object.isRequired,
    libraryFilter: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        library: state.library,
        librarySort: state.librarySort,
        libraryFilter: state.libraryFilter,
        userPlaylists: state.userPlaylists
    };
}
const mapDispatchToProps = dispatch => {
    return {
         onTitleClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.TITLE))},
         onArtistClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.ARTIST))},
         onAlbumClicked: () => {dispatch(ActionCreator.changeLibrarySort(LibrarySort.ALBUM))},
         onPlaylistClicked: (playlistId) => {return () => dispatch(ActionCreator.toggleLibraryPlaylistFilter(playlistId))},
         onNotInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.addPlaylistTrack(userToken, playlistId, trackId))},
         onInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.deletePlaylistTrack(userToken, playlistId, trackId))}
    }
}
const Library = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PLibrary)

export default Library