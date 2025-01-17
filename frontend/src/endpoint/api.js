import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/sightseeing/v1/'; 
const LOGIN_URL = `${BASE_URL}users/login/`;
const REGISTER_URL = `${BASE_URL}users/register/`;
const RESETPASSWORD_URL =`${BASE_URL}users/reset-password`;


const loginUser = async (username, password) => {

  const API_KEY = process.env.REACT_APP_LOGIN_API_KEY || '';
  if (!API_KEY) {
    console.error('API Key is missing. Check .env configuration.');
    alert('Internal configuration error. Please contact support.');
    return;
  }

  console.log("Preparing to send request...");
  console.log("Login URL:", LOGIN_URL);
  console.log("Payload:", { username, password });
  
  try {

    
    const response = await axios.post(
      LOGIN_URL,
      { username, password },
      
      {
        headers: {
          'X-API-KEY': API_KEY, 
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
      
    );

    console.log("API response2:", response);
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
    return null;
  }
};

const registerUser = async(username,email,password)=>{
  const API_KEY = process.env.REACT_APP_LOGIN_API_KEY || '';
  if (!API_KEY) {
    console.error('API Key is missing. Check .env configuration.');
    alert('Internal configuration error. Please contact support.');
    return;
  }


  try{
    const response = await axios.post(
      REGISTER_URL,
      {username,email,password},
      {
        headers: {
          'X-API-KEY': API_KEY, 
          'Content-Type': 'application/json',
        },
        withCredentials:true,
       },
      
      
    );

    console.log("API response2:", response);
    return response.data;
  
  }
  catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return null;
  }
};

const resetUserRequest = async(email)=>{
  const API_KEY = process.env.REACT_APP_LOGIN_API_KEY || '';
  if (!API_KEY) {
    console.error('API Key is missing. Check .env configuration.');
    alert('Internal configuration error. Please contact support.');
    return;
  }


  try{
    const response = await axios.post(
      RESETPASSWORD_URL,
      {email},
      {
        headers: {
          'X-API-KEY': API_KEY, 
          'Content-Type': 'application/json',
        },
        withCredentials:true,
       },
      
      
    );

    console.log("API response2:", response);
    return response.message;
  
  }
  catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return null;
  }
};

export default loginUser;
export { registerUser };
export {resetUserRequest}