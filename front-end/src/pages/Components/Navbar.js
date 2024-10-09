import React from "react";
import "./Components.css";
import logo from "../../assets/images/noblesselogo.png";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="h-24 w-full bg-white flex justify-between items-center">
			<Link to="/">
				<img src={logo} alt="Noblesse Logo" className="h-14 w-auto pl-6" />
			</Link>
			<div className="flex justify-evenly items-center w-1/2 pr-6 font-Montserrat font-semibold ">
				<Link to="/signin">
					<h2 className="">Sign In</h2>
				</Link>
				<h2 className="">|</h2>
				<Link to="/signup">
					<h2 className="">Sign Up</h2>
				</Link>
				<Link to="">
					<h2 className="">How It Works</h2>
				</Link>
				<Link to="">
					<h2 className="/about us">About Us</h2>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
