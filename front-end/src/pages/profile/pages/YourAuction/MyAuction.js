import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  // Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Sidebar component
import styles from './MyAuction.module.css';  // CSS module for styling

const MyAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();
  const userId = 1; // Replace with actual user ID logic

  useEffect(() => {
    // Fetch auction data by user ID from the .NET backend
    fetch(`https://api.example.com/auctions?userId=${userId}`)  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setAuctions(data))
      .catch(error => console.error('Error fetching auctions:', error));
  }, [userId]);

  useEffect(() => {
    // Update countdown for all auctions
    const intervalId = setInterval(() => {
      setAuctions(prevAuctions =>
        prevAuctions.map(auction => {
          const timeLeft = calculateTimeRemaining(auction.endTime);
          return { ...auction, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
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
    // Navigate to auction story page
    navigate(`/auction/story/${auctionId}`);
  };

  const handleResult = (auctionId) => {
    // Navigate to auction result page
    navigate(`/auction/result/${auctionId}`);
  };

  const ehandleResult = (auctionId) => {
    // Navigate to auction result page
    navigate(`/yourAuction/result`);
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>My Auction</h1>
        <div className={styles.auctionList}>

        <div className={styles.auctionCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.auctionImage} />
              <div className={styles.auctionDetails}>
                <p>Antique Silver Pocket Watch</p>
                <span className={styles.dash}>|</span> 
                <p>Bidder: 10</p>
                <span className={styles.dash}>|</span> 
                <p>Start price: $34</p>
                <span className={styles.dash}>|</span> 
                <p>Current highest price: $67</p>
                <span className={styles.dash}>|</span> 
                <p>Start Time: 23/7/4</p>
                <span className={styles.dash}>|</span> 
                <p>End Time: 24/5/8</p>
                <span className={styles.dash}>|</span> 
                <p>State: ongoing</p>
                <span className={styles.dash}>|</span> 
                <p>Time remaining: </p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                
                    <button className={styles.viewBtn} >View</button>
                 
                </div>
              </div>
            </div>

            <div className={styles.auctionCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.auctionImage} />
              <div className={styles.auctionDetails}>
                <p>Antique Silver Pocket Watch</p>
                <span className={styles.dash}>|</span> 
                <p>Bidder: 10</p>
                <span className={styles.dash}>|</span> 
                <p>Start price: $34</p>
                <span className={styles.dash}>|</span> 
                <p>Current highest price: $67</p>
                <span className={styles.dash}>|</span> 
                <p>Start Time: 23/7/4</p>
                <span className={styles.dash}>|</span> 
                <p>End Time: 24/5/8</p>
                <span className={styles.dash}>|</span> 
                <p>State: ongoing</p>
                <span className={styles.dash}>|</span> 
                <p>Time remaining: </p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                
                    <button className={styles.viewBtn} onClick={() => ehandleResult()}>Result</button>
                 
                </div>
              </div>
            </div>

            


          {auctions.map(auction => (
            <div className={styles.auctionCard} key={auction.id}>
              <img src={auction.imageUrl} alt={auction.name} className={styles.auctionImage} />
              <div className={styles.auctionDetails}>
                <p>{auction.name}</p>
                <span className={styles.dash}>|</span> 
                <p>Bidder: {auction.bidderCount}</p>
                <span className={styles.dash}>|</span> 
                <p>Start price: ${auction.startPrice}</p>
                <span className={styles.dash}>|</span> 
                <p>Current highest price: ${auction.currentHighestPrice}</p>
                <span className={styles.dash}>|</span> 
                <p>Start Time: {new Date(auction.startTime).toLocaleString()}</p>
                <span className={styles.dash}>|</span> 
                <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
                <span className={styles.dash}>|</span> 
                <p>State: {auction.state}</p>
                <span className={styles.dash}>|</span> 
                <p>Time remaining: {auction.timeLeft}</p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                  {auction.state === 'ongoing' && (
                    <button className={styles.viewBtn} onClick={() => handleView(auction.id)}>View</button>
                  )}
                  {auction.state === 'finish' && (
                    <button className={styles.resultBtn} onClick={() => handleResult(auction.id)}>Result</button>
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
