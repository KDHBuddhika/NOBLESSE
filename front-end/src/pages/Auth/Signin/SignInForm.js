// src/pages/Auth/Signin/SignInForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignInForm.css';

function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form>
      <div className="signin-login-box">
      <h2>Sign In to your Account</h2>
      <div className="input-group">
        <input type="email" placeholder="Email Address" required />
      </div>

      <div className="input-group">
        <div className="password-box">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            required
          />
          <i className="show-password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>
      </div>

      <div className="forgot-password">
      <Link to="/forgotpw">Forgot your password?
      </Link>
      </div>

      <button className="sign-in-btn" type="submit">
        Sign In
      </button>

      <div className="sign-up">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
    </form>
  );
}

export default SignInForm;
