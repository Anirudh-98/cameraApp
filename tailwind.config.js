/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A148C',
        secondary: '#7B1FA2',
        accent: '#E1BEE7',
        background: '#F5F5F5',
        text: '#121212',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
} 