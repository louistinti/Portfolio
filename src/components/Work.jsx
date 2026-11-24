import { useContent, useLang } from '../hooks/useLang.jsx'
import { pathFor } from '../hooks/useRoute.js'

export default function Work() {
  const { projects, caseStudies, ui } = useContent()
  const { lang } = useLang()
  const w = ui.work
  return (
    <section className="section" id="work">
      <div className="section-head">
        <h2>{w.title}</h2>
        <span className="section-idx">(03)</span>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => {
          // Carte cliquable si une étude de cas existe pour son slug, ou si
          // elle pointe vers un site externe (`href`, nouvel onglet) ;
          // sinon affichée en "Coming soon" (grisée, non cliquable).
          const internal = p.slug && caseStudies[p.slug]
          const external = !internal && p.href
          const linked = internal || external
          const soon = !linked
          const Tag = linked ? 'a' : 'article'
          return (
            <Tag
              className={`card reveal${soon ? ' is-soon' : ''}`}
              data-d={i % 2 === 1 ? '1' : undefined}
              tabIndex={0}
              key={p.name}
              {...(internal ? { href: pathFor(lang, p.slug) } : {})}
              {...(external
                ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              {...(soon ? { 'aria-disabled': 'true' } : {})}
            >
              <div className="card__media">
                <div className="ph">
                  {p.cover ? (
                    <img src={p.cover} alt={p.name} />
                  ) : (
                    <span className="ph-label">{w.ph}</span>
                  )}
                </div>
                <div className="card__top">
                  <span className="idx">{p.idx}</span>
                  <span className="card__tags">
                    {!soon && p.status && <span className="card__status">{p.status}</span>}
                    <span className="cat">{soon ? w.soon : p.cat}</span>
                  </span>
                </div>
                {!soon && (
                  <div className="card__tldr">
                    <p className="tl">{w.tldr}</p>
                    <p>{p.tldr}</p>
                  </div>
                )}
              </div>
              <div className="card__bar">
                <h3>{p.name}</h3>
                <span className="yr">{p.year}</span>
                {!soon && (
                  <span className="go" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            </Tag>
          )
        })}
      </div>
    </section>
  )
}
