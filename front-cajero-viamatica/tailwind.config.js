/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      monstserrat: ['Montserrat', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      primary: ['Open Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'primary': '#0087b3',
        'background': '#007195'
      },
    },
  },
  plugins: [],
}

