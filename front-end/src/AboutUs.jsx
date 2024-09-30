import React from "react";
import styles from './output.css';

const AboutUs = () => {
  return (
    <main className="pt-12">
      {/* About Us Section */}
      <section id="aboutus" className="flex flex-col min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="w-full"
          style={{
            height: "60vh",
            backgroundImage: "url('assets/about us 1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex h-full justify-center items-center text-center text-white">
            <div>
              <h1>About Us</h1>
              <h3>Discover, Bid, and Win - Your Gateway to Exceptional Auction Experiences!</h3>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full flex justify-center items-center text-center px-4 md:px-20">
          <p className="description max-w-3xl">
            Established on May 15, 2015, Noblesse has become a premier auction house
            specializing in jewelry, watches, antiques, art, and celebrity items. Offering
            exclusive access to rare and luxurious collectibles, Noblesse connects buyers and
            sellers through an innovative, user-friendly, and secure online auction platform.
            With a network of specialists spanning 50 countries and 167 of the categories,
            Noblesse delivers a trusted, seamless experience for collectors and enthusiasts alike.
            In today's digital era, Noblesse brings the thrill of auctions and collaboration,
            bridging communities like never before.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left px-3 md:px-32">
          <h1 className="text-black text-4xl font-bold mb-6">Our Mission</h1>
          <p className="description text-lg mb-4 max-w-3xl">
            Where auctions transform into exciting journeys. Explore curated marketplace of jewelry,
            watches, antiques, art, and celebrity items, offering collectors and enthusiasts the
            thrill of competitive bidding and the chance to uncover rare and extraordinary treasures.
          </p>

          <hr className="w-full border-gray-300 my-6" />

          <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0">
              <h2 className="text-6xl font-bold text-red-600">20</h2>
            </div>

            <div className="ml-8 flex-grow">
              <p className="text-lg font-medium">Years on the market</p>
              <p className="text-base text-gray-700">
                Noblesse is Curated collections, thrilling auctions.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 h-full flex justify-center items-start pt-20 pr-10">
          <img
            src="assets/about us 2.png"
            alt="Auction Image"
            className="object-cover w-[80%] h-auto object-right-top"
          />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="w-full text-center py-12">
          <h2 className="text-3xl font-bold mb-8">The Team Behind the Business</h2>

          <div className="flex space-x-6 overflow-x-auto px-4 md:px-32">
            {/* Team Members */}
            {[
              { name: "Appohami", role: "Auction Coordinator", img: "assets/Screenshot 2024-09-22 022914.png" },
              { name: "Siriyalathaa", role: "Sales Representative", img: "assets/Screenshot 2024-09-22 022941.png" },
              { name: "Somapala", role: "Bid Spotter", img: "assets/Screenshot 2024-09-22 023005.png" },
              { name: "Asilin", role: "Marketing Specialist", img: "assets/Screenshot 2024-09-22 023211.png" },
              { name: "Sandun", role: "IT Support", img: "assets/team_member5.jpg" }
            ].map((member, index) => (
              <div key={index} className="min-w-[200px] bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-black text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
