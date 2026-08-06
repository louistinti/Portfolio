import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DesignSystemPreview from './components/DesignSystemPreview.jsx'
import { LangProvider } from './hooks/useLang.jsx'
import './styles/design-system.css' // tokens (variables) — doit être importé en premier
import './styles/index.css'
import './styles/case-study.css' // page étude de cas (scopé .cs-page)
import './styles/motion.css' // couche motion (scopée .has-motion)

// Page de référence du design system accessible via ?ds (ex: http://localhost:5173/?ds)
const showDesignSystem = new URLSearchParams(window.location.search).has('ds')
const Root = showDesignSystem ? DesignSystemPreview : App

// Drapeau motion posé au boot (synchrone) : si le JS plante ensuite, le
// fallback CSS html:not(.has-motion) ne peut pas laisser du contenu invisible.
// La page design system (?ds) reste hors couche motion.
try {
  if (!showDesignSystem && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('has-motion')
  }
} catch {
  /* très vieux navigateur : comportement d'origine conservé */
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <Root />
    </LangProvider>
  </React.StrictMode>,
)
