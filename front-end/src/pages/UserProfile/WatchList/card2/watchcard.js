import React from 'react';
import './watchcard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import card from '../../../../assets/images/card1.png';

const WatchCard = ({ id, onDelete }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img 
          src={card}
          alt="Auction Item" 
          className="auction-image" 
        />
      </div>
      <div className="details-container2">
        <p className="item-name2">Green Colored Gemstone</p>
        <div className="auct">
          <div className="auction-info2">
            <p className="auction-close2">Auction Closes: 3 days</p>
            <p className="bid-amount2">Current Bid $300</p>
          </div>
          <FontAwesomeIcon 
            icon={faTrash} 
            className="bin-icon" 
            onClick={() => onDelete(id)} // Call onDelete with the card's ID
          />
        </div>
        <div className="action-container2">
          <p className="auction-bid2">Auction in progress:</p>
          <button className="bid-button2">
            <span className="bid-text2">observe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
