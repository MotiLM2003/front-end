module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1979BE',

        secondary: '#1D1E1D',
        tertiary: '#FDB035',
        'offwhite': '#F8F8F8',
        'paragraph': '#5A5D6B',
        'gray': '#8F93A3',
        'red': '#ED604F',

        shades: {
          100: '#EFEFEF',
          200: '#EAEAEA',
          300: '#1D1E1D',
        },
      },
    },
  },
  plugins: [],
};
