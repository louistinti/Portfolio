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
  'Figma', 'Claude', 'Make',
  'Notion', 'v0', 'n8n',
  'Cursor',
]

// Projets (6). 'cover' optionnel : mets '/assets/nexus.jpg' pour une vraie image.
// 'slug' relie la carte à une étude de cas (voir `caseStudies` plus bas) : si une
// entrée existe pour ce slug, la carte devient cliquable vers #/<slug>.
export const projects = [
  {
    idx: '01', name: 'Paris-Saclay', year: '2025', cat: 'UX/UI · Mobile App', slug: 'paris-saclay',
    tldr: 'Turned an unused campus app into an everyday tool, field research, a clear information architecture and a topographic visual language for a 77 km² campus.',
    cover: '/assets/ps/cover.jpg',
  },
  {
    idx: '02', name: 'La Vraie Charentaise', year: '2022', cat: 'Branding · E-commerce', slug: 'charentaise',
    tldr: 'Rebranded the traditional French slipper into a playful, made‑in‑France e‑commerce concept, with on‑site personalization and a quiz that matches you to your pair.',
    cover: '/assets/lvc/cover.png',
  },
  {
    idx: '03', name: 'Forge', year: '2024', cat: 'SaaS · Onboarding', slug: 'forge',
    tldr: 'An AI‑assisted onboarding flow that lifted new‑user activation by 28%.',
    cover: '',
  },
  {
    idx: '04', name: 'Cipher', year: '2024', cat: 'Enterprise · Security', slug: 'cipher',
    tldr: 'A security console for enterprise admins, made role‑based access feel simple, not scary.',
    cover: '',
  },
  {
    idx: '05', name: 'Atlas', year: '2023', cat: 'B2B · Marketplace', slug: 'atlas',
    tldr: 'Redesigned a B2B marketplace, rebuilt search, filtering and checkout around real buyer intent.',
    cover: '',
  },
  {
    idx: '06', name: 'Pulse', year: '2023', cat: 'SaaS · Ops', slug: 'pulse',
    tldr: 'A real‑time ops monitoring app, designed alerting and incident triage for on‑call teams.',
    cover: '',
  },
]

// ══════════════════════════════════════════════════════════════════════════
//  ÉTUDES DE CAS — TEMPLATE
//  ──────────────────────────────────────────────────────────────────────
//  Chaque entrée = une page d'étude de cas, clé = `slug` du projet ci-dessus.
//  Une carte du portfolio devient cliquable dès qu'une entrée existe pour son
//  slug (route #/<slug>). Pour créer une nouvelle étude de cas : COPIE le bloc
//  'paris-saclay', change la clé/le contenu/les couleurs, et c'est en ligne.
//
//  Mise en forme du texte (helper RichText) :
//    **gras**      → mot en évidence (couleur texte pleine)
//    *accent*      → mot surligné (couleur d'accent du projet)
//    `touche`      → touche clavier (kbd)
//
//  Images : pose le fichier dans public/assets/ puis renseigne son chemin dans
//  `shots` (clé = id du slot). Vide = placeholder rayé.
//
//  Toutes les SECTIONS sont optionnelles : retire une clé (ex. `topography`)
//  et la section disparaît de la page.
// ══════════════════════════════════════════════════════════════════════════
export const caseStudies = {
  'paris-saclay': {
    name: 'Paris-Saclay University app',
    // Titre H1 (le mot en *accent* est surligné dans la couleur du projet)
    title: 'Redesign of the University app *Paris-Saclay*',
    kicker: ['Case Study', 'UX Research · UX/UI · Prototype'],
    meta: [
      { k: 'Role', v: 'UX Research, UX/UI' },
      { k: 'Device', v: 'iOS / Android' },
      { k: 'Client', v: 'Paris-Saclay' },
    ],

    // Thème couleur du projet (appliqué en variables CSS sur .cs-page).
    // --accent = fonds (boutons, logo) ; --accent-line = textes/traits lisibles
    // sur fond sombre ; --topo-1..6 = échelle foncé→clair (rampe du style guide).
    theme: {
      '--accent': '#840051',
      '--accent-ink': '#fbeaf3',
      '--accent-line': '#d8589f',
      '--topo-1': '#2e0028',
      '--topo-2': '#4a0c33',
      '--topo-3': '#63003c',
      '--topo-4': '#840051',
      '--topo-5': '#c85a95',
      '--topo-6': '#f0a9ce',
      '--topo-line': 'rgba(216, 88, 159, 0.16)',
    },

    context: {
      eyebrow: 'Context',
      lede: 'Make the campus *accessible*, connected, and up to date.',
      body: [
        "The existing Paris-Saclay University app was **barely used** and had no real impact on students' daily lives. The brief from the campus digital team: turn it into an essential, everyday tool.",
        'I spent a day on campus, walking the grounds and meeting students to hear their daily pain points firsthand, building on the brief with real, on-the-ground context.',
        'The campus suffers from a **lack of identity and sense of belonging**. Navigating it, and communicating with the administration and professors, is a genuine daily challenge.',
      ],
      stats: [
        { v: '77', u: 'km²', k: 'of campus to navigate, spanning a large number of buildings.' },
        { v: '~10', k: 'students interviewed on campus to uncover and confirm pain points.' },
        { v: '1', u: 'day', k: 'spent on site, walking the grounds and meeting students directly.' },
      ],
    },

    challenge: {
      quote: 'How do you make a *77 km²* campus feel like one place students actually belong to?',
      who: '// The core challenge',
    },

    research: {
      eyebrow: 'Research',
      idx: 'Step 01',
      lede: "Studying the app, then *listening* to the students who'd use it.",
      body: [
        'By auditing the existing app and interviewing around ten students, I uncovered and confirmed several recurring pain points, then distilled them into three personas representing distinct campus journeys.',
        'Each persona shares the same underlying friction: **communication is hard, and the campus is hard to navigate**.',
      ],
      personas: [
        { name: 'Elsa', id: 'P-01', shot: 'persona-1', goal: 'Wants to rank at the top of her class.', pain: 'Struggles to communicate with professors and to get around campus, making everyday study life much harder.' },
        { name: 'Romain', id: 'P-02', shot: 'persona-2', goal: 'Wants to join activities with students from other schools.', pain: "Information doesn't circulate, and getting around between schools is genuinely complicated." },
        { name: 'Veronica', id: 'P-03', shot: 'persona-3', goal: 'Newly arrived in France, wants to meet people and integrate quickly.', pain: 'Students stick to their own groups, making it nearly impossible to break in.' },
      ],
      insight: 'Students need help *communicating*, with professors, the administration, and each other. And because the campus is so large, *navigating* it is a daily struggle, especially as students constantly switch rooms between classes.',
    },

    ideation: {
      eyebrow: 'Ideation',
      idx: 'Step 02',
      lede: 'From pain points to a focused *feature set*.',
      body: [
        "I benchmarked tools and features against the research, and narrowed down to the six that most directly answered the students' needs, communication and navigation first.",
        'I then ran **6-to-1** exercises to arrange the home page as ergonomically as possible.',
      ],
      features: [
        { id: 'F-01', name: 'Agenda', desc: 'Personal schedule with rooms & changes.' },
        { id: 'F-02', name: 'Map & Geolocation', desc: 'Find your way across 77 km² of campus.' },
        { id: 'F-03', name: 'Directory', desc: 'Reach professors & the administration.' },
        { id: 'F-04', name: 'Chat', desc: 'Message students, profs & staff directly.' },
        { id: 'F-05', name: 'News Feed', desc: 'Campus-wide information that circulates.' },
        { id: 'F-06', name: 'Events', desc: 'Cross-school activities to connect students.' },
      ],
      media: [
        { shot: '6to1', cap: '6-to-1 · home page', sub: 'Ergonomics & hierarchy', framed: true },
      ],
    },

    wireframes: {
      eyebrow: 'Wireframes',
      idx: 'V1 → V4',
      intro: 'Four iterations of the home page, each one tightening the hierarchy and ergonomics until the structure clicked.',
      items: [
        { shot: 'wire-1', v: 'V1', t: 'First pass' },
        { shot: 'wire-2', v: 'V2', t: 'Re-ordered' },
        { shot: 'wire-3', v: 'V3', t: 'Refined' },
        { shot: 'wire-4', v: 'V4', t: 'Final', final: true },
      ],
    },

    topography: {
      eyebrow: 'Visual concept',
      mark: '◆',
      title: 'Tying the app together with *topography*.',
      body: 'Once the architecture and hierarchy were finalised, I looked for a way to tie the whole app together into one cohesive journey. Given that Paris-Saclay is a vast campus with real variation in terrain, I drew inspiration from **topographic maps**, using contour lines and elevation to create a subtle sense of **relief** throughout the interface.',
      shot: 'midfi',
    },

    ui: {
      eyebrow: 'UI & System',
      idx: 'Step 03',
      lede: 'A *style guide* and components to keep every screen consistent.',
      body: [
        'I built a style guide and a component set to streamline the design of every screen, then assembled the full prototype and presented it to the heads of the Paris-Saclay digital team.',
        "I kept Paris-Saclay's **primary magenta** and declined it into a few tints to create the topographic relief effect that runs through the product.",
      ],
      paletteLabel: '// Relief · primary magenta, declined',
      paletteNote: 'One primary, six elevations, the tints map to contour layers, giving depth without new hues.',
      fonts: [
        { k: 'Titles', v: 'Eina01' },
        { k: 'Body', v: 'OpenSans' },
      ],
      components: {
        buttons: [{ label: 'Primary action' }, { label: 'Secondary', alt: true }],
        chips: ['Agenda', 'Map', 'Chat', 'Events'],
        pills: ['Directory', 'News Feed', 'Profile'],
        tabs: [{ label: 'Home', on: true }, { label: 'Map' }, { label: 'Chat' }, { label: 'Agenda' }],
      },
      screens: ['ui-1', 'ui-2', 'ui-3', 'ui-4'],
    },

    prototype: {
      eyebrow: 'Prototype',
      idx: 'Live',
      note: 'The prototype starts as if you were a university student. To go through the sign-up flow or reach the "guest" page, log out of your profile inside the prototype. The `R` key also works.',
      src: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FcA632zrC0wcK2StKZenVKE%2FParis-Saclay%3Fpage-id%3D246%253A2478%26node-id%3D323%253A5592%26viewport%3D1102%252C1108%252C0.27%26scaling%3Dscale-down%26starting-point-node-id%3D323%253A5592',
    },

    footer: 'Paris-Saclay University app · Case study',

    // Emplacements d'images (vides = placeholder). Clés = `shot` cité ci-dessus.
    shots: {
      'persona-1': '',
      'persona-2': '',
      'persona-3': '',
      '6to1': '/assets/ps/6to1.png',
      'wire-1': '/assets/ps/wire-1.png',
      'wire-2': '/assets/ps/wire-2.png',
      'wire-3': '/assets/ps/wire-3.png',
      'wire-4': '/assets/ps/wire-4.png',
      midfi: '',
      'ui-1': '',
      'ui-2': '',
      'ui-3': '',
      'ui-4': '',
    },
  },

  'charentaise': {
    name: 'La Vraie Charentaise',
    title: 'Making the French *Charentaise* cool again',
    kicker: ['Case Study', 'Branding · UX/UI · E-commerce'],
    meta: [
      { k: 'Role', v: 'Branding, UX/UI' },
      { k: 'Scope', v: 'Brand + e-commerce' },
      { k: 'Platform', v: 'Web & mobile' },
    ],

    // Vraies couleurs de marque (charte graphique, p.23/27) :
    // base ivoire / noir, primaires pop. Vert en accent, rampe de deck
    // déclinée en vert foncé. Contrastes vérifiés AA/AAA sur le fond sombre.
    theme: {
      '--accent': '#A3DCB3',       // Vert — accent (fonds, boutons, sélection)
      '--accent-ink': '#14211b',   // vert très foncé — texte sur l'accent (~11:1)
      '--accent-line': '#A3DCB3',  // Vert clair — petits textes/traits (~12:1 sur fond sombre)
      '--topo-1': '#101713',       // deck
      '--topo-2': '#16241b',       // deck
      '--topo-3': '#1f3528',       // deck
      '--topo-4': '#2f5740',       // vert profond (deck)
      '--topo-5': '#8FCFA6',       // vert clair — accent texte secondaire (~9:1)
      '--topo-6': '#C8E8D4',       // vert très clair
      '--topo-line': 'rgba(163, 220, 179, 0.16)',
    },

    context: {
      eyebrow: 'Context',
      lede: 'A heritage slipper with an *image problem*, and a young crowd to win over.',
      body: [
        'The **charentaise** is a 150-year-old French slipper, 100% made in France, but stuck with a dusty, grandpa-ish reputation. The brief: turn it into a desirable everyday object for a younger audience, without losing the savoir-faire that makes it authentic.',
        'I built **La Vraie Charentaise** end to end, on my own: brand identity, art direction and the full e-commerce experience, from the first sketch to a clickable prototype.',
        "The bet: keep the product 100% French and genuine, then wrap it in a bold, playful pop world that speaks to people who'd never have looked at a pair before.",
      ],
      stats: [
        { v: '150', u: 'yrs', k: 'of French charentaise savoir-faire, reframed for today.' },
        { v: '100', u: '%', k: 'made in France, the authenticity kept fully intact.' },
        { v: '4', k: 'ways to personalize a pair: colour, size, pattern, material.' },
      ],
    },

    challenge: {
      quote: 'How do you make a *grandpa slipper* something a 20-year-old actually wants to wear?',
      who: '// The core challenge',
    },

    ideation: {
      eyebrow: 'Features',
      idx: 'The experience',
      lede: 'A storefront that feels more like a *playground* than a catalogue.',
      body: [
        'I turned the positioning into a set of features that make buying a slipper fun: a personalization tool, a matchmaking quiz, an editorial lookbook and a clean shop, all tied together by the same pop language.',
        'Everything pushes one idea, the charentaise is **yours**, expressive and a little tongue-in-cheek.',
      ],
      features: [
        { id: '01', name: 'Personalization', desc: 'Build your own pair: colour, size, pattern and material.' },
        { id: '02', name: 'Match quiz', desc: 'A playful quiz that pairs you with your ideal model.' },
        { id: '03', name: 'Collection', desc: 'Browse the models, La Gilbert, La Soupette and friends.' },
        { id: '04', name: 'Product pages', desc: 'Sizes, details and add-to-cart, with a personalize shortcut.' },
        { id: '05', name: 'Lookbook', desc: 'Editorial lifestyle shots of the slippers out in the wild.' },
        { id: '06', name: 'Community', desc: 'A newsletter, "Tiens-toi au jus", and social to keep the crowd close.' },
      ],
      media: [
        { shot: 'perso', cap: 'Personalization', sub: 'Colour · size · pattern · material', aspect: '16 / 9' },
      ],
    },

    wireframes: {
      eyebrow: 'Wireframes',
      idx: 'Low-fi structure',
      intro: 'I mapped the key screens in low fidelity first, home, collection, product and the quiz result, to lock the structure before any styling.',
      pages: [
        { shot: 'wire-home', cap: 'Home' },
        { shot: 'wire-collection', cap: 'Collection' },
        { shot: 'wire-product', cap: 'Product page' },
        { shot: 'wire-quiz', cap: 'Match result' },
      ],
    },

    topography: {
      eyebrow: 'Visual identity',
      mark: '◆',
      title: 'A *pop* world built on heritage.',
      body: 'The identity mixes two opposites on purpose: the authentic, hand-made charentaise and a loud, Y2K-flavoured pop universe. Cream display type with a thick black outline, candy-coloured grids, stickers, sparkles and a hand-drawn logo, all signalling that this old object just got a lot more fun.',
      shot: 'logo',
      fit: 'contain',
    },

    ui: {
      eyebrow: 'UI & Brand system',
      idx: 'Design',
      lede: 'One *system*, applied across every screen.',
      body: [
        'I built a compact design system, colour, type, components and a sticker kit, so every page felt part of the same playful world while staying easy to shop.',
        'A cream-and-ink base carries candy pop accents on grid backgrounds; a chunky display face holds the brand, a clean grotesque keeps the shopping UI readable.',
      ],
      paletteLabel: '// Palette · pop & 100% French',
      paletteNote: 'A cream and ink base, with candy pop accents dropped on grid backgrounds.',
      fonts: [
        { k: 'Titles', v: 'MADE Soulmaze' },
        { k: 'Body', v: 'Clash Display' },
      ],
      palette: [
        { hex: '#FFFCF6', name: 'Ivoire' },
        { hex: '#191919', name: 'Noir' },
        { hex: '#DB2C38', name: 'Rouge' },
        { hex: '#A3DCB3', name: 'Vert' },
        { hex: '#6BA9DD', name: 'Bleu' },
        { hex: '#FFF300', name: 'Jaune' },
      ],
      components: {
        buttons: [{ label: 'Ajouter au panier' }, { label: 'Personnaliser', alt: true }],
        chips: ['La Gilbert', 'La Soupette', 'Sur-mesure'],
        pills: ['Lookbook', 'Catalogue', 'Le Jus'],
        tabs: [{ label: 'Accueil', on: true }, { label: 'Boutique' }, { label: 'Perso' }, { label: 'Lookbook' }],
      },
      pages: [
        { shot: 'ui-home', cap: 'Home' },
        { shot: 'ui-product', cap: 'Product, La Gilbert' },
        { shot: 'ui-quiz', cap: 'Match result, La Soupette' },
        { shot: 'ui-lookbook', cap: 'Lookbook' },
      ],
    },

    prototype: {
      eyebrow: 'Prototype',
      idx: 'Live',
      note: 'Click through the full storefront, browse the collection, open a product, personalize a pair and run the matchmaking quiz.',
      src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FVdtPGwGX4UdzfrZEYUyg0C%2FLa-Vraie-Charentaise%3Fnode-id%3D1572-6490%26p%3Df%26viewport%3D620%252C367%252C0.02%26t%3DpN63FAbaKW3hZBkQ-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D1572%253A6490%26show-proto-sidebar%3D1%26page-id%3D1252%253A1812',
    },

    footer: 'La Vraie Charentaise · Case study',

    shots: {
      perso: '/assets/lvc/perso.gif',
      logo: '/assets/lvc/logo.gif',
      'wire-home': '/assets/lvc/wire-home.png',
      'wire-collection': '/assets/lvc/wire-collection.png',
      'wire-product': '/assets/lvc/wire-product.png',
      'wire-quiz': '/assets/lvc/wire-quiz.png',
      'ui-home': '/assets/lvc/ui-home.png',
      'ui-product': '/assets/lvc/ui-product.png',
      'ui-quiz': '/assets/lvc/ui-quiz.png',
      'ui-lookbook': '/assets/lvc/ui-lookbook.png',
    },
  },

  // ── Pour ajouter Forge / Cipher / Atlas / Pulse : copie un bloc ci-dessus,
  //    renomme la clé (ex. 'forge'), adapte le contenu + le `theme`.
}
