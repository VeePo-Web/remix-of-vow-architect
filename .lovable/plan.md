

# Elevate "The Sound" Section — Final Fantasy.co Polish Pass

## Current State

The previous round successfully implemented: rounded-lg (8px) across all components, breathing golden dots replacing play icons, film grain + breathing glow layers in the section, updated copy ("Five rooms. One instrument. Your ceremony"), removed "Coming Soon" labels, and aligned animation timings.

The section is now structurally correct. What remains is the **material refinement** — the difference between "well-built" and "sacred instrument."

---

## What Still Needs Attention

### 1. GenreCard — Refine the Sacred Instrument Feel

The card is close but several details need tightening:

- **The context phrase font should be Inter (body sans), not font-display italic.** Per the typography system, Cormorant italic is reserved for a single sacred word, not descriptive phrases. Context like "For the weight of what is sacred" is body copy.
- **The genre label should use Cormorant (font-display)** — this is correct as-is, but the `font-medium` weight (500) violates the 300-400 weight rule for display type. Should be `font-light`.
- **The golden dot should have a subtle idle state** even when not active — currently it uses accent color at 0.3 opacity with no animation, which reads as a static dot. Add a very slow breathe (6s cycle) at reduced intensity so the cards feel alive even at rest.
- **Missing reduced-motion fallback** on the inner glow `exhale-pulse` animation and the Ken Burns drift. Need `@media (prefers-reduced-motion)` handling.

### 2. GenreTrackPanel — Add Breathing Golden Thread

The plan called for "a breathing golden thread along the left edge of the panel that connects to the genre card above." This was not implemented. The golden thread connector between card and panel (lines 459-470 in TheSound.tsx) is a simple static gradient line. It should breathe with the 4s material cycle.

Additionally:
- The panel lacks an **atmospheric inner glow when a track is active** — the track row has a radial gradient, but the panel itself should have a subtle ambient glow shift when any track is playing.

### 3. Now Playing Bar — Seek Dot Should Breathe When Idle

Per the plan: "The seek dot should breathe when idle." Currently the seek dot only appears on hover. When playback is paused and the bar is visible, the dot should breathe subtly at the current position to maintain material presence.

### 4. TheSound Section — Closing Quote Spacing

The plan called for "wider spacing, slower reveal" on the closing quote. The current `mt-28 md:mt-40` is good but the reveal timing is 700ms with 150ms delay — this should be extended to 900ms (breath-length transformation) with 300ms delay for a more ceremonial entrance, given this is the sacred closing of the section.

### 5. Missing `sr-only` Screen Reader Narrative

Per accessibility standards, every decorative section needs a `sr-only` span narrating meaning. TheSound section has `aria-labelledby="sound-heading"` but no screen reader narrative explaining the section's purpose for visitors using assistive technology.

---

## Technical Changes

### File: `src/components/GenreCard.tsx`
- Change `font-medium` to `font-light` on the genre label (line 140)
- Change context phrase from `font-display italic` to `font-sans` (line 147)
- Add slow idle breathe animation to the golden dot when not active (6s cycle, subtle opacity shift)
- Wrap Ken Burns and exhale-pulse animations with reduced motion check

### File: `src/components/GenreTrackPanel.tsx`
- Add a `position: relative` wrapper with a breathing golden thread (1px left border with 4s opacity animation)
- Add subtle panel-level ambient glow when any track is playing

### File: `src/components/TheSound.tsx`
- Update golden thread connector (lines 459-470) to use breathing animation instead of static gradient
- Extend closing quote reveal from 700ms to 900ms with 300ms delay
- Add `sr-only` narrative span to the section

### File: `src/components/ListeningMovement.tsx`
- No further changes needed — already updated to rounded-lg

---

## Summary

| Area | Current | After |
|------|---------|-------|
| Genre label weight | font-medium (500) | font-light (300) |
| Context phrase font | Cormorant italic | Inter (font-sans) |
| Idle golden dot | Static | 6s subtle breathe |
| Golden thread connector | Static gradient | 4s breathing opacity |
| Panel ambient glow | None | Subtle when playing |
| Closing quote reveal | 700ms / 150ms delay | 900ms / 300ms delay |
| Screen reader narrative | Missing | Added sr-only span |
| Reduced motion on cards | Partial | Complete fallbacks |

These are precision refinements — the kind of detail that separates "good" from "Fantasy.co quality." Each change serves comprehension, emotional pacing, or accessibility. None draws attention to itself.

