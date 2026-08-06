import { useEffect, useState, useRef, Fragment } from 'react'
import { useInteractions } from '../hooks/useInteractions.js'
import { useReveals } from '../anim/useReveals.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { useOnKey } from '../hooks/useOnKey.js'
import { goHome } from '../hooks/useRoute.js'
import { scrollToTarget, scrollToSection } from '../anim/useLenis.js'
import { useContent } from '../hooks/useLang.jsx'
import RichText from './RichText.jsx'
import LangToggle from './LangToggle.jsx'

// ──────────────────────────────────────────────────────────────
//  PAGE GÉNÉRIQUE D'ÉTUDE DE CAS (template)
//  Rend une page complète à partir d'une entrée de `caseStudies`
//  (voir src/data/content.js). Toutes les sections sont optionnelles.
//  Les libellés du template viennent de ui.cs (localisés) ; le contenu
//  vient des données déjà dans la bonne langue (App choisit le bundle).
// ──────────────────────────────────────────────────────────────

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

// Props pour rendre un conteneur d'image cliquable → ouvre la lightbox (utile
// sur mobile). Renvoie {} si pas de source (placeholder non cliquable).
function zoomable(src, name, onZoom) {
  if (!src) return {}
  const open = () => onZoom({ src, name })
  return {
    onClick: open,
    role: 'button',
    tabIndex: 0,
    'aria-label': `Open ${name || 'image'} preview`,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    },
  }
}

// Image-slot : placeholder rayé (.ph) + image réelle si fournie (shots[id]).
// NB : défini au niveau module (pas dans CaseStudy) pour ne PAS remonter à
// chaque re-render — sinon les images perdent leur classe `.in` (reveal) à
// l'ouverture de la lightbox et disparaissent.
function Shot({ shots, onZoom, id, label, className = '', fit = 'cover', style }) {
  const src = shots?.[id]
  const alt = (label || '').replace(/[[\]]/g, '').trim()
  const z = zoomable(src, alt, onZoom)
  const cls = `ph${className ? ' ' + className : ''}${src ? ' is-zoomable' : ''}`
  return (
    <div {...z} className={cls} data-fit={fit} style={style}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <span className="ph-label">{label}</span>}
    </div>
  )
}

// Aperçu de page web : vignette recadrée sur le HAUT de la capture (pas de
// défilement). 4 vignettes tiennent dans une grille 2×2. Module-level (cf. Shot).
function PageGrid({ shots, onZoom, items }) {
  return (
    <div className="cs-pages">
      {items.map((p, i) => {
        const full = shots?.[p.shot] // image ouverte dans la lightbox
        const thumb = shots?.[p.preview] || full // vignette (clean si `preview` fourni)
        const z = zoomable(full, p.cap, onZoom) // clic → ouvre l'image complète
        return (
          <figure className="reveal" data-d={i % 2 || undefined} key={p.shot || i}>
            <div {...z} className={`cs-pagecard${full ? ' is-zoomable' : ''}`}>
              {thumb ? (
                <img src={thumb} alt={p.cap} loading="lazy" />
              ) : (
                <span className="ph-label">[ {p.cap} ]</span>
              )}
            </div>
            <figcaption>
              <span className="v">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{p.cap}</span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

export default function CaseStudy({ data }) {
  useInteractions()
  useReveals()

  // Identité + libellés du template dans la langue courante. `t` pour ne pas
  // entrer en collision avec la section `ui` des données d'étude de cas.
  const { profile, ui: t } = useContent()
  const cs = t.cs

  // Lightbox galerie : preview plein écran, calée sur la hauteur de l'écran.
  const [zoom, setZoom] = useState(null)
  // Loupe interne : true = image agrandie (plus grande que l'écran), qu'on
  // déplace verticalement au drag/scroll. Remise à zéro à chaque ouverture.
  const [zoomed, setZoomed] = useState(false)
  // Remise à zéro à chaque changement de cible (ouverture/fermeture) — ajustée
  // pendant le rendu plutôt que dans un effet, pour éviter un re-render en cascade.
  const [prevZoom, setPrevZoom] = useState(zoom)
  if (zoom !== prevZoom) {
    setPrevZoom(zoom)
    setZoomed(false)
  }

  // Drag-to-pan sur l'image zoomée (souris). Le scroll natif (molette/tactile)
  // fonctionne en parallèle. `moved` sert à ne PAS dézoomer si on a glissé.
  const stageRef = useRef(null)
  const pan = useRef(null)
  const moved = useRef(false)
  const onPanDown = (e) => {
    if (!zoomed || e.pointerType === 'touch' || !stageRef.current) return
    pan.current = {
      x: e.clientX,
      y: e.clientY,
      top: stageRef.current.scrollTop,
      left: stageRef.current.scrollLeft,
    }
    moved.current = false
  }
  const onPanMove = (e) => {
    if (!pan.current || !stageRef.current) return
    const dx = e.clientX - pan.current.x
    const dy = e.clientY - pan.current.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true
    stageRef.current.scrollTop = pan.current.top - dy
    stageRef.current.scrollLeft = pan.current.left - dx
  }
  const onPanEnd = () => {
    pan.current = null
  }

  useEffect(() => {
    if (!data) return
    const prev = document.title
    document.title = `${data.name}, ${cs.docTitle}`
    return () => {
      document.title = prev
    }
  }, [data, cs.docTitle])

  // On repart du haut à l'arrivée — immédiat, le rideau couvre l'écran.
  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [])

  // Échap pour fermer + verrou du scroll quand la lightbox est ouverte.
  useScrollLock(!!zoom)
  useOnKey('Escape', () => setZoom(null), !!zoom)

  if (!data) return null

  // Décalage sous la nav fixe : logique partagée avec la home (scrollToSection).
  const scrollToId = (e, id) => {
    e.preventDefault()
    scrollToSection(document.getElementById(id))
  }
  const toTop = (e) => {
    e.preventDefault()
    scrollToTarget(0)
  }

  const {
    context,
    challenge,
    research,
    ideation,
    wireframes,
    topography,
    ui,
    results,
    prototype,
    roadmap,
  } = data

  // Badge de statut optionnel (ex. projet en cours) : string courte, ou
  // { label, live } pour ajouter une pastille "vivante".
  const status = typeof data.status === 'string' ? { label: data.status } : data.status

  // Le champ `prototype` couvre deux cas : un vrai prototype embarquable
  // (`src`/`href`), qu'on remonte tout en haut pour le montrer vite, OU une
  // note de bilan « Outcome / In hindsight » (sans lien), qui reste en fin de
  // page comme épilogue. Seul le premier remonte.
  const liveProto = prototype && (prototype.src || prototype.href)

  // Liens de la nav : sections réellement présentes dans les données. Le lien
  // du prototype suit sa position réelle (haut si live, bas sinon) et reprend
  // son eyebrow comme libellé (Prototype / Live / Outcome selon le projet).
  const protoLink = prototype && { id: 'prototype', label: prototype.eyebrow || cs.prototype }
  const navLinks = [
    context && { id: 'overview', label: cs.overview },
    liveProto && protoLink,
    research && { id: 'research', label: cs.research },
    ideation && { id: 'ideation', label: cs.ideation },
    ui && { id: 'design', label: cs.design },
    results && { id: 'results', label: results.eyebrow || cs.results },
    prototype && !liveProto && protoLink,
    roadmap && { id: 'roadmap', label: cs.roadmap },
  ].filter(Boolean)

  // Rampe du style guide : palette explicite (ui.palette) si fournie, sinon
  // dérivée des teintes --topo-* du thème.
  const paletteSrc = ui?.palette
    ? ui.palette.map((p) => (typeof p === 'string' ? { hex: p } : p))
    : ['--topo-1', '--topo-2', '--topo-3', '--topo-4', '--topo-5', '--topo-6'].map((v) => ({
        hex: data.theme?.[v],
      }))
  const reliefSteps = paletteSrc
    .filter((p) => p.hex)
    .map((p) => ({ hex: p.hex.toUpperCase(), lite: luminance(p.hex) > 0.18 }))

  return (
    <div className="cs-page" style={data.theme}>
      {/* ============================ NAV ============================ */}
      <header className="nav cs-nav" id="nav">
        <a className="brand" href="#" onClick={(e) => goHome(e)} aria-label={t.nav.ariaHome}>
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
        {/* Même groupe ancré à droite que sur la home : le toggle garde ses
            24px avec le lien retour, quelle que soit la langue. */}
        <div className="nav-actions">
          <LangToggle />
          <a className="cs-back" href="#work" onClick={(e) => goHome(e, 'work')}>
            <span className="ar" aria-hidden="true">
              ←
            </span>{' '}
            {cs.allWork}
          </a>
        </div>
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
            <h1>
              <RichText text={data.title} />
            </h1>
            {data.meta?.length > 0 && (
              <dl className="cs-meta">
                {data.meta.map((m) => (
                  <div key={m.k}>
                    <dt>{m.k}</dt>
                    <dd>{m.v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>

        {/* ============================ CONTEXT ============================ */}
        {context && (
          <section className="section topo-bg" id="overview">
            <div className="step-eyebrow" data-reveal="">
              <span className="num">00</span> {context.eyebrow}
            </div>
            <div className="cs-lede" data-reveal="">
              <h3>
                <RichText text={context.lede} />
              </h3>
              <div className="body">
                {context.body?.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </div>
            {context.stats?.length > 0 && (
              <div className="cs-stats">
                {context.stats.map((s, i) => (
                  <div className="stat reveal" data-d={i || undefined} key={i}>
                    <div className="v">
                      {s.v}
                      {s.u && <span className="u">{s.u}</span>}
                    </div>
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
            <div className="cs-quote" data-reveal="">
              <p>
                <RichText text={challenge.quote} />
              </p>
              {challenge.who && <div className="who">{challenge.who}</div>}
            </div>
          </section>
        )}

        {/* ===================== PROTOTYPE (live, remonté) ===================== */}
        {/* Un vrai prototype embarquable est montré tôt (juste après le
            challenge) pour le voir vite, puis on laisse explorer le récit. */}
        {liveProto && (
          <section className="section topo-bg" id="prototype">
            <div className="section-head">
              <h2>{prototype.eyebrow}</h2>
              {prototype.idx && <span className="section-idx">{prototype.idx}</span>}
            </div>
            {prototype.note && (
              <div className="proto-note">
                <span className="mk">💡</span>
                <p>
                  <RichText text={prototype.note} />
                </p>
              </div>
            )}
            {prototype.href && (
              <a
                className="btn proto-link"
                href={prototype.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {prototype.linkLabel || cs.open}{' '}
                <span className="ar" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
            {prototype.src && (
              <div className="proto-frame reveal">
                <iframe title={`${data.name} preview`} src={prototype.src} allowFullScreen></iframe>
              </div>
            )}
          </section>
        )}

        {/* ============================ RESEARCH ============================ */}
        {research && (
          <section className="section" id="research">
            <div className="section-head">
              <h2>{research.eyebrow}</h2>
              {research.idx && <span className="section-idx">{research.idx}</span>}
            </div>
            <div className="cs-lede" data-reveal="">
              <h3>
                <RichText text={research.lede} />
              </h3>
              <div className="body">
                {research.body?.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </div>
            {research.personas?.length > 0 && (
              <div className="persona-grid">
                {research.personas.map((p, i) => (
                  <article className="persona reveal" data-d={i || undefined} key={p.id || i}>
                    <div className="persona__media">
                      <Shot
                        shots={data.shots}
                        onZoom={setZoom}
                        id={p.shot}
                        label={`[ ${p.name} ]`}
                      />
                    </div>
                    <div className="persona__body">
                      <div className="persona__name">
                        <h4>{p.name}</h4>
                        <span className="id">{p.id}</span>
                      </div>
                      <p className="persona__goal">{p.goal}</p>
                      <p className="persona__pain">
                        <b>{cs.pain}</b>
                        <RichText text={p.pain} />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {research.insight && (
              <div className="cs-insight reveal">
                <div className="mk">{cs.keyInsight}</div>
                <p>
                  <RichText text={research.insight} />
                </p>
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
            <div className="cs-lede" data-reveal="">
              <h3>
                <RichText text={ideation.lede} />
              </h3>
              <div className="body">
                {ideation.body?.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
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
                <div className="cs-media__cap">
                  <h4>{m.cap}</h4>
                  {m.sub && <span>{m.sub}</span>}
                </div>
                <Shot
                  shots={data.shots}
                  onZoom={setZoom}
                  id={m.shot}
                  fit="contain"
                  label={`[ ${m.cap} ]`}
                  style={!m.framed && m.aspect ? { aspectRatio: m.aspect } : undefined}
                />
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
              <PageGrid shots={data.shots} onZoom={setZoom} items={wireframes.pages} />
            ) : wireframes.items?.length > 0 ? (
              <div className="wire-row">
                {wireframes.items.map((w, i) => (
                  <div
                    className={`wire reveal${w.final ? ' is-final' : ''}`}
                    data-d={i || undefined}
                    key={w.shot || i}
                  >
                    <Shot
                      shots={data.shots}
                      onZoom={setZoom}
                      id={w.shot}
                      label={`[ Wireframe ${w.v} ]`}
                    />
                    <div className="lab">
                      <span className="v">{w.v}</span>
                      <span className="t">{w.t}</span>
                    </div>
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
              <div className="step-eyebrow" data-reveal="">
                <span className="num">{topography.mark || '◆'}</span> {topography.eyebrow}
              </div>
              <h3>
                <RichText text={topography.title} />
              </h3>
              {topography.body && (
                <p>
                  <RichText text={topography.body} />
                </p>
              )}
              {topography.shots?.length > 0 ? (
                <div className="cs-topo__screens reveal">
                  {topography.shots.map((id, i) => (
                    <Shot
                      key={id || i}
                      shots={data.shots}
                      onZoom={setZoom}
                      id={id}
                      label={`[ Screen ${i + 1} ]`}
                    />
                  ))}
                </div>
              ) : topography.shot ? (
                <div className="cs-topo__media reveal">
                  <Shot
                    shots={data.shots}
                    onZoom={setZoom}
                    id={topography.shot}
                    fit={topography.fit || 'cover'}
                    label={`[ ${topography.eyebrow} ]`}
                  />
                </div>
              ) : null}
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
            <div className="cs-lede" data-reveal="">
              <h3>
                <RichText text={ui.lede} />
              </h3>
              <div className="body">
                {ui.body?.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </div>

            {(reliefSteps.length > 0 || ui.components) && (
              <div className="ui-guide">
                {reliefSteps.length > 0 && (
                  <div className="guide-card reveal">
                    {ui.paletteLabel && <h4>{ui.paletteLabel}</h4>}
                    <div
                      className="relief"
                      style={{ gridTemplateColumns: `repeat(${reliefSteps.length}, 1fr)` }}
                    >
                      {reliefSteps.map((s, i) => (
                        <span
                          key={i}
                          className={s.lite ? 'lite' : undefined}
                          style={{ background: s.hex }}
                          data-h={s.hex}
                        ></span>
                      ))}
                    </div>
                    {ui.paletteNote && <p className="note">{ui.paletteNote}</p>}
                    {ui.fonts?.length > 0 && (
                      <dl className="guide-type">
                        {ui.fonts.map((f) => (
                          <div key={f.k}>
                            <dt>{f.k}</dt>
                            <dd>{f.v}</dd>
                          </div>
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
                            <span className={`comp-btn${b.alt ? ' alt' : ''}`} key={i}>
                              {b.label}
                            </span>
                          ))}
                        </div>
                      )}
                      {ui.components.chips?.length > 0 && (
                        <div className="row">
                          {ui.components.chips.map((c, i) => (
                            <span className="comp-chip" key={i}>
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                      {ui.components.pills?.length > 0 && (
                        <div className="row">
                          {ui.components.pills.map((c, i) => (
                            <span className="comp-pill" key={i}>
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                      {ui.components.tabs?.length > 0 && (
                        <div className="comp-tab">
                          {ui.components.tabs.map((t, i) => (
                            <span className={t.on ? 'on' : undefined} key={i}>
                              {t.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {ui.pages?.length > 0 ? (
              <PageGrid shots={data.shots} onZoom={setZoom} items={ui.pages} />
            ) : ui.screens?.length > 0 ? (
              <div className="screens-grid">
                {ui.screens.map((id, i) => (
                  <Shot
                    shots={data.shots}
                    onZoom={setZoom}
                    id={id}
                    label={`[ Screen ${i + 1} ]`}
                    key={id}
                  />
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* ============================ RESULTS / IMPACT ============================ */}
        {/* Ordre voulu : les CHIFFRES d'abord (juste sous le titre), le récit
            ensuite, puis les `targets` de cadrage confrontées au réel et la
            `note` de lecture honnête.
            Les métriques passent avant le chapô pour une raison concrète : en
            arrivant par la nav, le scroll s'arrête sur le filet de la section,
            et un chapô de 3 à 4 lignes repoussait les cartes sous la ligne de
            flottaison sur les écrans peu hauts. Dans une section « Results »,
            les chiffres sont de toute façon l'information principale. */}
        {results && (
          <section className="section" id="results">
            <div className="section-head">
              <h2>{results.eyebrow}</h2>
              {results.idx && <span className="section-idx">{results.idx}</span>}
            </div>

            {results.metrics?.length > 0 && (
              <div className="cs-metrics is-lead">
                {results.metrics.map((m, i) => (
                  <div className="metric reveal" data-d={i % 3 || undefined} key={i}>
                    <div className="metric__k">{m.k}</div>
                    <div className="metric__flow">
                      {m.from && (
                        <>
                          <span className="metric__from">{m.from}</span>
                          <span className="metric__ar" aria-hidden="true">
                            →
                          </span>
                        </>
                      )}
                      <span className="metric__to">{m.to}</span>
                    </div>
                    {m.delta && <span className="metric__delta">{m.delta}</span>}
                    {m.note && <p className="metric__note">{m.note}</p>}
                  </div>
                ))}
              </div>
            )}

            {(results.lede || results.body) && (
              <div className="cs-lede is-after" data-reveal="">
                {results.lede && (
                  <h3>
                    <RichText text={results.lede} />
                  </h3>
                )}
                {results.body && (
                  <div className="body">
                    {results.body.map((p, i) => (
                      <p key={i}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {results.targets?.length > 0 && (
              <div className="cs-targets">
                <h4 className="cs-targets__lab">{results.targetsLabel || cs.targets}</h4>
                <ul className="cs-targets__list">
                  {results.targets.map((t, i) => {
                    const state = t.state || 'nodata'
                    const mark = state === 'hit' ? '✓' : state === 'missed' ? '✕' : '–'
                    const lab =
                      state === 'hit' ? cs.stHit : state === 'missed' ? cs.stMissed : cs.stNoData
                    return (
                      <li
                        className={`target-row reveal is-${state}`}
                        data-d={i % 3 || undefined}
                        key={i}
                      >
                        <span className="target-mark" aria-hidden="true">
                          {mark}
                        </span>
                        <div className="target-text">
                          <h5>
                            {t.name} {t.goal && <span className="target-goal">{t.goal}</span>}
                          </h5>
                          {t.note && <p>{t.note}</p>}
                        </div>
                        <span className="target-state mono">{lab}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {results.note && (
              <div className="cs-insight reveal">
                <div className="mk">{results.noteLabel || cs.measured}</div>
                <p>
                  <RichText text={results.note} />
                </p>
              </div>
            )}
          </section>
        )}

        {/* ===================== OUTCOME (bilan, reste en bas) ===================== */}
        {/* Sans lien embarquable, le champ `prototype` sert de note de clôture
            « Outcome / In hindsight » : elle garde sa place en fin de récit. */}
        {prototype && !liveProto && (
          <section className="section topo-bg" id="prototype">
            <div className="section-head">
              <h2>{prototype.eyebrow}</h2>
              {prototype.idx && <span className="section-idx">{prototype.idx}</span>}
            </div>
            {prototype.note && (
              <div className="proto-note">
                <span className="mk">💡</span>
                <p>
                  <RichText text={prototype.note} />
                </p>
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
              <div className="cs-lede" data-reveal="">
                {roadmap.lede && (
                  <h3>
                    <RichText text={roadmap.lede} />
                  </h3>
                )}
                {roadmap.body && (
                  <div className="body">
                    {roadmap.body.map((p, i) => (
                      <p key={i}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
            {roadmap.items?.length > 0 && (
              <ul className="roadmap-list">
                {roadmap.items.map((it, i) => {
                  const state = it.state || 'planned'
                  const mark = state === 'done' ? '✓' : state === 'building' ? '◐' : '○'
                  const lab =
                    state === 'done'
                      ? cs.stShipped
                      : state === 'building'
                        ? cs.stBuilding
                        : cs.stPlanned
                  return (
                    <li
                      className={`roadmap-row reveal is-${state}`}
                      data-d={i % 3 || undefined}
                      key={i}
                    >
                      <span className="roadmap-mark" aria-hidden="true">
                        {mark}
                      </span>
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

        {/* ============================ GALLERY (concept UI) ============================ */}
        {data.gallery?.length > 0 && (
          <section className="section" id="gallery">
            <div className="cs-gallery">
              {data.gallery.map((g, i) => (
                <figure
                  className="cs-gallery__item reveal"
                  data-d={i % 2 || undefined}
                  key={g.src || i}
                >
                  <button
                    type="button"
                    className="cs-gallery__open"
                    onClick={() => setZoom(g)}
                    aria-label={`Open ${g.name} preview`}
                  >
                    <img src={g.src} alt={g.name} loading="lazy" />
                  </button>
                  <figcaption>
                    <span className="n">{g.name}</span>
                    {g.sub && <span className="s">{g.sub}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ============================ NEXT ============================ */}
      <section className="cs-next">
        <span className="lab">{cs.nextUp}</span>
        <a className="big" href="#work" onClick={(e) => goHome(e, 'work')}>
          {cs.backAll}{' '}
          <span className="ar" aria-hidden="true">
            ↗
          </span>
        </a>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="footer">
        <p>
          © 2026 {profile.name}, {profile.role}
        </p>
        {data.footer && <p>{data.footer}</p>}
        <a className="to-top" href="#top" onClick={toTop}>
          {cs.backTop} <span aria-hidden="true">↑</span>
        </a>
      </footer>

      {/* ============================ LIGHTBOX (gallery preview) ============================ */}
      {/* Clic sur le fond = fermer. Clic sur l'image = zoom (taille réelle,
          scrollable) pour lire une page en détail. Échap ferme. */}
      {zoom && (
        <div
          ref={stageRef}
          data-lenis-prevent
          className={`cs-lightbox${zoomed ? ' is-zoomed' : ''}`}
          onClick={() => setZoom(null)}
          onPointerDown={onPanDown}
          onPointerMove={onPanMove}
          onPointerUp={onPanEnd}
          onPointerLeave={onPanEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`${zoom.name} preview`}
        >
          <button
            className="cs-lightbox__close"
            onClick={() => setZoom(null)}
            aria-label="Close preview"
          >
            ✕
          </button>
          <img
            src={zoom.src}
            alt={zoom.name}
            draggable="false"
            onClick={(e) => {
              e.stopPropagation()
              if (moved.current) {
                moved.current = false
                return
              } // c'était un pan, pas un clic
              setZoomed((v) => !v)
            }}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
          />
        </div>
      )}
    </div>
  )
}
