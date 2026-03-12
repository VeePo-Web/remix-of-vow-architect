

# Phase 20: Fix PianoKeyNav — Reliable Visibility, Section Tracking, and Scroll-to-Section

## Diagnosis

Three issues prevent the PianoKeyNav from working reliably:

### 1. IntersectionObserver rootMargin is too restrictive
Current: `rootMargin: '-20% 0px -60% 0px'` with `threshold: 0.3`
This creates a detection window of only 20% of the viewport height (between 20% from top and 60% from bottom). On the user's 672px viewport, that's ~134px. Sections need 30% of their height visible within this tiny band to trigger — nearly impossible for shorter sections.

**Fix:** Widen to `rootMargin: '-10% 0px -40% 0px'` and lower threshold to `0.15`.

### 2. `scrollIntoView` conflicts with Lenis
`document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` fights with Lenis's scroll management, causing jank or no-op scrolling.

**Fix:** Use the Lenis instance via `useSmoothScroll()` hook. Call `lenis.scrollTo(`#${id}`, { offset: -80 })` instead of native scrollIntoView.

### 3. z-index parity with header
Both header and PianoKeyNav are `z-50`. The header is full-width, so its background/backdrop-filter covers the piano keys in overlapping regions. The PianoKeyNav should be `z-45` (below header but above content) or the header should not paint over the right edge.

**Fix:** Set PianoKeyNav to `z-40` — it sits on the right edge away from nav interactions, and only the header's glass blur could overlap. Since the keys are right-aligned and the header content is left/center, this is acceptable. Alternatively, keep `z-50` but this is the lowest-risk issue.

## Implementation

**File: `src/components/PianoKeyNav.tsx`** — 3 changes:

### A. Import and use Lenis for scroll-to
```tsx
import { useSmoothScroll } from './SmoothScrollProvider';
// In component:
const lenis = useSmoothScroll();
```

### B. Fix handleKeyPress to use Lenis
Replace `scrollIntoView` with:
```tsx
const handleKeyPress = useCallback((id: string, index: number) => {
  setPressedIndex(index);
  setTimeout(() => {
    setPressedIndex(null);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, isMobile ? 200 : 80);
}, [isMobile, lenis]);
```

### C. Widen IntersectionObserver detection band
Change from:
```tsx
{ threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
```
To:
```tsx
{ threshold: 0.15, rootMargin: '-10% 0px -40% 0px' }
```

This widens the detection band from 20% to 50% of viewport height, making section tracking far more reliable on shorter viewports.

## Summary

| Change | Current | Fix |
|--------|---------|-----|
| IntersectionObserver | 20% band, 0.3 threshold | 50% band, 0.15 threshold |
| Scroll-to-section | Native `scrollIntoView` | Lenis `scrollTo` with offset |
| Import | None | `useSmoothScroll` hook |

Total: 1 file, 3 targeted edits.

