// ──────────────────────────────────────────────────────────────
//  CONTENU DU PORTFOLIO
//  Édite ce fichier pour remplacer les textes / projets placeholder
//  par tes vraies informations. Pas besoin de toucher au code React.
// ──────────────────────────────────────────────────────────────

export const profile = {
  // Nom affiché dans la section About (Details) et le footer
  name: '[ Your Name ]',
  brand: 'Portfolio', // texte du logo en haut à gauche
  mark: 'PD', // initiales dans le losange du logo
  role: 'Product Designer & AI Project Builder',
  location: 'Based anywhere, remote',
  email: 'hello@example.com',
}

// Liens de contact (la partie avant le " /" est le préfixe mono)
export const contactLinks = [
  { mono: 'E /', label: 'hello@example.com', href: 'mailto:hello@example.com' },
  { mono: 'In /', label: 'linkedin.com/in/yourname', href: '#' },
  { mono: 'Be /', label: 'behance.net/yourname', href: '#' },
]

// Chips affichés en bas du hero
export const heroChips = ['UX / UI', 'SaaS', 'AI Builder']

// Section "What I do" — compétences
export const skills = [
  { n: 'Product & UX Design', d: 'Research · flows · IA · prototyping' },
  { n: 'UI & Design Systems', d: 'Components · tokens · scalable libraries' },
  { n: 'AI Project Building', d: 'Prompting · prototyping · shipping with AI' },
  { n: 'B2B & SaaS Strategy', d: 'Activation · retention · complex workflows' },
]

// Toolbox tags
export const tools = [
  'Figma', 'Framer', 'Webflow',
  'Claude', 'Cursor', 'v0',
  'HTML / CSS', 'React', 'Notion',
  'Linear', 'Maze', 'Mixpanel',
]

// Projets (6). 'cover' optionnel : mets '/assets/nexus.jpg' pour une vraie image.
export const projects = [
  {
    idx: '01', name: 'Nexus', year: '2025', cat: 'SaaS · Dashboard',
    tldr: 'Rebuilt a multi‑tenant analytics dashboard, cut time‑to‑insight by ~40% with a clearer data hierarchy.',
    cover: '', href: '#',
  },
  {
    idx: '02', name: 'Orbit', year: '2025', cat: 'Fintech · Design System',
    tldr: 'A 0→1 design system for a fintech SaaS, adopted across five product teams in one quarter.',
    cover: '', href: '#',
  },
  {
    idx: '03', name: 'Forge', year: '2024', cat: 'SaaS · Onboarding',
    tldr: 'An AI‑assisted onboarding flow that lifted new‑user activation by 28%.',
    cover: '', href: '#',
  },
  {
    idx: '04', name: 'Cipher', year: '2024', cat: 'Enterprise · Security',
    tldr: 'A security console for enterprise admins, made role‑based access feel simple, not scary.',
    cover: '', href: '#',
  },
  {
    idx: '05', name: 'Atlas', year: '2023', cat: 'B2B · Marketplace',
    tldr: 'Redesigned a B2B marketplace, rebuilt search, filtering and checkout around real buyer intent.',
    cover: '', href: '#',
  },
  {
    idx: '06', name: 'Pulse', year: '2023', cat: 'SaaS · Ops',
    tldr: 'A real‑time ops monitoring app, designed alerting and incident triage for on‑call teams.',
    cover: '', href: '#',
  },
]
