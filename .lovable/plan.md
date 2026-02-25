

# Gateway Refinement -- Gradient Overlay Depth and Card Border Luminance

## Audit Finding

Two subtle but high-impact details separate this Gateway from true world-class studio work:

### 1. Card Gradient Overlay Is Uniform Across All Cards

Every card uses an identical `from-black/80 via-black/40 to-black/20` gradient. World-class bento layouts (Fantasy, Pentagram portfolio pages) use slightly varied gradient intensities per card to create visual rhythm -- the eye reads the trio as a composed triptych rather than three copies of the same template. The available (Weddings) card should feel slightly more "revealed" than the Coming Soon cards, reinforcing its active status through luminance hierarchy, not just text color.

**The fix:** The available card gets a lighter gradient (`from-black/70 via-black/30 to-black/10`) so its image reads slightly brighter -- subconsciously drawing the eye first. The unavailable cards get a slightly heavier gradient (`from-black/85 via-black/50 to-black/30`) that dims them further, reinforcing their dormant state. This creates a three-tier luminance hierarchy: bright (active) to dim (coming soon).

### 2. Card Border Has No Resting-State Differentiation

All three cards share the same `border-white/10` at rest. The available card only differentiates on hover (yellow border glow). At first glance -- before any interaction -- there is no visual signal that one card is "alive" and the others are not. A subtle resting-state border tint on the active card would create an immediate visual hierarchy the moment the page loads, before the user even reads the text.

**The fix:** The available card gets a resting border of `border-white/[0.14]` -- just 4% brighter than the others at `border-white/[0.06]`. The difference is nearly imperceptible consciously but creates a subliminal "this one is different" signal. The unavailable cards drop to `border-white/[0.06]` to recede further. On hover, the available card still transitions to the golden border as before.

---

## Specifications

### Gradient Differentiation
- Available cards: `from-black/70 via-black/30 to-black/10`
- Unavailable cards: `from-black/85 via-black/50 to-black/30`
- No animation change -- purely static gradient values

### Border Luminance Hierarchy
- Available cards (resting): `border-white/[0.14]`
- Unavailable cards (resting): `border-white/[0.06]`
- Available cards (hover): unchanged -- still transitions to `border-[hsl(var(--vow-yellow)/0.25)]`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Differentiate gradient overlay and resting border opacity between available and unavailable cards |

## What Stays Unchanged

All routing, animations, parallax, golden thread, semicolon breathing, arrow affordance, mobile layout, and desktop aspect ratios remain exactly as they are.

