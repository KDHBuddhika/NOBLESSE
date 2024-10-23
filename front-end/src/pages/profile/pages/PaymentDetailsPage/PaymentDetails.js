import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './PaymentDetails.module.css';  

const PaymentDetails = () => {
  const { auctionId } = useParams();  
  const [address, setAddress] = useState({});
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

   
    fetch(`https://localhost:7281/api/getUser/${userId}`)  
      .then(response => response.json())
      .then(data => setAddress(data))
      .catch(error => console.error('Error fetching address:', error));

    
  
  }, [auctionId]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    console.log('Payment details:', cardDetails);
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Payment Method</h1>
        <div className={styles.cardWrapper}>
          {/* Address Card */}
          <div className={styles.card}>
            <h2>Address</h2>
            <div className={styles.addressDetails}>
              <p>{address.phoneNumber}</p>
              <p>{address.address}</p>
              <p>{address.city},{address.lane}</p>
              <button className={styles.changeAddressBtn}>Change Address</button>
            </div>
          </div>

        
          {/* Payment Card */}
          <div className={styles.card}>
            <h2>Pay Using Card Methods</h2>
            <form onSubmit={handlePaymentSubmit}>
              <div className={styles.cardMethods}>
                <img src={require("../../../../assets/payment card/Visadebitcardpng-1599584312349.png")} alt="VISA" className={styles.cardIcon} />
                <img src={require("../../../../assets/payment card/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg")} alt="MasterCard" className={styles.cardIcon} />
              </div>
              <div className={styles.inputGroup}>
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  required
                />
              </div>
              <div className={styles.cardRow}>
                <div className={styles.inputGroup}>
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expirationDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Security Code</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.securityCode}
                    onChange={(e) => setCardDetails({ ...cardDetails, securityCode: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.confirmPaymentBtn}>Confirm Payment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
