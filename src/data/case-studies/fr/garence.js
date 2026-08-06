// Étude de cas : garence (Actual, garanties), version FR. Texte repris du
// portfolio Notion d'origine (FR) ; thème et images partagés avec l'EN.
import { garence as en } from '../garence.js'

export const garence = {
  ...en,
  name: 'Actual - Outil de gestion des garanties',
  title: "Concevoir l'outil de *gestion des garanties* d'Actual",
  kicker: ['Étude de cas', 'Product · UX/UI · B2B SaaS'],
  meta: [
    { k: 'Rôle', v: 'Lead Product Designer' },
    { k: 'Équipe', v: '1 PM · 1 designer · 4 devs' },
    { k: 'Durée', v: '1 an' },
    { k: 'Maquettes', v: 'Présentées en entretien' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: 'Un outil, *trois utilisateurs très différents*, et des millions d’euros en jeu.',
    body: [
      "J'ai **mené de A à Z**, seul designer sur le projet, l'**outil de gestion des garanties** d'Actual. Il gère les **demandes de garantie** et les **encours non garantis (ENG)**, la couverture qui sécurise la mise en poste des intérimaires, avec **des millions d'euros** en jeu à chaque décision.",
      "Actual émet des garanties pour sécuriser un placement, et suit les **encours non garantis** dès que l'assureur se retire : montant trop élevé, encours en hausse rapide, client à risque.",
      "L'outil s'adresse à trois populations aux besoins radicalement différents : les **agences** initient et suivent les demandes, le **Service Client** instruit et décide, la **Direction** supervise l'activité et pilote les enveloppes budgétaires par périmètre et par agence.",
      "Le tout a démarré en pleine **convergence**, au moment où Leader, Ergalis, Up Skills et Ergos rejoignaient les outils communs, chaque entité voulant garder ses fonctionnalités, avec *trois Business Owners* à aligner en même temps.",
    ],
    stats: [
      { v: '90,5', u: '%', k: 'des décisions du Service Client aujourd’hui entièrement automatisées.' },
      { v: '-83', u: '%', k: 'sur le temps de décision automatisée, de 125 s à 21 s.' },
      { v: '3', k: 'types d’utilisateurs réunis autour d’un standard commun.' },
    ],
  },

  challenge: {
    quote: 'Comment concevoir *une expérience cohérente* pour trois utilisateurs qui veulent des choses opposées, pendant que quatre entreprises fusionnent en une ?',
    who: '// Le défi central',
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Hériter de la recherche, puis *aller le voir de mes yeux* sur le terrain.",
    body: [
      "Je suis arrivé après les premières interviews menées par ma lead. Ma première mission : **m'approprier ces retours**, identifier les vrais irritants et les **hiérarchiser** entre trois populations qui ne partageaient ni les attentes ni les contraintes.",
      "Pour éprouver mes hypothèses, j'ai passé une journée de **shadowing et de tests** avec le Service Client au siège (observer les utilisateurs en conditions réelles reste le meilleur moyen de confirmer, ou d'enterrer, une hypothèse de conception) avant de lancer un **pilote** avec quelques agences.",
    ],
    personas: [
      { name: 'Agences', id: 'U-01', shot: 'persona-1', goal: 'Initier les demandes de garantie et d’ENG, et suivre leur statut.', pain: 'Échanges informels et critères implicites, avec presque aucune visibilité sur l’avancement d’une demande.' },
      { name: 'Service Client', id: 'U-02', shot: 'persona-2', goal: 'Instruire les dossiers, réaliser les contrôles et prendre la décision.', pain: 'Aucun standard commun entre entités, temps de décision longs, tout est revu à la main.' },
      { name: 'Direction', id: 'U-03', shot: 'persona-3', goal: 'Superviser l’activité et piloter les enveloppes budgétaires par périmètre et par agence.', pain: 'Visibilité quasi nulle sur les encours non garantis à l’échelle du réseau.' },
    ],
    insight: "Chaque entité fonctionnait à sa façon : règles informelles, critères implicites, aucune vision partagée des encours. Sans *standard commun*, agences, Service Client et Direction ne verraient jamais la même réalité.",
  },

  ideation: {
    eyebrow: 'Design & delivery',
    idx: 'Étape 02',
    lede: "D'habitudes éparses à un *système commun et progressif*.",
    body: [
      "J'ai conçu les premières **maquettes responsives** en jonglant avec les demandes évolutives de **trois Business Owners** à la fois. Le MVP donnait à chaque rôle un parcours clair et structuré, avec **états explicites**, contrôles en ligne et **journal d'audit** pour garder chaque décision traçable.",
      "Le déploiement s'est fait étape par étape : pilote en conditions réelles, retours terrain, ajustements rapides (libellés, ordre des champs, seuils) puis **lancement national**. J'ai aussi géré la formation et l'onboarding pour que les premières agences se lancent en autonomie.",
      "Les objectifs de cadrage étaient nets : -75 % sur le délai de réponse en agence, -50 % d'actions de décision côté Service Client, -25 % d'ENG et -20 % du total des garanties couvertes chez l'assureur.",
    ],
    features: [
      { id: 'F-01', name: 'Parcours progressifs', desc: 'Création, annulation, augmentation, diminution, renouvellement, états explicites et résumé avant envoi.' },
      { id: 'F-02', name: "Test d'assurabilité en temps réel", desc: 'Un premier signal immédiat sur la faisabilité d’une demande.' },
      { id: 'F-03', name: 'Espace Service Client', desc: 'Revue structurée des critères, historique complet et journal d’audit.' },
      { id: 'F-04', name: 'Tableaux de bord par profil', desc: 'Des vues dédiées agences, Service Client et Direction, avec recherche étendue et filtres.' },
      { id: 'F-05', name: "Gestion d'enveloppes", desc: 'Allocation, suivi et réaffectation par périmètre et agence, avec seuils, alertes et exports pour la Direction.' },
      { id: 'F-06', name: 'Spécifications actionnables', desc: 'Règles métiers, cas limites et transitions d’états rédigés pour accélérer le delivery.' },
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Automatisation',
    title: 'Laisser le système décider, *quand il le doit*.',
    body: "Le geste signature est arrivé après le lancement : quand tous les paramètres sont au vert (seuils, scoring, antériorité, cohérence des données), **le système décide seul** et notifie les parties. Tout reste **auditable et explicable** : les règles sont visibles, la justification affichée, et un **override** humain toujours à un clic. Entre le déploiement national de février 2025 et septembre 2025, les décisions automatisées sont passées de **739 à 1 243 (+68,2 %)**, la part automatisée de **76,7 % à 90,5 % (+13,8 pts)**, et la décision auto moyenne de **125 s à 21 s (-83 %)**. En septembre, **9 décisions sur 10** tournaient seules, l'effort humain restant exactement là où il a de la valeur : les dossiers les plus durs. Plusieurs objectifs de cadrage sont atteints (délai de réponse agence et actions de décision Service Client en baisse), mais l'ENG n'a pas reculé comme espéré : certaines agences confondent encore demande d'ENG et augmentation de garantie, un déficit de clarté du flux et de formation à combler.",
  },

  results: {
    eyebrow: 'Résultats',
    idx: 'Févr. → sept. 2025',
    lede: 'Sept mois après le lancement national, *neuf décisions sur dix* tournent toutes seules.',
    body: [
      "L'outil est passé national en **février 2025**. J'ai suivi la courbe d'automatisation jusqu'en **septembre 2025** : elle a grimpé régulièrement, à mesure que les règles s'affinaient sur de vrais dossiers.",
      "Le gain ne se limite pas à la vitesse, c'est **où vont les humains** : le Service Client a arrêté de revoir à la main les dossiers évidents et a réinvesti ce temps sur les vraiment difficiles.",
    ],
    metrics: [
      { k: 'Décisions automatisées', from: '739', to: '1 243', delta: '+68,2 %', note: 'Dossiers traités de bout en bout sans revue humaine.' },
      { k: 'Part entièrement automatisée', from: '76,7 %', to: '90,5 %', delta: '+13,8 pts', note: 'En septembre, 9 dossiers sur 10 ne passent plus par une revue manuelle.' },
      { k: 'Décision automatisée moyenne', from: '125 s', to: '21 s', delta: '-83 %', note: 'De la demande à la décision, une fois le système aux commandes.' },
    ],
    targetsLabel: '// Objectifs de cadrage vs réalité',
    targets: [
      { name: 'Délai de réponse en agence', goal: '-75 %', state: 'hit' },
      { name: 'Actions de décision Service Client', goal: '-50 %', state: 'hit' },
      { name: 'Encours non garantis (ENG)', goal: '-25 %', state: 'missed', note: "Certaines agences déposent encore une demande d'ENG en pensant augmentation de garantie : un déficit de clarté du flux et de formation, pas de modélisation." },
      { name: "Total couvert chez l'assureur", goal: '-20 %', state: 'nodata', note: 'Aucun chiffre que je puisse défendre sur ce point.' },
    ],
    noteLabel: 'Comment ça a été mesuré',
    note: "Chaque chiffre ci-dessus sort directement des **dashboards de gestion des outils**, mois par mois, pas d'un sondage. Deux objectifs de cadrage atteints, un clairement raté, un jamais mesuré de façon fiable. Le *raté ENG* est le plus utile : il pointe le flux et le wording, pas le scoring. Un problème de design, donc réparable.",
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'Bilan',
    idx: 'Avec le recul',
    note: "C'est le projet qui m'a le plus appris à **tenir un cap dans la complexité** : stakeholders multiples, contexte sous tension, utilisateurs aux besoins très différents, et des millions d'euros en jeu, mené de bout en bout en pleine autonomie. Avec le recul, je referais plusieurs ajustements (l'ergonomie, la hiérarchie de l'information, le wording de certains CTA), et cet écart est exactement la mesure du chemin parcouru.",
  },

  footer: 'Outil de gestion des garanties · Actual Group · Étude de cas',
}
