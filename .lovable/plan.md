

# Round 41 — The Invitation: Final Compositional Polish

## Current State (from screenshot)

The section is now in good shape compared to before: dark warm atmosphere, cinematic portrait with glow, frosted credentials, flowing headline. However, a few compositional issues remain:

1. **"THE INVITATION" label is left-biased** — it renders left-aligned within the `max-w-6xl` container because `text-center` only centers within the container, but the label visually reads as off-center due to the asymmetric 2fr/3fr grid below it pulling the eye. The label needs to be genuinely centered across the full section width.

2. **Portrait and content columns have mismatched vertical weight** — the portrait ends with its caption around 50% of the content column's height, leaving empty space below. The content column extends further with the credential strip. This creates visual imbalance.

3. **The credential strip golden dividers (1px w-px h-8) sit inside `flex-1` wrappers with `gap-3`** — this means the dividers consume flex space unevenly. The three credential boxes aren't equally sized because each `flex-1` wrapper includes the divider in the last two items.

4. **The CTA "Meet the witness" en-dash** extends to the right but has no visual anchor — it floats mid-air with no baseline connection to the credential strip below.

## 5-Step Fix

### Step 1: True-Center the Section Label

Move the `<p>` section label out of the `max-w-6xl` wrapper, or apply independent centering that isn't constrained by the asymmetric grid. The simplest fix: keep it inside `max-w-6xl` (already centered via `mx-auto`) but ensure `text-center` works by confirming no parent flex/grid is affecting it. The label is already outside the grid div, so this is actually a visual perception issue caused by the grid asymmetry below. Fix by making the label span full container width explicitly with `w-full`.

### Step 2: Fix Credential Divider Layout

The current layout wraps each credential + its trailing divider in one `flex-1` container, making the last credential (no divider) narrower than the others. Fix:
- Remove the dividers from inside the `flex-1` credential wrappers
- Instead, use CSS `gap` on the parent flex and place dividers as standalone elements between credentials
- Each credential gets `flex-1` directly, dividers are fixed-width separators outside the flex-1 flow

### Step 3: Align Portrait Column Vertically

Add `items-center` to the portrait column's inner wrapper (the one with the image + caption) so that on desktop, the portrait + caption group vertically centers relative to the content column height. This prevents the dead space below the caption when the content column is taller.

Change the grid from `items-start` to `items-center` so both columns vertically center-align, creating a more balanced composition.

### Step 4: Add Subtle Separator Between CTA and Credentials

Add a small golden rule (40px wide, 1px tall, vow-yellow at 15% opacity) between the CTA and the credential strip. This creates visual separation and gives the credential strip its own "architectural base" rather than floating beneath the CTA.

### Step 5: Epigraph Max-Width Constraint

The epigraph quote currently spans the full content column width, which at 3fr of a `max-w-6xl` container is quite wide for italic serif text. Add `max-w-lg` (512px) to the epigraph to maintain a premium narrow reading measure, matching the luxury typography system.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | Ensure label has `w-full text-center` |
| 2 | `TheInvitation.tsx` | Restructure credential flex to separate dividers from flex-1 items |
| 3 | `TheInvitation.tsx` | Change grid `items-start` to `items-center` |
| 4 | `TheInvitation.tsx` | Add golden separator rule between CTA and credentials |
| 5 | `TheInvitation.tsx` | Add `max-w-lg` to epigraph element |

## What This Achieves

- The section label genuinely centers across the full composition
- Credentials are equally sized trust architecture elements
- Portrait and content columns balance vertically instead of top-aligning with dead space
- A golden rule anchors the credential strip as its own architectural moment
- The epigraph reads at a premium narrow measure befitting luxury serif typography

