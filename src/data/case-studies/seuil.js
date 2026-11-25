// Case study: seuil (route /work/seuil/).
// Texte : docs/etude-de-cas-seuil.md (traduit), chiffres de l'artefact public.
export const seuil = {
  name: 'Seuil',
  title: 'The marketing site of *Seuil*, designed then launched end to end',
  kicker: ['B2B SaaS product site · Demo project'],
  meta: [
    { k: 'Role', v: 'Product Designer, solo' },
    {
      k: 'Deliverable',
      v: '6 live pages on [seuil.louistdesign.me](https://seuil.louistdesign.me), editable in a CMS',
    },
    { k: 'Stack', v: 'Astro, TypeScript, Sanity, Vercel' },
    { k: 'Code', v: '[Public repo](https://github.com/louistinti/seuil)' },
    { k: 'Date', v: 'Nov 23, 2026' },
  ],

  // Ordre du document source ; « En ligne » suit le Résultat. Les clés
  // absentes du gabarit (context, offer, ai, hindsight) viennent de `extra`.
  order: [
    'overview',
    'results',
    'prototype',
    'context',
    'offer',
    'ai',
    'research',
    'ideation',
    'topography',
    'design',
    'hindsight',
  ],

  // Cyan de Seuil, relevé dans seuil/src/styles/tokens.css (--cyan-*).
  // --topo-1..6 = rampe foncé→clair pour le fond topo subtil.
  theme: {
    '--accent': '#00B8E6',
    '--accent-ink': '#03212A',
    '--accent-line': '#45D3F5',
    '--topo-1': '#03212A',
    '--topo-2': '#064150',
    '--topo-3': '#00667F',
    '--topo-4': '#00B8E6',
    '--topo-5': '#45D3F5',
    '--topo-6': '#C2EEFA',
    '--topo-line': 'rgba(69, 211, 245, 0.16)',
  },

  // Intro (section « overview » du gabarit).
  context: {
    eyebrow: 'Overview',
    lede: "A site that explains a complex product as well as the sales team does, and that marketing can edit on its own: that's what I offer B2B SaaS companies.",
    body: [
      "Seuil is the demonstration. It's a fictional SaaS that helps SMEs decide, order by order, whether a customer can be delivered on credit, and I designed its site end to end, from framing to launch.",
    ],
    stats: [
      { v: '6', k: 'live pages, editable in a CMS.' },
      { v: '5', u: 'days', k: 'from the first mockup to the last fix.' },
      { v: '31', k: 'components documented in the design system.' },
    ],
  },

  results: {
    eyebrow: 'Results',
    idx: 'Nov 18 → 22, 2026',
    metrics: [
      { k: 'Timeline', to: '5 days', note: 'From November 18 to November 22, 2026.' },
      {
        k: 'Lighthouse',
        to: '100',
        note: 'Performance, accessibility, best practices and SEO, on mobile and desktop, for the home and product pages.',
      },
      { k: 'Simulator tests', to: '89', note: 'Covering the simulator engine.' },
      { k: 'Accessibility tests', to: '94', note: 'Keyboard, focus and contrast, in both themes.' },
    ],
    lede: 'I designed and launched the Seuil site in 5 days, from the first mockup in Claude Design on November 18 to the last fix on November 22, 2026.',
    body: [
      'Measured with Lighthouse 12.6.0 on November 22, 2026, it scores 100 in performance, accessibility, best practices and SEO, on mobile and desktop, for the home and product pages.',
      'The simulator engine is covered by 89 tests, and 94 tests check keyboard, focus and contrast in both themes.',
    ],
  },

  prototype: {
    eyebrow: 'Live',
    idx: 'Try it',
    href: 'https://seuil.louistdesign.me',
    linkLabel: 'Visit the site',
    image: '/assets/seuil/home.webp',
  },

  // Sections libres, placées par `order`.
  extra: {
    context: {
      eyebrow: 'Context',
      lede: 'For three years at Groupe Actual, I designed the guarantee and non-guaranteed exposure (ENG) management tool, which went from 0 to 90.5% of decisions automated.',
      body: [
        "I can't show those screens, because they are covered by a non-disclosure agreement.",
        'So I chose to create Seuil, a fictional product in the same field: customer credit decisions. That way, I could publicly show my understanding of the subject without revealing anything of the work done for Actual.',
      ],
    },
    offer: {
      eyebrow: 'What I can do for you',
      topo: true,
      lede: 'Seuil brings together three skills I put to work for B2B SaaS companies and project owners.',
      body: ['Here is what each one produced here, and what it delivers for you.'],
      cards: [
        {
          title: 'Design system',
          rows: [
            {
              k: 'What Seuil proves',
              v: 'Tokens as the single source of truth, two themes, every component documented with its variants and states, all in an artifact that AI can read',
            },
            {
              k: 'What I do for you',
              v: 'I create or straighten out your design system, so that design, code and AI speak the same language',
            },
          ],
        },
        {
          title: 'AI',
          rows: [
            {
              k: 'What Seuil proves',
              v: 'Mockups in Claude Design, code with Claude Code, and a well-scoped AI feature: the AI translates a sentence into a rule, it never decides',
            },
            {
              k: 'What I do for you',
              v: 'I deliver fast without a generic look, and I design your AI features with guardrails your users understand',
            },
          ],
        },
        {
          title: 'Complex product made clear',
          rows: [
            {
              k: 'What Seuil proves',
              v: 'A decision simulator connected to a real rules engine right on the home page, and pages split by role',
            },
            {
              k: 'What I do for you',
              v: 'Your visitors understand your product without a sales demo',
            },
          ],
        },
      ],
    },
    ai: {
      eyebrow: 'A site built with AI',
      lede: 'I built Seuil with AI from start to finish: the mockups in Claude Design, then the code with Claude Code from the design exports.',
      body: [
        "AI produces fast, but I'm the one who decides. For example, I removed the coloured halo planned behind the simulator after an audit: seen through the glass card, it tinted the background under the text.",
        "The design system follows the same logic. It's a Claude artifact designed first for AI (AI first): the tokens, components, content rules and usage notes are written to be read by Claude before it creates a mockup.",
        'That way, a new page starts from the same colours, the same components and the same rules as the site, without my having to explain them again.',
      ],
    },
    hindsight: {
      eyebrow: 'What I would do differently',
      topo: true,
      note: "If I did it again for a real client, I would start with what Seuil couldn't have: interviews with the founder, the sales team and a customer, so that the site starts from the questions actually asked in demos.",
    },
  },

  research: {
    eyebrow: 'Research',
    idx: 'Step 01',
    lede: 'Since Seuil is fictional, I had no customers or team to interview.',
    body: [
      'So I focused the research on the B2B credit management market, to position Seuil against real products.',
      'There is no neutral ranking: most comparisons are published by the vendors themselves. So I grouped the players myself into three groups: enterprise platforms, mid-market tools closer to Seuil, and data providers, which I treated as integrations rather than competitors.',
      "Then I studied pricing. Direct competitors don't publish theirs, while neighbouring collections tools mostly charge based on the customer's revenue. So I built three revenue-based plans, aligned with LeanPay's prices as recorded by La Fabrique du Net on September 28, 2026, with a €50M threshold that follows INSEE's definition of an SME. Every source is cited on the Pricing page.",
    ],
  },

  ideation: {
    eyebrow: 'Framing',
    idx: 'Step 02',
    lede: 'Once the market was laid out, I defined six pages: home, product, one page per role (finance and credit management, sales and sales administration), pricing and demo request.',
    body: [
      "I chose to split by role, because the same credit decision doesn't raise the same questions for a credit manager and a salesperson.",
      'My biggest challenge was making the product understandable without a sales demo. So I put a decision simulator right on the home page: the visitor picks a customer and an amount, then Seuil answers Accepted, Refused or Sent to the analyst, showing the rule that decided.',
      'On the product page, I added rule writing in natural language. Here too, I set a clear limit: the AI only translates the sentence into a rule, it never decides. It seemed to me the only credible promise for a finance audience.',
      'Finally, I set strict content rules: no invented market figures, testimonials or logos, deliberate placeholders instead, and the label "Fictional data" on every screenshot.',
    ],
  },

  topography: {
    eyebrow: 'Visual direction',
    mark: '◆',
    title: 'I chose a light site and dark product screens.',
    body: [
      'That way, the visitor can tell at a glance what is pitch and what shows the product: the simulator, the screenshots, the data panels and the call-to-action banner all use the dark theme.',
      'For the rest, I went with floating frosted-glass cards with rounded corners and a cyan accent.',
      'For typography, I set aside editorial serif fonts in favour of easy-to-read sans-serifs: Urbanist for headings, Geist for body text and for figures, aligned in columns. Spacing follows an 8-point grid, with 4 for fine adjustments.',
    ],
    shot: 'ds-themes',
    aspect: '16 / 10',
    shotAlt: 'The same Seuil component in the light theme and in the dark product theme',
  },

  ui: {
    eyebrow: 'Design system',
    idx: '31 components',
    lede: 'I first defined the tokens, the single source of truth for colours, sizes, spacing, radii and shadows.',
    body: [
      'No value is hardcoded in the components, which lets the site evolve without reworking it page by page.',
      'Then I documented each shared component with its variants, its states and the tokens it uses: buttons, choice chips, status badges, gauges, rule blocks, decision cards, tables, plan cards, 31 components in all. I also listed what is deliberately not designed, to avoid ad hoc additions.',
      'Finally, each page is a sequence of typed sections (hero, problem, benefits by role, steps, feature, integrations, pricing, FAQ, call to action). Each section maps to a component and a schema in the Sanity CMS. So someone in marketing builds a page with the same building blocks as I do, and Sanity, for example, refuses to publish a price without its source line.',
      "It all lives in a Claude Design System artifact: 59 colours across two themes, 14 text styles and one page per component. It's the reference Claude reads to generate the mockups, not just documentation for humans.",
    ],
    shot: 'ds-etats',
    shotAlt: 'Seuil component states: primary button, field, choice chip and status badge',
    // Couverture de l'artefact « Seuil » (design system), rendue depuis ses
    // fichiers, cliquable vers l'artefact public.
    preview: {
      src: '/assets/seuil/design-system.webp',
      alt: 'Seuil design system cover',
      href: 'https://claude.ai/artifact/95V724XGmbNmjqXFbmWThr',
      linkLabel: 'Explore the design system',
    },
    paletteLabel: '// Colour tokens',
    // Valeurs relevées dans seuil/src/styles/tokens.css.
    palette: [
      { hex: '#F3F4F4', name: 'Neutral 50' },
      { hex: '#121516', name: 'Neutral 900' },
      { hex: '#00B8E6', name: 'Cyan 500' },
      { hex: '#1F9D6E', name: 'Green 500' },
      { hex: '#D9443A', name: 'Red 500' },
      { hex: '#C98A0A', name: 'Amber 500' },
    ],
    fonts: [
      { k: 'Headings', v: 'Urbanist' },
      { k: 'Body', v: 'Geist' },
      { k: 'Figures', v: 'Geist, tabular figures' },
    ],
  },

  footer: 'B2B SaaS product site · Seuil',

  // Visuels de Direction visuelle et du Design system (2000×1250, 16:10).
  shots: {
    'ds-themes': '/assets/seuil/ds-themes.webp',
    'ds-etats': '/assets/seuil/ds-etats.webp',
  },
}
