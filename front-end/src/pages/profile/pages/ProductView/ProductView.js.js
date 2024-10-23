import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './ProductView.module.css'; 

const ProductView = () => {
  const { productId } = useParams();  
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch(`https://localhost:7281/productDetails/${productId}`) 
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleBack = () => {
    
    navigate('/products');
  };

 
  if (!product) {
    return <p>Loading...</p>; 
  }

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      
      <div className={styles.contentWrapper}>
        <div className={styles.productContainer}>
          <h1>{product.productName}</h1>
          <p className={styles.price}>${product.price}</p>

        
          <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${product.imageUrl}`)} alt={product.productName} className={styles.productImage} />

          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}><strong>{product.categoryName}</strong></p>
          <p className={styles.approvalState}>
            {product.isApproved ? 'Approved' : 'Pending Approval'}
          </p>
          <button className={styles.backButton} onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
