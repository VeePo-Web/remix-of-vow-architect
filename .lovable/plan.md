

# Gateway Refinement -- Typography Scale Hierarchy and Vertical Rhythm Rebalancing

## Audit Finding

### 1. Card Title Typography Is Flat Across All Three Cards

Every card renders its title at identical `text-[28px] font-light text-foreground`. The available Weddings card -- the only live, interactive service -- carries the same typographic presence as the dormant Teaching and Events cards. While the opacity, gradient, border, and image layers all differentiate active from inactive, the title text itself -- the single most content-dense element a visitor reads -- does not participate in the hierarchy. World-class triptych layouts use fractional typographic differentiation to signal primacy: the active element's title is slightly heavier and larger, while dormant elements read quieter. This is not about making the difference obvious -- it is about making the eye land on the right card first without the visitor knowing why.

**The fix:** The available card's title shifts to `text-[30px] font-normal` (weight 400, 2px larger). The unavailable cards remain at `text-[28px] font-light` and add `text-foreground/70` (30% transparency reduction). The difference is nearly invisible in isolation but compositionally decisive -- it completes the hierarchy that every other layer has already established.

### 2. Card Content Vertical Rhythm Is Bottom-Heavy

Inside each card, the spacing between title and description is `mt-1` (4px) while the spacing between description and CTA label is `mt-4` (16px). This creates a compressed title/description cluster followed by a disproportionate gap before the CTA. The content feels pushed to the bottom rather than distributed with intentional rhythm. Premium card interiors use a more balanced vertical distribution where each element breathes proportionally.

**The fix:** Increase the title-to-description gap from `mt-1` to `mt-2` (8px) and decrease the description-to-CTA gap from `mt-4` to `mt-3` (12px). The total vertical space changes by only 4px, but the redistribution creates a more balanced cadence: 8px pause after the title, 12px pause before the CTA. Each element sits in its own breathing room rather than clustering.

---

## Specifications

### Typography Scale Differentiation
- Available card title: `text-[30px] font-normal text-foreground`
- Unavailable card titles: `text-[28px] font-light text-foreground/70`

### Vertical Rhythm Rebalancing
- Description margin: `mt-1` changes to `mt-2`
- CTA label margin: `mt-4` changes to `mt-3`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Conditional title styling based on `s.available`; adjust `mt-1` to `mt-2` on description and `mt-4` to `mt-3` on CTA label |

## What Stays Unchanged

All routing, images, opacity hierarchy, gradient overlays, border luminance, golden thread, semicolon breathing, arrow affordance, hover scale, parallax, mobile layout, and animation timings remain exactly as they are.

