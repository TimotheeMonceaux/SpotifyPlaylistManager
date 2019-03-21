import React from 'react';
import PropTypes from 'prop-types';

const NotInPlaylist = ({onImgClicked}) => <td><img src="/img/plus.svg" onClick={onImgClicked} alt="Not In Playlist"/></td>;
const InPlaylist = ({onImgClicked}) => <td><img src="/img/tick.svg" onClick={onImgClicked} alt="In Playlist"/></td>;
const Track = ({userToken, track, userPlaylists, onNotInPlaylistClicked, onInPlaylistClicked}) => 
    <tr key={track.track.id}>
        <td><a href={track.track.uri}><img src="/img/play-button.svg" alt="Play Button" /></a></td>
        <td>{track.track.name}</td>
        <td>{track.track.artists[0].name}</td>
        <td>{track.track.album.name}</td>   
        {userPlaylists.filter(p => p.enabled)
                     .map(p => p.tracks[track.track.id] === true ? 
                        <InPlaylist key={p.id+track.track.id} onImgClicked={onInPlaylistClicked(userToken, p.id, track.track.id)} /> :
                        <NotInPlaylist key={p.id+track.track.id} onImgClicked={onNotInPlaylistClicked(userToken, p.id, track.track.id)} />)}
</tr>;
Track.propTypes = {
    userToken: PropTypes.string.isRequired,
    track: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    onNotInPlaylistClicked: PropTypes.func.isRequired,
    onInPlaylistClicked: PropTypes.func.isRequired
}

export default Track;