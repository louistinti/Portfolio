import { projects } from '../data/content.js'

export default function Work() {
  return (
    <section className="section" id="work" data-screen-label="Work">
      <div className="section-head">
        <h2>Selected work</h2>
        <span className="section-idx">(03) — Six</span>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => (
          <article className="card reveal" data-d={i % 2 === 1 ? '1' : undefined} tabIndex={0} key={p.name}>
            <div className="card__media">
              <div className="ph">
                {p.cover ? (
                  <img src={p.cover} alt={p.name} />
                ) : (
                  <span className="ph-label">[ Project image — replace ]</span>
                )}
              </div>
              <div className="card__top">
                <span className="idx">{p.idx}</span>
                <span className="cat">{p.cat}</span>
              </div>
              <div className="card__tldr">
                <p className="tl">TL;DR</p>
                <p>{p.tldr}</p>
              </div>
            </div>
            <div className="card__bar">
              <h3>{p.name}</h3>
              <span className="yr">{p.year}</span>
              <span className="go" aria-hidden="true">
                →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
