

# Plan: Bespoke Footer Visual Overhaul & Arrival System

## Summary

The footer already has solid bones — atmospheric layers, recessional stagger, covenant bookend, spotlight social icons. The nav bar was already upgraded with the arch aesthetic. Now I will elevate the footer to match, creating the unified "ceremony completion" when header and footer frame each other during arrival.

## Changes Across 3 Files

### 1. `src/components/Footer.tsx` — Full Visual Overhaul

**Atmospheric depth upgrade:**
- Add a second warm fog source from bottom-center (`hsl(var(--vow-yellow) / 0.02)`) creating dual-origin warmth
- Add a breathing vignette layer that pulses subtly during arrival
- Grain opacity shifts from 6% → 8% during arrival (already partially done, refine values)

**Golden thread enhancements:**
- Top golden thread: widen from 48px (`w-12`) to 80px (`w-20`), add `footer-breathe` animation synced with header's vine thread during arrival
- Full-width separator thread: add subtle box-shadow glow that intensifies during arrival
- Mini covenant thread: intensify to match

**Golden dot upgrade — Three Tempos polyrhythm:**
- Replace static dot with a `golden-dot-breathe` animation (3s cycle) — a new tempo alongside the 2s semicolon heartbeat and 8s footer-breathe
- Dot size increases from 1.5 to 2px (`w-2 h-2`), with intensified triple-glow during arrival

**Nav link "key depression" hover (matching header):**
- Footer nav links get `hover:translate-y-[1px]` and `active:translate-y-[2px]`
- Add spotlight dimming on the nav list (group hover — non-hovered links dim to 40%)

**CTA enhancement:**
- Radial glow pool behind "Hold my date" intensifies during arrival
- Add breathing glow animation to CTA area during arrival state

**Covenant bookend arrival awareness:**
- When `isArrival` is true: golden threads brighten, dot glow intensifies, warm fog increases, the entire bookend area gets a subtle warm pulse
- The bookend text center-aligns with the header's centered logo — they frame each other

**Typography refinement:**
- Parker's name: ensure `tracking-[0.04em]` and `font-light` (300)
- Column labels: verify `tracking-[0.22em]` uppercase at `text-xs`

### 2. `src/index.css` — New Keyframes

Add:
```css
@keyframes golden-dot-breathe {
  0%, 100% { box-shadow: 0 0 6px hsl(var(--vow-yellow) / 0.5), 0 0 14px hsl(var(--vow-yellow) / 0.25), 0 0 24px hsl(var(--vow-yellow) / 0.1); }
  50% { box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.6), 0 0 18px hsl(var(--vow-yellow) / 0.35), 0 0 32px hsl(var(--vow-yellow) / 0.15); }
}
.golden-dot-breathe {
  animation: golden-dot-breathe 3s ease-in-out infinite;
}
```

Add reduced motion fallback for the new animation.

### 3. `src/components/MobileStickyBar.tsx` — Minor

Already fades out when `[data-footer-bookend]` is visible. No changes needed — already handles arrival coordination.

## What Does NOT Change

- `MinimalHeader.tsx` — already has the arch aesthetic, arrival easter egg, vine thread
- `FullScreenMenu.tsx` — already enhanced
- No other components, pages, or layouts
- The arrival IntersectionObserver logic stays identical
- All existing stagger timings preserved (0ms → 150ms → 300ms → 400ms → 500ms → 650ms)

