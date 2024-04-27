import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'c03e3eb57db54921a6093656242704';

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data.current);
        setLoading(false);
      })
      .catch(error => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Loading data...</p>}
      {weatherData && (
        <div className="weather-details">
          <div className="weather-card">
            <span>Temperature:</span>
            <span>{weatherData.temp_c}°C</span>
          </div>
          <div className="weather-card">
            <span>Humidity:</span>
            <span>{weatherData.humidity}%</span>
          </div>
          <div className="weather-card">
            <span>Condition:</span>
            <span>{weatherData.condition.text}</span>
          </div>
          <div className="weather-card">
            <span>Wind Speed:</span>
            <span>{weatherData.wind_kph} km/h</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
