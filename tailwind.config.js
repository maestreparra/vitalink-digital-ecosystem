/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      // VitaLink 7 Custom Breakpoints
      'xs': '0px',        // 320-374px: Extra Small (old phones)
      'sm': '375px',      // 375-424px: Small (standard phones)
      'md': '425px',      // 425-768px: Medium (large phones/tablets)
      'lg': '769px',      // 769-1024px: Large (tablets portrait)
      'xl': '1025px',     // 1025-1280px: Extra Large (tablets landscape)
      '2xl': '1281px',    // 1281-1536px: 2X Large (desktop)
      '3xl': '1537px',    // 1537px+: 3X Large (large desktop/4K)
    },
    extend: {
      colors: {
        navy: '#0A2F44',
        'brand-red': '#D42E2E',
        'brand-red-dark': '#B7151D',
        lavender: '#D4A5E8',
        whatsapp: '#0F7A3F',
        'light-gray': '#F4F3F5',
        'athens-gray': '#F5F9FC',
        'border-gray': '#C2C7CD',
        'placeholder-gray': '#6B7280',
        'text-primary': '#3D3D3A',
        'text-secondary': '#526575',
        'bali-hai': '#587286',
        'page-bg': '#FAF9FB',
      },
      fontFamily: {
        headline: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        headline: '-0.96px',
        label: '0.7px',
      },
      lineHeight: {
        'tight-headline': '1.1',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
