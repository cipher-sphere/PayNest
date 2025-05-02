/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 2s ease-out',
          'fade-up': 'fadeUp 1.5s ease-out',
          'stars': 'moveStars 60s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          fadeUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          moveStars: {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '1000px 1000px' },
          },
        },
      },
    },
    plugins: [],
  };
  