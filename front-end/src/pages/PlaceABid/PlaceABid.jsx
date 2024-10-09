import React from 'react';
import imagepb from '../../assets/bracelet-1.jpg';


const PlaceABid = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imagepb})` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Main Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-md">
            Emerald & Diamond Bracelet
          </h1>
          <h3 className="text-xl lg:text-2xl mt-4 text-shadow-md">
            Make Your Bid For Elegant Vintage Jewelry With Delicate Design
          </h3>
          <button className="mt-6 bg-transparent border border-white hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            Add to Watch
          </button>
        </div>
      </div>


      <div className="bg-[#0e151f] py-8 lg:py-16 px-4 lg:px-32 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-shadow-md">
          Recent Bids
        </h2>
        <div className="recent-bids text-center">

          <div className="text-2xl text-white">
            $2750 <span className="text-sm text-gray-400">1hr ago</span>
          </div>
          <hr className="w-52 border-gray-300 my-6" />
  

          <div className="text-2xl text-white">
            $2730 <span className="text-sm text-gray-400">1hr ago</span>
          </div>
          <hr className="w-52 border-gray-300 my-6" />

          <div className="text-2xl text-white">
            $2700 <span className="text-sm text-gray-400">1hr ago</span>
          </div>
          <hr className="w-52 border-gray-300 my-6" />

          <div className="text-2xl text-white">
            $2690 <span className="text-sm text-gray-400">1hr ago</span>
          </div>
          <hr className="w-52 border-gray-300 my-6" />

          <div className="text-2xl text-white">
            $2670 <span className="text-sm text-gray-400">1hr ago</span>
          </div>
          <hr className="w-52 border-gray-300 my-6 mb-32" />

        </div>

        {/* Bid Stats */}
        <div className="bid-stats flex justify-between text-2xl text-white mt-4">
          <div className="winning-bid">
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
      <div className="half-bg">
        <div className="form-container bg-gray-100 rounded-lg px-8 py-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 py-2 px-4 rounded-l-lg text-xl">$</button>
            <input
              type="number"
              className="py-2 px-4 bg-white border border-gray-300 rounded-r-lg text-xl"
              defaultValue="2760"
            />
          </div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-semibold">
            Place Bid
          </button>
          <p className="text-sm text-gray-500 mt-2">Bid Increment By: $10</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceABid;
