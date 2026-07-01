import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/content.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { useOnKey } from '../hooks/useOnKey.js'
import Icon from './Icon.jsx'

// Modale "Let's talk" — deux chemins de contact : un mail (mailto, avec un
// bouton "Copy" en fallback si aucun client mail n'est configuré), ou un
// rendez-vous via Calendly. Le lien Calendly se règle dans content.js
// (profile.calendly). Accessible : Échap pour fermer, clic sur le fond,
// focus posé à l'ouverture et scroll du body bloqué.
export default function ContactModal({ open, onClose }) {
  const closeRef = useRef(null)
  const resetRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useScrollLock(open)
  useOnKey('Escape', onClose, open)

  // Focus posé sur le bouton fermer à l'ouverture (accessibilité).
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  // Nettoyage du timer de feedback "Copied" si la modale se démonte.
  useEffect(() => () => clearTimeout(resetRef.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      // Fallback si l'API Clipboard est indisponible (vieux navigateurs / http).
      const ta = document.createElement('textarea')
      ta.value = profile.email
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      ta.remove()
    }
    setCopied(true)
    clearTimeout(resetRef.current)
    resetRef.current = setTimeout(() => setCopied(false), 2000)
  }

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
          {/* Mail : le clic sur la zone de gauche ouvre mailto ; le bouton
              "Copy" copie l'adresse sans déclencher la navigation. */}
          <div className="modal__opt modal__opt--split">
            <a className="modal__opt-hit" href={`mailto:${profile.email}`}>
              <span className="modal__opt-ic"><Icon name="mail" /></span>
              <span className="modal__opt-txt">
                <b>Send a message</b>
                <span className="modal__opt-sub">{profile.email}</span>
              </span>
            </a>
            <button
              type="button"
              className="modal__copy"
              onClick={copyEmail}
              aria-label={copied ? 'Email address copied' : 'Copy email address'}
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

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
