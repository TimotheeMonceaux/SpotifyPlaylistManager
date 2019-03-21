const mapTrack = (APIItem) => { return {
        id: APIItem.track.id,
        name: APIItem.track.name,
        artist: APIItem.track.artists.map(a => a.name).join(", "),
        album: APIItem.track.album.name,
        uri: APIItem.track.uri
    };
}

export default mapTrack;