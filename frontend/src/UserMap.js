import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchData } from './api';
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const locations = [
  {
    id: 1,
    name: "Kings Park",
    lat: -31.9629,
    lng: 115.8319,
    thumbnail: "/pin/kings_park.jpeg"
  },
  {
    id: 2,
    name: "Fremantle Market",
    lat: -32.0569,
    lng: 115.7485,
    thumbnail: "/pin/fremantle_market.jpeg",
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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(12); 
  const [api, setApi] = useState(null);

  const defaultCenter = { lat: -6.2088, lng: 106.8456 };
  const [location, setLocation] = useState(null); 
  const [center, setCenter] = useState(defaultCenter); //try 1
  // const center = latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter; //orig code

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      setLocation(userLocation);
      setCenter(userLocation);
    });
  }, []);

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

  const showMarker = location && getDistance(location.lat, location.lng, center.lat, center.lng) < 1;

  useEffect(() => {
    if (latitude && longitude) {
      setCenter({ lat: latitude, lng: longitude });
      fetchData(latitude, longitude).then((data) => {
        setApi(data);
        console.log(data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        <div className="map">
          {center && (
            <Map
              zoom={zoom}
              center={center}
              mapId={process.env.REACT_APP_MAP_ID}
              mapOptions={{
                zoomControl: true,
                fullscreenControl: true,
                streetViewControl: false,
                scrollwheel: true,
                gestureHandling: "greedy",
                disableDoubleClickZoom: false,
                zoomControlOptions: {
                  position: window.google?.maps?.ControlPosition?.RIGHT_CENTER || 9, // set to 9 as a fallback i guess
                },
              }}              
              // onZoomChanged={(event) => setZoom(event.detail.zoom)} //try try tyr to zoom in and out
              onCenterChanged={(event) => setCenter(event.detail.center)}>
            
            {showMarker && location && <AdvancedMarker position={location} />}

            
              {locations.map((location) => (
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
  );
}

export default UserMap;
