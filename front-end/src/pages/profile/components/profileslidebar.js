// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import './profileslidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/yourInfo">Your Info</Link></li>
        <li><Link to="/yourBids">Your Bids</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/watchlist">Watch List</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/payment">Payment</Link></li>

        <li><hr /></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/your-auctions">Your Auctions</Link></li>
        <li><Link to="/earnings">Earnings</Link></li>
        <li><br/></li>
        <li><br/></li>
        <li><Link to="/earnings">Back</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
