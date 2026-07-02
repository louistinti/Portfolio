# Motion Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GSAP + Lenis motion layer ("precise & snappy" personality) over the existing portfolio without touching content or layout — spec: `docs/superpowers/specs/2026-07-02-motion-layer-design.md`.

**Architecture:** All motion lives in an isolated `src/anim/` module (tokens, Lenis hook, reveals hook, page transition, cursor). Components keep their structure; hooks target existing classes via `gsap.context()`. A `has-motion` class on `<html>` gates all motion CSS so reduced-motion users get today's behavior.

**Tech Stack:** React 18 (StrictMode ON — every effect must survive double-mount), Vite 5, GSAP 3 (+ ScrollTrigger), Lenis. No test framework exists in this repo and animations are visual: verification is `npm run build` + browser preview checks at each task. Work happens on branch `feat/motion-layer`; never merge or push to `main`.

**Working directory:** `C:\Users\goldy\Desktop\GitHub\Portfolio` (all paths below relative to it).

**Verify in browser:** use the Claude preview tools (`preview_start` with the config from Task 1, then `preview_console_logs`, `preview_snapshot`, `preview_screenshot`). The site runs at http://localhost:5173. A human can double-click `start-dev.bat` instead.

**Key existing facts (audited 2026-07-02):**
- `src/main.jsx:14` wraps the app in `React.StrictMode` → effects run twice in dev.
- `src/styles/index.css:11` sets `html { scroll-behavior: smooth }` → conflicts with Lenis.
- `src/styles/index.css:210-219` defines `.reveal` (hidden by default, shown by `.in`, forced visible under `prefers-reduced-motion`).
- `src/hooks/useInteractions.js` owns the current IntersectionObserver reveals + nav shrink + tap-TLDR.
- `src/hooks/useRoute.js` is a hash router; case studies live at `#/<slug>`; `goHome()` navigates back.
- Z-index map: contact modal 7900, nav 8000, nav-mobile 8500, grain overlay 9000, lightbox 9999. Curtain goes at **8800**.
- The lightbox (`CaseStudy.jsx:565-591`) pans via native scroll of its stage div → needs `data-lenis-prevent`.
- `.section-head` (index.css:146) and `.skill-row` (index.css:389) draw their lines with `border-top` / `border-bottom` — traced-line effect replaces them with a scalable `::before`/`::after` under `.has-motion`.

---

### Task 1: Dependencies + preview config

**Files:**
- Modify: `package.json` (via npm)
- Create: `.claude/launch.json`

- [ ] **Step 1: Install gsap and lenis**

Run: `npm install gsap lenis`
Expected: both added to `dependencies` in `package.json`, no peer warnings.

- [ ] **Step 2: Create the preview launch config**

Create `.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "portfolio",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 5173
    }
  ]
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: `✓ built in …` with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .claude/launch.json
git commit -m "chore: add gsap + lenis, preview launch config"
```

---

### Task 2: Motion tokens (`src/anim/motion.js`)

**Files:**
- Create: `src/anim/motion.js`

- [ ] **Step 1: Write the tokens module**

Create `src/anim/motion.js`:

```js
// ──────────────────────────────────────────────────────────────
//  Tokens de motion — personnalité « précis & snappy ».
//  Une seule source de vérité pour durées, easings et staggers,
//  au même titre que les design tokens CSS de design-system.css.
// ──────────────────────────────────────────────────────────────

export const ease = {
  out: 'expo.out', // reveals, micro-interactions
  inOut: 'expo.inOut', // rideau de transition
}

export const dur = {
  fast: 0.3, // micro-interactions
  base: 0.5, // reveals au scroll
  page: 0.6, // rideau (par phase : couvrir / lever)
}

export const stagger = {
  lines: 0.09, // lignes de titre masquées
  items: 0.06, // cartes, meta, boutons
}

// Le motion est coupé net pour qui préfère le calme.
export const motionEnabled = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Lenis : desktop précis uniquement — le scroll tactile reste natif.
export const lenisEnabled = () =>
  motionEnabled() && finePointer() && window.innerWidth >= 1024
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: `✓ built` (module is not imported yet — this just catches syntax errors).

- [ ] **Step 3: Commit**

```bash
git add src/anim/motion.js
git commit -m "feat(anim): motion tokens (durations, easings, staggers, gates)"
```

---

### Task 3: Lenis smooth scroll (`src/anim/useLenis.js`) + CSS gate

**Files:**
- Create: `src/anim/useLenis.js`
- Create: `src/styles/motion.css`
- Modify: `src/main.jsx` (import motion.css)
- Modify: `src/App.jsx` (call the hook)

- [ ] **Step 1: Write the Lenis hook**

Create `src/anim/useLenis.js`:

```js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { lenisEnabled, motionEnabled } from './motion.js'

gsap.registerPlugin(ScrollTrigger)

// Instance partagée — importée par useScrollLock, usePageTransition, etc.
// Nulle quand Lenis est inactif (mobile, reduced-motion) : toujours tester.
export let lenis = null

// Fait défiler vers une cible (élément, sélecteur ou position en px) via
// Lenis quand il est actif, sinon en natif. `immediate` saute sans lisser.
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, force: true })
    return
  }
  const behavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior, block: 'start' })
  }
}

export function useLenis() {
  useEffect(() => {
    // Drapeau global : tout le CSS de motion est scopé `.has-motion`.
    if (motionEnabled()) document.documentElement.classList.add('has-motion')

    if (!lenisEnabled()) return

    lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Ancres même-page (#about, #work, sommaire des case studies…) :
    // routées vers Lenis. Les routes `#/slug` ne sont PAS interceptées.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (href.startsWith('#/')) return // route de case study
      const el = href.length > 1 && document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      scrollToTarget(el)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
```

Note: the cleanup is symmetric (StrictMode double-mount safe) — second mount just creates a fresh instance.

- [ ] **Step 2: Create the motion stylesheet**

Create `src/styles/motion.css`:

```css
/* ============================================================
   MOTION LAYER — tout est scopé .has-motion (posé par useLenis
   quand prefers-reduced-motion n'est pas actif). Sans ce flag,
   le site garde exactement son comportement d'origine.
   ============================================================ */

/* Lenis pilote le lissage : le smooth CSS ferait double emploi. */
html.has-motion { scroll-behavior: auto; }

/* Recommandations Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```

- [ ] **Step 3: Import the stylesheet**

In `src/main.jsx`, after the existing style imports (line 7), add:

```js
import './styles/motion.css' // couche motion (scopée .has-motion)
```

- [ ] **Step 4: Call the hook in App**

In `src/App.jsx`, add the import and call the hook first in the component:

```js
import { useLenis } from './anim/useLenis.js'
```

and inside `App()`, first line: `useLenis()`.

- [ ] **Step 5: Verify in browser**

Run `npm run build` (expect `✓ built`), then start the preview (`preview_start` → `portfolio`).
Check: `preview_console_logs` shows no errors; scrolling with the mouse wheel is smoothed (inertia); `document.documentElement.className` contains `has-motion` and `lenis` (check via `preview_eval`).
Check nav links: clicking "About"/"Work" glides smoothly (Lenis), no instant jump.

- [ ] **Step 6: Commit**

```bash
git add src/anim/useLenis.js src/styles/motion.css src/main.jsx src/App.jsx
git commit -m "feat(anim): lenis smooth scroll with anchor routing and motion flag"
```

---

### Task 4: Scroll lock + programmatic scrolls through Lenis

**Files:**
- Modify: `src/hooks/useScrollLock.js`
- Modify: `src/components/Portfolio.jsx:17-22`
- Modify: `src/components/CaseStudy.jsx:142-149`

- [ ] **Step 1: Extend useScrollLock**

Replace the body of `src/hooks/useScrollLock.js`:

```js
import { useEffect } from 'react'
import { lenis } from '../anim/useLenis.js'

// Verrouille le scroll du <body> tant que `active` est vrai (modale, lightbox,
// menu mobile). Stoppe aussi Lenis, sinon il continuerait de capter la molette.
// Restaure tout à la fermeture/démontage.
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = prev
      lenis?.start()
    }
  }, [active])
}
```

- [ ] **Step 2: Route Portfolio's mount scroll through the helper**

In `src/components/Portfolio.jsx`, add the import:

```js
import { scrollToTarget } from '../anim/useLenis.js'
```

and replace the mount effect body (lines 17-22) with:

```js
  // Arrivée depuis l'étude de cas : on défile vers la section visée
  // (#work via « All work »), sinon on repart du haut. Immédiat : ce
  // repositionnement se joue derrière le rideau de transition.
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    const el = id && document.getElementById(id)
    if (el) requestAnimationFrame(() => scrollToTarget(el, { immediate: true }))
    else scrollToTarget(0, { immediate: true })
  }, [])
```

- [ ] **Step 3: Route CaseStudy's scrolls through the helper**

In `src/components/CaseStudy.jsx`, add the import:

```js
import { scrollToTarget } from '../anim/useLenis.js'
```

and replace `scrollToId` / `toTop` (lines 142-149) with:

```js
  const scrollToId = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) scrollToTarget(el)
  }
  const toTop = (e) => {
    e.preventDefault()
    scrollToTarget(0)
  }
```

- [ ] **Step 4: Verify in browser**

Build + preview. Open a case study (`#/paris-saclay`):
- Summary nav links glide smoothly to sections.
- Open the lightbox (click a gallery image): background scroll is dead (wheel does nothing behind), Escape closes, scroll works again.
- Open the mobile menu (`preview_resize` mobile): body locked; close: unlocked. Resize back to desktop.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollLock.js src/components/Portfolio.jsx src/components/CaseStudy.jsx
git commit -m "feat(anim): scroll lock stops lenis, programmatic scrolls via scrollToTarget"
```

---

### Task 5: Lightbox × Lenis guard

**Files:**
- Modify: `src/components/CaseStudy.jsx:565-577`

- [ ] **Step 1: Add data-lenis-prevent to the lightbox stage**

In the lightbox JSX (`CaseStudy.jsx`, the `zoom &&` block around line 566), add the attribute to the stage div:

```jsx
        <div
          ref={stageRef}
          data-lenis-prevent
          className={`cs-lightbox${zoomed ? ' is-zoomed' : ''}`}
          ...
```

(`data-lenis-prevent` tells Lenis to ignore wheel/touch inside this element, preserving the native pan-zoom scroll.)

- [ ] **Step 2: Verify in browser**

Build + preview → `#/paris-saclay` → open lightbox → click image to zoom → mouse wheel scrolls the zoomed image natively (pan works, page behind does not move).

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseStudy.jsx
git commit -m "fix(anim): lightbox pan-zoom keeps native scroll under lenis"
```

---

### Task 6: GSAP reveals (`src/anim/useReveals.js`) — replaces the IntersectionObserver

**Files:**
- Create: `src/anim/useReveals.js`
- Modify: `src/hooks/useInteractions.js` (drop the IO block)
- Modify: `src/styles/index.css:210-219` (gate legacy reveal CSS)
- Modify: `src/styles/motion.css` (neutralize `.reveal` under has-motion)
- Modify: `src/components/Portfolio.jsx`, `src/components/CaseStudy.jsx` (call the hook)

- [ ] **Step 1: Write the reveals hook**

Create `src/anim/useReveals.js`:

```js
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, dur, stagger, motionEnabled } from './motion.js'

gsap.registerPlugin(ScrollTrigger)

// Reveals GSAP de la page courante. Un appel par page (Portfolio, CaseStudy) ;
// gsap.context() garantit que tout est tué au démontage (StrictMode-safe).
// useLayoutEffect : les états initiaux sont posés avant le premier paint
// pour éviter tout flash de contenu non masqué.
export function useReveals() {
  useLayoutEffect(() => {
    if (!motionEnabled()) return

    const ctx = gsap.context(() => {
      // ---- reveals génériques : fade + montée, une seule fois ----
      gsap.utils.toArray('.reveal, [data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: dur.base,
            ease: ease.out,
            delay: stagger.items * Number(el.dataset.d || 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // ---- lignes tracées : section-heads et skill-rows ----
      // Le trait est un pseudo-élément dont scaleX suit la variable --trace
      // (GSAP ne cible pas les pseudo-éléments, mais anime les variables CSS).
      gsap.utils.toArray('.section-head, .skill-row').forEach((el) => {
        gsap.fromTo(
          el,
          { '--trace': 0 },
          {
            '--trace': 1,
            duration: dur.base,
            ease: ease.out,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
    })

    // Les images chargées tard décalent les positions ScrollTrigger.
    const onImgLoad = (e) => {
      if (e.target.tagName === 'IMG') ScrollTrigger.refresh()
    }
    document.addEventListener('load', onImgLoad, true)

    return () => {
      document.removeEventListener('load', onImgLoad, true)
      ctx.revert()
    }
  }, [])
}
```

- [ ] **Step 2: Remove the IntersectionObserver from useInteractions**

In `src/hooks/useInteractions.js`, delete the whole `/* ---- scroll reveals ---- */` block (lines 7-25) and the `if (io) io.disconnect()` line in the cleanup. Update the header comment to say reveals now live in `src/anim/useReveals.js`. Keep nav shrink and tap-TLDR untouched.

- [ ] **Step 3: Gate the legacy reveal CSS**

In `src/styles/index.css`, scope the legacy `.reveal` rules (lines 210-214) so they only apply when the motion layer is NOT active. Do NOT use a `.has-motion .reveal { transition: none }` override instead — its higher specificity would also kill component transitions like the `.skill-row` hover slide (line 392), and a lingering CSS opacity transition would fight GSAP's tweens. Replace lines 210-214 with:

```css
/* reveal animation — fallback sans couche motion (reduced-motion) ;
   sous .has-motion, GSAP possède opacity/transform via useReveals. */
html:not(.has-motion) .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
html:not(.has-motion) .reveal.in { opacity: 1; transform: none; }
html:not(.has-motion) .reveal[data-d="1"] { transition-delay: 0.08s; }
html:not(.has-motion) .reveal[data-d="2"] { transition-delay: 0.16s; }
html:not(.has-motion) .reveal[data-d="3"] { transition-delay: 0.24s; }
```

Then add to `src/styles/motion.css`:

```css
/* Lignes tracées : le border devient transparent, un pseudo-élément le
   redessine avec un scaleX piloté par la variable --trace (0 → 1). */
.has-motion .section-head {
  border-top-color: transparent;
  position: relative;
}
.has-motion .section-head::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--line);
  transform: scaleX(var(--trace, 0));
  transform-origin: left;
}
.has-motion #about .section-head::before { content: none; } /* pas de border-top sur About */
.has-motion .skill-row {
  border-bottom-color: transparent;
  position: relative;
}
.has-motion .skill-row::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--line);
  transform: scaleX(var(--trace, 0));
  transform-origin: left;
}
```

**Important check:** `prefers-reduced-motion` users never get `has-motion`, so index.css's existing media query (lines 216-219) keeps showing everything instantly — do not touch it. The IO is gone, so the `.in` class is never added anymore; without `has-motion` the base `.reveal { opacity: 0 }` would hide content for reduced-motion users **only if** the media query didn't force visibility — it does (line 218: `opacity: 1`). Verify both lines still exist after the edit.

- [ ] **Step 4: Call useReveals in both pages**

In `src/components/Portfolio.jsx` and `src/components/CaseStudy.jsx`, add:

```js
import { useReveals } from '../anim/useReveals.js'
```

and call `useReveals()` right after the existing hook calls at the top of each component.

- [ ] **Step 5: Verify in browser**

Build + preview, hard reload:
- Home: scrolling down, About/Work/Skills/Contact blocks rise snappily (0.5s, no 0.9s float), section-head lines draw left→right, skill-row bottom borders draw as they enter.
- No console errors; scroll up/down repeatedly — reveals play once, nothing re-hides.
- Emulate reduced motion (`preview_resize` with `colorScheme` doesn't cover this — use `preview_eval`: `matchMedia('(prefers-reduced-motion: reduce)').matches` just to confirm state; for the real check, rely on the media query CSS being intact).

- [ ] **Step 6: Commit**

```bash
git add src/anim/useReveals.js src/hooks/useInteractions.js src/styles/index.css src/styles/motion.css src/components/Portfolio.jsx src/components/CaseStudy.jsx
git commit -m "feat(anim): gsap scroll reveals + traced lines replace the IntersectionObserver"
```

---

### Task 7: Hero entrance (masked title lines)

**Files:**
- Modify: `src/components/Hero.jsx:14-18`
- Modify: `src/styles/motion.css`
- Modify: `src/anim/useReveals.js`

- [ ] **Step 1: Wrap the h1 lines in mask spans**

In `src/components/Hero.jsx`, replace the `<h1>` block (lines 14-18) with:

```jsx
          <h1>
            <span className="mline"><span className="mline__in">
              Product&nbsp;design <span className="serif-it accent">built</span>
            </span></span>
            <span className="mline"><span className="mline__in">
              to ship &amp; scale <span className="accent">B2B</span>
            </span></span>
          </h1>
```

(The `<br />` disappears — `.mline` is `display: block`, same rendering.)

- [ ] **Step 2: Add the mask CSS**

Add to `src/styles/motion.css`:

```css
/* Lignes de titre masquées (hero) : le wrapper coupe, l'intérieur monte. */
.mline { display: block; overflow: hidden; }
.mline__in { display: block; }
```

(Unscoped on purpose: block-in-block renders identically without motion.)

- [ ] **Step 3: Add the hero + nav intro timeline**

In `src/anim/useReveals.js`, inside the `gsap.context(() => { … })`, append after the traced-lines block:

```js
      // ---- entrée du hero + descente de la nav (page d'accueil) ----
      if (document.querySelector('.hero')) {
        gsap
          .timeline({ defaults: { ease: ease.out } })
          .from('.hero .mline__in', { yPercent: 110, duration: 0.6, stagger: stagger.lines }, 0.05)
          .from('#nav', { yPercent: -100, duration: dur.base }, 0.15)
          .from('.hero__idx', { opacity: 0, y: 12, duration: dur.fast }, 0.2)
          .from('.hero__sub, .hero__lead .btn', { opacity: 0, y: 18, duration: dur.base, stagger: stagger.lines }, 0.35)
          .from('.hero__foot .chip', { opacity: 0, y: 10, duration: dur.fast, stagger: 0.03 }, 0.5)
          .from('.hero__foot > .mono', { opacity: 0, duration: dur.fast }, 0.7)
      }
```

- [ ] **Step 4: Verify in browser**

Build + preview, hard reload on home:
- Title lines rise under their masks (staggered, sharp), nav drops in, chips pop in sequence, "Scroll ↓" last. Total under ~1s.
- `preview_screenshot` mid-animation is impractical — take one after settle and confirm layout is pixel-identical to before (two block lines, no wrapping change).
- Navigate to a case study and back: intro replays cleanly, no console errors (StrictMode check).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/styles/motion.css src/anim/useReveals.js
git commit -m "feat(anim): hero masked-line entrance with nav drop-in"
```

---

### Task 8: Marquee velocity modulation

**Files:**
- Modify: `src/anim/useReveals.js`

- [ ] **Step 1: Modulate the CSS marquee via WAAPI playbackRate**

In `src/anim/useReveals.js`, import the lenis instance at the top:

```js
import { lenis } from './useLenis.js'
```

Inside the effect, after the `gsap.context` call but **before** the `return`, add:

```js
    // ---- marquee réactif : sa vitesse suit la vélocité du scroll ----
    // L'animation reste en CSS ; on module son playbackRate via WAAPI.
    // Différé d'une frame : useReveals (layout effect enfant) s'exécute
    // AVANT le useEffect de useLenis dans App — `lenis` n'existe pas encore
    // au moment où ce code tourne. Une frame plus tard, il est là.
    let marqueeCleanup
    const marqueeRaf = requestAnimationFrame(() => {
      const track = document.querySelector('.marquee__track')
      const anim = track?.getAnimations?.()[0]
      if (!lenis || !anim) return
      const onScroll = ({ velocity }) => {
        const rate = gsap.utils.clamp(1, 3, 1 + Math.abs(velocity) * 0.05)
        gsap.to(anim, { playbackRate: rate, duration: 0.2, overwrite: true })
      }
      lenis.on('scroll', onScroll)
      marqueeCleanup = () => {
        lenis?.off('scroll', onScroll)
        anim.playbackRate = 1
      }
    })
```

and extend the cleanup return to call it:

```js
    return () => {
      cancelAnimationFrame(marqueeRaf)
      marqueeCleanup?.()
      document.removeEventListener('load', onImgLoad, true)
      ctx.revert()
    }
```

- [ ] **Step 2: Verify in browser**

Build + preview: scroll fast on home — the marquee visibly speeds up, then eases back to normal when scrolling stops. No errors on case study pages (no marquee there — guard handles it).

- [ ] **Step 3: Commit**

```bash
git add src/anim/useReveals.js
git commit -m "feat(anim): marquee speed reacts to scroll velocity"
```

---

### Task 9: Curtain page transition

**Files:**
- Create: `src/anim/usePageTransition.js`
- Modify: `src/App.jsx` (full rewrite below)
- Modify: `src/components/CaseStudy.jsx` (own its scroll reset)
- Modify: `src/styles/motion.css` (curtain styles)

- [ ] **Step 1: Write the transition hook**

Create `src/anim/usePageTransition.js`:

```js
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { caseStudies } from '../data/content.js'
import { ease, dur, motionEnabled } from './motion.js'

const labelFor = (route) => (route === 'home' ? 'Home' : caseStudies[route]?.name ?? route)

// Rideau home ↔ case study. La route affichée (displayedRoute) est découplée
// du hash : le swap de composant attend que le rideau couvre l'écran, puis le
// rideau se lève sur la nouvelle page. Fonctionne pour toute origine de
// navigation (clic, bouton retour) puisqu'on observe la route, pas les liens.
export function usePageTransition(route) {
  const [displayedRoute, setDisplayedRoute] = useState(route)
  const curtainRef = useRef(null)

  useEffect(() => {
    if (route === displayedRoute) return
    const curtain = curtainRef.current
    if (!motionEnabled() || !curtain) {
      setDisplayedRoute(route)
      return
    }
    curtain.querySelector('.curtain__label').textContent = labelFor(route)
    const tl = gsap
      .timeline()
      .set(curtain, { display: 'flex' })
      .fromTo(
        curtain,
        { yPercent: 100 },
        { yPercent: 0, duration: dur.page, ease: ease.inOut },
      )
      .add(() => setDisplayedRoute(route))
      // petite tenue le temps que React monte la page derrière le rideau
      .to(curtain, { yPercent: -100, duration: dur.page, ease: ease.inOut, delay: 0.15 })
      .set(curtain, { display: 'none' })
    return () => tl.kill()
  }, [route, displayedRoute])

  return { displayedRoute, curtainRef }
}
```

- [ ] **Step 2: Rewrite App around displayedRoute**

Replace `src/App.jsx` entirely:

```jsx
import { useRoute } from './hooks/useRoute.js'
import { caseStudies } from './data/content.js'
import Portfolio from './components/Portfolio.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { useLenis } from './anim/useLenis.js'
import { usePageTransition } from './anim/usePageTransition.js'

export default function App() {
  useLenis()
  const route = useRoute()
  // Le swap visuel est orchestré par le rideau : on affiche displayedRoute,
  // qui suit `route` avec le temps de la transition.
  const { displayedRoute, curtainRef } = usePageTransition(route)
  const study = displayedRoute !== 'home' ? caseStudies[displayedRoute] : null

  return (
    <>
      {study ? <CaseStudy data={study} /> : <Portfolio />}
      <div className="curtain" ref={curtainRef} aria-hidden="true">
        <span className="curtain__label"></span>
      </div>
    </>
  )
}
```

(The old `window.scrollTo(0, 0)` effect moves into CaseStudy — next step. Portfolio already resets its own scroll on mount since Task 4.)

- [ ] **Step 3: CaseStudy owns its scroll reset**

In `src/components/CaseStudy.jsx`, add a mount effect next to the existing `document.title` effect (`scrollToTarget` is already imported since Task 4):

```js
  // On repart du haut à l'arrivée — immédiat, le rideau couvre l'écran.
  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [])
```

- [ ] **Step 4: Curtain styles**

Add to `src/styles/motion.css`:

```css
/* Rideau de transition — au-dessus du menu mobile (8500), sous le grain (9000)
   pour garder la texture, et sous la lightbox (9999, jamais ouverte pendant
   une navigation). Hors flux tant qu'aucune transition ne joue. */
.curtain {
  position: fixed;
  inset: 0;
  z-index: 8800;
  display: none;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border-top: 1px solid var(--accent);
  transform: translateY(100%);
}
.curtain__label {
  font-family: var(--mono);
  font-size: var(--text-12);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}
```

- [ ] **Step 5: Verify in browser**

Build + preview:
- Home → click the Paris-Saclay card: curtain rises with "Redesign of the University app Paris-Saclay"-style label (whatever `caseStudies['paris-saclay'].name` is), page swaps behind, curtain lifts onto the case study at scroll 0.
- Case study → "All work": curtain says "Home", lands on the #work section.
- Browser back button (`preview_eval`: `history.back()`): curtain plays too.
- Spam-click between pages during a transition: no stuck curtain (timeline killed and effect re-runs — the latest route wins).
- Reduced-motion (temporarily force `motionEnabled` to return false via `preview_eval` is not possible — instead trust the guard and re-read the code path: instant swap, no curtain).

- [ ] **Step 6: Commit**

```bash
git add src/anim/usePageTransition.js src/App.jsx src/components/CaseStudy.jsx src/styles/motion.css
git commit -m "feat(anim): curtain page transition driven by displayed route"
```

---

### Task 10: Custom cursor

**Files:**
- Create: `src/anim/Cursor.jsx`
- Modify: `src/App.jsx` (mount it)
- Modify: `src/styles/motion.css`

- [ ] **Step 1: Write the cursor component**

Create `src/anim/Cursor.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motionEnabled, finePointer } from './motion.js'

// Curseur compagnon (desktop pointeur fin uniquement). Le curseur natif reste
// visible — celui-ci suit avec un léger retard, grossit sur les liens et
// affiche « View » sur les cartes projet.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!motionEnabled() || !finePointer()) return
    const dot = ref.current
    dot.style.display = 'flex'
    gsap.set(dot, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e) => {
      dot.classList.toggle('is-view', !!e.target.closest('a.card'))
      dot.classList.toggle('is-link', !!e.target.closest('a, button'))
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      dot.style.display = 'none'
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  )
}
```

- [ ] **Step 2: Mount it in App**

In `src/App.jsx`, import and render it after the curtain div:

```jsx
import Cursor from './anim/Cursor.jsx'
...
      <Cursor />
```

- [ ] **Step 3: Cursor styles**

Add to `src/styles/motion.css`:

```css
/* Curseur compagnon — jamais affiché sans JS ni sur tactile. */
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9500;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  display: none;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: width 0.3s var(--ease), height 0.3s var(--ease), opacity 0.3s var(--ease);
}
.cursor__label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bg);
  opacity: 0;
  transition: opacity 0.2s var(--ease);
}
.cursor.is-link { width: 26px; height: 26px; opacity: 0.65; }
.cursor.is-view { width: 64px; height: 64px; opacity: 1; }
.cursor.is-view .cursor__label { opacity: 1; }
```

- [ ] **Step 4: Verify in browser**

Build + preview:
- Dot follows the mouse with a short lag; grows on nav links/buttons; becomes a "View" badge over project cards; back to dot elsewhere.
- `preview_resize` to mobile: component renders nothing visible (display none — effect returns early on touch since `finePointer()` is false... note: preview emulation may still report a fine pointer; the real gate is the media query. Confirm no crash, that's enough).

- [ ] **Step 5: Commit**

```bash
git add src/anim/Cursor.jsx src/App.jsx src/styles/motion.css
git commit -m "feat(anim): companion cursor with view state on project cards"
```

---

### Task 11: Case study reveals + entrance

**Files:**
- Modify: `src/components/CaseStudy.jsx` (data-reveal attributes + entrance targets)
- Modify: `src/anim/useReveals.js` (case-study entrance + image reveals)

- [ ] **Step 1: Tag the case-study blocks**

In `src/components/CaseStudy.jsx`, add `data-reveal=""` to these existing elements (attribute only, no other change):
- every `<div className="cs-lede">` (context ~line 233, research ~line 269, and any other occurrences — search `className="cs-lede"`)
- the `<div className="cs-quote">` (~line 255)
- every `<div className="step-eyebrow">` (search `className="step-eyebrow"`)

(The `.cs-stats .stat` elements already carry `.reveal` — nothing to do. Section heads and traced lines are handled generically by Task 6.)

- [ ] **Step 2: Add the case-study entrance + image reveals**

In `src/anim/useReveals.js`, inside the `gsap.context()`, append after the hero block:

```js
      // ---- entrée d'une case study (jouée à la levée du rideau) ----
      if (document.querySelector('.cs-title')) {
        gsap
          .timeline({ defaults: { ease: ease.out } })
          .from('.cs-title__kicker', { opacity: 0, y: 14, duration: dur.fast }, 0.1)
          .from('.cs-title h1', { opacity: 0, y: 30, duration: 0.6 }, 0.18)
          .from('.cs-meta > div', { opacity: 0, y: 14, duration: dur.fast, stagger: stagger.items }, 0.3)
          .from('.cs-page .nav', { opacity: 0, duration: dur.fast }, 0.1)
      }

      // ---- images de contenu : fade + léger dézoom à l'entrée ----
      gsap.utils.toArray('.cs-page main img').forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1,
            scale: 1,
            duration: dur.base,
            ease: ease.out,
            scrollTrigger: { trigger: img, start: 'top 92%', once: true },
          },
        )
      })
```

- [ ] **Step 3: Verify in browser**

Build + preview → each of the 5 case studies (`#/paris-saclay`, and the other four slugs — list them via `preview_eval`: `Object.keys((await import('/src/data/content.js')).caseStudies)`):
- Entrance: kicker → title → meta cascade after the curtain lifts.
- Scrolling: ledes/quotes/eyebrows rise, images fade in with a subtle settle, stats stagger.
- Lightbox still opens/closes fine; gallery thumbnails animate once only.
- No console errors on any of the 5.

- [ ] **Step 4: Commit**

```bash
git add src/components/CaseStudy.jsx src/anim/useReveals.js
git commit -m "feat(anim): case study entrance, content reveals and image settles"
```

---

### Task 12: Lightbox open animation + snappy hover timings

**Files:**
- Modify: `src/styles/case-study.css:558` (lightbox)
- Modify: `src/styles/motion.css` (hover timing overrides)

- [ ] **Step 1: Animate the lightbox open**

In `src/styles/case-study.css`, inside the `.cs-lightbox { … }` rule (line 558), add:

```css
  animation: cs-lb-in 0.3s var(--ease);
```

and after the rule add:

```css
@keyframes cs-lb-in {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cs-lightbox { animation: none; }
}
```

- [ ] **Step 2: Align hover timings with the snappy personality**

Add to `src/styles/motion.css`:

```css
/* Hovers existants recalés sur la personnalité « précis & snappy » :
   mêmes effets, tempo resserré. */
.has-motion .btn,
.has-motion .btn .arrow { transition-duration: 0.3s; }
.has-motion .card__media .ph { transition-duration: 0.45s; }
.has-motion .card__tldr { transition-duration: 0.35s; }
.has-motion .skill-row { transition-duration: 0.3s; }
```

- [ ] **Step 3: Verify in browser**

Build + preview:
- Lightbox opens with a short fade-settle; instant under reduced motion.
- Card hover (media zoom + TLDR slide) feels faster; buttons likewise. Layout unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/styles/case-study.css src/styles/motion.css
git commit -m "feat(anim): lightbox open animation, hover timings aligned to snappy"
```

---

### Task 13: Full verification pass

**Files:** none (verification only — fix regressions found, committing fixes individually)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: `✓ built`, then `npm run preview` serves it — or keep using the dev preview for the checks below.

- [ ] **Step 2: Desktop walkthrough**

Preview at desktop size, hard reload. Verify, in order:
1. Hero entrance plays once, sharp; nav drops in; "Scroll ↓" last.
2. Wheel scroll is smoothed; marquee accelerates with scroll velocity.
3. All home sections reveal snappily; traced lines on section heads and skill rows.
4. Cursor: lag-follow, grows on links, "View" on cards.
5. Card → curtain (project name) → case study at top; entrance cascade.
6. Case study scroll: reveals + image settles; summary anchors glide.
7. Lightbox: open animation, native pan-zoom, wheel isolated, Escape closes, scroll restored.
8. "All work" → curtain "Home" → lands on #work.
9. Browser back/forward: curtains play; no stuck overlay after spam-clicking.
10. Contact modal + mobile burger: scroll locked/unlocked correctly.
11. Footer "Back to top" glides to top.
12. `?ds` page: renders exactly as before (no motion layer).
13. Console: zero errors across all of the above.

- [ ] **Step 3: Mobile walkthrough**

`preview_resize` to mobile:
- Native (non-Lenis) touch scroll; reveals still play (simple fade+rise); no cursor; burger menu + tap-TLDR work; case study + lightbox usable.

- [ ] **Step 4: Reduced-motion audit (code-level)**

Grep the anim module: every entry point (`useLenis`, `useReveals`, `usePageTransition`, `Cursor`) must gate on `motionEnabled()` (or `lenisEnabled`/`finePointer`). Confirm `index.css` lines 216-219 (reduced-motion media query) are intact so content is visible with zero JS-driven motion.

- [ ] **Step 5: Screenshot proof**

`preview_screenshot` of: home after hero settle, home mid-scroll (sections revealed), a case study after entrance. Share with Louis.

- [ ] **Step 6: Final commit (if fixes were made) — do NOT merge**

Branch stays `feat/motion-layer`. Merging to `main` requires Louis's explicit green light after he has seen the live result.
