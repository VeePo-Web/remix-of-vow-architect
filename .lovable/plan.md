

# Step 2: Scroll-Linked Parallax — Quality Upgrade

## The Problem

The parallax implementation exists but is functionally invisible. The offset calculation `(progress - 0.5) * 40 * 0.08` produces a maximum of ±1.6px of movement. At that scale, the human eye cannot perceive any spatial separation between the image column and the text column. For reference, TheInvitation uses ±12px — a range that creates genuine spatial depth without feeling like motion sickness.

Additionally, the text column has no parallax at all. Both columns should move at slightly different rates to create the "looking through a window" depth effect that makes sections feel like rooms rather than panels.

## The Fix

### A. Increase image column parallax to meaningful range
Change `(progress - 0.5) * 40 * 0.08` to `(progress - 0.5) * 30`, producing ±15px of range. This is slightly more than TheInvitation's ±12px because this is a Life-space section with more vertical content — the larger range compensates for the longer scroll distance.

### B. Add text column counter-parallax
Add a ref for the text column and apply a subtler counter-movement: `(progress - 0.5) * -8`, producing ±4px in the opposite direction. The text moves slightly upward as the image moves downward, creating a 19px total differential that reads as genuine spatial depth.

### C. Add background layer parallax
The full-section background image (Layer 1) should also respond to scroll at a slower rate than both columns. Apply `(progress - 0.5) * 6` to create a subtle 3-layer depth stack: background (slowest) / image column (medium) / text column (fastest). This is the standard cinematic parallax hierarchy.

### D. Make fog layers respond to scroll position
The two fog layers (2a, 2b) currently only modulate opacity via `--witness-warmth`. Add a subtle vertical shift to the primary fog's `background-position` so the warm glow pool drifts upward as the visitor scrolls, creating the illusion that the light source is above.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Add text column ref** — `const textColRef = useRef<HTMLDivElement>(null);`
2. **Add bg image ref** — `const bgImageRef = useRef<HTMLImageElement>(null);`
3. **Update scroll handler** — Replace the current ±1.6px offset with:
   - Image column: `(progress - 0.5) * 30` (±15px)
   - Text column: `(progress - 0.5) * -8` (±4px counter-movement)
   - Background image: `translateY(${(progress - 0.5) * 6}px) scale(1.05)` (±3px, maintains Ken Burns scale)
   - Primary fog: shift background-position vertically by `progress * 5%`
4. **Attach refs** — Add `ref={textColRef}` to the right column div, `ref={bgImageRef}` to the Layer 1 img element
5. **Ensure cleanup** — Reset transforms on unmount/reduced-motion

No CSS changes needed — all parallax is applied via inline `style.transform` through `requestAnimationFrame`.

## What This Achieves

The section transforms from a flat panel into a spatially layered room:
- The image column and text column move at different rates, creating the sensation of looking through a window at two different depths
- The background texture drifts at a third, slower rate — establishing a "wall behind the room" feeling
- The warm fog shifts subtly upward as the visitor scrolls, as if the light source is overhead and the viewer is moving through the space
- Total depth differential of ~19px between columns creates perceptible but never distracting spatial separation

