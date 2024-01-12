/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        screens: {
            'laptop': '1024px',
            'mobile': '480px',

        },
      backgroundColor: {
        'box-color' : '#ced4da',
        'google-btn' : "#fa5252",
        'google-btn-hover': '#ff8787',
        'surround' : '#d2bab0',
        'surround-hover' :'#eaddd7'
      }
    },
  },
  plugins: [],
}
