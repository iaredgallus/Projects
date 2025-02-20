import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import './App.css';

const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
const playlistId = '3DvVwlxBtWk8dikEbWTlV2';
const result = await getToken();
const getAccessToken = result.access_token;
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

async function searchForTrack(getAccessToken, selectedTrack) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${selectedTrack}&type=track`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken },
    });
  
    return await response.json();
}

async function getTrackInfo(getAccessToken, selectedTrackHref) {
    const response = await fetch(selectedTrackHref, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + getAccessToken },
    });
    
    return await response.json();
}

async function getPlaylistTracks() {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + getAccessToken }
  });

  return await response.json();
}

async function playlistToArray() {
  // json.tracks.items[i].track.id
  const trackList = [];
  const json = await getPlaylistTracks();
  const tracks = json.tracks.items;
  for (let t of tracks) {
    trackList.push(t.track.id);
  }
  return trackList || [];
}

async function pushToPlaylist(postAccessToken, selectedTrack) {
  const trackId = selectedTrack.split("tracks/")[1];
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + postAccessToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`]})
  });
  return await response.json();
}

function SearchByTrack(props) {
    const [ track, setTrack ] = useState('');
    const [ titles, setTitles ] = useState([]);
    const [ selectedTrack, setSelectedTrack ] = useState('');
    const [ trackInfo, setTrackInfo ] = useState({});
    const [ trackInfoVisible, setTrackInfoVisible ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ alreadyOnPlaylist, setAlreadyOnPlaylist ] = useState(false);
    const postAccessToken = props.postAccessToken;
    
    function handleChangeTrack(e) {
      setTrack(e.target.value);
    }

    function handleSelectTrack(e) {
      e.preventDefault();
      const currentTrack = selectedTrack;
      if (currentTrack !== e.currentTarget.getAttribute("data-value")) {
        setSelectedTrack(e.currentTarget.getAttribute("data-value"));
        setSuccess(false);
        setAlreadyOnPlaylist(false);
      }
    }

    function handleAddToPlaylist(e) {
      e.preventDefault();
      const trackId = selectedTrack.split("tracks/")[1];
      let alreadyExists = false;
      playlistToArray().then(array => {
        for (let i of array) {
          if (i === trackId) {
            alreadyExists = true;
            setAlreadyOnPlaylist(true);
            break;
          }
        }
        if (!alreadyExists) {
          const response = pushToPlaylist(postAccessToken, selectedTrack);
          setSuccess(true);
          setAlreadyOnPlaylist(false);
        }
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      setSuccess(false);
      if (track === undefined || track === '') {
          console.log("No data entered.");
          return;
      }
      searchForTrack(getAccessToken, track).then(profile => {
          setTitles([]);
          // profile.tracks.items = an array of Tracks
          // profile.albums.items[0].name == Song Title
          // profile.tracks.items[0].artists[0].name == Artist Name
          // profile.albums.items.release_date == YYYY.MM.dd
          const r = profile.tracks.items;
          let numResults = 5;
          for (let i = 0; i < numResults; i++) {
            setTitles(titles => [...titles, [r[i].name, r[i].artists[0].name, r[i].album.release_date.substring(0,4), r[i].href]]);
          }
        });
    }

    useEffect(() => {
      if (!selectedTrack) return;
      setTrackInfoVisible(true);
      getTrackInfo(getAccessToken, selectedTrack).then(profile => {
          setTrackInfo({
            "name": profile.name,
            "artist": profile.artists[0].name,
            "date": profile.album.release_date.substring(0,4),
            "image": profile.album.images[0].url,
            "album": profile.album.name
          });
      });
    }, [selectedTrack]);

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
            <div id="track_info" className={(trackInfoVisible) ? "" : "hidden"} style={{marginTop: "2rem"}}>
                <hr />
                <img src={trackInfo.image} height={128} alt="Album Cover"/>
                <div>{trackInfo.name}</div>
                <div style={{fontStyle:"italic"}}>{trackInfo.album}</div>
                <div>{trackInfo.artist}</div>
                <div>{trackInfo.date}</div>
                <div id="actions" style={{marginTop:"1rem"}}>
                  <button onClick={handleAddToPlaylist} className={(props.loggedIn && !success && !alreadyOnPlaylist) ? "" : "hidden"}>Add to Playlist</button>
                  <div className={(success) ? "" : "hidden"}>Nice! Track added.</div>
                  <div className={(alreadyOnPlaylist) ? "" : "hidden"}>Someone has already recommended this track.</div>
                </div>
            </div>
        </>
    )
}

export default SearchByTrack;