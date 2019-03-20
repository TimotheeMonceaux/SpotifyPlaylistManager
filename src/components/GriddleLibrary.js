import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { ActionCreator } from '../redux/actions';
import './Library.css';

// next step : https://griddlegriddle.github.io/Griddle/examples/getDataFromRowIntoCell/

// Presentational Component
const PGriddleLibrary = ({userToken, library, userPlaylists,  onNotInPlaylistClicked, onInPlaylistClicked}) => (
    <Griddle 
        data={library.map(track => {return {
            Play: track.track.uri,
            Title: track.track.name, 
            Artist: track.track.artists[0].name, 
            Album: track.track.album.name,
            Id: track.track.Id
        }})}
        plugins={[plugins.LocalPlugin, plugins.PositionPlugin({tableHeight: "80vh", fixedHeader: true})]}>
            <RowDefinition>
                {[
                <ColumnDefinition id="Play" title=" " customComponent={({value}) => <a href={value}><img src="/img/play-button.svg" alt="Play Button" /></a>} />,
                <ColumnDefinition id="Title" />,
                <ColumnDefinition id="Artist"/>,
                <ColumnDefinition id="Album"/>,
                userPlaylists.map(p => <ColumnDefinition key={p.id} 
                                                         id={p.name} />)
                ].flat() /* Ugly fix for Griddle does not flatten children by default */}
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