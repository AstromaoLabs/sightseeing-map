"use client";

import { useEffect, useState } from 'react';
import Header from "../components/nav/Header"
import UserMap from "./main/page"
import { APIProvider } from "@vis.gl/react-google-maps";
import { Binoculars, Coffee, Map, Utensils } from 'lucide-react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const categories = [
    { name: "All", icon: <Map size={20}/> },
    { name: "Sightseeing", icon: <Binoculars size={20}/>}, 
    { name: "Restaurant", icon: <Utensils size={20}/> }, 
    { name: "Cafe", icon: <Coffee size={20}/> }, 
  ];

  // get user's current loc
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  // update center when latitude or longitude changes
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCenter={setCenter}
        setSelectedPlace={setSelectedPlace}
      />
      <UserMap
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        center={center}
        setCenter={setCenter}
        zoom={zoom}
        setZoom={setZoom}
        selectedPlace={selectedPlace}
      />
    </APIProvider>
  );
};

export default App;