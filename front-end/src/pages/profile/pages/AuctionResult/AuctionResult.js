import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './AuctionResult.module.css'; 

const AuctionResult = () => {
  const { auctionId } = useParams();  
  const [auctionDetails, setAuctionDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  
    fetch(`https://api.example.com/auctions/result/${auctionId}`)  
      .then(response => response.json())
      .then(data => setAuctionDetails(data))
      .catch(error => console.error('Error fetching auction details:', error));
  }, [auctionId]);

  const handleBack = () => {
    
    navigate('/yourAuction');
  };

//   if (!auctionDetails) {
//     return <p>Loading...</p>; // Loading state while data is fetched
//   }

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />

      <div className={styles.contentWrapper}>
        <div className={styles.auctionContainer}>
          <h1>Auction Result</h1>
          <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.auctionImage} />
          <h2>Antique Silver Pocket Watch</h2>
          <p>Start Price: $34</p>
          <p>Final Price: $43</p>
          <p>Auction Start Time: 23/6/8</p>
          <p>Auction End Time: 23/7/9</p>
          <div className={styles.winnerDetails}>
            <h3>Winner Details</h3>
            <p>Winner: Dinesh</p>
            <p>Winning Bid: $43</p>
            <p>Winner Contact:32342342</p>
          </div>
          <button className={styles.backButton} onClick={handleBack}>Back</button>
        </div>
      </div>


      {/* <div className={styles.contentWrapper}>
        <div className={styles.auctionContainer}>
          <h1>Auction Result</h1>
          <img src={auctionDetails.imageUrl} alt={auctionDetails.name} className={styles.auctionImage} />
          <h2>{auctionDetails.name}</h2>
          <p>Start Price: ${auctionDetails.startPrice}</p>
          <p>Final Price: ${auctionDetails.finalPrice}</p>
          <p>Auction Start Time: {new Date(auctionDetails.startTime).toLocaleString()}</p>
          <p>Auction End Time: {new Date(auctionDetails.endTime).toLocaleString()}</p>
          <div className={styles.winnerDetails}>
            <h3>Winner Details</h3>
            <p>Winner: {auctionDetails.winner.name}</p>
            <p>Winning Bid: ${auctionDetails.winner.price}</p>
            <p>Winner Contact: {auctionDetails.winner.contact}</p>
          </div>
        </div>
      </div> */}


    </div>
  );
};

export default AuctionResult;
