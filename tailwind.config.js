/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fcfaf8',
                    100: '#f6efdf',
                    500: '#C5A880', // Champagne Gold
                    600: '#A88D66', // Darker Gold for hover
                    900: '#4A3B28',
                },
                dark: '#1a1a1a', // Deep elegant black/charcoal
                light: '#FAF9F6', // Warm off-white / Cream
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slow-zoom': 'slowZoom 10s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slowZoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                }
            }
        },
    },
    plugins: [],
}
