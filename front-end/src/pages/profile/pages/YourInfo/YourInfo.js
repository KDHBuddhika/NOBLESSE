// pages/YourInfo.js

import Navbar from "../../components/profilenavbar";
import Sidebar from "../../components/profileslidebar";
import './YourInfo.css'; // You can add custom styling for this page
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourInfo.css';


const YourInfo = () => {
  const navigate = useNavigate(); 

  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem('userId');

  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    street: '',
    lane: '',
    city: '',
    userType: 'Bidder',
  });

  const [contactFilled, setContactFilled] = useState(false);

  // Fetch user info from backend on component mount
  useEffect(() => {
    if (userId) {
      axios.get(`/api/user/profile/${userId}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  useEffect(() => {
    setContactFilled(
      userInfo.phoneNumber &&
      userInfo.address &&
      userInfo.street &&
      userInfo.lane &&
      userInfo.city
    );
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeleteAccount = () => {
    axios.delete(`/api/user/delete-account/${userId}`)
      .then(() => {
        localStorage.removeItem('userId');
        navigate('/');
      })
      .catch(error => console.error('Error deleting account:', error));
  };

  const handleConvertToSeller = () => {
    if (contactFilled) {
      axios.put(`/api/user/update-user-type/${userId}`, { userType: 'Seller' })
        .then(() => {
          setUserInfo(prevState => ({
            ...prevState,
            userType: 'Seller'
          }));
        })
        .catch(error => console.error('Error updating user type:', error));
    } else {
      alert("Please fill out contact information before converting to a seller.");
    }
  };

  const handleSave = () => {
    axios.put(`/api/user/update-profile/${userId}`, userInfo)
      .then(response => {
        alert('Profile updated successfully!');
      })
      .catch(error => console.error('Error saving profile:', error));
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <Sidebar />
        <div className="content">
          <h2>Personal Information</h2>
          <input
            type="text"
            name="userName"
            value={userInfo.userName}
            onChange={handleInputChange}
            placeholder="User Name"
          />
          <button onClick={handleSave}>Save</button>

          <h2>Login Information</h2>
            <div className="input-edit-container">
            <label>Email</label>
            <div className="input-group">
                <input type="text" name="email" value={userInfo.email} disabled />
                <button className="edit-button">Edit</button>
            </div>
            </div>
            <div className="input-edit-container">
            <label>Password</label>
            <div className="input-group">
                <input type="password" name="password" value={userInfo.password} disabled />
                <button className="edit-button">Edit</button>
            </div>
            </div>
            <button onClick={handleSave}>Save</button>


          <h2>Contact Information</h2>
          <div className="contact-info">
            <div className="contact-left">
              <input
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>
            <div className="contact-right">
              <input
                type="text"
                name="street"
                value={userInfo.street}
                onChange={handleInputChange}
                placeholder="Street"
              />
              <input
                type="text"
                name="lane"
                value={userInfo.lane}
                onChange={handleInputChange}
                placeholder="Lane"
              />
              <input
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleConvertToSeller}>Convert to Seller</button>
          </div>

          <div className="delete-account">
            <p onClick={handleDeleteAccount}>Delete Your Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInfo;
