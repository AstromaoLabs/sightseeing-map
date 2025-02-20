"use client";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const fetchData = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};