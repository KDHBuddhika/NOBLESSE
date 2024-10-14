import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Info.css';
import Modal from '../DeleteAcc/Modal';

const Info = () => {

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <li ><b className="yi">Your Info</b></li>
          <li><Link to="/OpenAuc">Your Bids</Link></li>
          <li><Link to="/Notificationside">Notifications</Link></li>
          <li>Payment</li>
          <li><Link to="/Watchside">Watch List</Link></li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

 
{/*-----------------------------------------------------------updating user information---------------------------------------------------------*/}

      <div className="details">
        <div className="form-detail"><br />
        <section className="personal-info">
          <h2>Personal Information</h2>
      <div className="input-groups">
        <input type="text" placeholder="First Name" required />
      </div>
      <div className="input-groups">
        <input type="text" placeholder="Last Name" required />
      </div>
          <button className="savebtn">Save</button>
        </section>

        <section className="login-info">
          <h2>Login Information</h2>
        <div className="input-groups">
        <input type="email" placeholder="Email" required />
        <button className="editbtn">Edit</button>
      </div>
      <div className="input-groups">
        <input type="" placeholder="Password" required />
        <button className="editbtn">Edit</button>
      </div>
        </section>

        <section className="contact-info">
          <h2>Contact Information <span>ⓘ</span></h2>
          <div className="contact-grid">
          <div className="input-groups">
          <input type="text" placeholder="Phone Number" required />
          </div>
          <button className="savebtn2">Save</button>
          <div className="input-groups">
          <input type="text" placeholder="Address" required />
          </div>
          <div className="input-groups">
          <input type="text" placeholder="Street" required />
          </div>
          <div className="input-groups">
          <input type="text" placeholder="Lane" required />
          </div>
          <div className="input-groups">
          <input type="email" placeholder="city" required />
          </div>
          </div>
          <button className="savebtn">Save</button>
        </section>

        <p className="delete-account"  onClick={handleDeleteClick}>Delete Your Account</p>
      </div><br  />
      </div>

      <Modal show={showModal} onClose={handleCloseModal} />

    </div>
  );
};

export default Info;