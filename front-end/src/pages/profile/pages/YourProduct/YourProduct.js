// YourProduct.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/profilenavbar";
import Sidebar from "../../components/profileslidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './YourProduct.css'; // Add necessary CSS for layout and interaction


const YourProduct = () => {
    const [products, setProducts] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();
  
    const userId = localStorage.getItem("userId");
  
    useEffect(() => {
      axios.get(`/api/user/products/${userId}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error("Error fetching products:", error));
    }, [userId]);
  
    const handleDelete = (productId) => {
      setShowDeleteConfirm(true);
      setSelectedProductId(productId);
    };
  
    const confirmDelete = () => {
      axios.delete(`/api/user/delete-product/${selectedProductId}`)
        .then(() => {
          alert("Product deleted successfully!");
          setProducts(products.filter(product => product.id !== selectedProductId));
          setShowDeleteConfirm(false);
        })
        .catch(error => console.error("Error deleting product:", error));
    };
  
    const handleView = (productId) => {
      navigate(`/productview/${productId}`);
    };
  
    const handleAddProduct = () => {
      navigate("/addproduct");
    };
  
    return (
      <div className="your-product-page">
        <Navbar />
        <div className="product-container">
          <Sidebar />
          <div className="content">
            <div className="header">
              <h1>Your Product</h1>
             
            </div>
            <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>

            <div className="product-card" >
                <div className="product-details">
                  <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="Product" />
                  <div className="product-info">
                    <p>Antique Silver Pocket Watch <span className="dash">|</span></p>
                    <p>Category : Luxury Goods  <span className="dash">|</span> </p>
                    <p>Price: $33 <span className="dash">|</span></p>
                    <p>Approved </p>
                  </div>
                </div>
                <div className="product-actions">
                  <button className="delete-button" >Delete</button>
                  <button className="view-button" >View</button>
                </div>
              </div>

              <div className="product-card" >
                <div className="product-details">
                  <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="Product" />
                  <div className="product-info">
                    <p>Antique Silver Pocket Watch <span className="dash">|</span></p>
                    <p>Category : Luxury Goods  <span className="dash">|</span> </p>
                    <p>Price: $33 <span className="dash">|</span></p>
                    <p>Approved </p>
                  </div>
                </div>
                <div className="product-actions">
                  <button className="delete-button" >Delete</button>
                  <button className="view-button" >View</button>
                </div>
              </div>


            {products.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-details">
                  <img src={product.image} alt="Product" />
                  <div className="product-info">
                    <p>Product Name: {product.productName} <span className="dash">|</span></p>
                    <p>Category: {product.category} <span className="dash">|</span></p>
                    <p>Starting Price: ${product.startingPrice} <span className="dash">|</span></p>
                    <p>Approval State: {product.approvalState} </p>
                  </div>
                </div>
                <div className="product-actions">
                  <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                  <button className="view-button" onClick={() => handleView(product.id)}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {showDeleteConfirm && (
          <div className="delete-modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this product?</p>
              <button className="confirm-delete-button" onClick={confirmDelete}>Delete</button>
              <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default YourProduct;