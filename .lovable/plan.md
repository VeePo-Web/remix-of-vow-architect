

# Design Polish Pass 4 — Fix TheTransformation Center Divider and Final Refinements

## Current State (Confirmed via Full Visual Audit)

All 13 homepage sections render with content at proper heights. The vigil sequence, process cards, VowMoment altar quote, TheInvitation, TheSound track cards, TheTransformation split-screen, TheWitness, and remaining sections are all functional and visually polished.

**Zero console errors.** No broken animations.

## Issue Found: TheTransformation Center Divider Still Not Visible

Despite moving the divider `<div>` outside the grid container in the previous pass, the glowing golden center line between the fears/resolutions panels is NOT visible on desktop. The divider element exists in the DOM with `position: absolute`, `left-1/2`, `z-20`, but it is not rendering visually.

**Root Cause:** The `TheTransformation.tsx` component was fully rewritten in the last pass, and the divider div IS placed correctly after the grid closing tag. However, looking at the component's `<section>` wrapper, it uses `overflow: hidden` via the `.section-grain` class (confirmed in `src/index.css` line 5434: `.process-section { overflow: hidden }`). Wait -- `.section-grain` is a different class. Let me verify: the section uses `className="section-grain relative min-h-[500px] overflow-hidden"` -- the `overflow-hidden` is applied directly as a Tailwind class. Since the divider uses `position: absolute` and spans `top-0 bottom-0`, it should still be visible within the section bounds. The issue is more likely that the divider's `w-[2px]` with a semi-transparent gradient is simply too thin/subtle against the dark left panel's background, or the `z-20` is being overridden by a stacking context created by the panels' `relative` positioning.

**Fix:** 
1. Increase the divider width from `w-[2px]` to `w-[3px]` for better visibility
2. Increase the gradient opacity from `0.6` to `0.8` at midpoint
3. Increase box-shadow glow spread for better ambient visibility
4. Ensure the divider has a higher z-index than both panels (both panels have `relative z-10`, so the divider needs `z-30`)

## Files to Modify

| File | Change |
|------|--------|
| `src/components/TheTransformation.tsx` | Fix center divider z-index (z-30), increase width and glow opacity |

## Technical Details

In `TheTransformation.tsx`, the divider currently has:
- `className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none hidden md:block z-20"`
- Both panels have `relative z-10` on their inner content wrappers

The fix changes:
- `z-20` to `z-30` (above both panel z-10 stacking contexts)
- `w-[2px]` to `w-[3px]` (slightly wider for visibility)
- Gradient midpoint opacity from `0.6` to `0.85`
- Box-shadow spread increased for warmer ambient glow

## What Will NOT Change

- No text content modifications
- No section order changes
- No structural changes to any other component
- All existing animations, transitions, and grain overlays remain
- Color palette ratio (88/6/4) maintained

