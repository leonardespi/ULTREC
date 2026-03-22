/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg':          '#040D1A',
        'surface':     '#071428',
        'surface-alt': '#0C1E35',
        'cyan':        '#00C8F0',
        'cyan-dark':   '#0A9EC7',
        'glow':        '#A8EFFF',
        'text-main':   '#FFFFFF',
        'text-muted':  '#9FB3C8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['Outfit', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(0, 200, 240, 0.25)',
      },
    },
  },
  plugins: [],
};
