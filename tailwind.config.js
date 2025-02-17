/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32a3f4',
        lightPrimary: '#32A3F4',
      },
      classes: {
        shaDownElement: {
          elevation: 3,
          shadowColor: 'black',
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.5,
        },
      },
    },
  },
  plugins: ['nativewind/babel'],
};
