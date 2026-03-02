

# Piano Keys Section — World-Class Tactile Overhaul

## Current Assessment

The layout bones are correct — three white keys with two black keys between them, dark cinematic background. But the execution falls short of Fantasy.co quality in several critical ways:

1. **Keys look like flat cards, not piano keys.** No surface texture, no 3D depth, no material realism. Real piano keys have a subtle convex curvature, side facets that catch light differently, and visible gaps between them.
2. **The press-down interaction is nearly invisible.** The chosen key only shifts 4px — it should feel like a genuine key depression with shadow changes that sell the physicality.
3. **Hover lifts upward (-4px) which contradicts piano physics.** Piano keys do not lift — they press down. Hover should simulate a finger approaching (subtle warm glow beneath), and click/active should press the key DOWN.
4. **No gap simulation between keys.** Real piano keys have thin dark gaps between adjacent white keys. Currently the keys butt against each other with only faint side borders.
5. **Black keys lack proper z-depth.** They should sit visually ON TOP of the white keys with a visible drop shadow, not appear flush.
6. **The "MOST CHOSEN" badge is nearly invisible** — it needs to sit clearly above the pressed key.
7. **Too much empty space inside the keys** between the sentence and the CTA button — the content floats in the middle rather than being anchored.
8. **Header alignment is off** — "THREE KEYS" label is left-aligned but should be centered to match the centered headline.

## Plan: 8 Refinements

### 1. Key Surface Realism (CSS)

Add a subtle convex highlight to white keys — a top-to-bottom gradient that simulates the slight curvature of a real ivory key surface. Add a thin inner shadow at the left and right edges to create the illusion of beveled sides. Add a micro-texture using a subtle repeating linear gradient (1px hairlines at very low opacity) to simulate the grain of ivory.

CSS changes to `.piano-white-key`:
- Background: add a third gradient layer — a top highlight (`rgba(255,255,255,0.4)` to transparent over the top 15%)
- Inner shadow: `inset 2px 0 4px rgba(0,0,0,0.04), inset -2px 0 4px rgba(0,0,0,0.04)` for side facets
- Subtle bottom shadow edge to sell the "key sitting on a keybed" illusion

### 2. Key Gap Simulation (CSS)

Add visible dark gaps between adjacent white keys. Currently the keys have only faint borders. Instead, add a `margin-left: 2px` gap between keys (except the first), and give the flex container a dark background so the gap reads as the space between real piano keys. The black keys' negative margins already overlap, so this gap only appears at the bottom where white keys are exposed.

### 3. Press-Down Physics (CSS)

Completely rethink the interaction model:
- **Default state (unchosen keys):** Flat, at rest position
- **Hover:** Do NOT lift. Instead, add a warm underglow beneath the key (`box-shadow: 0 4px 20px rgba(255,224,138,0.08)`) as if candlelight is warming the underside. The key stays in place.
- **Active (`:active`):** Key presses DOWN 3px with shadow collapse — `translateY(3px)` and shadow reduces from `0 8px 32px` to `0 2px 8px`. This is the tactile press.
- **Chosen key (The Prelude):** Permanently pressed down 6px, with the golden underglow always visible and a subtle `box-shadow: 0 2px 12px rgba(255,224,138,0.15)` — as if this key is already being held down.
- **Chosen key hover:** Presses down an additional 2px (total 8px) — the key pushes deeper.
- Transition: 120ms for the press (faster than standard 180ms — mechanical action feels snappier).

### 4. Black Key Depth Enhancement (CSS)

The black keys need to feel like they protrude FROM the keyboard:
- Increase the height to `340px` on desktop (currently 320px) to extend further over the white keys
- Add a stronger bottom shadow: `0 6px 16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)`
- Add a subtle rounded-bottom highlight: a 1px line of `rgba(255,255,255,0.06)` at the very bottom edge, simulating the light catching the underside of the ebony
- Increase z-index to ensure they always visually overlap white keys

### 5. Content Anchoring (TSX)

Push all content to the bottom of the key using `justify-end` (already set), but add `mt-auto` spacing before the name to push everything into the bottom third. Add a `flex-grow` spacer at the top of each key so the name/price/description cluster sits at the bottom, leaving the top 40% as clean ivory surface — like the playing surface of a real key before the fallboard.

### 6. "MOST CHOSEN" Badge Positioning (TSX + CSS)

Reposition the badge from `-top-4` to `-top-8` so it floats clearly above the pressed key with visible breathing room. Add a subtle downward-pointing golden thread (4px tall, 1px wide) connecting the badge to the key top — visually linking the badge to the key it describes.

### 7. Header Centering Fix (TSX)

The "THREE KEYS" label currently has `text-center` but appears left-aligned in the screenshot due to the container. Ensure the header block is fully centered by wrapping in `text-center` on the container. Change the headline from two lines to a single flowing statement: "How deeply do you want me there." — remove the line break.

### 8. Reduced Motion and Mobile (CSS)

- Reduced motion: disable all translateY press effects, keep only opacity and color changes
- Mobile: the stacked keys should still have the press-down effect on `:active` (touch feedback) — critical for mobile tactility. Each stacked key gets `active:translateY(2px)` with shadow collapse.

## Files Modified

### `src/index.css`
- Rewrite `.piano-white-key` surface with convex highlight, inner side shadows, ivory texture
- Rewrite `.piano-white-key:hover` — warm underglow instead of upward lift
- Add `.piano-white-key:active` — 3px press-down with shadow collapse at 120ms
- Rewrite `.piano-white-key--chosen` — 6px permanent press-down with golden underglow
- Add `.piano-white-key--chosen:hover` — 8px press (deeper)
- Add `.piano-white-key--chosen:active` — 10px (deepest press)
- Update `.piano-black-key` with enhanced depth shadows and slightly taller height
- Add key gap styling to the flex container
- Update reduced motion fallbacks
- Add mobile `:active` press states

### `src/components/ThreePaths.tsx`
- Add flex container gap/background for key gap simulation
- Adjust content spacing inside keys (spacer div for top-anchoring)
- Fix "MOST CHOSEN" badge positioning (`-top-8` with connecting thread)
- Ensure headline renders as single line
- Add `:active` class support (CSS handles this, no JS needed)

