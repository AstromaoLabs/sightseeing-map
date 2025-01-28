import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchData } from './api';
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import Category from './component/Category';  
import locationsData from './data/location.json'; 

function UserMap() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [api, setApi] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  

  const categories = ["all", "sightseeing", "restaurant", "cafe"];
  
  const [location, setLocation] = useState(null);
  const [center, setCenter] = useState({ lat: -6.2088, lng: 106.8456 }); 

//currently geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      setLocation(userLocation);
      setCenter(userLocation); 
    });
  }, []);

  // fetch APi
  useEffect(() => {
    if (latitude!==null && longitude!==null) {
      setCenter({ lat: latitude, lng: longitude });
      fetchData(latitude, longitude).then((data) => {
        setApi(data);
        console.log(data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [latitude, longitude]);

  //get the location from APi if they exist otherwise, fetch from json file
  const locationData = api || locationsData; 
  const filteredLocations = locationData.filter(location => {
    if (selectedCategory === "all") {
      return true;  
    }
    return location.category === selectedCategory; 
  });


  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  const showMarker = location && getDistance(location.lat, location.lng, center.lat, center.lng) < 1;

  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        {/* Category Component */}
        <Category 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="map">
          {/* map*/}
          {center && (
            <Map
            zoom={zoom}
            center={center}
            mapId={process.env.REACT_APP_MAP_ID}
            mapOptions={{
              zoomControl: true,
              fullscreenControl: true,
              streetViewControl: false,
              scrollwheel: true,  // ズーム操作の有効化
              gestureHandling: "greedy",  // ジェスチャー操作
              disableDoubleClickZoom: false,
              zoomControlOptions: {
                position: window.google?.maps?.ControlPosition?.RIGHT_CENTER, // 修正
              },
            }}
            onCenterChanged={(event) => setCenter(event.detail.center)}
          >
          
          )}
        </div>
      </APIProvider>
    </div>
  );
}

export default UserMap;
