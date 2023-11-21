/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3D5EC2',
        secondary: '#C1CCEB',
        accent: '#0F46EB',
        text: '#050810',
        background: '#E4E9F6',
      }
    },
  },
  plugins: [],
}

