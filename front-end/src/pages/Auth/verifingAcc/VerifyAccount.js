import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import axios from 'axios';

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate instead of useHistory

  // Get token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    // Call the backend API to verify the token
    axios.get(`https://localhost:7281/api/user/verify?token=${token}`)
      .then(response => {
        alert("Account verified successfully!");
        navigate("/login");  // use navigate to redirect
      })
      .catch(error => {
        alert("Invalid or expired token.");
      });
  }, [token, navigate]);  // Replace history with navigate

  return (
    <div>
      <h2>Verifying your account...</h2>
    </div>
  );
};

export default VerifyAccount;
