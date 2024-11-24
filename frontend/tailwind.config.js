/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#007c30',
          secondary: '#00501f',
        }
      }
    },
  },
  plugins: [],
}

