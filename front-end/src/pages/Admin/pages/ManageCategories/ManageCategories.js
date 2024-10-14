import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/AdminNavbar';  // Adjust path
import Sidebar from '../../components/AdminSidebar'; // Adjust path
import './ManageCategories.css'; // Import the relevant CSS

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://your-backend-api-url/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submit to add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend-api-url/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]); // Add new category to the table
        setCategoryName(''); // Clear the input field
        alert('Category added successfully');
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('An error occurred while adding the category');
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://your-backend-api-url/categories/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCategories(categories.filter(category => category.id !== id));
          alert('Category deleted successfully');
        } else {
          alert('Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('An error occurred while deleting the category');
      }
    }
  };

  return (
    <div className="manage-categories-layout">
      <Navbar />
      <div className="manage-categories-main-content">
        <Sidebar />
        <div className="manage-categories-content">
          <h1>Manage Categories</h1>

          {/* Form to Add Category */}
          <form onSubmit={handleAddCategory} className="add-category-form">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="category-input"
              required
            />
            <button type="submit" className="add-category-btn">Add Category</button>
          </form>

          {/* Category Table */}
          <table className="category-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
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

export default ManageCategories;
