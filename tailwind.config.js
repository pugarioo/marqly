/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'primary-light': 'var(--primary-light)',
                secondary: 'var(--secondary)',
                'secondary-dark': 'var(--secondary-dark)',
            }
        },
    },
    plugins: [],
}
