import { useEffect, useState } from 'react'
import { caseStudies } from '../data/content.js'

// ──────────────────────────────────────────────────────────────
//  Routeur minimal basé sur le hash — zéro dépendance.
//  Une page d'étude de cas vit sur `#/<slug>` (slug = clé dans
//  `caseStudies`). Tout le reste (vide, #work, #about…) = Portfolio.
//  On route sur le PRÉFIXE `#/` pour ne pas entrer en conflit avec
//  les ancres internes (#work, #research…).
//  Déploiement statique friendly (GitHub Pages…) : aucune réécriture
//  serveur nécessaire.
// ──────────────────────────────────────────────────────────────

// Retourne le slug d'étude de cas si le hash vaut #/<slug-connu>, sinon 'home'.
function getRoute() {
  const h = window.location.hash
  if (h.startsWith('#/')) {
    const slug = h.slice(2).split(/[/?#]/)[0]
    if (caseStudies[slug]) return slug
  }
  return 'home'
}

export function useRoute() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  return route
}

// Retour au portfolio (optionnellement sur une section précise, ex. 'work').
export function goHome(e, sectionId) {
  if (e) e.preventDefault()
  const target = sectionId ? `#${sectionId}` : ''
  if (window.location.hash === target) return
  if (target) {
    window.location.hash = sectionId
  } else {
    // Vider le hash sans laisser un « # » orphelin, puis notifier le routeur.
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}
