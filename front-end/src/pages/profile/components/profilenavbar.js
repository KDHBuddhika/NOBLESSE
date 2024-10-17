// components/Navbar.js
import React from "react";
import './profilenavbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">
      <img src={require('../../../assets/images/noblesselogo.png')} alt="Brand Logo" className="brand-logo" />
        <h2>Profile</h2>
      </div>
      <div className="user-info">
        <span>Welcome Miss Dinesh</span>
        <p>kdh@7gmail.com</p>
      </div>
    </div>
  );
};

export default Navbar;
