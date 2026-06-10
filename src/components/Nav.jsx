import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/content.js'
import Icon from './Icon.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    // Si on repasse en desktop avec le menu ouvert, on le referme.
    const onResize = () => { if (window.innerWidth > 1040) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className={`nav${open ? ' nav--open' : ''}`} id="nav">
      <a className="brand" href="#top" aria-label="Home" onClick={close}>
        <span className="mark">
          <span>{profile.mark}</span>
        </span>
        <b>{profile.brand}</b>
      </a>
      <nav className="nav-links">
        {LINKS.map((l) => (
          <a href={l.href} key={l.href}>{l.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Get in touch <Icon name="arrow-right" className="arrow" />
      </a>
      <button
        className="nav-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
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
          <div className="nav-mobile" role="dialog" aria-modal="true" aria-label="Menu">
            <nav className="nav-mobile__links">
              {LINKS.map((l) => (
                <a href={l.href} key={l.href} onClick={close}>{l.label}</a>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </header>
  )
}
