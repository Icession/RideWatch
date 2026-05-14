import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Maps from './Maps';
import About from './About';
import Account from './Account';
import FAQ from './Faq';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/Faq" element={<FAQ />} />
      </Routes>
    </>
  );
}

export default App;
