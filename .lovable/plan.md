

# Audit: Category Dividers Read as Flat Rules, Not Illuminated Bracing

## Finding

Inside a grand piano, the horizontal structural elements (the plate bracing, the hitch pin rail) are not uniformly lit. Light from the open lid falls most intensely at the center and fades toward the sides, creating a natural gradient across every horizontal surface. This is one of the visual signatures that makes the interior of a piano feel three-dimensional rather than flat.

The current category divider lines (lines 372-377) use a uniform `hsl(var(--vow-yellow) / 0.12)` across their full width. Combined with the interior light gradient we added earlier (which illuminates from the top), these dividers should reflect that same light source -- brighter at center, fading to near-invisible at the edges. This is how real horizontal surfaces inside a piano catch overhead light.

This is a single-property change on an existing element. No new DOM nodes.

## The Refinement

Replace the flat `background` color on each category divider with a horizontal gradient that peaks at center and fades to transparent at both edges.

### Technical Change

**File: `src/components/PianoPanel.tsx` (line 376)**

Current:
```jsx
background: "hsl(var(--vow-yellow) / 0.12)",
```

New:
```jsx
background: "linear-gradient(to right, transparent 0%, hsl(var(--vow-yellow) / 0.14) 40%, hsl(var(--vow-yellow) / 0.14) 60%, transparent 100%)",
```

Key details:
- Center section (40%-60%) holds at 0.14 opacity (slightly brighter than the previous flat 0.12 to compensate for the fade)
- Edges fade to fully transparent, creating the illusion of light fall-off
- No timing or animation changes -- this is a static gradient on a 1px element

## What Stays Unchanged

All track rows, accent bars, waveform, strings, interior glow, border, fade masks, scroll logic, caret, panel dimensions, animation timing.

