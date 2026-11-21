import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Design tokens — "Concrete & Signal"
 * paper/concrete neutrals, near-black ink, safety-orange signal.
 * The legacy token names (ink, muted, signal, brand-*, accent) are kept so the
 * internal Site Work pages inherit the new look without being rewritten.
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
                sans: ['Geist', ...defaultTheme.fontFamily.sans],
                display: ['Archivo', ...defaultTheme.fontFamily.sans],
                mono: ['"Geist Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                ink: '#0d0e0c',
                muted: '#5a5c55',
                signal: '#b83509',
                night: {
                    DEFAULT: '#0b0c0a',
                    800: '#141512',
                    700: '#1d1f1b',
                },
                paper: {
                    DEFAULT: '#f1eee7',
                    2: '#e8e4da',
                },
                brand: {
                    600: '#ece8df',
                    700: '#e2ddd1',
                    800: '#e8e4da',
                    900: '#faf8f4',
                    950: '#f1eee7',
                },
                accent: {
                    DEFAULT: '#ff5a1f',
                    light: '#ff7a47',
                    dark: '#d9440f',
                },
            },
            transitionTimingFunction: {
                expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};
