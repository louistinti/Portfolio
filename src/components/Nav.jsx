import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContent, useLang } from '../hooks/useLang.jsx'
import Icon from './Icon.jsx'

export default function Nav({ onContact }) {
  const { profile, ui } = useContent()
  const { lang, toggle } = useLang()
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
      {/* Bascule de langue : affiche la langue CIBLE (EN quand on est en FR). */}
      <button type="button" className="nav-lang mono" onClick={toggle} aria-label={ui.nav.ariaLang}>
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>
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
              <button
                type="button"
                className="nav-lang mono"
                onClick={() => {
                  toggle()
                  close()
                }}
                aria-label={ui.nav.ariaLang}
              >
                {lang === 'fr' ? 'English' : 'Français'}
              </button>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  )
}
