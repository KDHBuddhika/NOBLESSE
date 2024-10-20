import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  // Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Sidebar component
import styles from './ProductView.module.css'; // CSS for styling

const ProductView = () => {
  const { productId } = useParams();  // Capture product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details by product ID from the .NET backend API
    fetch(`https://localhost:7281/productDetails/${productId}`)  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleBack = () => {
    // Navigate back to "Your Products" page
    navigate('/products');
  };

  // Handle the case where the product data is not yet loaded
  if (!product) {
    return <p>Loading...</p>; // Display loading text while data is being fetched
  }

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      
      <div className={styles.contentWrapper}>
        <div className={styles.productContainer}>
          <h1>{product.productName}</h1>
          <p className={styles.price}>${product.price}</p>

          {/* Assuming the `imageUrl` is a filename, prepend the proper path to load the image */}
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
