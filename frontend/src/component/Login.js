import { useState } from "react";
import loginUser from "../endpoint/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);
    console.log("Login response data:", data);
    console.log("API response:", data);
    if (data && data.token) {
      setAuthToken(data.token);

      console.log("Login successful. Token:", data.token);
    } else {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="login-input">
          <label htmlFor="email">Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {authToken && (
        <>
          <p>Logged in successfully.</p>
        </>
      )}
    </div>
  );
}
