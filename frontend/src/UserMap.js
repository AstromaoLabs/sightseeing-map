import { useEffect, useState } from "react";
import "./App.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import locations from "./data/location.json";
import { fetchData } from "./api";

const UserMap = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  center,
  setCenter,
  zoom,
  setZoom,
  selectedPlace,
}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [api, setApi] = useState([]);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  // use either API data or fallback to local locations data
  useEffect(() => {
    if (latitude && longitude) {
      fetchData(latitude, longitude)
        .then((data) => {
          setApi(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [latitude, longitude]);

  const locationData = api && Array.isArray(api) ? api : locations;

  //filtering location based on category component
  const filteredLocation =
    selectedCategory.toLowerCase() === "all"
      ? locationData
      : locationData.filter(
          (location) =>
            location.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  //added this for markers info. pls check also docu
  // const MarkerWithInfoWindow = ({ position, location }) => {
  //   const [infoWindowShown, setInfoWindowShown] = useState(false);

  //   const handleMarkerClick = useCallback(() => {
  //     setInfoWindowShown((isShown) => !isShown);
  //   }, []);

  //   const handleClose = useCallback(() => setInfoWindowShown(false), []);

  //   return (
  //     <>
  //      <AdvancedMarker
  //       ref={markerRef}
  //       position={position}
  //       onClick={handleMarkerClick}
  //     >
  //       <div className="pin">
  //         {location.thumbnail && (
  //           <img
  //             className="pin-picture"
  //             src={location.thumbnail}
  //             alt={location.name}
  //           />
  //         )}
  //       </div>
  //     </AdvancedMarker>

  //       {infoWindowShown && (
  //         <InfoWindow position={position} onClose={handleClose}>
  //           <h2>{location.name}</h2>
  //           <p>{location.desc}</p>
  //         </InfoWindow>
  //       )}
  //     </>
  //   );
  // };

  const MapHandler = ({ place, marker }) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }

      marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
  };

  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        <div className="map">
          <Map
            defaultZoom={zoom}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            mapId={process.env.REACT_APP_MAP_ID}
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
                    <img
                      className="pin-picture"
                      src={location.thumbnail}
                      alt={location.name}
                    />
                  )}
                </div>
              </AdvancedMarker>
            ))}

            <AdvancedMarker ref={markerRef} position={null} />

            <MapHandler place={selectedPlace} marker={marker} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default UserMap;
