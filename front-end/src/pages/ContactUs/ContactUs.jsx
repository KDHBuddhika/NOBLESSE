import React, { useState } from "react";
import image1 from '../../assets/images/C9AA9089-398E-4702-9C96-54CD007B27CF.jpg';
import './ContactUs.css';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // mekata backend ek connect krnn oni poddk blpn

        window.location.href = `mailto:support@noblesse.com?subject=Contact Us&body=${message}`;
    };

    return (
        <main className="  pt-12 flex flex-col items-center justify-center min-h-screen bg-gray-100 .contactwid">
            <section id="contactus" className="w-full flex flex-col items-center">
                <div
                    className="relative w-full mb-12" 
                    style={{
                        height: "40vh",
                        backgroundImage: `url(${image1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="text-white text-center">
                            <h1 className="text-4xl font-bold">Contact Us</h1>
                            <h3 className="mt-6 text-lg">
                                We value your feedback and inquiries! Whether you have questions about bidding, need assistance with your account, or want to learn more about how our auction process works, our support team is here to help.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center w-full px-16 mt-16 mb-12">
                <form
                    onSubmit={handleSubmit}
                    className="bg-purple-100 rounded-lg shadow-md w-full"
                    style={{ backgroundColor: "#F0EAFB" }}
                >
                    <h2 className="text-3xl font-bold text-center text-blue-950 mb-6 pt-8">Contact Us</h2>

                   
                    <div className="mb-4 px-16">

                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>

                  
                    <div className="mb-4 px-16">

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows="5"
                            placeholder="Enter your message"
                        />
                    </div>

                   
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-white text-blue-950 font-bold py-5 px-16 rounded-md mb-6 "
                        >
                            Connect With Us
                        </button>
                    </div>


                </form>
            </section>

          {/* mekata icon tika watenn oni bm  */}
            <section className="flex justify-center items-center space-x-12 mt-8">
                <div className="text-center">
                    <img src="/path/to/email-icon.svg" alt="Email" className="mx-auto mb-2" />
                    <p>support@noblesse.com</p>
                </div>
                <div className="text-center">
                    <img src="/path/to/location-icon.svg" alt="Location" className="mx-auto mb-2" />
                    <p>Noblesse Auctions, 123 Auction Lane, Colombo 07, Sri Lanka</p>
                </div>
                <div className="text-center">
                    <img src="/path/to/phone-icon.svg" alt="Phone" className="mx-auto mb-2" />
                    <p>+94 1234567890</p>
                </div>
            </section>
        </main>
    );
};

export default ContactUs;
