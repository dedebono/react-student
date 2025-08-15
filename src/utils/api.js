// /utils/api.js
import axios from 'axios';

// Set up the base URL for the API (adjust if necessary)
const API_URL = process.env.REACT_APP_API_URL;

// Function to login
export const loginMember = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    return response.data; // Return the response data if successful
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle error
  }
};
