// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For redirect after login
import { loginMember } from '../utils/api';  // Import the API utility function

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // For navigating after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the API utility function to login
      const data = await loginMember(username, password);

      // If login is successful, save the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('member', JSON.stringify(data.member));

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      setErrorMessage(error.message || 'An error occurred during login');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
