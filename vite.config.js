import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relative pour un déploiement facile (GitHub Pages, Netlify, Vercel…)
  base: './',
  server: {
    port: 5173,
    open: true, // ouvre automatiquement le navigateur au démarrage
  },
})
