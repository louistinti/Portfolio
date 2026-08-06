// Case study: renault (route #/renault).
// Écrans = reconstitution personnelle (l'original est sous NDA, voir
// docs/renault-case-study-brief.md pour le cadrage complet et les limites).
export const renault = {
  name: 'Renault Group - Quality intranet',
  title: "Designing Renault Group's *quality* intranet",
  kicker: ['Case Study', 'UX Research · Intranet · SharePoint'],
  meta: [
    { k: 'Role', v: 'UX/UI Designer (apprenticeship)' },
    { k: 'Client', v: 'Renault Group, Quality' },
    { k: 'Duration', v: '2 years · 2020-2022' },
    { k: 'Screens', v: 'Rebuilt from memory (NDA)' },
  ],

  // Couleurs du groupe : gris sombre + jaune Renault (#FFCC33), jaune réservé
  // aux accents, le texte courant reste en blanc cassé (lisibilité).
  theme: {
    '--accent': '#FFCC33',
    '--accent-ink': '#221a04',
    '--accent-line': '#ffd75e',
    '--topo-1': '#131210',
    '--topo-2': '#1d1a14',
    '--topo-3': '#3d3417',
    '--topo-4': '#8a6f1c',
    '--topo-5': '#ffcc33',
    '--topo-6': '#ffe388',
    '--topo-line': 'rgba(255, 204, 51, 0.14)',
  },

  context: {
    eyebrow: 'Context',
    lede: 'One roof for the *seven quality processes*, from the plant to the aftersales desk.',
    body: [
      'During my **two-year apprenticeship** at the **Quality Direction** of Renault Group (Technocentre, Guyancourt), I was the designer on a simple, heavy problem: quality knowledge lived in silos. Finding a document or the right contact in another département meant **emails, meetings and waiting**.',
      'The answer was an **umbrella intranet on SharePoint** gathering the seven quality processes of the group, one entry point for **~10,000 people**, with search, a key-contact directory, news and archives.',
      'I ran the design **solo**, with a manager sponsoring the project up to top management, from the first interviews to the launch presentations in front of **~200 people**.',
    ],
    stats: [
      { v: '7', k: 'quality processes unified under one umbrella site, from strategy to aftersales.' },
      { v: '~10', u: 'k', k: 'people concerned across plants, engineering, sales and dealerships.' },
      { v: '2', u: 'yrs', k: 'end to end: research, information architecture, wireframes, rollout.' },
    ],
  },

  challenge: {
    quote: 'How do you get *10,000 people* to stop hunting for documents by email, inside a three-column SharePoint grid?',
    who: '// The core challenge',
  },

  // Reconstitution interactive (HTML autonome) : montrée tôt, avec le
  // disclaimer NDA annoncé noir sur blanc, règle du brief.
  prototype: {
    eyebrow: 'Mockup',
    idx: 'Reconstruction',
    note: 'The real site is **under NDA**, so nothing here is the original. These screens are a **personal reconstruction**, rebuilt outside Renault to show how the home could look: the seven processes as a tile mosaic on the imposed three-column grid, no real content, no real contacts. The labels of the seven processes are public; everything else is invented.',
    src: '/assets/renault/accueil.html',
  },

  research: {
    eyebrow: 'Research',
    idx: 'Step 01',
    lede: 'Thirty interviews, *from the factory floor to the dealership*.',
    body: [
      'I interviewed **~30 people** across the whole quality chain, plant operators, engineering, sales, dealerships, aftersales, all remote. The pain was the same everywhere: **nobody searched in the same place**, and the fallback was always a mail to someone who might know.',
      'Then I ran **7 workshops, one per pôle**, with the leaders of each process. Format: **card sorting**, to prioritize content and shape an information architecture that matched how people actually think about quality, not how the org chart is drawn.',
    ],
    insight: 'The seven processes are *verbs*, not departments: the internal nomenclature describes activities. The site had to be organized by what people are **doing** (define, build, sell, support), because that is how they look for things.',
  },

  ideation: {
    eyebrow: 'Ideation',
    idx: 'Step 02',
    lede: 'From card sorting to *one entry point* per process.',
    body: [
      'From the workshops I mapped **user journeys** and drew the **wireframes** of the site: a home built on the seven processes, and for each one a page holding its documents, sub-sections and key contacts.',
      'The concept was pitched and iterated in **3 large presentations** in front of ~200 people, two the first year, one at the start of the second for the launch, each followed by a **questionnaire** to collect reactions and objections.',
    ],
    features: [
      { id: 'F-01', name: '7-process home', desc: 'The mosaic of tiles: every process one click away.' },
      { id: 'F-02', name: 'Process pages', desc: 'Documents, sub-sections and owners for each of the seven.' },
      { id: 'F-03', name: 'Search engine', desc: 'One search across documents, data and archives.' },
      { id: 'F-04', name: 'Key-contact directory', desc: 'The right person in another service, without asking around.' },
      { id: 'F-05', name: 'News & updates', desc: 'What changed in quality, pushed instead of forwarded.' },
      { id: 'F-06', name: 'Archives', desc: 'Older material kept findable instead of buried in mailboxes.' },
    ],
  },

  topography: {
    eyebrow: 'Design constraint',
    mark: '◆',
    title: 'Three columns, *no way around it*.',
    body: 'SharePoint was **imposed by the IT department**, and with it a hard layout constraint: **three columns maximum**. The real design work was holding content and clarity on that compact grid: tile mosaics of 3, 2+1 and 1+2, a search bar that stays in reach, and a hierarchy that survives the template. The reconstruction shows the constraint instead of hiding it: an intranet that looked like a free-form website would miss what this job actually was.',
  },

  ui: {
    eyebrow: 'UI & Reconstruction',
    idx: 'Design',
    lede: 'Group colours, *corporate registre*: a work tool, not a landing page.',
    body: [
      'The visual language follows the group: **dark grey** surfaces with the **Renault yellow** strictly as an accent, active states, underlines, highlights. Body text stays off-white: yellow text on dark grey does not hold at small sizes.',
      'Typography is **Segoe UI**, straight angles, dense but scannable, the registre of an internal tool used every day, not of a marketing page. One home screen is rebuilt so far; the process page, search results and directory are next.',
    ],
    paletteLabel: '// Group colours · yellow as accent only',
    paletteNote: 'Dark grey surfaces, off-white text, and the Renault yellow reserved for active states and accents.',
    fonts: [
      { k: 'Titles', v: 'Segoe UI' },
      { k: 'Body', v: 'Segoe UI' },
    ],
    palette: [
      { hex: '#131210', name: 'Charcoal' },
      { hex: '#1D1A14', name: 'Surface' },
      { hex: '#3D3417', name: 'Olive' },
      { hex: '#FFCC33', name: 'Renault Yellow' },
      { hex: '#FFE388', name: 'Sand' },
      { hex: '#F5F2E9', name: 'Off-white' },
    ],
    pages: [
      { shot: 'accueil', cap: 'Home, the 7-process mosaic' },
      { shot: 'processus', cap: 'Process page' },
      { shot: 'recherche', cap: 'Search results' },
      { shot: 'annuaire', cap: 'Key-contact directory' },
    ],
  },

  results: {
    eyebrow: 'Results',
    idx: 'Self-reported',
    lede: 'Less hunting, more finding, *measured the honest way*.',
    body: [
      'The site **launched** before the end of my apprenticeship. After each large presentation I sent a **questionnaire**, and I completed the picture by **shadowing about fifteen users** on their real searches.',
      'Both figures below are **declarative**, what users reported, cross-checked by shadowing, not analytics instrumentation. For an internal SharePoint in 2021, that was the measurement we could stand behind, and it is the claim I make: no more, no less.',
    ],
    metrics: [
      { k: 'Finding a document', to: '−15 min', note: 'Average time saved per search, self-reported and cross-checked by shadowing.' },
      { k: 'Finding a key contact', to: '−3 min', note: 'Average time saved when looking for the right person in another service.' },
    ],
    noteLabel: 'How it was measured',
    note: 'Questionnaires after each ~200-person presentation, plus **shadowing of ~15 users**. Declarative data, honestly labelled as such. What I cannot report: adoption after my departure. I have **no data** on the site’s current state, and I would rather say so than guess.',
  },

  footer: 'Quality intranet · Renault Group · Case study',

  // Un seul écran reconstitué pour l'instant ; les 3 autres suivront
  // (placeholders rayés en attendant).
  shots: {
    accueil: '/assets/renault/accueil.webp',
    processus: '',
    recherche: '',
    annuaire: '',
  },
}
