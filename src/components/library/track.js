import React from 'react';
import PropTypes from 'prop-types';

const NotInPlaylist = ({onImgClicked}) => <td><img src="/img/plus.svg" onClick={onImgClicked} alt="Not In Playlist"/></td>;
const InPlaylist = ({onImgClicked}) => <td><img src="/img/tick.svg" onClick={onImgClicked} alt="In Playlist"/></td>;
const Track = ({userToken, track, userPlaylists, onNotInPlaylistClicked, onInPlaylistClicked}) => 
    <tr key={track.id}>
        <td><a href={track.uri}><img src="/img/play-button.svg" alt="Play Button" /></a></td>
        <td>{track.name}</td>
        <td>{track.artist}</td>
        <td>{track.album}</td>   
        {userPlaylists.filter(p => p.enabled)
                     .map(p => p.tracks[track.id] === true ? 
                        <InPlaylist key={p.id+track.id} onImgClicked={onInPlaylistClicked(userToken, p.id, track.id)} /> :
                        <NotInPlaylist key={p.id+track.id} onImgClicked={onNotInPlaylistClicked(userToken, p.id, track.id)} />)}
</tr>;
Track.propTypes = {
    userToken: PropTypes.string.isRequired,
    track: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    onNotInPlaylistClicked: PropTypes.func.isRequired,
    onInPlaylistClicked: PropTypes.func.isRequired
}

export default Track;