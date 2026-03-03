

# Three Keys — Celestial Pixel-Perfect Polish

## Current State (from screenshot)

The piano key metaphor is established but falls short of "celestial" quality in several measurable ways:

1. **"THREE KEYS" label is left-aligned** — it sits at `text-left` despite the container having `text-center`. The label itself needs explicit centering.
2. **Headline breaks awkwardly across two lines** — "How deeply do" / "you want me there." The break orphans "do" at the end of line 1. Should be a single line or break at a semantically meaningful point.
3. **"MOST CHOSEN" badge is invisible** — the `-top-10` positioning places it above the key but it is clipped or not rendering visibly in the current viewport. The badge needs to be positioned within overflow-visible space.
4. **Key height feels squat** — at `min-height: 520px`, the keys don't feel tall and narrow enough to read as piano keys. Real piano keys have a roughly 6:1 aspect ratio. These are closer to 2:1.
5. **Ivory surface lacks luminosity** — the gradient is too flat. A real ivory key catches light along its center ridge and darkens subtly at the edges. The current gradient goes from white to slightly darker but doesn't create the central highlight that sells dimensionality.
6. **Golden underline beneath tier name is too short and faint** — at `w-8` (32px) it's barely visible. Needs to be wider and have a fade-out that feels like light spreading.
7. **Price typography lacks presence** — the `clamp(32px, 4vw, 44px)` is adequate but the price should have subtle letter-spacing and a warm shadow to feel carved into the ivory.
8. **CTA buttons are too tall and generic** — they need to feel like engraved labels on the key surface, not standard web buttons.
9. **Black key golden diamonds are vertically centered** — they should sit at the top third (where a real black key's playing surface would be), not dead center.
10. **Key gaps (2px) are correct but the container background is too dark** — `hsl(240 9% 3%)` should be slightly warmer to suggest a wooden keybed.
11. **Section padding is insufficient** — `py-24` (96px) is too tight for the grand section separation this deserves. Should be `py-32` (128px) or more to create the breathing room the brand demands.
12. **Bottom fade gradient targets wrong color** — it fades to `hsl(45 20% 93%)` (a warm cream) which may not match the adjacent section.

## Pixel-Level Fixes

### File: `src/components/ThreePaths.tsx`

**1. Fix header centering** — The "THREE KEYS" label `<p>` tag currently has `text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4` but is inside a `text-center` div. Add explicit `text-center` to the `<p>` element and change tracking from `0.22em` to `0.3em` for more authority at that small size.

**2. Fix headline break** — Change from "How deeply do you want me there." to a single semantic statement. Remove `textWrap: "balance"` and instead set `max-width: 18ch` and `mx-auto` to force proper narrowing. Or use a `<br className="hidden md:inline" />` to break at "do\nyou want me there." if the two-line layout is desired.

**3. Increase section padding** — Change `py-24` to `py-32 md:py-40` for grander breathing room (128px mobile, 160px desktop).

**4. Fix MOST CHOSEN badge visibility** — The `overflow-hidden` on the section clips the badge. Add `overflow-visible` to the piano keys container, or move the badge inside the key's padded area instead of absolute-positioning it above.

**5. Increase key minimum height** — Change `min-height: 520px` to `min-height: 560px` on desktop (`md:min-h-[600px]`) to create a taller, more piano-like proportion.

**6. Reposition golden diamond in black keys** — Change `items-center` to `items-start pt-12` so the diamond sits in the upper third of the black key.

**7. Widen golden underline** — Change `w-8` to `w-12` and add a more gradual fade: `linear-gradient(90deg, hsl(var(--vow-yellow) / 0.4), hsl(var(--vow-yellow) / 0.15), transparent)`.

**8. Add price text shadow** — Add `style={{ textShadow: '0 1px 2px rgba(0,0,0,0.06)' }}` to the price span for a subtle engraved effect on the ivory surface.

**9. Fix top spacer** — Change `min-h-[80px]` to `min-h-[120px]` so more clean ivory surface shows above the content, reinforcing the piano key metaphor.

### File: `src/index.css`

**10. Enhanced ivory luminosity** — Rewrite `.piano-white-key` background to include a central highlight ridge:
```
background:
  linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 8%, transparent 20%),
  linear-gradient(90deg, hsl(45 12% 91%) 0%, hsl(45 18% 95%) 35%, hsl(45 20% 96%) 50%, hsl(45 18% 95%) 65%, hsl(45 12% 91%) 100%),
  repeating-linear-gradient(90deg, rgba(0,0,0,0.006) 0px, transparent 1px, transparent 8px),
  linear-gradient(180deg, hsl(45 20% 96%) 0%, hsl(45 14% 91%) 100%);
```
The second gradient layer creates a horizontal highlight ridge running down the center of the key — brighter in the middle, darker at the side edges — which is how real ivory catches light.

**11. Warm the keybed** — Change `.piano-keys-container` background from `hsl(240 9% 3%)` to `hsl(25 8% 5%)` — a warmer near-black that suggests dark walnut rather than cold void.

**12. Refine chosen key glow** — Add a subtle ambient breathing animation to the chosen key's top border glow:
```css
.piano-white-key--chosen {
  border-top: 2px solid hsl(var(--vow-yellow) / 0.35);
  animation: chosen-key-breathe 4s ease-in-out infinite;
}

@keyframes chosen-key-breathe {
  0%, 100% { border-top-color: hsl(var(--vow-yellow) / 0.3); }
  50% { border-top-color: hsl(var(--vow-yellow) / 0.5); }
}
```

**13. CTA button refinement** — Reduce the chosen CTA's `box-shadow` spread and add letter-spacing:
- `.piano-key__cta--chosen`: add `letter-spacing: 0.08em; font-size: 0.8125rem; text-transform: uppercase;`
- `.piano-key__cta--flanking`: same letter-spacing and size adjustments
- Both: reduce `border-radius` via `border-radius: 4px !important;` (override the default rounded-md from the Button component, which may be larger than 8px)

**14. Black key depth polish** — Add a subtle inner glow at the top of each black key to simulate the glossy surface catching overhead light:
```css
.piano-black-key::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
  border-radius: 0 0 2px 2px;
  pointer-events: none;
}
```
Add `position: relative` to `.piano-black-key`.

**15. Reduced motion safety** — Add to the `@media (prefers-reduced-motion: reduce)` block:
```css
.piano-white-key--chosen { animation: none; }
```

**16. Fix section overflow** — Add `overflow: visible` to `.piano-keys-container` or the section itself to ensure the MOST CHOSEN badge renders without clipping. Alternatively, remove `overflow-hidden` from the section tag and scope it only to the background layers.

### Summary of Changes

Two files modified:
- `src/components/ThreePaths.tsx` — 9 targeted adjustments (header centering, padding, key height, badge visibility, spacer height, golden underline width, diamond position, price shadow, headline fix)
- `src/index.css` — 7 CSS refinements (ivory luminosity ridge, warm keybed, chosen key breathing glow, CTA typography, black key gloss pseudo-element, overflow fix, reduced motion)

No new files. No new dependencies. Every change is measured to the pixel.

