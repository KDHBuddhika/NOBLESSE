import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  // Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Sidebar component
import styles from './YourProduct.module.css'; // CSS for styling

const YourProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userId = 1; // Replace with actual user ID logic

  useEffect(() => {
    // Fetch products by user ID from the .NET backend API
    fetch(`https://api.example.com/products?userId=${userId}`)  // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [userId]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Call API to delete the product
      fetch(`https://api.example.com/products/${productId}`, { method: 'DELETE' })  // Replace with your API endpoint
        .then(() => {
          alert('Product deleted successfully');
          // Remove the product from the state
          setProducts(products.filter(product => product.id !== productId));
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleView = (productId) => {
    // Navigate to the product view page
    navigate(`/productview/${productId}`);
  };

  const handleViewe = (productId) => {
    // Navigate to the product view page
    navigate(`/productView`);
  };

  const handleAddProduct = () => {
    // Navigate to the add product page
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
            <div className={styles.productCard} key={product.id}>
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
              <div className={styles.productDetails}>
                <p>Product Name: <strong>{product.name}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Category: <strong>{product.category}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Starting Price: <strong>${product.startingPrice}</strong></p>
                <span className={styles.dash}>|</span> 
                <p>Approval State: <strong>{product.approvalState}</strong></p>
                <span className={styles.dash}>|</span> 
                <div className={styles.buttons}>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
                  <button className={styles.viewBtn} onClick={() => handleView(product.id)}>View</button>
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
