import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProfileNavbar.module.css'; 

const ProfileNavbar = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: ''
  });

 
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      try {
      
        const response = await axios.get(`https://localhost:7281/api/getUser/${userId}`);
        setUserData(response.data); 
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


      
        <span>Welcome Mr {userData.userName || 'User'}</span>
        <span>{userData.email || 'user@example.com'}</span>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
