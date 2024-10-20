module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: true,
    theme: {
        extend: {
            boxShadow: {
                'glassmorphism-shadow': '0 0 5px rgba(255, 255, 255, 0.2)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}