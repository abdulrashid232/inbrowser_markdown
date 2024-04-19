/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: { colors: {
      // Grayscale colors
      'dark-gray': '#151619',
      'mid-gray-1': '#35393F',
      'mid-gray-2': '#5A6069',
      'light-gray-1': '#7C8187',
      'light-gray-2': '#C1C4CB',
      'white': '#ffffff',
  
      // Accent colors
      'orange': '#E46643',
      'red': '#F39765',
    },},
  },
  plugins: [],
}

