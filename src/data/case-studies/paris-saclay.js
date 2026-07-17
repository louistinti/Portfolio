// Case study — paris-saclay (route #/paris-saclay).
export const parisSaclay = {
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
    shots: ['test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6'],
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
    screens: ['ui-1', 'ui-2', 'ui-4', 'ui-3'],
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
    'test-1': '/assets/ps/Test-1.png',
    'test-2': '/assets/ps/Test-2.png',
    'test-3': '/assets/ps/Test-3.png',
    'test-4': '/assets/ps/Test-4.png',
    'test-5': '/assets/ps/Test-5.png',
    'test-6': '/assets/ps/Test-6.png',
    'ui-1': '/assets/ps/ui-1.png',
    'ui-2': '/assets/ps/ui-2.png',
    'ui-3': '/assets/ps/ui-3.png',
    'ui-4': '/assets/ps/ui-4.png',
  },
}
