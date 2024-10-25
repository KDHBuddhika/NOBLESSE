import React, { useState } from 'react';
import axios from 'axios';
import './TrainBot.css';

const TrainBot = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7281/api/ChatBot/train', { question, answer });
      alert('Question and Answer saved successfully');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="train-container">
      <div className="top-image">
        <img src={require("./iconizer-2ntpb8cyDlEEYAs9PdfhSAJUIuy.png")} alt="Noblesse" />
      </div>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default TrainBot;
