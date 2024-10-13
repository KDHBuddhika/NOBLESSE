import React from 'react';
import './previous.css';
import Message from '../Message/message';

const Previous = ({ onNewClick }) => {
return (

<div className="termjs">
  <div className="bids-container">
  <div className="clear"><br /><br /><br /><br /><br /><br /><br />
    <section className="sectionone">
      <div  className="bids-details">
      <p onClick={onNewClick}  style={{ cursor: 'pointer' }}>New</p>
      <p className="previousnotify">Previous</p>
      </div>
      </section><br />
      <div className="cardposition">
      <Message/>
      </div>
   </div>
   </div>
   </div>


);
};

export default Previous;