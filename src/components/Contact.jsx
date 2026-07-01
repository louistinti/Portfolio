import { useState } from 'react'
import { contactLinks, profile } from '../data/content.js'
import Icon from './Icon.jsx'
import ContactModal from './ContactModal.jsx'

export default function Contact() {
  const [open, setOpen] = useState(false)
  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <h2>Let's talk</h2>
        <span className="section-idx">(05)</span>
      </div>

      <h2 className="contact__big reveal">
        Have a product <span className="serif-it accent">to&nbsp;build?</span>
      </h2>

      <div className="contact__row">
        <div className="contact__links reveal" data-d="1">
          {contactLinks.map((l) => {
            const ext = l.href.startsWith('http')
            return (
              <a href={l.href} key={l.label} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="mono">{l.mono}</span>
                <span className="lbl">{l.label}</span>
              </a>
            )
          })}
        </div>
        <div className="contact__actions reveal" data-d="2">
          <button type="button" className="btn" onClick={() => setOpen(true)}>
            Let's talk <Icon name="arrow-right" className="arrow" />
          </button>
          <a className="btn-ghost btn" href={profile.cv} download>
            Download CV <Icon name="arrow-down" className="arrow" />
          </a>
        </div>
      </div>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
