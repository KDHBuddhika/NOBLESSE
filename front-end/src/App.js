import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignInForm from './pages/Auth/Signin/SignInForm';
import SignUpForm from './pages/Auth/Signup/SignUpForm';
import Logo from './pages/Auth/logo/Logo';
import CloseIcon from './pages/Auth/closeIcon/CloseIcon';
import Forgot from './pages/Auth/forgotpw/Forgot';
import Verification from './pages/Auth/forgotpwVerify/Verification';
import SignVerification from './pages/Auth/SignupVerify/SignVerification';
import ChangePassword from './pages/Auth/Changepw/ChangePassword';
import TermsCondition from './pages/Auth/termsform/termsCondition';
import PrivacyPolicyContent from './pages/Privacy&Policy/privacy';

// Layout component for Auth pages (with signin-container)
function AuthLayout({ children }) {
  const handleClose = () => {
    console.log('Close button clicked');
    // Add custom logic for the CloseIcon here
  };

  return (
    <div className="signin-container">
      <Logo />
      <CloseIcon onClick={handleClose} className="custom-close-icon" />
      {children}
    </div>
  );
}

// Main App component
function App() {
  const location = useLocation(); // Get current path

  return (
    <Routes>
      {/* Auth pages wrapped in signin-container */}
      <Route
        path="/signin"
        element={
          <AuthLayout>
            <SignInForm />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUpForm />
          </AuthLayout>
        }
      />
      <Route
        path="/forgotpw"
        element={
          <AuthLayout>
            <Forgot />
          </AuthLayout>
        }
      />
      <Route
        path="/forgotpwVerify"
        element={
          <AuthLayout>
            <Verification />
          </AuthLayout>
        }
      />
      <Route
        path="/SignupVerify"
        element={
          <AuthLayout>
            <SignVerification />
          </AuthLayout>
        }
      />
      <Route
        path="/Changepw"
        element={
          <AuthLayout>
            <ChangePassword />
          </AuthLayout>
        }
      />
      <Route
        path="/termsform"
        element={
          <AuthLayout>
            <TermsCondition />
          </AuthLayout>
        }
      />

      {/* Standalone Privacy Policy page (no signin-container) */}
      <Route path="/Privacy&Policy" element={<PrivacyPolicyContent />} />

      {/* Redirect to /Privacy&Policy if route not found */}
      <Route path="*" element={<Navigate to="/Privacy&Policy" />} />
    </Routes>
  );
}

// Wrap App with Router
function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
