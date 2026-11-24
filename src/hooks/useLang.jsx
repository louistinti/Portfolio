import { createContext, useContext } from 'react'
import * as en from '../data/content.js'
import * as fr from '../data/content.fr.js'
import { navigate, pathFor, useRoute } from './useRoute.js'

// ──────────────────────────────────────────────────────────────
//  LANGUE (FR/EN)
//  Bundle de contenu par langue : les slugs d'études de cas sont identiques
//  dans les deux, seul le texte change.
//  La langue vient de l'URL (/fr/… = français), pour que chaque version ait
//  sa propre adresse indexable. Le choix du visiteur est mémorisé
//  (localStorage) et appliqué à l'arrivée par le script inline d'index.html,
//  qui n'intervient que sur la racine nue : / part vers /fr/ (français par
//  défaut) sauf choix EN mémorisé. Les autres URL gardent leur langue.
// ──────────────────────────────────────────────────────────────

export const bundles = { en, fr }
const LangContext = createContext(null)

export function LangProvider({ children }) {
  const { lang, slug } = useRoute()

  const setLang = (code) => {
    try {
      localStorage.setItem('lang', code)
    } catch {
      /* stockage indisponible : le choix ne persiste pas, tant pis */
    }
    if (code !== lang) navigate(pathFor(code, slug) + window.location.hash, { replace: true })
  }
  const toggle = () => setLang(lang === 'fr' ? 'en' : 'fr')
  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// Contenu de la langue courante : { profile, projects, caseStudies, ui… }.
export function useContent() {
  const { lang } = useContext(LangContext)
  return bundles[lang]
}
