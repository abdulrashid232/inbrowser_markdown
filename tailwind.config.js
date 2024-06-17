/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: { 
      colors: {
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
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      Roboto: ['Roboto', 'sans-serif'],
      Roboto_slab: ['Roboto Slab','serif' ],
      Roboto_mono: ['"Roboto Mono"', 'monospace'],
    },
    ontWeight: {
      'slab-bold': '700',
      'mono-regular': '400',
    },
    letterSpacing: {
      'wide': '0.1em', 
      'extralight': '200',
    },
          fontSize: {
      'custom-14': '14px',
    },
    lineHeight: {
      'custom-24': '24px',
    },
  },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

