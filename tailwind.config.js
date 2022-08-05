/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  // mode: "jit",

  darkMode: false,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primaryDark: "#1a237e",
      transparent: "transparent",
      text: "#212121",
      textLight: "#757575",
      divider: "#BDBDBD",
      white: "#FFFFFF",
      primary: "#3F51B5",
      lightPrimary: "#C5CAE9",
      accentColor: "#FFC107",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ['"Roboto Slab"', "serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "login-image": "url('/public/media/bg-image.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
