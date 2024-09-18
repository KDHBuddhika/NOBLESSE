// src/components/CloseIcon.js
import React from 'react';
import { FaTimes } from 'react-icons/fa'; 
import './../closeIcon/CloseIcon.css'; 

function CloseIcon({ onClick, className }) {
  return (
    <div className={`close-icon ${className}`} onClick={onClick}>
      <FaTimes />
    </div>
  );
}

export default CloseIcon;
