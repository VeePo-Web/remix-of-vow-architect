

# Gateway Refinement -- Ambient Audio Pill Text Crossfade and Waveform Entrance

## Audit Finding

### 1. Text Swap Between States Has No Transition

When the pill toggles between idle ("Hear me play") and playing (track title), the text swaps via a conditional render -- it pops instantly from one string to the other. Every world-class audio control (Apple Music mini-player, Spotify's now-playing pill, Sonos ambient bar) crossfades text on state change. The abrupt swap breaks the pill's otherwise composed, breathing aesthetic. It reads as a UI toggle rather than a living instrument responding to touch.

**The fix:** Replace the single conditional `<span>` with two overlapping `<span>` elements that crossfade via opacity. Both texts are always rendered, positioned absolutely within a relative container. The idle text ("Hear me play") has `opacity-100` when not playing and `opacity-0` when playing. The track title has the inverse. Both transition over `180ms`. This creates a smooth dissolve between states -- the invitation fades out as the track name fades in, and vice versa.

### 2. Waveform Bars Mount and Unmount Abruptly

The waveform bars are conditionally rendered (`{isPlaying && <WaveformBars />}`), meaning they hard-mount when playing and hard-unmount when paused. This creates a jarring width change in the pill -- elements snap in and out of existence. Premium audio interfaces ease their visualizers in and out.

**The fix:** Always render the `WaveformBars` component, but control its visibility with opacity and width transitions. When not playing, the bars container collapses to `w-0 opacity-0`; when playing, it expands to `w-auto opacity-100` over `260ms`. This creates a gentle bloom effect -- the waveform breathes into existence rather than appearing.

---

## Specifications

### Text Crossfade
- Wrapper: `relative` container with fixed minimum width to prevent layout shift
- Idle text ("Hear me play"): `absolute inset-0`, opacity toggles based on `isPlaying`
- Track title: `absolute inset-0`, opacity toggles inversely
- Transition: `transition-opacity duration-[180ms]`
- Both texts share identical styling (11px uppercase tracking)

### Waveform Entrance
- Always render `<WaveformBars>`
- Wrapper div: `overflow-hidden transition-all duration-[260ms]`
- Playing: `opacity-100 max-w-[40px]`
- Not playing: `opacity-0 max-w-0`

## Files Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Replace conditional text render with crossfade; always render waveform with opacity/width transition |

## What Stays Unchanged

All positioning (mobile centered, desktop bottom-left), progress line, icon swap, entrance delay, border warmth, hover states, audio management logic, track advancement, and reduced motion handling remain exactly as they are.

