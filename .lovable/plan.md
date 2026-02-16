
# Fix Process Section — Broken Cards, Mirrored Text, and Layout Issues

## The Problem

The Process section ("The Score") has multiple compounding bugs causing cards to appear mirrored (text reads backwards), positioned incorrectly (stuck in top-left corner), and largely invisible. This makes the section appear completely broken.

## Root Causes Identified

### 1. Mirrored Card Text (Critical)
The `LetterpressCard` component applies an inline `transform: perspective(1000px) rotateX() rotateY()` for scroll-linked tilt physics. Combined with `transform-style: preserve-3d` in CSS, this causes the card content to render on the backface (mirrored) when rotation values deviate. The CSS lacks `backface-visibility: hidden`.

### 2. Spring Physics RAF Loop Bug (Critical)
In `useCardPhysics.ts`, the `useEffect` that runs the spring physics animation loop has `tiltX` and `tiltY` in its dependency array (line 161). Every time `setTiltX`/`setTiltY` is called inside the RAF callback, the effect tears down and recreates — causing a stuttering infinite loop rather than smooth animation. This leads to unpredictable tilt values.

### 3. CSS Layout Conflict (Critical)
The `.process-movement` base class sets `max-width: 420px` with `margin-right: auto` / `margin-left: auto` positioning. The `.process-movement--journal` override uses CSS Grid with `grid-template-columns: 55% 1fr`. These two systems fight each other — the base `max-width: 420px` constrains the entire grid item (including the image) to 420px, making cards appear cramped in one corner instead of spanning the full section width.

### 4. Orchestrator-Dependent Reveals (Medium)
Cards only reveal when `isHighlighted` transitions from false to true (rising edge detection). If the orchestrator's scroll progress calculation is off (due to section height issues from the earlier CSS layer bug), cards may never trigger their reveal phase, remaining at `opacity: 0`.

## Fix Strategy

### Fix 1: Eliminate Card Tilt Physics (Simplify)
The scroll-linked 3D tilt effect is causing more harm than good. The spring physics loop is buggy and the perspective transform causes mirrored text. Replace with a simpler, more reliable approach:
- Remove the inline `transform: perspective(...)` from `LetterpressCard`
- Remove the `transform-style: preserve-3d` from CSS
- Add `backface-visibility: hidden` as a safety net
- Keep the `useCardPhysics` hook for light position and shimmer only — zero out tilt values

### Fix 2: Fix Layout — Remove Base Class Conflicts
- Remove `max-width: 420px` from `.process-movement` base class (the journal grid handles sizing)
- Ensure `.process-movement--journal` grid template works without base class interference
- Set the `.process-score` container to full width with proper max-width
- Set `.process-score__movements` to full width within the score

### Fix 3: Add Fallback Reveal Trigger
- Add a local `IntersectionObserver` fallback in `ProcessMovement` that triggers reveal after 2 seconds if the orchestrator hasn't triggered it. This ensures cards always become visible even if the orchestrator timing is off.
- Add `backface-visibility: hidden` to `.letterpress-card` CSS

### Fix 4: Simplify the Card Transform
Instead of the complex spring physics tilt, use a subtle CSS-only hover lift effect:
- `transition: transform 180ms var(--ease-sacred)`
- `.letterpress-card:hover { transform: translateY(-2px) }`
- This matches the brand's 180ms timing standard and is far more reliable

## Files to Modify

| File | Change |
|------|--------|
| `src/components/process/LetterpressCard.tsx` | Remove inline `transform: perspective(...)` from style; keep only CSS vars for light/shimmer |
| `src/hooks/useCardPhysics.ts` | Fix RAF loop: use refs instead of state deps; zero out tilt return values |
| `src/index.css` | Fix `.process-movement` max-width conflict; add `backface-visibility: hidden` to `.letterpress-card`; remove `transform-style: preserve-3d` |
| `src/components/process/ProcessMovement.tsx` | Add IntersectionObserver fallback reveal after 2s timeout |

## Implementation Order

1. Fix CSS layout conflicts (immediate visual fix)
2. Fix LetterpressCard transform (stops mirrored text)
3. Fix useCardPhysics RAF loop (stops performance drain)
4. Add reveal fallback (ensures cards always appear)

## What Will NOT Change

- No text content modifications
- No section order changes
- All other homepage sections remain untouched
- The held breath line animation stays
- The orchestrator hook stays (it drives the line states)
- Card content structure stays (phases, ink bloom text, etc.)
