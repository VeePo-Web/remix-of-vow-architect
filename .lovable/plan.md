

# Homepage Round 10 — Final Polish and Consistency Audit

After 9 rounds of progressive elevation, all 7 final sections have strong cinematic layering, animated golden threads, directional staggers, and reduced-motion coverage. This round addresses the remaining inconsistencies and missed opportunities discovered in a full code audit.

---

## Findings

### 1. TheWitness missing `aria-hidden="true"` on background image wrapper
The background image wrapper `<div>` at line 33 lacks `aria-hidden="true"`, unlike every other section (TheWitnesses, CrossOver, ThreePaths all have it on the wrapper). Inconsistency.

### 2. TheTransformation mobile golden thread has no scroll-reveal animation
The mobile separator (lines 114-125) is always visible with static opacity. Every other golden thread in the homepage animates on scroll. This feels static compared to the rest.

### 3. Closing quote stagger in TheSound needs refinement
The closing quote block (line 462-483) uses `transitionDelay: "600ms"` but the golden thread connector above the listening room already uses `380ms`. The total reveal sequence is: label (0) -> heading (150) -> subhead (300) -> thread (380) -> listening room (450) -> closing (600). This is correct timing but the closing quote could benefit from a slightly longer delay (700ms) to create a more deliberate pause after the listening room interaction.

### 4. TheWitnesses testimonial cards lack `transition-duration`
The testimonial cards (line 149-155) have `transition-all` but no explicit `duration-700` class, relying on the default `transition-all` duration (150ms). This makes them appear faster than every other section's 700ms reveal. Need to add `duration-700`.

### 5. CrossOver CTA button contrast
The `primary-dark` button variant on the deep dark background may have insufficient contrast. Need to verify the button styles provide adequate visibility.

### 6. ThreePaths card glassmorphism class `three-paths-card` needs verification
The class `three-paths-card` and `three-paths-card--chosen` are referenced but need to be confirmed in CSS to ensure they render correctly.

### 7. Missing `transition-duration` on TheTransformation panel headings
The headings use `duration-900` which is not a standard Tailwind class (Tailwind has `duration-700`, `duration-1000`). This will default to the base transition duration. Should use `duration-1000` or add a custom `duration-[900ms]`.

---

## The 7-Step Plan

### Step 1: Fix TheWitness background wrapper `aria-hidden`
Add `aria-hidden="true"` to the background image wrapper div in `TheWitness.tsx` line 33 for consistency with all other sections.

**File:** `src/components/TheWitness.tsx`

### Step 2: Animate TheTransformation mobile golden thread on scroll
Replace the static mobile separator with a scroll-reveal version using the existing `isVisible` state and `scale-x` animation pattern, matching ThreePaths' reassurance thread.

**File:** `src/components/TheTransformation.tsx`

### Step 3: Refine TheSound closing quote delay
Increase the closing quote `transitionDelay` from `600ms` to `700ms` for a more deliberate pause after the listening room card.

**File:** `src/components/TheSound.tsx`

### Step 4: Fix TheWitnesses testimonial card transition duration
Add explicit `duration-700` to the testimonial card transition classes to match the 700ms standard used across all other sections.

**File:** `src/components/TheWitnesses.tsx`

### Step 5: Fix TheTransformation heading transition duration
Replace `duration-900` (invalid Tailwind class) with `duration-[900ms]` for correct custom duration, or standardize to `duration-700` for consistency.

**File:** `src/components/TheTransformation.tsx`

### Step 6: Verify ThreePaths card CSS classes exist
Search for `three-paths-card` in CSS and confirm glassmorphism styles are defined. If missing, add them.

**File:** `src/index.css` (if needed)

### Step 7: Add reduced-motion fallback for CrossOver dust animation
Verify the `crossover-dust` animation has proper reduced-motion coverage (was added in Round 7 but should be confirmed still present after subsequent edits).

**File:** `src/index.css` (verification only, fix if needed)

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `TheWitness.tsx` | Add aria-hidden to bg wrapper |
| 2 | `TheTransformation.tsx` | Animate mobile golden thread |
| 3 | `TheSound.tsx` | Adjust closing quote delay |
| 4 | `TheWitnesses.tsx` | Fix transition duration |
| 5 | `TheTransformation.tsx` | Fix heading duration class |
| 6 | `src/index.css` | Verify/add card classes |
| 7 | `src/index.css` | Verify reduced-motion coverage |

No copy changes. No new dependencies. Pure consistency and accessibility polish.

