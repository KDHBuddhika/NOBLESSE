import React, { useState } from 'react';
import './message.css';

const Message = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="message-container">
      <div className="message-header" onClick={toggleCollapse}>
        <p className="message-title">Your Bid is Confirmed!</p>
        <span className="collapse-icon">{isCollapsed ? '▼' : '▲'}</span>
      </div>
      {!isCollapsed && (
        <div className="message-body">
          <p>Your Bid Has Been Confirmed! You're officially in the running for this item. Stay vigilant and monitor
             the auction closely in case you need to place a higher bid. Keep up with the competition and secure your
              spot as the highest bidder!</p>
        </div>
      )}
    </div>
  );
};

export default Message;
