# Mobile Pass 2 — Editorial Polish on 3D Pages

**Scope:** Mobile only (≤640px) on `/` (Weddings), `/teaching`, `/events`. The scroll-scrubbed cinematic video, timing config, and 3D layer are not touched. Desktop is not touched.

## Goals (from your selections)

1. Overlay text reads as editorial type on video — not as cards
2. Inline mid-story CTAs feel anchored, not floating mid-frame
3. Side-dot navigation + audio pill stop competing with the cinematic frame
4. Closing "I do." / final CTA scene mirrors the pre-scroll intro structure
5. Act-to-act transitions get breathing room

---

## 1. Strip card chrome from overlays (mobile only)

`.luxury-card` currently paints a dark radial gradient backdrop, a top gold hairline, and 32×40px padding — that's the "card" feel. On ≤640px, override to pure typography on video:

```css
@media (max-width: 640px) {
  .luxury-card {
    background: none !important;
    padding: 0 24px !important;
    border-radius: 0 !important;
    /* keep the layered text-shadow — it does the legibility work */
  }
  .luxury-card::before { display: none !important; } /* kill top gold hairline */
  .luxury-card--glass {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: none !important;
    border: none !important;
    border-image: none !important;
    box-shadow: none !important;
    padding: 0 24px !important;
  }
  .luxury-card--glass::before { display: none !important; }
  .luxury-divider { display: none !important; } /* ornamental dividers go away */
}
```

Result: text floats on the video with only text-shadow for legibility — Fly4Me-grade editorial, not SaaS cards.

## 2. Anchor inline mid-story CTAs to bottom

Three CTAs across each vertical (`act-invitation`, `act-services`, `act-crossing`) currently center mid-frame via `posClasses`. On mobile, mount them to the bottom safe-area with an eyebrow label above.

Approach: extend the existing `@media (max-width: 640px)` override on `.cn-inline-cta` to:
- Position the CTA's parent overlay at `align-self: end` + `padding-bottom: max(32px, env(safe-area-inset-bottom) + 24px)` via a wrapping `.cn-cta-anchor` class added in the three Cinematic scroll components
- Render a sibling eyebrow (`<span className="cn-cta-eyebrow">NEXT STEP</span>`) above each inline CTA at 10px / 0.32em tracking / 70% opacity
- Keep the pill style from pass 1 (warm-white, 1px gold hairline, 48px / 56px heights)

Files touched: `VideoAct.tsx` (add eyebrow + anchor wrapper when `isCta` and mobile), CSS only — no config changes.

## 3. Hide side-dot nav, reposition audio pill on mobile

The right-side section dots (`CinematicNav`, `TeachingCinematicNav`, `EventsCinematicNav`) and the bottom-left "Hear me play" `AudioPlayer` both crowd the frame at ≤640px.

- **Side dots**: hide the `<aside>` containing dot list + labels on mobile via a `.cn-side-dots` class + `@media (max-width: 640px) { display: none; }`. Top wordmark + hamburger stay; sticky CTA stays.
- **Audio pill**: shrink to icon-only 40×40 circle on mobile, move from `bottom-4 left-4` to `bottom-4 right-4` so it sits opposite the hamburger and clear of the new bottom-anchored CTAs. When `MobileStickyBar` is visible (scroll > 220px), fade the audio pill to opacity 0 / pointer-events none so the sticky bar owns the bottom.

## 4. Mirror pre-scroll structure on the final scene

The closing acts (Weddings `act-crossing`, Teaching/Events equivalents) end with a single big CTA. Pre-scroll intro has: eyebrow → tagline → primary pill → secondary link. Mirror it.

In `VideoAct.tsx`, when the act contains a `cn-inline-cta--large` (final CTA marker), render:
```
EYEBROW (per vertical, same as intro)
Closing tagline (existing "I do." / equivalent line)
[ Primary CTA pill — existing href ]
Secondary text link → "or call (587) 998-7474"
```
Mobile-only — desktop final scene unchanged.

## 5. Soften act-to-act rhythm

Three small moves:
- Add a 16vh bottom spacer inside each act overlay on mobile so text exits before the next enters (CSS-only, no JS scrub change)
- Replace the hard ornamental `isDivider` rule with a 1px hairline at 40% width, 0.25 opacity — keeps the structural beat without the decorative diamond
- Stagger the per-line fade-in delay on `.luxury-card > span` from 60ms → 90ms on mobile only

---

## Technical details

**Files to edit:**
- `src/index.css` — new mobile overrides (sections 1, 2, 3, 5)
- `src/components/VideoAct.tsx` — add `.cn-cta-anchor` wrapper + eyebrow when `isCta`, mirror structure on final CTA
- `src/components/CinematicNav.tsx`, `TeachingCinematicNav.tsx`, `EventsCinematicNav.tsx` — add `.cn-side-dots` class to right-side aside
- `src/components/AudioPlayer.tsx` — mobile icon-only variant + fade-out when sticky bar is up
- `src/components/MobileStickyBar.tsx` — dispatch a `data-sticky-visible` attribute on `<body>` so AudioPlayer can react

**Explicitly NOT touched:** `useVideoScrub`, `videoActsConfig.ts` / `videoActsConfigTeaching.ts` / `videoActsConfigEvents.ts` (no text, timing, or position changes), canvas/3D, desktop styles, page-level layout.

**Verification:** screenshot at 390×844 on `/`, `/teaching`, `/events` at scroll 0%, 25%, 50%, 80%, 100% — confirm no card backgrounds, CTAs sit at bottom, side dots gone, audio pill behaves, final scene mirrors intro.
