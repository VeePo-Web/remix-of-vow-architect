

# Gateway Refinement -- Semicolon Breathing Pulse and Card Image Parallax

## Audit Findings

After a thorough browser-based verification of the Gateway page, two micro-refinements surfaced that would elevate it from "well-built" to "world-class agency-level":

1. **The semicolon in the tagline is static.** On the wedding homepage, the vigil flame breathes with a 4s ambient cycle. The Gateway's semicolon -- the brand's most sacred typographic element, the threshold between death and life -- sits completely still. This is a missed opportunity to create a visual heartbeat that ties the Gateway to the deeper brand.

2. **Card images are flat.** The background images sit at fixed opacity with no spatial depth. A subtle mouse-tracking parallax on the card images (2-4px shift) would create a sense of dimensionality -- the kind of "alive" quality that separates Fantasy-level work from standard implementations. This is a single CSS transform, no library needed.

---

## Change 1: Semicolon Breathing Glow

Add a CSS animation to the semicolon in the footer tagline -- a soft golden `text-shadow` pulse on a 4-second cycle matching the vigil flame's `flame-breathe` timing.

**Specifications:**
- Animation: `text-shadow` oscillates between `0 0 20px hsl(var(--vow-yellow) / 0.4)` and `0 0 40px hsl(var(--vow-yellow) / 0.7)`
- Duration: 4s, ease-in-out, infinite
- Reduced motion: falls back to static glow (no animation)
- Applied via inline style or a small keyframe in the component

## Change 2: Subtle Card Image Parallax on Hover

When the user hovers a card, the background image shifts slightly in the direction of the cursor, creating a parallax "window" effect. This uses `onMouseMove` to calculate a small `translate` offset (max 4px in any direction) on the image layer.

**Specifications:**
- Max translation: 4px in X and Y
- Transition on mouse leave: 500ms ease-out back to center
- Applied only to the image `div` inside each card, not the card itself
- Desktop only (no effect on touch devices)
- No external library -- pure `onMouseMove` handler with `transform: translate()`

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Add semicolon breathing keyframe animation; add `onMouseMove`/`onMouseLeave` parallax logic to card image layers |

## What Stays Unchanged

All routing, all other pages, all existing animations, theme system, and card structure remain exactly as they are.

