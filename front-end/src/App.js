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
import Bids from './pages/UserProfile/yourBids/bidsmain/main';
import Openauc from './pages/UserProfile/yourBids/OpenAuc/open';
import Emp from './pages/UserProfile/Notification/Notificationside/tem'; 
import Message from './pages/UserProfile/Notification/Message/message'; 
import Previous from './pages/UserProfile/Notification/PreviousNotify/previous';


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
        <Route path="/bidsmain" element={<Bids />} />
        <Route path="/OpenAuc" element={<Openauc />} />
        <Route path="/Notificationside" element={<Emp />} />
        <Route path="/Message" element={< Message/>} />
        <Route path="/PreviousNotify" element={< Previous/>} />
        
        <Route path="*" element={<Navigate to="/Notificationside" />} />
    </Routes>
    </Router>
  );
}

export default App;
