

# Audit: Active Track Lacks Tactile Presence

## Finding

When a track is selected in the Listening Room panel, three indicators mark it as active: vow-yellow text color, a 3px dot on the left, and animated waveform bars on the right. These are all fine, but the row itself has no background differentiation. The active track row looks flat — identical in surface to every other row. It reads as "highlighted text" rather than "a key being pressed."

World-class audio interfaces (Spotify's desktop player, Apple Music's Now Playing queue, Sonos) give the active track a subtle luminous background — a warm wash that makes it feel physically present, like a piano key depressed and held. This is the difference between "the text is yellow" and "this row is alive."

## The Fix

Add a subtle radial gradient background to the active track row in `PianoPanel.tsx`. When `isActive` is true, the row gets a horizontal vow-yellow glow at approximately 3-4% opacity — just enough to distinguish it from idle rows without competing with the text or waveform. The glow will use a left-biased radial gradient (`radial-gradient(ellipse at 20% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)`) that suggests light emanating from the struck string position. This transitions in with the same 180ms duration used elsewhere.

## Technical Change

### File: `src/components/PianoPanel.tsx` (line ~277-290, the track button)

Add a `style.background` property to the track button when `isActive` is true:

- Active state: `background: radial-gradient(ellipse at 20% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)`
- Inactive state: no background (handled by existing hover class)

This is applied via the existing inline `style` object on the button, adding a `background` property conditioned on `isActive`. The CSS `transition` already covers `background-color` via the `transition-colors` class, so the glow will fade in smoothly.

## What Stays Unchanged

All other panel styling, pill behavior, caret, strings, audio logic, track data.

