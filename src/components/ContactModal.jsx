import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/content.js'
import Icon from './Icon.jsx'

// Modale "Let's talk" — deux chemins de contact : un mail direct, ou un
// créneau de 30 min via Calendly. Le lien Calendly se règle dans content.js
// (profile.calendly). Accessible : Échap pour fermer, clic sur le fond,
// focus posé à l'ouverture et scroll du body bloqué.
export default function ContactModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>

        <span className="modal__eyebrow mono">// Let's talk</span>
        <h3 id="modal-title" className="modal__title">
          How would you like to <span className="serif-it accent">connect?</span>
        </h3>

        <div className="modal__options">
          <a className="modal__opt" href={`mailto:${profile.email}`}>
            <span className="modal__opt-ic"><Icon name="mail" /></span>
            <span className="modal__opt-txt">
              <b>Send a message</b>
              <span className="modal__opt-sub">{profile.email}</span>
            </span>
            <Icon name="arrow-right" className="arrow" />
          </a>

          <a
            className="modal__opt"
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="modal__opt-ic"><Icon name="calendar" /></span>
            <span className="modal__opt-txt">
              <b>Book a call</b>
              <span className="modal__opt-sub">15 min phone, 30 min or 1h on Meet</span>
            </span>
            <Icon name="arrow-up-right" className="arrow" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
