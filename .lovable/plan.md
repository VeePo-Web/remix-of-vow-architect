

# Phase 19: Fix PianoKeyNav Sticky Visibility

## Problem

The PianoKeyNav is `fixed right-0 top-1/2` which should keep it on screen, but it has a visibility gate: it only appears after `scrollY > innerHeight * 0.8`. On the Teaching page, the hero is full-screen (`h-screen`), so the nav only appears after scrolling past the hero. However, once visible, it should remain sticky. The user reports it "won't work right now" — likely two issues:

1. **Visibility threshold too aggressive**: The nav disappears if user scrolls back up near the hero. On shorter viewports (user is at 672px height), 80% = 537px scroll threshold is tight and causes flicker.
2. **z-index conflict**: The nav uses `z-40` but the header, MobileStickyBar, and FullScreenMenu also compete in the z-40-50 range, potentially overlapping.
3. **Pointer-events disabled when hidden**: `pointer-events-none` is applied alongside `opacity-0`, but the transition between states may cause brief unclickable windows.

## Fix

### A. Lower visibility threshold and add hysteresis

Change the scroll threshold from `0.8` to `0.5` so the nav appears sooner. Add a 100px hysteresis buffer so it doesn't flicker on/off at the boundary:

```
// Current: const visible = window.scrollY > window.innerHeight * 0.8;
// Fix: Show earlier, hide later (hysteresis)
const threshold = window.innerHeight * 0.5;
const hysteresis = 100;
const shouldShow = window.scrollY > threshold;
const shouldHide = window.scrollY < (threshold - hysteresis);
if (shouldShow) setIsVisible(true);
else if (shouldHide) setIsVisible(false);
```

### B. Ensure z-index is above header

Bump from `z-40` to `z-50` on both mobile and desktop variants so it layers above the header (`z-40`).

### C. File changes

**`src/components/PianoKeyNav.tsx`** — 3 edits:
1. Lines 36-39: Replace scroll handler with hysteresis logic
2. Line 100: `z-40` → `z-50` (mobile)
3. Line 137: `z-40` → `z-50` (desktop)

Total: 1 file, 3 targeted edits.

