import { useEffect } from 'react'

// Ported from the design's app.js — scroll reveals, nav shrink/black on
// scroll, mobile burger jump, and tap-to-toggle TLDR on touch devices.
export function useInteractions() {
  useEffect(() => {
    /* ---- scroll reveals ---- */
    const revealEls = document.querySelectorAll('.reveal')
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
      )
      revealEls.forEach((el) => io.observe(el))
    } else {
      revealEls.forEach((el) => el.classList.add('in'))
    }

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
      if (io) io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cardHandlers.forEach(([card, handler]) => card.removeEventListener('click', handler))
    }
  }, [])
}
