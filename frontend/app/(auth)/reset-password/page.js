"use client";

import { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/sightseeing/v1/users/reset-password/",
                { email },
                {
                    headers: {
                        "X-API-Key": process.env.NEXT_PUBLIC_LOGIN_API_KEY, 
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "errrorrrr");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <h2>reset pass</h2>
                <input 
                    type="email" 
                    placeholder="Enter email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">send link reset</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default PasswordResetRequest;
