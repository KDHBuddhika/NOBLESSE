import React, { useState } from 'react';
import './cardpayment.css';
import cardImage from '../../../../assets/images/card1.png'; // Correct path to the image

const CardPayment = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div
      className="payment-card"
      style={{
        backgroundImage: `url(${cardImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="payment-header">
        <h2>Green Colored Gemstone</h2>
        <p className="payment-amount">$350.00</p>
      </div>
      <p className="payment-deadline">Bid by: Mar 3, 2024 UTC</p>
      <div className="payment-footer">
        <div className="expire-time">
          <p>Expire on:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p className="timer">3D 22:59</p>
        </div>
        <button className="confirm-button" onClick={handleConfirm}>
          {isConfirmed ? 'Confirm' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default CardPayment;
