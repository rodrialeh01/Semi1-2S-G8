/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/*.{js,jsx}',
    "./src/**/*.{js,jsx,ts,tsx}",
  
  ],
  theme: {
    extend: { colors: {
      darkBlue: '#141B41',
      azul: "#306BAC",
      celeste: "#6F9CEB",
      celeste_claro: "#98B9F2",
      lila: '#918EF4',
      blackTest: '#121212'
    }}
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

