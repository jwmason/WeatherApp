import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App'; // Adjust the path if necessary

// Test if the heading is rendered
test('renders Weather & Chat App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Weather & Chat App/i);
  expect(headingElement).toBeInTheDocument();
});

// Test if the weather section is rendered correctly
test('renders weather section with input and button', () => {
  render(<App />);
  const weatherHeading = screen.getByText(/Weather/i);
  expect(weatherHeading).toBeInTheDocument();

  const inputElement = screen.getByPlaceholderText(/Enter city name/i);
  expect(inputElement).toBeInTheDocument();

  const buttonElement = screen.getByText(/Get Weather/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test if the chat section is rendered correctly
test('renders chat section with input and button', () => {
  render(<App />);
  const chatHeading = screen.getByText(/Chat with AI/i);
  expect(chatHeading).toBeInTheDocument();

  const inputElement = screen.getByPlaceholderText(/Enter your message/i);
  expect(inputElement).toBeInTheDocument();

  const buttonElement = screen.getByText(/Send Message/i);
  expect(buttonElement).toBeInTheDocument();
});
