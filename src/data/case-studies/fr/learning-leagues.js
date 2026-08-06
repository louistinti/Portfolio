// Étude de cas — learning-leagues, version FR (traduite de l'EN, projet perso).
import { learningLeagues as en } from '../learning-leagues.js'

export const learningLeagues = {
  ...en,
  title: 'Tout ce qu’il faut pour *apprendre League of Legends*',
  kicker: ['Étude de cas', 'Construit en solo avec l’IA', 'Produit · Design System'],
  status: { label: 'En cours', live: true },
  meta: [
    { k: 'Rôle', v: 'Solo, design + build' },
    { k: 'Construit avec', v: 'L’IA en binôme' },
    { k: 'Stack', v: 'React · sans build' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: "League of Legends est *brutal* à apprendre, alors j'ai construit le guide que j'aurais voulu avoir.",
    body: [
      "League of Legends est un jeu de 15 ans qui part du principe que vous savez déjà y jouer. Les nouveaux sont lâchés dans un 5v5 avec des centaines de champions, des systèmes denses et un mur de jargon communautaire, et la plupart abandonnent avant le déclic.",
      "**Learning Leagues** est ma réponse : un projet perso que je conçois et développe en solo, **avec l'IA en binôme**, qui trace un **parcours structuré par rôle**, du débutant familier des MOBA au joueur low-elo confiant (Iron → Platine).",
      "Le site est **en ligne et continue de grandir** : les cinq guides de rôle sont publiés, portés par un moteur que je peux étendre. Deux règles le gardent honnête : **pas de jargon** sans l'expliquer, et **pas de course à la méta**, puisque j'enseigne la logique du jeu, pas le build du patch.",
    ],
    stats: [
      { v: '5', k: 'rôles en ligne, chacun avec un guide complet ; le Support va le plus loin, en éclaireur.' },
      { v: '1', u: 'moteur', k: 'de rôles data-driven : écrivez les données d’un rôle, il rend tout le guide.' },
      { v: '0', u: 'build', k: 'site statique, React + Babel transpilé dans le navigateur, servi sur GitHub Pages.' },
    ],
  },

  challenge: {
    quote: 'Comment enseigner un jeu qui *part du principe que vous savez déjà y jouer* ?',
    who: '// Le défi central',
  },

  research: {
    eyebrow: 'Approche',
    idx: 'Principes',
    lede: 'Enseigner le *jeu*, pas la méta.',
    body: [
      "Je suis parti de la façon dont on échoue vraiment à apprendre League : on copie des builds sans comprendre pourquoi, et on se noie dans des termes que personne ne définit. Tout le site est donc construit **fondamentaux d'abord** (map, objets, runes, vision, gestion des vagues, objectifs) avant le moindre champion.",
      "Ensuite, ça se ramifie **par rôle**, parce que votre position décide de votre travail sur la map. Chaque guide est **sans jargon par défaut** : un composant `Gloss` explique chaque terme à sa première apparition, adossé à un **glossaire** complet.",
      "Et il reste à sa place : pour les builds live et les stats de patch, il **s'efface** devant les outils qui font déjà ça mieux que tout le monde (Lolalytics, U.GG, OP.GG), et se concentre sur la réflexion que ces outils n'enseignent jamais.",
    ],
    insight: "La plupart des guides optimisent pour *ce patch*, une liste de builds déjà périmée à la mise à jour suivante. Learning Leagues enseigne la **logique en dessous** : contrôle de la map, états des vagues, le vrai métier de chaque rôle, une compréhension qui survit à la méta au lieu d'expirer avec elle.",
  },

  ideation: {
    eyebrow: 'Ce que j’ai construit',
    idx: 'Le build',
    lede: 'Un *cursus*, sur un moteur construit avec l’IA.',
    body: [
      "Le site est un parcours guidé, pas une barre de recherche : une landing qui pose le voyage, les fondamentaux d'abord, puis un guide complet par rôle.",
      "Plutôt que de fabriquer cinq guides quasi identiques à la main, j'ai conçu un **moteur de rôles data-driven** avec l'IA en binôme : chaque guide est de la donnée pure (phases, contrôle de map, archétypes, erreurs courantes, champions, builds, matchups) et un seul moteur la rend, avec un error boundary par section et une source de vérité unique pour le patch en cours.",
      "Le **guide Support** est allé le plus loin en premier, pour éprouver le format ; Top, Jungle, Mid et ADC ont suivi comme données, vite, une fois le moteur solide.",
    ],
    features: [
      { id: '01', name: 'Fondamentaux', desc: 'La couche de base : map, objets, runes, vision, gestion des vagues et objectifs neutres.' },
      { id: '02', name: 'Guides de rôle', desc: 'Cinq positions en ligne, chacune avec un guide complet. Le Support est la plongée qui a mis la barre.' },
      { id: '03', name: 'Moteur de rôles', desc: 'Un moteur rend chaque guide depuis ses données : ajouter un rôle, c’est écrire des données, pas des pages.' },
      { id: '04', name: 'Vidéos d’entraînement', desc: 'Drills choisis et clips pro (last hits, vision, mécaniques) en petites reps regardables.' },
      { id: '05', name: 'Glossaire', desc: 'Chaque terme défini, avec des glosses à la première mention dans les guides.' },
      { id: '06', name: 'Ressources', desc: 'Les outils externes choisis pour les builds live et les stats, là où ils me battent.' },
    ],
  },

  ui: {
    ...en.ui,
    eyebrow: 'Design system',
    idx: 'Hextech',
    lede: 'Un système *piloté par tokens*, thémé de bout en bout.',
    body: [
      "Tout tourne sur un seul jeu de variables CSS (une **palette Hextech** unique, or sur bleu profond) avec accent et densité pilotés par un attribut `data-` à la racine : tout le site se rethème depuis une seule source de vérité.",
      "Le système est documenté sur sa propre page de référence (fondations, composants et patterns) pour que le rendu reste cohérent en grandissant. EB Garamond pour les titres, Inter pour le texte, JetBrains Mono pour les labels.",
    ],
    paletteLabel: '// Hextech · or sur bleu profond',
    paletteNote: 'Une seule palette Hextech comme source de vérité, avec accent et densité pilotés par data-attribut.',
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'En ligne',
    idx: 'Essayez-le',
    note: 'Le site est en ligne sur GitHub Pages et continue d’évoluer. Explorez la landing, le guide des fondamentaux, les cinq guides de rôle (le Support va le plus loin) et le glossaire ; la référence du design system est à une URL de là.',
    linkLabel: 'Visiter le site',
  },

  roadmap: {
    eyebrow: 'Roadmap',
    idx: 'La suite',
    lede: 'Construit en public, *voilà où ça va*.',
    body: [
      "Le moteur a rendu l'étendue bon marché : le travail est maintenant la profondeur et la couche interactive. Un instantané de ce qui est livré et de ce qui arrive.",
    ],
    items: [
      { state: 'done', name: 'Cinq guides de rôle', desc: 'Top, Jungle, Mid, ADC et Support, tous en ligne sur le moteur commun.' },
      { state: 'done', name: 'Moteur de rôles data-driven', desc: 'Error boundary par section et une source de vérité pour le patch en cours.' },
      { state: 'done', name: 'Référence du design system', desc: 'Fondations, composants et patterns sur leur propre page Hextech.' },
      { state: 'building', name: 'Couche champions', desc: 'Des pages par champion, greffées sur chaque guide de rôle.' },
      { state: 'building', name: 'Quiz de rôle', desc: 'Un petit quiz qui oriente les nouveaux joueurs vers le rôle qui leur va.' },
      { state: 'planned', name: 'Drills jouables', desc: 'Transformer la vignette d’entraînement en reps mesurables et suivies.' },
      { state: 'planned', name: 'Site bilingue', desc: 'Parité FR/EN sur chaque guide, branchée sur le sélecteur de langue.' },
    ],
  },

  footer: 'Learning Leagues · Projet perso · En cours',
}
