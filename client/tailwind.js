module.exports = {
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'black': '#2B4964',
        'grey-darkest': '#626471',
        'grey-darker': '#878c98',
        'grey-dark': '#adb4c2',
        'grey': '#d5d9e3',
        'grey-light': '#dee1e8',
        'grey-lighter': '#eaebef',
        'grey-lightest': '#fcfcfc',
        'white': '#ffffff',
        'primary': '#2b79c1',
        'primary-dark': '#266299'
      },
    },
    tracking: {
      'tight': '-0.05em',
      'normal': '0',
      'wide': '0.03em',
      'wider': '0.06em',
      'widest': '0.1em',
    },
    padding: {
      'px': '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'hover', 'focus', 'disabled'],
    backgroundColor: ['even', 'odd'],
  },
  plugins: []
}
