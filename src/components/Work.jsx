import { projects, caseStudies } from '../data/content.js'

export default function Work() {
  return (
    <section className="section" id="work" data-screen-label="Work">
      <div className="section-head">
        <h2>Selected work</h2>
        <span className="section-idx">(03)</span>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => {
          // Carte cliquable si une étude de cas existe pour son slug ;
          // sinon affichée en "Coming soon" (grisée, non cliquable).
          const linked = p.slug && caseStudies[p.slug]
          const soon = !linked
          const Tag = linked ? 'a' : 'article'
          return (
            <Tag
              className={`card reveal${soon ? ' is-soon' : ''}`}
              data-d={i % 2 === 1 ? '1' : undefined}
              tabIndex={0}
              key={p.name}
              {...(linked ? { href: `#/${p.slug}` } : {})}
              {...(soon ? { 'aria-disabled': 'true' } : {})}
            >
              <div className="card__media">
                <div className="ph">
                  {p.cover ? (
                    <img src={p.cover} alt={p.name} />
                  ) : (
                    <span className="ph-label">[ Project image, replace ]</span>
                  )}
                </div>
                <div className="card__top">
                  <span className="idx">{p.idx}</span>
                  <span className="card__tags">
                    {!soon && p.status && <span className="card__status">{p.status}</span>}
                    <span className="cat">{soon ? 'Coming soon' : p.cat}</span>
                  </span>
                </div>
                {!soon && (
                  <div className="card__tldr">
                    <p className="tl">TL;DR</p>
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
