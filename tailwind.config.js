/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFD1DC',
        'pastel-blue': '#AEC6CF',
        'soft-pink': '#ffe4e1',
        'soft-white': '#fdfbf7',
        'valentine-pink': '#e91e8c',
        'valentine-rose': '#be185d',
      },
      fontFamily: {
        'fredoka': ['"Fredoka One"', 'cursive'],
      },
      boxShadow: {
        'valentine': '0 25px 50px -12px rgba(190, 24, 93, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)',
        'valentine-glow': '0 0 40px rgba(233, 30, 140, 0.2)',
      },
    },
  },
  plugins: [],
}
