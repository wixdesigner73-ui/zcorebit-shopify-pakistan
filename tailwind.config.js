/** @type {import('tailwindcss').Config} */
import cq from "@tailwindcss/container-queries";
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      containers: { sm: "640px", md: "768px", lg: "1024px" },
      colors: {
        background: 'var(--background)', 'secondary-background': 'var(--secondary-background)', foreground: 'var(--foreground)',
        heading: 'var(--heading)', paragraph: 'var(--paragraph)', card: 'var(--card)',
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)', hover: 'var(--primary-hover)' },
        tertiary: { DEFAULT: 'var(--tertiary)', hover: 'var(--tertiary-hover)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        border: 'var(--border)', input: 'var(--input)', destructive: 'var(--destructive)',
      },
      fontFamily: { sans: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' },
    },
  },
  plugins: [cq],
};
