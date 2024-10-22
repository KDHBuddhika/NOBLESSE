import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import Navbar from '../../components/AdminNavbar'; // Import your Navbar
import Sidebar from '../../components/AdminSidebar'; // Import your Sidebar
import './ProductView.css'; // Import the relevant CSS

const ProductView = () => {
  const { productId } = useParams(); // Capture productId from URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Fetch product data from backend using productId
    fetchProductDetails();
  }, [productId]); // Re-fetch product data if productId changes

  const fetchProductDetails = async () => {
    // Replace with actual API call to fetch product data by productId
    const response = await fetch(`https://localhost:7281/api/Admin/productDetails/${productId}`);
    const data = await response.json();
    setProduct(data);
  };

  const handleApprove = async () => {
    // API call to approve the product
    await fetch(`https://localhost:7281/api/Product/ApproveProduct/${productId}`, {
      method: 'POST',
    });

    setProduct({ ...product, isApproved: true });
  };

  const handleReport = () => {
    navigate(`/report/${productId}/${product.userId}`); // Navigate to the report page
  };

  const handleSetAuction = () => {
    navigate(`/convertAuction/${productId}`); // Navigate to set auction page
  };

  const handleViewUser = () => {
    navigate(`/dashboartUserView/${product.userId}`); // Navigate to view user details
  };

  const handleBack = () => {
    navigate('/manageProducts'); // Navigate back to the manage products page
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // API call to delete the product
      await fetch(`https://localhost:7281/api/Product/deleteProduct/${productId}`, {
        method: 'DELETE',
      });
      alert('Product deleted successfully');
      setTimeout(() => {
        navigate(`/manageProducts`);
      }, 2000); // Redirect after 2 seconds
      
     
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-view-container">
      <Navbar />
      <div className="product-view-main-content">
        <Sidebar />
        <div className="product-detailsd">
          <h1>{product.productName}</h1>
          <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${product.imageUrl}`)} alt={product.productName} className="product-image" />
          <p>{product.description}</p>
          <p>Starting Price: ${product.startingPrice}</p>
          <p>Category: {product.categoryName}</p>
          <p>User: {product.userName}</p>
          <p>Email: {product.userEmail}</p>
          <p>Status: {product.isApproved ? 'Approved' : 'Not Approved'}</p>

          <div className="button-group">
            <button
              onClick={handleApprove}
              className="approve-button"
              disabled={product.isApproved}
            >
              Approve
            </button>

            <button onClick={handleReport} className="report-button">
              Report
            </button>

            <button onClick={handleSetAuction} className="set-auction-button">
              Set Auction
            </button>

            <button onClick={handleViewUser} className="view-user-button">
              View User
            </button>

            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>

            <button onClick={handleBack} className="delete-button">
              Back 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
