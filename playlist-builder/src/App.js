//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
//import SearchByAlbum from './SearchByAlbum';
import SearchByTrack from './SearchByTrack';
import Playlist from './Playlist';
let isLoggedIn = false;
const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
const playlistId = '3DvVwlxBtWk8dikEbWTlV2';
const authString = btoa(`${clientId}:${clientSecret}`);
const redirectUri = 'http://localhost:3000'; // THIS NEEDS TO BE UPDATED IF PUTTING ON SERVER
const result = await getToken();
const searchToken = result.access_token;
let accessToken = null;
let refreshToken = null;

// EXTRACT TOKENS BEFORE LOADING APP
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

const urlParams = new URLSearchParams(window.location.search);
let getCode = urlParams.get("code");

if (getCode !== null) {
  isLoggedIn = true;
  window.history.replaceState({}, document.title, window.location.pathname); // This brings the URL back to normal
}

const fetchBody = new URLSearchParams({
  grant_type: "authorization_code",
  code: getCode,
  redirect_uri: redirectUri
});

if (isLoggedIn) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: fetchBody
  });
  
  const data = await response.json();
  accessToken = data.access_token;
  refreshToken = data.refresh_token;
  if (accessToken !== null && refreshToken !== null) {
    console.log("accessToken and refreshToken obtained");
  }
}

/* BEGIN APP COMPONENT */

function App() {
  //const [ albumVisible, setAlbumVisible ] = useState(false);
  const [ trackVisible, setTrackVisible ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(false);
  //const [ authCode, setAuthCode ] = useState(null);
  const [ postAccessToken, setPostAccessToken ] = useState(null);
  const [ postRefreshToken, setPostRefreshToken ] = useState(null);
  const [ givenPassword, setGivenPassword ] = useState("");
  const [ allowed, setAllowed ] = useState(false);
  const [ badPassword, setBadPassword ] = useState(false);
  const password = "recommend!";
  //const appRedirectUri = redirectUri;
  //const getAccessToken = searchToken;
  const playlist = playlistId;
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-modify-public&state=random_string`;

  useEffect(() => {
    if (getCode !== null) {
      setLoggedIn(true);
      //setAuthCode(getCode);
      setPostAccessToken(accessToken);
      setPostRefreshToken(refreshToken);
    }
  });

  function handleGivenPassword(e) {
    e.preventDefault();
    setGivenPassword(e.target.value);
  }

  function handleTryPassword(e) {
    e.preventDefault();
    if (givenPassword === password) {
      setAllowed(true);
      setBadPassword(false);
    } else {
      setBadPassword(true);
    }
  }

  return (
    <div className="App">
        <h1>Recommend a Song</h1>
        <div id="playlist" className={(loggedIn) ? "" : "hidden" }>
          <Playlist postAccessToken={postAccessToken} playlist={playlist}/>
        </div>
        <div id="login" className={(loggedIn) ? "hidden" : ""}>
          <form onSubmit={handleTryPassword} className={(allowed) ? "hidden" : ""}>
            <div>If you want to add a song to my Recommendations playlist, you'll need to ask me for the password.</div>
            <div style={{marginBottom: "1rem"}}>Enter the password below.</div>
            <input id="password" value={givenPassword} onChange={handleGivenPassword} />
            <button id="password-button" style={{ display:"block", margin:"0.5rem auto"}} className="submit-button" type="submit">Enter</button>
          </form>
          <div className={(badPassword) ? "" : "hidden"}>That didn't work.</div>
          <div className={(loggedIn || !allowed) ? "hidden" : ""}>That was it!<br />Next, <a href={loginUrl}>connect to Spotify</a> to add songs directly to my Recommendations playlist.<br />(You're using my API tokens, so be nice.)</div>
        </div>
        <div id="search" className={trackVisible ? "" : "hidden"}>
          <SearchByTrack loggedIn={loggedIn} postAccessToken={postAccessToken} postRefreshToken={postRefreshToken} />
        </div>
    </div>
  );
}

export default App;
