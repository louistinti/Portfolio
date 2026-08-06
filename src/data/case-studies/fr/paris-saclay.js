// Étude de cas : paris-saclay, version FR. Texte repris du portfolio Notion
// d'origine (FR) ; thème, images et URL de prototype partagés avec l'EN.
import { parisSaclay as en } from '../paris-saclay.js'

export const parisSaclay = {
  ...en,
  title: "Refonte de l'app de l'université *Paris-Saclay*",
  kicker: ['Étude de cas', 'UX Research · UX/UI · Prototype'],
  meta: [
    { k: 'Rôle', v: 'UX Research, UX/UI' },
    { k: 'Device', v: 'iOS / Android' },
    { k: 'Client', v: 'Paris-Saclay' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: 'Rendre le campus *accessible*, connecté et au goût du jour.',
    body: [
      "L'app existante de l'université Paris-Saclay était **quasiment inutilisée** et n'avait pas de réel impact sur la vie des étudiants. Le brief du pôle digital du campus : en faire un outil indispensable, du quotidien.",
      "J'ai passé une journée sur le campus, à m'y balader et à rencontrer les étudiants pour entendre leurs problèmes du quotidien de vive voix, et compléter le brief avec du vrai contexte terrain.",
      "Le campus souffre d'un **manque d'image et d'appartenance**. S'y orienter, et communiquer avec l'administration comme avec les professeurs, est un vrai défi quotidien.",
    ],
    stats: [
      { v: '77', u: 'km²', k: 'de campus à parcourir, avec un grand nombre de bâtiments.' },
      { v: '~10', k: 'étudiants interviewés sur le campus pour découvrir et confirmer les pain points.' },
      { v: '1', u: 'jour', k: 'passé sur place, à arpenter le campus et rencontrer les étudiants.' },
    ],
  },

  challenge: {
    quote: "Comment faire d'un campus de *77 km²* un lieu auquel les étudiants ont vraiment le sentiment d'appartenir ?",
    who: '// Le défi central',
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Étudier l'app, puis *écouter* les étudiants qui l'utiliseraient.",
    body: [
      "En auditant l'app en ligne et en interviewant une dizaine d'étudiants, j'ai découvert et confirmé plusieurs pain points récurrents, puis je les ai distillés en trois personas représentant des parcours de campus distincts.",
      'Chaque persona partage la même friction de fond : **communiquer est difficile, et le campus est difficile à naviguer**.',
    ],
    personas: [
      { name: 'Elsa', id: 'P-01', shot: 'persona-1', goal: "A pour but d'être dans le top de sa promo.", pain: 'Les difficultés à communiquer avec les professeurs et à se déplacer sur le campus lui rendent la tâche vraiment plus difficile.' },
      { name: 'Romain', id: 'P-02', shot: 'persona-2', goal: "Aimerait faire des activités avec les étudiants d'autres écoles.", pain: "L'information circule difficilement, et les déplacements entre écoles sont vraiment compliqués." },
      { name: 'Veronica', id: 'P-03', shot: 'persona-3', goal: 'Arrivée récemment en France, cherche à rencontrer du monde et à s’intégrer vite.', pain: 'Les étudiants se mélangent peu : s’intégrer est quasiment impossible pour elle.' },
    ],
    insight: "Les étudiants ont besoin d'aide pour *communiquer*, avec les professeurs, l'administration et entre eux. Et le campus étant très étendu, s'y *repérer* est une difficulté quotidienne, d'autant que les étudiants changent souvent de salle entre les cours.",
  },

  ideation: {
    eyebrow: 'Idéation',
    idx: 'Étape 02',
    lede: 'Des pain points à un *set de features* resserré.',
    body: [
      "J'ai benchmarké outils et rubriques au regard de la recherche, et resserré sur les six qui répondaient le plus directement aux besoins des étudiants : communication et navigation d'abord.",
      "J'ai tracé un **user flow** simple pour visualiser comment les rubriques se connectent, puis mené des benchmarks ciblés sur les plus délicates : la map, l'agenda, le chat et le fil actus & événements.",
      "J'ai ensuite mené des exercices de **6-to-1**, principalement sur la home, pour agencer le tout de la façon la plus ergonomique possible.",
    ],
    features: [
      { id: 'F-01', name: 'Agenda', desc: 'Emploi du temps personnel, salles et changements inclus.' },
      { id: 'F-02', name: 'Map & géolocalisation', desc: 'Se repérer sur 77 km² de campus.' },
      { id: 'F-03', name: 'Annuaire', desc: "Joindre les professeurs et l'administration." },
      { id: 'F-04', name: 'Chat', desc: 'Écrire directement aux étudiants, profs et staff.' },
      { id: 'F-05', name: "Fil d'actualité", desc: "L'information du campus qui circule enfin." },
      { id: 'F-06', name: 'Événements', desc: 'Des activités inter-écoles pour connecter les étudiants.' },
    ],
    media: [
      { shot: '6to1', cap: '6-to-1 · home page', sub: 'Ergonomie & hiérarchie', framed: true },
    ],
  },

  wireframes: {
    eyebrow: 'Wireframes',
    idx: 'V1 → V4',
    intro: "Quatre itérations de la home, chacune resserrant la hiérarchie et l'ergonomie jusqu'à ce que la structure tombe juste.",
    items: [
      { shot: 'wire-1', v: 'V1', t: 'Premier jet' },
      { shot: 'wire-2', v: 'V2', t: 'Réordonnée' },
      { shot: 'wire-3', v: 'V3', t: 'Affinée' },
      { shot: 'wire-4', v: 'V4', t: 'Finale', final: true },
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Concept visuel',
    title: "Relier toute l'app par la *topographie*.",
    body: "Une fois l'architecture et la hiérarchie finalisées, j'ai cherché un moyen de lier toute l'app dans un parcours homogène. Paris-Saclay étant un espace très vaste, avec de vrais reliefs, je me suis inspiré des **cartes topographiques** : courbes de niveau et élévations créent un subtil effet de **relief** dans toute l'interface.",
  },

  ui: {
    ...en.ui,
    eyebrow: 'UI & Système',
    idx: 'Étape 03',
    lede: 'Un *style guide* et des composants pour garder chaque écran cohérent.',
    body: [
      "J'ai construit un style guide et un set de composants pour fluidifier le design de chaque écran, puis assemblé le prototype complet, présenté aux responsables du pôle digital de Paris-Saclay.",
      "J'ai conservé le **magenta primaire** de Paris-Saclay en le déclinant en quelques teintes, pour créer l'effet de relief topographique qui traverse le produit.",
    ],
    paletteLabel: '// Relief · magenta primaire, décliné',
    paletteNote: 'Une primaire, six élévations : les teintes suivent les courbes de niveau et donnent de la profondeur sans nouvelle couleur.',
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'Prototype',
    idx: 'Live',
    note: 'Le prototype commence comme si vous étiez un étudiant de l\'université. Pour faire le parcours d\'inscription ou accéder à la page « invité », déconnectez-vous de votre profil dans le prototype. La touche `R` fonctionne aussi.',
  },

  footer: 'App de l’université Paris-Saclay · Étude de cas',
}
