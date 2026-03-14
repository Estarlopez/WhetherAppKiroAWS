import { useState } from 'react';
import './App.css';

// Geocode a city name using Nominatim (no CORS issues, no API key required)
async function geocodeCity(cityName) {
  let res;
  try {
    res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&countrycodes=us&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }
  if (!res.ok) throw new Error('Geocoding service unavailable. Please try again later.');
  const data = await res.json();
  if (!data.length) throw new Error("City not found. Try including the state, e.g. 'Austin, TX'.");
  const { lat, lon, display_name } = data[0];
  const parts = display_name.split(',');
  return { lat: parseFloat(lat), lon: parseFloat(lon), city: parts[0].trim(), state: (parts[2] || parts[1] || '').trim() };
}

// Get NWS grid metadata for a lat/lon
async function getNWSPoints(lat, lon) {
  let res;
  try {
    res = await fetch(`https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`, {
      headers: { 'User-Agent': 'weather-app-demo' }
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }
  if (!res.ok) throw new Error('Weather data unavailable for this location.');
  const data = await res.json();
  return data.properties.forecast;
}

// Fetch NWS daily forecast periods
async function getForecast(forecastUrl) {
  let res;
  try {
    res = await fetch(forecastUrl, { headers: { 'User-Agent': 'weather-app-demo' } });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }
  if (!res.ok) throw new Error('Weather data unavailable for this location.');
  const data = await res.json();
  return data.properties.periods;
}

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [lastCity, setLastCity] = useState('');

  const runSearch = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    setLoading(true);
    setCurrent(null);
    setForecast([]);
    try {
      const location = await geocodeCity(cityName);
      const forecastUrl = await getNWSPoints(location.lat, location.lon);
      const periods = await getForecast(forecastUrl);

      // Current conditions: first period (daytime)
      const currentPeriod = periods[0];
      setCurrent({
        location: `${location.city}, ${location.state}`,
        temperature: currentPeriod.temperature,
        temperatureUnit: currentPeriod.temperatureUnit,
        shortForecast: currentPeriod.shortForecast,
        humidity: currentPeriod.relativeHumidity?.value ?? 'N/A',
        windSpeed: currentPeriod.windSpeed,
        windDirection: currentPeriod.windDirection,
        icon: currentPeriod.icon,
      });

      // 5-day forecast: next 5 daytime periods
      const daytime = periods.filter((p) => p.isDaytime).slice(0, 5);
      setForecast(daytime);
    } catch (err) {
      setError(err.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLastCity(city);
    runSearch(city);
  };

  const handleRetry = () => runSearch(lastCity || city);

  return (
    <div className="app">
      <h1>Weather App</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter a US city (e.g. Austin, TX)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          Search
        </button>
      </form>

      {loading && (
        <div className="loading" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <span>Loading weather data...</span>
        </div>
      )}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>
          <button className="retry-btn" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {current && (
        <section className="current-conditions" aria-label="Current conditions">
          <h2>Current Conditions</h2>
          <div className="current-body">
            <img
              src={current.icon}
              alt={current.shortForecast}
              className="current-icon"
              width="64"
              height="64"
            />
            <div className="current-details">
              <p className="location">{current.location}</p>
              <p className="temperature">{current.temperature}°{current.temperatureUnit}</p>
              <p className="description">{current.shortForecast}</p>
              <p>Humidity: {current.humidity}%</p>
              <p>Wind: {current.windDirection} {current.windSpeed}</p>
            </div>
          </div>
        </section>
      )}

      {forecast.length > 0 && (
        <section className="forecast" aria-label="5-day forecast">
          <h2>5-Day Forecast</h2>
          <table className="forecast-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Conditions</th>
                <th>Temp (°F)</th>
                <th>Forecast</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((period) => (
                <tr key={period.name}>
                  <td>{period.name}</td>
                  <td>
                    <img
                      src={period.icon}
                      alt={period.shortForecast}
                      className="forecast-icon"
                      width="32"
                      height="32"
                    />
                  </td>
                  <td>{period.temperature}°{period.temperatureUnit}</td>
                  <td>{period.shortForecast}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;
