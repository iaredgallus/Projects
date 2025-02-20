//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
//import SearchByAlbum from './SearchByAlbum';
import SearchByTrack from './SearchByTrack';
let isLoggedIn = false;
const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
const authString = btoa(`${clientId}:${clientSecret}`);
const redirectUri = 'http://localhost:3000'; // THIS NEEDS TO BE UPDATED IF PUTTING ON SERVER
let accessToken = null;
let refreshToken = null;

// EXTRACT TOKENS BEFORE LOADING APP
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
  const appRedirectUri = redirectUri;
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
        <h2>Search for a Song</h2>
        <div className={trackVisible ? "" : "hidden"}>
          <SearchByTrack loggedIn={loggedIn} postAccessToken={postAccessToken} postRefreshToken={postRefreshToken} />
        </div>
        <div style={{marginTop: "4rem"}} className={(loggedIn) ? "hidden" : ""}>
          <hr />
          <form onSubmit={handleTryPassword} className={(allowed) ? "hidden" : ""}>
            <div>If you want to add a song to my Recommendations playlist, you'll need to ask me for the password.</div>
            <div>Enter password below.</div>
            <input id="password" value={givenPassword} onChange={handleGivenPassword} />
            <button type="submit">Enter</button>
          </form>
          <div className={(badPassword) ? "" : "hidden"}>That didn't work.</div>
          <div className={(loggedIn || !allowed) ? "hidden" : ""}>That was it!<br />Next, <a href={loginUrl}>connect to Spotify</a> to add songs directly to my Recommendations playlist.<br />(You're using my API tokens, so be nice.)</div>
        </div>
    </div>
  );
}

export default App;
