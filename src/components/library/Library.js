import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionCreator, LibrarySort } from '../../redux/actions';
import { getLibrarySliced } from '../../redux/selectors';
import './Library.css';
import { getTitleArrowsUrl, getArtistArrowsUrl, getAlbumArrowsUrl } from './libraryUtils';
import Track from './Track';
import LibraryControls from './LibraryControls';

// Styled
const StyledLibrary = styled.div`
    color: white;
`;

const PLibrary = ({userToken, librarySliced, librarySort, userPlaylists, libraryFilter,
                   onLikedSongsClicked, onTitleClicked, onArtistClicked, onAlbumClicked, onPlaylistClicked, 
                   onNotInPlaylistClicked, onInPlaylistClicked, onNotLikedClicked, onLikedClicked}) => <StyledLibrary>
        <table>
            <thead>
                <tr>
                    <th style={{cursor: "default"}}></th>
                    <th onClick={onLikedSongsClicked} style={libraryFilter.likedSongs ? {backgroundColor: "#555"} : {}}></th>
                    <th onClick={onTitleClicked}><img src={getTitleArrowsUrl(librarySort)} alt="Sorting Arrows"/> Title</th>
                    <th onClick={onArtistClicked}><img src={getArtistArrowsUrl(librarySort)} alt="Sorting Arrows"/> Artist</th>
                    <th onClick={onAlbumClicked}><img src={getAlbumArrowsUrl(librarySort)} alt="Sorting Arrows"/> Album</th>
                    {userPlaylists.filter(p => p.enabled).map(p => <th key={p.id} onClick={onPlaylistClicked(p.id)} style={libraryFilter.playlists.includes(p.id) ? {backgroundColor: "#555"} : {}}>{p.name}</th>)}
                </tr>
            </thead>
            <tbody>
            {librarySliced.map((track) => <Track key={track.id} 
                                                    userToken={userToken} 
                                                    track={track} 
                                                    userPlaylists={userPlaylists} 
                                                    onNotInPlaylistClicked={onNotInPlaylistClicked} 
                                                    onInPlaylistClicked={onInPlaylistClicked}
                                                    onLikedClicked={onLikedClicked}
                                                    onNotLikedClicked={onNotLikedClicked} />)}
            </tbody>
        </table>
        <LibraryControls />
    </StyledLibrary>;
PLibrary.propTypes = {
    userToken: PropTypes.string.isRequired,
    librarySliced: PropTypes.array.isRequired,
    librarySort: PropTypes.object.isRequired,
    libraryFilter: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        librarySliced: getLibrarySliced(state),
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
         onLikedSongsClicked: () => {dispatch(ActionCreator.toggleLikedSongsFilter())},
         onPlaylistClicked: (playlistId) => {return () => dispatch(ActionCreator.toggleLibraryPlaylistFilter(playlistId))},
         onNotInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.addPlaylistTrack(userToken, playlistId, trackId))},
         onInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.deletePlaylistTrack(userToken, playlistId, trackId))},
         onNotLikedClicked: (userToken, trackId) => {return () => dispatch(ActionCreator.addLikedSong(userToken, trackId))},
         onLikedClicked: (userToken, trackId) => {return () => dispatch(ActionCreator.deleteLikedSong(userToken, trackId))}
    }
}
const Library = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PLibrary)

export default Library