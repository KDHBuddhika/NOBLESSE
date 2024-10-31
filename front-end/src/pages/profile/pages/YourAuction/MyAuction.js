import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './MyAuction.module.css';  

const MyAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

 
    fetch(`https://localhost:7281/api/Auction/user/${userId}`) 
      .then(response => response.json())
      .then(data => setAuctions(data.$values))  
      .catch(error => console.error('Error fetching auctions:', error));
  }, []);

  useEffect(() => {

    const intervalId = setInterval(() => {
      setAuctions(prevAuctions =>
        prevAuctions.map(auction => {
          const timeLeft = calculateTimeRemaining(auction.endTime);
          return { ...auction, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [auctions]);

  const calculateTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return "Auction ended";
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleView = (auctionId) => {
  
    navigate(`/plasebid2/${auctionId}`);
  };

  const handleResult = (auctionId) => {
   
    navigate(`/plasebid2/${auctionId}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>My Auction</h1>
        <div className={styles.auctionList}>
          {auctions.map(auction => (
            <div className={styles.auctionCard} key={auction.$id}>
              <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${auction.imageUrl}`)} alt={auction.productName} className={styles.auctionImage} />
              <div className={styles.auctionDetails}>
                <p>Product: {auction.productName}</p>
                <span className={styles.dash}>|</span>
                <p>Bidder: {auction.bidderCount}</p>
                <span className={styles.dash}>|</span>
                <p>Start price: ${auction.startingPrice}</p>
                <span className={styles.dash}>|</span>
                <p>Current highest price: ${auction.highestPrice}</p>
                <span className={styles.dash}>|</span>
                <p>Start Time: {new Date(auction.startTime).toLocaleString()}</p>
                <span className={styles.dash}>|</span>
                <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
                <span className={styles.dash}>|</span>
                <p>State: {auction.auctionState}</p>
                <span className={styles.dash}>|</span>
                <p>Time remaining: {auction.timeLeft}</p>
                <div className={styles.buttons}>
                  {auction.auctionState === 'Ongoing' && (
                    <button className={styles.viewBtn} onClick={() => handleView(auction.auctionId)}>View</button>
                  )}
                  {auction.auctionState === 'Completed' && (
                    <button className={styles.resultBtn} onClick={() => handleResult(auction.auctionId)}>Result</button>
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

export default MyAuction;
