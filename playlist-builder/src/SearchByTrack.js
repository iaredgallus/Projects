import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import './App.css';

const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
const playlistId = '3DvVwlxBtWk8dikEbWTlV2';
const result = await getToken();
const accessToken = result.access_token;
const noBullets = { listStyle: "none" }; // CSS

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
    },
  });
  return response.json();
}

async function searchForTrack(accessToken, selectedTrack) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${selectedTrack}&type=track`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    });
  
    return await response.json();
}

async function getTrackInfo(accessToken, selectedTrackHref) {
    const response = await fetch(selectedTrackHref, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    });
    
    return await response.json();
}

async function pushToPlaylist(accessToken, selectedTrack) {
    const testTrack = '05LvE6ySn6hEcHdAJ7N19z';
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
        data: { 'uris': [`spotify:track:${testTrack}`]}
    });
    //console.log('Done.');
    return await response.json();
}

async function testToken(accessToken) {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken}
    });
    return await response.json();
}

function SearchByTrack(props) {
    const [ track, setTrack ] = useState('');
    const [ titles, setTitles ] = useState([]);
    //const [ artists, setArtists ] = useState([]);
    const [ selectedTrack, setSelectedTrack ] = useState('');
    const [ trackInfo, setTrackInfo ] = useState({});
    const [ trackInfoVisible, setTrackInfoVisible ] = useState(false);
    //console.log(props.authCode);
    
    function handleChangeTrack(e) {
        setTrack(e.target.value);
    }

    function handleSelectTrack(e) {
        e.preventDefault();
        setSelectedTrack(e.currentTarget.getAttribute("data-value"));
    }

    function handleAddToPlaylist(e) {
        e.preventDefault();
        //pushToPlaylist(accessToken, selectedTrack);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (track === undefined || track === '') {
            console.log("No data entered.");
            return;
        }
        searchForTrack(accessToken, track).then(profile => {
            setTitles([]);
            // profile.tracks.items = an array of Tracks
            // profile.albums.items[0].name == Song Title
            // profile.tracks.items[0].artists[0].name == Artist Name
            // profile.albums.items.release_date == YYYY.MM.dd
            const r = profile.tracks.items;
            //console.log(r);
            let numResults = 5;
            for (let i = 0; i < numResults; i++) {
              //console.log(`"${r[i].name}" - ${r[i].artists[0].name}, ${r[i].album.release_date.substring(0,4)}`);
              setTitles(titles => [...titles, [r[i].name, r[i].artists[0].name, r[i].album.release_date.substring(0,4), r[i].href]]);
              //console.log(r[i].href);
            }
            //console.log(titles);
          });
    }

    useEffect(() => {
        if (!selectedTrack) return;
        //console.log(selectedTrack);
        setTrackInfoVisible(true);
        getTrackInfo(accessToken, selectedTrack).then(profile => {
            setTrackInfo({
                "name": profile.name,
                "artist": profile.artists[0].name,
                "date": profile.album.release_date.substring(0,4),
                "image": profile.album.images[0].url,
                "album": profile.album.name
            });
        });
    }, [selectedTrack]);

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=playlist-modify-public&state=random_string`;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input id="track_search" value={track} onChange={handleChangeTrack}/>
                <button type="submit">Search</button>
            </form>
            <ul>
                {titles.map((item, index) => (
                    <li style={noBullets} key={index} data-value={item[3]} onClick={handleSelectTrack}>{item[0]} - {item[1]} ({item[2]})</li>
                ))}
            </ul>
            <div id="track_info" className={(trackInfoVisible) ? "" : "hidden"}>
                <img src={trackInfo.image} height={128} alt="Album Cover"/>
                <div>{trackInfo.name}</div>
                <div style={{fontStyle:"italic"}}>{trackInfo.album}</div>
                <div>{trackInfo.artist}</div>
                <div>{trackInfo.date}</div>
                <button onClick={handleAddToPlaylist} className={(props.loggedIn) ? "" : "hidden"}>Add to Playlist</button>
            </div>
        </>
    )
}

// <div className={(props.loggedIn) ? "hidden" : ""}><a href={loginUrl}>Log in to Spotify to Add Songs</a></div>

/*
async function getTrackInfo(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken },
  });
  
  return await response.json();
}

getTrackInfo(accessToken).then(profile => {
  //console.log(profile);
  //console.log(profile.name, "-", profile.album.artists[0].name);
  // profile.name = Song Title
  // profile.album.artists[0].name = Artist
});
*/

export default SearchByTrack;