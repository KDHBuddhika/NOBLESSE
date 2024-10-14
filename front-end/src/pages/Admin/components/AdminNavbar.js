import React from 'react';
import './Navbar.css';



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <imagess/>
        <img src={require('./noblesselogo.jpg')} alt="Brand Logo" className="brand-logo" />

        <span className="brand-name">NOBLESSE</span>
      </div>
      <div className="user-info">
        <span>Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
