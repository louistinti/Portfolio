import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { caseStudies } from '../data/content.js'
import { ease, dur, motionEnabled } from './motion.js'

const labelFor = (route) => (route === 'home' ? 'Home' : caseStudies[route]?.name ?? route)

// Rideau home ↔ case study. La route affichée (displayedRoute) est découplée
// du hash : le swap de composant attend que le rideau couvre l'écran, puis le
// rideau se lève sur la nouvelle page. Fonctionne pour toute origine de
// navigation (clic, bouton retour) puisqu'on observe la route, pas les liens.
export function usePageTransition(route) {
  const [displayedRoute, setDisplayedRoute] = useState(route)
  const curtainRef = useRef(null)

  useEffect(() => {
    if (route === displayedRoute) return
    const curtain = curtainRef.current
    if (!motionEnabled() || !curtain) {
      setDisplayedRoute(route)
      return
    }
    curtain.querySelector('.curtain__label').textContent = labelFor(route)
    const tl = gsap
      .timeline()
      .set(curtain, { display: 'flex' })
      .fromTo(
        curtain,
        { yPercent: 100 },
        { yPercent: 0, duration: dur.page, ease: ease.inOut },
      )
      .add(() => setDisplayedRoute(route))
      // petite tenue le temps que React monte la page derrière le rideau
      .to(curtain, { yPercent: -100, duration: dur.page, ease: ease.inOut, delay: 0.15 })
      .set(curtain, { display: 'none' })
    return () => tl.kill()
  }, [route, displayedRoute])

  return { displayedRoute, curtainRef }
}
