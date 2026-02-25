

# Audit: Active Track Row Lacks a Leading Edge Accent

## Finding

The active track row currently signals its state through four cues: gold text color, a radial gradient background at 6% opacity, a 3px dot indicator, and the animated mini waveform. These work together, but the row still reads as "highlighted text" rather than "selected instrument." It lacks the tactile, material quality that defines the rest of the panel -- the strings, the hammer rail, the felt damper, the interior glow all reference real piano anatomy.

In premium audio interfaces (Apple Music's "Now Playing" sidebar, Spotify's queue panel, Linear's active item states), the active row features a vertical accent bar on the leading edge -- a confident, minimal mark that says "you are here" with the authority of a bookmark ribbon pressed into a page. In the context of this piano metaphor, this accent bar evokes a **piano key's sharp edge** -- the precise vertical line where ivory meets ebony, where silence becomes sound.

The existing 3px dot is too small to anchor the eye. The radial gradient is atmospheric but diffuse. A 2px vertical gold bar on the left edge provides the missing structural anchor -- a single confident line that completes the active state hierarchy.

## The Refinement

Modify the active dot indicator (lines 332-343) from a 3px circle to a 2px-wide, 16px-tall vertical bar. This replaces one element with a more visually authoritative version -- no additional DOM nodes needed.

### Technical Change

**File: `src/components/PianoPanel.tsx` (lines 332-343)**

Change the active dot span from a circle to a vertical bar:

Current:
```jsx
<span
  className="flex-shrink-0 rounded-full"
  style={{
    width: "3px",
    height: "3px",
    background: isActive ? "hsl(var(--vow-yellow))" : "transparent",
    transform: isActive ? "scale(1)" : "scale(0)",
    transition: "transform 120ms ease-out, background 120ms",
  }}
/>
```

New:
```jsx
<span
  className="flex-shrink-0 rounded-full"
  style={{
    width: "2px",
    height: isActive ? "16px" : "3px",
    borderRadius: "1px",
    background: isActive ? "hsl(var(--vow-yellow))" : "transparent",
    transform: isActive ? "scaleY(1)" : "scaleY(0)",
    transition: "transform 180ms cubic-bezier(0.22,0.61,0.36,1), height 180ms cubic-bezier(0.22,0.61,0.36,1), background 120ms",
  }}
/>
```

Key differences:
- Width: 3px to 2px (thinner, more refined)
- Height: 3px circle to 16px bar when active (fills ~44% of the 36px row height -- enough presence without overwhelming)
- Border-radius: overridden to 1px (pill-shaped ends, not circular)
- Transform: `scale` to `scaleY` (grows vertically from center, like a piano key being depressed)
- Timing: 120ms to 180ms with the brand easing curve (matches hover timing standard)

## What Stays Unchanged

All other track row styling, text size, gap, padding, radial gradient background, mini waveform, category headers, piano strings, fade masks, scroll logic, caret, panel dimensions, animation timing.

