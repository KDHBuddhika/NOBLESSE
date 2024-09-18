import React from 'react';
import Logo from './pages/Auth/logo/Logo';
import CloseIcon from './pages/Auth/closeIcon/CloseIcon';
import SignInForm from './pages/Auth/Signin/SignInForm';


function App() {
  const handleClose = () => {
    console.log('Close icon clicked'); 
  };

  return (
    <div className="container">
      <Logo />
      <div className="login-box">
        <h2>Sign In to your Account</h2>
        {
          <SignInForm />
          }
      </div>
      <CloseIcon onClick={handleClose} />
    </div>
  );
}

export default App;
