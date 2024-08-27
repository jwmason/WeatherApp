# tests/test_app.py
import unittest
from app import app

class BasicTests(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_weather(self):
        response = self.app.get('/weather?city=London')
        self.assertEqual(response.status_code, 200)

    def test_chat(self):
        response = self.app.post('/chat', json={'message': 'Hello'})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()