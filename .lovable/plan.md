

# Round 51 — "Hear Me Play": Final Performance Audit and Structural Polish

## Current State After Rounds 45-50

The section has accumulated 6 rounds of refinements: atmospheric gradients, Cormorant typography, premium glass materials, Ken Burns image drift, warm light leak parallax, golden thread connector, staggered track panel reveal, hover lift, heading vow-underline, and cite font harmony. The craft is now layered and rich.

However, this density of animation and decoration introduces two risks: **performance drag** and **visual noise**. A Fantasy.co-caliber section must feel effortless, not heavy. This round focuses on performance optimization, reducing unnecessary re-renders, and cleaning up animation conflicts.

---

## Critique: What Remains Below Fantasy.co Standard

### 1. Scroll Listener Performance

The parallax effect in `TheSound.tsx` attaches a `scroll` listener that calls `setState` on every frame. With two parallax layers now (background image at `1x` and light leak at `0.6x`), this triggers re-renders of the entire component tree (including all 5 genre cards) on every scroll event. Fantasy.co would use `requestAnimationFrame` throttling or CSS `transform` via a ref to avoid React re-renders entirely.

### 2. Ken Burns Animation on 5 Images Simultaneously

All 5 genre card images run a 30-second CSS `ken-burns-drift` animation simultaneously. While CSS animations are GPU-composited, 5 blurred images with `filter: blur(4px)` each being animated creates unnecessary GPU texture pressure. The blur should be baked into the image opacity/overlay approach rather than applied as a live filter during animation, OR the animation should only run on the hovered/active card.

### 3. GenreTrackPanel `ref` Callback Re-mounting

The track panel uses a `ref` callback with `requestAnimationFrame` to trigger its slide-in. This works but fires on every React reconciliation, not just mount. If the parent re-renders (e.g., from scroll state changes), the ref callback fires again. It should use a `useEffect` with a ref instead.

### 4. `transition: all` on Genre Cards

The genre cards use `transition: all 300ms` in their inline styles. This is a performance anti-pattern --- it transitions *every* CSS property change (including layout properties). It should be scoped to `transform, box-shadow, border-color` only.

### 5. Missing `will-change` Hints

The parallax background image and light leak layer are transformed on scroll but lack `will-change: transform` hints, forcing the browser to re-composite on each frame rather than promoting the layers to their own compositor layer upfront.

---

## 5-Step Implementation Plan

### Step 1: Optimize Scroll Parallax to Avoid React Re-renders

Replace the `useState` + `setScrollOffset` approach with a `useRef` that directly mutates the DOM element's `transform` style. This eliminates React re-renders on scroll entirely. The background image div and light leak div will each get their own ref, and the scroll handler will update `ref.current.style.transform` directly.

**File**: `TheSound.tsx` --- refactor the scroll parallax from `useState(scrollOffset)` to direct DOM manipulation via refs.

### Step 2: Scope Ken Burns to Active/Hovered Cards Only

Change the Ken Burns animation to only run on cards that are active or hovered. Inactive, non-hovered cards will have `animation: none` (or `animation-play-state: paused`). This reduces GPU texture work from 5 simultaneous blur+transform animations to at most 2.

**File**: `GenreCard.tsx` --- conditionally apply the `ken-burns-drift` animation based on `isActive` or `isHovered` state.

### Step 3: Fix Track Panel Ref Callback

Replace the `ref` callback approach with a proper `useEffect` + `useRef` pattern that only fires on mount. The panel container gets a stable ref, and a `useEffect` sets `opacity: 1` and `transform: translateY(0)` after the first frame.

**File**: `GenreTrackPanel.tsx` --- replace the `ref` callback with `useRef` + `useEffect`.

### Step 4: Scope Card Transitions

Replace `transition: "all 300ms ..."` on the genre card button with `transition: "transform 300ms ..., box-shadow 300ms ..., border-color 300ms ..."`. This prevents unintended transitions on layout properties and reduces compositor work.

**File**: `GenreCard.tsx` --- update the inline `transition` property.

### Step 5: Add `will-change` Hints to Parallax Layers

Add `willChange: "transform"` to the background image wrapper and the light leak layer div styles. This promotes them to their own compositor layers, enabling smooth GPU-accelerated transforms during scroll.

**File**: `TheSound.tsx` --- add `willChange` to the two parallax div styles.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheSound.tsx` | Ref-based parallax (no re-renders) |
| 2 | `GenreCard.tsx` | Ken Burns only on active/hovered cards |
| 3 | `GenreTrackPanel.tsx` | Stable useRef + useEffect for entrance |
| 4 | `GenreCard.tsx` | Scoped transition properties |
| 5 | `TheSound.tsx` | will-change hints on parallax layers |

## What This Achieves

- Zero React re-renders during scroll (parallax via direct DOM mutation)
- GPU workload reduced from 5 simultaneous blur animations to 1-2
- Track panel entrance fires exactly once, not on every parent re-render
- Card transitions scoped to only the properties that actually change
- Parallax layers promoted to compositor layers for 60fps scrolling
- The section feels lighter and faster while maintaining all visual richness

