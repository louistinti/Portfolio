// ──────────────────────────────────────────────────────────────
//  PRÉ-RENDU STATIQUE (lancé par `npm run build`, après les builds Vite)
//
//  Pour chaque page (accueil + études de cas, en EN et FR) on écrit un vrai
//  fichier HTML contenant tout le texte, les liens et les métadonnées :
//  Google et les IA (qui n'exécutent pas le JS) lisent le portfolio en entier.
//  React reprend ensuite la main dans le navigateur (hydratation).
//
//  Génère aussi : sitemap.xml, robots.txt, llms.txt, llms-full.txt
//  (+ fr/llms-full.txt) et 404.html.
// ──────────────────────────────────────────────────────────────
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, bundles, LANGS, pathFor, pageMeta, headTags, abs, plain, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->') || !template.includes('<!--head:start-->'))
  throw new Error('index.html : marqueurs <!--app-html--> / <!--head:start--> introuvables')

const fileFor = (path) => join(dist, path, 'index.html')

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content, 'utf8')
}

function page(meta, html, opts) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${meta.lang}">`)
    .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, headTags(meta, opts))
    .replace('<!--app-html-->', html)
}

// ── HTML rendu → texte markdown (pour llms-full.txt) ─────────
const entities = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  '#x27': "'",
  '#39': "'",
}
function toMarkdown(html) {
  const main = (html.match(/<main[^>]*>([\s\S]*)<\/main>/) || [null, html])[1]
  return main
    .replace(/<(script|style|svg|iframe|button)[\s\S]*?<\/\1>/g, '')
    .replace(/<h([1-4])[^>]*>/g, (_, n) => `\n\n${'#'.repeat(Number(n) + 1)} `)
    .replace(/<\/h[1-4]>/g, '\n\n')
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<(p|div|section|figure|figcaption|header|ul|ol|tr|blockquote)[^>]*>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/(span|td|th|dt|dd)>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x27|#39|[a-z]+);/g, (m, e) => entities[e] ?? m)
    .split('\n')
    .map((l) =>
      l
        .replace(/[ \t]+/g, ' ')
        .replace(/ ([,.;:)])/g, '$1')
        .trim(),
    )
    .join('\n')
    .replace(/\n(- )?\n(?=- )/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ── Pages ────────────────────────────────────────────────────
const slugs = Object.keys(bundles.en.caseStudies)
const pages = LANGS.flatMap((lang) => ['home', ...slugs].map((slug) => ({ lang, slug })))
// Études de cas retirées de la grille (plus aucune carte n'y mène) : leur
// page reste générée, mais on ne la signale plus aux robots (sitemap,
// llms-full.txt).
const listed = new Set(bundles.en.projects.map((p) => p.slug).filter(Boolean))
const isListed = (slug) => slug === 'home' || listed.has(slug)
const rendered = {}

for (const { lang, slug } of pages) {
  const meta = pageMeta(lang, slug)
  const html = render(meta.path)
  rendered[`${lang}:${slug}`] = html
  await write(fileFor(meta.path), page(meta, html))
}

// 404 : l'accueil, non indexable (Vercel sert 404.html avec le bon statut).
{
  const meta = pageMeta('en', 'home')
  await write(join(dist, '404.html'), page(meta, rendered['en:home'], { noindex: true }))
}

// ── sitemap.xml ──────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const urls = pages.filter(({ slug }) => isListed(slug)).map(({ lang, slug }) => {
  const meta = pageMeta(lang, slug)
  const alts = Object.entries(meta.alternates)
    .map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(p)}"/>`)
    .join('\n')
  return `  <url>
    <loc>${abs(meta.path)}</loc>
    <lastmod>${today}</lastmod>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(meta.alternates.fr)}"/>
  </url>`
})
await write(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
)

// ── robots.txt : tout est ouvert, robots IA compris ─────────
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]
await write(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

// ── llms.txt (standard llmstxt.org) ─────────────────────────
function caseStudyList(lang) {
  const { projects, caseStudies } = bundles[lang]
  return projects
    .filter((p) => p.slug && caseStudies[p.slug])
    .map(
      (p) => `- [${p.name}](${abs(pathFor(lang, p.slug))}): ${plain(p.tldr)} (${p.cat}, ${p.year})`,
    )
    .join('\n')
}

const en = bundles.en
const fr = bundles.fr
const contact = (c) => {
  const linkedin = c.contactLinks.find((l) => l.href.includes('linkedin'))
  return [
    `- Email: [${c.profile.email}](mailto:${c.profile.email})`,
    linkedin && `- LinkedIn: ${linkedin.href}`,
    `- ${c.ui.modal.book}: ${c.profile.calendly}`,
    `- ${c.ui.contact.cv}: ${abs(c.profile.cv)}`,
  ]
    .filter(Boolean)
    .join('\n')
}

await write(
  join(dist, 'llms.txt'),
  `# ${en.profile.name}, ${en.profile.role}

> ${plain(en.ui.hero.sub)}

${en.profile.location}. ${en.heroChips.join(' · ')}.

${en.ui.about.approach.p}

${en.ui.about.now.p}

Skills: ${en.skills.map((s) => `${s.n} (${s.d})`).join('; ')}.
Tools: ${en.tools.join(', ')}.

## Contact

${contact(en)}

## ${en.ui.work.title}

${caseStudyList('en')}

## Français

- [Portfolio (FR)](${abs(pathFor('fr'))}): ${plain(fr.ui.hero.sub)}
- [${fr.ui.contact.cv}](${abs(fr.profile.cv)})

${caseStudyList('fr')}

## Optional

- [Full text, English](${SITE_URL}/llms-full.txt)
- [Texte intégral, français](${SITE_URL}/fr/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`,
)

// ── llms-full.txt : texte intégral, page par page ───────────
for (const lang of LANGS) {
  const c = bundles[lang]
  const sections = ['home', ...slugs].filter(isListed).map((slug) => {
    const meta = pageMeta(lang, slug)
    return `---\n\n# ${meta.title}\n\nURL: ${abs(meta.path)}\n\n${toMarkdown(rendered[`${lang}:${slug}`])}`
  })
  const head = `# ${c.profile.name}, ${c.profile.role}\n\n> ${plain(c.ui.hero.sub)}\n\n## Contact\n\n${contact(c)}`
  await write(
    join(dist, lang === 'fr' ? 'fr' : '', 'llms-full.txt'),
    `${head}\n\n${sections.join('\n\n')}\n`,
  )
}

await rm(ssrDir, { recursive: true, force: true })
console.log(
  `✓ pré-rendu : ${pages.length} pages + 404, sitemap.xml, robots.txt, llms.txt, llms-full.txt`,
)
