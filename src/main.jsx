import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DesignSystemPreview from './components/DesignSystemPreview.jsx'
import { LangProvider } from './hooks/useLang.jsx'
import { RouteProvider } from './hooks/useRoute.js'
import './styles/design-system.css' // tokens (variables), doit être importé en premier
import './styles/index.css'
import './styles/case-study.css' // page étude de cas (scopé .cs-page)
import './styles/motion.css' // couche motion (scopée .has-motion)

// Le drapeau .has-motion et les redirections (anciens liens #/slug, langue
// mémorisée) sont posés par le script inline d'index.html, avant le premier
// paint : le HTML pré-rendu ne doit pas apparaître puis disparaître.

// Page de référence du design system accessible via ?ds (ex: http://localhost:5173/?ds)
const showDesignSystem = new URLSearchParams(window.location.search).has('ds')

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <RouteProvider>
      <LangProvider>{showDesignSystem ? <DesignSystemPreview /> : <App />}</LangProvider>
    </RouteProvider>
  </React.StrictMode>
)

// En prod, chaque page arrive pré-rendue (scripts/prerender.mjs) : React
// « hydrate » ce HTML au lieu de le reconstruire. En dev (vite), #root est
// vide : rendu classique.
if (container.firstElementChild && !showDesignSystem) {
  ReactDOM.hydrateRoot(container, tree)
} else {
  container.textContent = ''
  ReactDOM.createRoot(container).render(tree)
}
window.__appReady = true
