

# Service Gateway -- A New Landing Page at `/`

## Concept

A cinematic, ultra-minimal single-page gateway that presents three service offerings as bento cards. The current wedding site becomes nested under `/weddings/*`, while the root `/` becomes this new portal. Teaching and Events cards will link to placeholder routes for now (expandable later into full sub-sites).

The design follows the same death-to-life aesthetic: dark void background, staggered fade-in reveals, golden accents, Cormorant serif typography, and the vigil flame as a shared brand anchor.

---

## Page Layout

```text
+--------------------------------------------------+
|  PARKER GAWRYLETZ (wordmark, centered)           |
|  "Sound Director" (subtitle)                      |
+--------------------------------------------------+
|                                                    |
|  Three Bento Cards (2:3 aspect ratio, hover lift) |
|                                                    |
|  +------------+  +------------+  +------------+  |
|  |            |  |            |  |            |  |
|  |  WEDDINGS  |  |  TEACHING  |  |   EVENTS   |  |
|  |            |  |            |  |            |  |
|  |  AI image  |  |  AI image  |  |  AI image  |  |
|  |  bg layer  |  |  bg layer  |  |  bg layer  |  |
|  |            |  |            |  |            |  |
|  |  "Sacred   |  | "Private   |  | "Live      |  |
|  |   ceremony |  |  lessons   |  |  music for |  |
|  |   audio"   |  |  & studio  |  |  your      |  |
|  |            |  |  sessions" |  |  occasion" |  |
|  |  [Enter]   |  |  [Coming   |  |  [Coming   |  |
|  |            |  |   Soon]    |  |   Soon]    |  |
|  +------------+  +------------+  +------------+  |
|                                                    |
|  'Til Death; Unto Life. (footer tagline)          |
+--------------------------------------------------+
```

---

## Design Specifications

**Background:** Pure black void (`--rich-black`) with subtle film grain at 10% opacity. No hero image -- the cards ARE the visual content.

**Wordmark:** "Parker Gawryletz" in Cormorant Garamond, 28px, centered, fade-in at 400ms. Below it: "Sound Director" in Inter 11px uppercase tracking-[0.22em], muted-foreground, fade-in at 600ms.

**Bento Cards (3 across on desktop, stacked on mobile):**
- Aspect ratio approximately 3:4 (portrait)
- Each card has an AI-generated background image at 30% opacity with a dark gradient overlay
- Card border: 1px `border/20` with hover transition to `vow-yellow/25`
- Hover: `-translate-y-2`, increased image opacity to 40%, subtle golden glow shadow
- Service name in Cormorant 28px, light weight
- One-line description in Inter 14px, muted-foreground
- CTA: "Enter" for Weddings (links to current homepage at `/weddings`), "Coming Soon" for Teaching and Events (muted, non-interactive)
- Staggered reveal: cards fade in at 800ms, 1000ms, 1200ms

**Footer tagline:** "'Til Death; Unto Life." centered at bottom, Cormorant 16px, semicolon in vow-yellow, fade-in at 1400ms.

**No navigation bar, no menu, no scroll.** This page is a single viewport -- `h-screen` with flexbox centering.

---

## Routing Changes

The current wedding homepage at `/` moves to `/weddings`. All wedding sub-pages (`/services`, `/about`, `/gallery`, `/listen`, `/faq`, `/contact`) stay at their current paths but will eventually move under `/weddings/*` when the other services launch. For now, only the root `/` changes.

| Route | Before | After |
|-------|--------|-------|
| `/` | Wedding homepage | Service Gateway |
| `/weddings` | (none) | Wedding homepage (current Index) |
| `/teaching` | (none) | Placeholder redirect or "Coming Soon" |
| `/events` | (none) | Placeholder redirect or "Coming Soon" |
| All others | Unchanged | Unchanged |

---

## AI-Generated Images (3)

1. **`src/assets/gateway-weddings.jpg`** -- Intimate ceremony scene, piano keys in foreground with blurred wedding arch and warm golden light behind, dark moody tones, cinematic
2. **`src/assets/gateway-teaching.jpg`** -- Close-up of hands on piano keys in a warmly lit studio, sheet music visible, intimate teaching moment, soft bokeh, dark atmospheric
3. **`src/assets/gateway-events.jpg`** -- Grand piano on stage at an elegant event venue, dramatic spotlight, empty audience seats, architectural interior, dark cinematic tones

---

## Files Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/assets/gateway-weddings.jpg` | Create (AI) | Bento card background |
| `src/assets/gateway-teaching.jpg` | Create (AI) | Bento card background |
| `src/assets/gateway-events.jpg` | Create (AI) | Bento card background |
| `src/pages/Gateway.tsx` | Create | New service gateway page |
| `src/App.tsx` | Edit | Add `/weddings` route for current Index, change `/` to Gateway |

## What Stays Unchanged

- The entire wedding site (all pages, components, styling, animations)
- All existing routes except `/` which now points to Gateway
- Navigation, footer, theme system
- All pricing, process, and content

---

## Technical Details for Gateway.tsx

- Single-file component, no external dependencies beyond React, react-router-dom Link, and cn utility
- Uses existing design tokens: `--rich-black`, `--vow-yellow`, `--mist-grey`, font-display, font-sans
- Film grain overlay reuses existing `.grain` CSS class from index.css
- Hover animations use Tailwind `transition-all duration-300` with `group-hover` pattern
- Reduced motion: all animations wrapped in `prefers-reduced-motion` check, falling back to immediate visibility
- Cards use `<Link>` for Weddings (to `/weddings`), plain `<div>` for Coming Soon items
- Viewport-locked: `h-screen` with `overflow-hidden` to prevent scroll on this page

