

# Gateway Refinement -- Ambient Audio Pill Idle Breathing Pulse

## Audit Finding

The pill now has nine layers of choreography: bespoke surfacing entrance, icon crossfade, title crossfade on skip, border warmth transition, waveform bloom, shuffle logic, skip affordance, and a progress line. Every *active* state is polished.

But the pill's **idle state is dead**. After the 600ms entrance animation completes, the pill sits at `opacity: 1` with a static play icon and the words "Hear me play" -- forever still. It is the only persistent element on the Gateway page with zero ambient motion. The Vigil flame breathes. The semicolon breathes. The golden dot breathes. The pill does not.

The brand document specifies: "3000-4000ms: Ambient breathing (flame, golden dot)" and "The entire site breathes: Inhale, Exhale, Held breath, Release." The pill, as the singular interactive audio element, should be the most alive resting object on the page -- not the least.

World-class ambient UI elements (Apple's Dynamic Island at rest, Sonos's idle controller, Bang and Olufsen's standby glow) share one trait: a slow, barely perceptible opacity oscillation that says "I am here. I am waiting. I am alive." Not a pulse. Not a throb. A breath -- so slow the visitor feels it before they see it.

## The Fix

Add a `@keyframes pill-breathe` animation that gently oscillates the pill's opacity between `0.82` and `1.0` over `4000ms` with `ease-in-out` infinite alternation. This animation runs **only when idle** (not playing). When playback starts, the breathing stops -- the waveform bars take over as the "life" signal.

The breathing starts after the entrance animation completes (2000ms delay + 600ms entrance = 2600ms), using a separate `animation-delay` so the entrance and breathe do not conflict. The simplest approach: apply the breathe animation via a class toggle, but only add it after a mount delay that exceeds the entrance duration.

For reduced motion: the breathing is suppressed entirely (opacity stays at 1.0).

## Specifications

- New keyframe `pill-breathe`: `0% { opacity: 0.82; } 100% { opacity: 1; }` -- duration 4000ms, ease-in-out, infinite, alternate
- Applied to the pill button only when `!isPlaying` and after entrance completes
- New state: `entranceComplete: boolean` (default `false`), set to `true` via a 2700ms setTimeout on mount
- When `isPlaying`: no breathe animation, opacity locked at 1.0
- When `!isPlaying && entranceComplete && !reduced`: apply `pill-breathe` via inline `animation` style
- Reduced motion: no breathing, opacity stays solid

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Add `pill-breathe` keyframe, `entranceComplete` state, conditional breathing animation on idle |

## What Stays Unchanged

All entrance choreography (pill-surface), icon crossfade, title crossfade, border warmth, waveform bloom, shuffle logic, skip affordance, progress line, positioning, and all active-state behavior remain exactly as they are.

