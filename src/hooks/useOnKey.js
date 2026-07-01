import { useEffect, useRef } from 'react'

// Appelle `handler` quand la touche `key` est pressée, tant que `active` est
// vrai (ex. Échap pour fermer une modale/lightbox/menu). Le handler est gardé
// dans une ref pour ne pas ré-abonner l'écouteur à chaque rendu.
export function useOnKey(key, handler, active = true) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === key) handlerRef.current(e)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [key, active])
}
