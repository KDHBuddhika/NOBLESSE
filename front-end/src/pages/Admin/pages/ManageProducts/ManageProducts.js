import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar';  // Adjust path
import Sidebar from '../../components/AdminSidebar'; // Adjust path
import './ManageProducts.css'; // Import the relevant CSS

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isApproved, setIsApproved] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products and categories from backend
    const fetchData = async () => {
      try {
        const productResponse = await fetch('https://your-backend-api-url/products');
        const categoryResponse = await fetch('https://your-backend-api-url/categories');
        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();
        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter handler
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.category === selectedCategory) &&
      (isApproved === '' || product.is_approved === isApproved)
    );
  });

  // Handle view button click
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://your-backend-api-url/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the product from the local state after successful deletion
          setProducts(products.filter(product => product.id !== id));
          alert('Product deleted successfully');
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred while deleting the product');
      }
    }
  };

  return (
    <div className="manage-products-layout">
      <Navbar />
      <div className="manage-products-main-content">
        <Sidebar />
        <div className="manage-products-content">
          <h1>Manage Product</h1>

          {/* Filter section */}
          <div className="filters">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={isApproved}
              onChange={(e) => setIsApproved(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Is_Approved</option>
              <option value="true">Approved</option>
              <option value="false">Not Approved</option>
            </select>
          </div>

          {/* Product table */}
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Starting Price</th>
                <th>Category</th>
                <th>Is_Approved</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td><img src={product.imageUrl} alt={product.name} className="product-image" /></td>
                  <td>{product.name}</td>
                  <td>{product.startingPrice}</td>
                  <td>{product.category}</td>
                  <td>{product.is_approved ? 'Approved' : 'Not Approved'}</td>
                  <td>
                    <button onClick={() => handleView(product.id)} className="view-btn">View</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
