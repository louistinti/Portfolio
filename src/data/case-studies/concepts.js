// Case study: concepts (route #/concepts).
export const concepts = {
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
    { src: '/assets/UI/Atlas.webp', name: 'Atlas', sub: 'Project OS for software teams' },
    { src: '/assets/UI/Draft.webp', name: 'Draft', sub: 'AI writing copilot' },
    { src: '/assets/UI/Signal.webp', name: 'Signal', sub: 'Product analytics' },
    { src: '/assets/UI/Mobile.webp', name: 'On mobile', sub: 'Native iOS across the set' },
  ],

  footer: 'Concepts · Self-initiated UI',
}
