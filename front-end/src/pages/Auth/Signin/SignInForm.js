import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import axios from 'axios'; // Import axios
import Logo from '../logo/Logo';
import CloseIcon from '../closeIcon/CloseIcon';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignInForm.css';

function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Define useNavigate

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClose = () => {
    console.log('Close button clicked');
    // You can add custom logic for the CloseIcon here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    const userLoginDto = {
      email,
      password,
    };

    try {
      const response = await axios.post('https://localhost:7281/login', userLoginDto);
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('userId', response.data.userId);
        navigate('/home');
        // Navigate to the home page with user ID
      }
    } catch (error) {
      if (error.response) {
        // Display specific error like "User not found" or "Incorrect password"
        setErrorMessage(error.response.data);
      } else {
        // General error message for unknown issues
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="signin-container">
      <Logo />
      <CloseIcon onClick={handleClose} className="custom-close-icon" />
      
      <form onSubmit={handleSubmit}>
        <div className="signin-login-box">
          <h2>Sign In to your Account</h2>
  
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
  
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
  
          <div className="input-group">
            <div className="password-box">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="show-password-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </i>
            </div>
          </div>
  
          <div className="forgot-password">
            <Link to="/forgotpw">Forgot your password?</Link>
          </div>
  
          <button className="sign-in-btn" type="submit">
            Sign In
          </button>
  
          <div className="sign-up">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
