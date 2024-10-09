import React from "react";
import { Link } from "react-router-dom";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaArrowRight,
} from "react-icons/fa";

import "./Components.css";
import logo from "../../assets/images/noblesselogo.png";
const Footer = () => {
	return (
		<div className="h-80 w-full p-14 border-t-2 border-slate-950 flex justify-evenly items-center font-Montserrat font-medium text-lg">
			<div className="h-full w-1/3">
				<Link to="">
					<p className="mb-2 text-primaryBlue">Become A Seller</p>
				</Link>
				<Link to="/">
					<p className="mb-2 text-primaryBlue">Terms And Conditions</p>
				</Link>
				<Link to="/Privacy&Policy">
					<p className="mb-24 text-primaryBlue">Privacy Policy</p>
				</Link>
				<p className="text-sm text-primaryBlue">@2024 Noblesse Auction</p>
			</div>
			<div className="h-full w-1/3 flex justify-center items-end">
				<Link to="/">
					<img src={logo} alt="logo" className="h-32" />
				</Link>
			</div>
			<div className="flex flex-col h-full w-1/3 ">
				<Link to="">
					<p className="mb-4 text-primaryBlue">Connect With Us</p>
				</Link>
				<p className="text-sm mb-4 text-primaryBlue">
					Subscribe for weekly updates on new deals!
				</p>
				<div className="flex mb-4 w-full">
					<input
						type="text"
						placeholder="Your Email Address"
						className="mr-2 text-sm p-2 bg-white hover:bg-white outline-none border border-primaryBlue text-primaryBlue w-3/5"
					/>
					<button className="border-primaryBlue w-10 active:bg-slate-400 flex justify-center items-center">
						<FaArrowRight className="text-primaryBlue" size={20} />
					</button>
				</div>
				<div className="flex justify-between items-center w-3/5 h-10">
					<FaFacebook className="text-primaryBlue" size={30} />
					<FaTwitter className="text-primaryBlue" size={30} />
					<FaInstagram className="text-primaryBlue" size={30} />
					<FaLinkedin className="text-primaryBlue" size={30} />
				</div>
			</div>
		</div>
	);
};

export default Footer;
