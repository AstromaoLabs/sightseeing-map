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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

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

  const defaultCenter = { lat: -6.2088, lng: 106.8456 };
  const center = latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

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
                  position: window.google ? window.google.maps.ControlPosition.RIGHT_CENTER : null,  //from the docs 
                },
              }}
              onZoomChanged={(event) => setZoom(event.detail.zoom)} //try try tyr to zoom in and out
            >
            
              <AdvancedMarker position={center} />

            
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
