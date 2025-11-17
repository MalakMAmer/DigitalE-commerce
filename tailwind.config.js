/** @type {import('tailwindcss').Config} */
export default {
  content:['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'sans-serif'], //default font
      },
      colors: {
        purpleDark: '#300c66',
        purpleLight: '#6519ff',
        greenNeon: '#c0f45a',
      },
    },
  },
  
  plugins: [],
}

