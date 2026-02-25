

# Audit: MiniWaveform Bars Animate to Wrong Heights

## Finding

The `MiniWaveform` component inside the PianoPanel references `ambient-wave-0` through `ambient-wave-3` keyframes. These keyframes are defined inside `AmbientAudioPill.tsx`'s inline `<style>` block with max heights of 10px, 14px, 12px, and 8px -- values designed for the pill's waveform bars, which sit in a taller container.

The PianoPanel's mini waveform container is only 12px tall (`h-[12px]`), and the intended max heights are defined in `miniBarHeights` as [6, 10, 8, 5]. But because the keyframes animate to [10, 14, 12, 8], bars 1 and 2 overflow the 12px container (14px and 12px respectively), creating visual clipping. Bar 0 animates to 10px instead of the intended 6px. Only bar 3 (8px vs 5px) stays within bounds but is still disproportionate.

This is a coupling defect -- the panel silently depends on keyframes designed for a different context. If the pill's style block ever changes or the pill unmounts before the panel, the waveform breaks entirely.

## The Refinement

Add a scoped `<style>` block inside `PianoPanel` with dedicated keyframes (`panel-wave-0` through `panel-wave-3`) that use the correct `miniBarHeights` values. Update the `MiniWaveform` animation references accordingly.

### Technical Changes

**File: `src/components/PianoPanel.tsx`**

**1. Add scoped keyframes inside the PianoPanel return (before the overlay div, around line 234):**

```jsx
<style>{`
  @keyframes panel-wave-0 { 0% { height: 3px; } 100% { height: 6px; } }
  @keyframes panel-wave-1 { 0% { height: 3px; } 100% { height: 10px; } }
  @keyframes panel-wave-2 { 0% { height: 3px; } 100% { height: 8px; } }
  @keyframes panel-wave-3 { 0% { height: 3px; } 100% { height: 5px; } }
`}</style>
```

**2. Update MiniWaveform animation name (line 166):**

Change from:
```
ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate
```
to:
```
panel-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate
```

## What Stays Unchanged

All panel layout, strings, interior glow, border, fade masks, track rows, category headers, accent bar, scroll logic, caret, pill behavior, panel dimensions, animation timing curves.

