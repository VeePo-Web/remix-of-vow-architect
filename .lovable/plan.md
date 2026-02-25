

# Gateway Refinement -- Image Reveal Opacity Hierarchy and Hover Scale Breathing

## Audit Finding

### 1. Background Image Opacity Is Identical Across All Cards

Every card uses the same `opacity-[0.30]` for its background image at rest and `group-hover:opacity-[0.40]` on hover. This flattens the visual hierarchy -- the active Weddings card reads at the same "energy level" as the dormant Teaching and Events cards. World-class triptych layouts use image opacity as a subtle signifier of state: the active element feels more present, more alive, while dormant elements recede into deeper shadow.

**The fix:** The available card's background image uses `opacity-[0.35]` at rest (5% brighter than before) and `group-hover:opacity-[0.45]` on hover. The unavailable cards drop to `opacity-[0.20]` at rest with no hover change. This creates a three-tier depth: the Weddings card image is perceptibly more vivid, reinforcing the gradient and border hierarchy already established. The unavailable cards feel like they exist further back in the visual plane -- present but waiting.

### 2. Hover Lift Lacks Micro-Scale for Dimensionality

The available card currently lifts on hover (`hover:-translate-y-2`) but does not scale. Premium portfolio sites (Fantasy, Pentagram) pair vertical lift with a barely perceptible scale increase (1.5-2%) to create a "coming toward you" depth effect. Without it, the card feels like it slides on a flat plane rather than lifting off the surface. The scale must be subtle enough to avoid layout shift or visual noise.

**The fix:** Add `hover:scale-[1.015]` to the available card's hover state. Combined with the existing `-translate-y-2` and golden shadow, this creates a three-part dimensionality: lift + scale + glow. The 1.5% scale is imperceptible as a number but perceptible as a feeling -- the card breathes toward the user. The `transition-all duration-300` already in place handles the easing.

---

## Specifications

### Image Opacity Hierarchy
- Available cards: `opacity-[0.35] group-hover:opacity-[0.45]`
- Unavailable cards: `opacity-[0.20]` (no hover change -- remove `group-hover:opacity-[0.40]`)

### Hover Micro-Scale
- Available cards: add `hover:scale-[1.015]` alongside existing `hover:-translate-y-2`
- Unavailable cards: no change

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Differentiate image opacity between available/unavailable cards; add micro-scale to available card hover |

## What Stays Unchanged

All routing, golden thread, gradient overlays, border hierarchy, semicolon breathing, arrow affordance, mobile layout, animation timings, and desktop aspect ratios remain exactly as they are.

