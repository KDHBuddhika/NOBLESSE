import React, { useState, useEffect } from 'react';
import './AuctionListings.css';
import { useNavigate } from 'react-router-dom';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);  // To store auctions data
  const [categories, setCategories] = useState([]);  // To store categories
  const [category, setCategory] = useState('');  // Selected category
  const [sort, setSort] = useState('');  // Selected sort method
  const [currentPage, setCurrentPage] = useState(1);  // Current page number
  const [totalPages, setTotalPages] = useState(1);  // Total number of pages
  const itemsPerPage = 9;  // Items per page
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch auction categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:7281/getAllCategory'); // Adjust backend URL
        const data = await response.json();
        setCategories(data.$values || []);  // Assuming categories are in $values array
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch paginated auctions from the backend when the page changes
    const fetchAuctions = async () => {
      try {
        const response = await fetch(
          `https://localhost:7281/api/Auction/getAuctionByNotCompleted?page=${currentPage}&itemsPerPage=${itemsPerPage}`
        );
        const data = await response.json();
        setAuctions(data.data.$values || []);  // Extract the auction data from $values array
        setTotalPages(Math.ceil(data.totalRecords / itemsPerPage));  // Calculate total pages based on totalRecords
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExplore = (auctionId) => {
    // Navigate to the auction story page with auctionId in the URL
    navigate(`/plasebid2/${auctionId}`);
  };

  // Client-side filter method (filter by category)
  const filteredAuctions = category
    ? auctions.filter((auction) => auction.categoryName === category)
    : auctions;

  // Client-side sorting method
  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.highestBidPrice - b.highestBidPrice;
      case 'price-desc':
        return b.highestBidPrice - a.highestBidPrice;
      case 'time-left':
        return new Date(a.endTime) - new Date(b.endTime);
      default:
        return 0;
    }
  });

  return (
    <div className='maincontainerl'>
      <div className="headerl">
        <h1>All Auctions</h1>
        <div>
          {/* Client-side filter by category */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option className='categoryname' key={cat.id} value={cat.categoriesName}>
                {cat.categoriesName}
              </option>
            ))}
          </select>

          {/* Client-side sorting */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time-left">Time Left</option>
          </select>
        </div>
      </div>

      {/* Auction listings */}
      <div className="container2l">
        {sortedAuctions.map((auction) => (
          <div key={auction.auctionId} className="card2">
            <img src={require(`C:/Users/asus/Desktop/Nobeless/server-side/Nobeless/Nobeless.api/Uploads/${auction.imageUrl}`) || 'path_to_default_image.jpg'} alt={auction.productName} />
            <div className="card-content2">
              <h3>{auction.productName}</h3>
              <div className="auction-info2">
                <span>Auction opens: {new Date(auction.startTime).toLocaleString()}</span>
                <span>Highest bid: ${auction.highestBidPrice}</span>
              </div>
              <div className="buttons2">
              <button className="btn btn-primary" onClick={() => handleExplore(auction.auctionId)}>Explore</button>
                <button className="btn btn-secondary">{auction.isCompleted ? 'Completed' : 'Place a Bid'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
