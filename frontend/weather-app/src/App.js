import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for city input, weather data, chat message, and chat response
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // Function to fetch weather data based on city input
  const getWeather = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather({
          current: data.current,
          daily: data.daily
        });
      } else {
        alert(data.error || 'Failed to fetch weather data');
      }
    } catch (error) {
      alert('Error fetching weather data');
    }
  };

  // Function to send chat message and receive response from the server
  const sendMessage = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (response.ok) {
        setChatResponse(data.response);
      } else {
        alert(data.error || 'Failed to get chat response');
      }
    } catch (error) {
      alert('Error fetching chat response');
    }
  };

  return (
    <div className="App">
      <h1>Weather & Chat App</h1>

      {/* Weather section for displaying current weather and 5-day forecast */}
      <div className="weather-section">
        <h2>Weather</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        {weather && (
          <div className="forecast-info">
            <h3>Current Weather</h3>
            <div className="forecast-entry">
              <p><strong>Date:</strong> {new Date(weather.current.dt * 1000).toLocaleDateString()}</p>
              <p><strong>Temperature:</strong> {(weather.current.main.temp - 273.15).toFixed(2)} °C</p>
              <p><strong>Weather:</strong> {weather.current.weather[0].description}</p>
            </div>
            <h3>5-Day Forecast</h3>
            {weather.daily.map((day, index) => (
              <div key={index} className="forecast-entry">
                <p><strong>Date:</strong> {new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p><strong>Temperature:</strong> {(day.main.temp - 273.15).toFixed(2)} °C</p>
                <p><strong>Weather:</strong> {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat section for interacting with the AI */}
      <div className="chat-section">
        <h2>Chat with AI</h2>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        {chatResponse && (
          <div className="chat-response">
            <p><strong>AI:</strong> {chatResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
