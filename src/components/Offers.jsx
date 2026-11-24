import { useContent } from '../hooks/useLang.jsx'
import Icon from './Icon.jsx'

// Section « Offres » : les deux formats de mission, entre Projets et
// Compétences. Mêmes briques visuelles que les colonnes de l'À propos
// (sur-titre mono + paragraphe), un bloc par offre.
export default function Offers() {
  const { ui } = useContent()
  const o = ui.offers
  return (
    <section className="section" id="offers">
      <div className="section-head">
        <h2>{o.title}</h2>
        <span className="section-idx">(04)</span>
      </div>

      <div className="offers-grid">
        {o.items.map((it, i) => (
          <div className="offer reveal" data-d={i || undefined} key={it.h}>
            <h4>{`// ${it.h}`}</h4>
            <p>{it.p}</p>
            {it.link && (
              <a
                className="offer__link"
                href={it.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {it.link.label} <Icon name="arrow-right" className="arrow" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
