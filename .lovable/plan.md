

# Homepage Visual Hierarchy Refinement — Phase 2

## Problem

After the Phase 1 typography standardization, several visual centering issues remain visible in the browser. Multiple section headings, labels, and content blocks appear left-shifted despite having `text-center` on parent containers. This breaks the symmetrical, luxury aesthetic the brand requires.

## Root Cause

The `text-wrap: balance` property creates a narrower text block that renders left-aligned within a centered container. The balanced block itself is centered, but shorter headings visually appear left-shifted because the balanced block shrinks to fit the shortest line. This is a known CSS behavior — the fix is to add explicit `text-center` directly on heading elements (not just parents) or use `margin: 0 auto` with `max-width` constraints.

## Issues and Fixes

### Fix 1: TheSound heading alignment

**File**: `src/components/TheSound.tsx`

The heading "Music that holds the room still." and subhead appear visually left-aligned. The `text-center` is on the parent `div` but the heading's `text-wrap: balance` causes visual shift.

- Add explicit `text-center` class directly to the `h2` element
- Add `text-center` to the subhead `p` element
- Add `text-center` to the closing caption `p`

### Fix 2: TheWitness content centering

**File**: `src/components/TheWitness.tsx`

The label, heading, declarations, and kit pills all appear visually left-shifted within the `max-w-2xl mx-auto text-center` wrapper.

- The nested `max-w-4xl > max-w-2xl` structure is sound but the heading with `text-wrap: balance` shifts left
- Add explicit `text-center` class directly to the `h2` and declaration `p` elements

### Fix 3: ThreePaths heading centering

**File**: `src/components/ThreePaths.tsx`

"How deeply do you want me there?" heading appears at the left edge.

- Add explicit `text-center` to the `h2` element
- Add explicit `text-center` to the subtitle `p`

### Fix 4: TheRecord content centering

**File**: `src/components/TheRecord.tsx`

The guarantee quote "If all failsafes fail" appears off-center.

- Add explicit `text-center` to the guarantee `p` elements
- Ensure the `h2` has explicit `text-center`

### Fix 5: TheWitnesses centering

**File**: `src/components/TheWitnesses.tsx`

"THE COVENANT KEPT" label and "They heard their vows" heading appear left-shifted.

- Add explicit `text-center` to `h2`
- The testimonials are intentionally left-aligned (blockquotes with left-side decorative quotes) so those stay as-is

### Fix 6: TheInvitation label positioning

**File**: `src/components/TheInvitation.tsx`

The label "THE INVITATION" sits above the 2-column grid and appears left-floating because `text-center` is applied but the label is inside the grid's flow context at `max-w-6xl`.

- Move the label outside and above the grid, keeping `text-center` with `max-w-6xl mx-auto` wrapper
- Reduce label `mb-12` to `mb-8` for tighter coupling with the content below

### Fix 7: TheTransformation missing heading

**File**: `src/components/TheTransformation.tsx`

This section only has a floating label "THE TRANSFORMATION" with no h2 heading. Every other section follows the pattern: label, then h2. This section breaks the visual rhythm.

- The split-screen layout (fears vs resolutions) functions as the content, so a heading would sit awkwardly above the split. However, the floating label treatment is unique and inconsistent.
- Remove the gradient-backed floating label and instead embed it as a standard label above the split grid, matching other sections' label positioning
- No h2 needed here — the split layout IS the message. But the label should be consistently positioned.

### Fix 8: Footer spacing tightening

**File**: `src/components/Footer.tsx`

- Reduce golden thread top margin from `mb-16` to `mb-12`
- Keep `py-20` (80px) as it matches the brand's section spacing standard

### Fix 9: CrossOver duplicate h2 issue

**File**: `src/components/CrossOver.tsx`

The section has TWO `h2` elements — the tagline bookend and the sacred quote. Having two h2s in one section is semantically incorrect and visually confusing for hierarchy.

- Change the tagline bookend from `h2` to `p` — it's a decorative reprise, not a heading
- Keep the sacred quote as the sole `h2`

## What Stays Unchanged

- All copy, content, pricing, and brand messaging
- All section ordering and narrative arc
- Hero vigil sequence
- ProcessSection design
- VowMoment (already fixed in Phase 1)
- All images, animations, and motion
- Footer content and legal links

## Expected Impact

- All centered sections will appear truly centered in the viewport
- Consistent label-to-content spacing across all sections
- Proper semantic heading hierarchy (one h2 per section)
- The page reads as a unified, precisely crafted luxury experience with metronomic visual rhythm

