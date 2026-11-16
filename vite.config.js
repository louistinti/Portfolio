import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base ABSOLUE : les pages pré-rendues vivent dans des sous-dossiers
  // (/work/<slug>/, /fr/…), un chemin relatif casserait les assets.
  base: '/',
  // Pré-rendu (vite build --ssr) : GSAP/Lenis embarqués dans le bundle Node,
  // leurs sous-modules ESM ne se chargent pas tels quels hors Vite.
  ssr: { noExternal: ['gsap', 'lenis'] },
  server: {
    // Respecte le port fourni par l'environnement (outil de preview/CI) sinon 5173.
    port: Number(process.env.PORT) || 5173,
    open: false, // pas d'ouverture auto d'onglet (le serveur/onglet est déjà ouvert)
  },
})
