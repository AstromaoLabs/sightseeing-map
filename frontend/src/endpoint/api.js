import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/sightseeing/v1/'; 
const LOGIN_URL = `${BASE_URL}users/login/`;

const loginUser = async (username, password) => {

  const API_KEY = process.env.REACT_APP_LOGIN_API_KEY || '';
  if (!API_KEY) {
    console.error('API Key is missing. Check .env configuration.');
    alert('Internal configuration error. Please contact support.');
    return;
  }


  try {

    
    const response = await axios.post(
      LOGIN_URL,
      { username, password },
      {
        headers:{
          'X-API-KEY':process.env.REACT_APP_LOGIN_API_KEY,
          'Content-Type': 'application/json',
          
        },
        //withCredentials: true,
      }
      
    );

    return response.data;

  } catch (error) {
    // Get Axios error detail
    if (error.response) {
      // error from server
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // Send the request and no response from server
      console.error("No response received:", error.request);
    } else {
      // Setting request error
      console.error("Error setting up request:", error.message);
     
    }
  }
};


export default loginUser;