module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#F4C542',
        'primary-2': '#D4A838',
        'secondary': '#D32F2F',
        'secondary-2': '#B02828',
      }
    },
    fill: theme => ({
      'primary': theme('colors.primary')
    })
  },
  variants: {
    extend: {},
    opacity: ({ after }) => after(['disabled']),
    cursor: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
