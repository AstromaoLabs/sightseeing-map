import { useEffect, useState } from 'react';
import { fetchData } from './api';
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import Category from './component/Category';
import locations from './data/location.json';

function UserMap() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [api, setApi] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const category = ["all", "sightseeing", "restaurant", "cafe"];

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

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

  // Set the center of the map
  let center = latitude && longitude ? { lat: latitude, lng: longitude } : null;

  // Use either API data or fallback to local locations data
  const locationData = api && Array.isArray(api) ? api : locations;

  // Filter locations based on selected category
  const filteredLocation = locationData.filter(location => {
    if (selectedCategory === 'all') {
      return true;
    }
    return location.category === selectedCategory;
  });

  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
        {/* Category Component */}
        <Category 
          categories={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="map">
          {/* Map Component */}
          <Map
            zoom={11}
            center={center}
            mapId={process.env.REACT_APP_MAP_ID}
            style={{ width: "100%", height: "500px" }}
          >
            {/* User's Current Location Marker */}
            {center && <AdvancedMarker position={center} />}

            {/* Location Markers */}
            {filteredLocation.map((location, index) => {
              const mapBorderClass = selectedCategory === 'all' ? 
                `map-border-${location.category}` : `map-border-${selectedCategory}`;

              return (
                <div key={index}>
                  <AdvancedMarker position={{ lat: location.lat, lng: location.lng }} />
                  <div className={`pin ${mapBorderClass}`}>
                    <img className="pin-picture" src={location.thumbnail} alt={location.name} />
                  </div>
                </div>
              );
            })}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default UserMap;
