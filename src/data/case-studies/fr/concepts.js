// Étude de cas : concepts, version FR (traduite de l'EN, galerie pure UI).
import { concepts as en } from '../concepts.js'

export const concepts = {
  ...en,
  title: 'Concept work, *pure UI*',
  kicker: ['Concept work', 'Explorations UI · Auto-initié'],
  meta: [
    { k: 'Type', v: 'Auto-initié' },
    { k: 'Focus', v: 'Pur UI / craft' },
    { k: 'Produits', v: 'Fictifs' },
  ],

  context: {
    eyebrow: 'Concept work',
    lede: 'Des produits fictifs, *un vrai craft d’interface*.',
    body: [
      "Une série d'explorations UI auto-initiées, sans client ni vraies métriques, juste la partie du métier que je préfère : hiérarchie, densité et retenue. Chacune est un produit différent, avec un langage visuel différent.",
      "Un **OS de projet** pour équipes logicielles, un **copilote d'écriture IA** et une suite d'**analytics produit**, pensés pour être regardés de près.",
    ],
  },

  gallery: [
    { src: '/assets/UI/Atlas.webp', name: 'Atlas', sub: 'OS de projet pour équipes logicielles' },
    { src: '/assets/UI/Draft.webp', name: 'Draft', sub: 'Copilote d’écriture IA' },
    { src: '/assets/UI/Signal.webp', name: 'Signal', sub: 'Analytics produit' },
    { src: '/assets/UI/Mobile.webp', name: 'Sur mobile', sub: 'iOS natif sur toute la série' },
  ],

  footer: 'Concepts · UI auto-initiée',
}
