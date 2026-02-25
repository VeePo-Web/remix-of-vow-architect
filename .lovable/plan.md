

# Audit: Piano Interior Strings and Hammers Lack Visual Presence

## Finding

The current `PianoStrings` component renders decorative elements at extremely low opacity values that are nearly invisible against the rich-black panel background:

- **Strings**: 0.5px wide at 7% vow-yellow opacity -- effectively invisible on most displays
- **Hammer rail**: 0.5px at 10% opacity -- barely perceptible
- **Hammer ticks**: 0.5px wide, 3px tall at 12% opacity -- nearly invisible
- **Felt damper strip**: 1px at 60% opacity of a dark brown (`hsl(40 20% 18%)`) -- the only element with some presence, but it blends into the black background

The piano interior metaphor is the defining visual concept of this panel -- it is what makes it feel like "looking inside a piano" rather than just another dropdown menu. At current values, a user would need to squint to notice the strings exist at all. The decoration fails to deliver on the concept.

## The Refinement

Increase opacity and width values across all decorative elements to make them perceptible but still elegant. The goal is "visible at a glance, not demanding attention" -- the way real piano strings catch light in a dimly lit room.

### Specific changes in `PianoStrings` component:

**Strings (lines 87-95)**:
- Width: `0.5px` to `1px` -- real piano strings have material presence
- Opacity: `0.07` to `0.14` -- double the current value; still subtle but now visible
- Add a subtle vertical gradient so strings fade out toward the bottom (like perspective depth): change `background` from flat color to `linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.18), hsl(var(--vow-yellow) / 0.06))` -- brighter at top where hammers strike, fading toward the bottom

**Hammer rail (lines 99-108)**:
- Height: `0.5px` to `1px`
- Opacity: `0.10` to `0.22` -- a clear horizontal line that reads as the mechanical rail

**Hammer ticks (lines 110-123)**:
- Width: `0.5px` to `1.5px` -- wider than strings to read as hammer felt pads
- Height: `3px` to `5px` -- taller for more presence
- Opacity: `0.12` to `0.25` -- clearly visible as distinct elements at string intersections

**Felt damper strip (lines 127-136)**:
- Height: `1px` to `2px`
- Color: Change from dark brown `hsl(40 20% 18%)` to warm vow-yellow at low opacity: `hsl(var(--vow-yellow) / 0.10)` -- this creates a second horizontal line that pairs with the hammer rail, establishing a clear two-rail structure like a real piano action
- Opacity: `0.6` to `1` (the color itself carries the subtlety via the 10% alpha)

## What Stays Unchanged

String positions/grouping, stagger timing, panel layout, track list, caret, pill, audio logic. The change is purely opacity/size tuning within the existing `PianoStrings` component.

