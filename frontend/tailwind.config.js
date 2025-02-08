/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: "#001F54",
        secondary: "#4A90E2",
        background: "#C5DFDA",
        accent: "#2F7D32",
      },
      fontFamily:{
        ptsans: ['"PT Sans"', "sans-serif"], 
      }
    },
  },
  plugins: [],
}