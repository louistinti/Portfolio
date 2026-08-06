import { createContext, useContext, useEffect, useState } from 'react'
import * as en from '../data/content.js'
import * as fr from '../data/content.fr.js'

// ──────────────────────────────────────────────────────────────
//  LANGUE (FR/EN)
//  Bundle de contenu par langue : les slugs d'études de cas sont identiques
//  dans les deux, seul le texte change. Le routing (useRoute) reste branché
//  sur le bundle EN, clés only, et n'a pas besoin de la langue.
//  Choix initial : localStorage si déjà choisi, sinon langue du navigateur.
// ──────────────────────────────────────────────────────────────

const bundles = { en, fr }
const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'fr' || saved === 'en') return saved
    return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en'
  } catch {
    return 'en'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* stockage indisponible : le choix ne persiste pas, tant pis */
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))
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
