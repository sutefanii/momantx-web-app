const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1100px'},
      'md': {'max': '770px'},
      'sm': {'max': '320px'}
    },
    container: {
      padding: '20px',
      center: true
    },
    extend: {
      fontFamily: {
        'Unbounded': ['Unbounded', 'sans-serif'],
        'Montserrat-Alternates': ['"Montserrat Alternates"', 'sans-serif']
      },
      left: {
        calc: 'calc(-50vw - 650px)'
      },
      colors: {
        darkBg: '#0F0404',
        darkCont: '#1B1717',
        light: '#FFFFFF',
        lightCont: '#F8F5F5',
        mainRed: '#8A0004',
        darkCard: '#292626',
        darkHover: '#4E1E20',
        buttonRed: '#650205',
        dotsBg: '#CAB0B0',
        greenTest: '#064B00',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
})
