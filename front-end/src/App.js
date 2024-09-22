// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from './pages/Auth/Signin/SignInForm';
import SignUpForm from './pages/Auth/Signup/SignUpForm';
import Logo from './pages/Auth/logo/Logo';
import CloseIcon from './pages/Auth/closeIcon/CloseIcon';
import Forgot from './pages/Auth/forgotpw/Forgot'; 
import Verification from './pages/Auth/forgotpwVerify/Verification';
import SignVerification from './pages/Auth/SignupVerify/SignVerification';
import ChangePassword from './pages/Auth/Changepw/ChangePassword';

function App() {
  const handleClose = () => {
    console.log('Close button clicked');
    // You can add custom logic for the CloseIcon here
  };

  return (
    <Router>
      <div className="signin-container">
        <Logo/>
        <CloseIcon onClick={handleClose} className="custom-close-icon" />
        
        <Routes>
          <Route path="/forgotpw" element={<Forgot />} />
          <Route path="/forgotpwVerify" element={<Verification />} />
          <Route path="/SignupVerify" element={<SignVerification />} />
          <Route path="/Changepw" element={<ChangePassword />} /> 
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* Redirect any unknown route to /signin */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
