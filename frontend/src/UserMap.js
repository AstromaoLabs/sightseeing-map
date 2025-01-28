
import React from 'react';
import './App.css';
import { useEffect } from 'react'; 
import { useState } from 'react'; 
import {fetchData} from './api';
import { APIProvider, Map, Pin, AdvancedMarker} from "@vis.gl/react-google-maps";
import Category from './component/Category';
import locations from './data/location.json';

function UserMap() {
  const [latitude, setLatitude]=useState(null);
  const [longitude, setLongitude]=useState(null);
  const[api,setApi] = useState([]);
  const[selectedCategory,setSelectedCategory] = useState("all");
  const category=["all","sightseeing","restaurant","cafe"];
  
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
        console.error("Error fetching data:", error); 
      });
    }
  }, [latitude, longitude]); 

  const mapContainerStyle = {
    width: "100%",
    height: "500px", 
  };



 

  let center = latitude && longitude ? { lat: latitude, lng: longitude } : null;
  const locationData = api && Array.isArray(api) ? api : locations;
  const filteredLocation = locationData.filter(location => {
    if(selectedCategory === 'all'){
      return true;
    }
    return location.category===selectedCategory;
  });
 
  console.log(center);
  console.log(selectedCategory);
  console.log(filteredLocation);
  console.log(setSelectedCategory);
  return (
   
    <div className="App">
      
    
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        <Category categories={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
        <div className="map">
          <Map zoom={11} center ={center} mapId = {process.env.REACT_APP_MAP_ID}></Map>
        </div>
        <AdvancedMarker position ={center}></AdvancedMarker>
        {filteredLocation?.map((location,index)=>{
          const mapBorderClass= selectedCategory==='all'?`map-border-${location.category}`:`map-border-${selectedCategory}`;
           
           return(
          <AdvancedMarker key={index} position={{lat:location.lat,lng: location.lng}} >
            <div className={`pin ${mapBorderClass}`}>
              <img className="pin-picture" src={location.thumbnail} alt ={location.name}></img>
            </div>
            
          </AdvancedMarker>
           );
           })}
      </APIProvider>
     
   
   

     </div>
  );
}
export default UserMap;
 