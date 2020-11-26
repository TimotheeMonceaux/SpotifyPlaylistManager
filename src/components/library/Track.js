import React from 'react';
import PropTypes from 'prop-types';
import { trackInPlaylist } from './libraryUtils';

const alertLocalFile = () => alert("This operation is not supported with local files");

const NotLiked = ({onImgClicked, localFile}) => <td>
    <img src="/img/heart-empty.svg" onClick={localFile ? alertLocalFile : onImgClicked} alt="Not In Liked Songs" style={localFile ? {cursor: 'not-allowed'} : {}} />
    </td>;
const Liked = ({onImgClicked, localFile}) => <td>
    <img src="/img/heart-full.svg" onClick={localFile ? alertLocalFile : onImgClicked} alt="In Liked Songs" style={localFile ? {cursor: 'not-allowed'} : {}} />
    </td>;

const NotInPlaylist = ({onImgClicked, localFile}) => <td>
    <img src="/img/plus.svg" onClick={localFile ? alertLocalFile : onImgClicked} alt="Not In Playlist" style={localFile ? {cursor: 'not-allowed'} : {}}/>
    </td>;
const InPlaylist = ({onImgClicked, localFile}) => <td>
    <img src="/img/tick.svg" onClick={localFile ? alertLocalFile : onImgClicked} alt="In Playlist" style={localFile ? {cursor: 'not-allowed'} : {}} />
    </td>;

const Track = ({userToken, track, userPlaylists, onNotInPlaylistClicked, onInPlaylistClicked, onNotLikedClicked, onLikedClicked}) => 
    <tr key={track.id}>
        <td><a href={track.uri}><img src="/img/play-button.svg" alt="Play Button" /></a></td>
        {track.liked ? 
            <Liked onImgClicked={onLikedClicked(userToken, track.id)} localFile={track.localFile} /> :
            <NotLiked onImgClicked={onNotLikedClicked(userToken, track.id)} localFile={track.localFile} />}
        <td>{track.name}</td>
        <td>{track.artist}</td>
        <td>{track.album}</td>
        {userPlaylists.filter(p => p.enabled)
                     .map(p => trackInPlaylist(track, p) ? 
                        <InPlaylist key={p.id+track.id} onImgClicked={onInPlaylistClicked(userToken, p.id, track.id)} localFile={track.localFile} /> :
                        <NotInPlaylist key={p.id+track.id} onImgClicked={onNotInPlaylistClicked(userToken, p.id, track.id)} localFile={track.localFile} />)}
</tr>;
Track.propTypes = {
    userToken: PropTypes.string.isRequired,
    track: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    onNotInPlaylistClicked: PropTypes.func.isRequired,
    onInPlaylistClicked: PropTypes.func.isRequired,
    onLikedClicked: PropTypes.func.isRequired,
    onNotLikedClicked: PropTypes.func.isRequired
}

export default Track;