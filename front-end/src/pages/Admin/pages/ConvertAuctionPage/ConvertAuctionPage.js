import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar'; // Import your Navbar
import Sidebar from '../../components/AdminSidebar'; // Import your Sidebar
import './ConvertAuction.css'; // CSS for the page

const ConvertAuction = () => {
  const { productId } = useParams(); // Capture productId from URL
  const [product, setProduct] = useState(null);
  const [currentHighestBid, setHighestPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isCompleted] = useState(false); // Set isCompleted as a boolean
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7281/api/Admin/productDetails/${productId}`);
      const data = await response.json();
      setProduct(data);
      setHighestPrice(data.startingPrice); // Set default highest price
    } catch (error) {
      setErrorMessage('Failed to load product details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if startTime and endTime are valid
    if (!currentHighestBid || !startTime || !endTime) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Parse the dates to ensure they are valid
    const formattedStartTime = new Date(startTime);
    const formattedEndTime = new Date(endTime);

    // Validate if startTime and endTime are valid dates
    if (isNaN(formattedStartTime.getTime()) || isNaN(formattedEndTime.getTime())) {
      setErrorMessage('Invalid date or time');
      return;
    }

    const auctionData = {
      productId,
      currentHighestBid: parseFloat(currentHighestBid), // Ensure it's a decimal
      startTime: formattedStartTime.toISOString(), // Convert to ISO string
      endTime: formattedEndTime.toISOString(), // Convert to ISO string
      isCompleted, // Send isCompleted as a boolean
    };

    try {
      const response = await fetch(`https://localhost:7281/addAuction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData),
      });

      if (response.ok) {
        setSuccessMessage('Auction created successfully');
        setTimeout(() => {
          navigate(`/dashboardProductView/${productId}`);
        }, 3000); // Redirect after 2 seconds
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create auction');
      }
    } catch (error) {
      setErrorMessage('Failed to create auction');
    }
  };

  const handleBack = () => {
    navigate(`/dashboardProduct/${productId}`); // Navigate back to product view page
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="convert-auction-container">
      <Navbar /> {/* Include Navbar */}
      <div className="main-content">
        <Sidebar /> {/* Include Sidebar */}
        <div className="content-aread">
          <h2>Auction</h2>
          <div className="auction-details">
            <p>Product ID: {productId}</p>
            <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${product.imageUrl}`)} alt={product.productName} className="product-image" />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Highest Price</label>
                <input
                  type="number"
                  value={currentHighestBid}
                  onChange={(e) => setHighestPrice(e.target.value)}
                  
                />
              </div>

              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-button">
                  Back
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertAuction;
