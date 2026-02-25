

# Name Update + Dedicated Sound Experience Page

## Part 1: Name Change (Parker Allard to Parker Gawryletz)

Two remaining references to the old name need updating:

**File: `src/components/FullScreenMenu.tsx`**
- Change `parker@parkerallard.com` to `parker@parkergawryletz.com` (lines 100-101)

**File: `src/hooks/usePageTheme.ts`**
- Change localStorage key from `parker-allard-theme-override` to `parker-gawryletz-theme-override` (line 20)

All other instances already say "Parker Gawryletz."

---

## Part 2: The Listening Room -- A Dedicated Sound Page

A new route at `/listen` that functions as an immersive, scroll-driven music experience where you can embed your own MP3 files. This is not a standard audio player page -- it is a cinematic listening environment.

### Concept: "The Listening Room"

A dark, intimate page that feels like stepping into a private concert hall. As visitors scroll, they move through ceremony moments (Prelude, Processional, Bride's Entrance, Signing, Recession), each with its own track, waveform visualization, and contextual copy. The page plays audio as sections scroll into view, creating a continuous soundtrack experience.

### Page Structure

```text
+------------------------------------------+
|  THE LISTENING ROOM (Hero)               |
|  Dark void, single golden line pulsing   |
|  "Step inside. Press play."              |
+------------------------------------------+
|                                          |
|  MOVEMENT I: THE PRELUDE                 |
|  [ Waveform visualization ]             |
|  Track: Canon in D (reimagined)          |
|  "Before anyone arrives, the room        |
|   fills with possibility."               |
|                                          |
+------------------------------------------+
|                                          |
|  MOVEMENT II: THE PROCESSIONAL           |
|  [ Waveform visualization ]             |
|  Track: A Thousand Years                 |
|  "The doors open. Footsteps begin."      |
|                                          |
+------------------------------------------+
|                                          |
|  MOVEMENT III: THE ENTRANCE              |
|  [ Waveform visualization ]             |
|  Track: Married Life                     |
|  "Everyone stands. Time stops."          |
|                                          |
+------------------------------------------+
|                                          |
|  MOVEMENT IV: THE VOW                    |
|  [ Waveform visualization ]             |
|  Track: At Last                          |
|  "The silence after 'I do.'"            |
|                                          |
+------------------------------------------+
|                                          |
|  THE CROSSING (CTA)                      |
|  "Every arrangement begins with a        |
|   conversation."                         |
|  [ Hold My Date ]                        |
+------------------------------------------+
```

### Design Details

**Hero Section:**
- Full-screen dark void with a single horizontal golden line that pulses with a breathing animation (3s cycle)
- Large display text: "The Listening Room" in Cormorant serif, fade-in over 800ms
- Subtext: "Close your eyes. Press play. Feel what your ceremony sounds like."
- AI-generated background image: dimly lit concert grand piano from audience perspective, single spotlight, dark auditorium

**Each Movement Section:**
- Full viewport height, dark background with alternating warm undertones
- Large movement number in faded display type (I, II, III, IV) as background watermark at 3% opacity
- Track card with play/pause button, waveform bars animation, vinyl disc, and progress bar (reusing existing AudioPlayer patterns)
- Contextual copy describing the ceremony moment in first person
- IntersectionObserver auto-plays the track when section reaches 50% viewport (with user gesture requirement handled by an initial "Enter the room" interaction)
- Ken Burns background with subtle section-specific imagery at 6-8% opacity

**Scroll-Linked Audio Behavior:**
- When a movement section scrolls into view (50% threshold), highlight that track
- A floating "Now Playing" mini-bar persists at the bottom (reusing existing NowPlayingBar component pattern)
- Tracks crossfade as user scrolls between movements

**Visual Accents:**
- Golden thread connecting all movements (a thin 1px vertical line running through the page center, fading in/out per section)
- Each movement has a subtle radial golden glow behind the waveform
- Film grain overlay at 15% opacity throughout
- Section fades between all movements

### Technical Implementation

**New Files:**
| File | Purpose |
|------|---------|
| `src/pages/Listen.tsx` | Main page component with movement sections, scroll-linked audio, hero |
| `src/components/ListeningMovement.tsx` | Reusable movement section with track player, copy, and reveal animations |

**Modified Files:**
| File | Change |
|------|--------|
| `src/App.tsx` | Add `/listen` route |
| `src/components/Navigation.tsx` | Add "Listen" nav link |
| `src/components/FullScreenMenu.tsx` | Add "Listen" link + fix email |
| `src/hooks/usePageTheme.ts` | Add `/listen` to dark theme routes + fix localStorage key |

### Audio File Placement

MP3 files are referenced from `/audio/` in the public folder (same pattern as the existing TheSound section). You can replace these with your own recordings:
- `/public/audio/canon-in-d.mp3`
- `/public/audio/a-thousand-years.mp3`
- `/public/audio/married-life.mp3`
- `/public/audio/at-last.mp3`

The track list is defined as a simple array at the top of `Listen.tsx` -- easy to update titles, contexts, and file paths.

### What Stays Unchanged

- All existing pages (Homepage, About, Services, FAQ, Contact, Gallery)
- The Sound section on the homepage (remains as-is with its own player)
- All pricing, process content, and copy
- All existing animations and timing

