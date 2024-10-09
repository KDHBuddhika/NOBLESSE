import React from 'react';

import imageAP1 from '../../assets/Auction-Strory-1.png';
import image2 from '../../assets/Auction story 2.png';

const AuctionPage = () => {
  return (
    <main className="bg-gray-100">
      
      {/* Section with background image */}
      <section id="auction" className="flex flex-col">
        <div
          className="relative w-full h-screen"
          style={{
            backgroundImage: `url(${imageAP1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-5xl font-bold">Vintage Rose Timepiece</h1>
            <div className="mt-4 text-xl">
              <p>New York | 30 August - 15 September 2024 | Starting from: $350</p>
            </div>

            <button className="mt-6 bg-gray-200 hover:bg-blue-600 text-blue-950 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Place A Bid
            </button>

            <div className="w-full flex justify-start px-16 md:px-20 lg:px-20 py-5 text-left">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Luxury Pocketwatch</h2>
                <p className="text-lg text-white">
                  The Vintage Rose Timepiece combines vintage elegance with modern craftsmanship. Featuring a rose gold case, floral-patterned dial, and Roman numeral markers, it's a sophisticated accessory. The genuine leather strap in blush or burgundy adds comfort and style. Powered by quartz movement and protected by a scratch-resistant sapphire crystal, this timeless watch exudes grace and refinement, perfect for any occasion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 h-full flex justify-end items-start pt-8 pr-4">
          <img src={imageAP1} alt="Auction Image" className="object-cover w-[80%] h-auto object-right-top" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-black mb-4">Eternal Craftsmanship</h2>
          <p className="description text-lg mb-4 max-w-3xl">
            The Colden Heirloom, a cherished pocket watch, symbolized time and legacy within the family. Passed down through generations, it was first gifted to Edward in the early 1900s as a symbol of pride and hope.
          </p>
          <p className="description text-lg mb-4 max-w-3xl">
            Edward's father, a skilled craftsman, had chosen the watch for its elegance and detailed engravings. The gold case gleamed as Edward wound it daily, a symbol of time connecting past and present. Over the years, it witnessed his milestones—his first job, wedding, and son's birth. Though it gained small marks, its beauty remained unchanged when Edward passed it to his child.
          </p>
        </div>
      </section>

      {/* Section 02 */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left px-3 md:px-32">
          <h1 className="text-black text-4xl font-bold mb-6">Unique Features</h1>
          <ul className="text-lg text-gray-700 list-disc pl-5">
            <li>Classic Gold-Toned Case</li>
            <li>Roman Numeral Dial</li>
            <li>Intricate Engravings</li>
            <li>Chain and T-Bar Attachment</li>
            <li>Sub-Seconds Dial</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2 h-full flex justify-start items-end pt-20 pr-10">
          <img src={image2} alt="Auction Image" className="object-cover w-[90%] h-auto object-right-top" />
        </div>
      </section>
    </main>
  );
};

export default AuctionPage;
