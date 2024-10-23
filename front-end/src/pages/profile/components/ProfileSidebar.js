import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileSidebar.module.css'; 

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
   
      localStorage.removeItem('userId');
    
      navigate('/home');
    }
  };

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
        <li><Link to="/profileDashboard">Dashboard</Link></li>
        <li><Link to="/yourAuction">Your Auctions</Link></li>
        <li><br/></li>
        <li><br/></li>
        <li><br/></li>
        <li><Link to="/home">Home</Link></li>
        {/* Log Out Button */}
        <li>
          <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
