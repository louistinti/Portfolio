// Case study — garence (route #/garence).
export const garence = {
  name: 'Actual - Guarantee management tool',
  title: "Designing Actual's *guarantee management* tool",
  kicker: ['Case Study', 'Product · UX/UI · B2B SaaS'],
  meta: [
    { k: 'Role', v: 'Lead Product Designer' },
    { k: 'Team', v: '1 PM · 1 designer · 4 devs' },
    { k: 'Duration', v: '1 year' },
    { k: 'Mockups', v: 'Shared in interview' },
  ],

  // Rouge de marque Actual Group (#e40521, relevé sur groupeactual.eu).
  // --topo-1..6 = rampe foncé→clair pour le fond topo subtil.
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
    lede: 'One tool, *three very different users*, and millions of euros on the line.',
    body: [
      "I **led end to end**, as the sole designer, Actual's **guarantee-management tool**. It manages **warranty requests** and **non-guaranteed exposure (ENG)**, the cover that secures the placement of temporary workers, with **millions of euros** riding on each decision.",
      'Actual issues warranties to secure a temp placement, and tracks **non-guaranteed exposure** whenever the insurer steps back, an amount too high, a fast-rising exposure, a client at risk.',
      'It serves three populations with radically different needs: **agencies** initiate and track requests, **Customer Service** investigates and decides, and **management** supervises activity and steers budget envelopes by scope and agency.',
      'It all kicked off mid-**convergence**, as Leader, Ergalis, Up Skills and Ergos folded into shared tools, every entity wanting to keep its own features, with *three Business Owners* to align at once.',
    ],
    stats: [
      { v: '90.5', u: '%', k: 'of Customer Service decisions now fully automated.' },
      { v: '-83', u: '%', k: 'on automated decision time, from 125 s down to 21 s.' },
      { v: '3', k: 'user types unified around one shared standard.' },
    ],
  },

  challenge: {
    quote: 'How do you design *one coherent experience* for three users who want completely different things, while four companies merge into one?',
    who: '// The core challenge',
  },

  research: {
    eyebrow: 'Research',
    idx: 'Step 01',
    lede: 'Inheriting the research, then *seeing it for myself* on the floor.',
    body: [
      'I joined after my lead had run the first interviews. My first job: **make that research my own**, surface the real irritants and **prioritize** them across three populations that shared neither expectations nor constraints.',
      'To pressure-test my hypotheses I spent a day **shadowing and testing** with the Customer Service team at HQ. Watching users in real conditions is still the surest way to confirm, or kill, a design assumption, before we ran a **pilot** with a handful of agencies.',
    ],
    personas: [
      { name: 'Agencies', id: 'U-01', shot: 'persona-1', goal: 'Initiate warranty and ENG requests, and track their status.', pain: 'Informal exchanges and implicit criteria, with almost no visibility on where a request stands.' },
      { name: 'Customer Service', id: 'U-02', shot: 'persona-2', goal: 'Investigate files, run the checks and make the decision.', pain: 'No common standard between entities, long decision times, everything reviewed by hand.' },
      { name: 'Management', id: 'U-03', shot: 'persona-3', goal: 'Supervise activity and steer budget envelopes by scope and agency.', pain: 'Near-zero visibility on non-guaranteed exposure across the network.' },
    ],
    insight: 'Every entity ran its own way, informal rules, implicit criteria, no shared view of exposure. Without a *common standard*, agencies, Customer Service and management could never see the same reality.',
  },

  ideation: {
    eyebrow: 'Design & delivery',
    idx: 'Step 02',
    lede: 'From scattered habits to one *shared, progressive* system.',
    body: [
      'I designed the first **responsive mockups** while juggling the evolving demands of **three Business Owners** at once. The MVP gave every role a clear, structured path, with **explicit states**, inline checks and an **audit trail** so each decision stayed traceable.',
      'Roll-out was step by step: a pilot in real conditions, field feedback, fast tweaks, labels, field order, thresholds, then a **national launch**. I also ran training and onboarding so the first agencies could get going on their own.',
      'The framing targets were sharp: -75% on agency response time, -50% on Customer Service decision actions, -25% on ENG and -20% on total cover held with the insurer.',
    ],
    features: [
      { id: 'F-01', name: 'Progressive request flows', desc: 'Create, cancel, increase, decrease, renew, with explicit states and a summary before sending.' },
      { id: 'F-02', name: 'Real-time insurability test', desc: 'An instant first signal on whether a request is feasible.' },
      { id: 'F-03', name: 'Customer Service workspace', desc: 'Structured criteria review, full history and an audit log.' },
      { id: 'F-04', name: 'Role-based dashboards', desc: 'Tailored views for agencies, Customer Service and management, with extended search and filters.' },
      { id: 'F-05', name: 'Envelope management', desc: 'Allocation, tracking and reallocation by scope and agency, with thresholds, alerts and exports for management.' },
      { id: 'F-06', name: 'Actionable specs', desc: 'Business rules, edge cases and state transitions written to speed up delivery.' },
    ],
  },

  topography: {
    eyebrow: 'Automation',
    mark: '◆',
    title: 'Letting the system decide, *when it should*.',
    body: "The signature move came after launch: when every parameter is green, thresholds, scoring, client history, data consistency, **the system decides on its own** and notifies everyone. It stays fully **auditable and explainable**, the rules are visible, the justification is shown, and a human **override** is always one click away. The point was never to remove people from the loop, but to leave human effort exactly where it earns its keep, on the **hardest files**.",
  },

  results: {
    eyebrow: 'Results',
    idx: 'Feb → Sep 2025',
    lede: 'Seven months after the national rollout, *nine decisions in ten* run on their own.',
    body: [
      'The tool went national in **February 2025**. I followed the automation curve through to **September 2025**, and it climbed steadily as the rules were tuned against real files.',
      'The gain is not only speed, it is **where the humans go**: Customer Service stopped reviewing the obvious files by hand and spent that time on the genuinely difficult ones.',
    ],
    metrics: [
      {
        k: 'Automated decisions',
        from: '739',
        to: '1,243',
        delta: '+68.2%',
        note: 'Decisions handled end to end without a human review.',
      },
      {
        k: 'Share fully automated',
        from: '76.7%',
        to: '90.5%',
        delta: '+13.8 pts',
        note: 'By September, 9 files in 10 never needed a manual pass.',
      },
      {
        k: 'Average automated decision',
        from: '125 s',
        to: '21 s',
        delta: '-83%',
        note: 'Time from request to decision once the system takes it on.',
      },
    ],
    targetsLabel: '// Framing targets vs. reality',
    targets: [
      { name: 'Agency response time', goal: '-75%', state: 'hit' },
      { name: 'Customer Service decision actions', goal: '-50%', state: 'hit' },
      {
        name: 'Non-guaranteed exposure (ENG)',
        goal: '-25%',
        state: 'missed',
        note: 'Some agencies still file an ENG request when they mean a guarantee increase, a flow-clarity and training gap rather than a modelling one.',
      },
      {
        name: 'Total cover held with the insurer',
        goal: '-20%',
        state: 'nodata',
        note: 'No figure I can stand behind on this one.',
      },
    ],
    noteLabel: 'How it was measured',
    note: "Every figure above comes straight from the tools' own **management dashboards**, month by month, not from a survey. Two framing targets landed, one clearly did not, and one I never got a reliable measure of. The *ENG miss* is the useful one: it points at the flow and the wording, not at the scoring, and that is a fixable design problem.",
  },

  prototype: {
    eyebrow: 'Outcome',
    idx: 'In hindsight',
    note: "This is the project that taught me the most about **holding a course through complexity**, multiple stakeholders, a tense context, users with very different needs, and millions of euros at stake, led end to end in full autonomy. With hindsight I'd revisit a few things, the ergonomics, the information hierarchy, the wording of some CTAs, and that gap is exactly the measure of how far the project moved.",
  },

  footer: 'Guarantee management tool · Actual Group · Case study',

  // Personas = les 3 types d'utilisateurs (placeholders rayés tant qu'aucune
  // image n'est posée dans public/assets/).
  shots: {
    'persona-1': '',
    'persona-2': '',
    'persona-3': '',
  },
}
