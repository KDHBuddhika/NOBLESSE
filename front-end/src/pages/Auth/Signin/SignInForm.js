import React, { useState } from 'react';
import './../Signin/SignInForm.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


function SignInForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

  return (
    <form>
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
          {/* Font Awesome show/hide icon */}
          <i className="show-password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>
      </div>

      <div className="forgot-password">
        <a href="/">Forgot your password?</a>
      </div>

      <button className="sign-in-btn" type="submit">
        Sign in
      </button>

      <div className="sign-up">
        Don't have an account? <a href="">Sign up</a>
      </div>
    </form>
  );
}

export default SignInForm;
