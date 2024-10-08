import React from "react";
import image1 from '../../assets/about-us-1.png';  
import image2 from '../../assets/about-us-2.png';
import image3 from '../../assets/pr1.png';        
import image4 from '../../assets/pr2.png';         
import image5 from '../../assets/pr3.png';         
import image6 from '../../assets/pr4.png';        

const AboutUs = () => {
    return (
        <main className="pt-12 bg-red-600">

            {/* About Us Section */}
            <section id="aboutus" className="flex flex-col">
                <div
                    className="relative w-full"
                    style={{
                      height: "60vh",
                      backgroundImage: `url(${image1})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="text-white text-center">
                            <h1 className="text-5xl font-bold">About Us</h1>
                            <h3 className="mt-4 text-lg">Discover, Bid, and Win - Your Gateway to Exceptional Auction Experiences!</h3>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="py-12 px-4 md:px-20 text-center">
                    <p className="max-w-3xl mx-auto text-lg text-gray-700">
                        Established on May 15, 2015, Noblesse has become a premier auction house
                        specializing in jewelry, watches, antiques, art, and celebrity items. Offering
                        exclusive access to rare and luxurious collectibles, Noblesse connects buyers and
                        sellers through an innovative, user-friendly, and secure online auction platform.
                        With a network of specialists spanning 50 countries and 167 categories,
                        Noblesse delivers a trusted, seamless experience for collectors and enthusiasts alike.
                        In today's digital era, Noblesse brings the thrill of auctions and collaboration,
                        bridging communities like never before.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="flex flex-col lg:flex-row items-center py-12 px-4 lg:px-20">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-4xl font-bold text-black mb-6">Our Mission</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Where auctions transform into exciting journeys. Explore a curated marketplace of jewelry,
                        watches, antiques, art, and celebrity items, offering collectors and enthusiasts the
                        thrill of competitive bidding and the chance to uncover rare and extraordinary treasures.
                    </p>
                    <div className="flex items-center">
                        <h2 className="text-6xl font-bold text-red-600">20</h2>
                        <div className="ml-6">
                            <p className="text-lg font-medium">Years on the market</p>
                            <p className="text-base text-gray-700">Noblesse is Curated collections, thrilling auctions.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src={image2}
                        alt="Auction"
                        className="object-cover w-[80%] h-auto rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-gray-100 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">The Team Behind the Business</h2>

                    <div className="flex space-x-6 overflow-x-auto px-4 lg:px-20">
                        {[
                            { name: "Appohami", role: "Auction Coordinator", img: image3 },
                            { name: "Siriyalathaa", role: "Sales Representative", img: image4 },
                            { name: "Somapala", role: "Bid Spotter", img: image5 },
                            { name: "Asilin", role: "Marketing Specialist", img: image6 },
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
