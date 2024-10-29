import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css'; 

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);


  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMessage = { sender: 'User', text: userInput };
    
    setLoading(true);
  
    try {
      const response = await axios.post('https://localhost:7281/api/ChatBot/chat', {
        massage: userInput,  
      });
      console.log('Response:', response);  
  
     
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,  
        { sender: response.data.sender, text: response.data.text }  
      ]);
  
    } catch (error) {
      console.error('Error sending message:', error);  
    }
    
    setLoading(false);
    setUserInput(''); 
  };
  
  
  

  // Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
     <div className="chat-header">
        <div className="chat-logo-container">
          <img src={require("./iconizer-2ntpb8cyDlEEYAs9PdfhSAJUIuy.png")} alt="Noblesse" className="chat-logo" />
        </div>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'User' ? 'user' : 'bot'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="loading">Bot is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
        />
        <button className='chat-button' onClick={sendMessage}>Chat</button>
      </div>
    </div>
  );
};

export default ChatBot;
