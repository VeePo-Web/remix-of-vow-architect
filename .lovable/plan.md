

# Gateway Mobile Fix -- Audio Pill and Footer Tagline Collision

## Finding

At 375px viewport width, the ambient audio pill (fixed at `bottom-4 left-4`, approximately 160px wide and 40px tall) overlaps the footer tagline "'Til Death; Unto Life." which is centered at the bottom of the page. The left half of the tagline disappears behind the pill. This breaks the compositional balance of the page's closing moment -- the brand covenant becomes unreadable.

## The Fix

Reposition the audio pill on mobile to sit **above** the footer tagline rather than competing with it. On screens below `md` breakpoint, the pill moves from `bottom-4` to `bottom-16` (64px from bottom), clearing the tagline which sits at roughly `mt-6` (24px) above the viewport bottom. On desktop (`md:` and up), the pill remains at `bottom-6 left-6` as designed -- no change.

Alternatively, and more elegantly: on mobile, center the pill horizontally and place it above the footer. Change from `left-4` to `left-1/2 -translate-x-1/2` on mobile, and shift upward to `bottom-16`. This creates a vertical stack: cards, then pill, then tagline -- each element breathing in its own space. On desktop, retain the current bottom-left fixed position.

## Specifications

### Mobile (below `md`)
- Position: `fixed bottom-16 left-1/2 -translate-x-1/2`
- This centers the pill and lifts it above the tagline

### Desktop (`md:` and up)
- Position: `md:bottom-6 md:left-6 md:translate-x-0`
- No change from current behavior

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Update positioning classes for mobile vs desktop breakpoint |

## What Stays Unchanged

All card layout, typography, opacity hierarchy, gradient overlays, border luminance, golden thread, semicolon breathing, hover states, animation timings, and desktop pill behavior remain exactly as they are.

