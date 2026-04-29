# Base Power · Funnel Experiments Demo

Candidate prototype for a Growth Product interview at Base Power Company. A Next.js app that mimics Base's homepage and lets you walk through five candidate onboarding flows side-by-side, with a live feature-flag panel for toggling individual experiments.

> Pair this with [`CONTEXT.md`](./CONTEXT.md) — the full strategy doc behind the case.

---

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Generate the slide deck (`.pptx`):

```bash
npm run deck
# → writes dist/base-deck.pptx
```

Then drag `dist/base-deck.pptx` to [drive.google.com](https://drive.google.com) and right-click → **Open with → Google Slides**. Speaker notes import automatically. Source content lives in [`SLIDES.md`](./SLIDES.md); the build script is [`scripts/build-deck.mjs`](./scripts/build-deck.mjs).

---

## Deploy to Vercel

The repo is Vercel-ready out of the box (Next.js App Router, no special config needed).

**Option 1 — push to GitHub, import to Vercel** *(recommended)*

```bash
git init
git add .
git commit -m "Initial Base funnel demo"
git remote add origin git@github.com:<you>/base-funnel-demo.git
git push -u origin main
```

Then go to [vercel.com/new](https://vercel.com/new), import the repo, hit deploy. No env vars needed.

**Option 2 — Vercel CLI**

```bash
npm i -g vercel
vercel        # follow prompts (preview)
vercel --prod # promote to prod
```

---

## What's in here

```
app/
  page.tsx              ← homepage (Base-styled hero + pricing + stories)
  onboarding/page.tsx   ← funnel — phone mockup + path info card
  layout.tsx            ← wraps everything in <FlagsProvider> and renders <FlagsPanel>
  globals.css           ← Tailwind + Base color tokens

components/
  flags/
    FlagsProvider.tsx   ← React context · URL sync · localStorage persistence
    FlagsPanel.tsx      ← floating bottom-right panel (paths + granular flags + about)
  funnel/
    Phone.tsx           ← phone frame, renders the active path's current step
    paths.tsx           ← all 5 path screens (0 / A / B / C / D) as React components
    shared.tsx          ← screen scaffolding (header, footer, fields, blocks)
  home/                 ← Nav, Hero, Press, Pricing, HowItWorks, Stories, Footer

lib/
  flags.ts              ← Path metadata + Flags type + per-path flag presets
```

---

## How the feature flag system works

Two layers, both visible in the **Experiments** panel (bottom-right of any page):

### 1. Path selection (5 mutually-exclusive variants)

| Path | Title | Hypothesis |
|------|-------|------------|
| **0** | Today's flow | Baseline — what we're trying to fix |
| **A** | Email-First | Capture email upfront for recoverability; defer phone to scheduling |
| **B** | Radically Short | Skip qualification; capture lead, qualify on the call |
| **C** | Smart Defaults | Auto-fill from address; combine soft questions |
| **D** | Trust-Building | Same fields, hand-holding (progress bar, social proof, "what's next") |

Picking a path applies that path's flag preset and resets to step 1.

### 2. Granular flags (override what each path enables)

Toggle individual changes to isolate effects — e.g. "did the progress bar do this, or the email reorder?" Flags include:

- **Visual / trust:** `progressBar`, `timeRemaining`, `socialProof`, `whatNextHint`, `tcpaCollapsed`
- **Structure:** `emailUpfront`, `phoneDeferred`, `combineSoftQuestions`, `smartDefaults`, `educationalInterstitials`, `videoStep`, `pricingPreview`
- **Copy:** `trustFraming`

Hit **reset to {path}** to snap flags back to the current path's preset.

### Persistence + sharing

- Flag state is persisted to `localStorage` so refreshes don't lose your spot.
- The current path is mirrored into the URL as `?path=A`, so you can paste a link to a specific variant in Slack / email and it'll open at that variant. Try `/onboarding?path=B`.

### Production swap-out

In production this same `Flags` shape would be served by your real flag service (Statsig, LaunchDarkly, GrowthBook, Vercel Edge Config, etc.). Replace the body of `FlagsProvider` with a fetch call — the rest of the app reads from `useFlags()` and doesn't care.

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev at `localhost:3000` |
| `npm run build` | Production build (static-rendered where possible) |
| `npm start` | Serve the production build |
| `npm run lint` | Next.js lint |

---

## Stack

- Next.js 15 (App Router) on React 19
- TypeScript (strict)
- Tailwind CSS 3 with Base color tokens (`base-green`, `base-ink`, `base-cream`)
- Zero external runtime deps beyond `next` / `react` / `react-dom`

---

## What's *not* in here (intentionally)

- **No real auth, address-validation, or backend.** This is a clickable prototype for a 30-min working session, not a shippable funnel.
- **No real flag service.** A localStorage + URL-param shim. See *Production swap-out* above.
- **The original single-file demo (`base-funnel-demo.html`)** is preserved at the repo root for posterity — open it in any browser without any build step. The Next.js app supersedes it.

---

## Anatomy of an experiment

If you wanted to add **Path E** ("delete the homepage entirely, address-only landing"):

1. Add `"E"` to `PathId` and `PATHS` in [`lib/flags.ts`](./lib/flags.ts).
2. Add a `PATH_FLAGS["E"]` preset for what should be on by default.
3. Add a `PathE` object with screen components in [`components/funnel/paths.tsx`](./components/funnel/paths.tsx) and register it in `ALL_PATHS["E"]`.
4. The Experiments panel picks it up automatically.

---

## Credits

Built during interview prep for Base Power. Visual style approximates [basepowercompany.com](https://basepowercompany.com); brand assets and copy belong to Base.
