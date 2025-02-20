import { useState } from "react";
import { registerUser } from "./endpoint/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerUser(username,email, password);
    //console.log("API response:", data);
    if (data && data.id) {
      setSuccess("Registration successful!");
      console.log("Registration successful.", data);
      
    }
    else {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  

  return (
    <div className="login-container">
      <h1>Registration</h1>
      <form onSubmit={handleRegister}>

      <div className="login-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required
          />
        </div>

        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {success && (
        <>
          <p>{success}</p>
        </>
      )}
    </div>
  );
}
