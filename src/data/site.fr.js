// Contenu du site, version française (miroir de site.js, mêmes clés).
// Les champs neutres (couleurs, chemins, années, cover) restent partagés via
// l'import du fichier EN quand c'est possible.
import { profile as profileEn, contactLinks as contactLinksEn, tools as toolsEn } from './site.js'

// Identité : identique (nom, mail, Calendly) sauf le CV, servi en français.
// Le rôle est un titre, gardé en anglais des deux côtés (terme de métier).
export const profile = { ...profileEn, cv: '/Louis-Tintillier-CV-FR.pdf' }
export const contactLinks = contactLinksEn
export const tools = toolsEn

// Chips du hero, termes de métier, lisibles tels quels en français.
export const heroChips = ['Freelance', 'Research / UX', 'Design system / UI', 'SaaS', 'AI Builder']

// Section « Ce que je fais »
export const skills = [
  { n: 'Product & UX Design', d: 'Research · parcours · archi de l’info · prototypage' },
  { n: 'UI & Design Systems', d: 'Composants · tokens · librairies évolutives' },
  { n: 'AI Project Building', d: 'Prompting · MCP Figma · prototypage · shipping avec l’IA' },
  { n: 'B2B & SaaS Strategy', d: 'Outils métier · workflows complexes · multi-utilisateurs' },
  { n: 'Domaines', d: 'Finance & crédit · assurance · RH & staffing · industrie' },
]

// Cartes projets, mêmes idx/year/slug/href/cover que la version EN.
export const projects = [
  {
    idx: '01', name: 'Actual - Outil de gestion des garanties', year: '2025', cat: 'B2B SaaS · Grand groupe', slug: 'garanties',
    tldr: 'Outil de gestion des garanties d’Actual Group, mené de A à Z : trois types d’utilisateurs, des millions d’euros en jeu. De 0 à 90,5 % de décisions automatisées ; temps de décision de bout en bout : de 125 s à 21 s. Maquettes détaillées présentées en entretien.',
    cover: '/assets/garanties/cover.svg',
  },
  {
    idx: '02', name: 'Seuil', year: '2026', cat: 'Site produit SaaS B2B · Projet de démonstration', slug: 'seuil',
    tldr: 'Le site marketing d’un SaaS B2B fictif de décision de crédit client, conçu puis mis en ligne de bout en bout. 6 pages en desktop et mobile · Contenu modifiable dans Sanity sans toucher au code · Simulateur de décision interactif · Accessibilité WCAG AA testée.',
    cover: '/assets/seuil/cover.webp',
  },
  {
    idx: '03', name: 'Actual - Liste candidats', year: '2025', cat: 'B2B SaaS · UX/UI', slug: 'candidate-list',
    tldr: 'Une liste de candidats lourde et fragmentée, devenue une vue lisible et actionnable, avec une recherche assistée par IA. 2 à 3 minutes gagnées par recherche, sur environ 100 recherches par agence et par mois. Maquettes détaillées présentées en entretien.',
    cover: '/assets/candidate-list/cover.svg',
  },
  {
    idx: '04', name: 'Renault Group - Intranet Qualité', year: '2020-2022', cat: 'UX Research · Intranet', slug: 'renault',
    tldr: 'Le site chapeau SharePoint qui réunit les 7 processus qualité de Renault Group pour ~10 000 personnes : 5 min gagnées par recherche d’information ou de contact, plus de 160 h économisées par mois. Écrans reconstitués de mémoire (NDA).',
    cover: '/assets/renault/cover.webp',
  },
  {
    idx: '05', name: 'Learning Leagues', year: '2025, en cours', cat: 'Perso · Produit & Design System', slug: 'learning-leagues',
    status: 'En cours',
    tldr: 'Un site perso pour apprendre League of Legends proprement : structuré par rôle, sans jargon, sur un design system Hextech piloté par tokens. Conçu et développé en solo avec l’IA en binôme : un moteur de rôles data-driven, les cinq rôles en ligne, et une bibliothèque de composants AI-first à part qui alimente le site. Et ça continue.',
    cover: '/assets/cover_ll.png',
  },
  {
    idx: '06', name: 'Paris-Saclay', year: '2020', cat: 'UX/UI · App mobile · Concept', slug: 'paris-saclay',
    tldr: 'Repenser l’app de campus de l’Université Paris-Saclay, presque inutilisée, pour en faire un outil du quotidien.',
    cover: '/assets/ps/cover.jpg',
  },
]
