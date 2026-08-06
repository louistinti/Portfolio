import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motionEnabled, finePointer } from './motion.js'

// Badge « View » collé au pointeur au survol des cartes projet (desktop
// pointeur fin uniquement). Le curseur natif reste LE curseur, le badge est
// une étiquette d'affordance. Suivi via quickSetter : instantané, zéro lag.
export default function ViewBadge() {
  const ref = useRef(null)

  useEffect(() => {
    if (!motionEnabled() || !finePointer()) return
    const badge = ref.current
    const setX = gsap.quickSetter(badge, 'x', 'px')
    const setY = gsap.quickSetter(badge, 'y', 'px')

    let active = false
    const onMove = (e) => {
      setX(e.clientX)
      setY(e.clientY)
    }
    const onOver = (e) => {
      const on = !!e.target.closest('a.card')
      if (on === active) return
      active = on
      if (on) onMove(e) // positionné avant d'apparaître (pas de saut visible)
      badge.classList.toggle('is-on', on)
    }
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousemove', onMove)
      badge.classList.remove('is-on')
    }
  }, [])

  return (
    <div className="view-badge" ref={ref} aria-hidden="true">
      View
    </div>
  )
}
