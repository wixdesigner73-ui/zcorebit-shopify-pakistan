/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', 'secondary-background': 'var(--secondary-background)', foreground: 'var(--foreground)',
        heading: 'var(--heading)', paragraph: 'var(--paragraph)', card: 'var(--card)',
        primary: { DEFAULT: 'var(--primary)', foreground: '#fff', hover: 'var(--primary-hover)' },
        tertiary: { DEFAULT: 'var(--tertiary)', hover: 'var(--tertiary-hover)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        border: 'var(--border)', input: 'var(--input)', destructive: 'var(--destructive)',
      },
      fontFamily: { sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' },
    },
  },
  plugins: [],
};
