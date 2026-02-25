

# Gateway Refinement -- Ambient Audio Pill Track Title Crossfade on Skip

## Audit Finding

The pill now has nine tracks, Fisher-Yates shuffle, a bespoke surfacing entrance, smooth border warmth, icon crossfade, and a skip affordance. Every transition layer breathes -- except one: **the track title swap on skip**.

When the visitor taps the shuffle icon, the `activeTrackIndex` changes and the title text updates. But because both the idle label ("Hear me play") and the playing label share the same rendering pattern -- a single `<span>` whose text content changes via `tracks[activeTrackIndex].title` -- the title swap is **instantaneous**. "Nocturne" snaps to "River Flows in You" in a single frame. There is no dissolve, no crossfade, no breathing. Every other state change in this pill is choreographed to 180ms. The title swap breaks the contract.

World-class audio players (Apple Music's Now Playing bar, Spotify's mini player) crossfade between track titles. The outgoing title fades to 0 while the incoming title fades from 0. This creates continuity -- the feeling that one song flows into the next rather than being replaced.

The fix is lightweight: track the *displayed* title separately from the *active* title, and use a brief opacity dip (fade out old, update text, fade in new) triggered whenever the track index changes. This is a CSS-only opacity transition driven by a small state toggle -- no additional DOM elements, no layout shift, no complexity.

## The Fix

1. Add a `displayedTitle` state that holds the currently shown track name
2. Add a `titleVisible` boolean state (default `true`) that controls opacity
3. When `activeTrackIndex` changes, set `titleVisible` to `false` (triggers 120ms fade-out)
4. After a 120ms timeout, update `displayedTitle` to the new track name and set `titleVisible` back to `true` (triggers 120ms fade-in)
5. The playing-state title span gets its opacity from `titleVisible` (multiplied with the existing `isPlaying` opacity toggle)

Total crossfade duration: 240ms (120ms out + 120ms in). Fast enough to feel responsive, slow enough to read as intentional.

## Specifications

- New state: `displayedTitle: string` initialized to `tracks[shuffledOrder[0]].title`
- New state: `titleVisible: boolean` initialized to `true`
- `useEffect` watching `activeTrackIndex`: sets `titleVisible = false`, then after 120ms sets `displayedTitle` and `titleVisible = true`
- The playing-state title span: opacity class becomes `isPlaying && titleVisible ? "opacity-100" : "opacity-0"` with existing `duration-[180ms]` reduced to `duration-[120ms]` for this span only
- Cleanup: timeout cleared on unmount or re-trigger

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Add title crossfade on track change using opacity dip pattern |

## What Stays Unchanged

All entrance choreography, icon crossfade, border warmth, waveform bloom, shuffle logic, skip affordance, progress line, positioning, and reduced motion handling remain exactly as they are.

