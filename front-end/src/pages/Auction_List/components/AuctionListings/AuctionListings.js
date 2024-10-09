import React, { useState } from 'react';
import './AuctionListings.css';

const AuctionList = () => {
  const auctions = [
    {
      name: "Green Colored Gemstone",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 20, 8:00 AM UTC",
      winningBid: "$1000",
      category: "jewelry",
    },
    {
      name: "Harry Styles Autographed Gold Microphone",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 18, 12:00 AM",
      winningBid: "$3500",
      category: "music",
    },
    {
      name: "Purple Sapphire necklace",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 15, 2:00 AM",
      winningBid: "$800",
      category: "jewelry",
    },
    {
      name: "Antique Hand Blown Painted Glass Vase",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 14, 12:00 PM",
      winningBid: "$500",
      category: "antiques",
    },
    {
      name: "Men's Rose Gold Diamond Ring",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 19, 10:00 AM",
      winningBid: "$2500",
      category: "jewelry",
    },
    {
      name: "Painting: The Girl With A Pearl Earring",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 17, 9:00 AM",
      winningBid: "$4500",
      category: "art",
    },
    {
      name: "Egyptian Artifact: The Mask of Tutankhamun",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 17, 8:00 AM UTC",
      winningBid: "$8100",
      category: "antiques",
    },
    {
      name: "19th century Victorian Lamp",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionOpens: "September 16, 10:00 AM",
      winningBid: "$350",
      category: "antiques",
    },
    {
      name: "Ancient Greek Bronze Helmet",
      image: "GXPYNzrbgAI4bV0.jpeg",
      auctionCloses: "September 1, 3:00 PM",
      winningBid: "$2800",
      category: "antiques",
    },
  ];

  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const filteredAuctions = category
    ? auctions.filter((auction) => auction.category === category)
    : auctions;

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return parseFloat(a.winningBid.slice(1)) - parseFloat(b.winningBid.slice(1));
      case 'price-desc':
        return parseFloat(b.winningBid.slice(1)) - parseFloat(a.winningBid.slice(1));
      case 'time-left':
        return new Date(a.auctionOpens || a.auctionCloses) - new Date(b.auctionOpens || b.auctionCloses);
      default:
        return 0;
    }
  });

  return (
    <div className='maincontainer'>
      <div className="header">
        <h1>All Auctions</h1>
        <div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="jewelry">Jewelry</option>
            <option value="art">Art</option>
            <option value="antiques">Antiques</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time-left">Time Left</option>
          </select>
        </div>
      </div>

      <div className="container2">
        {sortedAuctions.map((auction) => (
          <div key={auction.name} className="card2">
            <img src={auction.image} alt={auction.name} />
            <div className="card-content2">
              <h3>{auction.name}</h3>
              <div className="auction-info2">
                <span>Auction {auction.auctionOpens ? 'opens' : 'closes'}: {auction.auctionOpens || auction.auctionCloses}</span>
                <span>Winning bid: {auction.winningBid}</span>
              </div>
              <div className="buttons2">
                <button className="btn btn-primary">Explore</button>
                <button className="btn btn-secondary">{auction.auctionCloses ? 'Place a Bid' : 'Add to Watch'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
