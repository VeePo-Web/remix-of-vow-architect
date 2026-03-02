

# Step 2 Audit + Step 3: Cinematic Image Frame Elevation

## Step 2 Audit — One Critical Bug

### Bug: Background Image Parallax is Dead

The scroll handler sets `bgImage.style.transform = translateY(...) scale(1.05)` but the element also has class `witness-bg-drift` which applies a CSS animation (`witness-ken-burns`) that uses `transform`. **CSS animations override inline style.transform.** The background layer parallax (Layer C in the plan) has zero effect — the Ken Burns animation completely overrides it.

**Fix:** Remove the `witness-bg-drift` class from the background image element. Instead, composite the Ken Burns drift INTO the scroll handler's transform calculation. The scroll handler already runs on every frame via rAF, so it can apply both the slow Ken Burns oscillation AND the parallax offset in a single `transform` string.

The Ken Burns effect is a simple scale(1) to scale(1.06) + translate(-1%, 1%) over 30s. We can replicate this with a time-based sine oscillation inside the scroll handler:

```
const elapsed = (Date.now() % 30000) / 30000; // 0-1 over 30s
const kbProgress = (Math.sin(elapsed * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0-1 sine
const kbScale = 1 + kbProgress * 0.06;
const kbX = -kbProgress * 1;
const kbY = kbProgress * 1;
bgImage.style.transform = `translateY(${parallaxOffset}px) scale(${kbScale}) translate(${kbX}%, ${kbY}%)`;
```

This composites Ken Burns + parallax into one transform, fixing the dead layer.

### Everything Else: Passing

- Image column +-15px: correct, perceptible
- Text column +-4px counter: correct, creates depth differential
- Fog drift via backgroundPosition: correct
- Cleanup resets: correct
- Reduced motion guard: correct

---

## Step 3: Cinematic Image Frame — Deep Elevation

The CSS for `.witness-frame-shimmer` and `.witness-light-bleed` already exists and works. But three issues remain that prevent the frame from reaching Fantasy.co quality:

### Issue A: Frame Lacks Warm Inner Edge Catch

TheInvitation's portrait has a warm inner border that catches simulated candlelight. This frame has only `box-shadow: inset 0 0 0 1px hsl(var(--vow-yellow) / 0.1)` — a flat ring with no depth. Need to add a directional inner glow that simulates light falling from the top-left (matching the warm glow pool positioned at `left: 15%, top: 30%`).

**Fix in CSS:** Add to `.witness-image-frame`:
```css
box-shadow:
  0 8px 32px -8px hsl(45 25% 50% / 0.08),
  0 2px 8px -2px hsl(45 25% 50% / 0.06),
  inset 2px 2px 12px -4px hsl(var(--vow-yellow) / 0.08),
  inset -1px -1px 8px -4px hsl(45 20% 50% / 0.04);
```

The `inset 2px 2px` simulates top-left light; the `inset -1px -1px` adds subtle bottom-right fill.

### Issue B: Frame Hover Should Warm, Not Just Lift

Currently `.witness-image-frame` has no hover state. TheInvitation's portrait subtly warms on hover. Add a hover that increases the inner glow intensity and slightly lifts:

```css
.witness-image-frame:hover {
  box-shadow:
    0 12px 40px -8px hsl(45 25% 50% / 0.12),
    0 2px 8px -2px hsl(45 25% 50% / 0.08),
    inset 2px 2px 16px -4px hsl(var(--vow-yellow) / 0.12),
    inset -1px -1px 8px -4px hsl(45 20% 50% / 0.06);
  transform: translateY(-2px);
}
```

With `transition: box-shadow 180ms ..., transform 180ms ...` on the base class.

### Issue C: Shimmer Opacity Could Be Slightly Higher on Life-Space

The shimmer uses `hsl(var(--vow-yellow) / 0.06)`. On a Life-space cream section, this is at the threshold of perceptibility. Increase to `0.08` for the shimmer gradient center to ensure the candlelight drift is visible.

---

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Remove `witness-bg-drift` class** from the background image element (line 140)
2. **Update scroll handler** to composite Ken Burns oscillation with parallax offset for the background image

### File: `src/index.css`

3. **Update `.witness-image-frame`** box-shadow to include directional inner glow + add hover transition
4. **Add `.witness-image-frame:hover`** with warmed inner glow and subtle lift
5. **Increase shimmer opacity** from `0.06` to `0.08` in `.witness-frame-shimmer::before`
6. **Add reduced-motion fallback** for the new hover transition on `.witness-image-frame`

### What This Achieves

- The background image now genuinely drifts via Ken Burns AND responds to scroll parallax — creating the slowest layer in the 3-layer depth stack (fixing the Step 2 bug)
- The image frame catches warm light from the top-left, matching the glow pool position — creating the illusion that the frame exists in a room with a candle nearby
- Hovering the frame subtly warms and lifts it — acknowledging the visitor's attention without interrupting
- The candlelight shimmer inside the frame becomes perceptible, creating the feeling of reflected warm light drifting across the photograph

