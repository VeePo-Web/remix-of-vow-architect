

# Gateway Refinement -- Ambient Audio Pill Entrance Choreography

## Audit Finding

All four transition layers (icon crossfade, text dissolve, waveform bloom, border warmth) now breathe as one organism. The pill's *internal* behavior is polished. But the pill's **entrance** -- how it first appears on the page -- is generic. It uses the standard `animate-fade-in` class (a 300ms fade + 10px translateY lift), which is the same entrance animation used by dozens of elements across the site. For a component this special -- a floating, living audio control that invites the visitor into a sensory experience -- the entrance should be bespoke, not borrowed.

World-class audio interfaces (Apple's AirPlay pill, Sonos's ambient controller, Bang & Olufsen's floating UI) enter the viewport with a distinct micro-choreography: they rise from a slightly deeper offset, scale from just below 1.0, and fade in -- all slightly staggered so the motion reads as "emerging" rather than "appearing." The current 10px lift and 300ms fade reads as a standard UI element mounting. The pill deserves its own entrance that feels like it *surfaces* -- as if it was always there, just beneath the threshold of perception, and now slowly reveals itself.

Additionally, the 2000ms entrance delay is correct (the pill should arrive after the page settles), but the animation itself should be longer than the standard 300ms. A 600ms entrance with a gentle scale-up from 0.96 to 1.0 and a 16px rise creates a "surfacing" feel -- the pill rises like a breath, not a pop.

## The Fix

Replace the generic `animate-fade-in` with a bespoke `animate-pill-surface` keyframe that combines:
- Opacity: 0 to 1
- TranslateY: 16px to 0
- Scale: 0.96 to 1.0
- Duration: 600ms
- Easing: cubic-bezier(0.22, 0.61, 0.36, 1) (the brand's standard easing)

This keyframe is defined inline (in the existing `<style>` block already present for the waveform animation), keeping it scoped to this component. The `animate-fade-in` class is replaced with a custom class referencing this keyframe.

## Specifications

- New keyframe `pill-surface`: `0% { opacity: 0; transform: translateY(16px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); }`
- Duration: 600ms
- Easing: cubic-bezier(0.22, 0.61, 0.36, 1)
- Delay: 2000ms (unchanged)
- Fill mode: forwards (unchanged)
- Replace `animate-fade-in` class with inline animation style
- Reduced motion fallback: opacity-only, 120ms

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Add bespoke `pill-surface` keyframe; replace generic fade-in with surfacing entrance |

## What Stays Unchanged

All icon crossfade, text dissolve, waveform bloom, border warmth transition, positioning, progress line, audio logic, track advancement, and hover states remain exactly as they are.

