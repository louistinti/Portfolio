# Motion layer — spec de design

**Date** : 2026-07-02
**Branche** : `feat/motion-layer` — aucun merge dans `main` sans feu vert explicite de Louis.
**Objectif** : rendre le portfolio vivant et « vraiment UX » en ajoutant une couche d'animation par-dessus le site existant, **sans toucher au contenu ni au layout**.

## Décisions validées

| Sujet | Décision |
|---|---|
| Ambition | **Couche motion pure** — le layout actuel ne bouge pas d'un pixel |
| Périmètre | **Tout le site** : home, 5 case studies, transitions entre les deux |
| Personnalité | **B — Précis & snappy** : 0.3–0.5s, easing expo, textes qui montent sous masques, lignes qui se tracent |
| Extras | Smooth scroll (Lenis) + transitions de page + curseur custom. **Pas de préloader.** |
| Transition de page | **A — Rideau** : panneau sombre qui balaye, titre du projet dessus, page suivante révélée derrière |
| Stack | **GSAP (+ ScrollTrigger) + Lenis** — validé contre vanilla CSS et Framer Motion |

## Architecture

Nouvelles dépendances : `gsap`, `lenis`. Rien d'autre.

Toute la couche vit dans un module isolé — supprimer `src/anim/` rend le site
identique à aujourd'hui :

```
src/anim/
  motion.js            → tokens de motion (durées, easings, staggers)
  useLenis.js          → smooth scroll global + synchro ScrollTrigger
  useReveals.js        → reveals GSAP (remplace le IntersectionObserver de useInteractions)
  usePageTransition.js → rideau home ↔ case study
  Cursor.jsx           → curseur custom (desktop uniquement)
```

### Tokens de motion (`motion.js`)

L'équivalent motion des design tokens CSS — une seule source de vérité :

- `ease.out` : `expo.out` (l'easing signature de la personnalité B)
- `ease.inOut` : `expo.inOut` (rideau)
- `dur.fast` : 0.3s (micro-interactions), `dur.base` : 0.5s (reveals), `dur.page` : 0.6s (rideau, par phase)
- `stagger.lines` : 0.09s, `stagger.items` : 0.06s

### Principe d'intégration

Les composants existants gardent structure et classes. Les hooks ciblent les
éléments en place (`.reveal`, `.card`, `.skill-row`, …) via `gsap.context()`
scopé au conteneur de page. Ajouts JSX limités à : wrappers de masque sur les
lignes du hero, montage de `<Cursor />` et du rideau dans `App`.

### Points d'ancrage React

- `App.jsx` : garde un état `displayedRoute` distinct du hash. Quand la route
  change : rideau couvre → swap du composant + `scrollTo(0,0)` immédiat derrière
  le rideau → rideau se lève. Gère aussi le bouton retour navigateur (toute
  variation de route passe par le même chemin).
- `Portfolio.jsx` / `CaseStudy.jsx` : appellent `useReveals()` ; leurs scrolls
  programmés (`scrollIntoView`, `window.scrollTo`) passent par `lenis.scrollTo`.
- `useScrollLock` : étendu pour appeler `lenis.stop()/start()` en plus de
  `body.overflow` (menu mobile, modale contact, lightbox).

## Motion par section

Personnalité B partout : rapide, net, masques, lignes tracées. Les séquences
d'entrée restent sous ~0.8s (hero) et ~0.6s (sections au scroll).

### Home

- **Nav** : descend en place au premier chargement (`y:-100% → 0`, 0.5s, léger
  retard après le hero). Le shrink au scroll existant est conservé tel quel.
- **Hero** : les lignes du titre montent sous masques (stagger 0.09s), le
  kicker et les chips suivent (fade + y, stagger court), la règle horizontale
  se trace (`scaleX 0 → 1`, origin left). Séquence totale < 0.8s. « Scroll ↓ »
  apparaît en dernier.
- **Marquee** : conserve son animation CSS. Ajout d'un seul effet ScrollTrigger
  léger : vitesse de défilement légèrement modulée par la vélocité du scroll
  (clampée), pour la sensation de réactivité.
- **About** : le paragraphe full-width se révèle par lignes masquées au scroll ;
  les colonnes meta en fade + y staggé.
- **Work** : le titre de section en masque + règle tracée ; les cartes arrivent
  en fade + y (stagger 0.06s, une seule fois). Hover carte existant conservé
  (scale média + TLDR), avec timing raccourci pour coller à la personnalité B.
- **Skills** : chaque `.skill-row` se révèle avec sa bordure qui se trace de
  gauche à droite ; le hover padding-left existant est conservé, durée alignée.
- **Contact / Footer** : titre en masque, boutons en fade + y staggé. Les
  hovers boutons existants gardent leur logique, timings harmonisés (0.3s).

### Case studies (les 5, via le template commun)

- **Header** : titre en masque + meta staggées à l'arrivée (juste après la
  levée du rideau).
- **Sections** : réutilisation du même vocabulaire — titres masqués, règles
  tracées, images en fade + y avec léger scale-down (1.04 → 1), textes staggés.
- **Sommaire / ancres internes** : scrolls routés via `lenis.scrollTo`.
- **Lightbox** : aucune animation nouvelle à l'intérieur (le pan-zoom natif est
  conservé) ; ouverture/fermeture en fade + scale court (0.3s).

### Transition rideau

1. Route change (clic carte, lien, ou bouton retour) → le rideau monte du bas
   (`expo.inOut`, 0.6s), portant le nom du projet (ou « Home ») en mono.
2. Derrière : swap du composant, reset scroll immédiat, kill des ScrollTriggers
   de la page sortante.
3. Le rideau se lève (0.6s) et la séquence d'entrée de la nouvelle page joue.
   Total perçu ≈ 1.2s ; les images de la page suivante chargent sous le rideau.
4. Z-index du rideau > 8000 (au-dessus du menu mobile), sans interférer avec le
   `mix-blend-mode` de la nav.

### Curseur custom

- Desktop avec pointeur fin uniquement (`(hover: hover) and (pointer: fine)`).
- Point discret qui suit avec un léger lag (lerp), grossit sur les liens,
  affiche « View » sur les cartes projet cliquables.
- Le curseur natif reste visible (pas de `cursor: none`) — le custom est un
  compagnon, pas un remplacement : zéro risque d'accessibilité.

## Risques identifiés à l'audit & parades

| # | Risque | Parade |
|---|---|---|
| 1 | `React.StrictMode` double-monte les effets en dev → animations dupliquées, double Lenis | Tout dans `gsap.context()` + `revert()` au cleanup ; hook Lenis idempotent (création/destruction symétriques) |
| 2 | `html { scroll-behavior: smooth }` (index.css:11) en conflit avec Lenis | Passé à `auto` quand Lenis est actif ; comportement actuel conservé en fallback (mobile, reduced-motion, no-JS) |
| 3 | Lightbox pan-zoom : Lenis capterait la molette | `data-lenis-prevent` sur le stage + `lenis.stop()/start()` intégré à `useScrollLock` |
| 4 | Ancres (`#work`, sommaire case study, « Scroll ↓ ») en saut sec sous Lenis | Clics d'ancres routés vers `lenis.scrollTo()` ; idem pour les `scrollTo`/`scrollIntoView` existants |
| 5 | Le hash change instantanément (y compris bouton retour) → pas de place pour le rideau | État `displayedRoute` dans `App` : le swap visuel attend le rideau, quelle que soit l'origine du changement |
| 6 | Rideau vs nav `mix-blend-mode` et menu mobile z 8000 | Rideau sur un layer dédié z 8800 (au-dessus du menu mobile 8500, sous le grain 9000), rendu dans l'arbre App en `position: fixed` — un portal n'est pas nécessaire |
| 7 | Images case study sans dimensions fixes → positions ScrollTrigger fausses | `ScrollTrigger.refresh()` après le chargement des images de la page |
| 8 | Page design system `?ds` | Hors périmètre — elle a son propre root, aucune couche motion |

## Accessibilité, performance, fallbacks

- **`prefers-reduced-motion: reduce`** : Lenis non initialisé, aucun tween —
  contenu visible immédiatement, rideau remplacé par un simple fondu court.
  (Le CSS actuel gère déjà ce cas ; la couche JS s'y aligne.)
- **Mobile / tactile (< 1024px ou pointeur grossier)** : scroll natif conservé
  (pas de Lenis), reveals simplifiés (fade + y, pas de masques par ligne),
  pas de curseur custom. Le tap-TLDR existant est conservé.
- **Sans JS / vieux navigateurs** : les classes par défaut ne masquent rien —
  le contenu est visible sans animation (même stratégie que le `.reveal`
  actuel, mais l'état initial masqué est posé par GSAP, pas par le CSS).
- **Performance** : uniquement `transform` et `opacity` animés ; `will-change`
  posé par GSAP le temps des tweens ; les ScrollTriggers d'une page sont tués
  à sa sortie. Budget : +~60KB gzip (gsap + lenis), aucun impact au-delà.
- **Vérification** : chaque étape validée en navigateur (preview + screenshots),
  `npm run build` vert avant chaque commit, test des 3 modes (desktop, mobile,
  reduced-motion).

## Hors périmètre

- Tout changement de contenu, de layout ou de style visuel statique
- Le rebuild kinetic du repo Fable (reste où il est)
- Préloader / intro (écarté explicitement)
- La page design system `?ds`
- Déploiement (décision séparée, après feu vert sur la branche)

## Critères de succès

1. Le site se comporte à l'identique en structure et contenu — seul le
   mouvement change.
2. Personnalité B perceptible partout : rien ne « flotte », tout est net.
3. Navigation home ↔ case study avec rideau fluide, y compris bouton retour.
4. Lightbox, menu mobile, modale contact : zéro régression.
5. `main` intact jusqu'au feu vert explicite de Louis.
