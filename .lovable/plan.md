

# Fix: Ambient Audio Pill Does Nothing on Click

## Root Cause

All 9 tracks in the pill have empty `src` values (`""`). The `toggle()` function checks `if (!t.src) return;` — an empty string is falsy in JavaScript, so it exits immediately. No audio loads, `isPlaying` never becomes `true`, and the pill appears unresponsive.

## The Fix

Until real audio files are added, the pill should still **visually respond** to clicks — showing the playing state (waveform bars, track title, shuffle icon, border warmth) even without actual audio. This lets you evaluate every choreography layer now.

**Change:** In `toggle()`, remove the early return when `src` is empty. Instead, simply set `isPlaying(true)` regardless. The `<audio>` element will have nothing to play, but the UI will enter its full playing state. When real `.mp3` URLs are added later, playback will work automatically with no further code changes.

Similarly, in `advanceTrack()`, remove the `if (t.src) { ... } else { setIsPlaying(false); }` guard — just always advance the visual state.

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Remove src-empty guards in `toggle()` and `advanceTrack()` so the pill enters playing state visually even without audio files |

## Detail

In `toggle()` (line 147-155): instead of bailing when src is empty, set `isPlaying(true)` unconditionally. Only attempt `audio.play()` if src is non-empty.

In `advanceTrack()` (lines 108-131): always advance shuffle position and set the visual state. Only call `audio.src` and `audio.play()` when a real src exists. Never call `setIsPlaying(false)` just because src is empty.

## What Stays Unchanged

All choreography layers — entrance, breathing, icon crossfade, title crossfade, border warmth, waveform bloom, progress line, shuffle logic — remain exactly as they are.

