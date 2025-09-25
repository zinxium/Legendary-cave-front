/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'byzantium': {
          DEFAULT: '#820263',
          100: '#1a0014',
          200: '#340127',
          300: '#4e013b',
          400: '#68024f',
          500: '#820263',
          600: '#cd039a',
          700: '#fc20c5',
          800: '#fd6ad8',
          900: '#feb5ec'
        },
        'dogwood_rose': {
          DEFAULT: '#d90368',
          100: '#2b0115',
          200: '#560129',
          300: '#82023e',
          400: '#ad0352',
          500: '#d90368',
          600: '#fc1a83',
          700: '#fc53a2',
          800: '#fd8cc1',
          900: '#fec6e0'
        },
        'timberwolf': {
          DEFAULT: '#eadeda',
          100: '#3a2721',
          200: '#744e41',
          300: '#a97867',
          400: '#caaba1',
          500: '#eadeda',
          600: '#efe5e2',
          700: '#f3ece9',
          800: '#f7f2f1',
          900: '#fbf9f8'
        },
        'space_cadet': {
          DEFAULT: '#2e294e',
          100: '#09080f',
          200: '#12101f',
          300: '#1b182e',
          400: '#24203d',
          500: '#2e294e',
          600: '#4c4480',
          700: '#6e65ae',
          800: '#9f98c9',
          900: '#cfcce4'
        },
        'gold': {
          DEFAULT: '#ffd400',
          100: '#332b00',
          200: '#665500',
          300: '#998000',
          400: '#ccaa00',
          500: '#ffd400',
          600: '#ffdd33',
          700: '#ffe666',
          800: '#ffee99',
          900: '#fff6cc'
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
    // Vous pouvez ajouter des plugins Tailwind ici si nécessaire
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}