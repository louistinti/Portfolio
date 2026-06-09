import { profile } from '../data/content.js'

export default function Nav() {
  const jumpToWork = () =>
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <header className="nav" id="nav">
      <a className="brand" href="#top" aria-label="Home">
        <span className="mark">
          <span>{profile.mark}</span>
        </span>
        <b>{profile.brand}</b>
      </a>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="#contact">
        Get in touch <span className="arrow" aria-hidden="true">→</span>
      </a>
      <button className="nav-burger" aria-label="Menu" onClick={jumpToWork}>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}
