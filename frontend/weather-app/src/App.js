import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for city input, weather data, chat message, chat response, and PM Accelerator info visibility
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // Function to fetch weather data based on city input
  const getWeather = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather({
          current: data.current,
          daily: data.daily,
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

  // Toggle display of PM Accelerator information
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="App">
      <h1>Weather & Chat App</h1>
      <h3>Developed by Mason Wong</h3>

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

      {/* PM Accelerator Info section */}
      <div className="pm-accelerator-section">
        <button onClick={toggleInfo} className="info-button">
          Info about Product Manager Accelerator
        </button>
        {showInfo && (
          <div className="pm-info">
            <h3>What is Product Manager Accelerator?</h3>
            <p>
            The Product Manager Accelerator is your go-to resource for advancing your career in Product Management.
            Whether you're aiming to secure your first PM role or looking to climb to a Director position, they've
            assisted many students in landing their dream jobs at top companies like FAANG, Fortune 500 firms,
            web3 organizations, and thriving startups. They’re dedicated to supporting you throughout your career journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
