/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#11142c',
          secondary: '#171b3b',
          light: '#292d66',
          royal: '#1D2049',
          navy: '#2E3375',
          dodger: '#343A83',
          cobalt: '#232A5C',
          yale: '#151937',
          ford: '#1C214A',
          sky: '#8DA2FB',
          electric: '#23295D',
          air: '#4047A1',
        },
        purple: {
          primary: '#6f6ff6',
          secondary: '#232658',
          light: '#9F9FF9',
        },
        yellow: {
          primary: '#E3A008',
        },
        green: {
          primary: '#31C48D',
          secondary: '#0E9F6E',
        },
        red: {
          primary: '#F98080',
          light: '#F05252',
        },
        gray: {
          primary: '#9ca3af',
          secondary: '#6B7280',
          light: '#F9FAFB',
          coin: '#D1D5DB',
        },
        orange: {
          primary: '#FF8A4C',
        },
        pink: {
          primary: '#F17EB8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

