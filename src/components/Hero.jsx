import { profile, heroChips } from '../data/content.js'

export default function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero__body">
        <div className="hero__idx">
          <span className="mono">Portfolio — 2026</span>
          <span className="mono">(01)</span>
        </div>

        <div className="hero__lead">
          <h1>
            Product&nbsp;design <span className="serif-it accent">built</span>
            <br />
            to ship &amp; scale <span className="accent">B2B</span>
          </h1>
          <div className="hero__sub">
            <p>
              <strong>{profile.role}.</strong> I design and ship B2B &amp; SaaS products end to
              end — from research and UX to shipped interface. Freelance · full‑remote or hybrid.
            </p>
          </div>
          <a className="btn" href="#work">
            See my work{' '}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="hero__foot">
          <div className="chip-group">
            <span className="chip">Freelance</span>
            {heroChips.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <span className="mono">Scroll ↓</span>
        </div>
      </div>
    </section>
  )
}
