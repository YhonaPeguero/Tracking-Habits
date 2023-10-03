/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: () => ({
          'fondo-mobile': "url('./assets/bg-image.jpg')",
          'fondo-tablet': "url('./assets/bg-image.jpg')",
          'fondo-desktop': "url('./assets/bg-image.jpg')",
      })
    },
  },
  plugins: [],
}