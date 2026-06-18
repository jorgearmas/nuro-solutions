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
        bg:       '#ffffff',
        surface:  '#ffffff',
        'surface-2': '#f5f5f7',
        border:   '#e5e5ea',
        accent:   '#7040AC',
        'accent-hover': '#5a32a0',
        'accent-2': '#F27700',
        'accent-2-hover': '#F55D28',
        text:     '#0a0a0f',
        muted:    '#6b6b76',
        dark:     '#0a0a0f',
        'dark-surface': '#15151c',
      },
    },
  },
  plugins: [],
}