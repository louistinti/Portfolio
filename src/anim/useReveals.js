import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, dur, stagger, motionEnabled } from './motion.js'

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
      document.removeEventListener('load', onImgLoad, true)
      refreshCall?.kill()
      ctx.revert()
    }
  }, [])
}
