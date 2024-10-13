import React, { useState } from 'react';
import './main.css';

const Bids = () => {

  

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
          <li >Your Info</li>
          <li className="yb">Your Bids</li>
          <li>Notifications</li>
          <li>Payment</li>
          <li>Watch List</li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

 
{/*-----------------------------------------------------------updating user information---------------------------------------------------------*/}



<div className="no-bids-container">
  <div className="clear"><br /><br /><br /><br /><br /><br /><br />
    <section className="bidsection">
      <p className="no-bids-text">There are no bids to display yet.</p>
      <p className="no-bids-subtext">Would you like to find something to bid on?</p>
      <button className="auction-button">View Auction</button>
      </section>
    </div>
    </div>







    </div>
  );
};

export default Bids;