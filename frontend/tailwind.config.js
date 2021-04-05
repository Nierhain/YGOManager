const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      pink: colors.fuchsia,
      purple: colors.purple
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
