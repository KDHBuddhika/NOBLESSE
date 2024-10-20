import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProfileNavbar.module.css'; // Importing CSS module

const ProfileNavbar = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: ''
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      try {
        // Update the URL to point to your backend server
        const response = await axios.get(`https://localhost:7281/api/getUser/${userId}`);
        setUserData(response.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <img
          src={require("../../../assets/images/noblesselogo.png")} 
          alt="Brand Logo"
          className={styles.brandLogo}
        />
        <span className={styles.brandName}>Profile</span>
      </div>
      <div className={styles.userInfo}>
        {/* Display dynamic user name and email */}
        <span>Welcome Mr {userData.userName || 'User'}</span>
        <span>{userData.email || 'user@example.com'}</span>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
