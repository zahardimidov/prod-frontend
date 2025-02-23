/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                "background-primary": "rgba(20, 20, 22, 1)",
                "background-secondary": "rgba(38, 38, 38, 1)",
                "background-neutral": "rgba(82, 82, 82, 1)",
                "text-primary": "rgba(255, 255, 255, 1)",
                "text-secondary": "rgba(198, 198, 198, 1)",
                "blue-60": "rgba(15, 98, 254, 1)"
            },
        },
        fontFamily: {
            'roboto': ["Roboto Mono", 'monospace']
        },
        borderRadius: {
            'none': '0',
            'sm': '4px',
            'md': '8px',
            'lg': '16px',
            'full': '999px',
        }

    },
    plugins: [],
}

