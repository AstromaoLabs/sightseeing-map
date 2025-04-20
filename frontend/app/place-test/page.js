

"use client";

import { useState } from 'react';
import {userLocation} from '../endpoint/api'; 

const LocationComponent = () => {
  const [name, setName] = useState('..');
  const [lng, setLng] = useState('...');
  const [lat, setLat] = useState('..');
  const [category, setCategory] = useState('.....');
  const [img, setImg] = useState('...');
  const [locationData, setLocationData] = useState(null); 

  // ユーザーの位置情報をAPIに送信する関数
  const handleLocation = async (e) => {
    e.preventDefault();
    
    // userLocation関数でAPIを呼び出す
    const data = await userLocation(name, lng, lat, category, img);
    
    // レスポンスをコンソールに表示
    console.log("Login response data:", data);
    console.log("API response:", data);
    console.log("MAP_API_KEY:", process.env.NEXT_PUBLIC_MAP_API_KEY);
    setLocationData (data);
  };

  return (
    <div className="login-container">
      <h1>User Location</h1>
  
      {locationData && locationData.locations && locationData.locations.length > 0 ? (
        <>
          <p><strong>Name:</strong> {locationData.locations[0].name}</p>
          <p><strong>Longitude:</strong> {locationData.locations[0].lng}</p>
          <p><strong>Latitude:</strong> {locationData.locations[0].lat}</p>
          <p><strong>Category:</strong> {locationData.locations[0].category}</p>
          <p><strong>Image URL:</strong> 
            <a href={locationData.locations[0].img} target="_blank" rel="noopener noreferrer">
              {locationData.locations[0].img}
            </a>
          </p>
        </>
      ) : (
        <p>Location data not loaded yet.</p>
      )}
  
      <button onClick={handleLocation}>Submit Location</button>
    </div>
  );
  
};

export default LocationComponent;



