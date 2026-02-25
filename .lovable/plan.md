

# Gateway Refinement -- Ambient Audio Pill Icon Crossfade

## Audit Finding

The text crossfade and waveform bloom are now polished. One hard swap remains: the Play and Pause icons. When toggling, the icon pops instantly from one to the other. Worse, the Play icon carries `ml-0.5` (a 2px left offset to optically center the triangle within the pill's circular hit area) while the Pause icon does not -- creating a subtle but perceptible 2px horizontal jolt on every tap. This is the last "binary toggle" in a component that otherwise breathes.

Every premium audio control (Apple Music, Spotify's mini-player, Bang & Olufsen's Beosound app) crossfades its transport icons. The fix is the same pattern already applied to the text: render both icons simultaneously in a relative container, toggle their opacity over 180ms, and use consistent spacing so neither icon shifts the layout.

## The Fix

Replace the conditional `{isPlaying ? <Pause /> : <Play />}` with a small relative container holding both icons at `absolute` position. The active icon gets `opacity-100`, the inactive gets `opacity-0`, both transition over `duration-[180ms]`. The Play icon's `ml-0.5` optical correction moves into its own absolute positioning so it never affects the container width. Container size is fixed at 14x14px (enough for the 12px icons plus the 2px optical offset).

## Specifications

- Container: `relative w-[14px] h-[14px] flex-shrink-0`
- Play icon: `absolute inset-0 flex items-center justify-center`, with a 1px left padding for optical centering, opacity toggles inversely to `isPlaying`
- Pause icon: `absolute inset-0 flex items-center justify-center`, opacity toggles with `isPlaying`
- Both: `transition-opacity duration-[180ms]`
- Icon size and strokeWidth unchanged (12px, 2)

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Replace conditional icon render with dual-icon crossfade in a fixed-size container |

## What Stays Unchanged

All text crossfade, waveform bloom, positioning, progress line, entrance delay, border warmth, hover states, audio logic, track advancement, and reduced motion handling remain exactly as they are.

