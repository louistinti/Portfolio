import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motionEnabled, finePointer } from './motion.js'

// Curseur compagnon (desktop pointeur fin uniquement). Le curseur natif reste
// visible — celui-ci suit avec un léger retard, grossit sur les liens et
// affiche « View » sur les cartes projet.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!motionEnabled() || !finePointer()) return
    const dot = ref.current
    dot.style.display = 'flex'
    gsap.set(dot, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })

    let hasMoved = false
    const onMove = (e) => {
      if (!hasMoved) {
        // Premier mouvement : on se téléporte sous le pointeur (pas de
        // traînée depuis 0,0) et on révèle le point.
        hasMoved = true
        gsap.set(dot, { x: e.clientX, y: e.clientY })
        dot.classList.add('is-active')
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e) => {
      const isView = !!e.target.closest('a.card')
      dot.classList.toggle('is-view', isView)
      dot.classList.toggle('is-link', !isView && !!e.target.closest('a, button'))
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      dot.classList.remove('is-active')
      dot.style.display = 'none'
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  )
}
