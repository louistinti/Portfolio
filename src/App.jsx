import { useEffect } from 'react'
import { useRoute } from './hooks/useRoute.js'
import { useContent } from './hooks/useLang.jsx'
import Portfolio from './components/Portfolio.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { useLenis } from './anim/useLenis.js'
import { usePageTransition } from './anim/usePageTransition.js'
import ViewBadge from './anim/ViewBadge.jsx'
import { applyHead, pageMeta } from './seo.js'

export default function App() {
  useLenis()
  const { lang, slug } = useRoute()
  // Données de la langue courante (slugs identiques FR/EN, cf. useLang).
  const { caseStudies } = useContent()
  // Le swap visuel est orchestré par le rideau : on affiche displayedRoute,
  // qui suit le slug avec le temps de la transition. Un changement de langue
  // seul ne déclenche pas de rideau.
  const { displayedRoute, curtainRef } = usePageTransition(slug)
  const study = displayedRoute !== 'home' ? caseStudies[displayedRoute] : null

  // <head> (titre, description, canonical, lang) aligné sur la page affichée.
  // Au premier chargement il est déjà correct (HTML pré-rendu) : ceci ne
  // sert qu'aux navigations sans rechargement.
  useEffect(() => {
    applyHead(pageMeta(lang, displayedRoute))
  }, [lang, displayedRoute])

  return (
    <>
      {study ? <CaseStudy data={study} /> : <Portfolio />}
      <div className="curtain" ref={curtainRef} aria-hidden="true">
        <span className="curtain__label"></span>
      </div>
      <ViewBadge />
    </>
  )
}
