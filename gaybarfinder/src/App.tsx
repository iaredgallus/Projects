import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [cityValue, setCityValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityName, setCityName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCityValue = (e) => {
    setCityValue(e.target.value);
  }

  const handleStateValue = (e) => {
    setStateValue(e.target.value);
  }

  const handleCountryValue = (e) => {
    setCountryValue(e.target.value);
  }

  async function searchCity(event: Event) {
    event.preventDefault();
    setLoading(true);
    setBars([]);

    // FETCH CITY DATA
    const url = `https://nominatim.openstreetmap.org/search?city=${cityValue}&state=${stateValue}&country=${countryValue}&format=json&addressdetails=1&limit=10`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'gaybarfinder'
      }
    });

    const data = await response.json();
    //console.log(data);

    // IF CITY IS NOT NULL
    if (data.length > 0) {
      setLat(data[0].lat);
      setLon(data[0].lon);
      setCityName(data[0].display_name);
    } else {
      setCityName('None');
    }
  }

  async function searchBars() {
    const barsUrl = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(nwr["amenity"~"^(bar|nightclub)$"]["lgbtq"="primary"](around:20000,${lat},${lon}););out body;out tags center qt;`
    /* `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(` + 
        `node["amenity"="lgbtq+ bar"](around:10000,${lat},${lon});` + 
        `node["amenity"="bar"]["lgbtq"="primary"](around:10000,${lat},${lon});` +
        `node["amenity"="nightclub"]["lgbtq"="primary"](around:10000,${lat},${lon});` +
        `way["amenity"="lgbtq+ bar"](around:10000,${lat},${lon});` + 
        `way["amenity"="bar"]["lgbtq"="primary"](around:10000,${lat},${lon});` +
        `way["amenity"="nightclub"]["lgbtq"="primary"](around:10000,${lat},${lon});` +
      `);out body;>;out tags center qt;`; */
    const barsResponse = await fetch(barsUrl, {
      headers: {
        'User-Agent': 'gaybarfinder'
      }
    });

    const barsData = await barsResponse.json();
    let newItems = [];
    const seen = new Set();

    for (let b of barsData.elements) {
      const key = `${b.type}/${b.id}`;
      if (seen.has(key)) {
        continue;
      } else {
        seen.add(key);
      }
      let newItem = {
        name: b.tags.name,
        number: b.tags['addr:housenumber'],
        street: b.tags['addr:street'],
        city: b.tags['addr:city'],
        state: b.tags['addr:state'],
        postcode: b.tags['addr:postcode']
      };
      newItems.push(newItem);
    }
    //console.log('TEMPORARY ARRAY:', newItems);
    setBars(prev => [...prev, ...newItems]);
    setLoading(false);
  }


  useEffect(() => {
    if (cityName !== '') {
      searchBars();
    }
  }, [cityName]);

  useEffect(() => {
    //console.log('BARS STATE ARRAY:', bars);
  }, [bars]);

  return (
    <>
      <h1>Gay Bar Finder</h1>
      <form onSubmit={searchCity}>
        <input placeholder='City' type='text' size='20' onChange={handleCityValue}/>
        <input placeholder='State' type='text' size='10' onChange={handleStateValue}/>
        <input placeholder='Country' type='text' size='10' onChange={handleCountryValue}/>
        <button type='submit'>Search</button>
        {cityName === '' ? <p>No City Selected</p> : <p><b>{cityName}</b></p>}
        {loading ? <p>Loading Results...</p> : <></>}
        {cityName === '' || bars.length > 0 || loading ?
        <ul>
          {bars.map((bar, index) => (<li key={index}>
            <a href={`https://google.com/maps/search/${bar.name}+${cityName}`} target='_blank'>{bar.name}</a> 
            &nbsp;{bar.number || ''} {bar.street || ''} {bar.city || ''} {bar.state || ''} {bar.postcode}
          </li>
          ))}
        </ul>
        : 
        <p>No Results</p>}
      </form>
    </>
  )
}

export default App
