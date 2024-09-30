import React from "react";
import styles from './output.css';


const HowItWork = () => {
  return (
    <main className="pt-12">
      <section id="howitwork" className="flex flex-col min-h-screen">

        {/* Background Image Section */}
        <div className="relative w-full" style={{ height: '100vh' }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('assets/How it works.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)',
              WebkitFilter: 'blur(8px)'
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Text Content */}
          <div className="relative z-10 flex h-full justify-center items-center text-center text-white">
            <div>
              <h1 className="text-blue-700 text-4xl font-bold">How Noblesse Auctions Work</h1>
              <h3 className="text-blue-700 text-lg mt-4">
                The Noblesse platform offers a secure and discreet environment for buyers worldwide to bid on luxury items, fine art, antiques, and high-end collectibles.
              </h3>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full flex justify-center my-8">
          <iframe
            width="700"
            height="400"
            src="https://www.youtube.com/embed/your-video-id"
            title="Noblesse Auction Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Sealed Auctions Section */}
        <div className="w-full px-6 md:px-16 lg:px-32 py-8">
          <h2 className="text-3xl font-bold text-black mb-4">Noblesse Sealed Auctions</h2>
          <p className="text-lg text-gray-700">
            To participate, select the amount you wish to bid and click “Place Bid”. If your bid exceeds the current high bid, you will become the leading bidder. Otherwise, your bid ranking will be displayed.
            If your bid ranks third or lower, your position will be shown beneath the leaderboard.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            You may choose to raise your bid anytime while the auction remains open!
          </p>
          <p className="text-lg text-gray-700 mt-4">
            In a Noblesse bid auction, only your submitted bid will be visible — not the current high or winning bid (unless you hold the highest bid). The difference between bidder rankings will not be disclosed.
          </p>
        </div>

        {/* Outbid Notifications Section */}
        <div className="w-full px-6 md:px-16 lg:px-32 py-8">
          <h2 className="text-3xl font-bold text-black mb-4">Outbid Notifications</h2>
          <p className="text-lg text-gray-700">
            If you are the high bidder and another bidder places a higher bid, you will be notified via the email address associated with your Noblesse account preferences. The lot page will also reflect this change in ranking, indicating that you have been outbid.
          </p>
        </div>

        {/* Anti-Snipe Feature Section */}
        <div className="w-full px-6 md:px-16 lg:px-32 py-8">
          <h2 className="text-3xl font-bold text-black mb-4">Anti-Snipe Feature</h2>
          <p className="text-lg text-gray-700">
            If a bid is placed within the final 90 seconds that ranks the bidder in the top 3, or if one of the top three bidders places a bid, the auction timer will reset to 90 seconds. This prevents last-second high bids and provides the new bidder time to raise their bid if necessary.
          </p>
        </div>

        {/* Lots with Reserve Section */}
        <div className="w-full px-6 md:px-16 lg:px-32 py-8">
          <h2 className="text-3xl font-bold text-black mb-4">Lots with Reserve</h2>
          <p className="text-lg text-gray-700">
            Certain lots may have a reserve price, the minimum amount a seller will accept. The reserve price remains confidential, and bids must meet or exceed it to win the lot. If a bid meets the reserve, this will be noted. However, if you are the highest bidder but your bid does not meet the reserve, the lot will not sell.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HowItWork;
