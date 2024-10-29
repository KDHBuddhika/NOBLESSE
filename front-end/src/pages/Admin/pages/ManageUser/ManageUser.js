import React, { useState, useEffect } from 'react';
import Navbar from '../../components/AdminNavbar';
import Sidebar from '../../components/AdminSidebar';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [isVerifiedFilter, setIsVerifiedFilter] = useState('');

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7281/api/Admin/getAllUser');
        const data = await response.json();
        setUsers(data.$values); // Accessing user data from $values
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter the users based on selected filters
  const filteredUsers = users.filter((user) => {
    return (
      (userTypeFilter === '' || user.userType === userTypeFilter) &&
      (isVerifiedFilter === '' || user.isVerified === (isVerifiedFilter === 'true'))
    );
  });

  // Handle user deletion
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://your-backend-api-url/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(user => user.userId !== userId));
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user');
      }
    }
  };

  return (
    <div className="manage-users-layout">
      <Navbar />
      <div className="manage-users-main-content">
        <Sidebar />
        <div className="manage-users-content">
          <h1>Manage Users</h1>

          {/* Filter Section */}
          <div className="filters">
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">User Type</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
              <option value="bidder">Bidder</option>
            </select>

            <select
              value={isVerifiedFilter}
              onChange={(e) => setIsVerifiedFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Is Verified</option>
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>

            <button className="search-btn">Search</button>
          </div>

          {/* User Table */}
          <table className="users-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Register Date</th>
                <th>User Type</th>
                <th>Is Verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.registrationDate).toLocaleString()}</td>
                  <td>{user.userType}</td>
                  <td>{user.isVerified ? 'Yes' : 'No'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
