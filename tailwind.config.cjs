/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      '*':  {
        '@apply box-border': {},
      },
    },
  },
  plugins: [],
}
