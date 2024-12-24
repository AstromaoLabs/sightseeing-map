import { useState } from "react";
import login from "../endpoints/api"




export default function Login(){
  const[username, setUsername]= useState("");
  const[password, setPassword]=useState("");

  const handleLogin = (e)=>{
    e.preventDefault();
    console.log("Submitted username:",username);
    console.log("Submitted password:",password);
    login(username,password);
  };
  
  return(
    <>
   
    <div className="login-container">
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
        <div className="login-input">
          <label htmlFor="email">Username:</label>
          <input onChange={(e)=>setUsername(e.target.value)} value={username}type="text"  required />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password:</label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}type="password"  required />
          
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
      </>
  );



}