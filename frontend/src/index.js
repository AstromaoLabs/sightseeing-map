import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserMap from './UserMap';
import Header from './component/Header';
import Footer from './component/Footer';
import Login from './component/Login';
import Register from './component/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
  <Header />
  <Routes>
      <Route path="/" element={<UserMap />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  <Footer />
  </Router>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

