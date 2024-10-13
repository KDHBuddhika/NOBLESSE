import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your account...');

  // Get token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (token) {
      // Call the backend API to verify the token
      axios.get(`https://localhost:7281/verify?token=${token}`)
        .then(response => {
          setMessage(response.data); // Set success message from backend
          setTimeout(() => navigate('/login'), 5000); // Redirect to login page after 3 seconds
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setMessage(error.response.data); // Set error message from backend
          } else {
            setMessage('An error occurred during verification. Please try again later.');
          }
        });
    } else {
      setMessage('No token provided.');
      setTimeout(() => navigate('/signup'), 3000); // Redirect to signup if no token is found after 3 seconds
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyAccount;