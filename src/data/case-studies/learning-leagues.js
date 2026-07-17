// Case study — learning-leagues (route #/learning-leagues).
export const learningLeagues = {
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
    insight: "Most guides optimize for *this patch*, a build list that's already stale by the next update. Learning Leagues teaches the **logic underneath**, map control, wave states, the real job of each role, so the understanding outlives the meta instead of expiring with it.",
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
}
