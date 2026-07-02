import { useEffect } from 'react'

// Ported from the design's app.js — nav shrink/black on scroll, mobile
// burger jump, and tap-to-toggle TLDR on touch devices. Scroll reveals now
// live in src/anim/useReveals.js (GSAP + ScrollTrigger).
export function useInteractions() {
  useEffect(() => {
    /* ---- nav shrink / black on scroll ---- */
    const nav = document.getElementById('nav')
    const onScroll = () => {
      if (!nav) return
      if (window.scrollY > 40) nav.classList.add('scrolled')
      else nav.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    /* ---- touch devices: tap a card to toggle its TLDR ---- */
    const isTouch = window.matchMedia('(hover: none)').matches
    const cardHandlers = []
    if (isTouch) {
      document.querySelectorAll('.card').forEach((card) => {
        const handler = () => card.classList.toggle('show-tldr')
        card.addEventListener('click', handler)
        cardHandlers.push([card, handler])
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cardHandlers.forEach(([card, handler]) => card.removeEventListener('click', handler))
    }
  }, [])
}
