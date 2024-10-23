import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/AdminNavbar'; 
import Sidebar from '../../components/AdminSidebar'; 
import './ProductView.css'; 

const ProductView = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
   
    fetchProductDetails();
  }, [productId]); 

  const fetchProductDetails = async () => {
    
    const response = await fetch(`https://localhost:7281/api/Admin/productDetails/${productId}`);
    const data = await response.json();
    setProduct(data);
  };



  const handleApprove = async () => {
    try {
      const response = await fetch(`https://localhost:7281/api/Product/ApproveProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ isApproved: true }), 
      });
  
      if (response.ok) {
        
        const updatedProduct = await response.json(); 
        setProduct({ ...product, isApproved: updatedProduct.isApproved || true });
        alert('Product approved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error approving product: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Error approving product.');
    }
  };



  const handleReport = () => {
    navigate(`/report/${productId}/${product.userId}`); 
  };



  const handleSetAuction = () => {
    navigate(`/convertAuction/${productId}`); 
  };



  const handleViewUser = () => {
    navigate(`/dashboartUserView/${product.userId}`); 
  };



  const handleBack = () => {
    navigate('/manageProducts'); 
  };



  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
   
      await fetch(`https://localhost:7281/api/Product/deleteProduct/${productId}`, {
        method: 'DELETE',
      });
      alert('Product deleted successfully');
      setTimeout(() => {
        navigate(`/manageProducts`);
      }, 2000); 
      
     
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
