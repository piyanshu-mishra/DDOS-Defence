module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'custom-black': '#000000',
        'custom-green': {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          800: '#166534',
        },
      },
    },
  },
  plugins: [],
}

