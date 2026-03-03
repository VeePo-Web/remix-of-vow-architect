

# Step 12: Intricate CTA Button — Sacred Edge Craftsmanship

This step transforms the "Hold my date." button from a standard vow-yellow CTA into a hand-crafted sacred object with layered edge treatments that create the illusion of a physical, luminous artifact sitting on a dark altar.

---

## The Vision

The button should feel like a wax seal on a wedding invitation — an object with physical presence, subtle light catching its edges, and warmth radiating from within. Not a CSS button. A sacred artifact.

---

## 12a. Inset Top-Edge Light Catch

Add an `inset` box-shadow to the button that simulates light catching the top edge — the way candlelight catches the raised edge of an embossed invitation.

**Technique:** A 1px inset shadow at the top with white at 20% opacity, creating a subtle "bevel" that gives the button physical depth.

**CSS addition to `cta-commitment`:**
```css
box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.20);
```

This is layered beneath the existing `cta-breathe` box-shadow animation via a separate `filter: drop-shadow()` or by combining inset shadows in the class definition.

---

## 12b. Bottom-Edge Shadow Shelf

Add a tight, warm shadow beneath the button that creates a "shelf" — the button appears to float 2px above the surface.

**Technique:** A second box-shadow layer: `0 2px 8px rgba(0, 0, 0, 0.3)` — darker than the existing glow, creating a grounding shadow that contrasts with the golden halo.

This will be added to the button's base styles via the `cta-commitment` class.

---

## 12c. Border Ring — 1px Vow-Yellow at Reduced Opacity

Replace the default `rounded-full` edge with a 1px border using vow-yellow at 25% opacity. This creates a thin golden frame around the button — like the gilded edge of an invitation card.

**Technique:** `border: 1px solid hsl(45 100% 76% / 0.25)` on the button. On hover, the border opacity increases to 40%, creating a subtle "warming" effect.

---

## 12d. Enhanced Breathe Animation — Inset + Outer Synchronized

Update the `cta-breathe` keyframe to include both the outer glow AND the inset light-catch, so both breathe together. The inset highlight brightens from 20% to 28% opacity on the "inhale," then dims back — creating the illusion that a candle is flickering above the button.

**Updated keyframe:**
```css
@keyframes cta-breathe {
  0%, 100% {
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 224, 138, 0.2),
      0 0 60px rgba(255, 224, 138, 0.1),
      0 0 120px rgba(255, 224, 138, 0.05);
  }
  50% {
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.28),
      0 3px 12px rgba(0, 0, 0, 0.35),
      0 0 45px rgba(255, 224, 138, 0.35),
      0 0 90px rgba(255, 224, 138, 0.18),
      0 0 160px rgba(255, 224, 138, 0.08);
  }
}
```

---

## 12e. Hover State — Edge Intensification

On hover, the button's edge treatments intensify subtly:
- Border opacity rises from 25% to 40%
- The inset light-catch brightens slightly
- A new `0 0 4px hsl(45 100% 76% / 0.3)` tight glow appears right at the edge

**Technique:** Add hover styles to the `cta-commitment` class:
```css
.cta-commitment:hover {
  border-color: hsl(45 100% 76% / 0.40);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.30),
    0 0 4px hsl(45 100% 76% / 0.3),
    0 3px 12px rgba(0, 0, 0, 0.35);
}
```

Note: The breathe animation's box-shadow will take precedence during animation cycles, but the hover border change and the tight edge glow add a responsive layer.

---

## 12f. Active/Press State — Subtle Depression

On press (`:active`), the button subtly "sinks" into the surface:
- Remove the inset top highlight (light no longer catches a pressed surface)
- Reduce outer glow by 30%
- Add a very subtle `inset 0 1px 3px rgba(0, 0, 0, 0.15)` to simulate depression

This is a 0ms transition (instant response to press), returning to normal on release.

---

## 12g. Button Class Updates in CrossOver.tsx

Add the `cta-commitment` border directly to the Button's inline className in the component, adding:
- `border border-[hsl(45_100%_76%_/_0.25)]`
- Keep existing `cta-commitment cta-breathe-glow` classes

---

## Summary

| # | Enhancement | Technique | Impact |
|---|------------|-----------|--------|
| 12a | Top-edge light catch | Inset box-shadow, white 18-28% | Physical bevel illusion |
| 12b | Bottom shadow shelf | 0 2px 8px dark shadow | Floating depth |
| 12c | Golden border ring | 1px vow-yellow at 25% | Gilded invitation edge |
| 12d | Synchronized breathe | 5-layer box-shadow keyframe | Candlelight flicker on edges |
| 12e | Hover intensification | Border + edge glow on hover | Responsive warmth |
| 12f | Press depression | Inset shadow swap on :active | Tactile feedback |
| 12g | Component class update | Border utility added to JSX | Integration |

**Two files modified:** `index.css` (keyframe update + hover/active states), `CrossOver.tsx` (border class addition). Seven edge refinements. Zero new dependencies. Pure sacred craftsmanship.

