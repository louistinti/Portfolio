// Étude de cas : learning-leagues, version FR (traduite de l'EN, projet perso).
import { learningLeagues as en } from '../learning-leagues.js'

export const learningLeagues = {
  ...en,
  title: 'Tout ce qu’il faut pour *apprendre League of Legends*',
  kicker: ['Construit en solo avec l’IA', 'Produit · Design System'],
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
      "À côté tourne un second repo : une **bibliothèque de composants AI-first** qui alimente le site, construite par des sessions d'IA sous une poignée de verrous humains. C'est la partie du projet où je teste jusqu'où un designer peut pousser la machine tout en gardant les décisions.",
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
      "Tout tourne sur un seul jeu de variables CSS, une **palette Hextech** unique, or sur bleu profond. Un **axe d'accent** change l'accent actif depuis un attribut `data-accent` posé sur n'importe quel élément : cinq valeurs, une par rôle (ambre, bleu, rouge, violet, jade), et tout un guide se rethème depuis un seul attribut.",
      "Le système est né en CSS écrit à la main sur le site. Il vit désormais dans **Figma** sous forme de variables et coule à sens unique vers la bibliothèque ci-dessous : 128 tokens, générés, jamais tapés à la main. EB Garamond pour les titres, Inter pour le texte, JetBrains Mono pour les labels, documentés sur la page de référence du site et sur celle de la lib.",
    ],
    paletteLabel: '// Hextech · or sur bleu profond',
    paletteNote: 'Une seule palette Hextech comme source de vérité ; cinq accents, un par rôle, pilotés par data-attribut.',
  },

  // Section « La lib » : slot `results` du template (cf. version EN).
  results: {
    eyebrow: 'La lib',
    idx: 'LearningLeagues-Lib',
    metrics: [
      {
        k: 'Design tokens',
        to: '128',
        note: 'Extraits des variables Figma vers une seule feuille de style générée. Personne ne tape un token.',
      },
      {
        k: 'Gates exécutables',
        to: '11',
        note: 'Chaque PR bloque dessus en CI : lint des tokens, contraste, axe, un smoke en vrai navigateur de chaque page de doc.',
      },
      {
        k: 'Composants livrés',
        to: '3',
        note: 'Button, Callout, Eyebrow, chacun passé par le circuit RFC et adopté par le site avant sa promotion.',
      },
      {
        k: 'Usages migrés',
        to: '63',
        note: 'Du CSS écrit à la main sur le site, remplacé par des composants de la lib, zéro compensation.',
      },
    ],
    lede: 'Une bibliothèque de composants *construite par l’IA, pour l’IA*, avec un humain sur les verrous.',
    body: [
      "Learning Leagues est un site sans build avec un design system qui grandit, alors j'ai ouvert un second repo pour tester une question qui me tient à cœur en tant que designer : **une bibliothèque de composants peut-elle être tenue presque entièrement par des agents IA, et rester fiable ?** La lib est construite par des sessions d'IA et consommée par des sessions d'IA qui écrivent le code produit. Mon travail n'est pas d'écrire des composants, c'est de concevoir le système dans lequel elles travaillent.",
      "Les design tokens coulent **à sens unique**, Figma → pipeline d'extraction → une seule feuille de style générée ; aucun agent et aucun humain n'écrit jamais un token à la main. Chaque composant suit le même **circuit** : une analyse d'usage sur le site, une RFC que j'approuve, l'implémentation, l'adoption par le site, puis un script de promotion qui le passe en *stable* seulement quand toutes les gates sont vertes. Le statut n'est jamais modifié à la main, donc il veut dire quelque chose.",
      "Les règles vivent dans un contrat d'exploitation que les agents lisent avant toute chose (`AGENTS.md`), avec six axiomes : jamais de valeur de design en dur, jamais d'édition manuelle d'un fichier généré, l'accessibilité est une exigence dure, jamais d'imitation locale d'un composant manquant, une seule session d'écriture par repo, et un fichier périmé est de la désinformation. Chaque session se termine par un rapport en trois blocs : à comprendre, à décider, à coller.",
      "Le [site de documentation](https://louistinti.github.io/LearningLeagues-Lib/) et le [repo](https://github.com/louistinti/LearningLeagues-Lib) sont publics. La doc est générée depuis les contrats des composants, jamais écrite à côté.",
    ],
    noteLabel: '// Les verrous humains',
    note: "La ressource rare, c'est mon attention, alors le contrat liste les gestes qui restent à moi et à moi seul : appuyer sur merge, approuver une review, labelliser un changement de tokens comme conforme au vrai export Figma, arbitrer l'API d'un composant ou n'importe quelle valeur visuelle, fixer la priorité, valider un checkpoint visuel. Tout le reste est délégué. Les décisions de design restent humaines ; la machine prouve qu'elles ont été appliquées.",
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
      "Le moteur a rendu l'étendue bon marché, et la lib est en train de retirer le design system des mains du site. Un instantané de ce qui est livré et de ce qui arrive.",
    ],
    items: [
      { state: 'done', name: 'Cinq guides de rôle', desc: 'Top, Jungle, Mid, ADC et Support, tous en ligne sur le moteur commun.' },
      { state: 'done', name: 'Moteur de rôles data-driven', desc: 'Error boundary par section et une source de vérité pour le patch en cours.' },
      { state: 'done', name: 'Référence du design system', desc: 'Fondations, composants et patterns sur leur propre page Hextech.' },
      { state: 'done', name: 'Bibliothèque de composants AI-first', desc: 'Tokens depuis Figma, 11 gates en CI, trois composants passés par le circuit et adoptés par le site.' },
      { state: 'building', name: 'Le site sur la lib', desc: 'Migrer le CSS écrit à la main qui reste, une analyse d’usage et une RFC à la fois.' },
      { state: 'building', name: 'Couche champions', desc: 'Des pages par champion, greffées sur chaque guide de rôle.' },
      { state: 'building', name: 'Quiz de rôle', desc: 'Un petit quiz qui oriente les nouveaux joueurs vers le rôle qui leur va.' },
      { state: 'planned', name: 'Drills jouables', desc: 'Transformer la vignette d’entraînement en reps mesurables et suivies.' },
      { state: 'planned', name: 'Site bilingue', desc: 'Parité FR/EN sur chaque guide, branchée sur le sélecteur de langue.' },
    ],
  },

  footer: 'Learning Leagues · Projet perso · En cours',
}
