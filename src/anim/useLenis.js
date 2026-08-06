import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { lenisEnabled } from './motion.js'

gsap.registerPlugin(ScrollTrigger)

// Instance partagée, importée par useScrollLock, usePageTransition, etc.
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
    if (!el) return
    // Sans Lenis (mobile, reduced-motion), scrollIntoView ignore `offset`, on
    // calcule la position à la main dès qu'un décalage est demandé.
    if (offset) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior })
    } else {
      el.scrollIntoView({ behavior, block: 'start' })
    }
  }
}

// Nombre de pixels dont on escamote le filet supérieur d'une section sous la
// nav. 0 = le filet s'aligne pile sur le bord de la nav (il se cumule alors
// avec sa bordure basse et se lit comme un trait résiduel).
const TUCK = 12

// Défilement vers une SECTION, en tenant compte de la nav `position: fixed`.
// Sans ça, le haut de la section (et donc son titre) se cale au ras du viewport
// et passe sous la nav. Utilisé par la home comme par les études de cas, les
// deux navs portent la classe `.nav`.
export function scrollToSection(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const nav = document.querySelector('.nav')
  const navH = nav ? nav.offsetHeight : 0
  // On n'escamote QUE du vide : on ne tuck que si la section a bien un filet,
  // et jamais plus que son padding haut. Sinon une section sans bordure ni
  // padding (#about) verrait son titre entamé par le décalage.
  const head = el.firstElementChild
  const cs = head && getComputedStyle(head)
  const tuck =
    cs && parseFloat(cs.borderTopWidth) > 0 ? Math.min(TUCK, parseFloat(cs.paddingTop) || 0) : 0
  // Position ABSOLUE plutôt que l'option `offset` : Lenis et le fallback natif
  // n'appliquent pas un décalage sur élément de la même façon.
  scrollToTarget(Math.max(0, el.getBoundingClientRect().top + window.scrollY - navH + tuck), {
    immediate,
  })
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
    // study) faisait sauter le rideau directement à sa fin, swap visible
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
      scrollToSection(el)
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
