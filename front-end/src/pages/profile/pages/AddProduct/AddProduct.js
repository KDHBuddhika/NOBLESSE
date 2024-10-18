import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbark';  // Navbar component
import ProfileSidebar from '../../components/ProfileSidebar'; // Sidebar component
import styles from './AddProduct.module.css';  // CSS module for styling

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    startingPrice: '',
    description: '',
    category: '',
    thumbnailImage: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from backend
    fetch('https://api.example.com/categories')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setCategories(data))
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
    
    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('startingPrice', formData.startingPrice);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('thumbnailImage', formData.thumbnailImage);
    
    // Send the data to the backend
    fetch('https://api.example.com/products', {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.json())
    .then(data => {
      alert('Product added successfully');
      navigate('/profile/products'); // Redirect to the products page after success
    })
    .catch(error => console.error('Error adding product:', error));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      startingPrice: '',
      description: '',
      category: '',
      thumbnailImage: null
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileNavbar />
      <ProfileSidebar />
      <div className={styles.contentWrapper}>
        <h1>Add Product</h1>
        <form className={styles.productForm} onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
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
                {category.name}
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
