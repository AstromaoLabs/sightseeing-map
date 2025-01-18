import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

const PasswordResetConfirm = () => {
  const { uid, token } = useParams(); //in url params
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   console.log("UID:", uid);  //print uid and tok for testing
  //   console.log("Token:", token); 
  // }, [uid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/sightseeing/v1/users/reset-password/confirm/",
        { uid, token, new_password: password }, 
        {
          headers: {
            "X-API-Key": process.env.REACT_APP_LOGIN_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "erorrrorororro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>

      <input
        type="password"
        placeholder="enter new pass"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">reset pass</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PasswordResetConfirm;
