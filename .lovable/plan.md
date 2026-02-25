

# Gateway Refinement -- Ambient Audio Pill Shuffle and Repertoire Expansion

## Audit Finding

The pill currently holds three hardcoded tracks with no way for visitors to explore breadth. It plays sequentially: Nocturne, Canon in D, Clair de Lune -- all classical. For a pianist whose brand spans weddings, teaching, and events, the repertoire should hint at range. More critically, the visitor has zero agency over what they hear. The pill plays track 1, then 2, then 3, then stops. There is no discovery, no surprise, no invitation to linger.

World-class ambient players (Apple Music's autoplay, Sonos Radio, the Ace Hotel lobby stream) share one trait: they shuffle. The listener never knows what comes next, which creates a sense of living presence rather than a looping playlist. The pill should feel like sitting in a room where Parker is playing -- you do not choose the song, but every song feels right.

Adding a full genre picker UI would violate the pill's minimalism. Instead, the elegant solution is:

1. **Expand the track list** with categorized entries spanning Classical, Contemporary, and Film/Pop -- reflecting the three service pillars (Weddings, Teaching, Events).
2. **Shuffle on first play** so every visit feels unique.
3. **Add a tiny skip-forward affordance** (a `Shuffle` icon that appears only during playback, replacing the waveform's right edge) so visitors can skip to the next track if the current one does not resonate. One tap, next random track. No menu, no picker, no cognitive load.

This preserves the pill's sacred minimalism while giving the visitor a sense of abundance and discovery.

## Track Repertoire

Expand from 3 to 9+ tracks across three moods (sources remain empty strings until real audio is added):

- **Classical:** Nocturne (Chopin), Clair de Lune (Debussy), Canon in D (Pachelbel)
- **Contemporary:** A Thousand Years (Perri), Turning Page (Sleeping at Last), All of Me (Legend)
- **Film/Cinematic:** River Flows in You (Yiruma), Comptine d'un autre ete (Tiersen), Moon River (Mancini)

The pill label shows the track title during playback (already implemented). The genre/mood is not displayed -- it is felt, not labeled.

## Shuffle Logic

- On component mount, create a shuffled order of all track indices using Fisher-Yates.
- `activeIndex` references position within the shuffled array, not the original tracks array.
- On track end, advance to next in shuffled order; when exhausted, reshuffle and continue.
- On skip tap, same behavior as track end: advance to next shuffled track.

## Skip Affordance

- A small `Shuffle` icon (from lucide-react) appears to the right of the waveform bars, only when `isPlaying` is true.
- Icon size: 10px, `text-muted-foreground/40`, with `hover:text-muted-foreground/70` and `transition-opacity duration-[180ms]`.
- It enters with the same `max-w` bloom as the waveform (already transitioning).
- Tap handler: `e.stopPropagation()` (so the pill's main toggle is not triggered), then advance to next shuffled track.
- Accessible: `aria-label="Skip to next track"`, `role="button"`, `tabIndex={0}`.

## Specifications

- Track array: 9 entries with `title` and `src` (src empty for now).
- New state: `shuffledOrder: number[]` -- initialized via `useEffect` on mount.
- New state: `shufflePosition: number` -- current index within `shuffledOrder`.
- `shuffle()` utility: Fisher-Yates in-place, returns new array.
- Skip icon: `Shuffle` from lucide-react, 10px, appears inside the existing waveform bloom container.
- `onClick` on skip icon calls `e.stopPropagation()` then `skipToNext()`.
- `skipToNext()`: pause current, advance `shufflePosition`, load next track, play.

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Expand tracks to 9, add Fisher-Yates shuffle on mount, add skip icon during playback |

## What Stays Unchanged

All entrance choreography (pill-surface), icon crossfade, text dissolve, border warmth transition, positioning, progress line, reduced motion handling, and hover states remain exactly as they are.

