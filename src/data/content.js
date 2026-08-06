// ──────────────────────────────────────────────────────────────
//  CONTENU DU PORTFOLIO — point d'entrée (barrel)
//  Le contenu vit désormais dans des modules dédiés :
//    · site.js               → identité + sections de la home
//                              (profile, contactLinks, heroChips, skills,
//                               tools, projects)
//    · case-studies/<slug>.js → une étude de cas par fichier
//    · case-studies/index.js  → assemble la map `caseStudies`
//  Ce fichier ré-exporte tout pour garder les imports existants stables
//  (`from '../data/content.js'`). Édite les modules, pas ce fichier.
// ──────────────────────────────────────────────────────────────

export { profile, contactLinks, heroChips, skills, tools, projects } from './site.js'
export { caseStudies } from './case-studies/index.js'
export { ui } from './ui.js'
