import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar';  // Adjust path
import Sidebar from '../../components/AdminSidebar'; // Adjust path
import './ManageAuctions.css'; // Import the relevant CSS

const ManageAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [isCompletedFilter, setIsCompletedFilter] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch auctions from backend
      const fetchData = async () => {
        try {
          const auctionResponse = await fetch('https://your-backend-api-url/auctions');
          const auctionData = await auctionResponse.json();
          setAuctions(auctionData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    // Handle sorting by highest and lowest price
    const sortedAuctions = [...auctions].sort((a, b) => {
      if (sortOrder === 'high-to-low') return b.highestPrice - a.highestPrice;
      if (sortOrder === 'low-to-high') return a.highestPrice - b.highestPrice;
      return 0;
    });
  
    // Filter by is_completed status
    const filteredAuctions = sortedAuctions.filter((auction) => {
      return (
        isCompletedFilter === '' || auction.is_completed === (isCompletedFilter === 'true')
      );
    });
  
    // Handle view button click
    const handleView = (id) => {
      navigate(`/auction/${id}`);
    };
  
    // Handle delete button click
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this auction?");
      if (confirmDelete) {
        try {
          const response = await fetch(`https://your-backend-api-url/auctions/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            // Remove the auction from the local state after successful deletion
            setAuctions(auctions.filter(auction => auction.id !== id));
            alert('Auction deleted successfully');
          } else {
            alert('Failed to delete auction');
          }
        } catch (error) {
          console.error('Error deleting auction:', error);
          alert('An error occurred while deleting the auction');
        }
      }
    };
  
    return (
      <div className="manage-auctions-layout">
        <Navbar />
        <div className="manage-auctions-main-content">
          <Sidebar />
          <div className="manage-auctions-content">
            <h1>Manage Auction</h1>
  
            {/* Filter and Sort section */}
            <div className="filters">
              {/* Dropdown for filtering by is_completed */}
              <select
                value={isCompletedFilter}
                onChange={(e) => setIsCompletedFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">Is Completed</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
              </select>
  
              {/* Dropdown for sorting by price */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">Sort by Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
  
            {/* Auction table */}
            <table className="auction-table">
              <thead>
                <tr>
                  <th>Auction Id</th>
                  <th>Product Name</th>
                  <th>Highest Price</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Is Completed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuctions.map((auction) => (
                  <tr key={auction.id}>
                    <td>{auction.id}</td>
                    <td>{auction.productName}</td>
                    <td>${auction.highestPrice}</td>
                    <td>{new Date(auction.startTime).toLocaleString()}</td>
                    <td>{new Date(auction.endTime).toLocaleString()}</td>
                    <td>{auction.is_completed ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleView(auction.id)} className="view-btn">View</button>
                      <button onClick={() => handleDelete(auction.id)} className="delete-btn">Delete</button>
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
  
  export default ManageAuctions;