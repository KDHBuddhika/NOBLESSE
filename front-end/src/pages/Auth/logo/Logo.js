// src/pages/Auth/logo/Logo.js
import React from 'react';
import logo from '../../../assets/images/noblesselogo.png'; 
import './../logo/Logo.css'; 


function Logo() {
  return (
    <img src={logo} alt="Noblesse Logo" className="logo" />
  );
}

export default Logo;
