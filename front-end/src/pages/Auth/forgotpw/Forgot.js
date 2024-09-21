// src/pages/Auth/Forgot/Forgot.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forgot.css';


function Forgot() {
    const navigate = useNavigate();
return (
    <form>
      <div className="forgot-login-box">
      <h2>Forgot your password?</h2>

      <div className="forgot-forgot-password">
        <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
      </div>


      <div className="forgot-input-group">
        <input type="email" placeholder="Email Address" required />
      </div>
 
      
      <div className="buttons">
      <button className="back-btn" type="button" onClick={() => navigate('/signin')}>
      Back
      </button>
      <button className="continue-btn" type="submit">
      Continue
      </button>
      
      </div>
     </div>
    </form>
  );
}

export default Forgot;