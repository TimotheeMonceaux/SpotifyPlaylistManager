import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreator } from '../../redux/actions';
import { NavDropdown } from 'react-bootstrap';

// Item
const PPlaylist = ({playlist, onPlaylistToggle}) => <NavDropdown.Item as="label"><input type="checkbox" defaultChecked={playlist.enabled} onChange={onPlaylistToggle(playlist.id)}/> {playlist.name}</NavDropdown.Item>;

// Presentational Component
const PPlaylists = ({userPlaylists, onPlaylistToggle}) => (
    <NavDropdown id="userplaylists-dropdown" title="Playlists" style={{color: "white"}}>
        {userPlaylists.map((p) => <PPlaylist playlist={p} key={p.id} onPlaylistToggle={onPlaylistToggle} />)}
    </NavDropdown>
);
PPlaylists.propTypes = {
    userPlaylists: PropTypes.array.isRequired
};

// Container Component
const mapStateToProps = state => {
    return {
        userPlaylists: state.userPlaylists
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onPlaylistToggle: (playlistId) => {return () => dispatch(ActionCreator.toggleUserPlaylist(playlistId))}
    }
}
const Playlists = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PPlaylists);

export default Playlists;