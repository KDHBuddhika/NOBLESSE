import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pending.css';
import CardPayment from '../card3/cardpayment';
import HistoryPayment from '../History/history';  
const Pendingpage = () => {
  const [showHistory, setShowHistory] = useState(false);

  
  const handlePendingClick = () => setShowHistory(false); 
  const handleHistoClick = () => setShowHistory(true);  
  return (
    <div className="info-container">
      <div className="header">
        <h1>Profile</h1>
        <div className="user-info">
          <p className="nimna">Welcome Miss Nimna</p>
          <p className="mail">nimna@gmail.com</p>
        </div>
      </div>

      <div className="menu">
        <ul>
          <li><Link to="/Infoform">Your Info</Link></li>
          <li><Link to="/OpenAuc">Your Bids</Link></li>
          <li><Link to="/Notificationside">Notifications</Link></li>
          <li><b>Payment</b></li>
          <li><Link to="/WatchList">Watch List</Link></li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

      <div>
        <div className="bids-container">
          <div className="clear">
            <br /><br /><br /><br /><br /><br /><br />
            <section className="sectionone">
              <div className="bids-details">
                <p className={`pendignp ${!showHistory ? 'active' : ''}`} onClick={handlePendingClick}>Pending</p>
                <p className={`${showHistory ? 'active' : ''}`} onClick={handleHistoClick}>History</p>
              </div>
            </section><br />
           
            <div className="cardposition">
              {showHistory ? (
                <HistoryPayment onPendingClick={handlePendingClick} />
              ) : (
                <CardPayment />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pendingpage;
