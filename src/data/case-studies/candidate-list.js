// Case study: candidate-list (route #/candidate-list).
export const candidateList = {
  name: 'Actual - Candidate List',
  title: 'Turning a heavy list into a *scannable* candidate view',
  kicker: ['UX Research · UX/UI · Desktop'],
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
    // Résumé des résultats (repris en détail dans `results`), même parti pris
    // que sur le projet Guarantee : accroche chiffrée en haut, preuve en bas.
    stats: [
      { v: '2-3', u: 'min', k: 'saved per candidate to judge "ready to work or not".' },
      { v: '20', u: '+', k: 'filters cut from the interface, on research evidence.' },
      { v: '141', k: "recruiters surveyed on the row's must-see info and actions." },
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
      'The expected impact was framed on three axes before any pixel: **efficiency** (time saved on sorting, qualifying and follow-up, fewer stalled files), **growth** (a more reactive pool, activation and replacements) and **scale** (an interface and columns that hold as volumes grow). The results below claim only what the pilot actually measured.',
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

  results: {
    eyebrow: 'Results',
    idx: 'Pilot · Nov 2025',
    lede: 'The row now does the reading, so the *profile stays closed*.',
    body: [
      'In pilot since **November 2025**, the new list won real adoption: recruiters **save 2 to 3 minutes per candidate** on the one judgement they make dozens of times a day, is this person ready to work?',
      'Downstream, fewer files slip through the cracks and prioritization got sharper, expiring documents and urgent replacements are now visible **before** someone opens a profile, not after.',
    ],
    metrics: [
      {
        k: 'Saved per candidate',
        to: '2-3 min',
        note: 'On judging readiness, without opening a single profile.',
      },
      {
        k: 'Filters cut before the pilot',
        to: '20+',
        note: 'Dropped on Hotjar and Analytics evidence, not on opinion.',
      },
    ],
    noteLabel: 'How it was measured',
    note: 'The 2 to 3 minutes come from **user interviews** with the recruiters running the pilot, not from instrumentation, and they cover **one specific judgement**, is this candidate ready to work, rather than the whole hiring flow. It is a first read rather than a settled figure: before claiming more I would want a full quarter of usage behind it.',
  },

  prototype: {
    eyebrow: 'Outcome',
    idx: 'In hindsight',
    note: 'The second solution, the sourcing list and talent pools, was **validated by management right before I left Actual**, so I never got to test it with users. That is the one honest gap in an otherwise solid run, and the part I would want back: a design validated by stakeholders is not the same thing as a design validated by the people who use it.',
  },

  footer: 'Candidate list · Actual Group',

  shots: {},
}
