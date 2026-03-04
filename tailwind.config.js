/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // La police Allura pour le côté élégant et artisanal des titres
        allura: ['Allura', 'cursive'],
        // Roboto pour la clarté des textes et des prix
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Couleurs inspirées des tissus Batik et Wax de tes photos
        'ankara-gold': '#D4AF37',   // Rappelle le jaune de l'ensemble
        'ankara-pink': '#E11D48',   // Rappelle le rose de l'ensemble culotte
        'ankara-green': '#166534',  // Rappelle le vert profond du tissu Adirè
        'ankara-dark': '#1A1A1A',   // Pour un texte bien contrasté
        'ankara-bg': '#FAFAF9',     // Fond blanc cassé/crème pour faire ressortir les couleurs
      },
    },
  },
  plugins: [],
};