import { useContent } from '../hooks/useLang.jsx'
import RichText from './RichText.jsx'
import Icon from './Icon.jsx'

export default function Contact({ onContact }) {
  const { contactLinks, profile, ui } = useContent()
  const c = ui.contact
  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <h2>{c.title}</h2>
        <span className="section-idx">(05)</span>
      </div>

      <h2 className="contact__big reveal">
        <RichText text={c.big} />
      </h2>

      <div className="contact__row">
        <div className="contact__links reveal" data-d="1">
          {contactLinks.map((l) => {
            const ext = l.href.startsWith('http')
            return (
              <a
                href={l.href}
                key={l.label}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="mono">{l.mono}</span>
                <span className="lbl">{l.label}</span>
              </a>
            )
          })}
        </div>
        <div className="contact__actions reveal" data-d="2">
          <button type="button" className="btn" onClick={onContact}>
            {c.talk} <Icon name="arrow-right" className="arrow" />
          </button>
          <a className="btn-ghost btn" href={profile.cv} download>
            {c.cv} <Icon name="arrow-down" className="arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
