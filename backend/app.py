from flask import Flask, request, jsonify
import requests
import os
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all origins (or specify origins if needed)
CORS(app)

# Load environment variables
load_dotenv()

# Set OpenAI API key
openai_api_key = os.getenv('OPENAI_API_KEY')

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

# Set weather API key
weather_api_key = os.getenv('WEATHER_API_KEY')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400
    
    response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_api_key}')
    
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch weather data'}), response.status_code
    
    data = response.json()
    return jsonify(data)

@app.route('/chat', methods=['POST'])
def chat():
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
    app.run(debug=True)