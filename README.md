# Portfolio — Product Designer & AI Project Builder

Single-page **dark editorial** portfolio (DEPTH × Instrument-Serif elegance), built with
**React + Vite**. Implemented from a Claude Design handoff bundle.

## Voir les changements en local (avant de push)

Le moyen le plus simple : **double-clique sur `start-dev.bat`**.
Il installe les dépendances la première fois, démarre le serveur local et ouvre
le site dans ton navigateur sur **http://localhost:5173**. Dès que tu modifies un
fichier et que tu l'enregistres, la page se met à jour toute seule (hot reload).
Ferme la fenêtre noire (ou Ctrl+C) pour arrêter le serveur.

> Pour une vérification finale du rendu réel déployé, double-clique sur
> `preview-build.bat` (construit puis sert la version de production).

En ligne de commande, l'équivalent est :

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # serveur local avec rechargement à chaud → http://localhost:5173
npm run preview  # aperçu de la version de production (après npm run build)
```

## Modifier le contenu

Tout le contenu éditable (rôle, projets, compétences, outils, contacts) est centralisé dans :

```
src/data/content.js
```

- `profile` — nom, initiales du logo, rôle, email, localisation
- `projects` — les 6 cartes (titre, année, catégorie, TL;DR au survol, image).
  La carte `01` (Paris-Saclay) pointe vers la page d'étude de cas via `href: '#/paris-saclay'`.
- `caseStudies` — contenu des études de cas, une entrée par projet (clé = `slug`).
  Voir « Études de cas » ci-dessous
- `skills` / `tools` — section « What I do »
- `contactLinks` / `heroChips` — liens et chips

### Études de cas (template réutilisable)

Chaque projet peut avoir sa propre page d'étude de cas, toutes générées par le **même
composant** (`CaseStudy.jsx`) à partir des données de `content.js`. Routeur basé sur le
hash, sans dépendance : la page vit sur `#/<slug>`.

**Ajouter une étude de cas pour un projet :**

1. Dans `content.js`, dans l'objet `caseStudies`, **copie le bloc `'paris-saclay'`** et
   renomme la clé avec le `slug` du projet (ex. `'orbit'`). Les slugs sont déjà posés sur
   les 6 projets de `projects`.
2. Adapte le contenu (titre, sections, personas, features…) et le `theme` (couleurs du
   projet). Dès que l'entrée existe, **la carte du portfolio devient cliquable** vers
   `#/<slug>` — aucune autre modification nécessaire.
3. Toutes les sections sont **optionnelles** : retire une clé (ex. `topography`) et la
   section disparaît.

**Mise en forme du texte** (helper intégré) : `**gras**`, `*mot surligné (accent)*`,
`` `touche clavier` ``.

**Images** : pose le fichier dans `public/assets/` puis renseigne son chemin dans le
`shots` de l'entrée (clé = `shot` cité dans la section). Vide = placeholder rayé.

### Ajouter une image de projet ou la photo du hero

1. Place l'image dans `public/assets/` (ex: `nexus.jpg`).
2. Dans `content.js`, renseigne `cover: '/assets/nexus.jpg'` sur le projet concerné.
   (Le hero utilise un placeholder rayé ; on y branchera une image archi quand tu l'auras.)

## Changer le style / les couleurs

Tous les design tokens (couleurs, polices, accent bleu `#5b8cff`, espacements) sont en haut de :

```
src/styles/index.css
```

## Build & déploiement

```bash
npm run build    # génère dist/ prêt à déployer
npm run preview  # prévisualise le build
```

Le dossier `dist/` se dépose sur **Netlify**, **Vercel** ou **GitHub Pages**.

## Structure

```
src/
  components/   → Nav, Hero, Marquee, About, Work, Skills, Contact, Footer,
                  Portfolio (page d'accueil), CaseStudy (étude de cas Paris-Saclay)
  data/         → content.js (contenu éditable)
  hooks/        → useInteractions.js (scroll reveals, nav, TLDR tactile),
                  useRoute.js (routeur hash : portfolio ↔ étude de cas)
  styles/       → design-system.css (tokens), index.css (portfolio),
                  case-study.css (étude de cas, scopé .cs-page)
public/
  assets/       → images des projets et de l'étude de cas
```
