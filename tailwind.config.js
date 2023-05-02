const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.tsx',
    './lib/**/*.tsx',
    './pages/**/*.tsx',
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
      keyframes: {
        disappear: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        }
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'disappear-1': 'disappear 1s 300ms linear infinite',
        'disappear-2': 'disappear 1s 500ms linear infinite',
        'disappear-3': 'disappear 1s 700ms linear infinite',
      },
    },
  },
};
