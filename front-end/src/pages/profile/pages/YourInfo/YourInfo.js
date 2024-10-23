import React, { useState, useEffect } from 'react';
import ProfileNavbar from '../../components/ProfileNavbark';
import ProfileSidebar from '../../components/ProfileSidebar';
import styles from './YourInfo.module.css';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

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
    usertype: '',
    register_date: '',
    isVerified: false, 
  });

  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState('');


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

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    const userId = localStorage.getItem('userId'); 
    try {
      await axios.put(`https://localhost:7281/api/users/${userId}`, userData);
      setMessage('User info updated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating user info', error);
      setMessage('Error updating user info');
      setMessageType('error');
    }
  };

  // Handle Convert to Seller
  const handleConvertToSeller = async () => {
    
    if (
      !userData.phoneNumber ||
      !userData.address ||
      !userData.city ||
      !userData.isVerified
    ) {
    
      alert("You should submit contact details and verify your email");
      return;
    }

    const userId = localStorage.getItem('userId'); 
    try {
      await axios.put(`https://localhost:7281/convertToSeller/${userId}`);
      alert('Successfully converted to seller!');
    } catch (error) {
      console.error('Error converting to seller', error);
    }
  };

  // Handle updating contact details
  const handleUpdateContactDetails = async () => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.put(`https://localhost:7281/updateContactDetails/${userId}`, {
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        street: userData.street,
        lane: userData.lane,
        city: userData.city,
      });
      setMessage('Contact details updated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating contact details', error);
      setMessage('Error updating contact details');
      setMessageType('error');
    }
  };

  return (
    <div className={styles.profilePage}>
      <ProfileNavbar />
      <div className={styles.container}>
        <ProfileSidebar />
        <main className={styles.mainContent}>
         

          {/* Personal Information */}
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

          {/* Login Information */}
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
           {/* Display success or error message */}
           {message && (
            <div
              className={`${styles.messageBox} ${messageType === 'success' ? styles.success : styles.error}`}
            >
              {message}
            </div>
          )}

          {/* Contact Information */}
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
                
                <button className={styles.saveButton} onClick={handleUpdateContactDetails}>Update Contact Details</button>
                {/* Only show Convert to Seller if user is not a seller */}
                {userData.usertype !== 'seller' && (
                  <button className={styles.convertButton} onClick={handleConvertToSeller}>
                    Convert to Seller
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Display usertype, registration date, and verified status */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Account Information</h2>
            <div className={styles.infoGroup}>
              <p><strong>User Type:</strong> {userData.usertype || 'Not Available'}</p>
              <p><strong>Registration Date:</strong> {userData.register_date ? new Date(userData.register_date).toLocaleDateString() : 'N/A'}</p>
              <p>
                <strong>Email Verification Status:</strong> 
                {userData.isVerified ? (
                  <FaCheckCircle className={styles.verifiedIcon} />
                ) : (
                  <FaTimesCircle className={styles.notVerifiedIcon} />
                )}
              </p>
            </div>
          </section>

          {/* Delete account link */}
          <div className={styles.deleteAccount}>
            <a href="#">Delete Your Account</a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YourInfo;
