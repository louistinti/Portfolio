import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relative pour un déploiement facile (GitHub Pages, Netlify, Vercel…)
  base: './',
  server: {
    // Respecte le port fourni par l'environnement (outil de preview/CI) sinon 5173.
    port: Number(process.env.PORT) || 5173,
    open: false, // pas d'ouverture auto d'onglet (le serveur/onglet est déjà ouvert)
  },
})
