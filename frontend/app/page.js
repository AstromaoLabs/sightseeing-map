"use client";
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import './style/global.css';
import { fetchData } from './api';
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import Category from './component/Category';
import locations from './data/location.json';

function HomePage(){
  
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [api, setApi] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [zoom, setZoom] = useState(11);
    const [center, setCenter] = useState({ lat: null, lng: null }); // Start with null values
    const category = ["all", "sightseeing", "restaurant", "cafe"];

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }, []);
  
    // 位置情報が更新されたら、マップの中心を更新
    useEffect(() => {
      if (latitude !== null && longitude !== null) {
        setCenter({ lat: latitude, lng: longitude });
      }
    }, [latitude, longitude]);


    function getDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLng = (lng2 - lng1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    }
  
    // Fetch data from API based on user's location
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
  
    // Use either API data or fallback to local locations data
    const locationData = api && Array.isArray(api) ? api : locations;

    const filteredLocation = locationData.filter(location => {
      if (selectedCategory === 'all') {
        return true;
      }
      return location.category === selectedCategory;
    });

    return(
<>


    <Link href='/login'></Link>
    <Link href='/register'></Link>
    <Link href='/reset-password'></Link>

    <div className="App">
    <h1 className="text-4xl font-bold text-blue-500 mb-4">
          Tailwind CSS is working!
        </h1>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
      <Category categories={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="map">
          {center.lat !== null && center.lng !== null && (
            <Map
              zoom={zoom}
              center={center}
              mapId={process.env.NEXT_PUBLIC_MAP_ID}
              mapOptions={{
                zoomControl: true,
                fullscreenControl: true,
                streetViewControl: false,
                scrollwheel: true,
                gestureHandling: "greedy",
                disableDoubleClickZoom: false,
                zoomControlOptions: {
                  position: window.google?.maps?.ControlPosition?.RIGHT_CENTER || 9, // set to 9 as a fallback
                },
              }}
              onZoomChanged={(event) => setZoom(event.detail.zoom)} 
              onCenterChanged={(event) => setCenter(event.detail.center)}
            >
              {filteredLocation.map((location) => (
                <AdvancedMarker key={location.id} position={{ lat: location.lat, lng: location.lng }}>
                  <div className="pin">
                    {location.thumbnail && <img className="pin-picture" src={location.thumbnail} alt={location.name} />}
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          )}
        </div>
      </APIProvider>
    </div>
    

  
  </>
  );
}
export default HomePage;






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//<Link to={'/login'}></Link>



