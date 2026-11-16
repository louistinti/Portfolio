// ──────────────────────────────────────────────────────────────
//  SEO / lisibilité IA : métadonnées de chaque page.
//  Source unique, utilisée :
//    · au build par scripts/prerender.mjs (balises <head> + JSON-LD
//      écrites dans le HTML statique de chaque URL) ;
//    · dans le navigateur par useHead (titre, description, canonical
//      mis à jour lors d'une navigation sans rechargement).
//  Tout le texte vient des données existantes (site.js, ui.js…).
// ──────────────────────────────────────────────────────────────
import { bundles } from './hooks/useLang.jsx'
import { LANGS, pathFor } from './hooks/useRoute.js'

// Domaine de production (sert aux URL absolues : canonical, sitemap, OG).
export const SITE_URL = 'https://louistdesign.me'

export const abs = (path) => SITE_URL + path

// Retire la syntaxe RichText (**gras**, *accent*) pour du texte brut.
export const plain = (s = '') => s.replace(/\*+/g, '').trim()

// Les SVG ne sont pas acceptés comme image d'aperçu (LinkedIn, Slack…).
const ogImage = (src, fallback) => abs(src && !src.endsWith('.svg') ? src : fallback)

export function pageMeta(lang, slug = 'home') {
  const c = bundles[lang]
  const { profile, ui } = c
  const isHome = slug === 'home'
  const study = isHome ? null : c.caseStudies[slug]
  const project = isHome ? null : c.projects.find((p) => p.slug === slug)
  const siteName = `${profile.name}, ${profile.role}`

  const name = study ? project?.name || study.name : null
  return {
    lang,
    slug,
    path: pathFor(lang, slug),
    alternates: Object.fromEntries(LANGS.map((l) => [l, pathFor(l, slug)])),
    siteName,
    title: isHome ? siteName : `${name} | ${siteName}`,
    description: isHome
      ? plain(ui.hero.sub)
      : plain(project?.tldr || study.context?.lede || study.title),
    image: ogImage(project?.cover, profile.photo),
    type: isHome ? 'profile' : 'article',
    name,
    headline: study ? plain(study.title) : null,
    category: project?.cat || null,
  }
}

// ── JSON-LD (schema.org) ─────────────────────────────────────
function personLd(lang) {
  const { profile, contactLinks, skills } = bundles[lang]
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL + '/',
    email: `mailto:${profile.email}`,
    image: abs(profile.photo),
    address: { '@type': 'PostalAddress', addressLocality: 'Nantes', addressCountry: 'FR' },
    sameAs: contactLinks.filter((l) => l.href.startsWith('http')).map((l) => l.href),
    // Prise de rendez-vous : le lien Calendly ne vit que dans la modale
    // (rendue au clic), on le déclare ici pour les robots.
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business inquiries',
      email: profile.email,
      url: profile.calendly,
      availableLanguage: ['en', 'fr'],
    },
    knowsAbout: skills.map((s) => s.n),
  }
}

export function jsonLd(meta) {
  const c = bundles[meta.lang]
  const person = personLd(meta.lang)
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL + '/',
    name: meta.siteName,
    inLanguage: LANGS,
    author: { '@id': person['@id'] },
  }

  if (meta.slug === 'home') {
    const works = c.projects
      .filter((p) => p.slug && c.caseStudies[p.slug])
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          url: abs(pathFor(meta.lang, p.slug)),
          description: plain(p.tldr),
          genre: p.cat,
        },
      }))
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        website,
        {
          '@type': 'ProfilePage',
          url: abs(meta.path),
          name: meta.title,
          description: meta.description,
          inLanguage: meta.lang,
          mainEntity: { '@id': person['@id'] },
        },
        { '@type': 'ItemList', name: c.ui.work.title, itemListElement: works },
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      website,
      {
        '@type': 'CreativeWork',
        name: meta.name,
        headline: meta.headline,
        description: meta.description,
        url: abs(meta.path),
        image: meta.image,
        inLanguage: meta.lang,
        genre: meta.category,
        author: { '@id': person['@id'] },
        creator: { '@id': person['@id'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: meta.siteName, item: abs(pathFor(meta.lang)) },
          { '@type': 'ListItem', position: 2, name: meta.name, item: abs(meta.path) },
        ],
      },
    ],
  }
}

// ── Balises <head> (pré-rendu) ───────────────────────────────
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export function headTags(meta, { noindex = false } = {}) {
  const locale = { en: 'en_US', fr: 'fr_FR' }
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${abs(meta.path)}" />`,
  ]
  if (!noindex) {
    for (const [l, p] of Object.entries(meta.alternates))
      tags.push(`<link rel="alternate" hreflang="${l}" href="${abs(p)}" />`)
    tags.push(`<link rel="alternate" hreflang="x-default" href="${abs(meta.alternates.en)}" />`)
  }
  tags.push(
    `<link rel="alternate" type="text/markdown" title="llms.txt" href="/llms.txt" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(meta.siteName)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${abs(meta.path)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta property="og:locale" content="${locale[meta.lang]}" />`,
    ...LANGS.filter((l) => l !== meta.lang).map(
      (l) => `<meta property="og:locale:alternate" content="${locale[l]}" />`,
    ),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${JSON.stringify(jsonLd(meta)).replace(/</g, '\\u003c')}</script>`,
  )
  return tags.join('\n    ')
}

// ── Mise à jour côté navigateur (navigation sans rechargement) ──
export function applyHead(meta) {
  document.title = meta.title
  document.documentElement.lang = meta.lang
  const set = (selector, attr, value) => {
    const el = document.head.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }
  set('meta[name="description"]', 'content', meta.description)
  set('link[rel="canonical"]', 'href', abs(meta.path))
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:url"]', 'content', abs(meta.path))
}
