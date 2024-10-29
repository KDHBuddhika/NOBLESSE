import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatButton.css';

const ChatButton = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Check for user ID

  if (!userId) {
    return null; // Don't render the button if user ID doesn't exist
  }

  const goToChatBot = () => {
    navigate('/chatbot'); // Navigate to the chatbot page
  };

  return (
    <div className="chat-button-container">
      <span className="chat-button-tooltip">Chat with us!</span>
      <button className="chat-button" onClick={goToChatBot}>
        💬
      </button>
    </div>
  );
};

export default ChatButton;
