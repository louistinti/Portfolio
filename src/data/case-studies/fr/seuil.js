// Étude de cas : seuil, version FR (texte de Louis) ; thème, images et liens
// partagés avec l'EN.
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
    eyebrow: 'Contexte',
    lede: 'Seuil est un SaaS B2B fictif qui aide les PME à décider, commande par commande, si un client peut être livré à crédit.',
    body: [
      "J'ai conçu son site marketing de bout en bout, du cadrage à la mise en ligne, afin de montrer comment je travaille sur un produit complexe.",
      "Pendant mes trois ans chez Groupe Actual, j'ai notamment conçu l'outil de gestion des garanties et encours non garantis (ENG), qui est passé de 0 à 90,5 % de décisions automatisées. Je ne peux pas montrer ces écrans, car ils sont couverts par un accord de confidentialité.",
      "J'ai donc choisi de créer Seuil, un produit fictif dans le même domaine : la décision de crédit client. Ainsi, je pouvais montrer publiquement ma compréhension du sujet sans rien révéler du travail fait pour Actual.",
      "De plus, je voulais tester l'offre que je propose aux SaaS B2B : un site qui explique un produit complexe aussi bien que l'équipe commerciale, et que le marketing peut modifier seul.",
    ],
    stats: [
      { v: '6', k: 'pages en ligne, modifiables dans un CMS.' },
      { v: '5', u: 'jours', k: 'de la première maquette à la dernière correction.' },
      { v: '31', k: 'composants documentés dans le design system.' },
    ],
  },

  research: {
    eyebrow: 'Recherche',
    idx: 'Étape 01',
    lede: "Seuil étant fictif, je n'avais ni clients ni équipe à interroger.",
    body: [
      "J'ai donc concentré la recherche sur le marché du credit management B2B, afin de placer Seuil face à des produits réels.",
      "J'ai d'abord constaté qu'il n'existe pas de classement neutre : la plupart des comparatifs sont publiés par les éditeurs eux-mêmes. J'ai donc classé les acteurs moi-même en trois groupes :",
      "**Les plateformes grands comptes**, de la commande à l'encaissement (HighRadius, Esker, Sidetrade, Billtrust, Serrala, Emagia) ;",
      '**Les outils mid-market**, plus proches de Seuil (Tesorio, Gaviti, Onguard, Hoopiz, ce dernier s’adressant aux mêmes rôles que Seuil) ;',
      "**Les fournisseurs de données**, comme Dun & Bradstreet ou Coface, que j'ai traités comme des intégrations et non comme des concurrents.",
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
      "Pour le reste, j'ai retenu des cartes flottantes en verre dépoli aux angles arrondis, avec un accent cyan. Le halo de couleur flouté n'apparaît que derrière une carte, jamais comme simple fond, afin qu'il serve la lecture plutôt que la décoration.",
      "Côté typographie, j'ai écarté les polices éditoriales à empattements au profit de sans-serif faciles à lire : Urbanist pour les titres, Geist pour le texte et Geist Mono pour les chiffres. Les espacements suivent une grille de 8, avec 4 pour les ajustements fins.",
    ],
  },

  ui: {
    ...en.ui,
    eyebrow: 'Design system',
    idx: '31 composants',
    lede: "J'ai d'abord défini les tokens, la seule source de vérité pour les couleurs, les tailles, les espacements, les rayons et les ombres.",
    body: [
      "J'en ai défini 105, déclinés en deux thèmes : clair pour le site, sombre pour tout ce qui montre le produit. J'ai ensuite documenté chaque composant avec ses variantes, ses états et les tokens qu'il utilise, ainsi que ce qui n'est pas dessiné, afin qu'aucun ajout ne se fasse au cas par cas.",
    ],
    stats: [
      { v: '105', k: 'tokens' },
      { v: '2', k: 'thèmes' },
      { v: '14', k: 'styles typographiques' },
      { v: '11', k: 'icônes' },
      { v: '31', k: 'composants' },
    ],
    blocks: [
      {
        ...en.ui.blocks[0],
        k: '// Deux thèmes',
        title: 'Le site est clair, le produit est sombre.',
        text: "Le thème clair habille les pages. Tout ce qui montre le produit, comme le simulateur, les captures ou les panneaux de données, passe en thème sombre : il suffit d'un attribut sur le conteneur, et les tokens sémantiques changent de valeur.",
        alt: 'Le même composant de Seuil en thème clair et en thème produit sombre',
      },
      {
        ...en.ui.blocks[1],
        k: '// Un token, une raison',
        title: 'Le cyan est le seul accent, mais il existe en deux tokens.',
        text: "`color-accent-default` sert de fond, par exemple pour le bouton principal, toujours avec un texte foncé par-dessus. Pour un texte ou une icône en accent, j'utilise `color-accent-text` : le cyan vif ne tient pas le contraste en texte sur fond clair.",
      },
      {
        ...en.ui.blocks[2],
        k: '// États de décision',
        title: 'Un état ne tient jamais à la couleur seule.',
        text: "Acceptée, Refusée, Envoyée à l'analyste : chaque état porte une icône et un libellé, en plus de sa couleur. Le vert et le rouge se distinguent surtout par la teinte, l'icône et le libellé sont donc obligatoires.",
        alt: "Les trois badges d'état de Seuil : Acceptée, Refusée, Envoyée à l'analyste",
      },
      {
        ...en.ui.blocks[3],
        k: '// Le contenu fait partie du système',
        text: [
          "Le système fixe aussi les règles d'écriture : des libellés de verdict sans variante, la mention « Données fictives » sur chaque capture, et un emplacement visible à la place de tout chiffre, témoignage ou logo qui n'est pas sourcé.",
          "Enfin, chaque page est une suite de sections typées (hero, problème, bénéfices par rôle, étapes, fonctionnalité, intégrations, tarifs, FAQ, appel à l'action). Chaque section correspond à un composant et à un schéma dans le CMS Sanity. Une personne du marketing assemble donc une page avec les mêmes briques que moi, et Sanity refuse par exemple la publication d'un prix sans sa ligne de source.",
        ],
      },
    ],
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
      'Le moteur du simulateur est couvert par 89 tests, et 94 tests vérifient le clavier, le focus et les contrastes dans les deux thèmes. Une personne non technique a modifié et publié une section du site seule.',
    ],
    noteLabel: "// Si c'était à refaire",
    note: "Si c'était à refaire pour un client réel, je commencerais par ce que Seuil ne pouvait pas avoir : des entretiens avec le fondateur, l'équipe commerciale et un client, afin que le site parte des questions réellement posées en démo.",
  },

  prototype: {
    ...en.prototype,
    eyebrow: 'En ligne',
    idx: 'Essayez-le',
    linkLabel: 'Visiter le site',
  },

  footer: 'Site produit SaaS B2B · Seuil',
}
