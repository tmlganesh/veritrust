/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f5f8',
          100: '#e3e6f0',
          200: '#c7cde0',
          300: '#a1abcd',
          400: '#7583b4',
          500: '#53629b',
          600: '#414d80',
          700: '#353f68',
          800: '#2e3556',
          900: '#21253c', // Sarvam dark navy
        },
        surface: '#F8FAFC',
        border: '#E5E7EB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'], // Sarvam uses a serif for main headings
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '400' }],
        'title': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'dropdown': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
      },
      borderRadius: {
        'card': '0.75rem',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
}
