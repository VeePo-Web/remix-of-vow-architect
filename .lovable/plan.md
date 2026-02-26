
# Homepage Final Audit — Round 7: Reduced-Motion Gaps, Semantic Fixes, and Performance Cleanup

## Current State

After six rounds of polish, the homepage is in strong shape. The visual system is cohesive, section fades are seamless, diamond separators are standardized, Ken Burns animations have named keyframes, and CSS containment is in place. However, a thorough code audit reveals these remaining gaps:

## Issues Found

1. **Reduced-motion coverage is incomplete for 4 animations.** The `divider-breathe` animation on TheTransformation's center divider (line 184), the `exhale-glow-breathe-layer` class on TheExhale (line 60), the `vigil-pulse` on the WitnessHero glow point, and the `crossover-dust` floating particle animation on CrossOver (line 39) all lack `prefers-reduced-motion` fallbacks. Users who prefer reduced motion will still see these continuous animations.

2. **TheTransformation divider `divider-breathe` keyframe is nested inside a CSS layer.** It is defined at line 3795 inside what appears to be a scoped block, but the reduced-motion query at line 3820 does not cover it. Need to add it to the final reduced-motion block at line 4299.

3. **SVG filter ID collision risk in TheExhale.** The `id="threadGradient"` and `id="threadGlow"` in the SVG are globally scoped. If a future refactor renders two instances, IDs will collide. Should use `useId()` or unique suffixes. Low risk but defensive.

4. **MobileStickyBar grain overlay has `will-change: opacity`** (line 28) but the grain never animates — it is static at `opacity-[0.04]`. This is an unnecessary GPU layer.

5. **TheSound section has redundant `min-h-[400px]` both as a class and inline style** (line 268-269). The inline `minHeight: '400px'` duplicates the Tailwind class.

6. **Footer "Reach Me" email/phone links lack `aria-label`** (lines 154, 159). The social icon links have labels, but these inline text links in the grid also benefit from explicit labels for consistency.

7. **TheInvitation portrait `will-change-transform`** (line 65) is on the Ken Burns image which IS continuous — this is correct. However, the `invitation-ken-burns` class should be verified to exist in CSS and have a reduced-motion fallback. Confirmed it does exist at line 3857.

---

## The 7-Step Plan

### Step 1: Add Reduced-Motion Fallbacks for Missing Animations

Add `divider-breathe`, `crossover-dust`, and `exhale-glow-breathe-layer` to the reduced-motion query block at the end of `src/index.css`.

**File:** `src/index.css` (append to the final `@media (prefers-reduced-motion)` block at line 4299 or add a new block after line 4355)

### Step 2: Remove MobileStickyBar Grain `will-change`

Remove `will-change: "opacity"` from the static grain overlay in `MobileStickyBar.tsx` line 28.

**File:** `src/components/MobileStickyBar.tsx`

### Step 3: Remove Redundant `minHeight` Inline Style from TheSound

The `min-h-[400px]` Tailwind class already handles this. Remove the duplicate `style={{ minHeight: '400px' }}` from line 269.

**File:** `src/components/TheSound.tsx`

### Step 4: Add `aria-label` to Footer Grid Email/Phone Links

Add descriptive `aria-label` attributes to the email and phone links in the "Reach Me" column (lines 154, 159).

**File:** `src/components/Footer.tsx`

### Step 5: Deduplicate SVG Filter IDs in TheExhale

Use React's `useId()` hook to generate unique IDs for the SVG gradient and glow filter, preventing potential ID collisions.

**File:** `src/components/TheExhale.tsx`

### Step 6: Remove Redundant `minHeight` from TheWitnesses and ThreePaths

Both components have `style={{ minHeight: '400px' }}` or `'500px'` alongside Tailwind `min-h-*` classes. Consolidate to Tailwind-only for consistency.

**Files:** `src/components/TheWitnesses.tsx`, `src/components/ThreePaths.tsx`

### Step 7: Final Reduced-Motion Verification

Verify all continuous animations across the entire homepage have `prefers-reduced-motion` fallbacks. Cross-check every `animation:` property in component files against CSS fallback coverage.

---

## Files Modified Summary

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `src/index.css` | Reduced-motion fallbacks for 3 animations |
| 2 | `MobileStickyBar.tsx` | Remove static `will-change` |
| 3 | `TheSound.tsx` | Remove duplicate minHeight |
| 4 | `Footer.tsx` | Aria labels on grid links |
| 5 | `TheExhale.tsx` | useId for SVG filter IDs |
| 6 | `TheWitnesses.tsx`, `ThreePaths.tsx` | Remove duplicate inline minHeight |
| 7 | All files | Final reduced-motion audit |

No content changes. No new dependencies. Pure accessibility, performance, and code hygiene.
