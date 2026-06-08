import { contactLinks, profile } from '../data/content.js'

export default function Contact() {
  return (
    <section className="section contact" id="contact" data-screen-label="Contact">
      <div className="section-head">
        <h2>Let's talk</h2>
        <span className="section-idx">(05)</span>
      </div>

      <h2 className="contact__big reveal">
        Have a product <span className="serif-it accent">to&nbsp;build?</span>
      </h2>

      <div className="contact__row">
        <div className="contact__links reveal" data-d="1">
          {contactLinks.map((l) => (
            <a href={l.href} key={l.label}>
              <span className="mono">{l.mono}</span>
              <span className="lbl">{l.label}</span>
            </a>
          ))}
        </div>
        <div className="contact__actions reveal" data-d="2">
          <a className="btn" href={`mailto:${profile.email}`}>
            Start a project{' '}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn-ghost btn" href="#" download>
            Download CV{' '}
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
