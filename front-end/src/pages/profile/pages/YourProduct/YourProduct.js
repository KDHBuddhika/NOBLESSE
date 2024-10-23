import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark'; 
import ProfileSidebar from '../../components/ProfileSidebar';
import styles from './YourProduct.module.css'; 

const YourProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
   
    fetch(`https://localhost:7281/getProductsByUserId/${userId}`)  
      .then(response => response.json())
      .then(data => {
        if (data && data.$values) {
          setProducts(data.$values);  
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [userId]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
    
      fetch(`https://localhost:7281/deleteProduct/${productId}`, { method: 'DELETE' })  
        .then(() => {
          alert('Product deleted successfully');
         
          setProducts(products.filter(product => product.id !== productId));
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleView = (productId) => {
  
    navigate(`/productview/${productId}`);
  };

  const handleViewe = (productId) => {
  
    navigate(`/productView`);
  };

  const handleAddProduct = () => {
   
    navigate('/addProduct');
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Your Product</h1>
        <button className={styles.addButton} onClick={handleAddProduct}>Add Product</button>
        <div className={styles.productsList}>
         
        <div className={styles.productCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt=
              "" className={styles.productImage} />
              <div className={styles.productDetails}>
                <p>Product Name: <strong>bds gtyh ffs</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Category: <strong>bag</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Starting Price: <strong>$34</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Approval State: <strong>approved</strong></p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                  <button className={styles.deleteBtn} >Delete</button>
                  <button className={styles.viewBtn} onClick={() => handleViewe()}>View</button>
                </div>
              </div>
            </div>

            <div className={styles.productCard} >
              <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt=
              "" className={styles.productImage} />
              <div className={styles.productDetails}>
                <p>Product Name: <strong>bds gtyh ffs</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Category: <strong>bag</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Starting Price: <strong>$34</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Approval State: <strong>approved</strong></p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                  <button className={styles.deleteBtn} >Delete</button>
                  <button className={styles.viewBtn} >View</button>
                </div>
              </div>
            </div>
         
         
         
            {products.map(product => (
            <div className={styles.productCard} key={product.productId}>
            
              <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${product.thumbnailImage}`)} alt={product.productName} className={styles.productImage} />
              <div className={styles.productDetails}>
                <p>Product Name: <strong>{product.productName}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Category: <strong>{product.categoryName}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Starting Price: <strong>${product.startingPrice}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Approval State: <strong>{product.isApproved ? 'Approved' : 'Pending'}</strong></p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(product.productId)}>Delete</button>
                  <button className={styles.viewBtn} onClick={() => handleView(product.productId)}>View</button>
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
};

export default YourProduct;
