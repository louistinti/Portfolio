// ──────────────────────────────────────────────────────────────
//  Tokens de motion — personnalité « précis & snappy ».
//  Une seule source de vérité pour durées, easings et staggers,
//  au même titre que les design tokens CSS de design-system.css.
// ──────────────────────────────────────────────────────────────

export const ease = {
  out: 'expo.out', // reveals, micro-interactions
  inOut: 'expo.inOut', // rideau de transition
}

export const dur = {
  fast: 0.3, // micro-interactions
  base: 0.5, // reveals au scroll
  page: 0.6, // rideau (par phase : couvrir / lever)
}

export const stagger = {
  lines: 0.09, // lignes de titre masquées
  items: 0.06, // cartes, meta, boutons
}

// Le motion est coupé net pour qui préfère le calme.
export const motionEnabled = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Lenis : desktop précis uniquement — le scroll tactile reste natif.
export const lenisEnabled = () =>
  motionEnabled() && finePointer() && window.innerWidth >= 1024
