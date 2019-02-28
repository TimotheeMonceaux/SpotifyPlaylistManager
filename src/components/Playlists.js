import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionType } from '../redux/actions';

// Styled
const List = styled.div `
    padding: 25px;
    color: white;
`;
const ListHeader = styled.div`
    font-size: 150%;
    font-weight: bold;
    margin-bottom: 20px;
`;
const StyledPlaylist = styled.div`
    margin-top: 10px;
    margin-left: 10px;
    font-size: 125%;
`;


const PPlaylist = ({playlist, onPlaylistToggle}) => <StyledPlaylist><label><input type="checkbox" defaultChecked={playlist.enabled} onChange={onPlaylistToggle(playlist.id)}/> {playlist.name}</label></StyledPlaylist>;

// Presentational Component
const PPlaylists = ({userPlaylists, onPlaylistToggle}) => (
    <List>
        <ListHeader>My Playlists:</ListHeader>
        {userPlaylists.map((p) => <PPlaylist playlist={p} key={p.id} onPlaylistToggle={onPlaylistToggle} />)}
    </List>
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
const mapDispatchToPros = (dispatch) => {
    onPlaylistToggle: (playlistId) => {() => dispatch({type: ActionType.TOGGLE_USER_PLAYLIST, playlistId: playlistId})}
}
const Playlists = connect(
    mapStateToProps,
    mapDispatchToPros
  )(PPlaylists);

export default Playlists;