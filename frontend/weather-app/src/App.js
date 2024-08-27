import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const getWeather = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.error || 'Failed to fetch weather data');
      }
    } catch (error) {
      alert('Error fetching weather data');
    }
  };

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
          <div className="weather-info">
            <p><strong>City:</strong> {weather.name}</p>
            <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)} °C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          </div>
        )}
      </div>

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
