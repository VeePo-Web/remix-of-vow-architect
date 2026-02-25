

# Refactor: Eliminate Duplicated IntersectionObserver Boilerplate Across Homepage Sections

## Problem

Eight homepage sections each copy-paste the same 8-12 line pattern: check `prefers-reduced-motion`, create an `IntersectionObserver`, observe, set `isVisible`, disconnect. This is approximately 80 lines of identical logic spread across 8 files.

A perfectly capable `useScrollReveal` hook already exists at `src/hooks/useScrollReveal.ts` but none of these sections use it. They all roll their own.

Additionally, thresholds are inconsistent -- TheExhale uses `0.3`, TheInvitation uses `0.2`, and the remaining 6 sections all use `0.15`. This creates an uneven "popcorn" reveal pattern where some sections animate too early during fast scrolling and others animate too late.

## The Refinement

Replace the hand-rolled `IntersectionObserver` boilerplate in each section with a single call to the existing `useScrollReveal` hook. Normalize thresholds to `0.2` for all sections except TheExhale (which keeps `0.3` for its unique two-phase reveal).

### Technical Changes

**No changes to `src/hooks/useScrollReveal.ts`** -- the hook already supports `threshold`, `rootMargin`, `triggerOnce`, and `delay` options and returns `{ ref, isVisible, hasTriggered }`. It already handles `prefers-reduced-motion`.

**Update 8 section files to use the hook:**

Each file follows the same pattern. Replace the manual `useRef` + `useState` + `useEffect` block with:

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Replace:
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   useEffect(() => { ... IntersectionObserver boilerplate ... }, []);
// With:
const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
```

**Files and specific details:**

1. **`TheInvitation.tsx`** (lines 14-45) -- Remove `useRef`, `useState`, `useEffect` imports where no longer needed. Replace with `useScrollReveal({ threshold: 0.2 })`. Remove `useEffect` block entirely.

2. **`TheTransformation.tsx`** (lines 22-31) -- Same pattern. Threshold changes from `0.15` to `0.2`.

3. **`TheWitness.tsx`** (lines 22-31) -- Same pattern. Threshold changes from `0.15` to `0.2`.

4. **`ThreePaths.tsx`** (lines 57-66) -- Same pattern. Threshold changes from `0.15` to `0.2`.

5. **`TheRecord.tsx`** (lines 17-26) -- Same pattern. Threshold changes from `0.15` to `0.2`.

6. **`TheWitnesses.tsx`** (lines 27-36) -- Same pattern. Threshold changes from `0.15` to `0.2`.

7. **`CrossOver.tsx`** (lines 8-17) -- Same pattern. Threshold changes from `0.15` to `0.2`.

8. **`TheSound.tsx`** (lines 82-114) -- Replace only the first `useEffect` (visibility observer). Keep the second `useEffect` (sectionInView tracking for mini-bar) as-is since it serves a different purpose (non-once observation). Threshold changes from `0.15` to `0.2`.

**Special case: `TheExhale.tsx`** -- This section has a two-phase reveal (`isVisible` then `purposeVisible` with a 1600ms delay). Use `useScrollReveal({ threshold: 0.3, rootMargin: '-40px 0px' })` for the primary visibility, but keep the local `useState` for `purposeVisible` and a small `useEffect` that triggers `setPurposeVisible(true)` after 1600ms when `isVisible` becomes true.

## What Stays Unchanged

All visual design, copy, imagery, animation timing, stagger delays, layout, typography, section ordering, fade gradients, and responsive behavior. This is purely a structural refactor.

## Expected Impact

- ~80 lines of duplicated observer boilerplate eliminated
- Single point of control for reveal timing (adjust the hook's defaults to change all sections)
- Consistent `0.2` threshold creates a uniform, cinematic scroll reveal cadence
- Reduced motion handling centralized in one place
- Each section file becomes ~8 lines shorter and easier to maintain

