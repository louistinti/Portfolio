// Génère le portfolio PDF (document dédié, pas une impression du site).
//
//   node scripts/build-portfolio-pdf.mjs            → export/Louis-Tintillier-Portfolio-FR.pdf
//   node scripts/build-portfolio-pdf.mjs --lang en  → version anglaise
//   node scripts/build-portfolio-pdf.mjs --html     → n'écrit que le HTML (export/portfolio-<lang>.html)
//
// Contenu : une couverture (nom, rôle, présentation), puis les 6 premiers
// projets de src/data/site*.js, chacun sur 2 à 3 pages, à partir des données
// des études de cas (src/data/case-studies). Chrome headless imprime le HTML
// en A4 ; scripts/pdf-shrink.py (PyMuPDF, optionnel) recompresse les images.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'fr'
const htmlOnly = args.includes('--html')
const COUNT = 6

const content = await import(lang === 'fr' ? '../src/data/content.fr.js' : '../src/data/content.js')
const { profile, projects, caseStudies, ui } = content

// Libellés propres au PDF (le reste vient des données, déjà localisées).
const T = {
  fr: {
    portfolio: 'Portfolio, 2026',
    tldr: 'En bref',
    screens: 'Écrans',
    features: 'Ce qui a été conçu',
    outcome: 'Bilan',
    footer: 'Louis Tintillier · Product Designer · Portfolio 2026',
    contact: 'Contact',
  },
  en: {
    portfolio: 'Portfolio, 2026',
    tldr: 'In short',
    screens: 'Screens',
    features: 'What was designed',
    outcome: 'Outcome',
    footer: 'Louis Tintillier · Product Designer · Portfolio 2026',
    contact: 'Contact',
  },
}[lang]

// Couleur d'accent par projet, lisible sur fond blanc (les accents du site
// sont calés pour un fond sombre : le jaune Renault ou le vert Charentaise
// ne tiennent pas sur du papier).
const PRINT_ACCENT = {
  'paris-saclay': '#840051',
  garence: '#c8001a',
  'candidate-list': '#c8001a',
  renault: '#8a6a00',
  charentaise: '#2f5740',
  'learning-leagues': '#a8661a',
}

// Captures mobiles : montrées entières, côte à côte, plutôt que recadrées.
// Captures web larges : empilées, une par ligne, sur leur propre page.
const VISUAL_LAYOUT = { 'paris-saclay': 'phones', renault: 'stack' }
// Couvertures larges à montrer entières (fond = couleur du site capturé).
const COVER_FIT = { 'learning-leagues': 'contain; background: #070a14' }

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Mini rich-text du site (cf. RichText.jsx) : **gras**, *accent*, `touche`,
// [libellé](url) → lien cliquable dans le PDF.
const rich = (text) =>
  text == null
    ? ''
    : String(text)
        .split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g)
        .map((p) => {
          const link = p.startsWith('[') && p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
          if (link) return `<a href="${esc(link[2])}">${esc(link[1])}</a>`
          if (p.startsWith('**') && p.endsWith('**'))
            return `<strong>${esc(p.slice(2, -2))}</strong>`
          if (p.startsWith('*') && p.endsWith('*'))
            return `<em class="ac">${esc(p.slice(1, -1))}</em>`
          if (p.startsWith('`') && p.endsWith('`')) return `<kbd>${esc(p.slice(1, -1))}</kbd>`
          return esc(p)
        })
        .join('')

// `/assets/x.png` → URL file:// vers public/, pour que Chrome charge les images.
const asset = (p) => (p ? pathToFileURL(path.join(ROOT, 'public', p)).href : '')

const paras = (arr, cls = '') =>
  (arr || []).map((p) => `<p${cls ? ` class="${cls}"` : ''}>${rich(p)}</p>`).join('')

// Corps de section : deux colonnes dès deux paragraphes, sinon pleine largeur.
const bodyBlock = (arr) =>
  `<div class="${(arr || []).length > 1 ? 'cols' : 'one'}">${paras(arr)}</div>`

const section = (eyebrow, idx, inner, cls = '') => `
  <section class="sec ${cls}">
    <div class="sec-head"><span class="eyebrow">${esc(eyebrow)}</span>${idx ? `<span class="idx">${esc(idx)}</span>` : ''}</div>
    ${inner}
  </section>`

// Visuels d'un projet : jusqu'à 4 images, selon ce que l'étude de cas fournit.
function visuals(cs) {
  const s = cs.shots || {}
  let list = []
  if (cs.ui?.screens) list = cs.ui.screens.map((k) => ({ src: s[k], cap: '' }))
  else if (cs.ui?.pages)
    list = cs.ui.pages.map((p) => ({ src: s[p.preview] || s[p.shot], cap: p.cap }))
  else if (cs.gallery) list = cs.gallery.map((g) => ({ src: g.src, cap: g.name }))
  return list.filter((v) => v.src).slice(0, 4)
}

function projectHtml(p, cs) {
  const accent = PRINT_ACCENT[p.slug] || cs.theme?.['--accent'] || '#2f5fe0'
  const meta = (cs.meta || [])
    .map((m) => `<div><dt>${esc(m.k)}</dt><dd>${esc(m.v)}</dd></div>`)
    .join('')
  const stats = (cs.context?.stats || [])
    .map(
      (st) =>
        `<div class="stat"><div class="v">${esc(st.v)}${st.u ? `<span class="u">${esc(st.u)}</span>` : ''}</div><p>${esc(st.k)}</p></div>`,
    )
    .join('')

  // ---- Page 1 : couverture du projet
  const cover = `
  <section class="proj-cover" style="--pa:${accent}">
    <div class="cover-img"${COVER_FIT[p.slug] ? ` style="object-fit: ${COVER_FIT[p.slug]}"` : ''}><img src="${asset(p.cover)}" alt=""></div>
    <div class="kicker"><span class="num">${esc(p.idx)}</span><span>${esc(p.cat)}</span><span class="dot">·</span><span>${esc(p.year)}</span></div>
    <h2 class="title">${rich(cs.title)}</h2>
    <dl class="meta">${meta}</dl>
    <div class="tldr"><span class="eyebrow">${T.tldr}</span><p>${esc(p.tldr)}</p></div>
    ${stats ? `<div class="stats">${stats}</div>` : ''}
  </section>`

  // ---- Visuels (en fin de page 3, là où il reste le plus souvent de la place)
  const vis = visuals(cs)
  const layout = VISUAL_LAYOUT[p.slug] || ''
  const figs = vis
    .map(
      (v) =>
        `<figure><img src="${asset(v.src)}" alt="">${v.cap ? `<figcaption>${esc(v.cap)}</figcaption>` : ''}</figure>`,
    )
    .join('')

  // ---- Page 2 : contexte, défi, recherche
  const ctx = cs.context
  const ch = cs.challenge
  const rs = cs.research
  const topo = cs.topography
  const page2 = `
  <section class="proj-body" style="--pa:${accent}">
    ${section(ctx.eyebrow, '', `<h3 class="lede">${rich(ctx.lede)}</h3>${bodyBlock(ctx.body)}`)}
    ${ch ? `<blockquote class="quote">${rich(ch.quote)}</blockquote>` : ''}
    ${
      rs
        ? section(
            rs.eyebrow,
            rs.idx,
            `<h3 class="lede">${rich(rs.lede)}</h3>${bodyBlock(rs.body)}${
              rs.insight
                ? `<div class="insight"><span class="eyebrow">Insight</span><p>${rich(rs.insight)}</p></div>`
                : ''
            }`,
          )
        : ''
    }
    ${topo ? `<div class="signature"><span class="eyebrow">${esc(topo.eyebrow)}</span><h4>${rich(topo.title)}</h4><p>${rich(topo.body)}</p></div>` : ''}
  </section>`

  // ---- Page 3 : design, features, geste signature, résultats, bilan
  const id = cs.ideation
  const res = cs.results
  const proto = cs.prototype
  const outcomeNote = proto && !proto.src && !proto.href ? proto.note : null
  const features = (id?.features || [])
    .map(
      (f) =>
        `<div class="feat"><span class="fid">${esc(f.id)}</span><strong>${esc(f.name)}</strong><p>${esc(f.desc)}</p></div>`,
    )
    .join('')
  const metrics = (res?.metrics || [])
    .map(
      (m) =>
        `<div class="metric"><span class="k">${esc(m.k)}</span><div class="flow">${
          m.from ? `<span class="from">${esc(m.from)}</span><span class="ar">→</span>` : ''
        }<span class="to">${esc(m.to)}</span>${m.delta ? `<span class="delta">${esc(m.delta)}</span>` : ''}</div>${
          m.note ? `<p>${esc(m.note)}</p>` : ''
        }</div>`,
    )
    .join('')
  const targets = (res?.targets || [])
    .map(
      (t) =>
        `<li class="t-${t.state}"><span class="tn">${esc(t.name)}</span><span class="tg">${esc(t.goal)}</span><span class="ts"></span></li>`,
    )
    .join('')

  const page3 = `
  <section class="proj-body" style="--pa:${accent}">
    ${
      id
        ? section(
            id.eyebrow,
            id.idx,
            `<h3 class="lede">${rich(id.lede)}</h3>${bodyBlock(id.body)}${
              features ? `<div class="features">${features}</div>` : ''
            }`,
          )
        : ''
    }
    ${
      res
        ? section(
            res.eyebrow,
            res.idx,
            `${metrics ? `<div class="metrics${(res.metrics || []).length === 4 ? ' m4' : ''}">${metrics}</div>` : ''}<h3 class="lede">${rich(res.lede)}</h3>${bodyBlock(res.body)}${
              targets
                ? `<div class="targets"><span class="eyebrow">${esc(res.targetsLabel || '')}</span><ul>${targets}</ul></div>`
                : ''
            }${res.note ? `<div class="note"><span class="eyebrow">${esc(res.noteLabel || '')}</span><p>${rich(res.note)}</p></div>` : ''}`,
            'results',
          )
        : ''
    }
    ${outcomeNote ? `<div class="outcome"><span class="eyebrow">${esc(proto.eyebrow || T.outcome)}</span><p>${rich(outcomeNote)}</p></div>` : ''}
    ${figs ? `<div class="screens ${layout}"><span class="eyebrow">${T.screens}</span><div class="grid g${vis.length}">${figs}</div></div>` : ''}
  </section>`

  return cover + page2 + page3
}

const heroSub = ui.hero.sub
// Liens de la couverture (PDF uniquement, pas repris du site).
const COVER_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/louis-tintillier-874373150/' },
  { label: 'GitHub', href: 'https://github.com/louistinti' },
  { label: 'louistdesign.me', href: 'https://louistdesign.me' },
]
const coverLinks = COVER_LINKS.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('')

const coverPage = `
<section class="cover">
  <div class="cover-top"><span class="mono">${esc(T.portfolio)}</span><span class="mono">${esc(profile.location)}</span></div>
  <div class="cover-mid">
    <h1>${esc(profile.name)}</h1>
    <p class="role">${esc(profile.role)}</p>
    <p class="intro">${rich(heroSub)}</p>
  </div>
  <div class="cover-links">${coverLinks}</div>
</section>`

const selected = projects.slice(0, COUNT).filter((p) => caseStudies[p.slug])
const body = coverPage + selected.map((p) => projectHtml(p, caseStudies[p.slug])).join('')

const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(profile.name)} · Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page {
    size: A4; margin: 16mm 16mm 18mm;
    @bottom-left { content: '${esc(T.footer)}'; font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: #74746f; }
    @bottom-right { content: counter(page) ' / ' counter(pages); font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; letter-spacing: 0.14em; color: #74746f; }
  }
  @page :first { @bottom-left { content: none; } @bottom-right { content: none; } }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  :root {
    --fg: #111110; --body: #3a3a37; --muted: #74746f; --line: #e2e0da; --bg-1: #f5f4f0;
    --accent: #2f5fe0; --pa: var(--accent);
    --display: 'Space Grotesk', 'Inter', sans-serif; --sans: 'Inter', sans-serif; --mono: 'JetBrains Mono', monospace;
  }
  html, body { margin: 0; padding: 0; background: #fff; color: var(--fg); font-family: var(--sans); font-size: 9.6pt; line-height: 1.5; }
  p { margin: 0 0 6pt; color: var(--body); text-wrap: pretty; }
  strong { color: var(--fg); font-weight: 600; }
  em.ac { font-style: normal; color: var(--pa); }
  a { color: var(--pa); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em; }
  kbd { font-family: var(--mono); font-size: 0.85em; border: 1px solid var(--line); border-radius: 3px; padding: 0 3px; }
  .mono, .eyebrow, .idx, .kicker, dt, .fid, .k { font-family: var(--mono); font-size: 7pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); font-weight: 500; }
  .eyebrow { color: var(--pa); display: block; margin-bottom: 4pt; }

  /* ---- couverture */
  .cover { height: 263mm; display: flex; flex-direction: column; justify-content: space-between; break-after: page; }
  .cover-top { display: flex; justify-content: space-between; }
  .cover h1 { font-family: var(--display); font-weight: 700; font-size: 40pt; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin: 0 0 8pt; }
  .cover .role { font-family: var(--mono); font-size: 9pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin: 0 0 18pt; }
  .cover .intro { font-size: 13pt; line-height: 1.45; max-width: 120mm; color: var(--fg); margin: 0; }
  .cover-links { display: flex; gap: 18pt; }
  .cover-links a { font-family: var(--mono); font-size: 7.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg); text-decoration: none; border-bottom: 1px solid var(--line); padding-bottom: 2pt; }
  .cover em.ac { color: var(--accent); }

  /* ---- page projet 1 */
  .proj-cover { break-before: page; break-after: page; height: 263mm; display: flex; flex-direction: column; }
  .cover-img { height: 108mm; overflow: hidden; border-radius: 3pt; background: var(--bg-1); flex: none; object-fit: cover; }
  .cover-img img { width: 100%; height: 100%; object-fit: inherit; background: inherit; object-position: top; display: block; }
  .kicker { display: flex; gap: 8pt; align-items: center; margin: 12pt 0 6pt; }
  .kicker .num { color: var(--pa); }
  .kicker .dot { color: var(--line); }
  .title em.ac { white-space: nowrap; }
  .title { font-family: var(--display); font-weight: 700; font-size: 22pt; line-height: 1.05; letter-spacing: -0.01em; text-transform: uppercase; margin: 0 0 12pt; max-width: 165mm; }
  .meta { display: flex; flex-wrap: wrap; gap: 6pt 22pt; margin: 0 0 12pt; padding: 8pt 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .meta div { min-width: 34mm; }
  .meta dt { display: block; margin-bottom: 2pt; }
  .meta dd { margin: 0; font-size: 9pt; font-weight: 500; }
  .tldr p { font-size: 10.5pt; line-height: 1.45; color: var(--fg); max-width: 160mm; }
  .stats { margin-top: 16pt; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12pt; border-top: 1px solid var(--line); padding-top: 10pt; }
  .stat .v { font-family: var(--display); font-weight: 600; font-size: 24pt; line-height: 1; letter-spacing: -0.02em; margin-bottom: 4pt; }
  .stat .u { font-size: 11pt; color: var(--pa); margin-left: 2pt; }
  .stat p { font-size: 8pt; color: var(--muted); margin: 0; line-height: 1.4; }

  /* ---- pages texte */
  .proj-body { break-before: page; }
  .sec { margin-bottom: 14pt; }
  .sec-head { display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--fg); padding-top: 6pt; margin-bottom: 6pt; break-after: avoid; }
  .sec-head .eyebrow { margin: 0; }
  .lede { font-family: var(--display); font-weight: 600; font-size: 14pt; line-height: 1.2; letter-spacing: -0.01em; margin: 0 0 8pt; max-width: 165mm; break-after: avoid; }
  .cols { column-count: 2; column-gap: 8mm; }
  .cols p { break-inside: avoid; }
  .one { max-width: 165mm; }
  .quote { font-family: var(--display); font-weight: 600; font-size: 13pt; line-height: 1.25; margin: 0 0 14pt; padding: 10pt 12pt; border-left: 2px solid var(--pa); background: var(--bg-1); break-inside: avoid; }
  .insight, .note, .outcome, .signature { background: var(--bg-1); padding: 9pt 11pt; border-radius: 3pt; margin: 4pt 0 10pt; break-inside: avoid; }
  .insight p, .note p, .outcome p { margin: 0; color: var(--fg); }
  .signature h4 { font-family: var(--display); font-weight: 600; font-size: 12pt; line-height: 1.2; margin: 0 0 5pt; }
  .signature p { margin: 0; }
  .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8pt 10pt; margin: 6pt 0 4pt; }
  .feat { border-top: 1px solid var(--line); padding-top: 5pt; break-inside: avoid; }
  .feat .fid { display: block; margin-bottom: 2pt; }
  .feat strong { display: block; font-size: 9pt; margin-bottom: 2pt; }
  .feat p { font-size: 8pt; color: var(--muted); margin: 0; line-height: 1.4; }
  .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10pt; margin: 4pt 0 12pt; }
  .metrics.m4 { grid-template-columns: repeat(4, 1fr); }
  .metric { border-top: 1px solid var(--line); padding-top: 5pt; break-inside: avoid; }
  .metric .k { display: block; margin-bottom: 3pt; }
  .metric .flow { display: flex; align-items: baseline; gap: 5pt; flex-wrap: wrap; }
  .metric .from { color: var(--muted); font-size: 10pt; text-decoration: line-through; }
  .metric .ar { color: var(--muted); font-size: 9pt; }
  .metric .to { font-family: var(--display); font-weight: 600; font-size: 20pt; line-height: 1; letter-spacing: -0.02em; }
  .metric .delta { font-family: var(--mono); font-size: 7.5pt; color: var(--pa); }
  .metric p { font-size: 8pt; color: var(--muted); margin: 3pt 0 0; line-height: 1.4; }
  .targets { margin: 0 0 10pt; }
  .targets ul { list-style: none; margin: 0; padding: 0; }
  .targets li { display: flex; align-items: center; gap: 8pt; padding: 4pt 0; border-top: 1px solid var(--line); font-size: 8.5pt; }
  .targets .tn { flex: 1; }
  .targets .tg { font-family: var(--mono); font-size: 7.5pt; color: var(--muted); }
  .targets .ts { font-family: var(--mono); font-size: 7pt; letter-spacing: 0.12em; text-transform: uppercase; min-width: 18mm; text-align: right; }
  .t-hit .ts::after { content: '${lang === 'fr' ? 'Atteint' : 'Hit'}'; color: #1f7a3f; }
  .t-missed .ts::after { content: '${lang === 'fr' ? 'Non atteint' : 'Not met'}'; color: #b3261e; }
  .t-nodata .ts::after { content: '${lang === 'fr' ? 'Non mesuré' : 'No data'}'; color: var(--muted); }
  .screens { margin-top: 8pt; break-inside: avoid; }
  .screens .grid { display: grid; gap: 8pt; grid-template-columns: repeat(2, 1fr); }
  .screens .grid.g3 { grid-template-columns: repeat(3, 1fr); }
  .screens figure { margin: 0; border: 1px solid var(--line); border-radius: 3pt; overflow: hidden; background: var(--bg-1); }
  .screens img { width: 100%; height: 56mm; object-fit: cover; object-position: top; display: block; }
  .screens .g3 img { height: 38mm; }
  .screens.stack { break-before: page; }
  .screens.stack .grid { grid-template-columns: 1fr; gap: 5pt; }
  .screens.stack figure { border: 0; background: none; text-align: center; }
  .screens.stack img { width: 110mm; height: auto; margin: 0 auto; border: 1px solid var(--line); border-radius: 3pt; }
  .screens.stack figcaption { padding: 4pt 0 0; }
  .screens.phones .grid { grid-template-columns: repeat(4, 1fr); }
  .screens.phones figure { border: 0; background: none; }
  .screens.phones img { height: 82mm; object-fit: contain; object-position: top; border: 1px solid var(--line); border-radius: 3pt; }
  .screens figcaption { font-family: var(--mono); font-size: 7pt; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); padding: 4pt 6pt; }

</style>
</head>
<body>
${body}
</body>
</html>`

const outDir = path.join(ROOT, 'export')
mkdirSync(outDir, { recursive: true })
const htmlPath = path.join(outDir, `portfolio-${lang}.html`)
writeFileSync(htmlPath, html, 'utf8')
console.log(`HTML : ${htmlPath}`)
if (htmlOnly) process.exit(0)

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find(existsSync)
if (!CHROME) {
  console.error('Chrome introuvable.')
  process.exit(1)
}
const pdfPath = path.join(outDir, `Louis-Tintillier-Portfolio-${lang.toUpperCase()}.pdf`)
const profileDir = mkdtempSync(path.join(tmpdir(), 'pf-chrome-'))
const r = spawnSync(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { stdio: 'ignore', timeout: 180000 },
)
rmSync(profileDir, { recursive: true, force: true })
if (r.status !== 0 || !existsSync(pdfPath)) {
  console.error('Impression Chrome échouée.')
  process.exit(1)
}
console.log(`PDF  : ${pdfPath}`)

// Recompression des images (optionnelle : PyMuPDF requis).
const shrink = spawnSync('python', [path.join(ROOT, 'scripts', 'pdf-shrink.py'), pdfPath], {
  stdio: 'inherit',
  env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
})
if (shrink.status !== 0) console.log('(images non recompressées : python + pymupdf absents)')
