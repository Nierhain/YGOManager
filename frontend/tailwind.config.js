const colors = require('tailwindcss/colors')
const dracula = require('tailwind-dracula/colors')
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-dracula')(),
  ],
};
