import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../Message/message';
import Previous from '../PreviousNotify/previous';
import './tem.css';


const Emp = () => {

  
  const [showPrevious, setShowPrevious] = useState(false);

  
  const handleNewClick = () => setShowPrevious(false);
  const handlePreviousClick = () => setShowPrevious(true);


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
          <li>Watch List</li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

 
{/*-----------------------------------------------------------updating user information---------------------------------------------------------*/}

  
  
<div >
  <div className="bids-container">
  <div className="clear"><br /><br /><br /><br /><br /><br /><br />
    <section className="sectionone">
      <div  className="bids-details">
      <p  className="newnotify"  
       onClick={handleNewClick}
       style={{ cursor: 'pointer', fontWeight: !showPrevious ? 'bold' : 'normal' }}
       >New</p>
      <p  onClick={handlePreviousClick}
                style={{ cursor: 'pointer', fontWeight: showPrevious ? 'bold' : 'normal' }}
                >Previous</p>
      </div>
      </section><br />
      <div className="cardposition">
            {showPrevious ? (
              <Previous onNewClick={handleNewClick}/>  
            ) : (
              <Message /> 
            )}
          </div>
   </div>
   </div>
   </div>
  
  </div>
  );
};

export default Emp;