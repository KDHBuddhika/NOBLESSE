import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  
import ProfileSidebar from '../../components/ProfileSidebar'; 
import styles from './AddProduct.module.css';  

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    category: '',
    thumbnailImage: null,
    userId: localStorage.getItem('userId') || '', 
  });
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from backend
    fetch('https://localhost:7281/getAllCategory')  
      .then(response => response.json())
      .then(data => {
        if (data && data.$values) {
          setCategories(data.$values);  
        }
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      thumbnailImage: e.target.files[0] 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('StartingPrise', parseFloat(formData.startingPrice)); 
    formDataToSend.append('thumbnailImage', formData.thumbnailImage); 
    formDataToSend.append('userId', formData.userId); 
    formDataToSend.append('categoryId', formData.category); 
  
   
    fetch('https://localhost:7281/addproduct', {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.json())  
    .then(data => {
      if (data.message) {
        setSuccessMessage(data.message); 
      } else {
        setSuccessMessage('Unexpected response format');
      }
      
     
      setTimeout(() => {
        setSuccessMessage(''); 
        navigate('/products'); 
      }, 3000); 
    })
    .catch(error => {
      console.error('Error adding product:', error);
      setSuccessMessage('Error adding product');
    });
  };
  

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      startingPrice: '',
      category: '',
      thumbnailImage: null,
      userId: localStorage.getItem('userId') || ''
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Add Product</h1>

        {/* Display success message if product is added */}
        {successMessage && (
          <div className={styles.messageBox}>
            {successMessage}
          </div>
        )}

        <form className={styles.productForm} onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <label>Starting Price</label>
          <input
            type="number"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleInputChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.categoriesName}
              </option>
            ))}
          </select>

          <label>Thumbnail Image</label>
          <input
            type="file"
            name="thumbnailImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>Clear</button>
            <button type="submit" className={styles.addBtn}>Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
