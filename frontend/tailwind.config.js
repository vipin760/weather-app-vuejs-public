/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "weather-primary":"#133955",
        "weather-secondary":"#00205b",
      },
      container:{
        padding:"2rem",
        center:true
      },
      screens:{
        sm:"640px",
        md:"768px"
      }
    },
  },
  plugins: [],
}

