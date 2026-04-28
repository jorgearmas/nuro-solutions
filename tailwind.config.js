export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Satoshi', 'sans-serif'],
        body:    ['Satoshi', 'sans-serif'],
      },
      colors: {
        bg:       '#F9F0E5',
        surface:  '#ffffff',
        'surface-2': '#f3eef8',
        border:   '#e2d9f3',
        accent:   '#7040AC',
        'accent-hover': '#3C4A95',
        'accent-2': '#F27700',
        'accent-2-hover': '#F55D28',
        text:     '#1a1a2e',
        muted:    '#6b6b8a',
        navy:     '#3C4A95',
      },
    },
  },
  plugins: [],
}