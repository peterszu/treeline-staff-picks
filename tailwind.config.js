/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color scale (replacing indigo)
        primary: {
          50: '#FFF7E6',
          100: '#FFECC6',
          200: '#FFD88A',
          300: '#FFC14D',
          400: '#FAA31A',  // Your logo color
          500: '#E68A00',
          600: '#CC7700',
          700: '#B36600',
          800: '#995500',
          900: '#804700'
        },
        // Custom colors
        'nav-gray': '#424242',
        'brand-white': '#FFFFFF'
      }
    },
  },
  plugins: [],
}