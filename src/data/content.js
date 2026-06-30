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
    tldr: 'Reframed the humble made-in-France slipper as an icon of slow life, a full rebrand and e-commerce concept with a matchmaking quiz and made-to-order personalization.',
    cover: '/assets/lvc/cover.png',
  },
  {
    idx: '03', name: 'Actual - Guarantee management tool', year: '2025', cat: 'B2B SaaS · Enterprise', slug: 'garence',
    tldr: 'Led end to end the guarantee-management tool for Actual Group, three user types, millions of euros at stake; automated 90.5% of decisions and cut decision time by 83%. Detailed mockups shared in interview.',
    cover: '/assets/garence/cover.svg',
  },
  {
    idx: '04', name: 'Actual — Candidate List', year: '2025', cat: 'B2B SaaS · UX/UI', slug: 'candidate-list',
    tldr: 'Turned a heavy, fragmented recruiter list into a scannable, actionable view, key info and quick actions on the row; 2-3 min saved per candidate readiness check. Detailed mockups shared in interview.',
    cover: '/assets/candidate-list/cover.svg',
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
    cover: '/assets/UI/Atlas.png',
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
        'I mapped a simple **user flow** to see how the sections connect, then ran focused benchmarks on the trickiest ones, the map, agenda, chat and the news & events feed.',
        'I then ran **6-to-1** exercises, mainly on the home page, to arrange everything as ergonomically as possible.',
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
    title: 'Turning the *charentaise* into an icon of slow life',
    kicker: ['Case Study', 'Branding · UX/UI · E-commerce'],
    meta: [
      { k: 'Role', v: 'Branding, UX/UI' },
      { k: 'Type', v: 'Self-directed' },
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
      lede: 'A free brief, and one slippery word to defend: *la flemme*.',
      body: [
        'This was a **self-directed project**, no brief and no client. After a short round of ideation I locked onto a single, slippery theme: **"la flemme"**, the very French art of doing nothing.',
        'The word carries a heavy negative charge, it usually means doing nothing **productive**, and idleness is a feeling: intimate, and almost impossible to define the same way for everyone.',
        'It also landed in a **post-COVID** moment where remote work had erased the line between home and office, with people grinding 10-12h days and no real pause. The goal: **de-dramatize idleness** and give people permission to slow down.',
      ],
      stats: [
        { v: '85', k: 'people surveyed on how they perceive "la flemme".' },
        { v: '63', u: '%', k: 'feel idleness is judged negatively today, confirming the problem.' },
        { v: '1', u: '/day', k: 'most respondents feel "la flemme" at least once a day.' },
      ],
    },

    challenge: {
      quote: 'How do you give shape to something as abstract as *idleness*, and make people actually want it?',
      who: '// The core challenge',
    },

    research: {
      eyebrow: 'Research',
      idx: 'Step 01',
      lede: 'Listening first: a *survey* on how people really feel about doing nothing.',
      body: [
        'To get past my own assumptions, I sent out a **questionnaire** on "la flemme", how people define it, how they perceive it, how they picture it.',
        'On **85 respondents** the verdict was already clear: **63%** felt idleness is badly seen today (26% no, 11% in between), and most admitted to feeling it **at least once a day**. The topic was validated, and worth defending.',
      ],
      insight: "Idleness is universal but quietly judged. The way in wasn't to defend *laziness*, it was to reframe it as *slow life*: choosing, on purpose, to slow down and come back to the essentials.",
    },

    ideation: {
      eyebrow: 'Ideation',
      idx: 'Step 02',
      lede: 'From an abstract feeling to a *concrete icon*.',
      body: [
        '"La flemme" was too abstract and too negative to attack head-on. The unlock was the idea of **slow life**, the same calm, unbothered energy as the "chill" Instagram accounts posting celebrities out in crocs and loungewear.',
        'And what better icon for slowing down than a near-top pick of the 60+ crowd: **the charentaise**. I found the real *lavraiecharentaise.com*, dusty and dated, and made it the base for a full redesign, a second life for the product.',
        'The pitch: tie the **authenticity** of a genuine French slipper to its future as *an icon of slow life*. From there, two features came first, a **quiz** and a **personalization** tool, then grew into the full storefront.',
      ],
      features: [
        { id: '01', name: 'Match quiz', desc: 'On arrival, a playful quiz hands you your ideal personalized pair.' },
        { id: '02', name: 'Personalization', desc: 'Build your own pair: colour, size, pattern and material.' },
        { id: '03', name: 'Collection', desc: 'Browse the models, La Gilbert, La Soupette and friends.' },
        { id: '04', name: 'Product pages', desc: 'Sizes, details and add-to-cart, with a personalize shortcut.' },
        { id: '05', name: 'Lookbook', desc: 'Self-shot editorial photography of the slippers out in the wild.' },
        { id: '06', name: 'Community', desc: 'A newsletter, "Tiens-toi au jus", and social to keep the crowd close.' },
      ],
      media: [
        { shot: 'perso', cap: 'Personalization', sub: 'Colour · size · pattern · material', aspect: '16 / 9' },
      ],
    },

    wireframes: {
      eyebrow: 'Wireframes',
      idx: 'V1 → V3',
      intro: 'I iterated the home page from V1 to a final V3 to lock its structure, then declined the layout across the key screens, collection, product and the quiz result, before any styling.',
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
      title: 'A *retro-modern* world for the slow life.',
      body: 'The identity blends two things on purpose: the authentic, made-in-France charentaise and a warm, retro-modern pop language that quietly says "slow down". I art-directed and **shot all of the product photography and visuals myself**, so every image carried the same calm, lived-in feeling.',
      shot: 'logo',
      fit: 'contain',
    },

    ui: {
      eyebrow: 'UI & Brand system',
      idx: 'Design',
      lede: 'One *system*, applied across every screen.',
      body: [
        'In parallel I built a compact design system, colours, grids, typography and shadows, so every page felt part of the same world while staying easy to shop.',
        "I chose **four colours** echoing the tones most often seen on real charentaises, then mapped one to each of the site's four sections, so navigation feels intuitive on top of looking good.",
      ],
      paletteLabel: '// Palette · drawn from the charentaise',
      paletteNote: 'A cream and ink base, plus four section colours, one per part of the site, to keep it intuitive to navigate.',
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

  'garence': {
    name: 'Actual - Guarantee management tool',
    title: "Designing Actual's *guarantee management* tool",
    kicker: ['Case Study', 'Product · UX/UI · B2B SaaS'],
    meta: [
      { k: 'Role', v: 'Lead Product Designer' },
      { k: 'Team', v: '1 PM · 1 designer · 4 devs' },
      { k: 'Duration', v: '1 year' },
      { k: 'Mockups', v: 'Shared in interview' },
    ],

    // Rouge de marque Actual Group (#e40521, relevé sur groupeactual.eu).
    // --topo-1..6 = rampe foncé→clair pour le fond topo subtil.
    theme: {
      '--accent': '#e40521',
      '--accent-ink': '#fff5f6',
      '--accent-line': '#ff6b78',
      '--topo-1': '#2a0509',
      '--topo-2': '#48070f',
      '--topo-3': '#7a0c19',
      '--topo-4': '#e40521',
      '--topo-5': '#ff6173',
      '--topo-6': '#ffb3bd',
      '--topo-line': 'rgba(255, 107, 120, 0.16)',
    },

    context: {
      eyebrow: 'Context',
      lede: 'One tool, *three very different users*, and millions of euros on the line.',
      body: [
        "I **led end to end**, as the sole designer, Actual's **guarantee-management tool**. It manages **warranty requests** and **non-guaranteed exposure (ENG)**, the cover that secures the placement of temporary workers, with **millions of euros** riding on each decision.",
        'Actual issues warranties to secure a temp placement, and tracks **non-guaranteed exposure** whenever the insurer steps back, an amount too high, a fast-rising exposure, a client at risk.',
        'It serves three populations with radically different needs: **agencies** initiate and track requests, **Customer Service** investigates and decides, and **management** supervises activity and steers budget envelopes by scope and agency.',
        'It all kicked off mid-**convergence**, as Leader, Ergalis, Up Skills and Ergos folded into shared tools, every entity wanting to keep its own features, with *three Business Owners* to align at once.',
      ],
      stats: [
        { v: '90.5', u: '%', k: 'of Customer Service decisions now fully automated.' },
        { v: '-83', u: '%', k: 'on automated decision time, from 125 s down to 21 s.' },
        { v: '3', k: 'user types unified around one shared standard.' },
      ],
    },

    challenge: {
      quote: 'How do you design *one coherent experience* for three users who want completely different things, while four companies merge into one?',
      who: '// The core challenge',
    },

    research: {
      eyebrow: 'Research',
      idx: 'Step 01',
      lede: 'Inheriting the research, then *seeing it for myself* on the floor.',
      body: [
        'I joined after my lead had run the first interviews. My first job: **make that research my own**, surface the real irritants and **prioritize** them across three populations that shared neither expectations nor constraints.',
        'To pressure-test my hypotheses I spent a day **shadowing and testing** with the Customer Service team at HQ. Watching users in real conditions is still the surest way to confirm, or kill, a design assumption, before we ran a **pilot** with a handful of agencies.',
      ],
      personas: [
        { name: 'Agencies', id: 'U-01', shot: 'persona-1', goal: 'Initiate warranty and ENG requests, and track their status.', pain: 'Informal exchanges and implicit criteria, with almost no visibility on where a request stands.' },
        { name: 'Customer Service', id: 'U-02', shot: 'persona-2', goal: 'Investigate files, run the checks and make the decision.', pain: 'No common standard between entities, long decision times, everything reviewed by hand.' },
        { name: 'Management', id: 'U-03', shot: 'persona-3', goal: 'Supervise activity and steer budget envelopes by scope and agency.', pain: 'Near-zero visibility on non-guaranteed exposure across the network.' },
      ],
      insight: 'Every entity ran its own way, informal rules, implicit criteria, no shared view of exposure. Without a *common standard*, agencies, Customer Service and management could never see the same reality.',
    },

    ideation: {
      eyebrow: 'Design & delivery',
      idx: 'Step 02',
      lede: 'From scattered habits to one *shared, progressive* system.',
      body: [
        'I designed the first **responsive mockups** while juggling the evolving demands of **three Business Owners** at once. The MVP gave every role a clear, structured path, with **explicit states**, inline checks and an **audit trail** so each decision stayed traceable.',
        'Roll-out was step by step: a pilot in real conditions, field feedback, fast tweaks, labels, field order, thresholds, then a **national launch**. I also ran training and onboarding so the first agencies could get going on their own.',
        'The framing targets were sharp: -75% on agency response time, -50% on Customer Service decision actions, -25% on ENG and -20% on total cover held with the insurer.',
      ],
      features: [
        { id: 'F-01', name: 'Progressive request flows', desc: 'Create, cancel, increase, decrease, renew, with explicit states and a summary before sending.' },
        { id: 'F-02', name: 'Real-time insurability test', desc: 'An instant first signal on whether a request is feasible.' },
        { id: 'F-03', name: 'Customer Service workspace', desc: 'Structured criteria review, full history and an audit log.' },
        { id: 'F-04', name: 'Role-based dashboards', desc: 'Tailored views for agencies, Customer Service and management, with extended search and filters.' },
        { id: 'F-05', name: 'Envelope management', desc: 'Allocation, tracking and reallocation by scope and agency, with thresholds, alerts and exports for management.' },
        { id: 'F-06', name: 'Actionable specs', desc: 'Business rules, edge cases and state transitions written to speed up delivery.' },
      ],
    },

    topography: {
      eyebrow: 'Automation',
      mark: '◆',
      title: 'Letting the system decide, *when it should*.',
      body: "The signature move came after launch: when every parameter is green, thresholds, scoring, client history, data consistency, **the system decides on its own** and notifies everyone. It stays fully **auditable and explainable**, the rules are visible, the justification is shown, and a human **override** is always one click away. Between the February 2025 national rollout and September 2025, automated decisions climbed from **739 to 1,243 (+68.2%)**, the automated share rose from **76.7% to 90.5% (+13.8 pts)**, and the average auto decision dropped from **125 s to 21 s (-83%)**. By September, **9 decisions in 10** ran automatically, leaving human effort exactly where it earns its keep, on the hardest files. It met several framing targets, agency response time and Customer Service decision actions both down, though ENG didn't fall as hoped: some agencies still confuse an ENG request with a guarantee increase, a flow-clarity and training gap to close next.",
    },

    prototype: {
      eyebrow: 'Outcome',
      idx: 'In hindsight',
      note: "This is the project that taught me the most about **holding a course through complexity**, multiple stakeholders, a tense context, users with very different needs, and millions of euros at stake, led end to end in full autonomy. With hindsight I'd revisit a few things, the ergonomics, the information hierarchy, the wording of some CTAs, and that gap is exactly the measure of how far the project moved.",
    },

    footer: 'Guarantee management tool · Actual Group · Case study',

    // Personas = les 3 types d'utilisateurs (placeholders rayés tant qu'aucune
    // image n'est posée dans public/assets/).
    shots: {
      'persona-1': '',
      'persona-2': '',
      'persona-3': '',
    },
  },

  'candidate-list': {
    name: 'Actual — Candidate List',
    title: 'Turning a heavy list into a *scannable* candidate view',
    kicker: ['Case Study', 'UX Research · UX/UI · Desktop'],
    meta: [
      { k: 'Role', v: 'Product Designer' },
      { k: 'Team', v: '1 PM · 1 designer · 3 devs' },
      { k: 'Duration', v: '4 months' },
      { k: 'Mockups', v: 'Shared in interview' },
    ],

    // Même client : rouge de marque Actual Group (#e40521).
    theme: {
      '--accent': '#e40521',
      '--accent-ink': '#fff5f6',
      '--accent-line': '#ff6b78',
      '--topo-1': '#2a0509',
      '--topo-2': '#48070f',
      '--topo-3': '#7a0c19',
      '--topo-4': '#e40521',
      '--topo-5': '#ff6173',
      '--topo-6': '#ffb3bd',
      '--topo-line': 'rgba(255, 107, 120, 0.16)',
    },

    context: {
      eyebrow: 'Context',
      lede: 'A heavy, fragmented list that *slowed every hire* down.',
      body: [
        "Actual's recruiters worked off a candidate list that fought them: **key info scattered**, so they had to open every profile to judge a candidate; clunky filtering and sorting; **no quick actions**, forcing constant screen-switching to contact, note or manage someone.",
        'On top of that, the UI was **dated and barely responsive**, and the cognitive load was high, too much noise in some places, missing essentials in others.',
        "And nothing helped **steer the talent pool**: no operational KPIs on the list itself, availability, last action, urgencies, so recruiters couldn't **prioritize** urgent files, follow-ups or replacements without opening each card.",
      ],
      stats: [
        { v: '2-3', u: 'min', k: 'saved per candidate to judge "ready to work or not".' },
        { v: '141', k: "recruiters surveyed on the row's must-see info and actions." },
        { v: '8', k: 'agencies visited to observe real routines and workarounds.' },
      ],
    },

    challenge: {
      quote: 'How do you make a candidate *readable and actionable* from a single row, without opening a single profile?',
      who: '// The core challenge',
    },

    research: {
      eyebrow: 'Research',
      idx: 'Step 01',
      lede: 'Three lenses on one question: what do recruiters *actually* need to see?',
      body: [
        'I crossed **Hotjar and Google Analytics** to find which filters were genuinely used and which journeys came up most, then cut the noise.',
        'A **141-response survey** pinned down the information recruiters want **at a glance**, availability, last action, status, documents, contact quality, and the actions worth firing **straight from the row**.',
        'Finally, **visits and interviews across 8 agencies** surfaced the real routines and workarounds, info that took too long to find, documents quietly expiring.',
      ],
      insight: "Recruiters didn't need more data, they needed the *right* data on the row. The research was clear enough to cut **20+ filters** before the pilot even shipped.",
    },

    ideation: {
      eyebrow: 'Solution',
      idx: 'Step 02',
      lede: 'One *clear, scannable row*, with the actions built in.',
      body: [
        'I reframed the listing around a **light but rich candidate row**: availability, last activity, qualification, city and agency, the essentials up front, the noise gone.',
        "**Documents** show as **counters with tooltips** (what's missing, what's expiring) so a recruiter reads a candidate's readiness **without opening the file**, and **quick actions** (contact, documents, linked needs) live right on the row.",
        "My role spanned UX framing, the **row's information architecture**, prototyping the compact filters, cards and doc badges, **testing in agencies**, then the **Figma specs**, behaviours, validations, edge cases and error states.",
      ],
      features: [
        { id: 'F-01', name: 'Compact filter bar', desc: 'Filters as chips, kept close to the eye, with saveable presets.' },
        { id: 'F-02', name: 'Enriched candidate row', desc: 'Availability, last activity, qualification and location, surfaced at a glance.' },
        { id: 'F-03', name: 'Document badges', desc: 'Counters and tooltips flag what is missing or expiring, no file to open.' },
        { id: 'F-04', name: 'Inline quick actions', desc: 'Contact, documents and linked needs, triggered straight from the row.' },
        { id: 'F-05', name: 'Pool KPIs', desc: 'Operational indicators on top of the list for priority and follow-up.' },
        { id: 'F-06', name: 'Customizable columns', desc: 'Show, hide and reorder columns (contract, licence, transport, clients) per agency.' },
      ],
    },

    topography: {
      eyebrow: 'Iteration',
      mark: '◆',
      title: 'Splitting the list into *sourcing* and *talent pools*.',
      body: 'Adoption was good, but management wanted more, so I designed two new pages. A **sourcing list** that hides candidates already tied to your agency and adds **AI matching** (location, target jobs, prior experience) plus a live feed of new sign-ups in your area, fresh profiles you\'ve never worked with. And a **talent-pools** page where managers group related trades into pools, ranked by shortage, demand or urgency, each opening on a "next actions" shortlist (candidates to replace, documents to validate) and a per-candidate **matching** button, with personal favourite lists underneath.',
    },

    prototype: {
      eyebrow: 'Outcome',
      idx: 'Pilot · Nov 2025',
      note: 'In pilot since **November 2025**, the new list won real adoption, recruiters **save 2-3 minutes** just judging whether a candidate is ready to work, with fewer dropped files and sharper prioritization. The second solution was **validated by management right before I left Actual**, so I never got to test it with users, the one honest gap in an otherwise solid run.',
    },

    footer: 'Candidate list · Actual Group · Case study',

    shots: {},
  },

  'learning-leagues': {
    name: 'Learning Leagues',
    title: 'Everything you need to *learn League of Legends*',
    kicker: ['Case Study', 'Built solo with AI', 'Product · Design System'],
    status: { label: 'In progress', live: true },
    meta: [
      { k: 'Role', v: 'Solo — design + build' },
      { k: 'Built with', v: 'AI as my pair' },
      { k: 'Stack', v: 'React · no build step' },
    ],

    // Identité Hextech (League of Legends) : or sur bleu profond. Couleurs
    // relevées dans le design system du projet (styles.css).
    theme: {
      '--accent': '#e39a3c',
      '--accent-ink': '#241803',
      '--accent-line': '#e8b365',
      '--topo-1': '#17130a',
      '--topo-2': '#2a2010',
      '--topo-3': '#5e4718',
      '--topo-4': '#d4b468',
      '--topo-5': '#e7c98f',
      '--topo-6': '#f3e4c4',
      '--topo-line': 'rgba(227, 154, 60, 0.16)',
    },

    context: {
      eyebrow: 'Context',
      lede: "League of Legends is *brutal* to learn, so I built the guide I wish I'd had.",
      body: [
        'League of Legends is a 15-year-old game that quietly assumes you already know how to play it. New players get dropped into a 5v5 with hundreds of champions, dense systems and a wall of community jargon, and most quit before it ever clicks.',
        '**Learning Leagues** is my answer: a personal project I design and build solo, **with AI as my pair**, laying out a **structured path by role** from MOBA-savvy beginner to confident low-elo (Iron → Platinum).',
        "It's **live and still growing** — all five role guides are up, running on an engine I can keep extending. Two rules keep it honest: **no jargon** without explaining it, and **no chasing the meta**, I teach the game's logic, not this patch's build.",
      ],
      stats: [
        { v: '5', k: 'roles live, each a full guide; Support goes deepest as the reference build.' },
        { v: '1', u: 'engine', k: "data-driven role engine: write a role's data, it renders the whole guide." },
        { v: '0', u: 'build', k: 'static site, React + Babel transpiled in the browser, shipped on GitHub Pages.' },
      ],
    },

    challenge: {
      quote: 'How do you teach a game that *assumes you already know how to play it*?',
      who: '// The core challenge',
    },

    research: {
      eyebrow: 'Approach',
      idx: 'Principles',
      lede: 'Teach the *game*, not the meta.',
      body: [
        'I started from how people actually fail to learn League: they copy builds without understanding why, and drown in terms no one defines. So the whole site is built **fundamentals first**, map, items, runes, vision, wave management, objectives, before any champion.',
        'Then it branches **by role**, because your position decides your job on the map. Each guide is **jargon-free by default**: a `Gloss` component explains every term on first mention, backed by a full **glossary**.',
        'And it stays in its lane: for live builds and patch stats it **steps aside** for the tools that already do it best (Lolalytics, U.GG, OP.GG), and focuses on the thinking those tools never teach.',
      ],
      insight: 'Most guides chase *what to build this patch*. Learning Leagues teaches *why*, so the knowledge survives the next patch.',
    },

    ideation: {
      eyebrow: 'What I built',
      idx: 'The build',
      lede: 'A *curriculum*, on an engine I built with AI.',
      body: [
        'The site is a guided path, not a search box: a landing that frames the journey, fundamentals first, then a full guide per role.',
        'Rather than hand-build five near-identical guides, I designed a **data-driven role engine** with AI as my pair: each guide is pure data, phases, map control, archetypes, common errors, champions, builds, matchups, and one shared engine renders it, with a per-section error boundary and a single source of truth for the live patch.',
        'The **Support guide** went deepest first to pressure-test the format; Top, Jungle, Mid and ADC followed as data, fast, once the engine held.',
      ],
      features: [
        { id: '01', name: 'Fundamentals', desc: 'The base layer: map, items, runes, vision, wave management and neutral objectives.' },
        { id: '02', name: 'Role guides', desc: 'Five positions live, each a full guide. Support is the deep-dive that set the bar.' },
        { id: '03', name: 'Role engine', desc: 'One engine renders every guide from its data, add a role by writing data, not pages.' },
        { id: '04', name: 'Practice videos', desc: 'Curated drills and pro clips, last hits, vision, mechanics, as short watchable reps.' },
        { id: '05', name: 'Glossary', desc: 'Every term defined, with inline first-mention glosses across the guides.' },
        { id: '06', name: 'Resources', desc: 'Curated external tools for live builds and stats, where they beat rolling my own.' },
      ],
    },

    ui: {
      eyebrow: 'Design system',
      idx: 'Hextech',
      lede: 'A *token-driven* system, themed end to end.',
      body: [
        'Everything runs on one set of CSS variables, a single **Hextech palette**, gold on deep blue, with accent and density swapped from a `data-` attribute on the root, so the whole site re-themes from one source of truth.',
        "It's documented on its own reference page, foundations, components and patterns, so the look stays consistent as the site grows. EB Garamond for headings, Inter for body, JetBrains Mono for labels.",
      ],
      paletteLabel: '// Hextech · gold on deep blue',
      paletteNote: 'A single Hextech palette as the source of truth, with accent and density swapped by data-attr.',
      fonts: [
        { k: 'Display', v: 'EB Garamond' },
        { k: 'Body', v: 'Inter' },
        { k: 'Mono', v: 'JetBrains Mono' },
      ],
      palette: [
        { hex: '#070a14', name: 'Bg' },
        { hex: '#111a2e', name: 'Surface' },
        { hex: '#d4b468', name: 'Or' },
        { hex: '#e39a3c', name: 'Ambre' },
        { hex: '#6fa8dc', name: 'Bleu' },
      ],
      components: {
        buttons: [{ label: 'Explore' }, { label: 'Role quiz', alt: true }],
        chips: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
        pills: ['Fundamentals', 'Glossary', 'Resources'],
        tabs: [{ label: 'Foundations', on: true }, { label: 'Components' }, { label: 'Patterns' }],
      },
    },

    prototype: {
      eyebrow: 'Live',
      idx: 'Try it',
      note: 'The site is live on GitHub Pages and still evolving. Explore the landing, the Fundamentals guide, the five role guides (Support goes deepest) and the glossary, with the design-system reference one URL away.',
      href: 'https://louistinti.github.io/LearningLeagues/',
      linkLabel: 'Visit the live site',
      src: 'https://louistinti.github.io/LearningLeagues/',
    },

    roadmap: {
      eyebrow: 'Roadmap',
      idx: "What's next",
      lede: "Shipping in the open, *here's where it's headed.*",
      body: [
        "The engine made breadth cheap, so the work now is depth and the interactive layer. A snapshot of what's shipped and what's coming.",
      ],
      items: [
        { state: 'done', name: 'Five role guides', desc: 'Top, Jungle, Mid, ADC and Support, all live on the shared engine.' },
        { state: 'done', name: 'Data-driven role engine', desc: 'Per-section error boundary and one source of truth for the live patch.' },
        { state: 'done', name: 'Design-system reference', desc: 'Foundations, components and patterns on their own Hextech page.' },
        { state: 'building', name: 'Champions layer', desc: 'Per-champion pages branching off each role guide.' },
        { state: 'building', name: 'Role quiz', desc: 'A short quiz that points new players to the role that fits them.' },
        { state: 'planned', name: 'Playable drills', desc: 'Turning the training vignette into measurable, trackable reps.' },
        { state: 'planned', name: 'Bilingual site', desc: 'FR/EN parity across every guide, wired to the language switcher.' },
      ],
    },

    footer: 'Learning Leagues · Personal project · In progress',

    shots: {},
  },

  'concepts': {
    name: 'Concepts',
    title: 'Concept work, *pure UI*',
    kicker: ['Concept work', 'UI exploration · Self-initiated'],
    meta: [
      { k: 'Type', v: 'Self-initiated' },
      { k: 'Focus', v: 'Pure UI / craft' },
      { k: 'Products', v: 'Fictional' },
    ],

    // Thème violet (clin d'œil aux fonds Atlas/Draft). Pas de palette projet
    // réelle : ce sont des explorations, le violet sert juste d'accent de page.
    theme: {
      '--accent': '#7c6cff',
      '--accent-ink': '#0c0a1e',
      '--accent-line': '#a99bff',
      '--topo-1': '#15122e',
      '--topo-2': '#1d1840',
      '--topo-3': '#2f2767',
      '--topo-4': '#7c6cff',
      '--topo-5': '#a99bff',
      '--topo-6': '#d6cfff',
      '--topo-line': 'rgba(124, 108, 255, 0.16)',
    },

    context: {
      eyebrow: 'Concept work',
      lede: 'Fictional products, *real interface craft*.',
      body: [
        'A set of self-initiated UI explorations, no client and no real metrics, just the part of the work I love most: hierarchy, density and restraint. Each one is a different product and a different visual language.',
        'A **project OS** for software teams, an **AI writing copilot** and a **product-analytics** suite, designed to be looked at closely.',
      ],
    },

    // Galerie : images pleine largeur, légendées. Pas de récit case-study.
    gallery: [
      { src: '/assets/UI/Atlas.png', name: 'Atlas', sub: 'Project OS for software teams' },
      { src: '/assets/UI/Draft.png', name: 'Draft', sub: 'AI writing copilot' },
      { src: '/assets/UI/Signal.png', name: 'Signal', sub: 'Product analytics' },
      { src: '/assets/UI/Mobile.png', name: 'On mobile', sub: 'Native iOS across the set' },
    ],

    footer: 'Concepts · Self-initiated UI',
  },
}
