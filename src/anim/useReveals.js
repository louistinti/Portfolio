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
      gsap.utils.toArray('.reveal, [data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: dur.base,
            ease: ease.out,
            delay: stagger.items * Number(el.dataset.d || 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // ---- lignes tracées : section-heads et skill-rows ----
      // Le trait est un pseudo-élément dont scaleX suit la variable --trace
      // (GSAP ne cible pas les pseudo-éléments, mais anime les variables CSS).
      gsap.utils.toArray('.section-head, .skill-row').forEach((el) => {
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
    const onImgLoad = (e) => {
      if (e.target.tagName === 'IMG') ScrollTrigger.refresh()
    }
    document.addEventListener('load', onImgLoad, true)

    return () => {
      document.removeEventListener('load', onImgLoad, true)
      ctx.revert()
    }
  }, [])
}
