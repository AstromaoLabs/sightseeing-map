import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);
    const [databaseData, setDatabaseData] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newDatabaseMessage, setNewDatabaseMessage] = useState("");
    const [newDatabaseNumber, setNewDatabaseNumber] = useState("");
    const [successHardcodedMessage, setSuccessHardcodedMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Fetcch existing hardcoded API data
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/simple-api/")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching the API:", error));
    }, []);

    // Fetch database API data from Django
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/simple-database-api/")
            .then((response) => response.json())
            .then((data) => setDatabaseData(data))
            .catch((error) => console.error("Error fetching the database API:", error));
    }, []);

    // Handle form submission for hardcoded API
    const handleHardcodedSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch("http://127.0.0.1:8000/api/simple-api-post/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: newMessage,
                number: parseInt(newNumber),
              })
          });
          if (response.ok) {
            const result = await response.json();
            setSuccessHardcodedMessage(`Data saved! Message: ${result.message}, Number: ${result.number}`);
            setNewMessage("");
            setNewNumber("");
            setData(null);
          } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
          } 
        } catch (error) {
          console.error("Error submitting the form:", error);
        };

    };


    // Handle form submission for database API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch("http://127.0.0.1:8000/api/simple-database-api-post/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: newDatabaseMessage,
                number: parseInt(newDatabaseNumber),
              })
          });

          if (response.ok) {
            const result = await response.json();
            setSuccessMessage(`Data saved! ID: ${result.id}, Message: ${result.message}, Number: ${result.number}`);
            setNewDatabaseMessage("");
            setNewDatabaseNumber("");
            setDatabaseData(null);
          } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
          }
        } catch (error) {
          console.error("Error submitting the form:", error);
        }
    };
    

    return (
          <div>
            <h1>Testing Django + React</h1>
            {data ? (
                <div>
                    <h2>Harcoded API Data</h2>
                    <p>Message: {data.message}</p>
                    <p>Number: {data.number}</p>
                </div>
            ) : (
                <p>Loading hardcoded API...</p>
            )}

            {databaseData ? (
                <div>
                    <h2>Database API Data</h2>
                    <p>Message: {databaseData.message}</p>
                    <p>Number: {databaseData.number}</p>
                </div>
            ) : (
                <p>Loading database API...</p>
            )}

            <h2>Submit New Data to Hardcoded API</h2>
            <form onSubmit={handleHardcodedSubmit}>
              <input
                type="text"
                placeholder="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Number"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                required
              />
              <button type="submit">Send</button>
            </form>

            {successHardcodedMessage && <p>{successHardcodedMessage}</p>}
           

            <h2>Submit New Data to Database</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Message"
                value={newDatabaseMessage}
                onChange={(e) => setNewDatabaseMessage(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Number"
                value={newDatabaseNumber}
                onChange={(e) => setNewDatabaseNumber(e.target.value)}
                required
              />
              <button type="submit">Send</button>
            </form>

            {successMessage && <p>{successMessage}</p>}
            
        </div>
    );
}

export default App;
