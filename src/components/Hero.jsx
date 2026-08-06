import { useContent } from '../hooks/useLang.jsx'
import RichText from './RichText.jsx'
import Icon from './Icon.jsx'

export default function Hero() {
  const { heroChips, ui } = useContent()
  const h = ui.hero
  return (
    <section className="hero">
      <div className="hero__body">
        <div className="hero__idx">
          <span className="mono">{h.kicker}</span>
          <span className="mono">(01)</span>
        </div>

        <div className="hero__lead">
          {/* .mline/.mline__in : balises collées volontairement — un retour à la ligne créerait un nœud texte parasite dans le masque. */}
          <h1>
            <span className="mline">
              <span className="mline__in">
                {h.l1} <span className="serif-it accent">{h.l1a}</span>
              </span>
            </span>
            <span className="mline">
              <span className="mline__in">
                {h.l2} <span className="accent">{h.l2a}</span>
              </span>
            </span>
          </h1>
          <div className="hero__sub">
            <p>
              <RichText text={h.sub} />
            </p>
          </div>
          <a className="btn" href="#work">
            {h.cta} <Icon name="arrow-right" className="arrow" />
          </a>
        </div>

        <div className="hero__foot">
          <div className="chip-group">
            {heroChips.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <span className="mono">{h.scroll}</span>
        </div>
      </div>
    </section>
  )
}
