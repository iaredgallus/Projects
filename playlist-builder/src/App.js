//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchByAlbum from './SearchByAlbum';
import SearchByTrack from './SearchByTrack';
const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
// Extract Auth Code if it exists.
const urlParams = new URLSearchParams(window.location.search);
let getCode = urlParams.get("code");
let isLoggedIn = false;
if (getCode !== null) {
    isLoggedIn = true;
}

function App() {
  const [ albumVisible, setAlbumVisible ] = useState(false);
  const [ trackVisible, setTrackVisible ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ authCode, setAuthCode ] = useState(null);
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=playlist-modify-public&state=random_string`;

  useEffect(() => {
    if (getCode !== null) {
      setLoggedIn(true);
      setAuthCode(getCode);
    }
  });

  function toggleAlbum() {
    setAlbumVisible(!albumVisible);
  }
  function toggleTrack() {
    setTrackVisible(!trackVisible);
  }

  return (
    <div className="App">
        <h2>Search for a Song</h2>
        <div className={(loggedIn) ? "hidden" : ""}><a href={loginUrl}>Log in to Spotify to Add Songs</a></div>
        <div className={trackVisible ? "" : "hidden"}>
          <SearchByTrack loggedIn={loggedIn} authCode={authCode}/>
        </div>
    </div>
  );
}

/*
        <button onClick={toggleAlbum}>By Album</button>
        <div className={albumVisible ? "" : "hidden"}>
          <SearchByAlbum />
        </div>
        <button onClick={toggleTrack}>By Track</button>
*/

export default App;
