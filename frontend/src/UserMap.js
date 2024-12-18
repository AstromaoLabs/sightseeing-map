
import React from 'react';
import './App.css';
import { useEffect } from 'react'; 
import { useState } from 'react'; 
import {fetchData} from './api';
import { APIProvider, Map, Pin, AdvancedMarker} from "@vis.gl/react-google-maps";

const locations = [
  {
    id: 1,
    name: "Kings Park",
    lat: -31.9629 ,
    lng: 115.8319,
    thumbnail: "/pin/kings_park.jpeg"
  },
  {
    id: 2,
    name: "Fremantle Market",
    lat: -32.0569,
    lng: 115.7485,
    thumbnail: "/pin/freamantle_market.jpeg",
  },
  {
    id: 3,
    name: "Top Restaurant",
    lat: -31.9525,
    lng: 115.8610,
    thumbnail: "",
  },
];

function UserMap() {
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
          <Map zoom={11} center ={center} mapId = {process.env.REACT_APP_MAP_ID}></Map>
        </div>
        <AdvancedMarker position ={center}></AdvancedMarker>
        {locations.map((location,index)=>(
          <AdvancedMarker key={index} position={{lat:location.lat,lng: location.lng}} >
            <div className="pin">
              <img className="pin-picture" src={location.thumbnail} alt ={location.name}></img>
            </div>
          </AdvancedMarker>
        ))}
      </APIProvider>
     
   
   

     </div>
  );
}


export default UserMap;
 