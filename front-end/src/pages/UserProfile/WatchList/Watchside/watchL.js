import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WatchCard from '../../WatchList/card2/watchcard';

const WatchList = () => {

  const [cards, setCards] = useState([
    { id: 1, name: "Green Colored Gemstone" },
   
  ]);

  
  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };


  return (
    <div className="info-container">
      <div className="header">
        <h1>Profile</h1>
        <div className="user-info">
          <p className="nimna">Welcome Miss Nimna</p>
          <p className="mail">nimna@gmail.com</p>
        </div>
      </div>

      <div className="Bmenu">
        <ul>
          <li><Link to="/Infoform">Your Info</Link></li>
          <li><Link to="/OpenAuc">Your Bids</Link></li>
          <li><Link to="/Notificationside">Notifications</Link></li>
          <li>Payment</li>
          <li className="wl"><b>Watch List</b></li>
          <li>Dashboard</li>
          <li>Your Auctions</li>
          <li>Earnings</li>
        </ul>
      </div>

      <div className="bids-container">
        <div className="clear"><br /><br /><br />
        {cards.length > 0 ? (
            cards.map((card) => (
              <WatchCard 
                key={card.id} 
                id={card.id} 
                onDelete={deleteCard} // Pass the delete function
              />
            ))
          ) : (
            <p className="emptyitem">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            
            No items in the watchlist</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default WatchList;
