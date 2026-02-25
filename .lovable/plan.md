

# Audit: Redundant Waveform Duplication and Panel-to-Pill Visual Disconnect

## Findings

### 1. Double Waveform Clutter

When a track is playing and the panel is closed, the pill now renders animated waveform bars in **two places simultaneously**:
- **Left icon slot**: 4 mini bars (1.5px wide, vow-yellow, animated) -- added in the last refinement
- **Right side**: 4 larger bars (2px wide, vow-yellow, animated) via the `WaveformBars` component

Two identical animations flanking a title is visually redundant and breaks the Swedish "lagom" principle -- just the right amount, never more. Premium audio interfaces (Sonos app, Apple Music mini-player) show the equalizer indicator in exactly one location. The left icon slot is the correct place because it replaces the play/X icon contextually. The right-side waveform should be removed, leaving only the pause/play toggle button on the right.

**The fix**: Remove the `WaveformBars` component render from the right-side section. Keep only the pause/play toggle button there. This gives the pill a clean three-part layout: [waveform icon] [title] [pause button].

### 2. Floating Panel Has No Visual Anchor

The panel hovers above the pill with no visual connection between them. It appears as a disconnected rectangle floating in space. World-class popovers (Apple's context menus, Framer's dropdowns, Linear's command palette) create a subtle visual thread between trigger and popover -- typically a small caret/notch or a shared glow that says "I came from here."

**The fix**: Add a tiny downward-pointing caret at the bottom-center of the panel. This is a 8px-tall CSS triangle using `border` technique, colored to match the panel background (`hsl(var(--rich-black))`), with a 1px border that continues the panel's `vow-yellow / 0.08` border. It sits at the bottom edge of the panel, pointing down toward the pill. On desktop it aligns with the pill's horizontal center (`left: ~80px` to center over the pill). On mobile it centers. This creates a physical "speech bubble" connection that makes the panel feel tethered to the pill rather than arbitrarily floating.

## Technical Changes

### File: `src/components/AmbientAudioPill.tsx`

**Change 1 -- Remove right-side WaveformBars render (around lines 288-296):**

Remove the `{showWaveform && <WaveformBars ... />}` line. Keep the pause/play toggle button. Simplify the container's visibility condition to only depend on `showPauseButton` (active track exists, panel closed).

### File: `src/components/PianoPanel.tsx`

**Change 2 -- Add caret/notch at panel bottom (after the panel's closing div):**

Add an absolutely-positioned pseudo-element or small `div` at the bottom of the panel container. It will be an 8px downward-pointing triangle made with CSS borders:
- `border-left: 8px solid transparent`
- `border-right: 8px solid transparent`  
- `border-top: 8px solid hsl(var(--rich-black))`
- Positioned: `bottom: -8px`, horizontally centered on mobile, offset to align with the pill center on desktop
- Inherits the panel's opacity/transform animation so it appears and disappears with the panel
- A subtle `0.5px` outline matching the panel border color for continuity

## What Stays Unchanged

Panel interior (strings, hammers, damper, categories, tracks), pill entrance animation, progress bar, audio logic, track data.

