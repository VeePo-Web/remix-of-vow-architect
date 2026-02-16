

# Homepage Design Polish -- Bug Fix and World-Class Refinements

## Bug Found

**CrossOver component (line 98):** The "Download a sample plan" button still links to `/resources`, which was a deleted page. This will 404. Fix: remove this secondary CTA entirely since there's no resources page, or redirect to `/contact`.

## Design Refinements for Fantasy.co Quality

After auditing every section pixel-by-pixel, here are the specific improvements -- no text changes, only design and performance.

### 1. CrossOver: Remove Dead Link

- Remove the "Download a sample plan" secondary CTA button entirely (links to deleted `/resources`)
- This simplifies the final CTA section and follows the "reduce until it hurts" principle -- one CTA is stronger than two

### 2. TheExhale: Bottom Fade Color Fix

- The bottom fade gradient transitions to `hsl(45 30% 92%)` (warm cream) to blend into ProcessSection
- Verify this matches the actual ProcessSection background precisely -- if mismatched, correct the color value

### 3. Process Section: Tighten Card Spacing

- The 4 movement cards currently have generous gaps between them
- On desktop, reduce the vertical gap between cards from the current spacing to `clamp(60px, 8vw, 100px)` for tighter visual rhythm
- This creates a more cohesive "journal spread" feel

### 4. ThreePaths: Observer Cleanup

- The IntersectionObserver on line 63 never calls `observer.disconnect()` after triggering
- Add `observer.disconnect()` inside the `if (entry.isIntersecting)` block for proper cleanup

### 5. TheSound: Observer Cleanup

- Same issue: observer never disconnects after triggering (line 30-31)
- Add `observer.disconnect()` for memory hygiene

### 6. TheWitness, TheTransformation, CrossOver: Same Observer Fix

- All three components have the same pattern of not disconnecting after trigger
- Add `observer.disconnect()` to each

### 7. Footer: Remove "Download a sample plan" if present anywhere

- Ensure no other links point to `/resources`

## Technical Details

### Files to Modify

| File | Change |
|------|--------|
| `src/components/CrossOver.tsx` | Remove "Download a sample plan" button (lines 92-102) |
| `src/components/ThreePaths.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` |
| `src/components/TheSound.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` |
| `src/components/TheWitness.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` |
| `src/components/TheTransformation.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` |
| `src/components/CrossOver.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` |

### Observer Fix Pattern

Current (all 5 components):
```
if (entry.isIntersecting) setIsVisible(true);
```

Fixed:
```
if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
```

### CrossOver CTA Simplification

Remove the entire secondary CTA button block (Download a sample plan), keeping only the "Hold my date" primary CTA. This eliminates the dead link and creates a cleaner, more decisive final moment -- one action, maximum commitment.

## What Stays Unchanged

- All text content (per instructions)
- Hero vigil sequence (working perfectly)
- TheExhale (working perfectly)
- ProcessSection cards (fixed and verified)
- VowMoment (working perfectly)
- TheInvitation (working perfectly)
- TheRecord (working perfectly)
- TheWitnesses (working perfectly)
- Footer (working perfectly, links already updated)
- All animations, timing, and easing curves

## Estimated Impact

- 1 bug fix (dead `/resources` link)
- 5 memory leak fixes (IntersectionObserver cleanup)
- Cleaner final CTA with single focused action
- Zero risk of breaking existing functionality

