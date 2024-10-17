import React from 'react';
import './histoty.css';
import Card6 from '../cardhistory/cardh';

const HistoryPayment = ({ onPendingClick }) => {
  return (
    <div className="position">
      <div className="bids-container">
        <div className="clear">
          <br /><br /><br /><br /><br /><br /><br />
          <section className="sectionone">
            <div className="bids-details">
            
              <p onClick={onPendingClick}>Pending</p>
              <p className="headName3">History</p>
            </div>
          </section><br />
          <div className="cardposition">
            <Card6 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPayment;
