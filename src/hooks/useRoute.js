import { createContext, createElement, useContext, useEffect, useState } from 'react'
import { caseStudies } from '../data/content.js'

// ──────────────────────────────────────────────────────────────
//  Routeur minimal par CHEMIN, zéro dépendance.
//    /                    → portfolio (EN)
//    /work/<slug>/        → étude de cas (EN)
//    /fr/ , /fr/work/<slug>/ → mêmes pages en français
//  Chaque URL existe en vrai fichier HTML pré-rendu au build
//  (scripts/prerender.mjs) : Google et les IA lisent le contenu sans JS.
//  Les ancres (#work, #about…) restent des ancres même-page.
//  Les anciens liens `#/<slug>` sont redirigés par le script inline
//  d'index.html, avant tout rendu.
// ──────────────────────────────────────────────────────────────

export const LANGS = ['en', 'fr']

// Chemin canonique d'une page. slug absent ou 'home' = accueil.
export function pathFor(lang, slug) {
  const prefix = lang === 'fr' ? '/fr' : ''
  return slug && slug !== 'home' ? `${prefix}/work/${slug}/` : `${prefix}/`
}

// Chemin → { lang, slug }. Un slug inconnu retombe sur l'accueil.
export function parsePath(pathname = '/') {
  const parts = pathname.split('/').filter(Boolean)
  let lang = 'en'
  if (parts[0] === 'fr') {
    lang = 'fr'
    parts.shift()
  }
  const slug = parts[0] === 'work' && caseStudies[parts[1]] ? parts[1] : 'home'
  return { lang, slug }
}

const RouteContext = createContext(null)
const readLocation = () => parsePath(window.location.pathname)

// `initialPath` : fourni au pré-rendu (Node, pas de window). Côté
// navigateur, on lit l'URL courante.
export function RouteProvider({ initialPath, children }) {
  const [route, setRoute] = useState(() =>
    initialPath !== undefined ? parsePath(initialPath) : readLocation(),
  )

  useEffect(() => {
    const sync = () => {
      const next = readLocation()
      // Même page (simple ancre #about…) : on garde l'objet, pas de re-render.
      setRoute((cur) => (cur.lang === next.lang && cur.slug === next.slug ? cur : next))
    }
    window.addEventListener('popstate', sync)
    window.addEventListener('routechange', sync)

    // Liens internes (<a href="/work/…">) : navigation sans rechargement, pour
    // garder le rideau de transition. Clics modifiés, nouvel onglet,
    // téléchargements et fichiers (CV .pdf) restent natifs.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const a = e.target.closest('a[href^="/"]')
      if (!a || a.target || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0])) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('routechange', sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return createElement(RouteContext.Provider, { value: route }, children)
}

export function useRoute() {
  return useContext(RouteContext)
}

// Navigation programmatique (pushState + notification du routeur).
export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.href)
  const next = url.pathname + url.search + url.hash
  if (next === window.location.pathname + window.location.search + window.location.hash) return
  history[replace ? 'replaceState' : 'pushState'](null, '', next)
  window.dispatchEvent(new Event('routechange'))
}

// Retour au portfolio (optionnellement sur une section précise, ex. 'work'),
// dans la langue courante.
export function goHome(e, sectionId) {
  if (e) e.preventDefault()
  const { lang } = readLocation()
  navigate(pathFor(lang) + (sectionId ? `#${sectionId}` : ''))
}
