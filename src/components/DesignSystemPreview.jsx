import { useEffect, useState } from 'react'
import '../styles/design-system-preview.css'

// ── Listes des tokens à afficher (noms = ceux de design-system.css) ──
const COLORS = [
  '--color-bg', '--color-bg-1', '--color-bg-2',
  '--color-fg', '--color-muted', '--color-muted-2',
  '--color-accent', '--color-accent-ink',
  '--color-line', '--color-line-2',
]

const FONTS = [
  { token: '--font-display', label: 'Display, Space Grotesk (titres)' },
  { token: '--font-sans', label: 'Sans, Inter (corps & UI)' },
  { token: '--font-mono', label: 'Mono, JetBrains Mono (labels)' },
]

const WEIGHTS = [
  { token: '--fw-regular', n: 'Regular' },
  { token: '--fw-medium', n: 'Medium' },
  { token: '--fw-semibold', n: 'Semibold' },
  { token: '--fw-bold', n: 'Bold' },
  { token: '--fw-black', n: 'Black' },
  { token: '--fw-heavy', n: 'Heavy' },
]

const TYPE_SCALE = [
  '--text-hero', '--text-display', '--text-h2', '--text-statement', '--text-title', '--text-marquee',
  '--text-96', '--text-80', '--text-72', '--text-64', '--text-56', '--text-48',
  '--text-40', '--text-32', '--text-24', '--text-16', '--text-14', '--text-12',
]

const TRACKING = [
  '--tracking-tighter', '--tracking-tight', '--tracking-normal',
  '--tracking-wide', '--tracking-wider', '--tracking-widest',
]

const LEADING = ['--leading-tight', '--leading-snug', '--leading-normal', '--leading-relaxed']

const SPACING = [
  '--space-1', '--space-2', '--space-3', '--space-4', '--space-6',
  '--space-8', '--space-10', '--space-12', '--space-14', '--space-16',
  '--space-18', '--space-20', '--space-24', '--space-32',
]

const LAYOUT_SPACE = ['--pad', '--section-py', '--gap-grid']

const RADII = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-pill', '--radius-full']

const BORDERS = ['--border', '--border-subtle', '--border-strong']

const SHADOWS = ['--shadow-sm', '--shadow-md', '--shadow-lg']

const MOTION = ['--dur-fast', '--dur', '--dur-slow', '--dur-reveal', '--ease', '--ease-in-out']

const ZINDEX = ['--z-base', '--z-card', '--z-nav', '--z-grain']

// Lit la valeur résolue d'une variable CSS sur :root
function useTokens() {
  const [vals, setVals] = useState({})
  useEffect(() => {
    const rs = getComputedStyle(document.documentElement)
    const read = () => {
      const all = [
        ...COLORS, ...FONTS.map((f) => f.token), ...WEIGHTS.map((w) => w.token),
        ...TYPE_SCALE, ...TRACKING, ...LEADING, ...SPACING, ...LAYOUT_SPACE,
        ...RADII, ...BORDERS, ...SHADOWS, ...MOTION, ...ZINDEX,
      ]
      const out = {}
      all.forEach((t) => (out[t] = rs.getPropertyValue(t).trim()))
      setVals(out)
    }
    read()
    // relit après chargement des polices (au cas où) + petit délai HMR
    const id = setTimeout(read, 300)
    return () => clearTimeout(id)
  }, [])
  return vals
}

function Section({ id, title, children }) {
  return (
    <section className="ds-section">
      <h2 className="ds-h2">
        <span className="ds-h2-idx">{id}</span> {title}
      </h2>
      {children}
    </section>
  )
}

export default function DesignSystemPreview() {
  const t = useTokens()

  return (
    <div className="ds">
      <header className="ds-header">
        <p className="ds-eyebrow">Design System, référence vivante</p>
        <h1 className="ds-title">Tokens</h1>
        <p className="ds-lead">
          Aperçu en direct des variables de <code>src/styles/design-system.css</code>. Modifie ce
          fichier : cette page se met à jour automatiquement (hot reload).
        </p>
      </header>

      {/* COULEURS */}
      <Section id="01" title="Couleurs">
        <div className="ds-swatches">
          {COLORS.map((c) => (
            <div className="ds-swatch" key={c}>
              <div className="ds-swatch-chip" style={{ background: `var(${c})` }} />
              <code className="ds-token">{c}</code>
              <span className="ds-val">{t[c]}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHIE */}
      <Section id="02" title="Typographie">
        <h3 className="ds-h3">Familles</h3>
        <div className="ds-stack">
          {FONTS.map((f) => (
            <div className="ds-font-row" key={f.token}>
              <span className="ds-font-sample" style={{ fontFamily: `var(${f.token})` }}>
                Ag, Design that ships. 0123
              </span>
              <div className="ds-font-meta">
                <code className="ds-token">{f.token}</code>
                <span className="ds-val">{f.label}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="ds-h3">Graisses</h3>
        <div className="ds-weights">
          {WEIGHTS.map((w) => (
            <div className="ds-weight" key={w.token} style={{ fontWeight: `var(${w.token})` }}>
              <span>{w.n}</span>
              <code className="ds-token">{w.token} · {t[w.token]}</code>
            </div>
          ))}
        </div>

        <h3 className="ds-h3">Échelle typographique</h3>
        <div className="ds-stack">
          {TYPE_SCALE.map((s) => (
            <div className="ds-type-row" key={s}>
              <span className="ds-type-sample" style={{ fontSize: `var(${s})` }}>
                Aa
              </span>
              <div className="ds-font-meta">
                <code className="ds-token">{s}</code>
                <span className="ds-val">{t[s]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ds-twocol">
          <div>
            <h3 className="ds-h3">Interlettrage</h3>
            {TRACKING.map((s) => (
              <div className="ds-line" key={s} style={{ letterSpacing: `var(${s})` }}>
                <span className="ds-mono-up">TRACKING</span>
                <code className="ds-token">{s} · {t[s]}</code>
              </div>
            ))}
          </div>
          <div>
            <h3 className="ds-h3">Hauteur de ligne</h3>
            {LEADING.map((s) => (
              <div className="ds-leading" key={s}>
                <p style={{ lineHeight: `var(${s})` }}>
                  Texte sur deux lignes pour visualiser l'interligne appliqué ici.
                </p>
                <code className="ds-token">{s} · {t[s]}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ESPACEMENTS */}
      <Section id="03" title="Espacements">
        <div className="ds-stack">
          {SPACING.map((s) => (
            <div className="ds-space-row" key={s}>
              <div className="ds-space-bar" style={{ width: `var(${s})` }} />
              <code className="ds-token">{s}</code>
              <span className="ds-val">{t[s]}</span>
            </div>
          ))}
        </div>
        <h3 className="ds-h3">Espacements de layout (fluides)</h3>
        <div className="ds-stack">
          {LAYOUT_SPACE.map((s) => (
            <div className="ds-space-row" key={s}>
              <div className="ds-space-bar ds-space-bar--accent" style={{ width: `var(${s})` }} />
              <code className="ds-token">{s}</code>
              <span className="ds-val">{t[s]}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* RAYONS */}
      <Section id="04" title="Rayons">
        <div className="ds-boxes">
          {RADII.map((r) => (
            <div className="ds-box-item" key={r}>
              <div className="ds-box" style={{ borderRadius: `var(${r})` }} />
              <code className="ds-token">{r}</code>
              <span className="ds-val">{t[r]}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* BORDURES */}
      <Section id="05" title="Bordures">
        <div className="ds-boxes">
          {BORDERS.map((b) => (
            <div className="ds-box-item" key={b}>
              <div className="ds-box" style={{ border: `var(${b})` }} />
              <code className="ds-token">{b}</code>
              <span className="ds-val">{t[b]}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* OMBRES */}
      <Section id="06" title="Ombres">
        <div className="ds-boxes">
          {SHADOWS.map((s) => (
            <div className="ds-box-item" key={s}>
              <div className="ds-box ds-box--light" style={{ boxShadow: `var(${s})` }} />
              <code className="ds-token">{s}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* MOTION & Z-INDEX */}
      <Section id="07" title="Motion & Z-index">
        <div className="ds-twocol">
          <div>
            <h3 className="ds-h3">Durées & courbes</h3>
            {MOTION.map((m) => (
              <div className="ds-kv" key={m}>
                <code className="ds-token">{m}</code>
                <span className="ds-val">{t[m]}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="ds-h3">Z-index</h3>
            {ZINDEX.map((z) => (
              <div className="ds-kv" key={z}>
                <code className="ds-token">{z}</code>
                <span className="ds-val">{t[z]}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <footer className="ds-footer">
        <a href="/">← Retour au portfolio</a>
        <span>Édite src/styles/design-system.css pour tout changer.</span>
      </footer>
    </div>
  )
}
