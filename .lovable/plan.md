

# The Witness Section --- Round 2 Visual Refinement

## Current State Assessment

The 11-step elevation from the previous round successfully transformed The Witness from a flat text stack into an asymmetric two-column layout with cinematic image frame, declaration cards, golden thread, kit grid, and atmospheric overlays. The section now has compositional drama and material depth.

However, comparing against Fantasy.co standards, five specific issues remain:

---

## Issue 1: Duplicate CSS Keyframe Conflict

There are two `@keyframes witness-ken-burns` definitions in `index.css` --- one at line 4281 (older, simpler: `scale(1)` to `scale(1.04)`) and one at line 5006 (newer, with translate: `scale(1) translate(0,0)` to `scale(1.06) translate(-1%, 1%)`). The second definition overrides the first, but the duplicate creates confusion and a maintenance hazard. The older one at line 4281 should be removed.

**Fix**: Remove the duplicate `@keyframes witness-ken-burns` block at lines 4281-4284.

**File**: `src/index.css`

---

## Issue 2: Image Frame Lacks Vertical Alignment with Text

On the screenshot, the image frame's top edge starts well above "THE PREPARATION" label, creating an unanchored visual relationship. The image and text columns should share a common top alignment to create a deliberate compositional grid. Currently `items-start` is used but the image's 3:4 aspect ratio pushes it taller than the text column, which is correct --- but the top edges need to align precisely.

**Fix**: Add `pt-2 md:pt-0` to the right column to micro-align the label with the image frame's visual top edge, ensuring they read as a connected pair rather than two independent stacks.

**File**: `src/components/TheWitness.tsx` (line 104, right column div)

---

## Issue 3: Kit Grid Background Image Creates Visual Noise

The piano keys texture behind the kit area at 6% opacity with 1px blur creates a slight muddiness on cream backgrounds. At Fantasy.co quality, background textures should be imperceptible until you look for them --- more felt than seen. The current 6% is slightly too visible, creating noise rather than depth.

**Fix**: Reduce the piano keys background opacity from `0.06` to `0.035` and increase blur from `1px` to `2px`. This keeps the subliminal texture depth while eliminating any visual distraction from the kit item labels.

**File**: `src/components/TheWitness.tsx` (line 232)

---

## Issue 4: Declaration Card Borders Are Too Visible

The declaration card borders at `hsl(45 20% 85% / 0.4)` are visible enough to create a "boxed" feeling. At Fantasy.co quality, card edges should dissolve into the background --- the card's presence should be communicated through the subtle background tint and the inner shadow light-catch, not the border. The border should be nearly invisible, serving only as a precision edge for users who look closely.

**Fix**: Reduce card border opacity from `0.4` to `0.2` across all three declaration cards. This preserves the structural definition while making the cards feel more like pressed paper than bordered containers.

**File**: `src/components/TheWitness.tsx` (line 184)

---

## Issue 5: Closing Line Positioning

The closing italic line ("Now --- choose how long you want me there.") sits at `mt-10` (40px) below the kit grid. This creates adequate spacing, but the line reads as disconnected from the section's narrative arc. A slightly larger gap (48px) would give it the "final breath" quality --- a pause before the visitor crosses into Three Paths.

**Fix**: Change `mt-10` to `mt-12` on the closing thought paragraph, creating a more deliberate pause that mirrors the brand's breathing rhythm.

**File**: `src/components/TheWitness.tsx` (line 271)

---

## Technical Summary

| Step | File | Line(s) | Change |
|------|------|---------|--------|
| 1 | `src/index.css` | 4281-4284 | Remove duplicate `@keyframes witness-ken-burns` |
| 2 | `src/components/TheWitness.tsx` | 104 | Add `pt-2 md:pt-0` to right column |
| 3 | `src/components/TheWitness.tsx` | 232 | Reduce opacity to 0.035, blur to 2px |
| 4 | `src/components/TheWitness.tsx` | 184 | Reduce border opacity from 0.4 to 0.2 |
| 5 | `src/components/TheWitness.tsx` | 271 | Change `mt-10` to `mt-12` |

No copy changes. No new images. No new animations. Pure refinement of existing materials.

