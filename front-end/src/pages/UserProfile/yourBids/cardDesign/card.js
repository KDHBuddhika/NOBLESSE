import React from 'react';
import './card.css';
import card from  '../../../../assets/images/card1.png';

const Card = () => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img 
          src={card}
          alt="Auction Item" 
          className="auction-image" 
        />
      </div>
      <div className="details-container">
        <p className="item-name">Green Colored Gemstone</p>
        <div className="auction-info">
          <p className="auction-close">Auction Closes: 3 days</p>
          <p className="bid-amount">Bid: $5000</p>
        </div>
        <div className="action-container">
          <p className="auction-bid">Auction Highlights:</p>
          <button className="bid-button">
            <span className="bid-text">observe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
