import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../Message/message';
import Previous from '../PreviousNotify/previous';
import './tem.css';

const Emp = () => {
  const [showPrevious, setShowPrevious] = useState(false);
  const [showMessage, setShowMessage] = useState(true); // New state variable for message visibility

  const handleNewClick = () => {
    setShowPrevious(false);
    setShowMessage(true); // Show messages when "New" is clicked
  };

  const handlePreviousClick = () => {
    setShowPrevious(true);
    setShowMessage(false); // Hide messages when "Previous" is clicked
  };

  const handleMarkAsReadClick = () => {
    setShowMessage(false); // Hide the Message component when "Mark All As Read" is clicked
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

      <div className="menu">
        <ul>
          <li><Link to="/Infoform">Your Info</Link></li>
          <li><Link to="/OpenAuc">Your Bids</Link></li>
          <li><b className="No">Notifications</b></li>
          <li>Payment</li>
          <li><Link to="/Watchside">Watch List</Link></li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

      {/*-----------------------------------------------------------updating user information---------------------------------------------------------*/}

      <div>
        <div className="bids-container">
          <div className="clear">
            <br /><br /><br /><br /><br /><br /><br />
            <section className="sectionone">
              <div className="bids-details">
                <p className="newnotify"
                  onClick={handleNewClick}
                  style={{ cursor: 'pointer', fontWeight: !showPrevious ? 'bold' : 'normal' }}
                >New</p>
                <p onClick={handlePreviousClick}
                  style={{ cursor: 'pointer', fontWeight: showPrevious ? 'bold' : 'normal' }}
                >Previous</p>
              </div>
            </section><br />
            <div className="markasread" onClick={handleMarkAsReadClick}>
              <p>Mark All As Read</p>
            </div>
            <div className="cardposition">
              {showPrevious ? (
                <Previous onNewClick={handleNewClick} />
              ) : (
                showMessage && <Message /> // Only show Message if showMessage is true
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Emp;
