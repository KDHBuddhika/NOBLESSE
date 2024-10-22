import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar'; // Assuming you have a Navbar component
import Sidebar from '../../components/AdminSidebar'; // Assuming you have a Sidebar component
import './ViewUser.css'; // Importing CSS for styling

const DashboardViewUser = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7281/api/getUser/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleBack = () => {
    navigate(`/dashboardProductView`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-user-container">
      <Navbar /> {/* Navbar */}
      <div className="main-content">
        <Sidebar /> {/* Sidebar */}
        <div className="content-areau">
          <h2>User Details</h2>
          <div className="user-details-card">
            <h3>User Details</h3>
            <p><strong>User Name :</strong> {user.userName}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Register Date:</strong> {new Date(user.register_date).toLocaleDateString() === '01/01/0001' ? 'N/A' : new Date(user.register_date).toLocaleDateString()}</p>
            <p><strong>User Type:</strong> {user.usertype}</p>
            <p><strong>Is Verified:</strong> {user.isVerified ? 'Verified' : 'Not Verified'}</p>
            
            <h3>Contact Details</h3>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Lane:</strong> {user.lane}</p>
            <p><strong>City:</strong> {user.city}</p>

            <button onClick={handleBack} className="back-button">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewUser;
