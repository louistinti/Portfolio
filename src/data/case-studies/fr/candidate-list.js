// Étude de cas : candidate-list (Actual, liste candidats), version FR.
// Texte repris du portfolio Notion d'origine (FR) ; visuels partagés.
import { candidateList as en } from '../candidate-list.js'

export const candidateList = {
  ...en,
  name: 'Actual - Liste candidats',
  title: "D'une liste lourde à une vue candidat *scannable*",
  kicker: ['Étude de cas', 'UX Research · UX/UI · Desktop'],
  meta: [
    { k: 'Rôle', v: 'Product Designer' },
    { k: 'Équipe', v: '1 PM · 1 designer · 3 devs' },
    { k: 'Durée', v: '4 mois' },
    { k: 'Maquettes', v: 'Présentées en entretien' },
  ],

  context: {
    eyebrow: 'Contexte',
    lede: 'Une liste lourde et fragmentée qui *freinait chaque recrutement*.',
    body: [
      "Les recruteurs d'Actual travaillaient sur une liste candidats qui jouait contre eux : **infos clés dispersées** (il fallait ouvrir chaque fiche pour juger un candidat), filtres et tri peu ergonomiques, **aucune action rapide**, d'où des allers-retours d'écrans permanents pour contacter, noter ou gérer quelqu'un.",
      "Par-dessus, une UI **datée et à peine responsive**, et une charge cognitive élevée : trop de bruit par endroits, des essentiels manquants ailleurs.",
      "Et rien pour **piloter le vivier** : aucun KPI opérationnel sur la liste (disponibilité, dernière action, urgences), impossible de **prioriser** dossiers urgents, relances ou replacements sans ouvrir chaque fiche.",
    ],
    stats: [
      { v: '2-3', u: 'min', k: 'gagnées par candidat pour juger « prêt à l’emploi ou non ».' },
      { v: '141', k: 'recruteurs sondés sur les infos et actions indispensables de la ligne.' },
      { v: '8', k: 'agences visitées pour observer les vraies routines et les contournements.' },
    ],
  },

  challenge: {
    quote: 'Comment rendre un candidat *lisible et actionnable* depuis une seule ligne, sans ouvrir une seule fiche ?',
    who: '// Le défi central',
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Trois angles pour une question : de quoi les recruteurs ont-ils *vraiment* besoin ?",
    body: [
      "J'ai croisé **Hotjar et Google Analytics** pour identifier les filtres réellement utilisés et les parcours les plus fréquents, puis coupé le bruit.",
      "Un **questionnaire à 141 réponses** a cerné les informations à voir **d'emblée** (disponibilité, dernière action, statut, documents, qualité du contact) et les actions à déclencher **directement depuis la ligne**.",
      "Enfin, **passages et entretiens dans 8 agences** ont fait remonter les routines réelles et les contournements : les infos trop longues à trouver, les documents qui expirent en silence.",
    ],
    insight: "Les recruteurs n'avaient pas besoin de plus de données, mais des *bonnes* données sur la ligne. La recherche était assez nette pour supprimer **plus de 20 filtres** avant même le lancement du pilote.",
  },

  ideation: {
    eyebrow: 'Solution',
    idx: 'Étape 02',
    lede: 'Une *ligne claire et scannable*, avec les actions intégrées.',
    body: [
      "J'ai recentré le listing sur une **ligne candidate légère mais riche** : disponibilité, dernière activité, qualification, ville et agence, l'essentiel devant, le bruit dehors.",
      "Les **documents** s'affichent en **compteurs avec tooltips** (ce qui manque, ce qui expire) : un recruteur lit l'employabilité d'un candidat **sans ouvrir la fiche**, et les **actions rapides** (contacter, documents, besoins associés) vivent directement sur la ligne.",
      "Mon rôle : cadrage UX, **architecture d'information de la ligne**, prototypage des filtres compacts, cards et badges documents, **tests en agence**, puis **spécifications Figma** (comportements, validations, cas limites et états d'erreur).",
      "L'impact attendu a été cadré sur trois axes avant le moindre pixel : **efficiency** (du temps gagné sur le tri, la qualification et le suivi, moins de dossiers en souffrance), **growth** (un vivier plus réactif, activation et replacements) et **scale** (une interface et des colonnes qui tiennent quand les volumes montent). Les résultats plus bas ne revendiquent que ce que le pilote a réellement mesuré.",
    ],
    features: [
      { id: 'F-01', name: 'Bandeau de filtres compact', desc: 'Des filtres en chips, au plus près du regard, avec presets enregistrables.' },
      { id: 'F-02', name: 'Ligne candidate enrichie', desc: 'Disponibilité, dernière activité, qualification et localisation, lisibles d’un coup d’œil.' },
      { id: 'F-03', name: 'Badges documents', desc: 'Compteurs et tooltips signalent ce qui manque ou expire, sans ouvrir la fiche.' },
      { id: 'F-04', name: 'Actions rapides en ligne', desc: 'Contact, documents et besoins associés, déclenchés depuis la ligne.' },
      { id: 'F-05', name: 'KPIs de vivier', desc: 'Des indicateurs opérationnels en tête de liste pour prioriser et suivre.' },
      { id: 'F-06', name: 'Colonnes personnalisables', desc: 'Afficher, masquer et réordonner (contrat, permis, transport, clients) par agence.' },
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Itération',
    title: 'Scinder la liste : *sourcing* et *viviers*.',
    body: "L'adoption était bonne, mais la direction voulait plus : j'ai conçu deux nouvelles pages. Une **liste de sourcing** qui masque les candidats déjà rattachés à votre agence et ajoute un **matching IA** (localisation, métiers recherchés, expériences précédentes) plus un fil des nouvelles inscriptions de votre secteur, des profils frais qui n'ont jamais travaillé avec vous. Et une page **viviers** où les responsables regroupent des métiers proches en viviers, triés par pénurie, besoins ou urgence, chacun s'ouvrant sur une shortlist de « prochaines actions » (candidats à replacer, documents à valider) et un bouton **matching** par candidat, avec les listes de favoris personnelles en dessous.",
  },

  results: {
    eyebrow: 'Résultats',
    idx: 'Pilote · nov. 2025',
    lede: 'La ligne fait désormais la lecture, la *fiche reste fermée*.',
    body: [
      "En pilote depuis **novembre 2025**, la nouvelle liste a gagné une vraie adoption : les recruteurs **gagnent 2 à 3 minutes par candidat** sur le jugement qu'ils font des dizaines de fois par jour. Cette personne est-elle prête à travailler ?",
      "En aval, moins de dossiers passent entre les mailles et la priorisation s'est affûtée : documents qui expirent et remplacements urgents sont visibles **avant** d'ouvrir une fiche, pas après.",
    ],
    metrics: [
      { k: 'Gagnées par candidat', to: '2-3 min', note: 'Sur le jugement d’employabilité, sans ouvrir une seule fiche.' },
      { k: 'Filtres supprimés avant le pilote', to: '20+', note: 'Retirés sur preuves Hotjar et Analytics, pas sur des opinions.' },
    ],
    noteLabel: 'Comment ça a été mesuré',
    note: "Les 2 à 3 minutes viennent d'**interviews utilisateurs** avec les recruteurs du pilote, pas d'une instrumentation, et elles couvrent **un jugement précis** (ce candidat est-il prêt à travailler), pas tout le flux de recrutement. C'est une première lecture, pas un chiffre acquis : avant d'en revendiquer plus, je voudrais un trimestre complet d'usage derrière.",
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'Bilan',
    idx: 'Avec le recul',
    note: "La seconde solution (la liste de sourcing et les viviers) a été **validée par la direction juste avant mon départ d'Actual** : je n'ai jamais pu la tester avec les utilisateurs. C'est le seul vrai manque d'un parcours autrement solide, et la partie que je voudrais rejouer : un design validé par les stakeholders n'est pas un design validé par ceux qui s'en servent.",
  },

  footer: 'Liste candidats · Actual Group · Étude de cas',
}
