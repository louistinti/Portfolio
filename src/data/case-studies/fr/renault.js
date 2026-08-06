// Étude de cas : renault, version FR. Rédigée depuis le brief français
// (docs/renault-case-study-brief.md) ; visuels et thème partagés avec l'EN.
import { renault as en } from '../renault.js'

export const renault = {
  ...en,
  name: 'Renault Group - Intranet Qualité',
  title: "Concevoir l'intranet *Qualité* de Renault Group",
  kicker: ['Étude de cas', 'UX Research · Intranet · SharePoint'],
  meta: [
    { k: 'Rôle', v: 'Designer UX/UI (alternance)' },
    { k: 'Client', v: 'Renault Group, Qualité' },
    { k: 'Durée', v: '2 ans · 2020-2022' },
    { k: 'Écrans', v: 'Reconstitués de mémoire (NDA)' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: "Un même toit pour les *7 processus qualité*, de l'usine à l'après-vente.",
    body: [
      "Pendant mes **deux ans d'alternance** à la **Direction de la Qualité** de Renault Group (Technocentre, Guyancourt), j'étais le designer d'un problème simple et lourd : le savoir qualité vivait en silos. Trouver un document ou le bon interlocuteur d'un autre pôle, c'était **des mails, des réunions et de l'attente**.",
      "La réponse : un **site chapeau sur SharePoint** réunissant les sept processus qualité du groupe, un point d'entrée unique pour **~10 000 personnes**, avec recherche, annuaire des contacts clés, actus et archives.",
      "J'ai mené le design **en solo**, avec un manager qui portait le projet jusqu'à la haute direction, des premières interviews aux présentations de lancement devant **~200 personnes**.",
    ],
    stats: [
      { v: '7', k: "processus qualité réunis sous un même site chapeau, de la stratégie à l'après-vente." },
      { v: '~10', u: 'k', k: 'personnes concernées : usines, ingénierie, sales et concessions.' },
      { v: '2', u: 'ans', k: 'de bout en bout : recherche, architecture de l’information, wireframes, lancement.' },
    ],
  },

  challenge: {
    quote: 'Comment faire que *10 000 personnes* arrêtent de chercher leurs documents par mail, dans une grille SharePoint à trois colonnes ?',
    who: '// Le défi central',
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'Maquette',
    idx: 'Reconstitution',
    note: "Le vrai site est **sous NDA** : rien ici n'est l'original. Ces écrans sont une **reconstitution personnelle**, refaite hors de Renault pour montrer à quoi l'accueil pourrait ressembler : les sept processus en mosaïque de tuiles sur la grille imposée à trois colonnes, sans contenu réel, sans vrais contacts. Les libellés des sept processus sont publics ; tout le reste est inventé.",
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Trente interviews, *de l'usine à la concession*.",
    body: [
      "J'ai interviewé **~30 personnes** sur toute la chaîne qualité (opérateurs en usine, ingénierie, sales, concessions, SAV), le tout à distance. La douleur était partout la même : **personne ne cherchait au même endroit**, et le réflexe restait un mail à quelqu'un qui saurait peut-être.",
      "J'ai ensuite animé **7 ateliers, un par pôle**, avec les dirigeants de chaque processus. Format : **card sorting**, pour prioriser le contenu et bâtir une architecture d'information qui colle à la façon dont les gens pensent la qualité, pas à l'organigramme.",
    ],
    insight: "Les sept processus sont des *verbes*, pas des départements : la nomenclature interne décrit des activités. Le site devait s'organiser autour de ce que les gens **font** (définir, concevoir, vendre, accompagner), parce que c'est comme ça qu'ils cherchent.",
  },

  ideation: {
    eyebrow: 'Idéation',
    idx: 'Étape 02',
    lede: 'Du card sorting à *un point d’entrée* par processus.',
    body: [
      "À partir des ateliers, j'ai tracé les **user journeys** et dessiné les **wireframes** du site : une home construite sur les sept processus, et pour chacun une page réunissant documents, sous-rubriques et contacts clés.",
      "Le concept a été présenté et itéré lors de **3 grandes réunions** devant ~200 personnes (deux la première année, une au début de la seconde pour le lancement), chacune suivie d'un **questionnaire** pour récolter réactions et objections.",
    ],
    features: [
      { id: 'F-01', name: 'Home des 7 processus', desc: 'La mosaïque de tuiles : chaque processus à un clic.' },
      { id: 'F-02', name: 'Pages processus', desc: 'Documents, sous-rubriques et responsables pour chacun des sept.' },
      { id: 'F-03', name: 'Moteur de recherche', desc: 'Une seule recherche sur documents, datas et archives.' },
      { id: 'F-04', name: 'Annuaire des contacts clés', desc: "La bonne personne d'un autre service, sans demander autour de soi." },
      { id: 'F-05', name: 'Actus & nouveautés', desc: 'Ce qui change côté qualité, poussé plutôt que transféré.' },
      { id: 'F-06', name: 'Archives', desc: "L'historique qui reste trouvable au lieu de dormir dans des boîtes mail." },
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Contrainte de design',
    title: 'Trois colonnes, *pas moyen d’y couper*.',
    body: "SharePoint était **imposé par la DSI**, et avec lui une contrainte de layout dure : **trois colonnes maximum**. Le vrai travail de design a été de tenir contenu et clarté sur cette grille compacte : mosaïques de tuiles en 3, 2+1 et 1+2, une barre de recherche toujours à portée, une hiérarchie qui survit au template. La reconstitution montre la contrainte au lieu de la masquer : un intranet qui ressemblerait à un site web libre passerait à côté de ce qu'était vraiment ce travail.",
  },

  ui: {
    ...en.ui,
    eyebrow: 'UI & Reconstitution',
    idx: 'Design',
    lede: 'Les couleurs du groupe, un *registre corporate* : un outil de travail, pas une landing page.',
    body: [
      "Le langage visuel suit le groupe : surfaces **gris sombre** et **jaune Renault** strictement en accent, sur les états actifs, les soulignés et les surlignages. Le texte courant reste blanc cassé : du texte jaune sur gris sombre ne tient pas en petite taille.",
      "Typo **Segoe UI**, angles droits, dense mais scannable : le registre d'un outil interne utilisé tous les jours, pas d'une page marketing. Un écran est reconstitué à ce jour ; la page processus, la recherche et l'annuaire suivent.",
    ],
    paletteLabel: '// Couleurs du groupe · jaune en accent seul',
    paletteNote: 'Surfaces gris sombre, texte blanc cassé, et le jaune Renault réservé aux états actifs et aux accents.',
    pages: [
      { shot: 'accueil', cap: 'Accueil, la mosaïque des 7 processus' },
      { shot: 'processus', cap: 'Page processus' },
      { shot: 'recherche', cap: 'Résultats de recherche' },
      { shot: 'annuaire', cap: 'Annuaire des contacts clés' },
    ],
  },

  results: {
    eyebrow: 'Résultats',
    idx: 'Déclaratif',
    lede: 'Moins chercher, plus trouver, *mesuré honnêtement*.',
    body: [
      "Le site a été **lancé** avant la fin de mon alternance. Après chaque grande présentation, j'envoyais un **questionnaire**, complété par du **shadowing d'une quinzaine d'utilisateurs** sur leurs vraies recherches.",
      "Les deux chiffres ci-dessous sont **déclaratifs** (ce que les utilisateurs rapportent, recoupé par le shadowing), pas de l'instrumentation analytics. Pour un SharePoint interne en 2021, c'était la mesure défendable, et c'est la revendication que je fais : ni plus, ni moins.",
    ],
    metrics: [
      { k: 'Retrouver un document', to: '−15 min', note: 'Temps moyen gagné par recherche, déclaratif recoupé par shadowing.' },
      { k: 'Trouver un contact clé', to: '−3 min', note: 'Temps moyen gagné pour identifier la bonne personne dans un autre service.' },
    ],
    noteLabel: 'Comment ça a été mesuré',
    note: "Questionnaires après chaque présentation à ~200 personnes, plus **shadowing de ~15 utilisateurs**. Du déclaratif, étiqueté comme tel. Ce que je ne peux pas rapporter : l'adoption après mon départ. Je n'ai **aucune donnée** sur l'état actuel du site, et je préfère le dire que l'inventer.",
  },

  footer: 'Intranet Qualité · Renault Group · Étude de cas',
}
