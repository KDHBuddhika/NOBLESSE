
import React from 'react';
import AuctionListings from './components/AuctionListings/AuctionListings';
import VintageTimepiecesGallery from './components/VintageTimepiecesGallery/VintageTimepiecesGallery';
import './AuctionListPage.css';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';


function AuctionListPage() {
  return (
    <div className='auctionListContainer'>
        {/* <Navbar/> */}
        <VintageTimepiecesGallery />
       <AuctionListings />

       {/* <Footer/> */}
    </div>
  );
}

export default AuctionListPage;

