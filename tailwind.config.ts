// Example `tailwind.config.js` file
const exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      background: {
        'primary': '#FFFFFF',
      },
      colors: {
        'green-gradient': '#A4E9A9',
        'blue-gradient': '#BDE4FB',
        'red-gradient': '#FFB8B9',
        'purple-gradient': '#DEBDFF',
        'dark': '#222029',
      },
      border: {
        1: '1px',
      },
    },
  },
}

export default exports;