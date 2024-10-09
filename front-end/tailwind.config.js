/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		screens: {
			sm: "340px",
			md: "540px",
			lg: "768px",
			xl: "1180px",
		},
		extend: {
			colors: {
				primaryBlue: "#0C0F50",
				primaryWhite: "#F9F7F0",
				primaryBlack: "#03041A",
			},
		},
		fontFamily: {
			Lobster: ["Lobster", "sans-serif"],
			Roboto: ["Roboto", "sans-serif"],
			Montserrat: ["Montserrat", "sans-serif"],
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "12px",
				md: "32px",
			},
		},
	},
	plugins: [],
};
