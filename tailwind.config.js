/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'bright_amber': {
          DEFAULT: '#ffcc00',
          100: '#332900',
          200: '#665200',
          300: '#997a00',
          400: '#cca300',
          500: '#ffcc00',
          600: '#ffd633',
          700: '#ffe066',
          800: '#ffeb99',
          900: '#fff5cc'
        },
        'mustard': {
          DEFAULT: '#ffde5c',
          100: '#453700',
          200: '#8b6f00',
          300: '#d0a600',
          400: '#ffd016',
          500: '#ffde5c',
          600: '#ffe57c',
          700: '#ffeb9d',
          800: '#fff2be',
          900: '#fff8de'
        },
        'light_gold': {
          DEFAULT: '#ffeb99',
          100: '#524100',
          200: '#a38300',
          300: '#f5c400',
          400: '#ffda47',
          500: '#ffeb99',
          600: '#ffefad',
          700: '#fff3c2',
          800: '#fff7d6',
          900: '#fffbeb'
        },
        'bright_lavender': {
          DEFAULT: '#a486d5',
          100: '#1f1233',
          200: '#3e2467',
          300: '#5c369a',
          400: '#7e53c3',
          500: '#a486d5',
          600: '#b69edd',
          700: '#c9b7e6',
          800: '#dbcfee',
          900: '#ede7f7'
        },
        'indigo_velvet': {
          DEFAULT: '#54318c',
          100: '#110a1c',
          200: '#221438',
          300: '#321d54',
          400: '#432770',
          500: '#54318c',
          600: '#7042bb',
          700: '#9470cd',
          800: '#b8a0de',
          900: '#dbcfee'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}