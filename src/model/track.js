export const mapTrack = (APIItem, liked = true) => { return {
        id: APIItem.track.id || APIItem.track.uri,
        name: APIItem.track.name,
        artist: APIItem.track.artists.map(a => a.name).join(", "),
        album: APIItem.track.album.name,
        uri: APIItem.track.uri,
        liked: liked,
        localFile: APIItem.track.id === null,
        inPlaylists: {}
    };
}

export const mapTrackFromPlaylist = (APIItem, playlistId) => { return {
        id: APIItem.track.id || APIItem.track.uri,
        name: APIItem.track.name,
        artist: APIItem.track.artists.map(a => a.name).join(", "),
        album: APIItem.track.album.name,
        uri: APIItem.track.uri,
        liked: false,
        localFile: APIItem.track.id === null,
        inPlaylists: { [playlistId]: true }
    };
}