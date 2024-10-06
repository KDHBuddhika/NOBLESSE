/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

=======
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "340px",
      md: "540px",
      lg: "768px",
      xl: "1180px"
    },
    extend: {},
    fontFamily: {
      Lobster: ["Lobster", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"]
    },
    container:{
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px"
      }
    }

  },
  plugins: [],
}
>>>>>>> main-prasad
