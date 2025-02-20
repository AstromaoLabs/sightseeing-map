"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import locations from "../data/location.json";

const UserMap = ({
  categories,
  selectedCategory = "all",
  center,
  zoom,
  selectedPlace,
}) => {
  const [userLocation, setUserLocation] = useState(null); 
  const [markerRef, marker] = useAdvancedMarkerRef();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("geolocation is not supported by your browser. pleaseeeeee try to enable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("errrrrrrrror getting location:", error);
        alert("failed to get location.");
      }
    );
  };

  // filter in cat in header
  const filteredLocation =
    selectedCategory.toLowerCase() === "all"
      ? locations
      : locations.filter(
          (location) =>
            location.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const MapHandler = ({ place, marker }) => {
    const map = useMap();

    if (!map || !place || !marker) return null;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;
    return null;
  };

  return (
    <div className="App">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="map">

          <Map
            defaultZoom={zoom}
            defaultCenter={center}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {filteredLocation.map((location) => (
              <AdvancedMarker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div className="pin">
                  {location.thumbnail && (
                    <Image
                      className="pin-picture"
                      width={50}
                      height={50}
                      src={location.thumbnail}
                      alt={location.name}
                    />
                  )}
                </div>
              </AdvancedMarker>
            ))}

            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <h1>
                  im hereeeee
                </h1>
              </AdvancedMarker>
            )}

            <AdvancedMarker ref={markerRef} position={null} />

            <MapHandler place={selectedPlace} marker={marker} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default UserMap;
