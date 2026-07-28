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
  role: 'Product builder',
  location: 'Nantes, France',
  email: 'louistdesign@gmail.com',
  cv: '/Louis-Tintillier-CV.pdf', // fichier dans public/
  // Portrait détouré (fond transparent) affiché dans la section About.
  // Vide = placeholder rayé. Dépose un PNG transparent dans public/assets/.
  photo: '/assets/louis.png',
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

// Section "What I do" — compétences
export const skills = [
  { n: 'Product & UX Design', d: 'Research · flows · IA · prototyping' },
  { n: 'UI & Design Systems', d: 'Components · tokens · scalable libraries' },
  { n: 'AI Project Building', d: 'Prompting · prototyping · shipping with AI' },
  { n: 'B2B & SaaS Strategy', d: 'Activation · retention · complex workflows' },
]

// Toolbox tags
export const tools = [
  'Figma', 'Claude', 'Make',
  'Notion', 'v0', 'n8n',
  'Cursor',
]

// Projets (6). 'cover' optionnel : mets '/assets/nexus.jpg' pour une vraie image.
// 'slug' relie la carte à une étude de cas (voir `case-studies/`) : si une
// entrée existe pour ce slug, la carte devient cliquable vers #/<slug>.
export const projects = [
  {
    idx: '01', name: 'Paris-Saclay', year: '2025', cat: 'UX/UI · Mobile App', slug: 'paris-saclay',
    tldr: 'Turned an unused campus app into an everyday tool, field research, a clear information architecture and a topographic visual language for a 77 km² campus.',
    cover: '/assets/ps/cover.jpg',
  },
  {
    idx: '02', name: 'Actual - Guarantee management tool', year: '2025', cat: 'B2B SaaS · Enterprise', slug: 'garence',
    tldr: 'Led end to end the guarantee-management tool for Actual Group, three user types, millions of euros at stake; automated 90.5% of decisions and cut decision time by 83%. Detailed mockups shared in interview.',
    cover: '/assets/garence/cover.svg',
  },
  {
    idx: '03', name: 'Actual — Candidate List', year: '2025', cat: 'B2B SaaS · UX/UI', slug: 'candidate-list',
    tldr: 'Turned a heavy, fragmented recruiter list into a scannable, actionable view, key info and quick actions on the row; 2-3 min saved per candidate readiness check. Detailed mockups shared in interview.',
    cover: '/assets/candidate-list/cover.svg',
  },
  {
    idx: '04', name: 'La Vraie Charentaise', year: '2022', cat: 'Branding · E-commerce', slug: 'charentaise',
    tldr: 'Reframed the humble made-in-France slipper as an icon of slow life, a full rebrand and e-commerce concept with a matchmaking quiz and made-to-order personalization.',
    cover: '/assets/lvc/cover.png',
  },
  {
    idx: '05', name: 'Learning Leagues', year: '2025 — ongoing', cat: 'Personal · Product & Design System', slug: 'learning-leagues',
    status: 'In progress',
    tldr: 'A personal site to learn League of Legends properly, structured by role, jargon-free, on a token-driven Hextech design system. Designed and built solo with AI as my pair — a data-driven role engine, all five roles live. Still growing.',
    cover: '/assets/cover_ll.png',
  },
  {
    idx: '06', name: 'Concepts', year: '2026', cat: 'UI exploration · Self-initiated', slug: 'concepts',
    tldr: 'Self-initiated UI explorations across product types, a project OS, an AI writing copilot, a product-analytics suite, where I push pure interface craft.',
    cover: '/assets/UI/Atlas.webp',
  },
]
