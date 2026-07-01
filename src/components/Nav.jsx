import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/content.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { useOnKey } from '../hooks/useOnKey.js'
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

  useScrollLock(open)
  useOnKey('Escape', close, open)

  // Si on repasse en desktop avec le menu ouvert, on le referme.
  useEffect(() => {
    if (!open) return
    const onResize = () => { if (window.innerWidth > 1040) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
