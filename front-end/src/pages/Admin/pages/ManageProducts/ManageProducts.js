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
        // Fetch products
        const productResponse = await fetch('https://localhost:7281/api/Product/getAllProducts');
        const productData = await productResponse.json();

        // Fetch categories
        const categoryResponse = await fetch('https://localhost:7281/getAllCategory');
        const categoryData = await categoryResponse.json();

        // Set product and category data
        setProducts(productData.$values);  // Assuming products are in the $values array
        setCategories(categoryData.$values);  // Assuming categories are in the $values array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter handler
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.categoryName === selectedCategory) &&
      (isApproved === '' || product.isApproved.toString() === isApproved)
    );
  });

  // Handle view button click
  const handleView = (productId) => {
    navigate(`/dashboardProduct/${productId}`);
  };

  // Handle delete button click
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://localhost:7281/api/Product/deleteProduct/${productId}`, {
          method: 'DELETE',
        });
        const result = await response.json();  // Parse the response
        if (result === true) {
          // Remove the product from the local state after successful deletion
          setProducts(products.filter(product => product.productId !== productId));
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
          <h1>Manage Products</h1>

          {/* Filter section */}
          <div className="filters">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.categoriesName}>
                  {category.categoriesName}
                </option>
              ))}
            </select>

            <select
              value={isApproved}
              onChange={(e) => setIsApproved(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Approval Status</option>
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
                <th>Is Approved</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td><img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${product.thumbnailImage}`)} alt={product.productName} className="product-image" /></td>
                  <td>{product.productName}</td>
                  <td>{product.startingPrice}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.isApproved ? 'Approved' : 'Not Approved'}</td>
                  <td>
                    <button onClick={() => handleView(product.productId)} className="view-btn">View</button>
                    <button onClick={() => handleDelete(product.productId)} className="delete-btn">Delete</button>
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
