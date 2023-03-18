const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"American Typewriter"', ...fontFamily.serif],
        sans: ['Mulish', ...fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
};
