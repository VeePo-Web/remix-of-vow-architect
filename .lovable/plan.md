

# Audit: Clipped Caret and Dead Code Cleanup

## Findings

### 1. Caret Is Invisible -- Clipped by overflow-hidden

The panel's outer container has `overflow-hidden` (line 221) to contain the scroll area and piano string decorations. But the caret notch we just added sits at `bottom: -8px` -- 8 pixels outside the container bounds. The `overflow-hidden` clips it entirely. The caret is rendered in the DOM but visually invisible.

This is a silent bug. The panel still appears to float disconnected from the pill.

**The fix**: Remove `overflow-hidden` from the outer panel container. The scroll containment is already handled by the inner scroll div (line 254-255, which has `overflow-y-auto`). The piano strings layer has its own `overflow-hidden` via the `PianoStrings` component (line 80). The outer container does not need overflow clipping -- it only prevents the caret from rendering.

### 2. Dead WaveformBars Component

The `WaveformBars` function (lines 7-31) and its associated constants (`barHeights`, `barOpacities`, `idleHeights`, lines 7-9) are no longer referenced anywhere. The right-side waveform render was removed in the previous iteration, but the component definition was left behind. Dead code adds cognitive weight and signals lack of craft.

**The fix**: Remove lines 6-31 (the `WaveformBars` component, `barHeights`, `barOpacities`, `idleHeights` constants, and the comment).

## Technical Changes

### File: `src/components/PianoPanel.tsx`

**Change**: On line 221, remove `overflow-hidden` from the className string. Change `"fixed z-30 overflow-hidden"` to `"fixed z-30"`.

### File: `src/components/AmbientAudioPill.tsx`

**Change**: Remove lines 6-31 (the dead `WaveformBars` component and its constants). The unused `showWaveform` variable on line 142 should also be removed since it only served the now-deleted waveform render.

## What Stays Unchanged

All panel interior styling, pill behavior, audio logic, caret positioning, track data, entrance animations.

