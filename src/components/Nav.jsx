import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContent } from '../hooks/useLang.jsx'
import Icon from './Icon.jsx'
import LangToggle from './LangToggle.jsx'

export default function Nav({ onContact }) {
  const { profile, ui } = useContent()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Le lien Contact du header ouvre la modale « Let's talk » directement,
  // au lieu de faire défiler jusqu'à la section tout en bas.
  const handleContact = (e) => {
    e.preventDefault()
    onContact()
  }

  useEffect(() => {
    if (!open) return
    const onResize = () => {
      if (window.innerWidth > 1040) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  return (
    <header className={`nav${open ? ' nav--open' : ''}`} id="nav">
      <a className="brand" href="#top" aria-label={ui.nav.ariaHome} onClick={close}>
        <span className="mark">
          <span>{profile.mark}</span>
        </span>
        <b>{profile.brand}</b>
      </a>
      <nav className="nav-links">
        {ui.nav.links.map((l) =>
          l.href === '#contact' ? (
            <a href="#contact" key={l.href} onClick={handleContact}>
              {l.label}
            </a>
          ) : (
            <a href={l.href} key={l.href}>
              {l.label}
            </a>
          ),
        )}
      </nav>
      {/* Groupe droit : le toggle reste à 24px du CTA, tous deux ancrés à
          droite — la largeur des liens (plus longs en FR) ne les déplace plus. */}
      <div className="nav-actions">
        <LangToggle />
        <a className="nav-cta" href="#contact" onClick={handleContact}>
          {ui.nav.cta} <Icon name="arrow-right" className="arrow" />
        </a>
        <button
          className="nav-burger"
          aria-label={open ? ui.nav.ariaClose : ui.nav.ariaOpen}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menu mobile plein écran — porté dans <body> pour échapper au
          mix-blend-mode de la nav. La barre (z 8000) reste au-dessus pour
          garder le burger (devenu croix) accessible et refermer le menu. */}
      {open &&
        createPortal(
          <div className="nav-mobile" role="dialog" aria-modal="true" aria-label={ui.nav.ariaMenu}>
            <nav className="nav-mobile__links">
              {ui.nav.links.map((l) =>
                l.href === '#contact' ? (
                  <a
                    href="#contact"
                    key={l.href}
                    onClick={(e) => {
                      close()
                      handleContact(e)
                    }}
                  >
                    {l.label}
                  </a>
                ) : (
                  <a href={l.href} key={l.href} onClick={close}>
                    {l.label}
                  </a>
                ),
              )}
              {/* Le toggle est masqué dans la barre en mobile (place trop
                  serrée à côté de la marque) : il vit ici. */}
              <LangToggle />
            </nav>
          </div>,
          document.body,
        )}
    </header>
  )
}
