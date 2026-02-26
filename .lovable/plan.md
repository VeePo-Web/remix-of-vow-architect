

# Round 32 — Piano Key Navigator: Micro-Polish and Interaction Integrity

## Audit of Current State (Post-Round 31)

The PianoKeyNav now includes: first-impression stagger, key press depression, golden thread progress, 3D black keys, tooltips, ARIA semantics, reduced motion, and multi-page integration (About, Pricing, Proof). Five remaining refinements to reach true Fantasy.co caliber:

### Issue 1: `hasAnimated` Ref Does Not Trigger Re-render

The `hasAnimated.current` ref is read during render to conditionally apply `transition-opacity` classes on the `<nav>` element (lines 96-98). However, changing a ref does not cause a re-render. After the stagger completes and `hasAnimated.current` becomes `true`, the nav element still has the old className from the previous render. The conditional `hasAnimated.current ? 'transition-opacity duration-[260ms]' : 'transition-opacity duration-300'` never actually switches. This means the "first-impression only" logic is silently broken -- keys may still re-animate on subsequent scroll toggles because the component never re-renders after the ref flips.

**Fix:** Convert `hasAnimated` from a ref to state, or force a re-render after the timeout fires. Using a state `const [hasAnimated, setHasAnimated] = useState(false)` is the cleanest approach. The timeout in the effect would call `setHasAnimated(true)` instead of mutating a ref.

### Issue 2: Active Key Glow Bleeds Into Adjacent Keys Via Negative Margins

Black keys use `margin-top: -4px; margin-bottom: -4px` for depth overlap. When a black key is active, its `box-shadow: -4px 0 12px hsl(var(--vow-yellow) / 0.08)` bleeds visually into the overlapping white keys above and below. On a real piano, the active glow should be contained to the key itself, not leak through the overlap zone. Adding `overflow: hidden` on the parent wrapper `<div>` for each key would clip the glow -- but this would also clip the tooltip.

**Fix:** Apply `isolation: isolate` on each key button to create a new stacking context, preventing box-shadow bleed without clipping tooltips (which are in the parent div, not the button).

### Issue 3: Tooltip Appears Behind Other Keys on Black Key Hover

Black keys have `z-index: 1` to overlap white keys. But the tooltip is rendered in the parent `<div>` which has no z-index. When hovering a black key near the bottom of the stack, the tooltip can appear behind a white key above it. The tooltip needs a higher stacking context.

**Fix:** Add `z-index: 10` to `.piano-key-tooltip` to ensure it always renders above all keys.

### Issue 4: No Smooth Scroll Offset Accounting

`scrollIntoView({ block: 'start' })` scrolls the section's top edge to the viewport top. The `.piano-section-target` class adds `scroll-margin-top: 64px` which offsets for the header. But some sections (like wrapper `<div>` elements on Pricing/Proof) may not have this class applied directly to the element with the matching `id`. If the `id` is on a wrapper div but `piano-section-target` is on a child, the scroll offset won't apply.

**Fix:** Ensure every element with a piano-nav `id` also has the `piano-section-target` class. Audit all wrapper divs added in Round 31.

### Issue 5: Golden Thread Progress Doesn't Reset When Scrolling Back to Top

When the user scrolls back above the hero and the nav hides, `activeIndex` remains at its last value. If the user scrolls down again, the golden thread immediately shows progress from the previous position rather than starting empty. At Fantasy.co quality, the thread should reset to 0 when the nav becomes invisible.

**Fix:** Reset `activeIndex` to -1 when `isVisible` transitions to `false`.

---

## 5-Step Implementation Plan

### Step 1: Convert `hasAnimated` Ref to State

**File:** `src/components/PianoKeyNav.tsx`

Replace `const hasAnimated = useRef(false)` with `const [hasAnimated, setHasAnimated] = useState(false)`. Update the tracking effect to call `setHasAnimated(true)` instead of `hasAnimated.current = true`. Update all references from `hasAnimated.current` to `hasAnimated`. This ensures the component re-renders after the stagger completes, correctly switching to opacity-only transitions for subsequent visibility toggles.

### Step 2: Add Stacking Context Isolation to Keys

**File:** `src/index.css`

Add `isolation: isolate` to `.piano-key` base styles and `z-index: 10` to `.piano-key-tooltip`. This prevents active-key box-shadow glow from bleeding through negative-margin overlaps and ensures tooltips always render above all keys regardless of black/white key z-index layering.

### Step 3: Reset Active Index on Nav Hide

**File:** `src/components/PianoKeyNav.tsx`

In the scroll handler effect, when `isVisible` transitions to `false`, reset `activeIndex` to -1. This ensures the golden thread progress resets to empty when the user scrolls back to the hero, providing a clean "fresh start" when re-entering the page content.

### Step 4: Audit and Fix Section ID/Class Pairing

**Files:** `src/pages/Pricing.tsx`, `src/pages/Proof.tsx`

Verify that every wrapper `<div>` with a piano-nav `id` also has `piano-section-target` class (which provides `scroll-margin-top: 64px`). Several wrapper divs were added in Round 31 -- confirm they all include both the `id` and the class. Fix any that are missing the class.

### Step 5: Black Key Hover Gradient Consistency

**File:** `src/index.css`

The `.piano-key--black:hover` currently sets `background: hsl(var(--foreground) / 0.08)` which is a flat color, losing the 3D gradient effect on hover. Update it to use a lighter version of the gradient to maintain the depth illusion even during hover interaction:

```css
.piano-key--black:hover {
  background: linear-gradient(
    to bottom,
    hsl(var(--foreground) / 0.12) 0%,
    hsl(var(--foreground) / 0.06) 15%,
    hsl(var(--foreground) / 0.06) 85%,
    hsl(var(--foreground) / 0.03) 100%
  );
}
```

---

## Files Modified Summary

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `src/components/PianoKeyNav.tsx` | `hasAnimated` ref converted to state for proper re-render |
| 2 | `src/index.css` | `isolation: isolate` on keys, `z-index: 10` on tooltip |
| 3 | `src/components/PianoKeyNav.tsx` | Reset `activeIndex` to -1 when nav hides |
| 4 | `src/pages/Pricing.tsx`, `src/pages/Proof.tsx` | Verify all ID'd elements have `piano-section-target` |
| 5 | `src/index.css` | Black key hover retains 3D gradient |

## What This Achieves

- **Correctness:** The first-impression stagger logic actually works now -- React re-renders when the flag flips, switching to opacity-only transitions
- **Visual integrity:** No glow bleed between keys, tooltips always visible above all keys, and black keys maintain their 3D depth even during hover
- **Scroll UX:** Golden thread resets cleanly when revisiting the page from the top, and all sections scroll to the correct offset
- **Zero performance cost:** All fixes are CSS properties or state corrections -- no new observers, no new animation loops

