

# Homepage Status Report + Next Elevation Opportunities

## What Has Already Been Completed

All items from the previous approved plans are live and working:

- "Parker Gawryletz" name change across all 7 files
- Interactive AudioPlayer component with 4 ceremony tracks, animated waveform bars, golden progress bars, play/pause controls, and graceful "Coming soon" fallback for missing MP3s
- 6 AI-generated cinematic background images integrated across The Invitation, The Sound, The Transformation (both panels), CrossOver, and The Witness sections
- No console errors detected

## Current Assessment

The homepage is strong. The vigil sequence, exhale, process section, vow moment, invitation, sound player, transformation split-screen, witness declarations, three paths, record, witnesses, and crossover are all functioning with correct copy, imagery, and animations.

## Remaining Opportunities for Fantasy.co Parity

To push beyond "good" into truly world-class territory, the following micro-refinements would elevate the overall polish:

### 1. Vinyl Record Spinning Animation for Active Track
Add a subtle rotating vinyl disc icon (pure CSS, no images) inside the active track card that spins while audio is playing. This creates a more tactile, playful "listening experience" feel that makes the Sound section more memorable and fun.

- 48px vinyl disc rendered as concentric CSS circles (black outer, dark grey grooves, golden center dot)
- Spins at 33rpm (1.82s per rotation) using CSS `animation: spin`
- Pauses when audio pauses via `animation-play-state: paused`
- Replaces the static waveform bars on the active card only
- Respects `prefers-reduced-motion`

### 2. Floating "Now Playing" Mini-Bar
When a track is playing and the user scrolls away from The Sound section, a slim fixed mini-bar appears at the bottom of the viewport showing the current track name, a pause button, and the progress bar. This lets visitors continue listening while exploring the rest of the homepage.

- Fixed to bottom, 48px height, dark glass-morphism background
- Shows track context + title + pause/play + thin golden progress bar
- Appears with 260ms slide-up when Sound section leaves viewport
- Disappears when user scrolls back to Sound section or pauses
- Does not interfere with MobileStickyBar (positioned above it)

### 3. Section Transition Polish
Add smooth gradient fades between adjacent sections to eliminate hard visual cuts. Currently some section boundaries (especially Sound-to-Transformation) have abrupt transitions.

- Add matching `section-fade-bottom` divs to sections that transition into different-colored sections
- Ensure gradient colors match the destination section's background

---

## Files That Would Change

| File | Change |
|------|--------|
| `src/components/AudioPlayer.tsx` | Add vinyl disc animation for active track |
| `src/components/TheSound.tsx` | Add NowPlaying mini-bar logic with IntersectionObserver |
| `src/index.css` | Add vinyl spin keyframe + mini-bar styles |

## What Stays Unchanged

- All copy, pricing, and content
- All existing section layouts and imagery
- Navigation, footer, and all other pages
- Process section and hero sequence

