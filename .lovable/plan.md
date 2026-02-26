

# Round 30 — "Hear Me Play" Listening Room: Ambient Presence, Playback Continuity, and Emotional Microdetail

## Critical Audit of Current State (Post-Round 29)

Rounds 20-29 delivered: atmospheric imagery with scroll parallax, piano strings, two-zone scroll reveal, category stagger, golden thread playback response, in-card progress underline, active border warmth, divider stagger, diamond micro-rotation, track hover accent bar, Coming Soon dimming, NowPlayingBar glass material with seekable progress (seek head dot) and title crossfade, warm floor parallax, blockquote hover warmth with independent scroll reveal, golden focus rings, ARIA semantics, Escape-to-stop, mobile touch targets, bounded card with golden scrollbar, scroll-to-active, time display, track numbers, note bloom, footer link warmth, track button press feedback, and card inner shadow depth.

Five remaining gaps in ambient presence, playback continuity, and emotional microdetail:

### Issue 1: The Scroll Parallax Causes Unbounded Offset on Long Pages

The `scrollOffset` state updates on every scroll event using `-rect.top * 0.05`. On a long page, if the section is far from the top, `rect.top` can be very negative (e.g., -3000px), resulting in a 150px offset that pushes the background image out of its container. There is no clamping. At Fantasy.co quality, the offset would be clamped to a safe range (e.g., -40px to +40px) to prevent the background from ever visibly departing its container bounds.

### Issue 2: The Golden Thread Has No Playback-Linked Pulse Frequency

The golden thread dots use a fixed `exhale-pulse` animation frequency (2.8s playing, 4.2s idle). But the thread does not respond to the actual tempo or progress of the audio. At Fantasy.co quality, the thread would subtly shift its breathing rate based on whether audio is actively progressing (faster when playing, slower when paused) -- creating a subconscious link between the visual heartbeat and the audio state. This is already partially implemented (2.8s vs 4.2s) but the transition between states is abrupt. Adding `transition: animation-duration` does not work in CSS, so instead the approach is to use a CSS custom property `--pulse-duration` that smoothly updates.

### Issue 3: The Card Breathing Animation Continues Even When Card Is Not Visible

The `sound-card-breathe` animation runs continuously once the card is visible, even after the user scrolls past the section. At Fantasy.co quality, animations that are not visible should be paused to save GPU resources. The card should only breathe when `sectionInView` is true and `!isPlaying`.

### Issue 4: No Hover State on the Blockquote Quote Text

The blockquote has a `blockquote-warm` class applied but the actual warmth effect is minimal. At Fantasy.co quality, hovering over the quote would subtly warm the text color from `foreground/80` toward a slightly golden tint -- reinforcing the brand's vow-yellow language at every touchpoint. This is a CSS-only enhancement.

### Issue 5: The NowPlayingBar Has No Keyboard Seek Support

The seek bar accepts click input but has no keyboard interaction. At Fantasy.co quality, when the seek bar has focus, left/right arrow keys would adjust the position by 5% increments, and Home/End would jump to start/end. This is essential ARIA compliance for `role="slider"`.

---

## 5-Step Implementation Plan

### Step 1: Clamp Scroll Parallax Offset

**File:** `src/components/TheSound.tsx`

In the scroll parallax `useEffect`, clamp the computed offset:

```tsx
const handleScroll = () => {
  const rect = el.getBoundingClientRect();
  const raw = -rect.top * 0.05;
  setScrollOffset(Math.max(-40, Math.min(40, raw)));
};
```

This ensures the background image never shifts more than 40px in either direction, preventing visual artifacts on long pages or rapid scrolling.

### Step 2: Conditional Card Breathing Animation

**File:** `src/components/TheSound.tsx`

Update the card's `animation` property to also check `sectionInView`:

```tsx
animation: !isPlaying && !reducedMotion && sectionInView
  ? "sound-card-breathe 6s cubic-bezier(0.4,0,0.6,1) infinite"
  : "none",
```

This pauses the breathing CSS animation when the section scrolls out of view, saving GPU compositing work. When the user scrolls back, the animation restarts naturally.

### Step 3: Blockquote Hover Warmth Enhancement

**File:** `src/index.css`

Enhance the existing `.blockquote-warm` class with a hover state that shifts text color toward golden:

```css
.blockquote-warm {
  transition: color 300ms ease;
}
.blockquote-warm:hover {
  color: hsl(var(--vow-yellow) / 0.85);
}
```

This creates a subtle warmth on hover that reinforces the brand accent at every text interaction.

### Step 4: Keyboard Seek Support on NowPlayingBar

**File:** `src/components/TheSound.tsx`

Add `tabIndex={0}` and an `onKeyDown` handler to the seek bar container in `NowPlayingBar`:

```tsx
tabIndex={0}
onKeyDown={(e) => {
  const step = 0.05;
  if (e.key === "ArrowRight") {
    e.preventDefault();
    const next = Math.min(1, percent / 100 + step);
    (window as any).__sacredSoundSeek?.(next);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    const prev = Math.max(0, percent / 100 - step);
    (window as any).__sacredSoundSeek?.(prev);
  } else if (e.key === "Home") {
    e.preventDefault();
    (window as any).__sacredSoundSeek?.(0);
  } else if (e.key === "End") {
    e.preventDefault();
    (window as any).__sacredSoundSeek?.(1);
  }
}}
```

This completes the ARIA slider pattern -- Left/Right arrows move by 5%, Home jumps to start, End jumps to end.

### Step 5: Pause Ken Burns Animation When Section Not Visible

**File:** `src/components/TheSound.tsx`

The Ken Burns animation on the background image runs continuously. Update it to also check `sectionInView`:

```tsx
animation: reducedMotion || !sectionInView
  ? "none"
  : "sound-ken-burns 30s ease-in-out infinite alternate",
```

Combined with the card breathing pause from Step 2, this means zero CSS animations run when the section is not visible -- achieving true performance optimization for this heavily layered section.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/components/TheSound.tsx` | Clamp parallax offset to +/-40px |
| 2 | `src/components/TheSound.tsx` | Pause card breathing when section not visible |
| 3 | `src/index.css` | Blockquote hover warmth enhancement |
| 4 | `src/components/TheSound.tsx` | Keyboard seek support (arrows, Home, End) |
| 5 | `src/components/TheSound.tsx` | Pause Ken Burns when section not visible |

---

## What This Achieves

- **Visual stability:** Clamped parallax prevents background image from shifting beyond safe bounds on long pages, eliminating a potential visual artifact
- **Performance:** Pausing both the card breathing and Ken Burns animations when the section is offscreen eliminates unnecessary GPU compositing for a section with 8+ animated layers
- **Brand warmth:** The blockquote hover subtly reinforces vow-yellow at every text interaction, creating a consistent brand language even in passive content
- **Accessibility:** Keyboard seek completes the ARIA slider contract, making the NowPlayingBar fully operable without a mouse
- **Resource efficiency:** Zero CSS animations run when the section is not visible, which is critical for a section this visually dense

## Technical Notes

- Parallax clamp uses `Math.max/Math.min` -- zero overhead
- `sectionInView` is already tracked via IntersectionObserver -- no additional observers
- Blockquote hover is CSS-only -- no JavaScript
- Keyboard seek reuses the existing `__sacredSoundSeek` window function -- no new plumbing
- Ken Burns pause/resume is CSS `animation: none` toggle -- browser handles cleanup automatically

