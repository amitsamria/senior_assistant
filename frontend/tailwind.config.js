/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0d9488', // Teal-600: Calming, clear, high contrast against white
                primaryDark: '#0f766e', // Teal-700 for hover states
                secondary: '#475569', // Slate-600: Soft dark text
                accent: '#f59e0b', // Amber-500: Warm accent
                background: '#fcfbf9', // Warm off-white
                surface: '#ffffff', // Pure white for cards
                textMain: '#1e293b', // Slate-800: High contrast text
                textMuted: '#64748b', // Slate-500: Secondary text
                success: '#16a34a', // Green-600
                danger: '#dc2626', // Red-600
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            fontSize: {
                'base': '1.125rem', // 18px
                'lg': '1.25rem', // 20px
                'xl': '1.5rem', // 24px
                '2xl': '1.875rem', // 30px
                '3xl': '2.25rem', // 36px
                '4xl': '3rem', // 48px
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            }
        },
    },
    plugins: [],
}
