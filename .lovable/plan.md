

# Round 16 — Process Intro Audit and Bug Fixes

## Audit Findings

After reviewing the Round 15 implementation, I found two CSS bugs that break intended behavior and one structural issue:

### Bug 1: Candlelight Parallax Is Completely Broken

The candlelight glow pools have `transform: translateY(calc(var(--process-scroll-y, 0) * 0.05))` applied via the CSS rule at line 3368. However, the `candlelight-flicker` keyframes animation (line 3401-3410) sets `transform: scale(1)` and `transform: scale(1.1)` -- CSS animation keyframes **override** any static `transform` property. The parallax translateY is being clobbered every frame by the animation.

**Fix**: Combine the parallax translateY into the keyframes themselves, or use a wrapper approach. The simplest fix: change the candlelight `transform` property to use `translate` (the individual property) instead of the shorthand, and change the keyframes to use `scale` (individual property) instead of the shorthand `transform`. Modern CSS supports individual transform properties (`translate`, `scale`, `rotate`) that compose independently.

### Bug 2: Duplicate Paper Selector Creates Ambiguity

There are two `.gradient-dawn--journal .gradient-dawn__paper` blocks:
- Lines 3341-3353: Original with `position: absolute; inset: 0; background: ...; opacity: 0.5`
- Lines 3372-3375: Added in Round 15 with only `transform` and `transition`

While CSS cascade means the second block adds to the first (no override conflict here), it is poor practice and could cause confusion. These should be merged into a single rule.

### Bug 3: Candlelight Flicker Keyframes Reset Scale During Parallax

Even after fixing the transform composition, the `candlelight-flicker` keyframes use `transform: scale()` which means on browsers that don't support individual transform properties (older Safari), the parallax will still break. Need a fallback.

---

## The 5-Step Fix Plan

### Step 1: Fix Candlelight Parallax with Individual Transform Properties

Change the candlelight elements to use `translate` (individual CSS property) for parallax and `scale` (individual CSS property) for the flicker animation, so they compose independently without overriding each other.

**File:** `src/index.css` (lines 3355-3370)
- Change `transform: translateY(...)` to `translate: 0 calc(var(--process-scroll-y, 0) * 0.05)`
- Remove `transition: transform 0ms` (unnecessary with individual properties)

**File:** `src/index.css` (lines 3401-3410)
- Change `candlelight-flicker` keyframes from `transform: scale(1)` / `transform: scale(1.1)` to `scale: 1` / `scale: 1.1`

### Step 2: Merge Duplicate Paper Selector

Combine the two `.gradient-dawn--journal .gradient-dawn__paper` blocks (lines 3341-3353 and 3372-3375) into a single rule with all properties.

**File:** `src/index.css`
- Add `translate: 0 calc(var(--process-scroll-y, 0) * 0.02)` to the first paper selector block at line 3341
- Delete the duplicate second block at lines 3372-3375

### Step 3: Add will-change Hint for Active Parallax

The parallax elements should use `will-change: translate` only when the section is in viewport to hint the browser to promote to a compositing layer.

**File:** `src/index.css`
- Add `.process-section .gradient-dawn__candlelight, .process-section .gradient-dawn__paper { will-change: translate; }` scoped to when section is visible

### Step 4: Verify Flame Ignition Animation Chain

The flame-ignite keyframes use `transform: scale()` shorthand. Since the anchor dot does not have parallax, this is fine -- but for consistency and future-proofing, change to individual `scale` property.

**File:** `src/index.css` (lines 1795-1814)
- Change `flame-ignite` keyframes from `transform: scale(0)` etc. to `scale: 0` etc.
- Update the anchor dot's initial `transform: scale(0)` to `scale: 0`

### Step 5: Add Reduced Motion Guard for Parallax

The scroll-linked parallax in ProcessSection.tsx already checks `prefers-reduced-motion`, but the CSS should also have a fallback that resets `translate` to `none` under reduced motion.

**File:** `src/index.css` (in the existing `@media (prefers-reduced-motion: reduce)` block around line 2005)
- Add rules to reset `translate` and `scale` for candlelight and paper elements

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.css` | Fix candlelight parallax: individual `translate` + `scale` properties |
| 1 | `src/index.css` | Fix `candlelight-flicker` keyframes to use `scale` property |
| 2 | `src/index.css` | Merge duplicate paper selector |
| 3 | `src/index.css` | Add `will-change: translate` for parallax layers |
| 4 | `src/index.css` | Fix `flame-ignite` keyframes to use individual `scale` property |
| 5 | `src/index.css` | Add reduced-motion guards for parallax properties |

Single file change. No copy changes. No new dependencies. Pure bug fixes to make Round 15 animations work as intended.

