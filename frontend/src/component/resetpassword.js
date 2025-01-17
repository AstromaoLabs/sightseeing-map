import React, { useState } from 'react';
//import axios from "axios";
import { resetUserRequest } from '../endpoint/api';


const PasswordResetRequest = () => {
    const[email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await resetUserRequest(email);
        
        
            
            if (response && response.message) {
                setMessage(response.message); 
                console.log("Registration successful.", response);
            }
            else  {
                setErrorMessage("Failed to send reset link.");
                console.log("Error response:", response);
        }
           // const res = await axios.post("http://127.0.0.1:8000/sightseeing/v1/users/reset-password/", {email})
           // console.log(res);
          //  setMessage(res.data.message);

       
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>
                    reset pass
                </h2>

                <input type="email" placeholder="enter email" required onChange={(e) => setEmail(e.target.value)} required/>
                <button type="submit">send reset link</button>
                {message && <p>{message}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default PasswordResetRequest;
