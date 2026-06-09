import { useEffect } from 'react'
import { useRoute } from './hooks/useRoute.js'
import { caseStudies } from './data/content.js'
import Portfolio from './components/Portfolio.jsx'
import CaseStudy from './components/CaseStudy.jsx'

export default function App() {
  const route = useRoute()
  const study = route !== 'home' ? caseStudies[route] : null

  // En entrant dans une étude de cas, on repart du haut (le navigateur
  // conserve sinon la position de défilement du portfolio).
  useEffect(() => {
    if (study) window.scrollTo(0, 0)
  }, [route, study])

  return study ? <CaseStudy data={study} /> : <Portfolio />
}
