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
// import YourInfo from './pages/UserProfile/YourInfo/Infoform/Info'; 
// import Delete from './pages/UserProfile/YourInfo/DeleteAcc/Modal'; 

// import Layout from './pages/Components/Layout';


import AdminNavbar from './pages/Admin/components/AdminNavbar';
import AdminSlidebar from './pages/Admin/components/AdminSidebar';

import Dashboard from './pages/Admin/pages/Dashboard/Dashboard';
import ManageProducts from './pages/Admin/pages/ManageProducts/ManageProducts';
import ManageAuctions from './pages/Admin/pages/ManageAuctions/ManageAuctions';
import ManageCategories from './pages/Admin/pages/ManageCategories/ManageCategories';
import ManageUsers from './pages/Admin/pages/ManageUser/ManageUser';
import DashboardViewProduct from './pages/Admin/pages/DashboardViewProduct/DashboardViewProduct.js';
import ConvertAuction from './pages/Admin/pages/ConvertAuctionPage/ConvertAuctionPage.js';
import DashboardViewUser from './pages/Admin/pages/DashBoardViewUser/DashBoardViewUser.js';

import YourInfo from './pages/profile/pages/YourInfo/YourInfo';
import YourBids from './pages/profile/pages/YourBids/YourBids';
import YourProduct from './pages/profile/pages/YourProduct/YourProduct';
import AddProduct from './pages/profile/pages/AddProduct/AddProduct';
import ProductView from './pages/profile/pages/ProductView/ProductView.js';
import MyAuction from './pages/profile/pages/YourAuction/MyAuction.js';
import AuctionResult from './pages/profile/pages/AuctionResult/AuctionResult.js';
import NotificationPage from './pages/profile/pages/NotificationPage/NotificationPage.js';
import PaymentPage from './pages/profile/pages/PaymentPage/PaymentPage.js';
import PaymentDetails from './pages/profile/pages/PaymentDetailsPage/PaymentDetails.js';
import WatchList from './pages/profile/pages/WatchList/WatchListPage.js';
import ProfileDashboard from './pages/profile/pages/DashboardProfile/DashboardProfile.js';

import Home from './pages/home/home';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import HowItWork from './pages/HowItWork/HowItWork.jsx';
import PlaceABid from './pages/PlaceABid/PlaceABid.jsx'; 
import PlaceABid2 from './pages/PlaceABid/placeabid2.jsx'; 
import ChatBot from './pages/chatbot/ChatBot.js';
import TrainBot from './pages/Admin/TrainBot/TrainBot.js';
import ContactUs from './pages/ContactUs/ContactUs.jsx';


import Layout from "./pages/Components/Layout";
import { ImRoad } from 'react-icons/im';


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
       <Route path="/verifyAccount" element={<VerifyAccount />} />

      

       
      
    





       {/*-------------  Admin Panal  */}
       <Route path="/dashboard" element={<Dashboard />} />

       <Route path="/manageProducts" element={<ManageProducts/>} />

       <Route path="/manageAuctions" element={<ManageAuctions/>} />

       <Route path="/manageCategories" element={<ManageCategories/>} />

       <Route path="/manageUsers" element={<ManageUsers/>} />

       <Route path="/dashboardProduct/:productId" element={<DashboardViewProduct/>} />

       <Route path="/convertAuction/:productId" element={<ConvertAuction/>} />

       <Route path="/dashboartUserView/:userId" element={<DashboardViewUser/>} />

       <Route exact path="/trainbot" element={<TrainBot />} />



       {/* profile */}

       <Route path="/yourInfo" element={<YourInfo/>} />

       <Route path="/yourBids" element={<YourBids/>} />

       <Route path="/products" element={<YourProduct/>} />

       <Route path="/addProduct" element={<AddProduct/>} />

       <Route path="/productView/:productId" element={<ProductView/>} />

       <Route path="/yourAuction" element={<MyAuction/>} />

       <Route path="/yourAuction/result" element={<AuctionResult/>} />

       <Route path="/profile/notification" element={<NotificationPage/>} />

       <Route path="/profile/payment/:auctionId" element={<PaymentPage/>} />

       <Route path="/profile/payment" element={<PaymentDetails/>} />

       <Route path="/profile/watchlist" element={<WatchList/>} />

       <Route path="/profileDashboard" element={<ProfileDashboard/>} />


   

        

         {/* main */}

        <Route element={<Layout />}>
					<Route path="/home" element={<Home />} />
          <Route exact path="/auctionList" element={<AuctionListPage />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/howItwork" element={<HowItWork />} />
          <Route exact path="/Privacy&Policy" element={<PrivacyPolicyContent />} />
          <Route exact path="/plasebid" element={<PlaceABid />} />
          <Route exact path="/plasebid2/:auctionId" element={<PlaceABid2 />} />
          <Route exact path="/chatbot" element={<ChatBot />} />
          <Route exact path="/chatbot" element={<ChatBot />} />
          <Route exact path="/contactus" element={<ContactUs />} />
				</Route>



        


        
        {/* Catch-all route */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
