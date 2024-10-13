import React from 'react';
import './close.css';
import Card from '../cardDesign/card';


const Close = ({ onOpenAuctionsClick }) => {
  
  return (
    <div className="position">
  <div className="bids-container">
  <div className="clear"><br /><br /><br /><br /><br /><br /><br />
    <section className="sectionone">
      <div  className="bids-details">
      <p  onClick={onOpenAuctionsClick}>Open Auctions</p>
      <p className="headName3">Closed Auctions</p>
      </div>
      </section><br />
      <div className="cardposition">
      <Card />
      </div>
   </div>
   </div>
   </div>

  );
};

export default Close;