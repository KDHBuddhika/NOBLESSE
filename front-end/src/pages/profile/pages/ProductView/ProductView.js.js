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
    fetch(`https://api.example.com/products/${productId}`)  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleBack = () => {
    // Navigate back to "Your Products" page
    navigate('/products');
  };

  // if (!product) {
  //   return <p>Loading...</p>; // Loading state while data is fetched
  // }

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      
      <div className={styles.contentWrapper}>
        <div className={styles.productContainer}>
          <h1>Vintage Rolex Submariner Watch</h1>
          <p className={styles.price}>$23</p>
          <img src={require("../../../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg")} alt="" className={styles.productImage} />
          <p className={styles.description}>  A classic Rolex Submariner, featuring a black dial and stainless-steel bracelet. Known for its durability and timeless design, this watch is a must-have for collectors and watch enthusiasts alike. Comes with original packaging and certificate of authenticity.</p>
          <p className={styles.category}><strong>Women's Handbags</strong></p>
          <p className={styles.approvalState}>Approved</p>
          <button className={styles.backButton} onClick={handleBack}>Back</button>
        </div>
      </div>

      {/* <div className={styles.contentWrapper}>
        <div className={styles.productContainer}>
          <h1>{product.name}</h1>
          <p className={styles.price}>${product.price}</p>
          <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}><strong>{product.category}</strong></p>
          <p className={styles.approvalState}>{product.approvalState}</p>
          <button className={styles.backButton} onClick={handleBack}>Back</button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductView;
