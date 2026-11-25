// Case study: seuil (route /work/seuil/).
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

  context: {
    eyebrow: 'Context',
    lede: 'Seuil is a fictional B2B SaaS that helps SMEs decide, order by order, whether a customer can be delivered on credit.',
    body: [
      'I designed its marketing site end to end, from framing to launch, to show how I work on a complex product.',
      "For three years at Groupe Actual, I designed the guarantee and non-guaranteed exposure (ENG) management tool, which went from 0 to 90.5% of decisions automated. I can't show those screens, because they are covered by a non-disclosure agreement.",
      'So I chose to create Seuil, a fictional product in the same field: customer credit decisions. That way, I could publicly show my understanding of the subject without revealing anything of the work done for Actual.',
      'I also wanted to test the offer I make to B2B SaaS companies: a site that explains a complex product as well as the sales team does, and that marketing can edit on its own.',
    ],
    stats: [
      { v: '6', k: 'live pages, editable in a CMS.' },
      { v: '5', u: 'days', k: 'from the first mockup to the last fix.' },
      { v: '28', k: 'components documented in the design system.' },
    ],
  },

  research: {
    eyebrow: 'Research',
    idx: 'Step 01',
    lede: 'Since Seuil is fictional, I had no customers or team to interview.',
    body: [
      'So I focused the research on the B2B credit management market, to position Seuil against real products.',
      'I first noticed that there is no neutral ranking: most comparisons are published by the vendors themselves. So I grouped the players myself into three groups:',
      '**Enterprise platforms**, from order to cash (HighRadius, Esker, Sidetrade, Billtrust, Serrala, Emagia);',
      '**Mid-market tools**, closer to Seuil (Tesorio, Gaviti, Onguard, Hoopiz, the last one targeting the same roles as Seuil);',
      '**Data providers**, such as Dun & Bradstreet or Coface, which I treated as integrations rather than competitors.',
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
      'For the rest, I went with floating frosted-glass cards with rounded corners and a cyan accent. The blurred colour halo only appears behind a card, never as a plain background, so that it serves reading rather than decoration.',
      'For typography, I set aside editorial serif fonts in favour of easy-to-read sans-serifs: Urbanist for headings, Geist for body text and Geist Mono for figures. Spacing follows an 8-point grid, with 4 for fine adjustments.',
    ],
    shot: 'home',
  },

  ui: {
    eyebrow: 'Design system',
    idx: '28 components',
    lede: 'I first defined the tokens, the single source of truth for colours, sizes, spacing, radii and shadows.',
    body: [
      'No value is hardcoded in the components, which lets the site evolve without reworking it page by page.',
      'Then I documented each shared component with its variants, its states and the tokens it uses: buttons, choice chips, status badges, gauges, rule blocks, decision cards, tables, plan cards, 28 components in all. I also listed what is deliberately not designed, to avoid ad hoc additions.',
      'Finally, each page is a sequence of typed sections (hero, problem, benefits by role, steps, feature, integrations, pricing, FAQ, call to action). Each section maps to a component and a schema in the Sanity CMS. So someone in marketing builds a page with the same building blocks as I do, and Sanity, for example, refuses to publish a price without its source line.',
    ],
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
      { k: 'Figures', v: 'Geist Mono' },
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
      'The simulator engine is covered by 89 tests, and 94 tests check keyboard, focus and contrast in both themes. A non-technical person edited and published a section of the site on their own.',
    ],
    noteLabel: '// If I did it again',
    note: "If I did it again for a real client, I would start with what Seuil couldn't have: interviews with the founder, the sales team and a customer, so that the site starts from the questions actually asked in demos.",
  },

  prototype: {
    eyebrow: 'Live',
    idx: 'Try it',
    href: 'https://seuil.louistdesign.me',
    linkLabel: 'Visit the site',
    src: 'https://seuil.louistdesign.me',
  },

  footer: 'B2B SaaS product site · Seuil',

  shots: {
    home: '/assets/seuil/cover.webp',
  },
}
