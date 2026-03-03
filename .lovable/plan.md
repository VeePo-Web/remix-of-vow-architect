

# Three Keys — Fantasy.co Bold Overhaul

## Current Issues (from screenshot)

The section renders but falls short of "bold" and "Fantasy.co quality" in these specific ways:

1. **"THREE KEYS" label appears left-aligned** — the `text-center` class is on the label but the container's `text-center` isn't propagating correctly. The label sits at the left edge.
2. **"MOST CHOSEN" badge is invisible** — despite `overflow-visible` on the container, it's still clipped or not rendering. The absolute positioning at `-top-10` places it outside the key's bounds, but something is still hiding it.
3. **Keys look clinical, not bold** — the ivory gradient is technically correct but visually reads as flat white cards. The side borders are too faint. The overall impression is "clean UI card" not "bold piano key."
4. **Black keys are too narrow** — at 48px (md) / 56px (lg) they read as thin dividers, not as imposing black piano keys that protrude over the whites.
5. **Price typography is too light** — `font-weight: 300` at `clamp(32px, 4vw, 44px)` makes the price feel wispy. For "bold" impact, the price needs more weight or a darker color with stronger contrast.
6. **Golden underlines beneath tier names are invisible** in the rendered output — the `w-12` gradient is too faint against the ivory.
7. **The section background atmospheric layers don't feel immersive enough** — the vignette and radial glow are too subtle for the "bold" request.

## Plan: 7 Bold Refinements

### File: `src/components/ThreePaths.tsx`

**1. Fix "MOST CHOSEN" badge visibility**
The badge is positioned at `-top-10` (40px above) but the section has `overflow-hidden` via the background layers. Move the badge INSIDE the key's padding area instead of absolute-positioning it above. Place it as the first content element inside the key, before the spacer, using `relative` positioning with negative `mt` to overlap the top edge. This guarantees visibility regardless of overflow.

Alternatively, wrap the entire piano-keys layout in an extra div with `overflow-visible` and sufficient top padding (48px) to accommodate the badge.

**2. Increase black key width and presence**
Change width from 48px (md) to 64px, and 56px (lg) to 72px. Increase height from 300px/340px to 320px/360px. Darken the gradient and add a stronger bottom shadow. This makes them read as genuine protruding keys, not thin separators.

**3. Bold price typography**
Change `.piano-key__price` from `font-weight: 300` to `font-weight: 400` and darken color from `hsl(240 9% 8%)` to `hsl(240 9% 4%)`. Add `letter-spacing: -0.02em` for tighter, bolder numerals. Increase size from `clamp(32px, 4vw, 44px)` to `clamp(36px, 5vw, 52px)`.

**4. Strengthen golden underlines**
Change the underline gradient from `hsl(var(--vow-yellow) / 0.25)` to `hsl(var(--vow-yellow) / 0.5)` for unchosen keys and `0.6` for chosen. Increase height from `h-[1px]` to `h-[2px]` so it's visible against ivory.

**5. Bolder key surface contrast**
Darken the side borders from `hsl(45 10% 85%)` / `hsl(45 10% 88%)` to `hsl(45 10% 78%)` / `hsl(45 10% 82%)`. Increase the side facet inset shadows from `rgba(0,0,0,0.04)` to `rgba(0,0,0,0.07)`. This creates stronger edge definition — the keys look carved, not printed.

**6. Bolder section atmosphere**
Increase the background image opacity from `0.10` to `0.14`. Increase the radial spotlight from `0.035` to `0.06`. Strengthen the vignette by tightening the transparent center from `30%` to `20%`. This makes the dark atmosphere more cinematic and the keys pop against it with more contrast.

**7. Bold tier name typography**
Increase `.piano-key__name` from `1.25rem` to `1.375rem` and change weight from `300` to `400`. The tier names should command attention — they're the identity of each offering.

### File: `src/index.css`

All CSS changes for items 2, 3, 5, 7:

- `.piano-black-key`: width 64px, height 320px, stronger shadow
- `@media (min-width: 1024px) .piano-black-key`: width 72px, height 360px
- `.piano-key__price`: font-weight 400, larger clamp, tighter letter-spacing, darker color
- `.piano-white-key`: stronger side borders and inset shadows
- `.piano-key__name`: larger size, weight 400

### File: `src/components/ThreePaths.tsx`

Changes for items 1, 4, 6:

- Badge: restructure to sit inside key padding with visible positioning
- Golden underlines: increase opacity values and height to 2px
- Background image: increase opacity to 0.14
- Radial spotlight: increase to 0.06
- Vignette: tighten transparent center to 20%
- Increase black key negative margins from `-mx-3 lg:-mx-4` to `-mx-4 lg:-mx-5` to accommodate wider keys

### Summary

Two files modified:
- `src/components/ThreePaths.tsx` — badge restructuring, golden underline opacity/height, atmosphere opacity increases, black key margin adjustments
- `src/index.css` — black key dimensions, price typography boldness, key surface contrast, tier name boldness

No new files. No new dependencies. Every change serves "bold" and "Fantasy.co quality."
