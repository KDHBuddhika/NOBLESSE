import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from './pages/Auth/Signin/SignInForm';
import SignUpForm from './pages/Auth/Signup/SignUpForm';
import Forgot from './pages/Auth/forgotpw/Forgot';
import Verification from './pages/Auth/forgotpwVerify/Verification';
import SignVerification from './pages/Auth/SignupVerify/SignVerification';
import ChangePassword from './pages/Auth/Changepw/ChangePassword';
import TermsCondition from './pages/Auth/termsform/termsCondition'; 
import PrivacyPolicyContent from './pages/Privacy&Policy/privacy'; 
import YourInfo from './pages/UserProfile/YourInfo/Infoform/Info'; 
import Delete from './pages/UserProfile/YourInfo/DeleteAcc/Modal'; 




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/forgotpw" element={<Forgot />} />
        <Route path="/termsform" element={<TermsCondition />} />
        <Route path="/forgotpwVerify" element={<Verification />} />
        <Route path="/SignupVerify" element={<SignVerification />} />
        <Route path="/Changepw" element={<ChangePassword />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/Privacy&Policy" element={<PrivacyPolicyContent />} />
        <Route path="/Infoform" element={<YourInfo />} />
        <Route path="/DeleteAcc" element={<Delete />} />
        
        <Route path="*" element={<Navigate to="/Infoform" />} />
      </Routes>
    </Router>
  );
}

export default App;
