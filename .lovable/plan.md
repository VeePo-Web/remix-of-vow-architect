

# Gateway Refinement -- Ambient Audio Player ("Hear Me Play")

## The Concept

An ultra-minimal ambient audio control that lives in the bottom-left corner of the Gateway page. It does not demand attention -- it waits. A small, refined pill appears after the entrance choreography completes (~2000ms), offering a single quiet invitation: a play icon and the words "Hear me play." One tap, and piano begins. The pill contracts to a breathing waveform indicator -- proof that sound is alive, but never intrusive. The visitor browses in atmosphere.

This is the digital equivalent of walking into a high-end gallery and hearing a solo piano echoing softly from another room. You do not see the pianist. You simply feel the space change.

---

## Design Philosophy

The feature must satisfy three constraints simultaneously:

1. **Humble in language** -- "Hear me play" is an offer, not a command. No "enhance your experience" or "immersive soundtrack." Just a quiet, first-person invitation.
2. **Confident in presence** -- The control is always accessible, always elegant, never hidden behind a menu or modal. Its mere existence says: "I am good enough that the sound will only help."
3. **Frictionless in interaction** -- One tap to start. One tap to stop. No track selection, no volume sliders, no playlist UI. The Gateway is a threshold, not a listening room. Complexity belongs on the Listen page.

---

## Interaction Choreography

### Entrance
- The pill fades in at `2000ms` delay (after all cards and footer have landed)
- Opacity 0 to 1 over 300ms with a subtle 6px upward translate
- Resting state: semi-transparent background (`bg-white/[0.06]`), border at `border-white/[0.08]`

### Idle State (Not Playing)
- Play triangle icon (12px, `lucide` `Play`) + "Hear me play" in 11px uppercase tracking
- Subtle hover: background warms to `bg-white/[0.10]`, 180ms transition

### Playing State
- Text crossfades from "Hear me play" to the current track title (e.g., "Canon in D")
- Play icon morphs to Pause icon
- 5 tiny waveform bars (3px wide, vow-yellow) animate beside the track title
- Pill border warms to `border-[hsl(var(--vow-yellow)/0.15)]`
- A thin 2px progress line runs along the bottom of the pill

### Track Advancement
- Placeholder: 3 tracks defined in an array with `title` and `src` (empty string for now)
- When one track ends, the next begins automatically (loop back to first after last)
- Track title crossfades on change (180ms opacity transition)

### Dismissal
- Tap the pill while playing to pause
- Tap again to resume
- No close/dismiss button -- the pill is always present, just quiet when inactive

---

## Technical Specifications

### New Component: `AmbientAudioPill`
Located at `src/components/AmbientAudioPill.tsx`

**Props:** None (self-contained, manages own audio element)

**Internal state:**
- `isPlaying: boolean`
- `activeIndex: number` (current track)
- `progress: number` (currentTime)
- `duration: number`

**Audio management:**
- Single `<audio>` element with `preload="none"`
- Tracks array with 3 placeholder entries (empty `src` for now, titles like "Nocturne," "Canon in D," "Clair de Lune")
- `timeupdate` listener for progress bar
- `ended` listener to advance to next track
- `error` handler to silently skip broken tracks

**Reduced motion:**
- Waveform bars fall back to static heights
- Entrance animation becomes opacity-only (no translate)

### Waveform Bars
- 5 bars, 3px wide, 2px gap
- Height range: 4px to 14px (smaller than the Listen page's 22px -- this is ambient, not focal)
- Animation: reuse `waveform-bar` keyframe at 900ms (slower, calmer than Listen page's 700-800ms)
- Color: `hsl(var(--vow-yellow))` when playing, `foreground/15` when paused

### Positioning
- `fixed bottom-6 left-6` (desktop)
- `fixed bottom-4 left-4` (mobile, via responsive classes)
- `z-30` (below the potential nav overlay at z-50, above content)

### Sizing
- Pill height: 40px
- Idle width: ~160px (auto based on content)
- Playing width: ~180px (slightly wider for track title + waveform)
- Border radius: `rounded-full`
- Padding: `px-4`

### Animation Timings
- Entrance fade: 300ms, delay 2000ms
- Play/pause icon swap: instant (no transition needed on icon swap)
- Track title crossfade: 180ms opacity
- Hover background: 180ms
- Progress bar: no transition (direct width binding like existing players)
- Waveform bars: 900ms ease-in-out infinite alternate

---

## Integration in Gateway

In `src/pages/Gateway.tsx`:
- Import and render `<AmbientAudioPill />` as a sibling to the footer, positioned fixed so it floats independently of the flex layout
- No props needed -- the component is self-contained

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | New component: ambient audio pill with play/pause, waveform bars, progress line, track advancement |
| `src/pages/Gateway.tsx` | Import and render `<AmbientAudioPill />` at the bottom of the page component |

## What Stays Unchanged

All card layout, typography, copy, aspect ratios, animation stagger, routing, images, opacity layers, gradient overlays, border luminance, golden thread, semicolon breathing, arrow affordance, hover states, and mobile card layout remain exactly as they are.

