// Étude de cas : seuil, version FR. Texte repris de docs/etude-de-cas-seuil.md
// (« 31 composants » d'après l'artefact public) ; ordre, thème, images et
// liens partagés avec l'EN.
import { seuil as en } from '../seuil.js'

export const seuil = {
  ...en,
  title: 'Le site marketing de *Seuil*, conçu puis mis en ligne de bout en bout',
  kicker: ['Site produit SaaS B2B · Projet de démonstration'],
  meta: [
    { k: 'Rôle', v: 'Product Designer, seul' },
    {
      k: 'Livrable',
      v: '6 pages en ligne sur [seuil.louistdesign.me](https://seuil.louistdesign.me), modifiables dans un CMS',
    },
    { k: 'Stack', v: 'Astro, TypeScript, Sanity, Vercel' },
    { k: 'Code', v: '[Repo public](https://github.com/louistinti/seuil)' },
    { k: 'Date', v: '23 nov. 2026' },
  ],

  context: {
    eyebrow: 'Aperçu',
    lede: "Un site qui explique un produit complexe aussi bien que l'équipe commerciale, et que le marketing peut modifier seul : c'est ce que je propose aux SaaS B2B.",
    body: [
      "Seuil en est la démonstration. C'est un SaaS fictif qui aide les PME à décider, commande par commande, si un client peut être livré à crédit, et j'ai conçu son site de bout en bout, du cadrage à la mise en ligne.",
    ],
    stats: [
      { v: '6', k: 'pages en ligne, modifiables dans un CMS.' },
      { v: '5', u: 'jours', k: 'de la première maquette à la dernière correction.' },
      { v: '31', k: 'composants documentés dans le design system.' },
    ],
  },

  results: {
    eyebrow: 'Résultat',
    idx: '18 → 22 nov. 2026',
    metrics: [
      { k: 'Délai', to: '5 jours', note: 'Du 18 au 22 novembre 2026.' },
      {
        k: 'Lighthouse',
        to: '100',
        note: "Performance, accessibilité, bonnes pratiques et SEO, sur mobile comme sur desktop, pour l'accueil et la page produit.",
      },
      { k: 'Tests simulateur', to: '89', note: 'Sur le moteur du simulateur.' },
      { k: 'Tests accessibilité', to: '94', note: 'Clavier, focus et contrastes, dans les deux thèmes.' },
    ],
    lede: "J'ai conçu et mis en ligne le site de Seuil en 5 jours, de la première maquette dans Claude Design le 18 novembre à la dernière correction le 22 novembre 2026.",
    body: [
      "Mesuré avec Lighthouse 12.6.0 le 22 novembre 2026, il obtient 100 en performance, accessibilité, bonnes pratiques et SEO, sur mobile comme sur desktop, pour l'accueil et la page produit.",
      'Le moteur du simulateur est couvert par 89 tests, et 94 tests vérifient le clavier, le focus et les contrastes dans les deux thèmes.',
    ],
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'En ligne',
    idx: 'Essayez-le',
    linkLabel: 'Visiter le site',
  },

  extra: {
    context: {
      eyebrow: 'Contexte',
      lede: "Pendant trois ans chez Groupe Actual, j'ai conçu l'outil de gestion des garanties et encours non garantis (ENG), qui est passé de 0 à 90,5 % de décisions automatisées.",
      body: [
        'Je ne peux pas montrer ces écrans, car ils sont couverts par un accord de confidentialité.',
        "J'ai donc choisi de créer Seuil, un produit fictif dans le même domaine : la décision de crédit client. Ainsi, je pouvais montrer publiquement ma compréhension du sujet sans rien révéler du travail fait pour Actual.",
      ],
    },
    offer: {
      ...en.extra.offer,
      eyebrow: 'Ce que je peux faire pour vous',
      lede: 'Seuil réunit trois compétences que je mets au service des SaaS B2B et des porteurs de projet.',
      body: ["Voici ce que chacune a produit ici, et ce qu'elle donne chez vous."],
      cards: [
        {
          title: 'Design system',
          rows: [
            {
              k: 'Ce que Seuil prouve',
              v: "Des tokens comme seule source de vérité, deux thèmes, chaque composant documenté avec ses variantes et ses états, le tout dans un artefact que l'IA sait lire",
            },
            {
              k: 'Ce que je fais pour vous',
              v: "Je crée ou je remets d'aplomb votre design system, pour que le design, le code et l'IA parlent la même langue",
            },
          ],
        },
        {
          title: 'IA',
          rows: [
            {
              k: 'Ce que Seuil prouve',
              v: "Maquettes dans Claude Design, code avec Claude Code, et une fonctionnalité IA cadrée : l'IA traduit une phrase en règle, elle ne décide jamais",
            },
            {
              k: 'Ce que je fais pour vous',
              v: 'Je livre vite sans rendu générique, et je conçois vos fonctionnalités IA avec des garde-fous que vos utilisateurs comprennent',
            },
          ],
        },
        {
          title: 'Produit complexe rendu clair',
          rows: [
            {
              k: 'Ce que Seuil prouve',
              v: "Un simulateur de décision branché sur un vrai moteur de règles dès l'accueil, et des pages découpées par rôle",
            },
            {
              k: 'Ce que je fais pour vous',
              v: 'Vos visiteurs comprennent votre produit sans démo commerciale',
            },
          ],
        },
      ],
    },
    ai: {
      eyebrow: "Un site fait avec l'IA",
      lede: "J'ai réalisé Seuil avec l'IA d'un bout à l'autre : les maquettes dans Claude Design, puis le code avec Claude Code à partir des exports de design.",
      body: [
        "L'IA produit vite, mais c'est moi qui tranche. Par exemple, j'ai retiré le halo coloré prévu derrière le simulateur après un audit : vu à travers la carte de verre, il teintait le fond sous le texte.",
        "Le design system suit la même logique. C'est un artefact Claude pensé d'abord pour l'IA (AI first) : les tokens, les composants, les règles de contenu et les notes d'usage y sont écrits pour être lus par Claude avant de créer une maquette.",
        "Ainsi, une nouvelle page part des mêmes couleurs, des mêmes composants et des mêmes règles que le site, sans que j'aie à les réexpliquer.",
      ],
    },
    hindsight: {
      ...en.extra.hindsight,
      eyebrow: 'Ce que je ferais autrement',
      note: "Si c'était à refaire pour un client réel, je commencerais par ce que Seuil ne pouvait pas avoir : des entretiens avec le fondateur, l'équipe commerciale et un client, afin que le site parte des questions réellement posées en démo.",
    },
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Seuil étant fictif, je n'avais ni clients ni équipe à interroger.",
    body: [
      "J'ai donc concentré la recherche sur le marché du credit management B2B, afin de placer Seuil face à des produits réels.",
      "Il n'existe pas de classement neutre : la plupart des comparatifs sont publiés par les éditeurs eux-mêmes. J'ai donc classé les acteurs moi-même en trois groupes : les plateformes grands comptes, les outils mid-market plus proches de Seuil, et les fournisseurs de données, que j'ai traités comme des intégrations et non comme des concurrents.",
      "Ensuite, j'ai étudié les prix. Les concurrents directs ne publient pas les leurs, tandis que les outils de relance voisins facturent surtout au chiffre d'affaires du client. J'ai donc construit trois formules au chiffre d'affaires, calées sur les prix de LeanPay relevés par La Fabrique du Net le 28 septembre 2026, avec un seuil à 50 M€ qui reprend la définition de la PME par l'INSEE. Chaque source est citée sur la page Tarifs.",
    ],
  },

  ideation: {
    eyebrow: 'Cadrage',
    idx: 'Étape 02',
    lede: "Une fois le marché posé, j'ai défini six pages : accueil, produit, une page par rôle (finance et credit management, commerciaux et ADV), tarifs et demande de démo.",
    body: [
      "J'ai choisi de découper par rôle, car une même décision de crédit ne pose pas les mêmes questions à un credit manager et à un commercial.",
      "Mon plus gros enjeu était de faire comprendre le produit sans démo commerciale. J'ai donc placé un simulateur de décision dès l'accueil : le visiteur choisit un client et un montant, puis Seuil répond Acceptée, Refusée ou Envoyée à l'analyste, en affichant la règle qui a décidé.",
      "Sur la page produit, j'ai ajouté la rédaction d'une règle en langage naturel. Là aussi, j'ai fixé une limite claire : l'IA traduit uniquement la phrase en règle, elle ne décide jamais. Il m'est apparu que c'était la seule promesse crédible pour un public finance.",
      "Enfin, j'ai posé des règles de contenu strictes : aucun chiffre de marché, témoignage ou logo inventé, des emplacements assumés à la place, et la mention « Données fictives » sur chaque capture.",
    ],
  },

  topography: {
    ...en.topography,
    eyebrow: 'Direction visuelle',
    title: "J'ai choisi un site clair et des écrans produit sombres.",
    body: [
      "Ainsi, le visiteur distingue d'un coup d'œil ce qui relève du discours et ce qui montre le produit : le simulateur, les captures, les panneaux de données et le bandeau d'appel à l'action passent tous dans le thème sombre.",
      "Pour le reste, j'ai retenu des cartes flottantes en verre dépoli aux angles arrondis, avec un accent cyan.",
      "Côté typographie, j'ai écarté les polices éditoriales à empattements au profit de sans-serif faciles à lire : Urbanist pour les titres, Geist pour le texte et pour les chiffres, alignés en colonnes. Les espacements suivent une grille de 8, avec 4 pour les ajustements fins.",
    ],
    shotAlt: 'Le même composant de Seuil en thème clair et en thème produit sombre',
  },

  ui: {
    ...en.ui,
    eyebrow: 'Design system',
    idx: '31 composants',
    lede: "J'ai d'abord défini les tokens, qui sont la seule source de vérité pour les couleurs, les tailles, les espacements, les rayons et les ombres.",
    body: [
      "Aucune valeur n'est écrite en dur dans les composants, ce qui permet de faire évoluer le site sans le reprendre page par page.",
      "Ensuite, j'ai documenté chaque composant partagé avec ses variantes, ses états et les tokens qu'il utilise : boutons, chips de choix, badges d'état, jauges, blocs règle, cartes de décision, tableaux, cartes de formule, soit 31 composants en tout. J'ai aussi listé ce qui n'est volontairement pas dessiné, pour éviter les ajouts au fil de l'eau.",
      "Enfin, chaque page est une suite de sections typées (hero, problème, bénéfices par rôle, étapes, fonctionnalité, intégrations, tarifs, FAQ, appel à l'action). Chaque section correspond à un composant et à un schéma dans le CMS Sanity. Une personne du marketing assemble donc une page avec les mêmes briques que moi, et Sanity refuse par exemple la publication d'un prix sans sa ligne de source.",
      "L'ensemble vit dans un artefact Design System de Claude : 59 couleurs sur deux thèmes, 14 styles de texte et une fiche par composant. C'est la référence que Claude lit pour générer les maquettes, et non une simple documentation pour humains.",
    ],
    shotAlt: "Les états des composants de Seuil : bouton principal, champ, chip de choix et badge d'état",
    preview: {
      ...en.ui.preview,
      alt: 'Couverture du design system de Seuil',
      linkLabel: 'Explorer le design system',
    },
    paletteLabel: '// Tokens de couleur',
    fonts: [
      { k: 'Titres', v: 'Urbanist' },
      { k: 'Texte', v: 'Geist' },
      { k: 'Chiffres', v: 'Geist, chiffres tabulaires' },
    ],
  },

  footer: 'Site produit SaaS B2B · Seuil',
}
