

# Critical Fix: Homepage Sections Invisible — Root Cause Analysis and Design Polish

## Problem Summary

The homepage appears to jump from the Hero/Exhale directly to CrossOver/Footer. All middle sections (Process, VowMoment, TheInvitation, TheSound, TheTransformation, TheWitness, ThreePaths, TheSacredGround, TheRecord, TheWitnesses) exist in the DOM but are visually invisible due to two CSS-level issues.

## Root Cause 1: `.section--dark` Sets Black Text (CRITICAL)

In `src/index.css` line 670-673:
```css
.section--dark {
  background-color: hsl(var(--surface-dark-band));
  color: hsl(var(--ink-inverse));
}
```

`--ink-inverse` resolves to `var(--rich-black)` = `240 9% 4%` (nearly black). This sets ALL inherited text color to black on dark sections. While some components now use explicit `text-foreground` Tailwind utilities that override this, many child elements (labels, body text, list items, icons) still inherit the black color.

**Fix:** Change `color: hsl(var(--ink-inverse))` to `color: hsl(var(--foreground))` in the `.section--dark` rule. In the death theme, `--foreground` = `var(--absolute-white)` = white, which is correct for dark backgrounds.

## Root Cause 2: `App.css` Leftover Vite Defaults (MEDIUM)

`src/App.css` contains Vite scaffold defaults:
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
```

This constrains the entire app to 1280px width, adds unwanted padding, and forces center text alignment globally. Full-bleed sections like the hero, TheTransformation split, and dark background sections are clipped or mis-aligned.

**Fix:** Remove all contents of `App.css` or delete the file entirely. The `index.css` design system handles all styling.

## Implementation Steps

### Step 1: Fix `.section--dark` text color in `src/index.css`

Change line 672 from:
```css
color: hsl(var(--ink-inverse));
```
to:
```css
color: hsl(var(--foreground));
```

This single change fixes text visibility in VowMoment, TheSound, ThreePaths, TheRecord, CrossOver, and the Footer — every section using the `section--dark` class.

### Step 2: Clean up `src/App.css`

Remove the `#root` rule entirely (lines 1-6). This file is a leftover from the Vite scaffold and conflicts with the full-width layout. Either empty the file or remove the `#root` block.

### Step 3: Verify existing `data-theme="life"` on light sections

Already applied in previous fix:
- TheWitness: has `data-theme="life"` (confirmed)
- TheWitnesses: has `data-theme="life"` (confirmed)
- TheSacredGround: has `data-theme="life"` (confirmed)
- TheInvitation: has `data-theme="life"` (confirmed)

No additional changes needed for light sections.

## Files Modified

| File | Change |
|------|--------|
| `src/index.css` (line 672) | `color: hsl(var(--ink-inverse))` to `color: hsl(var(--foreground))` |
| `src/App.css` (lines 1-6) | Remove `#root` rule entirely |

## Expected Result

After these two changes:
- All dark sections render white text on dark backgrounds
- All light sections render dark text on cream backgrounds (via `data-theme="life"`)
- Full-width sections (hero, TheTransformation split) extend edge-to-edge
- The homepage scrolls through all 13 sections with proper breathing rhythm

## Technical Notes

- This is a 2-line fix addressing the systemic root cause rather than patching individual components
- The `.section--dark` rule in `@layer components` sets inherited color; Tailwind utilities on individual elements override it, but elements without explicit `text-*` classes inherit the parent's color
- After this fix, the world-class design polish pass (animation consistency, typography, micro-interactions) can proceed on a visible, functional foundation

