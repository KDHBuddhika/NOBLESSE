import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './open.css';
import Card from '../cardDesign/card';
import Close from '../CloseAuc/close';

const Openauc = () => {
  const [showClosedAuctions, setShowClosedAuctions] = useState(false);

  const handleOpenAuctionsClick = () => {
    setShowClosedAuctions(false); 
  };

  const handleClosedAuctionsClick = () => {
    setShowClosedAuctions(true); 
  };

  return (
    <div className="info-container">
      <div className="header">
        <h1>Profile</h1>
        <div className="user-info">
          <p className="nimna">Welcome Miss Nimna</p>
          <p className="mail">nimna@gmail.com</p>
        </div>
      </div>

      <div className="Bmenu">
        <ul>
          <li><Link to="/Infoform">Your Info</Link></li>
          <li className="yb">Your Bids</li>
          <li><Link to="/Notificationside">Notifications</Link></li>
          <li>Payment</li>
          <li>Watch List</li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

      <div className="bids-container">
        <div className="clear"><br /><br /><br /><br /><br /><br /><br />
          <section className="sectionone">
            <div className="bids-details">
            <p className={`headName ${!showClosedAuctions ? "active-tab bold" : ""}`} onClick={handleOpenAuctionsClick}>Open Auctions</p>
            <p className={`headName2 ${showClosedAuctions ? "active-tab" : ""}`} onClick={handleClosedAuctionsClick}>Closed Auctions</p>

            </div>
          </section><br />
          <div className="cardposition">
            {showClosedAuctions ? (
              <Close onOpenAuctionsClick={handleOpenAuctionsClick} />
            ) : (
              <Card />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Openauc;
