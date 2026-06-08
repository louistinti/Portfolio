import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DesignSystemPreview from './components/DesignSystemPreview.jsx'
import './styles/design-system.css' // tokens (variables) — doit être importé en premier
import './styles/index.css'

// Page de référence du design system accessible via ?ds (ex: http://localhost:5173/?ds)
const showDesignSystem = new URLSearchParams(window.location.search).has('ds')
const Root = showDesignSystem ? DesignSystemPreview : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
