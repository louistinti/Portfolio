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

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e) => {
      dot.classList.toggle('is-view', !!e.target.closest('a.card'))
      dot.classList.toggle('is-link', !!e.target.closest('a, button'))
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      dot.style.display = 'none'
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  )
}
