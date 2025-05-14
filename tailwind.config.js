/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#112240',
          DEFAULT: '#0a192f',
          dark: '#020c1b',
        },
        slate: {
          light: '#ccd6f6',
          DEFAULT: '#8892b0',
          dark: '#495670',
        },
        teal: {
          DEFAULT: '#64ffda',
          muted: 'rgba(100, 255, 218, 0.1)',
          bright: 'rgba(100, 255, 218, 0.8)',
        },
      },
    },
  },
  plugins: [],
}
