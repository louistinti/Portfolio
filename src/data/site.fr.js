// Contenu du site, version française (miroir de site.js, mêmes clés).
// Les champs neutres (couleurs, chemins, années, cover) restent partagés via
// l'import du fichier EN quand c'est possible.
import { profile as profileEn, contactLinks as contactLinksEn, tools as toolsEn } from './site.js'

// Identité : identique (nom, mail, CV, Calendly), seul le rôle est un titre,
// qu'on garde en anglais des deux côtés (terme de métier).
export const profile = profileEn
export const contactLinks = contactLinksEn
export const tools = toolsEn

// Chips du hero, termes de métier, lisibles tels quels en français.
export const heroChips = ['Freelance', 'Research / UX', 'Design system / UI', 'SaaS', 'AI Builder']

// Section « Ce que je fais »
export const skills = [
  { n: 'Product & UX Design', d: 'Research · parcours · archi de l’info · prototypage' },
  { n: 'UI & Design Systems', d: 'Composants · tokens · librairies scalables' },
  { n: 'AI Project Building', d: 'Prompting · prototypage · shipping avec l’IA' },
  { n: 'B2B & SaaS Strategy', d: 'Activation · rétention · workflows complexes' },
]

// Cartes projets, mêmes idx/year/slug/cover que la version EN.
export const projects = [
  {
    idx: '01', name: 'Paris-Saclay', year: '2025', cat: 'UX/UI · App mobile', slug: 'paris-saclay',
    tldr: 'Une app de campus inutilisée devenue un outil du quotidien : recherche terrain, architecture de l’information claire et langage visuel topographique pour un campus de 77 km².',
    cover: '/assets/ps/cover.jpg',
  },
  {
    idx: '02', name: 'Actual - Outil de gestion des garanties', year: '2025', cat: 'B2B SaaS · Grand groupe', slug: 'garence',
    tldr: 'Outil de gestion des garanties d’Actual Group, mené de A à Z : trois types d’utilisateurs, des millions d’euros en jeu ; 90,5 % des décisions automatisées et un temps de décision réduit de 83 %. Maquettes détaillées présentées en entretien.',
    cover: '/assets/garence/cover.svg',
  },
  {
    idx: '03', name: 'Renault Group - Intranet Qualité', year: '2020-2022', cat: 'UX Research · Intranet', slug: 'renault',
    tldr: 'Le site chapeau SharePoint qui réunit les 7 processus qualité de Renault Group pour ~10 000 personnes : ~15 min gagnées par recherche de document, ~3 min par recherche de contact. Écrans reconstitués de mémoire (NDA).',
    cover: '/assets/renault/cover.webp',
  },
  {
    idx: '04', name: 'Actual - Liste candidats', year: '2025', cat: 'B2B SaaS · UX/UI', slug: 'candidate-list',
    tldr: 'Une liste recruteur lourde et fragmentée devenue une vue scannable et actionnable : infos clés et actions rapides sur la ligne ; 2-3 min gagnées par vérification de disponibilité candidat. Maquettes détaillées présentées en entretien.',
    cover: '/assets/candidate-list/cover.svg',
  },
  {
    idx: '05', name: 'La Vraie Charentaise', year: '2022', cat: 'Branding · E-commerce', slug: 'charentaise',
    tldr: 'L’humble charentaise made-in-France réinventée en icône de la slow life : rebranding complet et concept e-commerce avec quiz de matchmaking et personnalisation sur-mesure.',
    cover: '/assets/lvc/cover.png',
  },
  {
    idx: '06', name: 'Learning Leagues', year: '2025, en cours', cat: 'Perso · Produit & Design System', slug: 'learning-leagues',
    status: 'En cours',
    tldr: 'Un site perso pour apprendre League of Legends proprement : structuré par rôle, sans jargon, sur un design system Hextech piloté par tokens. Conçu et développé en solo avec l’IA en binôme : un moteur de rôles data-driven, les cinq rôles en ligne. Et ça continue.',
    cover: '/assets/cover_ll.png',
  },
  {
    idx: '07', name: 'Concepts', year: '2026', cat: 'Explorations UI · Auto-initié', slug: 'concepts',
    tldr: 'Des explorations UI auto-initiées sur plusieurs types de produits (un OS de projet, un copilote d’écriture IA, une suite d’analytics produit) où je pousse le pur craft d’interface.',
    cover: '/assets/UI/Atlas.webp',
  },
]
