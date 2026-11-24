// ──────────────────────────────────────────────────────────────
//  CONTENU DU PORTFOLIO
//  Édite ce fichier pour remplacer les textes / projets placeholder
//  par tes vraies informations. Pas besoin de toucher au code React.
// ──────────────────────────────────────────────────────────────

export const profile = {
  // Nom affiché dans la section About (Details) et le footer
  name: 'Louis Tintillier',
  brand: 'Portfolio', // texte du logo en haut à gauche
  mark: 'LT', // initiales dans le losange du logo
  role: 'Product Designer',
  location: 'Nantes, France',
  email: 'louistdesign@gmail.com',
  cv: '/Louis-Tintillier-CV.pdf', // fichier dans public/
  // Portrait détouré (fond transparent) affiché dans la section About.
  // Vide = placeholder rayé. Dépose un PNG transparent dans public/assets/.
  photo: '/assets/louis.webp',
  // Lien Calendly (modale "Let's talk"). Lien profil = montre tous les events.
  // Pour ouvrir direct le créneau 30 min, ajoute le slug : '.../louistdesign/30min'
  calendly: 'https://calendly.com/louistdesign',
}

// Liens de contact (la partie avant le " /" est le préfixe mono ; "Em" et "In"
// font 2 lettres pour aligner les libellés).
export const contactLinks = [
  { mono: 'Em /', label: 'louistdesign@gmail.com', href: 'mailto:louistdesign@gmail.com' },
  { mono: 'In /', label: 'LinkedIn', href: 'https://www.linkedin.com/in/louis-tintillier-874373150/' },
]

// Chips affichés en bas du hero
export const heroChips = ['Freelance', 'Research / UX', 'Design system / UI', 'SaaS', 'AI Builder']

// Section "What I do", compétences
export const skills = [
  { n: 'Product & UX Design', d: 'Research · flows · IA · prototyping' },
  { n: 'UI & Design Systems', d: 'Components · tokens · evolving libraries' },
  { n: 'AI Project Building', d: 'Prompting · Figma MCP · prototyping · shipping with AI' },
  { n: 'B2B & SaaS Strategy', d: 'Business tools · complex workflows · multi-user' },
  { n: 'Domains', d: 'Finance & credit · insurance · HR & staffing · industry' },
]

// Toolbox tags
export const tools = [
  'Figma', 'Claude', 'Claude Code',
  'Notion', 'v0', 'n8n',
  'Cursor',
]

// Projets (6). 'cover' optionnel : mets '/assets/nexus.jpg' pour une vraie image.
// 'slug' relie la carte à une étude de cas (voir `case-studies/`) : si une
// entrée existe pour ce slug, la carte devient cliquable vers /work/<slug>/.
// 'href' (sans slug) : carte qui pointe vers un site externe, ouvert dans un
// nouvel onglet.
export const projects = [
  {
    idx: '01', name: 'Actual - Guarantee management tool', year: '2025', cat: 'B2B SaaS · Enterprise', slug: 'garanties',
    tldr: 'Led end to end the guarantee-management tool for Actual Group, three user types, millions of euros at stake. From 0 to 90.5% of decisions automated; end-to-end decision time: from 125 s to 21 s. Detailed mockups shared in interview.',
    cover: '/assets/garanties/cover.svg',
  },
  {
    idx: '02', name: 'Seuil', year: '2026', cat: 'B2B SaaS product site · Demo project', href: 'https://seuil.louistdesign.me',
    tldr: 'The marketing site of a fictional B2B SaaS for customer credit decisions, designed then launched end to end. 6 pages on desktop and mobile · Content editable in Sanity without touching the code · Interactive decision simulator · WCAG AA accessibility tested.',
  },
  {
    idx: '03', name: 'Actual - Candidate List', year: '2025', cat: 'B2B SaaS · UX/UI', slug: 'candidate-list',
    tldr: 'A heavy, fragmented candidate list turned into a readable, actionable view, with AI-assisted search. 2 to 3 minutes saved per search, across about 100 searches per agency per month. Detailed mockups shared in interview.',
    cover: '/assets/candidate-list/cover.svg',
  },
  {
    idx: '04', name: 'Renault Group - Quality intranet', year: '2020-2022', cat: 'UX Research · Intranet', slug: 'renault',
    tldr: "Designed the SharePoint umbrella site unifying Renault Group's 7 quality processes for ~10,000 people: 5 min saved per information or contact search, over 160 h saved per month. Screens rebuilt from memory (NDA).",
    cover: '/assets/renault/cover.webp',
  },
  {
    idx: '05', name: 'Learning Leagues', year: '2025, ongoing', cat: 'Personal · Product & Design System', slug: 'learning-leagues',
    status: 'In progress',
    tldr: 'A personal site to learn League of Legends properly, structured by role, jargon-free, on a token-driven Hextech design system. Designed and built solo with AI as my pair: a data-driven role engine, all five roles live, and a separate AI-first component library feeding the site. Still growing.',
    cover: '/assets/cover_ll.png',
  },
  {
    idx: '06', name: 'Paris-Saclay', year: '2020', cat: 'UX/UI · Mobile App · Concept', slug: 'paris-saclay',
    tldr: "Rethinking Université Paris-Saclay's campus app, almost unused, to make it an everyday tool.",
    cover: '/assets/ps/cover.jpg',
  },
]
