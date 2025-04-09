import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [cityValue, setCityValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityName, setCityName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleCityValue = (e) => {
    setCityValue(e.target.value);
  }

  const handleStateValue = (e) => {
    setStateValue(e.target.value);
  }

  const handleCountryValue = (e) => {
    setCountryValue(e.target.value);
  }

  async function searchCity(searchValue) {
    event.preventDefault();
    const url = `https://nominatim.openstreetmap.org/search?city=${cityValue}&state=${stateValue}&country=${countryValue}&format=json&addressdetails=1&limit=10`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'gaybarfinder'
      }
    });

    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      setLat(data[0].lat);
      setLon(data[0].lon);
      setCityName(data[0].display_name);
    } else {
      setCityName('None');
    }
    //console.log(lat, lon);
  }

  useEffect(() => {
    console.log(cityValue, countryValue, lat, lon);
  }, [cityName]);


  return (
    <>
      <h1>Gay Bar Finder</h1>
      <form onSubmit={searchCity}>
        <input placeholder='City' type='text' size='20' onChange={handleCityValue}/>
        <input placeholder='State' type='text' size='10' onChange={handleStateValue}/>
        <input placeholder='Country' type='text' size='10' onChange={handleCountryValue}/>
        <button type='submit'>Search</button>
        <p>Match: <b>{cityName}</b></p>
      </form>
    </>
  )
}

export default App
