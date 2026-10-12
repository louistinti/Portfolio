// Case study: learning-leagues (route #/learning-leagues).
export const learningLeagues = {
  name: 'Learning Leagues',
  title: 'Everything you need to *learn League of Legends*',
  kicker: ['Built solo with AI', 'Product · Design System'],
  status: { label: 'In progress', live: true },
  meta: [
    { k: 'Role', v: 'Solo, design + build' },
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
      "It's **live and still growing**: all five role guides are up, running on an engine I can keep extending. Two rules keep it honest: **no jargon** without explaining it, and **no chasing the meta**, I teach the game's logic, not this patch's build.",
      "Next to it runs a second repo: an **AI-first component library** that feeds the site, built by AI sessions under a handful of human locks. It's the part of the project where I test how far a designer can push the machine while keeping the decisions.",
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
      'Everything runs on one set of CSS variables, a single **Hextech palette**, gold on deep blue. One **accent axis** swaps the live accent from a `data-accent` attribute on any element, five values, one per role (ambre, bleu, rouge, violet, jade), so a whole guide re-themes from one attribute.',
      "The system started as hand-written CSS on the site. It now lives in **Figma** as variables and flows one way into the library below: 128 tokens, generated, never typed by hand. EB Garamond for headings, Inter for body, JetBrains Mono for labels, documented on the site's own reference page and on the library's.",
    ],
    paletteLabel: '// Hextech · gold on deep blue',
    paletteNote: 'A single Hextech palette as the source of truth; five accents, one per role, swapped by data-attribute.',
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

  // Section « The library » : rendue par le slot `results` du template
  // (chiffres en tête, récit, note encadrée). Chiffres relevés dans le repo
  // LearningLeagues-Lib (README, STATE-MANIFEST, reports/conformity.md) le
  // 2026-09-23 : 128 tokens, 11 gates, 3 composants, 12 + 23 + 28 usages.
  results: {
    eyebrow: 'The library',
    idx: 'LearningLeagues-Lib',
    metrics: [
      {
        k: 'Design tokens',
        to: '128',
        note: 'Extracted from Figma variables into one generated stylesheet. Nobody types a token.',
      },
      {
        k: 'Executable gates',
        to: '11',
        note: 'Every PR blocks on them in CI: token lint, contrast, axe, a real-browser smoke of every docs page.',
      },
      {
        k: 'Components shipped',
        to: '3',
        note: 'Button, Callout, Eyebrow, each through the RFC circuit and adopted by the site before promotion.',
      },
      {
        k: 'Usages migrated',
        to: '63',
        note: 'Hand-written CSS on the site replaced by library components, zero compensations.',
      },
    ],
    lede: 'A component library *built by AI, for AI*, with a human on the locks.',
    body: [
      "Learning Leagues is a buildless site with a growing design system, so I opened a second repo to test a question I care about as a designer: **can a component library be run almost entirely by AI agents, and still be trusted?** The library is built by AI sessions and consumed by AI sessions writing product code. My job is not to write components, it's to design the system they work in.",
      'Design tokens flow **one way**, Figma → extraction pipeline → one generated stylesheet; no agent and no human ever writes a token by hand. Every component goes through the same **circuit**: a usage analysis of the site, an RFC I approve, the implementation, adoption by the site, then a promotion script that flips it to *stable* only when every gate is green. Status is never edited by hand, so it means something.',
      'The rules live in an operating contract the agents read before anything else (`AGENTS.md`), with six axioms: never hardcode a design value, never hand-edit a generated file, accessibility is a hard requirement, never fake a missing component, one writing session per repo, and a stale file is misinformation. Each session ends with a three-block report: what to understand, what to decide, what to paste.',
      'The [documentation site](https://louistinti.github.io/LearningLeagues-Lib/) and the [repository](https://github.com/louistinti/LearningLeagues-Lib) are public. The docs are generated from the component contracts, never written on the side.',
    ],
    noteLabel: '// The human locks',
    note: "The scarce resource is my attention, so the contract lists the gestures that stay mine and only mine: pressing merge, approving a review, labelling a token change as matching the real Figma export, arbitrating a component's API or any visual value, setting priority, validating a visual checkpoint. Everything else is delegated. The design decisions are still human; the machine proves they were applied.",
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
      "The engine made breadth cheap, and the library is now taking the design system off the site's hands. A snapshot of what's shipped and what's coming.",
    ],
    items: [
      { state: 'done', name: 'Five role guides', desc: 'Top, Jungle, Mid, ADC and Support, all live on the shared engine.' },
      { state: 'done', name: 'Data-driven role engine', desc: 'Per-section error boundary and one source of truth for the live patch.' },
      { state: 'done', name: 'Design-system reference', desc: 'Foundations, components and patterns on their own Hextech page.' },
      { state: 'done', name: 'AI-first component library', desc: 'Tokens from Figma, 11 CI gates, three components through the circuit and adopted by the site.' },
      { state: 'building', name: 'Site on the library', desc: 'Migrating the remaining hand-written CSS, one usage analysis and one RFC at a time.' },
      { state: 'building', name: 'Champions layer', desc: 'Per-champion pages branching off each role guide.' },
      { state: 'building', name: 'Role quiz', desc: 'A short quiz that points new players to the role that fits them.' },
      { state: 'planned', name: 'Playable drills', desc: 'Turning the training vignette into measurable, trackable reps.' },
      { state: 'planned', name: 'Bilingual site', desc: 'FR/EN parity across every guide, wired to the language switcher.' },
    ],
  },

  footer: 'Learning Leagues · Personal project · In progress',

  shots: {},
}
