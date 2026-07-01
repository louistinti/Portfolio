import { useEffect } from 'react'

// Verrouille le scroll du <body> tant que `active` est vrai (modale, lightbox,
// menu mobile). Restaure la valeur précédente à la fermeture/démontage.
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])
}
