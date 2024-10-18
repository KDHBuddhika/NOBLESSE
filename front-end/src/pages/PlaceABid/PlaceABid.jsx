import React, { useState } from 'react';
import imagepb from '../../assets/bracelet-1.jpg';
import imagepb1 from '../../assets/bracelet-1-pic1.webp';
import imagepb2 from '../../assets/bracelet-1-pic2.webp';
import imagepb3 from '../../assets/bracelet-1-pic3.webp';
import imagepb4 from '../../assets/bracelet-1-pic4.webp';

const PlaceABid = () => {
  // State to manage the current main image
  const [mainImage, setMainImage] = useState(imagepb1);

  // Function to handle thumbnail clicks
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagepb})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-md">Emerald & Diamond Bracelet</h1>
          <h3 className="text-xl lg:text-2xl mt-4 text-shadow-md">Make Your Bid For Elegant Vintage Jewelry With Delicate Design</h3>
          <button className="mt-6 bg-transparent border border-white hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            Add to Watch
          </button>
        </div>
      </div>

      {/* Recent Bids Section */}
      <div className="bg-[#0e151f] py-8 lg:py-10 px-4 lg:px-32 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-shadow-md">Recent Bids</h2>

        <div className="text-center w-52">
          <div className="text-2xl text-white">$2750 <span className="text-sm text-gray-400">1hr ago</span></div>
          <hr className="w-full border-gray-300 my-3" />
          <div className="text-2xl text-white">$2730 <span className="text-sm text-gray-400">1hr ago</span></div>
          <hr className="w-full border-gray-300 my-3" />
          <div className="text-2xl text-white">$2700 <span className="text-sm text-gray-400">1hr ago</span></div>
          <hr className="w-full border-gray-300 my-3" />
          <div className="text-2xl text-white">$2690 <span className="text-sm text-gray-400">1hr ago</span></div>
          <hr className="w-full border-gray-300 my-3" />
          <div className="text-2xl text-white">$2670 <span className="text-sm text-gray-400">1hr ago</span></div>
          <hr className="w-full border-gray-300 my-3 mb-32" />
        </div>

        {/* Bid Stats */}
        <div className="bid-stats flex justify-between w-full lg:w-3/4 text-2xl text-white mt-4">
          <div className="winning-bid text-left">
            Winning Bid: <span className="font-bold">$2750</span> USD
          </div>
          <div className="other-stats text-right">
            <div>
              Days Left to Bid: <span className="font-bold">3 Days, 12 Hours</span>
            </div>
            <div>
              Watching Now: <span className="font-bold">105</span> people
            </div>
          </div>
        </div>
      </div>

      {/* Bidding Form */}
      <div className="flex items-center justify-center bg-gray-100 py-48">
        <div className="bg-white rounded-lg px-8 py-6 shadow-lg">
          {/* Bidding Amount Section */}
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-gray-200 py-2 px-4 rounded-l-lg text-xl">$</button>
            <input
              type="number"
              className="py-2 px-4 bg-white border border-gray-300 text-xl text-center"
              defaultValue="2760"
              step="10"
            />
            {/* Up and Down Arrows */}
            <div className="flex flex-col">
              <button className="bg-gray-300 py-1 px-2 rounded-t-md text-lg">▲</button>
              <button className="bg-gray-300 py-1 px-2 rounded-b-md text-lg">▼</button>
            </div>
          </div>

          {/* Place Bid Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-semibold w-full">
            Place Bid
          </button>

          <p className="text-sm text-gray-500 mt-2 text-center">Bid Increment By: $10</p>
        </div>
      </div>

      {/* Condition Report and Image Thumbnails */}
      <section className="flex flex-col lg:flex-row items-center py-12 px-4 lg:px-20">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold text-black mb-6">Condition Report</h1>
          <p className="text-lg text-gray-700">
            In good condition, with very minor wear and abrasions to the mounting. Stamped PT950/AU750 for platinum and 18 karat gold. The trapezoid-shaped diamonds, weighing a total of approximately 1.00 carat, are approximately G-H color, VS clarity. Accompanied by GIA report no. 5234356297 dated July 30, 2024 stating that the diamond is Natural, Fancy Intense Yellow color, SI2 clarity.
          </p>
        </div>

        <div className="lg:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <img
            src={mainImage}
            alt="bracelet"
            className="object-cover w-[80%] h-auto rounded-lg shadow-lg mb-6" // Main image adjusted to 80%
          />

          {/* Thumbnail Images */}
          <div className="flex justify-center space-x-4 mt-5">
            <img
              src={imagepb1}
              alt="thumbnail 1"
              className={`w-[30%] h-auto object-cover rounded-lg cursor-pointer shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${mainImage === imagepb1 ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageClick(imagepb1)}
            />
            <img
              src={imagepb2}
              alt="thumbnail 2"
              className={`w-[15%] h-auto object-cover rounded-lg cursor-pointer shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${mainImage === imagepb2 ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageClick(imagepb2)}
            />
            <img
              src={imagepb3}
              alt="thumbnail 3"
              className={`w-[15%] h-auto object-cover rounded-lg cursor-pointer shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${mainImage === imagepb3 ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageClick(imagepb3)}
            />
            <img
              src={imagepb4}
              alt="thumbnail 4"
              className={`w-[15%] h-auto object-cover rounded-lg cursor-pointer shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ${mainImage === imagepb4 ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageClick(imagepb4)}
            />
          </div>
        </div>

      </section>



    </div>
  );
};

export default PlaceABid;
