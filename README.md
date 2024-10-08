# Weather & Chat App

## Overview

The Weather & Chat App is a web application that allows users to:
- Fetch and view current weather and a 5-day weather forecast for a specified city.
- Interact with an AI chatbot to get responses based on user input.
- Access information about the Product Manager Accelerator (PM Accelerator) through an info button.

## Setup

### Prerequisites

- Node.js and npm (or Yarn) installed.
- Python 3.x and pip (for backend).
- Environment variables for API keys.

### Backend Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/jwmason/WeatherApp.git
    ```

2. **Navigate to the backend**:

    ```bash
    cd backend
    ```

3. **Install Dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Create a '.env' file in the 'backend' directory with the following environment variables**:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    WEATHER_API_KEY=your_weather_api_key
    ```

5. **Run the backend server**:

    ```bash
    python app.py
    ```

### Frontend Setup

1. **Navigate to the React App**:

    ```bash
    cd frontend
    cd weather-chat-app
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the frontend application**:

    ```bash
    npm start
    ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- OpenWeather API for weather data.
- OpenAI API for the chatbot functionality.
- React and Flask communities for their contributions and support.
- Product Manager Accelerator for providing valuable career resources.