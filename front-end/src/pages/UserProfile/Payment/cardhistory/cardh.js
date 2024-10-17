import React, { useState } from 'react';
import './cardh.css';
import cardImage from '../../../../assets/images/card1.png'; 

const Card6 = () => {
  
  return (
    <div
      className="payment-card2"
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
          <p>Bid by : Mar 3, 2024  UTC</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Paid on : Mar 29, 2024  UTC</p><br />
          <p><u>Email Receipt</u></p>
        </div>
        
      </div>
    </div>
  );
};

export default Card6;
