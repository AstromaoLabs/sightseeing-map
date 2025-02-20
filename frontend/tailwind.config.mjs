/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#001F54",
        secondary: "#4A90E2",
        background: "#C5DFDA",
        accent: "#2F7D32",
      },
    },
  },
  plugins: [],
};
