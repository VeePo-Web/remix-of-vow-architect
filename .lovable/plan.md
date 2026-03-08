

# Teaching Page Polish & Micro-Refinement Pass

The piano key nav labels and visual upgrades are confirmed working. The Teaching page renders without console errors and word spacing is correct. This plan addresses the remaining craft-level issues I identified during the visual audit.

---

## Issues Found

### 1. Section Transition Bands Are Too Harsh
The `SectionFade` component between Pillars (cream) and Methodology (dark) creates a visible hard edge — the gradient `from` value uses `/ 0` opacity which makes the first few pixels fully transparent, causing a sudden jump. The same issue occurs between Threshold (dark) and Stories (cream). These need smoother, longer gradients.

**Fix:** Increase SectionFade height from 80/120px to 120/160px and adjust the gradient to start from a slightly opaque value rather than transparent.

### 2. Duplicate `GoldenThread` Component vs Inline
The `GoldenThread` component defined inline in Teaching.tsx duplicates the breathing dot pattern used across the site. The dot animation (`teaching-dot-breathe`) is defined in TeachingHero's inline styles but referenced from Teaching.tsx — this works because the hero renders first, but is fragile. Move the keyframe to the page-level `<style>` block.

### 3. TeachingCrossing — Bench Image Opacity Too High
At 0.07 opacity the bench image in the Crossing section is quite prominent (visible in screenshots). This competes with the "From Silence; Unto Sound." tagline. Reduce to 0.04 for better text contrast and atmosphere.

### 4. CTA Button Styling Inconsistency
The Offering section CTA ("Open the conversation") and Crossing section CTA ("Sit down with me") both use inline className strings with hardcoded styles instead of the shared `variant="primary-dark"` pattern used on other pages (e.g., FAQ Crossing). Standardize to use the shared button variant for consistency.

### 5. Missing `piano-section-target` Class on Teaching Sections
The FAQ page uses `piano-section-target` class on its section wrappers for potential future scroll-spy enhancements. The Teaching sections lack this class, creating an inconsistency across the codebase.

---

## Implementation

### File: `src/pages/Teaching.tsx`
- Increase `SectionFade` height from `80px`/`120px` to `120px`/`160px`, update negative margins accordingly
- Adjust gradient opacity: change `/ 0)` to `/ 0.15)` for smoother blending
- Move `teaching-dot-breathe` keyframe to the page-level `<style>` block (currently only in TeachingHero inline styles)

### File: `src/components/teaching/TeachingCrossing.tsx`
- Reduce bench image opacity from `0.07` to `0.04`
- Replace inline CTA className with `variant="primary-dark"` from the shared Button component

### File: `src/components/teaching/TeachingOffering.tsx`
- Replace inline CTA className with `variant="primary-dark"` for consistency

---

## Files Modified
1. `src/pages/Teaching.tsx` — smoother section transitions, relocated keyframe
2. `src/components/teaching/TeachingCrossing.tsx` — reduced bench opacity, standardized CTA
3. `src/components/teaching/TeachingOffering.tsx` — standardized CTA

