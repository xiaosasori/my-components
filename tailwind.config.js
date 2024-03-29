const plugin = require('tailwindcss/plugin')
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default

const gridAutoFit = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'grid-auto-fit': (value) => ({
          gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
        }),
      },
      { values: theme('gridAutoFit') }
    )
  },
  {
    theme: {
      gridAutoFit: {
        xs: '12rem',
        sm: '14rem',
        md: '16rem',
        lg: '18rem',
        xl: '20rem',
      },
    },
  }
)

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        info: 'var(--info)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        primary: 'var(--primary)',
        charcoal: {
          DEFAULT: '#0F1115',
          50: '#A1AABD',
          100: '#939EB3',
          200: '#7885A1',
          300: '#616E8A',
          400: '#4E596F',
          500: '#3B4354',
          600: '#262B36',
          700: '#191C23',
          800: '#0F1115',
          900: '#080A0C',
        },
      },
      width: {
        'square-diagonal': `${(Math.sqrt(2) * 100).toFixed(2)}%`,
      },
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.75deg)',
          },
          '75%': {
            transform: 'rotate(-0.75deg)',
          },
        },
      },
    },
  },
  plugins: [
    gridAutoFit,
    /**
     * The `initial` variant modifies the selector to `html :where(.initial\:rounded)`,
     * reducing the specificity from `010` to `001`,
     * so that a regular class will "win".
     * https://twitter.com/adamwathan/status/1496663833980686338
     * Or we can use tailwind-merge instead
     */
    function ({ addVariant }) {
      addVariant('initial', 'html :where(&)')
    },
    // This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme('colors'))
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      )

      addBase({
        ':root': newVars,
      })
    },
  ],
}
