import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { ActionCreator } from '../redux/actions';
import './Library.css';

// Presentational Component
const PGriddleLibrary = ({userToken, library, userPlaylists,  onNotInPlaylistClicked, onInPlaylistClicked}) => (
    <Griddle 
        data={library.map(track => {return {
            Play: track.track.uri,
            Title: track.track.name, 
            Artist: track.track.artists[0].name, 
            Album: track.track.album.name
        }})}
        plugins={[plugins.LocalPlugin]}>
            <RowDefinition>
                <ColumnDefinition id="Play" customComponent={({value}) => <a href={value}><img src="/img/play-button.svg" alt="Play Button" /></a>} />
                <ColumnDefinition id="Title"/>
                <ColumnDefinition id="Artist"/>
                <ColumnDefinition id="Album"/>
            </RowDefinition>
        </Griddle>
);
PGriddleLibrary.propTypes = {
    userToken: PropTypes.string.isRequired,
    library: PropTypes.array.isRequired,
    userPlaylists: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        library: state.library,
        userPlaylists: state.userPlaylists
    };
}
const mapDispatchToProps = dispatch => {
    return {
         onNotInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.addPlaylistTrack(userToken, playlistId, trackId))},
         onInPlaylistClicked: (userToken, playlistId, trackId) => {return () => dispatch(ActionCreator.deletePlaylistTrack(userToken, playlistId, trackId))}
    }
}
const GriddleLibrary = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PGriddleLibrary)

export default GriddleLibrary