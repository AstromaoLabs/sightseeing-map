
import React from 'react';
import './App.css';
import { useEffect } from 'react'; 
import { useState } from 'react'; 
import {fetchData} from './api';
import { APIProvider, Map, Pin, AdvancedMarker} from "@vis.gl/react-google-maps";


function App() {
  const [latitude, setLatitude]=useState(null);
  const [longitude, setLongitude]=useState(null);
  const[api,setApi] = useState(null);
  
 useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
     
    });

  },[]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchData(latitude, longitude).then((data) => {
        setApi(data); 
        console.log(data); 
      }).catch((error) => {
        console.error("Error fetching data:", error); // エラーハンドリング
      });
    }
  }, [latitude, longitude]); 

  const mapContainerStyle = {
    width: "100%",
    height: "500px", 
  };



 

  let center = latitude && longitude ? { lat: latitude, lng: longitude } : null;
 
  console.log(center);
  return (
    <div className="App">
      
    
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        <div className="map">
          <Map zoom={12} center ={center} mapId = {process.env.REACT_APP_MAP_ID}></Map>
        </div>
        <AdvancedMarker position ={center}></AdvancedMarker>
      </APIProvider>
     
   
   

     </div>
  );
}


export default App;
 