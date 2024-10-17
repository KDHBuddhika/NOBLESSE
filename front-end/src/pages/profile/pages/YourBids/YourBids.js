// YourBids.js
import React, { useEffect, useState } from "react";
import Navbar from "../../components/profilenavbar";
import Sidebar from "../../components/profileslidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './YourBids.css'; // Add necessary CSS for layout

const YourBids = () => {
  const [bids, setBids] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null);
  const navigate = useNavigate();
  
  // Assuming userId is stored in localStorage
  const userId = localStorage.getItem("userId");

  // Fetch the bids from backend
  useEffect(() => {
    axios.get(`/api/user/bids/${userId}`)
      .then(response => setBids(response.data))
      .catch(error => console.error("Error fetching bids:", error));
  }, [userId]);

  // Handle bid deletion
  const handleDelete = (bidId) => {
    setShowDeleteConfirm(true);
    setSelectedBidId(bidId);
  };

  const confirmDelete = () => {
    axios.delete(`/api/user/delete-bid/${selectedBidId}`)
      .then(() => {
        alert("Bid deleted successfully!");
        setBids(bids.filter(bid => bid.id !== selectedBidId));
        setShowDeleteConfirm(false);
      })
      .catch(error => console.error("Error deleting bid:", error));
  };

  const handleView = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  const handlePay = (auctionId) => {
    navigate(`/payment/${auctionId}/${userId}`);
  };

  return (
    <div className="your-bids-page">
      <Navbar />
      <div className="bids-container">
        <Sidebar />
        <div className="content">
          <h1>Your Bids</h1>

          <div className="bid-card" >
              <div className="bid-details">
                <img src={require('../../../../assets/images/noblesselogo.png')} alt="Auction Item" />
                <div className="bid-details2">
                  <p>Auction Name: dccd</p>
                  <p>Amount: cd</p>
                  <p>State: pending</p>
                </div>
              </div>
              <div className="bid-actions">
                
                    <button className="delete-button">Delete</button>
                    <button className="view-button" >View</button>
    
              </div>
            </div>

            <div className="bid-card" >
              <div className="bid-details">
                <img src={require('../../../../assets/images/noblesselogo.png')} alt="Auction Item" />
                <div className="bid-details2">
                  <p>Auction Name: dccd</p>
                  <p>Amount: cd</p>
                  <p>State: pending</p>
                </div>
              </div>
              <div className="bid-actions">
                
                    <button className="delete-button">Delete</button>
                    <button className="view-button" >View</button>
    
              </div>
            </div>



          {bids.map(bid => (
            <div className="bid-card" key={bid.id}>
              <div className="bid-details">
                <img src={bid.image} alt="Auction Item" />
                <div className="bid-details2">
                  <p>Auction Name: {bid.auctionName}</p>
                  <p>Amount: ${bid.amount}</p>
                  <p>State: {bid.state}</p>
                </div>
              </div>
              <div className="bid-actions">
                {bid.state === "Pending" && (
                  <>
                    <button className="delete-button" onClick={() => handleDelete(bid.id)}>Delete</button>
                    <button className="view-button" onClick={() => handleView(bid.auctionId)}>View</button>
                  </>
                )}
                {bid.state === "Lose" && (
                  <button className="delete-button" onClick={() => handleDelete(bid.id)}>Delete</button>
                )}
                {bid.state === "Win" && (
                  <>
                    <button className="pay-button" onClick={() => handlePay(bid.auctionId)}>Pay</button>
                    <button className="view-button" onClick={() => handleView(bid.auctionId)}>View</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this bid?</p>
            <button className="confirm-delete-button" onClick={confirmDelete}>Delete</button>
            <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourBids;
