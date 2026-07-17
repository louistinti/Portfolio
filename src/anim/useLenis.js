import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { lenisEnabled } from './motion.js'

gsap.registerPlugin(ScrollTrigger)

// Instance partagée — importée par useScrollLock, usePageTransition, etc.
// Nulle quand Lenis est inactif (mobile, reduced-motion) : toujours tester.
export let lenis = null

// Fait défiler vers une cible (élément, sélecteur ou position en px) via
// Lenis quand il est actif, sinon en natif. `immediate` saute sans lisser.
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, force: true })
    return
  }
  const behavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior, block: 'start' })
  }
}

export function useLenis() {
  useEffect(() => {
    if (!lenisEnabled()) return

    lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    // Lissage de latence GSAP conservé (valeurs par défaut) : avec
    // lagSmoothing(0), un blocage du thread principal (montage d'une case
    // study) faisait sauter le rideau directement à sa fin — swap visible
    // sans animation. Le coût : une micro-reprise du smooth scroll après un
    // gros blocage, imperceptible ici.
    gsap.ticker.lagSmoothing(500, 33)

    // Ancres même-page (#about, #work, sommaire des case studies…) :
    // routées vers Lenis. Les routes `#/slug` ne sont PAS interceptées.
    const onClick = (e) => {
      // Cède la main : handlers React déjà passés (defaultPrevented) et
      // clics modifiés (nouvel onglet, sélection…) restent natifs.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (href.startsWith('#/')) return // route de case study
      const el = href.length > 1 && document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      scrollToTarget(el)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
