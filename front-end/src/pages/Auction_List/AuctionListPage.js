
import React from 'react';
import AuctionListings from './components/AuctionListings/AuctionListings';
import VintageTimepiecesGallery from './components/VintageTimepiecesGallery/VintageTimepiecesGallery';
import './AuctionListPage.css';

function AuctionListPage() {
  return (
    <div className='auctionListContainer'>
        <VintageTimepiecesGallery />
       <AuctionListings />
    </div>
  );
}

export default AuctionListPage;

