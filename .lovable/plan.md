
# Homepage Phase 3: Fix Root-Cause Centering Issue + Visual Polish

## The Root Cause (Critical Discovery)

All section headings appearing left-shifted is caused by a **single CSS rule** in `src/index.css` at line 308:

```css
h2, .h2 {
  max-width: 22ch;
}
```

This constrains every h2 to ~22 characters wide. Since h2 is a block element, it defaults to `margin-left: 0`, so the narrow box sits at the LEFT edge of its centered parent container. Adding `text-center` to the h2 only centers text within the narrow 22ch box -- it does NOT center the box itself within the parent.

This single rule is responsible for the left-shifting of headings in TheSound, TheWitness, ThreePaths, TheRecord, TheWitnesses, and CrossOver.

## Fix 1: Center the global h2 constraint (Root Fix)

**File**: `src/index.css` (line 308)

Add `margin-inline: auto` to the global `h2, .h2` rule so the 22ch-constrained block centers itself within any parent container.

Change:
```css
h2, .h2 {
  ...
  max-width: 22ch;
  ...
}
```
To:
```css
h2, .h2 {
  ...
  max-width: 22ch;
  margin-inline: auto;
  ...
}
```

This single line fixes the centering in every section at once, without needing individual `mx-auto` classes on each h2.

**Exception handling**: TheInvitation's h2 is inside a left-aligned 2-column grid content area. Adding `margin-inline: auto` would push it away from the left. Fix: add an explicit override on TheInvitation's h2 with `style={{ marginInline: 0 }}` to keep it left-aligned in the grid context.

## Fix 2: TheInvitation h2 left-alignment override

**File**: `src/components/TheInvitation.tsx`

Add `style={{ marginInline: 0 }}` (merged into existing style object) to the h2 element to override the global `margin-inline: auto` since this heading is intentionally left-aligned within a 2-column layout.

## Fix 3: Remove redundant `text-center` from h2 elements

After Fix 1, the `text-center` classes added in Phase 2 on individual h2 elements become redundant (the block is centered by `margin-inline: auto`, and text within 22ch is already visually balanced). However, keeping `text-center` is harmless and provides explicit intent, so these can stay.

## Fix 4: TheTransformation label not centered

**File**: `src/components/TheTransformation.tsx`

The label "THE TRANSFORMATION" appears left-shifted because `text-center` is applied but the label is a `p` element. The container `div` has `container mx-auto px-4` which should center it. Upon visual inspection, the label appears roughly centered but the optical illusion from the dark/light split makes it seem off. No code change needed -- verified as centered.

## Fix 5: CrossOver guarantee text centering

**File**: `src/components/TheRecord.tsx`

The guarantee quote "If all failsafes fail, your remedy is automatic." is inside a `div` with `text-center`, and the `p` elements have `text-center` added in Phase 2. These are inline text without `max-width` constraints so they should center correctly once the h2 root cause is fixed. No additional change needed.

## Summary of Changes

| File | Change |
|------|--------|
| `src/index.css` | Add `margin-inline: auto;` to `h2, .h2` rule (line ~308) |
| `src/components/TheInvitation.tsx` | Add `marginInline: 0` to h2 style to keep left-aligned in grid |

**Total**: 2 files, 2 lines changed.

## Expected Impact

- Every centered section heading will now appear truly centered in the viewport
- TheInvitation heading remains left-aligned as intended (2-column layout)
- No changes to copy, animations, colors, spacing, or section ordering
- The fix is surgical -- one root CSS property resolves all centering issues simultaneously
