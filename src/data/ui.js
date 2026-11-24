// Libellés d'interface (chrome du site), version anglaise.
// Tout texte visible qui ne vit pas déjà dans site.js / case-studies/ doit
// passer par ici, pour que la bascule FR/EN couvre l'intégralité du site.
// Miroir français : ui.fr.js (mêmes clés, obligatoirement).
export const ui = {
  nav: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#work', label: 'Work' },
      { href: '#skills', label: 'Skills' },
      { href: '#contact', label: 'Contact' },
    ],
    cta: 'Get in touch',
    ariaHome: 'Back to home',
    ariaOpen: 'Open menu',
    ariaClose: 'Close menu',
    ariaMenu: 'Menu',
    ariaLang: 'Language',
  },
  hero: {
    kicker: 'Portfolio, 2026',
    l1: 'I design',
    l1a: 'complex',
    l2: 'B2B',
    l2a: 'products',
    sub: 'Business tools, operational SaaS and multi-user platforms: I design them and build them with AI, from research to the shipped interface. Freelance, time and materials or fixed price.',
    cta: 'See my work',
    scroll: 'Scroll ↓',
  },
  about: {
    title: 'About',
    approach: {
      h: '// Approach',
      p: 'Research first, systems always. I design the structure behind a product, its flows, hierarchy and components, so it holds up as it grows.',
    },
    now: {
      h: '// Now',
      p: 'Freelance, on a time-and-materials basis (remote, or on site in and around Nantes or in the Paris region) or at a fixed price for a B2B SaaS product website.',
    },
    details: '// Details',
    portrait: 'Portrait',
  },
  work: {
    title: 'Selected work',
    tldr: 'TL;DR',
    soon: 'Coming soon',
    ph: '[ Project image, replace ]',
  },
  // Section « Offres », entre Projets et Compétences.
  offers: {
    title: 'Services',
    items: [
      {
        h: 'Time and materials',
        p: 'I join your product team, remotely, or on site in and around Nantes or in the Paris region.',
      },
      {
        h: 'B2B SaaS product website, fixed price',
        p: 'We set the scope and the timeline together before we start.',
        link: { label: 'See an example: Seuil', href: 'https://seuil.louistdesign.me' },
      },
    ],
  },
  skills: { title: 'What I do', toolbox: '// Toolbox' },
  contact: {
    title: "Let's talk",
    big: 'Have a product *to build?*',
    lead: "Tell me what's holding your product back and we'll talk it through on a call.",
    talk: "Let's talk",
    cv: 'Download CV',
  },
  modal: {
    eyebrow: "// Let's talk",
    titlePre: 'How would you like to',
    titleAccent: 'connect?',
    send: 'Send a message',
    copy: 'Copy',
    copied: 'Copied ✓',
    ariaCopy: 'Copy email address',
    ariaCopied: 'Email address copied',
    book: 'Book a call',
    bookSub: '15 min phone, 30 min or 1h on Meet',
    ariaClose: 'Close',
  },
  footer: { top: 'Back to top' },
  // Template d'étude de cas : libellés hors données (les eyebrows viennent des
  // données, déjà localisées par langue).
  cs: {
    docTitle: 'Project',
    overview: 'Overview',
    research: 'Research',
    ideation: 'Ideation',
    design: 'Design',
    roadmap: 'Roadmap',
    prototype: 'Prototype',
    results: 'Results',
    allWork: 'All work',
    keyInsight: 'Key insight',
    pain: 'Pain',
    open: 'Open',
    measured: 'How it was measured',
    targets: '// Framing targets vs. reality',
    stShipped: 'Shipped',
    stBuilding: 'Building',
    stPlanned: 'Planned',
    stHit: 'Hit',
    stMissed: 'Not met',
    stNoData: 'No data',
    nextUp: 'Next up',
    backAll: 'Back to all work',
    backTop: 'Back to top',
    ariaOpenPreview: 'Open preview',
    ariaClosePreview: 'Close preview',
  },
}
