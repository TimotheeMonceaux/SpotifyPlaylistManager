const mapTrack = (APIItem, liked = true) => { return {
        id: APIItem.track.id,
        name: APIItem.track.name,
        artist: APIItem.track.artists.map(a => a.name).join(", "),
        album: APIItem.track.album.name,
        uri: APIItem.track.uri,
        liked: liked,
        inPlaylists: {}
    };
}

export default mapTrack;