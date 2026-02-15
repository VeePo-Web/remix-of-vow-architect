

# World-Class Design Polish Pass — Phase 2

## Issues Identified from Visual Audit

### Critical Bug: Letterpress Card Rendering Upside Down
The Process section's Movement I card (THE LISTENING) renders completely upside down (180 degrees inverted). Root cause: **duplicate `.letterpress-card` CSS definitions** in `src/index.css`. The first definition (line 3781) sets `opacity: 0; transform: translateY(20px);` with the `.is-revealed` state setting `transform: translateY(0)`. The second definition (line 5384, inside a **second** `@layer components` block starting at line 5379) adds `transform-style: preserve-3d` and overrides padding/border-radius. The inline `perspective(1000px) rotateX/rotateY` transform from `useCardPhysics` combined with the conflicting CSS cascade creates the flip. **Fix:** Remove the entire duplicate `@layer components` block (lines 5375-5877) and merge only the unique properties (`transform-style: preserve-3d`, `will-change: transform`) into the original definitions.

### Debug Overlay Still Visible
The `ProcessDebugOverlay` correctly checks `import.meta.env.DEV` (line 40), but in the Lovable preview environment this evaluates to `true`. The overlay is visible in all screenshots. **Fix:** Add an additional URL-based check or simply force-hide via `display: none` on `.process-debug-overlay` in production CSS, or add a `?debug=true` query param requirement.

### Duplicate `@layer components` Block
Lines 5375-5877 open a **second** `@layer components` block that duplicates letterpress card, embossed numeral, paper fiber, gold rule shimmer, ink bloom, and media query definitions already present in lines 3777-4310. This causes CSS specificity conflicts and the upside-down card bug. The entire block must be removed or merged.

## Implementation Steps

### Step 1: Remove Duplicate `@layer components` Block (src/index.css)
Delete lines 5375-5877 entirely. These are duplicate definitions that conflict with the originals at lines 3777-4310. Before deleting, merge any unique properties from the duplicate block into the originals:
- Add `transform-style: preserve-3d; will-change: transform;` to the original `.letterpress-card` at line 3781
- Add `transition: transform 180ms var(--ease-sacred);` to the original definition
- Keep the original `border-radius: 2px` (not the duplicate's `8px`) for the letterpress aesthetic

### Step 2: Hide Debug Overlay (src/components/process/ProcessDebugOverlay.tsx)
Add an additional check beyond `import.meta.env.DEV` to prevent the overlay from showing in preview. Either:
- Check for `?debug=process` in the URL query params, OR
- Simply return `null` unconditionally (the overlay has served its purpose)

### Step 3: Verify Card Rendering
After removing the duplicate CSS, the letterpress cards should render correctly with the original `opacity: 0 -> 1` and `translateY(20px) -> 0` reveal animation, plus the inline 3D perspective tilt from `useCardPhysics`.

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Remove duplicate `@layer components` block (lines 5375-5877), merge unique props into originals (lines 3781-3793) |
| `src/components/process/ProcessDebugOverlay.tsx` | Hide overlay unconditionally or add URL param check |

## Expected Result
- Letterpress cards render right-side-up with correct text direction
- 3D tilt physics still work (max 2.5 degrees) via inline transforms
- Debug overlay no longer visible in preview
- No duplicate CSS definitions causing cascade conflicts
- All 13 sections continue rendering at proper heights

