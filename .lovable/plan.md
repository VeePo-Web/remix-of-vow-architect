

# Gateway Refinement -- Gradient Overlay Transition and Card Border Luminance on Hover

## Audit Finding

### 1. The Bottom Gradient Overlay Is Static During Hover -- Missing a Key Depth Cue

When hovering the Weddings card, the image opacity increases from 0.35 to 0.45, the card lifts by 2px and scales to 1.015, and the border warms to vow-yellow at 25% opacity. However, the gradient overlay sitting between the image and the text content remains completely static: `from-black/70 via-black/30 to-black/10`. This means the image brightens behind an unchanging dark veil -- the two layers fight each other. The visitor's eye registers something changed but the text area feels inert.

World-class card hover states (Apple product cards, Fantasy project entries) subtly lighten the gradient on hover, allowing the image warmth to "breathe through" to the content area. This creates a sense of the card opening up -- inviting you in -- rather than just mechanically lifting.

**The fix:** Add a hover-state gradient variant on the available card's overlay: transition from `from-black/70` to `from-black/60` on group-hover. The `via` and `to` stops remain unchanged. This 10% lightening of just the bottom band creates a subtle warmth shift that synchronizes with the image opacity increase, making the hover feel cohesive rather than layered. The transition uses the existing `duration-500` on the overlay div.

### 2. Card Border Lacks Transition Smoothness

The border shifts from `border-white/[0.14]` to `hover:border-[hsl(var(--vow-yellow)/0.25)]` via the card's `transition-all duration-300`. However, transitioning between two completely different color formats (rgba white vs hsl yellow) can cause a hard color jump on some browsers rather than a smooth interpolation. This is because CSS transitions between different color spaces can produce unexpected intermediate values.

**The fix:** Normalize the resting border to use the same hsl format as the hover state: change `border-white/[0.14]` to `border-[hsl(var(--vow-yellow)/0.08)]`. At 8% opacity, vow-yellow is virtually indistinguishable from white at 14% opacity against a rich-black background -- both read as a faint warm-neutral line. But now the transition from 8% to 25% of the same hsl color produces a perfectly smooth, single-channel interpolation. The border "warms" rather than "switches." The dormant cards keep `border-white/[0.06]` unchanged since they have no hover state.

---

## Specifications

### Gradient Overlay Hover
- Available card overlay: add `group-hover:from-black/60` alongside existing `from-black/70`
- Add `transition-all duration-500` to the overlay div (it currently has no transition classes)

### Card Border Color Normalization
- Available card resting border: `border-white/[0.14]` changes to `border-[hsl(var(--vow-yellow)/0.08)]`
- Hover border remains: `hover:border-[hsl(var(--vow-yellow)/0.25)]`
- Dormant card border unchanged: `border-white/[0.06]`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Update available card gradient overlay classes to include hover variant and transition; update available card resting border color format |

## What Stays Unchanged

All typography, copy, aspect ratios, animation stagger, routing, images, opacity layers, golden thread, semicolon breathing, arrow affordance, hover scale/lift, parallax, CTA labels, and mobile layout remain exactly as they are.

