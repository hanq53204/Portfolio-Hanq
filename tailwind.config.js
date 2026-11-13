/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        secops: {
          bg: '#090D16',
          surface: '#111827',
          lightBg: '#F8FAFC',
          lightSurface: '#FFFFFF',
          emerald: '#10B981',
          emeraldDark: '#059669',
          cyan: '#06B6D4',
          cyanDark: '#0891B2',
        },
      },
      boxShadow: {
        'glow-emerald': '0 0 24px -4px rgba(16, 185, 129, 0.28)',
        'glow-cyan': '0 0 24px -4px rgba(6, 182, 212, 0.25)',
        'glass-dark': '0 8px 32px rgba(2, 6, 23, 0.45)',
        'glass-light': '0 8px 30px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};

