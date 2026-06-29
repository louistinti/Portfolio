import { useEffect, Fragment } from 'react'
import { useInteractions } from '../hooks/useInteractions.js'
import { goHome } from '../hooks/useRoute.js'
import { profile } from '../data/content.js'

// ──────────────────────────────────────────────────────────────
//  PAGE GÉNÉRIQUE D'ÉTUDE DE CAS (template)
//  Rend une page complète à partir d'une entrée de `caseStudies`
//  (voir src/data/content.js). Toutes les sections sont optionnelles.
// ──────────────────────────────────────────────────────────────

// Mini rich-text : **gras** → <strong>, *accent* → surlignage couleur,
// `touche` → <kbd>. Suffit pour le contenu éditorial des études de cas.
function RichText({ text }) {
  if (text == null) return null
  if (typeof text !== 'string') return text
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*')) return <span className="serif-it" key={i}>{p.slice(1, -1)}</span>
    if (p.startsWith('`') && p.endsWith('`')) return <kbd key={i}>{p.slice(1, -1)}</kbd>
    return p
  })
}

// Luminance relative (sRGB) — sert à choisir une étiquette claire/sombre
// sur chaque teinte de la rampe du style guide.
function luminance(hex) {
  const m = (hex || '').replace('#', '').match(/.{2}/g)
  if (!m || m.length < 3) return 0
  const [r, g, b] = m.slice(0, 3).map((h) => {
    const v = parseInt(h, 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export default function CaseStudy({ data }) {
  useInteractions()

  useEffect(() => {
    if (!data) return
    const prev = document.title
    document.title = `${data.name}, Case Study`
    return () => {
      document.title = prev
    }
  }, [data])

  if (!data) return null

  // Image-slot : placeholder rayé (.ph) + image réelle si fournie (data.shots).
  const Shot = ({ id, label, className = '', fit = 'cover', style }) => {
    const src = data.shots?.[id]
    const alt = (label || '').replace(/[[\]]/g, '').trim()
    return (
      <div className={`ph${className ? ' ' + className : ''}`} data-fit={fit} style={style}>
        {src ? <img src={src} alt={alt} loading="lazy" /> : <span className="ph-label">{label}</span>}
      </div>
    )
  }

  // Aperçu de page web : vignette recadrée sur le HAUT de la capture (pas de
  // défilement). 4 vignettes tiennent dans une grille 2×2.
  const PageGrid = ({ items }) => (
    <div className="cs-pages">
      {items.map((p, i) => {
        const src = data.shots?.[p.shot]
        return (
          <figure className="reveal" data-d={i % 2 || undefined} key={p.shot || i}>
            <div className="cs-pagecard">
              {src ? <img src={src} alt={p.cap} loading="lazy" /> : <span className="ph-label">[ {p.cap} ]</span>}
            </div>
            <figcaption><span className="v">{String(i + 1).padStart(2, '0')}</span><span className="t">{p.cap}</span></figcaption>
          </figure>
        )
      })}
    </div>
  )

  const scrollToId = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { context, challenge, research, ideation, wireframes, topography, ui, prototype, roadmap } = data

  // Badge de statut optionnel (ex. projet en cours) : string courte, ou
  // { label, live } pour ajouter une pastille "vivante".
  const status = typeof data.status === 'string' ? { label: data.status } : data.status

  // Liens de la nav : sections réellement présentes dans les données.
  const navLinks = [
    context && { id: 'overview', label: 'Overview' },
    research && { id: 'research', label: 'Research' },
    ideation && { id: 'ideation', label: 'Ideation' },
    ui && { id: 'design', label: 'Design' },
    prototype && { id: 'prototype', label: 'Prototype' },
    roadmap && { id: 'roadmap', label: 'Roadmap' },
  ].filter(Boolean)

  // Rampe du style guide : palette explicite (ui.palette) si fournie, sinon
  // dérivée des teintes --topo-* du thème.
  const paletteSrc = ui?.palette
    ? ui.palette.map((p) => (typeof p === 'string' ? { hex: p } : p))
    : ['--topo-1', '--topo-2', '--topo-3', '--topo-4', '--topo-5', '--topo-6'].map((v) => ({ hex: data.theme?.[v] }))
  const reliefSteps = paletteSrc
    .filter((p) => p.hex)
    .map((p) => ({ hex: p.hex.toUpperCase(), lite: luminance(p.hex) > 0.18 }))

  return (
    <div className="cs-page" style={data.theme}>
      {/* ============================ NAV ============================ */}
      <header className="nav cs-nav" id="nav">
        <a className="brand" href="#" onClick={(e) => goHome(e)} aria-label="Back to home">
          <span className="mark">
            <span>{profile.mark}</span>
          </span>
          <b>{profile.brand}</b>
        </a>
        <nav className="nav-links">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollToId(e, l.id)}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="cs-back" href="#work" onClick={(e) => goHome(e, 'work')}>
          <span className="ar" aria-hidden="true">←</span> All work
        </a>
      </header>

      <main id="top">
        {/* ============================ TITLE BAR ============================ */}
        <header className="cs-title">
          {(data.kicker?.length > 0 || status) && (
            <div className="cs-title__kicker">
              {data.kicker?.map((tag, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="sep"></span>}
                  <span className="tag">{tag}</span>
                </Fragment>
              ))}
              {status && (
                <span className={`cs-status${status.live ? ' is-live' : ''}`}>
                  {status.live && <span className="cs-status__dot" aria-hidden="true"></span>}
                  {status.label}
                </span>
              )}
            </div>
          )}
          <div className="cs-title__row">
            <h1><RichText text={data.title} /></h1>
            {data.meta?.length > 0 && (
              <dl className="cs-meta">
                {data.meta.map((m) => (
                  <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
                ))}
              </dl>
            )}
          </div>
        </header>

        {/* ============================ CONTEXT ============================ */}
        {context && (
          <section className="section topo-bg" id="overview">
            <div className="step-eyebrow"><span className="num">00</span> {context.eyebrow}</div>
            <div className="cs-lede">
              <h3><RichText text={context.lede} /></h3>
              <div className="body">
                {context.body?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              </div>
            </div>
            {context.stats?.length > 0 && (
              <div className="cs-stats">
                {context.stats.map((s, i) => (
                  <div className="stat reveal" data-d={i || undefined} key={i}>
                    <div className="v">{s.v}{s.u && <span className="u">{s.u}</span>}</div>
                    <div className="k">{s.k}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ============================ CHALLENGE ============================ */}
        {challenge && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="cs-quote">
              <p><RichText text={challenge.quote} /></p>
              {challenge.who && <div className="who">{challenge.who}</div>}
            </div>
          </section>
        )}

        {/* ============================ RESEARCH ============================ */}
        {research && (
          <section className="section" id="research">
            <div className="section-head">
              <h2>{research.eyebrow}</h2>
              {research.idx && <span className="section-idx">{research.idx}</span>}
            </div>
            <div className="cs-lede">
              <h3><RichText text={research.lede} /></h3>
              <div className="body">
                {research.body?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              </div>
            </div>
            {research.personas?.length > 0 && (
              <div className="persona-grid">
                {research.personas.map((p, i) => (
                  <article className="persona reveal" data-d={i || undefined} key={p.id || i}>
                    <div className="persona__media">
                      <Shot id={p.shot} label={`[ ${p.name} ]`} />
                    </div>
                    <div className="persona__body">
                      <div className="persona__name"><h4>{p.name}</h4><span className="id">{p.id}</span></div>
                      <p className="persona__goal">{p.goal}</p>
                      <p className="persona__pain"><b>Pain</b><RichText text={p.pain} /></p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {research.insight && (
              <div className="cs-insight reveal">
                <div className="mk">Key insight</div>
                <p><RichText text={research.insight} /></p>
              </div>
            )}
          </section>
        )}

        {/* ============================ IDEATION ============================ */}
        {ideation && (
          <section className="section topo-bg" id="ideation">
            <div className="section-head">
              <h2>{ideation.eyebrow}</h2>
              {ideation.idx && <span className="section-idx">{ideation.idx}</span>}
            </div>
            <div className="cs-lede">
              <h3><RichText text={ideation.lede} /></h3>
              <div className="body">
                {ideation.body?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              </div>
            </div>
            {ideation.features?.length > 0 && (
              <div className="feature-grid">
                {ideation.features.map((f, i) => (
                  <div className="feature reveal" data-d={i % 3 || undefined} key={f.id || i}>
                    <span className="fi">{f.id}</span>
                    <h4>{f.name}</h4>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {ideation.media?.map((m, i) => (
              <div className={`cs-media reveal${m.framed ? ' is-framed' : ''}`} key={i}>
                <div className="cs-media__cap"><h4>{m.cap}</h4>{m.sub && <span>{m.sub}</span>}</div>
                <Shot id={m.shot} fit="contain" label={`[ ${m.cap} ]`} style={!m.framed && m.aspect ? { aspectRatio: m.aspect } : undefined} />
              </div>
            ))}
          </section>
        )}

        {/* ============================ WIREFRAMES ============================ */}
        {wireframes && (
          <section className="section">
            <div className="section-head">
              <h2>{wireframes.eyebrow}</h2>
              {wireframes.idx && <span className="section-idx">{wireframes.idx}</span>}
            </div>
            {wireframes.intro && (
              <p className="cs-hero__sub reveal" style={{ marginTop: 0, maxWidth: '54ch' }}>
                {wireframes.intro}
              </p>
            )}
            {wireframes.pages?.length > 0 ? (
              <PageGrid items={wireframes.pages} />
            ) : wireframes.items?.length > 0 ? (
              <div className="wire-row">
                {wireframes.items.map((w, i) => (
                  <div className={`wire reveal${w.final ? ' is-final' : ''}`} data-d={i || undefined} key={w.shot || i}>
                    <Shot id={w.shot} label={`[ Wireframe ${w.v} ]`} />
                    <div className="lab"><span className="v">{w.v}</span><span className="t">{w.t}</span></div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* ============================ TOPOGRAPHY / CONCEPT ============================ */}
        {topography && (
          <section className="cs-topo topo-bg">
            <div className="cs-topo__inner">
              <div className="step-eyebrow"><span className="num">{topography.mark || '◆'}</span> {topography.eyebrow}</div>
              <h3><RichText text={topography.title} /></h3>
              {topography.body && <p><RichText text={topography.body} /></p>}
              {topography.shot && (
                <div className="cs-topo__media reveal">
                  <Shot id={topography.shot} fit={topography.fit || 'cover'} label={`[ ${topography.eyebrow} ]`} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* ============================ UI / STYLE GUIDE ============================ */}
        {ui && (
          <section className="section" id="design">
            <div className="section-head">
              <h2>{ui.eyebrow}</h2>
              {ui.idx && <span className="section-idx">{ui.idx}</span>}
            </div>
            <div className="cs-lede">
              <h3><RichText text={ui.lede} /></h3>
              <div className="body">
                {ui.body?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              </div>
            </div>

            {(reliefSteps.length > 0 || ui.components) && (
              <div className="ui-guide">
                {reliefSteps.length > 0 && (
                  <div className="guide-card reveal">
                    {ui.paletteLabel && <h4>{ui.paletteLabel}</h4>}
                    <div className="relief" style={{ gridTemplateColumns: `repeat(${reliefSteps.length}, 1fr)` }}>
                      {reliefSteps.map((s, i) => (
                        <span key={i} className={s.lite ? 'lite' : undefined} style={{ background: s.hex }} data-h={s.hex}></span>
                      ))}
                    </div>
                    {ui.paletteNote && <p className="note">{ui.paletteNote}</p>}
                    {ui.fonts?.length > 0 && (
                      <dl className="guide-type">
                        {ui.fonts.map((f) => (
                          <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
                        ))}
                      </dl>
                    )}
                  </div>
                )}

                {ui.components && (
                  <div className="guide-card reveal" data-d="1">
                    <h4>// Components</h4>
                    <div className="guide-comp">
                      {ui.components.buttons?.length > 0 && (
                        <div className="row">
                          {ui.components.buttons.map((b, i) => (
                            <span className={`comp-btn${b.alt ? ' alt' : ''}`} key={i}>{b.label}</span>
                          ))}
                        </div>
                      )}
                      {ui.components.chips?.length > 0 && (
                        <div className="row">
                          {ui.components.chips.map((c, i) => <span className="comp-chip" key={i}>{c}</span>)}
                        </div>
                      )}
                      {ui.components.pills?.length > 0 && (
                        <div className="row">
                          {ui.components.pills.map((c, i) => <span className="comp-pill" key={i}>{c}</span>)}
                        </div>
                      )}
                      {ui.components.tabs?.length > 0 && (
                        <div className="comp-tab">
                          {ui.components.tabs.map((t, i) => (
                            <span className={t.on ? 'on' : undefined} key={i}>{t.label}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {ui.pages?.length > 0 ? (
              <PageGrid items={ui.pages} />
            ) : ui.screens?.length > 0 ? (
              <div className="screens-grid">
                {ui.screens.map((id, i) => (
                  <Shot id={id} label={`[ Screen ${i + 1} ]`} key={id} />
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* ============================ PROTOTYPE ============================ */}
        {prototype && (
          <section className="section topo-bg" id="prototype">
            <div className="section-head">
              <h2>{prototype.eyebrow}</h2>
              {prototype.idx && <span className="section-idx">{prototype.idx}</span>}
            </div>
            {prototype.note && (
              <div className="proto-note">
                <span className="mk">💡</span>
                <p><RichText text={prototype.note} /></p>
              </div>
            )}
            {prototype.href && (
              <a className="btn proto-link" href={prototype.href} target="_blank" rel="noopener noreferrer">
                {prototype.linkLabel || 'Open'} <span className="ar" aria-hidden="true">↗</span>
              </a>
            )}
            {prototype.src && (
              <div className="proto-frame reveal">
                <iframe title={`${data.name} preview`} src={prototype.src} allowFullScreen></iframe>
              </div>
            )}
          </section>
        )}

        {/* ============================ ROADMAP ============================ */}
        {roadmap && (
          <section className="section" id="roadmap">
            <div className="section-head">
              <h2>{roadmap.eyebrow}</h2>
              {roadmap.idx && <span className="section-idx">{roadmap.idx}</span>}
            </div>
            {(roadmap.lede || roadmap.body) && (
              <div className="cs-lede">
                {roadmap.lede && <h3><RichText text={roadmap.lede} /></h3>}
                {roadmap.body && (
                  <div className="body">
                    {roadmap.body.map((p, i) => <p key={i}><RichText text={p} /></p>)}
                  </div>
                )}
              </div>
            )}
            {roadmap.items?.length > 0 && (
              <ul className="roadmap-list">
                {roadmap.items.map((it, i) => {
                  const state = it.state || 'planned'
                  const mark = state === 'done' ? '✓' : state === 'building' ? '◐' : '○'
                  const lab = state === 'done' ? 'Shipped' : state === 'building' ? 'Building' : 'Planned'
                  return (
                    <li className={`roadmap-row reveal is-${state}`} data-d={i % 3 || undefined} key={i}>
                      <span className="roadmap-mark" aria-hidden="true">{mark}</span>
                      <div className="roadmap-text">
                        <h4>{it.name}</h4>
                        {it.desc && <p>{it.desc}</p>}
                      </div>
                      <span className="roadmap-state mono">{lab}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}
      </main>

      {/* ============================ NEXT ============================ */}
      <section className="cs-next">
        <span className="lab">Next up</span>
        <a className="big" href="#work" onClick={(e) => goHome(e, 'work')}>
          Back to all work <span className="ar" aria-hidden="true">↗</span>
        </a>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="footer">
        <p>© 2026 {profile.name}, {profile.role}</p>
        {data.footer && <p>{data.footer}</p>}
        <a className="to-top" href="#top" onClick={toTop}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  )
}
