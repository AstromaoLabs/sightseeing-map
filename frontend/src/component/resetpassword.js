import React, { useState } from 'react';
import axios from "axios";

const PasswordResetRequest = () => {
    const[email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/sightseeing/v1/users/reset-password/", {email})
            setMessage(res.data.message);

        } catch (error) {
            setMessage(error.response.data.error);
        }
    }
    return(
        <div>
            <form onsSubmit={handleSubmit}>
                <h2>
                    reset pass
                </h2>

                <input type="email" placeholder="enter email" required onChange={(e) => setEmail(e.target.value)} required/>
                <button type="submit">send reset link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default PasswordResetRequest;
