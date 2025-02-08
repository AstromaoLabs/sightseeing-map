import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const SearchLoc = ({ onPlaceSelect, setCenter }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"], //default got it from docu
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelect(place);
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      }
    });
  }, [onPlaceSelect, placeAutocomplete, setCenter]);

  return (
    <div className="bg-white rounded-full">
      <div className="border-2 border-primary flex items-center px-2 rounded-full">
        <input
          ref={inputRef}
          type="text"
          id="search-maps" //console error try try adding id attribute
          name="search-maps" //name attrib
          placeholder="Search Maps"
          className="rounded-full py-2 pl-4 pr-10 outline-none font-ptsans font-medium text-md"
        />
        <Search color={"#001F54"} size={24} />
      </div>
    </div>
  );
};

export default SearchLoc;