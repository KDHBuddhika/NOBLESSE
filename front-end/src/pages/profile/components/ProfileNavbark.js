import React from 'react';
import styles from './ProfileNavbar.module.css'; // Importing CSS module

const ProfileNavbar = () => {
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
        <span>Welcome Mr Dinesh</span>
        <span>kdh@24gmail.com</span>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
