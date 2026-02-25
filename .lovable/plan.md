

# Audit: Panel Lacks Interior Warmth -- The "Light Falling Into an Open Piano" Effect

## Finding

When you open a grand piano lid and look inside, the most striking visual quality is how ambient light catches the brass strings and gold-painted frame from above, creating a warm glow concentrated at the top that fades into shadow below. The current panel is uniformly dark -- the strings and hammers exist but float in a void with no sense of light source or depth.

The panel background is flat `rich-black` with no gradient variation. The border is `0.08` opacity vow-yellow -- nearly invisible. The box-shadow provides external depth but no interior warmth. The result: the decorative piano elements feel pasted onto a dark rectangle rather than existing inside a lit instrument.

World-class dark UI panels (Apple Music's album detail, Spotify's canvas view, Linear's command palette) use subtle interior radial gradients to create depth and a sense of space. For this piano metaphor, the gradient should simulate the warm light that falls through an open grand piano lid.

## The Refinement

Two changes that add interior warmth without touching any existing elements:

### 1. Interior light gradient -- warm glow at the top of the panel

Add a new decorative div inside `PianoStrings` that renders a radial gradient positioned at the top-center of the panel. This creates the illusion of warm light falling onto the strings from the open lid above.

- Shape: `radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 60%)`
- Position: absolute, covering the full panel area
- This is extremely subtle (4% max opacity) but provides the crucial warm-to-dark vertical transition that makes the string area feel "lit"

### 2. Panel border warmth increase

- Border opacity: `0.08` to `0.12` -- a 50% relative increase that gives the panel a perceptible warm edge, like the gilt rim of a piano's cast iron frame
- This is on the main panel div (line 249)

## Technical Changes

### File: `src/components/PianoPanel.tsx`

**1. Add interior light gradient inside PianoStrings (after the felt damper strip, before closing div -- after line 136):**

Add a new div:
```jsx
<div
  className="absolute inset-0 rounded-[16px]"
  style={{
    background: "radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 60%)",
    opacity: visible ? 1 : 0,
    transition: "opacity 260ms ease-out 80ms",
  }}
/>
```

**2. Panel border (line 249):**

Change from:
`border: "1px solid hsl(var(--vow-yellow) / 0.08)"`
to:
`border: "1px solid hsl(var(--vow-yellow) / 0.12)"`

## What Stays Unchanged

All piano strings, hammer rail, hammer ticks, felt damper, fade masks, scroll logic, track rows, category headers, caret, pill, audio logic, panel dimensions, animation timing.

