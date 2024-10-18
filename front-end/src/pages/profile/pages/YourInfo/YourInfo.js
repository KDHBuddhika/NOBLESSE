import React, { useState, useEffect } from 'react';
import ProfileNavbar from '../../components/ProfileNavbark';
import ProfileSidebar from '../../components/ProfileSidebar';
import styles from './YourInfo.module.css';
import axios from 'axios';

const YourInfo = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    street: '',
    lane: '',
    city: '',
  });

  // Fetch user data from .NET backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 1; // Example: Change this dynamically for logged-in user
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Save button click to update user info
  const handleSave = async () => {
    const userId = 1; // Example: Use logged-in user's ID
    try {
      await axios.put(`/api/users/${userId}`, userData);
      alert("User info updated successfully!");
    } catch (error) {
      console.error("Error updating user info", error);
    }
  };

  // Handle Convert to Seller
  const handleConvertToSeller = async () => {
    const userId = 1; // Example: Use logged-in user's ID
    try {
      await axios.post(`/api/users/${userId}/convertToSeller`);
      alert("Successfully converted to seller!");
    } catch (error) {
      console.error("Error converting to seller", error);
    }
  };

  return (
    <div className={styles.profilePage}>
      <ProfileNavbar />
      <div className={styles.container}>
        <ProfileSidebar />
        <main className={styles.mainContent}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleInputChange}
                placeholder="User Name"
              />
              <button className={styles.saveButton} onClick={handleSave}>Save</button>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Login Information</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <button className={styles.saveButton} onClick={handleSave}>Save</button>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Contact Information
              <span className={styles.infoIcon}>ⓘ</span>
            </h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <div className={styles.addressGroup}>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="street"
                  value={userData.street}
                  onChange={handleInputChange}
                  placeholder="Street"
                />
                <input
                  type="text"
                  name="lane"
                  value={userData.lane}
                  onChange={handleInputChange}
                  placeholder="Lane"
                />
                <input
                  type="text"
                  name="city"
                  value={userData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.saveButton} onClick={handleSave}>Save</button>
                <button className={styles.convertButton} onClick={handleConvertToSeller}>
                  Convert to Seller
                </button>
              </div>
            </div>
          </section>

          <div className={styles.deleteAccount}>
            <a href="#">Delete Your Account</a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YourInfo;