/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'custom-border': '30% 70% 70% 30% / 30% 29% 71% 70%'
    },
    extend: {
      colors: {
        'custom-gris': '#e4e4e4', // Puedes nombrar tu color como desees
      },
    },
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
  ],
  


  daisyui: {
    themes: ["light"], 
  },
}
