
import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from "api.js";
import { APIProvider, Map, Pin, AdvancedMarker} from "@vis.gl/react-google-maps";


function App() {
  const [latitude, setLatitude]=useState(null);
  const [longitude, setLongitude]=useState(null);
  
 useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
     
    });
  },[]);

  const mapContainerStyle = {
    width: "100%",
    height: "500px", 
  };

  let center = latitude && longitude ? { lat: latitude, lng: longitude } : null;
 
  console.log(center);
  return (
    <div className="App">
      
    
      <APIProvider apiKey="AIzaSyC9Nd8Kw9ox8YhM4O9eRDp59Lgeoq391JM">
        <div className="map">
          <Map zoom={9} center ={center} mapId = "47d59dda8ea54f4b"></Map>
        </div>
        <AdvancedMarker position ={center}></AdvancedMarker>
      </APIProvider>
     
   
   

     </div>
  );
}


export default App;
 