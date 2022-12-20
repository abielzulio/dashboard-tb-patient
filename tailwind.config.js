/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#272836",
      white: "#fafcfe",
    },
    extend: {
      backgroundImage: {
        "white-linear-gradient":
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        "black-radial-gradient": "radial-gradient(#0e1720, #0e1b2c)",
      },
    },
  },
  plugins: [],
}
