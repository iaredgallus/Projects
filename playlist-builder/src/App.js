import logo from './logo.svg';
import './App.css';
import { Buffer } from 'buffer';

const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';

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

async function getTrackInfo(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken },
  });
  
  return await response.json();
}

const result = await getToken();
const accessToken = result.access_token;
//console.log('Access Token:', accessToken);

getTrackInfo(accessToken).then(profile => {
  //console.log(profile);
  console.log(profile.name, "-", profile.album.artists[0].name);
  // profile.name = Song Title
  // profile.album.artists[0].name = Artist
});

async function searchFor(access_token) {
  const response = await fetch("https://api.spotify.com/v1/search?q=Kim%2520Petras&type=album", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken },
  });

  return await response.json();
}

searchFor(accessToken).then(profile => {
  // profile.albums.items = an array of Album Titles
  const results = profile.albums.items;
  for (let r of results) {
    console.log(r.name);
  }
});

// '

/*
getToken().then(response => {
  getTrackInfo(response.access_token).then(profile => {
    console.log(profile)
  })
});
*/

/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/

function App() {
  return (
    <div className="App">
      <section>
        <p>This is a test!</p>
      </section>
    </div>
  );
}

export default App;
