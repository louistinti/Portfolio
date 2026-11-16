/* eslint-disable react-refresh/only-export-components -- module Node, jamais en Fast Refresh */
// Entrée de PRÉ-RENDU (Node, au build) : produit le HTML de chaque page.
// Utilisée par scripts/prerender.mjs via `vite build --ssr`. Jamais chargée
// dans le navigateur.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { LangProvider, bundles } from './hooks/useLang.jsx'
import { RouteProvider, LANGS, pathFor } from './hooks/useRoute.js'

export { bundles, LANGS, pathFor }
export { SITE_URL, abs, plain, pageMeta, headTags } from './seo.js'

export function render(path) {
  return renderToString(
    <RouteProvider initialPath={path}>
      <LangProvider>
        <App />
      </LangProvider>
    </RouteProvider>,
  )
}
