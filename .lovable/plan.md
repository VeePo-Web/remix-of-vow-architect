

# Round 24 — "Hear Me Play" Listening Room: Active Track Visual Feedback + Scroll-Aware Golden Thread

## Critical Audit of Current State (Post-Round 23)

Rounds 20-23 built atmospheric depth, card identity, two-zone scroll reveal, card surfacing with scale, category stagger cascade, blockquote delayed reveal, and live reduced-motion listener. The section now has cinematic scroll choreography and material richness. However, these gaps remain:

### Issue 1: The Golden Thread Does Not Respond to Playback State

The 48px golden thread between the heading and the card is purely decorative. It breathes via `exhale-pulse` on its anchor dots, but it has no connection to audio state. When a track is playing, the thread should intensify — becoming the visual conduit between "Hear me play" (the invitation) and the instrument below. Currently `isPlaying` only adjusts the thread line opacity from default to `0.6`, which is barely perceptible. At Fantasy.co quality, the thread would pulse in sync with the music's presence — a stronger glow, perhaps a subtle height extension, and the anchor dots would shift from their ambient breathing to a brighter, more purposeful state.

### Issue 2: Track Progress Has No Visual Indicator Inside the Card

When a track is playing, the only feedback is the mini waveform bars next to the active track title. There is no progress bar within the card itself. The NowPlayingBar (shown when scrolled away) has a progress bar, but the in-section card does not. At Fantasy.co quality, the active track button would have a subtle progress underline — a thin golden line that grows from left to right as the track plays. This gives the visitor a sense of time and progression without adding clutter.

### Issue 3: The Card Has No "Active State" Border Shift

When a track is playing, the card border remains identical to its idle state. At Fantasy.co quality, the card's border would subtly warm — the top border shifting from `0.18` to `0.28` opacity, the side borders from `0.10` to `0.16` — creating a barely perceptible "the instrument is alive" visual cue that reinforces the box-shadow glow change.

### Issue 4: The Category Dividers Are Static

The thin golden dividers between category groups are always visible once the card appears. At Fantasy.co quality, these dividers would also participate in the stagger cascade — each divider fading in between its adjacent category groups, reinforcing the sequential "laying out" rhythm.

### Issue 5: The Closing Blockquote Diamond Rotation Is Static

The breathing diamond at the bottom uses `divider-diamond-breathe` for opacity, but its `rotate(45deg)` is static. At Fantasy.co quality, the diamond would have a very subtle rotation oscillation (44deg to 46deg over 4.2s) creating a gentle "turning" effect that adds life without distraction.

---

## 5-Step Implementation Plan

### Step 1: Golden Thread Playback Response

**File:** `src/components/TheSound.tsx`

Enhance the golden thread (lines 409-448) to respond to `isPlaying`:

- **Thread line:** When `isPlaying`, increase background opacity from `0.4/0.08` gradient to `0.7/0.2` gradient. Add a subtle outer glow via `filter: drop-shadow(0 0 3px hsl(var(--vow-yellow) / 0.15))` when playing.
- **Anchor dots:** When `isPlaying`, increase top dot from `0.7` to `1.0` opacity and bottom from `0.4` to `0.7`. Change their animation timing from `4.2s` to `2.8s` (faster pulse = more energy).
- **Thread height:** When `isPlaying`, extend from `48px` to `56px` via inline style transition (400ms ease). This creates a subtle "reaching" effect — the thread stretches toward the card as if channeling sound.

All transitions use 700ms ease to match existing opacity transition.

### Step 2: In-Card Track Progress Underline

**File:** `src/components/TheSound.tsx`

For the active track button (inside the `.track-button` render), add a progress indicator:

- After the button content, add an absolutely-positioned bottom line:
```tsx
{isActive && hasSrc && (
  <div
    className="absolute bottom-0 left-0 right-0 h-[1px]"
    style={{
      background: `linear-gradient(to right, hsl(var(--vow-yellow) / 0.4) ${pct}%, transparent ${pct}%)`,
      transition: "none",
    }}
    aria-hidden="true"
  />
)}
```
- Where `pct = duration > 0 ? (progress / duration) * 100 : 0`.
- The button needs `relative` positioning (add `relative` to className).
- This creates a golden progress line that grows from left to right as the track plays, using no animation — just direct width mapping from the `progress` state.

### Step 3: Active State Border Warmth

**File:** `src/components/TheSound.tsx`

In the card container's inline style (lines 461-464), make the border opacity conditional on `isPlaying`:

- `borderTop`: `0.18` idle -> `0.28` playing
- `borderLeft/Right`: `0.10` idle -> `0.16` playing  
- `borderBottom`: `0.06` idle -> `0.10` playing

Since these are already inline styles, change to template literals:
```tsx
borderTop: `1px solid hsl(var(--vow-yellow) / ${isPlaying ? 0.28 : 0.18})`,
```

The existing `transition` property already includes `box-shadow 0.7s`, but borders are not compositable. Add `border-color 700ms ease` to the transition string. Since Tailwind handles transition via the style prop, append it.

### Step 4: Category Divider Stagger Participation

**File:** `src/components/TheSound.tsx`

The category dividers (lines 553-562) currently render unconditionally once the card is visible. Add stagger transitions to match their adjacent category group:

- Each divider appears between `catIdx - 1` and `catIdx`. Its delay should be the midpoint between the two categories' delays: `${100 + (catIdx - 0.5) * 80}ms`.
- Add opacity/transform transition matching the category style:
```tsx
style={{
  opacity: cardVisible ? 1 : 0,
  transition: "opacity 400ms ease",
  transitionDelay: cardVisible ? `${100 + (catIdx - 0.5) * 80}ms` : "0ms",
}}
```

Apply this to the divider wrapper `div`.

### Step 5: Diamond Micro-Rotation + Final Thread Polish

**File:** `src/index.css`

Add a subtle rotation oscillation to the existing `divider-diamond-breathe` keyframes. If the current keyframes only animate opacity, add a secondary rotation:

Create a new keyframe `diamond-turn` in the CSS:
```css
@keyframes diamond-turn {
  0% { transform: translate(-50%, -50%) rotate(44deg); }
  50% { transform: translate(-50%, -50%) rotate(46deg); }
  100% { transform: translate(-50%, -50%) rotate(44deg); }
}
```

**File:** `src/components/TheSound.tsx`

On the breathing diamond element (line 644), change the animation to use both keyframes:
```tsx
animation: reducedMotion ? "none" : "divider-diamond-breathe 4.2s cubic-bezier(0.4,0,0.6,1) infinite, diamond-turn 4.2s ease-in-out infinite",
```

Remove the static `rotate(45deg)` from the inline `transform` since the animation now controls rotation.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/components/TheSound.tsx` | Golden thread responds to isPlaying (opacity, height, glow) |
| 2 | `src/components/TheSound.tsx` | Track progress underline inside active button |
| 3 | `src/components/TheSound.tsx` | Card border opacity warms when playing |
| 4 | `src/components/TheSound.tsx` | Category dividers join stagger cascade |
| 5 | `src/index.css` | `diamond-turn` keyframe for subtle rotation |
| 5 | `src/components/TheSound.tsx` | Diamond uses combined animation |

---

## What This Achieves

- **Responsive thread:** The golden thread becomes a living conduit — stretching and glowing when music flows, creating a visual connection between invitation and instrument
- **Progress feedback:** Visitors see exactly where they are in a track without leaving the card, matching the NowPlayingBar's progress indicator
- **Active warmth:** The card's borders subtly warm during playback, reinforcing the "instrument is alive" metaphor across every visual layer
- **Complete stagger:** Dividers now participate in the cascade, eliminating the jarring instant-appearance that broke the sequential rhythm
- **Diamond life:** The closing diamond gains a micro-rotation that adds dimensionality without distraction

## Technical Notes

- Track progress uses direct style mapping (no animation, no requestAnimationFrame) — zero overhead beyond React's existing `timeupdate` state
- Border transitions are not GPU-composited but at 700ms on 4 elements the cost is negligible
- `diamond-turn` uses `transform` which is GPU-composited
- All new transitions respect the existing `reducedMotion` guard
- No new dependencies, no new images, no layout shifts

