

# Gateway Refinement -- Typography Scale Hierarchy and Card Content Vertical Rhythm

## Audit Finding

### 1. Card Title Typography Is Identical Across Available and Unavailable Cards

All three cards render their title at `text-[28px]` with `font-light` and identical `text-foreground` color. The Weddings card -- the only live, clickable service -- reads at the exact same typographic weight and presence as Teaching and Events. World-class triptych compositions (Fantasy portfolio, Pentagram case study grids) use subtle typographic differentiation to signal primacy: the active element's title carries slightly more visual weight, while dormant elements feel quieter. Currently, the opacity, gradient, and border hierarchies do the heavy lifting, but the typography itself -- the most content-dense element -- remains flat.

**The fix:** The available card's title uses `text-[30px]` (2px larger) and `font-normal` (weight 400 vs. 300). The unavailable cards remain at `text-[28px] font-light` and shift to `text-foreground/70` (30% transparency). This creates a reading hierarchy where the eye naturally lands on the Weddings title first -- it is fractionally bolder and larger. The difference is subtle enough to feel compositional rather than designed, but it reinforces every other hierarchy layer already in place.

### 2. Card Description Lacks Breathing Room from the CTA Label

The description text (`mt-1`) and the "Enter" / "Coming Soon" label (`mt-4`) create an uneven vertical rhythm. The gap between title and description is tight (4px via `mt-1`), while the gap between description and CTA is larger (16px via `mt-4`). This creates a bottom-heavy cluster. Premium card layouts use consistent internal spacing that follows a harmonic scale. A slight increase in the title-to-description gap and a slight decrease in the description-to-CTA gap would create a more balanced vertical distribution -- the content feels centered within the card rather than compressed at the bottom.

**The fix:** Change the description's margin from `mt-1` to `mt-2` (8px), and the CTA label's margin from `mt-4` to `mt-3` (12px). This redistributes the vertical rhythm: 8px between title and description, 12px between description and CTA. The total vertical space consumed increases by only 4px, but the distribution feels more balanced and intentional -- each element breathes equally.

---

## Specifications

### Typography Scale Differentiation
- Available card title: `text-[30px] font-normal text-foreground`
- Unavailable card titles: `text-[28px] font-light text-foreground/70`

### Vertical Rhythm Rebalancing
- Description: change `mt-1` to `mt-2`
- CTA label: change `mt-4` to `mt-3`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Conditional title size/weight/color for available vs. unavailable; adjust description and CTA margins |

## What Stays Unchanged

All routing, images, opacity hierarchy, gradient overlays, border luminance, golden thread, semicolon breathing, arrow affordance, hover scale, mobile layout, and animation timings remain exactly as they are.

