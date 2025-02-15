import { useState } from 'react';
import { Buffer } from 'buffer';

const clientId = '9eecd97b0c1f48feae4d1917c29c5a0d';
const clientSecret = 'b73a12900a264892a605ca6c9417964f';
const result = await getToken();
const accessToken = result.access_token;

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

async function searchForAlbum(accessToken, selectedAlbum) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${selectedAlbum}&type=album`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    });
  
    return await response.json();
}

function SearchByAlbum() {
    const [ album, setAlbum ] = useState(''); 
    
    function handleChangeAlbum(e) {
        setAlbum(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (album == undefined || album == '') {
            console.log("No data entered.");
            return;
        }
        searchForAlbum(accessToken, album).then(profile => {
            // profile.albums.items = an array of Album Titles
            // profile.albums.items.name == Song Title
            // profile.albums.items.artists[0].name == Artist Name
            // profile.albums.items.release_date == YYYY.MM.dd
            const r = profile.albums.items;
            console.log(r);
            let numResults = 5;
            for (let i = 0; i < numResults; i++) {
              //console.log(`"${r[i].name}" - ${r[i].artists[0].name}, ${r[i].release_date.substring(0,4)}`);
            }
          });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="album_search" value={album} onChange={handleChangeAlbum}/>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchByAlbum;