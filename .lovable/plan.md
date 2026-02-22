

# Homepage Updates: Name Change + Interactive Sound Player

## Overview

Two changes to the homepage:
1. **Global name change**: "Parker Allard" to "Parker Gawryletz" across every file in the project
2. **The Sound section redesign**: Replace the static track cards with an interactive audio player where you can embed your own MP3 files for visitors to listen to while browsing

---

## Part 1: Name Change (Parker Allard to Parker Gawryletz)

Every instance of "Parker Allard" will be replaced with "Parker Gawryletz" across 7 files:

| File | Location |
|------|----------|
| `index.html` | Page title, OG title (2 instances) |
| `src/components/MinimalHeader.tsx` | Logo text |
| `src/components/Navigation.tsx` | Logo text |
| `src/components/Footer.tsx` | Footer heading + copyright line |
| `src/components/witness/WitnessCovenant.tsx` | Signature name on covenant certificate |
| `src/components/FormSuccess.tsx` | Calendar PRODID + description text |
| `src/components/ThemeToggle.tsx` | localStorage key ("parker-allard-theme-override" to "parker-gawryletz-theme-override") |

Note: `src/pages/PrivacyPolicy.tsx` already uses "Parker Gawryletz" -- no change needed there. First-name-only references ("Parker" in testimonials, comparison table) stay as-is since the first name has not changed.

---

## Part 2: The Sound Section -- Interactive Audio Player

### Concept

Replace the current static "Samples arriving soon" track cards with a fully functional, visually immersive audio player. The design draws from vinyl record players and piano key aesthetics -- a dark, moody listening environment where each track appears as an elegant card with a waveform visualization and play/pause control.

### Design Language

- **Dark immersive section** (inhale/vigil space) -- matches the existing `section--dark` styling
- **Floating track cards** with subtle glass-morphism borders
- **Animated waveform bars** that pulse when a track is playing (CSS-only, no canvas needed for performance)
- **Golden accent** on the active/playing track's progress bar
- **Smooth crossfade** between tracks -- clicking a new track fades out the current one
- **Persistent mini-player bar** at the bottom of the Sound section so audio context is never lost while scrolling within it

### Technical Architecture

A new component `src/components/AudioPlayer.tsx` will be created:

- Uses the native HTML5 `<audio>` element (no external dependencies)
- Tracks are defined as a simple array of `{ title, context, src }` objects where `src` points to MP3 files in `public/audio/`
- State management via `useState` and `useRef` for the audio element
- `useEffect` handles play/pause, track switching, and time updates
- Progress bar uses `currentTime / duration` ratio rendered as a CSS width percentage
- Waveform visualization uses 12-16 CSS-animated bars with `animation-delay` offsets that activate only when playing
- Respects `prefers-reduced-motion` by disabling waveform animation and using a simple progress indicator instead

### Track Data Structure

```text
public/audio/
  canon-in-d.mp3
  a-thousand-years.mp3
  married-life.mp3
  at-last.mp3
```

You will add your own MP3 files to the `public/audio/` folder. The component will reference them by path. If a file is missing, the card gracefully shows "Coming soon" instead of a play button.

### The Sound Section Layout (Revised)

```text
THE SOUND (label)

"Music that holds the room still." (headline)

"The prelude. The procession. The vows. The walk into forever." (subhead)

[Track 1: Processional]  [Track 2: Bride's Entrance]
   Waveform + Play          Waveform + Play
   Progress Bar             Progress Bar

[Track 3: Signing]       [Track 4: Recession]  
   Waveform + Play          Waveform + Play
   Progress Bar             Progress Bar

"Every arrangement begins with a conversation--
and ends with a sound that belongs only to you."
```

### Component Breakdown

**`src/components/AudioPlayer.tsx`** (new file)
- Props: `tracks: { title: string; context: string; src: string }[]`
- Internal state: `activeTrack`, `isPlaying`, `progress`, `duration`
- Single shared `<audio>` element controlled via ref
- Each track card shows:
  - Golden bullet (context label)
  - Track title
  - Waveform bars (animated when this track is active and playing)
  - Play/Pause icon button
  - Thin progress bar at card bottom (golden, fills left-to-right)
- Clicking a different track: pauses current, switches `src`, plays new
- Clicking the same track: toggles play/pause

**`src/components/TheSound.tsx`** (modified)
- Remove the static track cards grid
- Import and render `<AudioPlayer tracks={tracks} />`
- Remove "Samples arriving soon" text
- Keep all existing section structure, background, label, headline, subhead, and closing caption

### Animation Details (per brand timing standards)

| Element | Duration | Easing |
|---------|----------|--------|
| Play/pause icon swap | 180ms | cubic-bezier(.22,.61,.36,1) |
| Waveform bar pulse | 800ms per cycle | ease-in-out, staggered 50ms per bar |
| Progress bar fill | Continuous (tied to audio time) | linear |
| Track card hover lift | 160ms | cubic-bezier(.22,.61,.36,1) |
| Track switch crossfade | 260ms | ease-out |

### Accessibility

- Each track card has `role="button"` and `aria-label="Play [Track Title]"` / `aria-label="Pause [Track Title]"`
- Progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard: Enter/Space toggles play/pause on focused track
- Reduced motion: waveform bars freeze, only progress bar moves
- Screen reader announces track change and play/pause state

### Placeholder Handling

Since you do not yet have MP3 files uploaded, the initial implementation will check if the audio file exists. If it cannot load (404), the card will show a subtle "Coming soon" state with muted styling -- exactly like the current design but per-track rather than a blanket message. Once you add MP3 files to `public/audio/`, the players will activate automatically with no code changes needed.

---

## Files Changed Summary

| File | Action | Nature |
|------|--------|--------|
| `index.html` | Edit | Name change (2 instances) |
| `src/components/MinimalHeader.tsx` | Edit | Name change |
| `src/components/Navigation.tsx` | Edit | Name change |
| `src/components/Footer.tsx` | Edit | Name change (2 instances) |
| `src/components/witness/WitnessCovenant.tsx` | Edit | Name change |
| `src/components/FormSuccess.tsx` | Edit | Name change (2 instances) |
| `src/components/ThemeToggle.tsx` | Edit | localStorage key update |
| `src/components/AudioPlayer.tsx` | Create | New interactive audio player component |
| `src/components/TheSound.tsx` | Edit | Integrate AudioPlayer, remove static cards |

## What Stays Unchanged

- All copy (headline, subhead, closing caption) -- already elevated
- Section background, gradients, and grain textures
- All other homepage sections
- Pricing, testimonials, and all other pages
- Design system, colors, typography, animations framework

