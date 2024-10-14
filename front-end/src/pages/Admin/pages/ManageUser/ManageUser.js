import React, { useState, useEffect } from 'react';
import Navbar from '../../components/AdminNavbar';  // Adjust path
import Sidebar from '../../components/AdminSidebar'; // Adjust path
import './ManageUsers.css'; // Import the relevant CSS

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [isVerifiedFilter, setIsVerifiedFilter] = useState('');

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://your-backend-api-url/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on userType and isVerified
  const filteredUsers = users.filter((user) => {
    return (
      (userTypeFilter === '' || user.userType === userTypeFilter) &&
      (isVerifiedFilter === '' || user.is_verified === (isVerifiedFilter === 'true'))
    );
  });

  // Handle delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://your-backend-api-url/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
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

          {/* Filter section */}
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

          {/* Users Table */}
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
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.registerDate).toLocaleString()}</td>
                  <td>{user.userType}</td>
                  <td>{user.is_verified ? 'Yes' : 'No'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
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
