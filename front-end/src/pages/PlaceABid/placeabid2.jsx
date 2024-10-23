import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import imagepb from '../../assets/bracelet-1.jpg'; 

import imagepb1 from '../../assets/bracelet-1-pic1.webp';
import imagepb2 from '../../assets/bracelet-1-pic2.webp';
import imagepb3 from '../../assets/bracelet-1-pic3.webp';
import imagepb4 from '../../assets/bracelet-1-pic4.webp';

const PlaceABid = () => {
  const { auctionId } = useParams(); 
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [bids, setBids] = useState([]); // Initialize bids as an empty array
  const [mainImage, setMainImage] = useState(imagepb);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidderDetails, setBidderDetails] = useState(null);
  const [winnerDetails, setWinnerDetails] = useState(null);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // Function to fetch bidder details
  const fetchBidderDetails = async () => {
    const userId = localStorage.getItem('userId'); // Get current userId from localStorage

    try {
      const response = await fetch(`https://localhost:7281/api/getUser/${userId}`);
      const data = await response.json();
      setBidderDetails(data); 
    } catch (error) {
      console.error('Error fetching bidder details:', error);
    }
  };

  // Function to fetch all bids
  const fetchBids = async () => {
    try {
      const response = await fetch(`https://localhost:7281/api/Bid/getBidder-by-auctionId/${auctionId}`);
      if (!response.ok) {
        if (response.status === 500) {
          setBids([]); // Initialize bids as an empty array if no bidders are found
          return;
        }
        throw new Error('Failed to fetch bidders');
      }
      const data = await response.json();
      setBids(data.$values || []); // Ensure bids is an array or empty
    } catch (error) {
      console.error('Error fetching bids:', error);
      setBids([]); // Ensure bids is set as an empty array in case of an error
    }
  };

  // Function to fetch the auction details, including winner details if completed
  const fetchAuctionDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7281/api/Auction/getAuction-details-byId/${auctionId}`);
      const data = await response.json();
      setAuctionDetails(data); 
      setMainImage(data.imageUrl || imagepb);

      if (data.isCompleted) {
        const winnerResponse = await fetch(`https://localhost:7281/api/Auction/winner/${auctionId}`);
        const winnerData = await winnerResponse.json();
        setWinnerDetails(winnerData); // Assuming the API returns winner details with name and winning amount
      }
    } catch (error) {
      console.error('Error fetching auction details:', error);
    }
  };

  useEffect(() => {
    fetchAuctionDetails();
    fetchBids();
    fetchBidderDetails();
  }, [auctionId]);

  // Function to handle placing a bid
  const handlePlaceBid = async () => {
    // if (bidderDetails?.id === auctionDetails?.userId) {
    //   alert('You cannot place a bid on your own auction.');
    //   return;
    // }

    if (!bidderDetails?.isVerified) {
      alert('You must be a verified user to place a bid.');
      return;
    }

    const bidData = {
      auctionId,
      userId: bidderDetails.id,
      amount: bidAmount,
      bidTime: new Date().toISOString(),
      state: 'pending',
    };

    try {
      const response = await fetch(`https://localhost:7281/addBid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      });

      if (response.ok) {
        alert('Bid placed successfully');
        fetchBids();
      } else {
        alert('Error placing bid');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  // Add a loading state or a conditional check for null auctionDetails
  if (!auctionDetails || !bids) {
    return <div>Loading auction details...</div>; 
  }

  const { productName, description, highestBid, startTime, endTime, categoryName, isCompleted } = auctionDetails;

  const timeLeft = () => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${daysLeft} Days, ${hoursLeft} Hours`;
  };

  return (
    <div className="bg-gray-100 w-full min-w-full">
      {/* Auction Banner */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagepb})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-md">{productName}</h1>
          <h3 className="text-xl lg:text-2xl mt-4 text-shadow-md">{description}</h3>
          <button className="mt-6 bg-transparent border border-white hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            Add to Watch
          </button>
        </div>
      </div>

      {/* Display result box if auction is completed */}
      {isCompleted && winnerDetails && (
        <div className="bg-green-100 p-6 mt-10 mx-10 rounded-lg text-center shadow-lg">
          <h2 className="text-2xl font-bold text-green-800">Auction Completed</h2>
          <p className="text-lg text-green-700">Winner: <strong>{winnerDetails.name}</strong></p>
          <p className="text-lg text-green-700">Winning Amount: <strong>${winnerDetails.amount}</strong></p>
        </div>
      )}

      {/* Bids Section */}
      <div className="bg-[#0e151f] py-8 lg:py-10 px-4 lg:px-32 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-shadow-md">Recent Bids</h2>

        <div className="text-center w-52">
          {(bids.length === 0) ? ( // Fix: Remove check for undefined and initialize bids as an empty array
            <p className="text-xl text-white">No bidders found for this auction</p>
          ) : (
            bids.map((bids, index) => (
              <div key={index}>
                <div className="text-2xl text-white">${bids.bidAmount} <span className="text-sm text-gray-400">{bids.bidderName}</span></div>
                <hr className="w-full border-gray-300 my-3" />
              </div>
            ))
          )}
        </div>

        {/* Bid Stats */}
        {!isCompleted && (
          <div className="bid-stats flex justify-between w-full lg:w-3/4 text-2xl text-white mt-4">
            <div className="winning-bid text-left">
              Winning Bid: <span className="font-bold">${highestBid}</span> USD
            </div>
            <div className="other-stats text-right">
              <div>
                Days Left to Bid: <span className="font-bold">{timeLeft()}</span>
              </div>
              <div>
                Watching Now: <span className="font-bold">{bids.length}</span> people
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Place Bid Section */}
      {!isCompleted && (
        <div className="flex items-center justify-center bg-gray-100 py-48">
          <div className="bg-white rounded-lg px-8 py-6 shadow-lg">
            <div className="flex items-center justify-center space-x-4">
              <button className="bg-gray-200 py-2 px-4 rounded-l-lg text-xl">$</button>
              <input
                type="number"
                className="py-2 px-4 bg-white border border-gray-300 text-xl text-center"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                step="10"
              />
              <div className="flex flex-col">
                <button className="bg-gray-300 py-1 px-2 rounded-t-md text-lg" onClick={() => setBidAmount(bidAmount + 10)}>▲</button>
                <button className="bg-gray-300 py-1 px-2 rounded-b-md text-lg" onClick={() => setBidAmount(bidAmount - 10)}>▼</button>
              </div>
            </div>

            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-semibold w-full"
              onClick={handlePlaceBid}
            >
              Place Bid
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">Bid Increment By: $10</p>
          </div>
        </div>
      )}

      {/* Image Thumbnails Section */}
      <section className="flex flex-col lg:flex-row min-h-screen mb-32">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left md:px-32 mb-8">
          <h2 className="text-3xl font-bold text-black mb-4 justify-center">Condition Report</h2>
          <p className="description text-lg mb-4 max-w-3xl">
            In good condition, with very minor wear and abrasions to the mounting. Stamped PT950/AU750 for platinum and 18 karat gold.
            The trapezoid-shaped diamonds, weighing a total of approximately 1.00 carat, are approximately G-H color, VS clarity. Accompanied by GIA report no. 5234356297 dated July 30, 2024 stating that the diamond is Natural, Fancy Intense Yellow color, SI2 clarity.
          </p>
        </div>

        <div className="w-full lg:w-1/2 h-full flex flex-col items-end pt-20 pr-3 px-8">
          {/* Main Image */}
          <img src={mainImage} alt="Auction Image" className="object-cover w-[80%] h-auto object-right-top mb-4" />

          <div className="flex justify-center space-x-4 w-[80%]">
            <img
              src={imagepb1}
              alt="Thumbnail 1"
              onClick={() => handleImageClick(imagepb1)}
              className="cursor-pointer object-cover w-[25%] h-auto rounded-lg"
            />
            <img
              src={imagepb2}
              alt="Thumbnail 2"
              onClick={() => handleImageClick(imagepb2)}
              className="cursor-pointer object-cover w-[25%] h-auto rounded-lg"
            />
            <img
              src={imagepb3}
              alt="Thumbnail 3"
              onClick={() => handleImageClick(imagepb3)}
              className="cursor-pointer object-cover w-[25%] h-auto rounded-lg"
            />
            <img
              src={imagepb4}
              alt="Thumbnail 4"
              onClick={() => handleImageClick(imagepb4)}
              className="cursor-pointer object-cover w-[25%] h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceABid;
