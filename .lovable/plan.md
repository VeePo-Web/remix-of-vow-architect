

# Round 52 — "Hear Me Play": Interaction Polish and Accessibility Hardening

## Current State Assessment

After Rounds 45-51, the section has achieved: ref-based parallax (zero re-renders), scoped Ken Burns animations, premium glass materials on all floating components, staggered track panel reveals, brand-standard easing, golden thread connector, Cormorant typography consistency, heading vow-underline, and will-change compositor hints. The visual craft and performance are both strong.

Two remaining areas fall short of a true Fantasy.co finish: **interaction feedback clarity** and **accessibility gaps**.

---

## Critique: What Remains Below Fantasy.co Standard

### 1. Genre Card Click Response Feels Ambiguous

When clicking a genre card, the only feedback is the border brightening and scale shifting to 1.02. There is no momentary "press" state --- the card jumps directly from resting to active. Fantasy.co interactions include a brief depression (scale 0.98 for 80ms) before the active state, giving tactile confirmation that the click registered. This is the "key depression" feel documented in the motion standards.

### 2. Track Panel Header Is Missing

The `GenreTrackPanel.tsx` renders `{/* Header */}` followed by `...` --- the header section appears to be collapsed or missing in the view. Looking at the rendered screenshot, the panel shows three dots (...) at the top instead of a proper genre label header. This is a content gap --- the panel should clearly show which genre is displayed and include a track count.

### 3. Track Buttons for Empty Sources Need Better Affordance

Tracks with no `src` (marked "Coming Soon") still render as `<button>` elements but with `cursor-default` and muted styling. This creates a misleading interactive affordance --- screen readers announce them as buttons, but clicking does nothing. They should render as `<div>` elements or have `aria-disabled="true"` and `role="listitem"`.

### 4. Genre Card Grid Keyboard Navigation

Genre cards are `<button>` elements (good), but there is no arrow-key navigation between them. When a user tabs to a card and presses ArrowRight, nothing happens. For an audio browsing interface, arrow-key navigation between cards would match expected keyboard patterns.

### 5. Closing Quote Transition Feels Disconnected

The closing quote uses `transition: opacity 1000ms ease, transform 1000ms ease` --- a full second for a simple fade-and-rise. This is slower than any other reveal in the section (which use 500-700ms). The sluggish timing breaks the section's rhythm and feels indulgent rather than composed. It should match the 700ms standard.

---

## 5-Step Implementation Plan

### Step 1: Add Press State to Genre Cards

Add a momentary scale(0.98) press effect using `onMouseDown` / `onMouseUp` state. When the user presses the card, it scales to 0.98 for the duration of the press, then transitions to the active scale (1.02) or resting (1.0) on release. This takes 80ms for the press and uses the brand easing curve.

**File**: `GenreCard.tsx` --- add `isPressed` state via `onMouseDown`/`onMouseUp`, incorporate into `transform` logic.

### Step 2: Restore Track Panel Header

Add a proper header to `GenreTrackPanel` showing the genre label and track count. The header should use `font-display` uppercase tracking, muted foreground color, with a thin separator line beneath it --- matching the PianoPanel's category header treatment.

**File**: `GenreTrackPanel.tsx` --- replace the `{/* Header */} ...` block with a proper genre header div.

### Step 3: Fix Empty Track Accessibility

Change tracks with no `src` from `<button>` to `<div role="listitem">` or add `aria-disabled="true"` and `tabIndex={-1}` to prevent them from being interactive targets. Remove the `onClick` handler entirely when `!hasSrc`.

**File**: `GenreTrackPanel.tsx` --- conditionally render non-interactive element for tracks without sources.

### Step 4: Add Arrow-Key Navigation to Genre Grid

Add `onKeyDown` handler to genre cards that supports `ArrowRight` / `ArrowLeft` for horizontal navigation. When a card is focused and ArrowRight is pressed, focus moves to the next card. This uses `ref` array or `document.querySelector` to find sibling cards.

**File**: `TheSound.tsx` --- add keyboard navigation logic to the genre card grid container.

### Step 5: Tighten Closing Quote Timing

Reduce the closing quote's transition duration from 1000ms to 700ms, matching the section's established reveal rhythm. Also reduce the `transitionDelay` from 200ms to 150ms for a crisper entrance.

**File**: `TheSound.tsx` --- update the quote container's transition timing.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `GenreCard.tsx` | Press state (scale 0.98) on mousedown |
| 2 | `GenreTrackPanel.tsx` | Proper genre header with label + count |
| 3 | `GenreTrackPanel.tsx` | Accessible non-interactive empty tracks |
| 4 | `TheSound.tsx` | Arrow-key navigation on genre grid |
| 5 | `TheSound.tsx` | Quote reveal timing tightened to 700ms |

## What This Achieves

- Genre cards have tactile "key press" feedback matching the piano metaphor
- Track panel clearly communicates which genre is displayed
- Screen readers and keyboard users get correct semantics for non-playable tracks
- Arrow-key navigation enables efficient genre browsing without mouse
- Section rhythm is consistent --- no element reveals slower than 700ms
- The section meets WCAG 2.1 AA interaction standards

