

# Fix: Ambient Audio Pill Animation State Machine

## Root Cause

The pill button has a base Tailwind class of `opacity-0` and relies entirely on CSS `animation` with `forwards` fill-mode to stay visible. The inline `style.animation` uses a two-branch ternary:

- **Idle + entrance complete**: `pill-breathe` (breathing pulse)
- **Everything else** (including playing state): `pill-surface` (entrance animation with 2000ms delay)

When the user clicks play, `isPlaying` becomes `true`, the ternary falls to the else branch, and `pill-surface` **re-runs from scratch** -- the pill snaps to `opacity: 0`, waits 2000ms, then slowly fades back in. The pill literally disappears for 2+ seconds on every click. Clicking pause then switches back to `pill-breathe`, causing another animation restart. The result: the pill vanishes and re-enters on every interaction.

## The Fix

Replace the two-branch ternary with a proper three-state animation system:

1. **Entering** (`!entranceComplete`): Run `pill-surface` entrance animation once
2. **Idle** (`entranceComplete && !isPlaying`): Run `pill-breathe` breathing loop
3. **Playing** (`isPlaying`): No animation needed -- just set `opacity: 1` directly

Once the entrance completes, remove the `opacity-0` base class entirely (swap it for `opacity-100`) so the pill no longer depends on animation fill-mode to stay visible. This eliminates the disappearing problem at its source.

## Specifications

**Button className change:**
- Replace the static `"opacity-0"` class with a dynamic expression: `entranceComplete ? "opacity-100" : "opacity-0"`
- This means after entrance, the pill's base opacity is 1 -- no animation needed to keep it visible

**Button style.animation change (3 branches):**
- `!entranceComplete`: `"pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) 2000ms forwards"` (entrance, runs once)
- `entranceComplete && !isPlaying && !reduced`: `"pill-breathe 4000ms ease-in-out infinite alternate"` (idle breathing)
- `entranceComplete && isPlaying`: `"none"` (playing -- opacity handled by class, waveform bars are the life signal)
- `entranceComplete && !isPlaying && reduced`: `"none"` (reduced motion idle -- solid opacity)

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Fix animation state machine: replace static `opacity-0` with dynamic class, use 3-branch animation logic to prevent re-entrance on toggle |

## What Stays Unchanged

All choreography layers -- entrance timing, breathing keyframes, icon crossfade, title crossfade, border warmth, waveform bloom, shuffle logic, skip affordance, progress line, reduced motion handling -- remain exactly as they are. Only the animation assignment and opacity class on the button element change.

