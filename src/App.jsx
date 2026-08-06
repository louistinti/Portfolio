import { useRoute } from './hooks/useRoute.js'
import { useContent } from './hooks/useLang.jsx'
import Portfolio from './components/Portfolio.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { useLenis } from './anim/useLenis.js'
import { usePageTransition } from './anim/usePageTransition.js'
import ViewBadge from './anim/ViewBadge.jsx'

export default function App() {
  useLenis()
  const route = useRoute()
  // Données de la langue courante (slugs identiques FR/EN, cf. useLang).
  const { caseStudies } = useContent()
  // Le swap visuel est orchestré par le rideau : on affiche displayedRoute,
  // qui suit `route` avec le temps de la transition.
  const { displayedRoute, curtainRef } = usePageTransition(route)
  const study = displayedRoute !== 'home' ? caseStudies[displayedRoute] : null

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
