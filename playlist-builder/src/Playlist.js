import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import './App.css';

async function getPlaylist(getAccessToken, playlist) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken },
    });
  
    return await response.json();
}

function Playlist(props) {
    const noBullets = { listStyle: "none" }; // CSS
    const postAccessToken = props.postAccessToken;
    const playlist = props.playlist;
    const [ playlistTracks, setPlaylistTracks ] = useState([]);
    const [ playlistVisible, setPlaylistVisible ] = useState(false);
    
    function showPlaylist(e) {
        e.preventDefault();
        setPlaylistVisible(true);
        setPlaylistTracks([]);
        getPlaylist(postAccessToken, playlist).then(profile => {
            //console.log(profile);
            // profile.items[i].track
            // profile.items[i].track.artists[0].name
            // profile.items[i].track.album.images[0].url
            for (let item of profile.items) {
                setPlaylistTracks((prev) => [...prev, {
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    image: item.track.album.images[0].url
                }]);
            }
        });
    }

    function hidePlaylist(e) {
        e.preventDefault();
        setPlaylistVisible(false);
    }

    return (
        <>
            <button id="show-playlist" onClick={showPlaylist} className={(playlistVisible) ? "hidden" : ""}>Show Playlist</button>
            <button id="hide-playlist" onClick={hidePlaylist} className={(playlistVisible) ? "" : "hidden"}>Hide Playlist</button>
            <ul id="playlist-ul" className={(playlistVisible) ? "" : "hidden"}>
                {playlistTracks.map((item, index) => (
                    <li style={noBullets} key={index}>
                        <img src={item.image} height="32" alt="Album cover"/><div className="text">{item.name}<br /><span className="artist-text">{item.artist}</span></div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Playlist;