const apiKey = process.env.REACT_APP_API_KEY;

export const fetchData = async () => {
  try {
    const response = await fetch(`https://api.example.com/data?key=${apiKey}`);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};