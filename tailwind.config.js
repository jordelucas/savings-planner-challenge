const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Epilogue', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        aquamarine: '#09B682',
        black: {
          700: '#343A3A',
          900: '#0A0D0D',
        },
        gray: {
          200: '#FCFCFC',
          300: '#ECECEC',
          700: '#8C979F',
        }
      },
      boxShadow: {
        '3xl': '0px 0px 20px rgba(10, 13, 13, 0.12)',
      }
    },
  },
  plugins: [],
}
