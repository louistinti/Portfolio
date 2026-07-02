import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, dur, stagger, motionEnabled } from './motion.js'
import { lenis } from './useLenis.js'

gsap.registerPlugin(ScrollTrigger)

// Reveals GSAP de la page courante. Un appel par page (Portfolio, CaseStudy) ;
// gsap.context() garantit que tout est tué au démontage (StrictMode-safe).
// useLayoutEffect : les états initiaux sont posés avant le premier paint
// pour éviter tout flash de contenu non masqué.
export function useReveals() {
  useLayoutEffect(() => {
    if (!motionEnabled()) return

    const ctx = gsap.context(() => {
      // ---- reveals génériques : fade + montée, une seule fois ----
      // Un seul tween par élément : les lignes tracées des éléments .reveal
      // sont fusionnées dans leur reveal (--trace animé dans le même tween).
      gsap.utils.toArray('.reveal, [data-reveal]').forEach((el) => {
        const traced = el.matches('.section-head, .skill-row')
        const fromVars = { opacity: 0, y: 28, ...(traced && { '--trace': 0 }) }
        const toVars = {
          opacity: 1,
          y: 0,
          ...(traced && { '--trace': 1 }),
          duration: dur.base,
          ease: ease.out,
          delay: stagger.items * Number(el.dataset.d || 0),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
        gsap.fromTo(el, fromVars, toVars)
      })

      // ---- lignes tracées : section-heads et skill-rows ----
      // Le trait est un pseudo-élément dont scaleX suit la variable --trace
      // (GSAP ne cible pas les pseudo-éléments, mais anime les variables CSS).
      gsap.utils.toArray('.section-head, .skill-row').forEach((el) => {
        // Déjà couvert par le reveal ci-dessus : on ne double pas le tween.
        if (el.matches('.reveal, [data-reveal]')) return
        gsap.fromTo(
          el,
          { '--trace': 0 },
          {
            '--trace': 1,
            duration: dur.base,
            ease: ease.out,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // ---- entrée du hero + descente de la nav (page d'accueil) ----
      if (document.querySelector('.hero')) {
        gsap
          .timeline({ defaults: { ease: ease.out } })
          .from('.hero .mline__in', { yPercent: 110, duration: 0.6, stagger: stagger.lines, clearProps: 'transform' }, 0.05)
          .from('#nav', { yPercent: -100, duration: dur.base, clearProps: 'transform' }, 0.15)
          .from('.hero__idx', { opacity: 0, y: 12, duration: dur.fast }, 0.2)
          .from('.hero__sub, .hero__lead .btn', { opacity: 0, y: 18, duration: dur.base, stagger: stagger.lines }, 0.35)
          .from('.hero__foot .chip', { opacity: 0, y: 10, duration: dur.fast, stagger: 0.03 }, 0.5)
          .from('.hero__foot > .mono', { opacity: 0, duration: dur.fast }, 0.7)
      }
    })

    // ---- marquee réactif : sa vitesse suit la vélocité du scroll ----
    // L'animation reste en CSS ; on module son playbackRate via WAAPI.
    // Différé d'une frame : useReveals (layout effect enfant) s'exécute
    // AVANT le useEffect de useLenis dans App — `lenis` n'existe pas encore
    // au moment où ce code tourne. Une frame plus tard, il est là.
    let marqueeCleanup
    const marqueeRaf = requestAnimationFrame(() => {
      const track = document.querySelector('.marquee__track')
      const anim = track?.getAnimations?.()[0]
      if (!lenis || !anim) return
      const onScroll = ({ velocity }) => {
        const rate = gsap.utils.clamp(1, 3, 1 + Math.abs(velocity) * 0.05)
        gsap.to(anim, { playbackRate: rate, duration: 0.2, overwrite: true })
      }
      lenis.on('scroll', onScroll)
      marqueeCleanup = () => {
        gsap.killTweensOf(anim) // tue un éventuel tween de playbackRate en vol
        lenis?.off('scroll', onScroll)
        anim.playbackRate = 1
      }
    })

    // Les images chargées tard décalent les positions ScrollTrigger.
    // Débouncé : une rafale de chargements ne déclenche qu'un seul refresh.
    let refreshCall
    const onImgLoad = (e) => {
      if (e.target.tagName !== 'IMG') return
      refreshCall?.kill()
      refreshCall = gsap.delayedCall(0.2, () => ScrollTrigger.refresh())
    }
    document.addEventListener('load', onImgLoad, true)

    return () => {
      cancelAnimationFrame(marqueeRaf)
      marqueeCleanup?.()
      document.removeEventListener('load', onImgLoad, true)
      refreshCall?.kill()
      ctx.revert()
    }
  }, [])
}
