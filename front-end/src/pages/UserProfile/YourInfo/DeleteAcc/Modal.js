import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete My Account</h2>
        <p>We have just sent a deletion code to your email.</p>
        <div className="code-inputs">
          {[...Array(5)].map((_, i) => (
            <input key={i} type="text" maxLength="1" />
          ))}
        </div>
        <p className="send">Send a code again.</p>
        <button className="delete-btn">Delete</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default Modal;