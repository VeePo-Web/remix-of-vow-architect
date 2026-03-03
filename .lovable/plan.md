

# Black Keys — Extreme Depth Enhancement

## Current State

The black keys are 64px wide (72px on lg), 320px tall (360px on lg), with a basic two-layer gradient, side borders, a `::before` top-face gloss, and a `::after` bottom shadow. They read as flat dark rectangles rather than 3D ebony keys protruding from the keybed.

## What Real Piano Black Keys Look Like

A real black key is a raised, beveled block of ebony. It has:
- A distinct **flat top playing surface** (lighter, catches overhead light)
- **Beveled side edges** that transition from the top face to the front face at an angle
- **Deep lateral shadows** cast onto the neighboring white keys
- A **glossy sheen** — ebony reflects a soft highlight stripe along its length
- **Pronounced vertical depth** — the key visually "pops out" above the white key surface

## 10 Refinements (all in `src/index.css`)

### 1. Increase z-index and add translateZ for visual pop
Add `transform: translateY(-4px)` to the base `.piano-black-key` so it visually lifts above the white key surface. This creates immediate spatial separation.

### 2. Deepen and layer the box-shadow for cast shadows
Replace the current two-shadow stack with a five-layer shadow that simulates:
- Contact shadow (tight, dark, 2px blur)
- Near shadow (medium, 8px blur)
- Ambient shadow (wide, 24px blur)
- Lateral spread shadows (left and right, 4px x-offset)
- Bottom pool (40px blur, wide spread)

```css
box-shadow:
  0 2px 4px rgba(0,0,0,0.6),
  0 8px 16px rgba(0,0,0,0.5),
  0 16px 40px rgba(0,0,0,0.4),
  -3px 4px 12px rgba(0,0,0,0.35),
  3px 4px 12px rgba(0,0,0,0.35);
```

### 3. Enhance the top-face plane with a distinct bevel edge
The `::before` currently covers 15% height. Reduce to 8% and increase brightness to simulate the flat top surface catching direct overhead light. Add a stronger `border-bottom` (2px) to create the bevel edge where the top face meets the front face:

```css
.piano-black-key::before {
  height: 8%;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.14) 0%,
    rgba(255,255,255,0.08) 40%,
    rgba(255,255,255,0.02) 100%
  );
  border-bottom: 2px solid rgba(255,255,255,0.06);
}
```

### 4. Add a glossy highlight stripe along the front face
Real ebony has a longitudinal sheen. Add a vertical highlight to the base gradient using an additional `linear-gradient` layer — a narrow bright stripe running down the center:

```css
background:
  linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 52%, transparent 65%),
  linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 20%),
  linear-gradient(180deg, hsl(222 12% 12%) 0%, hsl(240 9% 6%) 85%, hsl(240 9% 4%) 100%);
```

### 5. Deepen the bottom drop shadow
The `::after` currently has `rgba(0,0,0,0.2)` at 6px. Increase to 10px height and `rgba(0,0,0,0.35)` with a wider spread to create a more pronounced grounding shadow:

```css
.piano-black-key::after {
  bottom: -10px;
  left: 2px;
  right: 2px;
  height: 10px;
  background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, transparent 100%);
}
```

### 6. Add side bevel gradients via border refinement
Strengthen the side borders to simulate beveled edges. The left border should be slightly lighter (light source from left), the right slightly darker:

```css
border-left: 1px solid hsl(222 12% 20%);
border-right: 1px solid hsl(222 12% 12%);
```

### 7. Add inner side shadows for concavity
Add `inset` side shadows to create the illusion that the side faces angle inward:

```css
/* Add to box-shadow stack: */
inset 2px 0 4px rgba(0,0,0,0.3),
inset -2px 0 4px rgba(0,0,0,0.3),
```

### 8. Bottom edge highlight for keybed contact
Add a 1px bottom highlight to simulate where the key meets the keybed — a faint light line that real keys show at the contact point:

```css
border-bottom: 1px solid rgba(255,255,255,0.08);
```

### 9. Increase height slightly for more pop
At 320px (360px lg), the black keys are roughly 53% of the white key height (600px). Real piano proportions have black keys at ~60% of white key length. Increase to 350px base, 390px lg.

### 10. Responsive refinement
On the lg breakpoint, scale all shadow values up proportionally and increase the width to 76px to maintain the proportion against the wider white keys.

## Summary

Single file modified: `src/index.css`
- Base `.piano-black-key`: new multi-layer background with center sheen, 5-layer box-shadow with inset + lateral shadows, `translateY(-4px)`, increased height (350px/390px), refined borders
- `.piano-black-key::before`: reduced to 8% height, brighter highlight, 2px bevel edge
- `.piano-black-key::after`: deeper drop shadow (10px, darker opacity)
- `@media (min-width: 1024px)` `.piano-black-key`: updated to 76px width, 390px height

No TSX changes needed. No new dependencies. Pure CSS material depth enhancement.

