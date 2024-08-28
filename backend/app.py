from flask import Flask, request, jsonify
import requests
import os
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime, timedelta

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing
load_dotenv()  # Load environment variables from a .env file

# Retrieve API keys from environment variables
openai_api_key = os.getenv('OPENAI_API_KEY')
weather_api_key = os.getenv('WEATHER_API_KEY')

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

from datetime import datetime, timedelta

def filter_weather_data(daily_data):
    """
    Filter the daily weather data to include only the next 5 days, with one entry per day.

    Args:
        daily_data (list): List of weather data entries.

    Returns:
        list: Filtered list of weather data entries for the next 5 days.
    """
    today = datetime.utcnow().date()
    end_date = today + timedelta(days=6)  # Include 6 days to get the next 5 days
    daily_forecast = {}
    
    for entry in daily_data:
        date = datetime.fromtimestamp(entry['dt']).date()
        if today < date <= end_date:
            date_str = date.strftime('%Y-%m-%d')
            # Choose the forecast with the closest time to midday
            if date_str not in daily_forecast or entry['dt'] % 86400 < daily_forecast[date_str]['dt'] % 86400:
                daily_forecast[date_str] = entry
    
    return list(daily_forecast.values())

@app.route('/weather', methods=['GET'])
def get_weather():
    """
    Endpoint to fetch current weather and a 5-day forecast for a specified city.

    Query Parameters:
        city (str): The name of the city to fetch weather data for.

    Returns:
        Response: A JSON response containing the city name, current weather, and filtered daily forecast data.
    """
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400
    
    # Fetch 5-day weather forecast
    response = requests.get(f'http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={weather_api_key}')
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch weather data'}), response.status_code
    
    data = response.json()
    
    # Fetch current weather
    current_weather_response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_api_key}')
    if current_weather_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch current weather data'}), current_weather_response.status_code
    
    current_weather = current_weather_response.json()
    
    # Prepare and filter data
    daily_data = [entry for entry in data['list']]
    filtered_data = filter_weather_data(daily_data)
    
    return jsonify({
        'city': data['city'],
        'current': current_weather,
        'daily': filtered_data
    })

@app.route('/chat', methods=['POST'])
def chat():
    """
    Endpoint to interact with the OpenAI API for a chat response based on user input.

    Request Body:
        {
            "message": "User message"
        }

    Returns:
        Response: A JSON response containing the chat response from OpenAI.
    """
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'error': 'Message is required'}), 400
    
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "user", "content": user_input}
            ],
            model="gpt-3.5-turbo",
            max_tokens=50
        )
        return jsonify({'response': response['choices'][0]['message']['content'].strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True)