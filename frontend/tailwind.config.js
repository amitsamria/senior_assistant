/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2dd4bf', // Teal-400: Bright, electric teal for dark mode
                primaryDark: '#14b8a6', // Teal-500
                secondary: '#94a3b8', // Slate-400: Light grey for subtitles
                accent: '#facc15', // Yellow-400: Bright accent
                background: '#020617', // Slate-950: Deep dark background
                surface: '#0f172a', // Slate-900: Slightly lighter for cards
                textMain: '#f1f5f9', // Slate-100: White text
                textMuted: '#64748b', // Slate-500
                success: '#34d399', // Emerald-400
                danger: '#f87171', // Red-400
                cream: '#1e293b', // Slate-800 (replacing cream with dark slate)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
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
                'soft': '0 10px 40px -10px rgba(0,0,0,0.5)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
