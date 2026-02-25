

# Gateway Refinement -- Ambient Audio Pill Border Warmth Transition

## Audit Finding

The icon crossfade, text dissolve, and waveform bloom are now all breathing. One binary snap remains: the **border color**. When toggling between idle and playing states, the pill's border jumps instantly from `border-white/[0.08]` (cool, neutral) to `border-[hsl(var(--vow-yellow)/0.15)]` (warm, golden). This is handled by a className swap -- but because the border color property is not included in the pill's `transition` declaration, the shift is instantaneous.

The current transition property is explicitly scoped: `transition-[background-color,border-color] duration-[180ms]`. This *should* work. However, the border classes themselves are being swapped via conditional `cn()` -- Tailwind generates different class names for each state, and the browser treats this as a full class replacement rather than a smooth property interpolation. The background transitions correctly because both states use `bg-white/[...]` (same hue, different alpha). But the border jumps from a `white` base to an `hsl(var(--vow-yellow))` base -- a hue shift that *does* interpolate correctly in CSS, but only if both classes coexist with the transition property applied consistently.

The real issue: the conditional ternary applies *either* the warm border *or* the cool border class, never both simultaneously. The outgoing class is removed before the transition can occur. This is a common Tailwind pitfall with state-dependent styling.

## The Fix

Instead of swapping border classes conditionally, apply a single persistent border with a CSS custom property for color, and transition that property. Specifically:

1. Remove the conditional border classes from the `cn()` ternary
2. Apply a single `border` class to the button at all times
3. Use inline `style` to set `borderColor` based on `isPlaying`, allowing CSS `transition-property: border-color` to interpolate smoothly between the two values
4. Keep the existing `duration-[180ms]` timing

This ensures the border *dissolves* from cool neutral to warm golden over 180ms -- matching the icon crossfade, text dissolve, and background shift. The pill now transitions as a single unified organism rather than snapping one property while breathing the others.

## Specifications

- Remove conditional border color from className ternary
- Add persistent `border` class
- Set `borderColor` via inline style: `isPlaying ? 'hsl(var(--vow-yellow) / 0.15)' : 'rgba(255,255,255,0.08)'`
- Existing `transition-[background-color,border-color] duration-[180ms]` handles the interpolation
- Hover state for idle: keep `hover:bg-white/[0.10]` (background only, no border change on hover)

## File Changed

| File | Change |
|------|--------|
| `src/components/AmbientAudioPill.tsx` | Move border color from conditional className to inline style for smooth CSS transition |

## What Stays Unchanged

All icon crossfade, text dissolve, waveform bloom, positioning (mobile centered / desktop bottom-left), progress line, entrance delay, audio logic, track advancement, reduced motion handling, and background transitions remain exactly as they are.

