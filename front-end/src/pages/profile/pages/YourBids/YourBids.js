import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  // Assuming Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Assuming Sidebar component
import styles from './YourBids.module.css';    // Importing CSS for styling

const YourBids = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bid data from the .NET backend API
    fetch('https://api.example.com/bids')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setBids(data))
      .catch(error => console.error('Error fetching bids:', error));
  }, []);

  const handleDelete = (bidId) => {
    if (window.confirm('Are you sure you want to delete this bid?')) {
      // Call API to delete the bid
      fetch(`https://api.example.com/bids/${bidId}`, { method: 'DELETE' }) // Replace with your API endpoint
        .then(() => {
          alert('Bid deleted successfully');
          // Remove the bid from the state
          setBids(bids.filter(bid => bid.id !== bidId));
        })
        .catch(error => console.error('Error deleting bid:', error));
    }
  };

  const handleView = (auctionId) => {
    // Navigate to auction page
    navigate(`/auction/${auctionId}`);
  };

  const handlePay = (auctionId, userId) => {
    // Navigate to payment page
    navigate(`/payment/${auctionId}?userId=${userId}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Your Bids</h1>
        <div className={styles.bidsList}>

        <div className={styles.bidCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.bidImage} />
              <div className={styles.bidDetails}>
                <p>Auction:eferf </p>
                <span className={styles.dash}>|</span> 
                <p>Amount: $23</p>
                <span className={styles.dash}>|</span> 
                <p>State: pending</p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                 
                 
                      <button className={styles.deleteBtn} >Delete</button>
                      <button className={styles.viewBtn} >View</button>
                    
                
                </div>
              </div>
            </div>

            <div className={styles.bidCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.bidImage} />
              <div className={styles.bidDetails}>
                <p>Auction:eferf </p>
                <span className={styles.dash}>|</span> 
                <p>Amount: $23</p>
                <span className={styles.dash}>|</span> 
                <p>State: pending</p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                 
                 
                      <button className={styles.deleteBtn} >Delete</button>
                      <button className={styles.viewBtn} >View</button>
                    
                
                </div>
              </div>
            </div>
            





          {bids.map(bid => (
            <div className={styles.bidCard} key={bid.id}>
              <img src={bid.imageUrl} alt={bid.auctionName} className={styles.bidImage} />
              <div className={styles.bidDetails}>
                <p>Auction: {bid.auctionName}</p>
                <span className={styles.dash}>|</span> 
                <p>Amount: ${bid.amount}</p>
                <span className={styles.dash}>|</span> 
                <p>State: {bid.state}</p>
                <div className={styles.buttons}>
                  {bid.state === 'pending' && (
                    <>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(bid.id)}>Delete</button>
                      <button className={styles.viewBtn} onClick={() => handleView(bid.auctionId)}>View</button>
                    </>
                  )}
                  {bid.state === 'lose' && (
                    <button className={styles.deleteBtn} onClick={() => handleDelete(bid.id)}>Delete</button>
                  )}
                  {bid.state === 'win' && (
                    <>
                      <button className={styles.payBtn} onClick={() => handlePay(bid.auctionId, bid.userId)}>Pay</button>
                      <button className={styles.viewBtn} onClick={() => handleView(bid.auctionId)}>View</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourBids;
