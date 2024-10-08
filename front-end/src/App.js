import React from 'react';
import AuctionPage from './pages/Auction/AuctionPage'; 
import PlaceABid from './pages/PlaceABid/PlaceABid';
import HowItWork from './pages/HowItWork/HowItWork';
import AboutUs from './pages/AboutUs/AboutUs';

function App() {
  return (
    <div className="App">
      <AboutUs />
      <AuctionPage />
      <PlaceABid />
      <HowItWork />
      
    </div>
  );
}

export default App;
