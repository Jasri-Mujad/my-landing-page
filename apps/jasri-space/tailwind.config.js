/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0d7ff2',
                'surface-dark': '#1c252e',
                'border-dark': 'rgba(255, 255, 255, 0.08)',
                'background-light': '#f5f7f8',
                'background-dark': '#101922',
                'card-dark': '#1c252e',
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '1rem',
                lg: '2rem',
                xl: '3rem',
                full: '9999px',
            },
        },
    },
    plugins: [],
}
