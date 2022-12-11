const daisy = require('daisyui');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['business'],
  },

  plugins: [daisy],
};
