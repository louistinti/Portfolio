# Portfolio — Product Designer & AI Project Builder

Single-page **dark editorial** portfolio (DEPTH × Instrument-Serif elegance), built with
**React + Vite**. Implemented from a Claude Design handoff bundle.

## Démarrer en local

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site → http://localhost:5173
```

## Modifier le contenu

Tout le contenu éditable (rôle, projets, compétences, outils, contacts) est centralisé dans :

```
src/data/content.js
```

- `profile` — nom, initiales du logo, rôle, email, localisation
- `projects` — les 6 cartes (titre, année, catégorie, TL;DR au survol, image)
- `skills` / `tools` — section « What I do »
- `contactLinks` / `heroChips` — liens et chips

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
  components/   → Nav, Hero, Marquee, About, Work, Skills, Contact, Footer
  data/         → content.js (contenu éditable)
  hooks/        → useInteractions.js (scroll reveals, nav, TLDR tactile)
  styles/       → index.css (design tokens + tous les styles)
public/
  assets/       → images des projets
```
