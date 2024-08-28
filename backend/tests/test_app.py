import unittest
from app import app

class BasicTests(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_weather(self):
        response = self.app.get('/weather?city=London')
        self.assertEqual(response.status_code, 200)
        data = response.json
        
        # Check for current weather data
        self.assertIn('current', data)
        self.assertIn('dt', data['current'])
        self.assertIn('main', data['current'])
        self.assertIn('temp', data['current']['main'])
        self.assertIn('weather', data['current'])
        self.assertIn('description', data['current']['weather'][0])

        # Check for daily forecast data
        self.assertIn('daily', data)
        self.assertGreater(len(data['daily']), 0)  # Ensure there's at least one day of forecast
        for day in data['daily']:
            self.assertIn('dt', day)
            self.assertIn('main', day)
            self.assertIn('temp', day['main'])
            self.assertIn('weather', day)
            self.assertIn('description', day['weather'][0])

    def test_chat(self):
        response = self.app.post('/chat', json={'message': 'Hello'})
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIn('response', data)

if __name__ == '__main__':
    unittest.main()
