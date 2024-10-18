import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileSidebar.module.css'; // Importing CSS module

const ProfileSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li><Link to="/yourInfo">Your Info</Link></li>
        <li><Link to="/yourBids">Your Bids</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/profile/watchlist">Watch List</Link></li>
        <li><Link to="/profile/notification">Notifications</Link></li>
        <li><Link to="/profile/payment">Payment</Link></li>
        <li><hr className={styles.line}/></li>
        <li><Link to="/profile/dashboard">Dashboard</Link></li>
        <li><Link to="/yourAuction">Your Auctions</Link></li>
        <li><Link to="/profile/earnings">Earnings</Link></li>
        <li><br/></li>
        <li><Link to="home">Home</Link></li>
        <li><Link to="">Log out</Link></li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
