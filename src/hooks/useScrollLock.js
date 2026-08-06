import { useEffect } from 'react'
import { lenis } from '../anim/useLenis.js'

// Verrouille le scroll du <body> tant que `active` est vrai (modale, lightbox,
// menu mobile). Stoppe aussi Lenis, sinon il continuerait de capter la molette.
// Restaure tout à la fermeture/démontage.
// Hypothèse : un seul verrou actif à la fois (lenis.stop/start est un drapeau,
// pas un compteur, deux verrous simultanés se marcheraient dessus).
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = prev
      lenis?.start()
    }
  }, [active])
}
