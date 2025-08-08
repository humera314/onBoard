/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // if using Pages Router
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  },
  plugins: [
  require('tailwind-scrollbar-hide')
]

}