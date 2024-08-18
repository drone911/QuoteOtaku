const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/dist/esm/**/*.js',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      backgroundImage: {
        collage: "url('../public/background.jpg')"
      },
      colors: {
        'primary': colors.fuchsia
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

