// Case study: charentaise (route #/charentaise).
export const charentaise = {
  name: 'La Vraie Charentaise',
  title: 'Turning the *charentaise* into an icon of slow life',
  kicker: ['Branding · UX/UI · E-commerce'],
  meta: [
    { k: 'Role', v: 'Branding, UX/UI' },
    { k: 'Type', v: 'Self-directed' },
    { k: 'Platform', v: 'Web & mobile' },
  ],

  // Vraies couleurs de marque (charte graphique, p.23/27) :
  // base ivoire / noir, primaires pop. Vert en accent, rampe de deck
  // déclinée en vert foncé. Contrastes vérifiés AA/AAA sur le fond sombre.
  theme: {
    '--accent': '#A3DCB3',       // Vert, accent (fonds, boutons, sélection)
    '--accent-ink': '#14211b',   // vert très foncé, texte sur l'accent (~11:1)
    '--accent-line': '#A3DCB3',  // Vert clair, petits textes/traits (~12:1 sur fond sombre)
    '--topo-1': '#101713',       // deck
    '--topo-2': '#16241b',       // deck
    '--topo-3': '#1f3528',       // deck
    '--topo-4': '#2f5740',       // vert profond (deck)
    '--topo-5': '#8FCFA6',       // vert clair, accent texte secondaire (~9:1)
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
      '"La flemme" was too abstract and too negative to attack head-on. I tried playful angles first: a "what kind of idler are you?" quiz site, a mini-game to become the best idler. Fun, but none of it truly served the goal. The unlock was the idea of **slow life**, the same calm, unbothered energy as the "chill" Instagram accounts posting celebrities out in crocs and loungewear.',
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
      { shot: 'site-avant', cap: 'The original site, before', sub: 'lavraiecharentaise.com as I found it', framed: true },
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
      { shot: 'ui-home', preview: 'home-preview', cap: 'Home' },
      { shot: 'ui-product', preview: 'product-preview', cap: 'Product, La Gilbert' },
      { shot: 'ui-quiz', cap: 'Match result, La Soupette' },
      { shot: 'ui-lookbook', preview: 'lookbook-preview', cap: 'Lookbook' },
    ],
  },

  prototype: {
    eyebrow: 'Prototype',
    idx: 'Live',
    note: 'Click through the full storefront, browse the collection, open a product, personalize a pair and run the matchmaking quiz.',
    src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FVdtPGwGX4UdzfrZEYUyg0C%2FLa-Vraie-Charentaise%3Fnode-id%3D1572-6490%26p%3Df%26viewport%3D620%252C367%252C0.02%26t%3DpN63FAbaKW3hZBkQ-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D1572%253A6490%26show-proto-sidebar%3D0%26hide-ui%3D1%26page-id%3D1252%253A1812',
  },

  footer: 'La Vraie Charentaise',

  gallery: [
    { src: '/assets/lvc/photo-lavomatic.webp', name: 'Lavomatic', sub: 'Self-shot editorial for the lookbook' },
    { src: '/assets/lvc/photo-magasin.webp', name: 'In the shop', sub: 'Retro-modern staging, shot at home' },
    { src: '/assets/lvc/photo-charentaises.webp', name: 'The product', sub: 'The charentaises themselves, up close' },
  ],

  shots: {
    perso: '/assets/lvc/perso.gif',
    'site-avant': '/assets/lvc/site-avant.webp',
    logo: '/assets/lvc/logo.gif',
    'wire-home': '/assets/lvc/wire-home.png',
    'wire-collection': '/assets/lvc/wire-collection.png',
    'wire-product': '/assets/lvc/wire-product.png',
    'wire-quiz': '/assets/lvc/wire-quiz.png',
    'ui-home': '/assets/lvc/ui-home.png',
    'ui-product': '/assets/lvc/ui-product.png',
    'ui-quiz': '/assets/lvc/ui-quiz.png',
    'ui-lookbook': '/assets/lvc/ui-lookbook.png',
    'home-preview': '/assets/lvc/home-preview.png',
    'product-preview': '/assets/lvc/product-preview.png',
    'lookbook-preview': '/assets/lvc/lookbook-preview.png',
  },
}
