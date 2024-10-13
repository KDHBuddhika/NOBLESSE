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
import AuctionListPage from './pages/Auction_List/AuctionListPage';
import VerifyAccount from './pages/Auth/verifingAcc/VerifyAccount';
import HomePage from './pages/home/home';
// import YourInfo from './pages/UserProfile/YourInfo/Infoform/Info'; 
// import Delete from './pages/UserProfile/YourInfo/DeleteAcc/Modal'; 

// import Layout from './pages/Components/Layout';

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
        {/* <Route path='/auctionList' element={<AuctionListPage/>} />
        <Route path="/Privacy&Policy" element={<PrivacyPolicyContent />} /> */}
       <Route exact path="/auctionList" element={<AuctionListPage />} />
       <Route exact path="/Privacy&Policy" element={<PrivacyPolicyContent />} />

       <Route path="/verifyAccount" element={<VerifyAccount />} />

       {/* <Route path="/infoform" element={<YourInfo />} />
       <Route path="/deleteAcc" element={<Delete />} /> */}

       {/* <Route path="/navbar" element={<Layout />} /> */}
      
       <Route path="/home" element={< HomePage/>} />

        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
