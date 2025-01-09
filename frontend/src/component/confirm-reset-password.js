import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //try1
    try {
      const res = await axios.post('http://127.0.0.1:8000/sightseeing/v1/users/reset-password/confirm/', {
        token,
        password,
      });
      setMessage('password is successfully reset.');
    } catch (error) {
      setMessage('error.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <input
        type="text"
        placeholder="enter token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />

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
