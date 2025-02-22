/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        muted: '#6c757d',
        foreground: '#2d3748', // Slate gray
        background: '#edf2f7', // Example muted color
      },
    },
  },
 
  plugins: [require("tailwindcss-animate")],
}

