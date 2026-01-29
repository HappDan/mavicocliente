import { colors } from './src/config/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Usamos nombres claros para evitar pisar los colores base de Tailwind
        mavyco: {
          primary: colors.primary,
          dark: colors.primaryDark,
          secondary: colors.secondary, // Si lo tienes en tu config
        },
        // Al extender 'gray', asegúrate de no borrar los valores por defecto si los usas
        industry: {
          50: colors.gray50,
          100: colors.gray100,
          200: colors.gray200,
          300: colors.gray300,
          400: colors.gray400,
          500: colors.gray500,
          600: colors.gray600,
          700: colors.gray700,
          800: colors.gray800,
          900: colors.gray900,
        },
      },
      // Forzamos a que el espaciado sea consistente
      spacing: {
        'header-btn': '1.5rem', // Un valor personalizado para tus paddings
      }
    },
  },
  plugins: [],
}