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
