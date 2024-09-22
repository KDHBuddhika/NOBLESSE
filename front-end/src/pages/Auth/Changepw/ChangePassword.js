import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ChangePassword.css';

function ChangePassword() {
   
   const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      // Logic for submitting the password change
      console.log('Password changed successfully');
    }
  };

  return (
    <div className="change-password-container">
         <form onSubmit={handleSubmit} className="change-password-box">
        <h2>Change your password</h2>
        <div className="pharagraph">
        <p>Create a password using uppercase, lowercase and numbers, special symbols uniquely.</p>
        </div>
        
        <div className="input-group">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <i className="show-password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>

        <div className="input-group">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           <i className="show-password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>
        <div className="btn-sub">
        <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
