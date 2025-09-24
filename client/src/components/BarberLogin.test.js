import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BarberLogin from './BarberLogin';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';


window.alert = jest.fn();


global.fetch = jest.fn((url, options) => {
  if (url === 'https://barberconnect-42tz.onrender.com/api/auth/login') {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          token: 'mock-token',
          barber: { name: 'Test Barber', email: 'test@barber.com' },
        }),
    });
  }

  return Promise.reject(new Error('Unknown URL'));
});

test('renders login form inputs and button', () => {
  render(
    <BrowserRouter>
      <BarberLogin />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('submits form with valid credentials', async () => {
  render(
    <BrowserRouter>
      <BarberLogin />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'test@barber.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'password123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'https://barberconnect-42tz.onrender.com/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@barber.com',
          password: 'password123',
        }),
      })
    );
  });
});
