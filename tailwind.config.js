import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Design tokens — taken from the Civicon Nexus logo (blue + orange).
 * Legacy token names (ink, muted, signal, brand-*, accent) are kept so the
 * internal Site Work pages inherit the look without being rewritten.
 */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.tsx',
        './resources/**/*.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Barlow', ...defaultTheme.fontFamily.sans],
                display: ['"Barlow Semi Condensed"', 'Barlow', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                ink: '#14202e',
                muted: '#566170',
                signal: '#b4530f',
                blue: {
                    DEFAULT: '#1f6fd1',
                    dark: '#1758a8',
                    tint: '#e8f0fb',
                },
                night: {
                    DEFAULT: '#14202e',
                    800: '#1b2a3c',
                    700: '#24364b',
                },
                paper: {
                    DEFAULT: '#f7f5f0',
                    2: '#efece5',
                },
                brand: {
                    600: '#f2efe9',
                    700: '#e6e2d9',
                    800: '#efece5',
                    900: '#ffffff',
                    950: '#f7f5f0',
                },
                accent: {
                    DEFAULT: '#f59e1b',
                    light: '#f8b44a',
                    dark: '#d9850a',
                },
            },
        },
    },
    plugins: [],
};
