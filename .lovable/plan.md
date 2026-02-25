

# Piano Interior Pop-Up Player -- Luxury Audio Menu

## Vision

When the user clicks the "Hear me play" pill, instead of simply toggling playback, a luxurious pop-up panel rises from the pill. The panel's interior is designed to evoke the inside of a grand piano -- vertical golden strings running the full height, subtle hammer mechanisms at the top, and a warm charcoal/cream material palette. Tracks are organized by genre categories (Hymns, Worship, Pop, Classical, Film) with each category as a collapsible row. The entire experience feels like opening the lid of a Steinway.

## Architecture

### Interaction Model

1. **Pill click** no longer toggles play/pause directly. Instead it toggles the pop-up panel open/closed.
2. **Inside the panel**, clicking a track starts playback. The pill updates to show the playing track with waveform bars and a pause button.
3. **Clicking the pill again** while the panel is open closes it. Clicking the pill while a track is playing and the panel is closed re-opens the panel.
4. A small **pause/play** icon on the pill itself (separate from the main click area) allows toggling playback without opening the panel.

### Track Data Restructure

Replace the flat `tracks` array with a categorized structure:

```text
categories = [
  { id: "hymns",     label: "Hymns",     tracks: [...] },
  { id: "worship",   label: "Worship",   tracks: [...] },
  { id: "pop",       label: "Pop",       tracks: [...] },
  { id: "classical", label: "Classical", tracks: [...] },
  { id: "film",      label: "Film",      tracks: [...] },
]
```

Each track: `{ title: string, src: string }`. The `src` fields remain empty for now (design-only phase).

### Panel Design Specifications

**Dimensions and Position:**
- Panel width: `320px` on desktop, full-width minus `24px` margin on mobile
- Panel max-height: `420px`
- Position: anchored above the pill, aligned left on desktop, centered on mobile
- Border-radius: `16px`
- Appears with a `260ms` ease-out scale+opacity animation from the pill's center

**The Piano Interior Surface:**
- Background: `bg-[hsl(var(--rich-black))]` with a subtle warm overlay
- **Strings**: 12-16 thin vertical lines (`0.5px` width) spanning the full panel height, using `hsl(var(--vow-yellow) / 0.08)` -- barely visible golden threads that evoke piano strings. Spacing is uneven (grouped in threes like real piano string sets). These are purely decorative SVG/CSS lines behind the content layer.
- **Hammer rail**: A single horizontal line at `8px` from top, `hsl(var(--vow-yellow) / 0.12)`, with tiny `3px` perpendicular ticks at each string intersection -- suggesting hammers at rest. This is a subtle SVG overlay.
- **Felt damper strip**: A `1px` horizontal band at `~20px` from top with a slightly warmer tone (`hsl(40 20% 18%)`) suggesting the felt damper rail inside a piano.
- Border: `1px solid hsl(var(--vow-yellow) / 0.08)`
- Inner shadow: `inset 0 1px 0 rgba(255,255,255,0.04)` for the glass-light catch
- Backdrop blur: `backdrop-blur-xl` (24px)
- Outer shadow: `0 24px 80px rgba(0,0,0,0.5)` for dramatic depth

**Category Headers:**
- Font: `font-sans text-[10px] uppercase tracking-[0.24em]`
- Color: `text-muted-foreground/50`
- Left-aligned with a thin `hsl(var(--vow-yellow) / 0.06)` rule below
- Padding: `px-5 pt-4 pb-1.5`

**Track Rows:**
- Font: `font-display text-[15px] font-light tracking-tight`
- Color: `text-foreground/70` default, `text-foreground` on hover, `text-[hsl(var(--vow-yellow))]` when active/playing
- Height: `36px` per row
- Padding: `px-5`
- Hover: background shifts to `hsl(var(--vow-yellow) / 0.03)` with `180ms` transition
- Active track: small `2px` golden dot appears to the left of the title, waveform bars appear to the right
- On click: track begins playing, pill collapses to show track title + waveform

**Scrolling:**
- If content exceeds max-height, a custom scrollbar appears: `2px` wide, `hsl(var(--vow-yellow) / 0.15)` thumb on transparent track
- Top and bottom fade masks (gradient to transparent) indicate scroll availability

**Close Affordance:**
- Clicking outside the panel closes it
- Pressing Escape closes it
- The pill itself acts as a toggle

### Pill State Changes

When the panel is open:
- Pill border warms to `hsl(var(--vow-yellow) / 0.25)`
- "Hear me play" text changes to "Listening Room" (crossfade, 120ms)
- Play icon rotates to a subtle `X` or chevron-down to indicate "close"

When a track is playing and panel is closed:
- Pill shows track title + waveform bars (current behavior)
- Clicking pill re-opens panel
- A small inline pause button (separate click target) on the pill allows pause without opening panel

### Animation Choreography

**Open sequence (260ms total):**
1. Panel scales from `scale(0.96) translateY(8px)` + `opacity: 0` to `scale(1) translateY(0)` + `opacity: 1` (260ms, cubic-bezier(0.22, 0.61, 0.36, 1))
2. Strings fade in at `+100ms` delay (180ms duration)
3. Category headers stagger in at `+150ms`, `+180ms`, etc. (120ms each)

**Close sequence (200ms):**
1. Content fades to `opacity: 0` (100ms)
2. Panel scales to `scale(0.97)` + fades (200ms)

**Track selection:**
1. Tapped row briefly flashes `hsl(var(--vow-yellow) / 0.08)` (150ms)
2. Golden dot appears with scale-in (120ms)
3. Waveform bars begin animating

## File Changes

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Major refactor: add `isPanelOpen` state, restructure tracks into categories, extract `PianoPanel` sub-component, update pill click to toggle panel, add track selection handler, update pill label states |

## Technical Details

- The panel is rendered as a sibling `div` to the pill `button`, positioned with CSS (`fixed` or `absolute` relative to the pill)
- Click-outside detection via a transparent overlay `div` behind the panel when open
- Keyboard: `Escape` closes panel, arrow keys navigate tracks, `Enter` selects
- All piano interior decorations (strings, hammers, damper felt) are rendered as a single absolutely-positioned decorative layer using CSS pseudo-elements and/or thin `div` elements -- no images, no SVG files, pure CSS for performance
- Reduced motion: panel appears with opacity-only (no scale), strings appear immediately, no stagger

## What Stays Unchanged

- Audio element and playback logic
- Shuffle system
- Progress line on the pill
- Entrance animation sequence
- Pill positioning coordinates
- All Gateway page code

