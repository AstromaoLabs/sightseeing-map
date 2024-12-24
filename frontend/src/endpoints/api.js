import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/sightseeing/v1/'; 
const LOGIN_URL = `${BASE_URL}users/login/`;

const login = async (username, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { username: username, password: password }, 
     // { withCredentials: true } 
    );

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      localStorage.setItem('access_token', response.data.token.access);
      localStorage.setItem('refresh_token', response.data.token.refresh);
      alert('Login successful!');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert('Login failed: ' + (error.response.data.detail || 'Unknown error'));
    } else if (error.request) {
      console.error('Error request:', error.request);
      alert('No response received from server.');
    } else {
      console.error('Error message:', error.message);
      alert('An unexpected error occurred: ' + error.message);
    }
  }
};

export default login;
