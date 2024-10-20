import React from "react";
import "./Components.css";
import logo from "../../assets/images/noblesselogo.png";
import { Link } from "react-router-dom";

function Navbar() {
	// Get user ID from localStorage
	const userId = localStorage.getItem("userId");

	return (
		<div className="h-24 w-full bg-white flex justify-between items-center">
			<Link to="/">
				<img src={logo} alt="Noblesse Logo" className="h-14 w-auto pl-6" />
			</Link>
			<div className="flex justify-evenly items-center w-1/2 pr-6 font-Montserrat font-semibold ">
				{userId ? (
					// Links to show when user is logged in
					<>
						<Link to="/auctionList">
							<h2 className="">Auction</h2>
						</Link>
						<Link to="/watchlist">
							<h2 className="">Watch List</h2>
						</Link>
						<Link to="/how-it-works">
							<h2 className="">How It Works</h2>
						</Link>
						<Link to="/about-us">
							<h2 className="">About Us</h2>
						</Link>
						<Link to="/yourInfo">
							<h2 className="">
								<img
									src={require('../../assets/images/user.png')}
									alt="Profile"
									className="h-10 w-10 rounded-full"
								/>
							</h2>
						</Link>
					</>
				) : (
					// Links to show when user is not logged in
					<>
						<Link to="/signin">
							<h2 className="">Sign In</h2>
						</Link>
						<h2 className="">|</h2>
						<Link to="/signup">
							<h2 className="">Sign Up</h2>
						</Link>
						<Link to="/how-it-works">
							<h2 className="">How It Works</h2>
						</Link>
						<Link to="/about-us">
							<h2 className="">About Us</h2>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
