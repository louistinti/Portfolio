// Étude de cas — charentaise, version FR. Texte repris du portfolio Notion
// d'origine (FR) ; thème, images et URL de prototype partagés avec l'EN.
import { charentaise as en } from '../charentaise.js'

export const charentaise = {
  ...en,
  title: 'Faire de la *charentaise* une icône de la slow life',
  kicker: ['Étude de cas', 'Branding · UX/UI · E-commerce'],
  meta: [
    { k: 'Rôle', v: 'Branding, UX/UI' },
    { k: 'Type', v: 'Projet libre' },
    { k: 'Plateforme', v: 'Web & mobile' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: 'Un brief libre, et un mot glissant à défendre : *la flemme*.',
    body: [
      "Un **projet libre**, sans brief ni client. Après une courte journée d'idéation, je me suis arrêté sur un thème unique et glissant : **« la flemme »**, cet art très français de ne rien faire.",
      "Le mot porte une lourde connotation négative (il signifie surtout ne rien faire de **productif**), et la flemme est un ressenti : intime, quasi impossible à définir pareil pour tout le monde.",
      "Le tout dans un contexte **post-COVID** où le télétravail avait effacé la frontière entre maison et bureau, avec des journées de 10-12 h sans vraie pause. L'objectif : **dédramatiser la flemme** et donner la permission de ralentir.",
    ],
    stats: [
      { v: '85', k: 'personnes sondées sur leur perception de « la flemme ».' },
      { v: '63', u: '%', k: 'trouvent que la flemme est mal vue aujourd’hui, le problème est confirmé.' },
      { v: '1', u: '/jour', k: 'la majorité ressent « la flemme » au moins une fois par jour.' },
    ],
  },

  challenge: {
    quote: "Comment donner forme à quelque chose d'aussi abstrait que *la flemme*, et donner envie de l'assumer ?",
    who: '// Le défi central',
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Écouter d'abord : un *questionnaire* sur notre rapport au « rien faire ».",
    body: [
      "Pour dépasser mes propres a priori, j'ai envoyé un **questionnaire** sur la flemme : comment chacun la définit, la perçoit, se la représente.",
      "Sur **85 répondants**, le verdict était déjà clair : **63 %** trouvent la flemme mal vue aujourd'hui (26 % non, 11 % entre les deux), et la majorité admet la ressentir **au moins une fois par jour**. Sujet validé, et défendable.",
    ],
    insight: "La flemme est universelle mais silencieusement jugée. La bonne entrée n'était pas de défendre *la paresse*, mais de la recadrer en *slow life* : choisir, volontairement, de ralentir et de revenir à l'essentiel.",
  },

  ideation: {
    eyebrow: 'Idéation',
    idx: 'Étape 02',
    lede: "D'un ressenti abstrait à une *icône concrète*.",
    body: [
      "« La flemme » était trop abstraite et trop négative pour être attaquée de front. J'ai d'abord tenté des angles ludiques : un site « quel flemmard es-tu ? », un mini-jeu pour devenir le meilleur flemmard. Amusants, mais aucun ne servait vraiment l'objectif de dédramatiser. Le déclic est venu de la **slow life**, cette même énergie tranquille que les comptes Instagram « chill » qui postent des stars sorties en crocs et tenue décontractée.",
      "Et quelle meilleure icône du ralentissement qu'un quasi top 1 chez les 60 ans et plus : **la charentaise**. J'ai trouvé le vrai site *lavraiecharentaise.com*, poussiéreux et daté, et j'en ai fait la base d'une refonte totale, une seconde vie pour le produit.",
      "Le pitch : associer **l'authenticité** d'une vraie charentaise française à son devenir, *une icône de la slow life*. De là, deux features sont nées en premier (un **quiz** et un outil de **personnalisation**) avant de grandir en boutique complète.",
    ],
    features: [
      { id: '01', name: 'Quiz matchmaking', desc: 'À l’arrivée, un quiz ludique vous attribue votre paire personnalisée idéale.' },
      { id: '02', name: 'Personnalisation', desc: 'Composez votre paire : couleur, taille, motif et matière.' },
      { id: '03', name: 'Collection', desc: 'Parcourez les modèles : La Gilbert, La Soupette et les autres.' },
      { id: '04', name: 'Fiches produit', desc: 'Tailles, détails et ajout au panier, avec un raccourci personnalisation.' },
      { id: '05', name: 'Lookbook', desc: 'Des photos éditoriales faites maison, les charentaises dans la vraie vie.' },
      { id: '06', name: 'Communauté', desc: 'Une newsletter, « Tiens-toi au jus », et les réseaux pour garder le lien.' },
    ],
    media: [
      { shot: 'perso', cap: 'Personnalisation', sub: 'Couleur · taille · motif · matière', aspect: '16 / 9' },
    ],
  },

  wireframes: {
    eyebrow: 'Wireframes',
    idx: 'V1 → V3',
    intro: "J'ai itéré la home de V1 à une V3 finale pour verrouiller sa structure, puis décliné la maquette sur les écrans clés (collection, produit, résultat du quiz) avant tout stylage.",
    pages: [
      { shot: 'wire-home', cap: 'Home' },
      { shot: 'wire-collection', cap: 'Collection' },
      { shot: 'wire-product', cap: 'Fiche produit' },
      { shot: 'wire-quiz', cap: 'Résultat du match' },
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Identité visuelle',
    title: 'Un univers *rétro-moderne* pour la slow life.',
    body: "L'identité marie volontairement deux choses : la charentaise authentique made-in-France et un langage pop rétro-moderne, chaleureux, qui murmure « ralentis ». J'ai assuré la direction artistique et **réalisé moi-même toutes les photos produit et les visuels**, pour que chaque image porte le même calme habité.",
  },

  ui: {
    ...en.ui,
    eyebrow: 'UI & Système de marque',
    idx: 'Design',
    lede: 'Un seul *système*, appliqué à chaque écran.',
    body: [
      "En parallèle, j'ai développé un design system compact (couleurs, grilles, typographies, ombres) pour que chaque page appartienne au même univers tout en restant simple à parcourir.",
      "J'ai choisi **quatre couleurs** qui rappellent les teintes les plus fréquentes des vraies charentaises, puis associé chacune à une section du site : la navigation devient intuitive en plus d'être belle.",
    ],
    paletteLabel: '// Palette · tirée de la charentaise',
    paletteNote: 'Une base ivoire et noir, plus quatre couleurs de section, une par partie du site, pour une navigation intuitive.',
    pages: [
      { shot: 'ui-home', preview: 'home-preview', cap: 'Home' },
      { shot: 'ui-product', preview: 'product-preview', cap: 'Produit, La Gilbert' },
      { shot: 'ui-quiz', cap: 'Résultat du match, La Soupette' },
      { shot: 'ui-lookbook', preview: 'lookbook-preview', cap: 'Lookbook' },
    ],
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'Prototype',
    idx: 'Live',
    note: 'Parcourez la boutique complète : la collection, une fiche produit, la personnalisation d’une paire et le quiz de matchmaking.',
  },

  footer: 'La Vraie Charentaise · Étude de cas',
}
