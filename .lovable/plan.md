

# Fix: Ambient Audio Pill Text Overflow and Layout Integrity

## The Problem

The pill has two compounding layout failures visible in the screenshots:

1. **Idle state**: "HEAR ME PLAY" wraps to two lines inside a container that is only `h-[14px]` tall and `min-w-[80px]` wide. With `text-[12px]` uppercase and `tracking-[0.16em]`, the text overflows its container, breaking the single-line pill form factor.

2. **Playing state**: Track titles like "RIVER FLOWS IN YOU" and "COMPTINE D'UN AUTRE ETE" wrap to three lines, ballooning the pill from a sleek 44px capsule into an ugly multi-line blob.

The root cause: the text container uses `min-w-[80px]` which was barely adequate for `11px` text but is far too narrow after the typography upgrade to `12px` with wider tracking. The `h-[14px]` height constraint compounds the problem -- it does not prevent wrapping, it just clips or distorts.

## The Fix

Replace the fragile fixed-dimension text container with a robust single-line layout:

- **Remove `min-w-[80px]` and `h-[14px]`** from the text span container
- **Add `whitespace-nowrap`** to both the idle label and the track title spans -- this is the definitive solution to text wrapping in a pill
- **Use relative positioning without absolute overlays** -- replace the stacked-absolute approach with a simpler structure where one span is rendered at a time (using conditional rendering gated on `isPlaying`), or keep the absolute approach but on a container that sizes itself to the content via `min-w-fit`
- **Keep the crossfade** by using the absolute overlay pattern but with `whitespace-nowrap` on both layers and removing the fixed height/width constraints

### Specific changes in the text container (lines 233-250):

**Current:**
```
<span className="relative min-w-[80px] h-[14px] flex items-center">
```

**New:**
```
<span className="relative min-w-[100px] h-5 flex items-center">
```

And add `whitespace-nowrap` to both inner text spans.

The `min-w-[100px]` accommodates "Hear me play" comfortably. The `h-5` (20px) gives the text breathing room without stretching the pill (which is `h-11` / 44px). Both inner spans get `whitespace-nowrap` to prevent wrapping under any track title length.

For extremely long titles like "Comptine d'un autre ete", add `overflow-hidden text-ellipsis` so the title truncates gracefully with an ellipsis rather than expanding the pill infinitely.

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Fix text container dimensions and add `whitespace-nowrap` + `text-ellipsis` + `overflow-hidden` to prevent multi-line wrapping |

## What Stays Unchanged

All state logic, animation state machine, surface styling (the luxury overhaul just applied), waveform bars, shuffle system, progress line, and positioning remain exactly as they are.

