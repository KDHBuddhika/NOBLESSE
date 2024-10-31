import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './YourBids.module.css';    

const YourBids = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

   
    fetch(`https://localhost:7281/api/Bid/bids/user/${userId}`)  
      .then(response => response.json())
      .then(data => setBids(data.$values))  
      .catch(error => console.error('Error fetching bids:', error));
  }, []);

  const handleDelete = (bidId) => {
    if (window.confirm('Are you sure you want to delete this bid?')) {
    
      fetch(`https://localhost:7281/api/Bid/bid/${bidId}`, { method: 'DELETE' }) 
        .then(() => {
          alert('Bid deleted successfully');
         
          setBids(bids.filter(bid => bid.auctionId !== bidId));
        })
        .catch(error => console.error('Error deleting bid:', error));
    }
  };

  const handleView = (auctionId) => {
    
    navigate(`/plasebid2/${auctionId}`);
  };

  const handlePay = (auctionId) => {
   
    navigate(`/profile/payment/${auctionId}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Your Bids</h1>
        <div className={styles.bidsList}>
          {bids.map(bid => (
            <div className={styles.bidCard} key={bid.auctionId}>
              <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${bid.imageUrl}`)} alt={bid.auctionName} className={styles.bidImage} />
              <div className={styles.bidDetails}>
                <p>Auction: {bid.auctionName}</p>
                <span className={styles.dash}>|</span>
                <p>Amount: ${bid.bidAmount}</p>
                <span className={styles.dash}>|</span>
                <p>State: {bid.state}</p>
                <div className={styles.buttons}>
                  {bid.state === 'pending' && (
                    <>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(bid.bidId)}>Delete</button>
                      <button className={styles.viewBtn} onClick={() => handleView(bid.auctionId)}>View</button>
                    </>
                  )}
                  {bid.state === 'win' && (
                    <>
                      <button className={styles.payBtn} onClick={() => handlePay(bid.auctionId)}>Pay</button>
                      <button className={styles.viewBtn} onClick={() => handleView(bid.auctionId)}>View</button>
                    </>
                  )}
                   {bid.state === 'lose' && (
                    <>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(bid.bidId)}>Delete</button>
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
