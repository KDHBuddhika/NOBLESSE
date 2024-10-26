import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaGavel, FaTags, FaUsers, FaClipboardList, FaMoneyCheckAlt, FaChartBar } from 'react-icons/fa'; // Import 
import './Sidebar.css'; 
import { FaRobot } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="icon" /> Dashboard Overview
          </Link>
        </li>
        <li>
          <Link to="/manageProducts">
            <FaBox className="icon" /> Manage Products
          </Link>
        </li>
        <li>
          <Link to="/manageAuctions">
            <FaGavel className="icon" /> Manage Auctions
          </Link>
        </li>
        <li>
          <Link to="/manageCategories">
            <FaTags className="icon" /> Manage Category
          </Link>
        </li>
        <li>
          <Link to="/ManageUsers">
            <FaUsers className="icon" /> Manage Users
          </Link>
        </li>
        <li>
          <Link to="/Trainbot">
            <FaRobot className="icon" /> Train Bot
          </Link>
        </li>
        <li>
          <Link to="/manage-bids">
            <FaClipboardList className="icon" /> Manage Bids
          </Link>
        </li>
        <li>
          <Link to="/manage-transactions">
            <FaMoneyCheckAlt className="icon" /> Manage Transactions
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FaChartBar className="icon" /> Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
