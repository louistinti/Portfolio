import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { caseStudies } from '../data/content.js'
import { ease, dur, motionEnabled } from './motion.js'

const labelFor = (route) => (route === 'home' ? 'Home' : caseStudies[route]?.name ?? route)

// Rideau home ↔ case study. La route affichée (displayedRoute) est découplée
// du hash : le swap de composant attend que le rideau couvre l'écran, puis le
// rideau se lève sur la nouvelle page. Fonctionne pour toute origine de
// navigation (clic, bouton retour) puisqu'on observe la route, pas les liens.
//
// Deux phases distinctes :
//  1. Couverture (useEffect) : le rideau descend, puis setDisplayedRoute.
//  2. Levée (useLayoutEffect sur displayedRoute) : jouée APRÈS le commit réel
//     de la nouvelle page — pas de délai arbitraire qui ferait la course avec
//     un montage lent (case study chargée d'images).
export function usePageTransition(route) {
  const [displayedRoute, setDisplayedRoute] = useState(route)
  const curtainRef = useRef(null)
  const pending = useRef(false) // une transition attend sa levée

  useEffect(() => {
    const curtain = curtainRef.current
    if (route === displayedRoute) {
      // Couverture interrompue avant le swap (retour arrière pendant la
      // descente) : la timeline tuée ne jouera jamais son .set final — on
      // normalise. Gated sur `pending` : sur une navigation réussie, la levée
      // (layout effect) a déjà consommé le flag AVANT ce passage (les layout
      // effects précèdent les effets passifs dans un même commit), donc on ne
      // touche pas au rideau en train de se lever.
      if (pending.current && curtain) {
        gsap.set(curtain, { display: 'none', clearProps: 'transform' })
      }
      pending.current = false
      return
    }
    if (!motionEnabled() || !curtain) {
      setDisplayedRoute(route)
      return
    }
    gsap.killTweensOf(curtain) // une levée encore en vol céderait la place
    curtain.querySelector('.curtain__label').textContent = labelFor(route)
    pending.current = true
    const tl = gsap
      .timeline()
      .set(curtain, { display: 'flex' })
      .fromTo(
        curtain,
        { yPercent: 100 },
        { yPercent: 0, duration: dur.page, ease: ease.inOut },
      )
      .add(() => setDisplayedRoute(route))
    return () => tl.kill()
  }, [route, displayedRoute])

  // Levée : displayedRoute vient de commiter — la nouvelle page est dans le
  // DOM derrière le rideau (petit délai pour laisser le premier paint se faire).
  useLayoutEffect(() => {
    if (!pending.current) return
    pending.current = false
    const curtain = curtainRef.current
    if (!curtain) return
    const tl = gsap
      .timeline({ delay: 0.1 })
      .to(curtain, { yPercent: -100, duration: dur.page, ease: ease.inOut })
      .set(curtain, { display: 'none', clearProps: 'transform' })
    return () => tl.kill()
  }, [displayedRoute])

  return { displayedRoute, curtainRef }
}
