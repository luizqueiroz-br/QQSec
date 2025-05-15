import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the fetch function to simulate different authentication states
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve({ logged_in: false }), // Default to not logged in
  })
}) as jest.Mock;

describe('App Component', () => {
  it('should redirect to login page when not authenticated', async () => {
    // Arrange
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ logged_in: false }),
      })
    );

    // Act
    render(
      <Router>
        <App />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('should render dashboard when authenticated', async () => {
    // Arrange
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ logged_in: true }),
      })
    );

    // Act
    render(
      <Router>
        <App />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument(); // Replace 'Dashboard' with text from your actual Dashboard component
    });
  });

  it('should successfully log in with admin credentials', async () => {
    // Mock the fetch function to simulate successful login
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ logged_in: true, user: { username: 'admin' } }),
      })
    );

    // Mock the login function in authService
    const mockLogin = jest.fn(() => Promise.resolve(true));
    jest.mock('./components/services/authService', () => ({
      login: mockLogin,
    }));
    
    // Act
    render(
      <Router>
        <App />
      </Router>
    );
    
    const user = userEvent.setup()

    // Simulate typing in the username and password
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'xxxx');

    // Simulate clicking the login button
    const loginButton = screen.getByText('Acessar');
    await user.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
