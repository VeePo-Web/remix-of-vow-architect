

# Step 5: Sacred Inventory Kit Grid — From Flat Cells to Embossed Artifact Tiles

## Current State

The kit grid ("What arrives with me") is a 3x2 grid of translucent cells with small diamond icons and uppercase labels. Each cell has:
- Flat `hsl(45 20% 93% / 0.5)` background with `backdrop-filter: blur(4px)`
- A 5px rotating diamond with vow-yellow fill
- Hover: slight background warm + border glow + diamond pulse
- Behind the grid: a faint keys texture at 5% opacity

The grid functions but feels like a **generic UI component** — six identical flat rectangles with text. It lacks the material quality of the declaration cards (Step 4) and does not feel like sacred inventory. Each item should feel like an embossed tile on thick paper — a checklist pressed into invitation stock, not a CSS grid.

## Three Deficiencies

### A: Cells Lack Material Dimension
The cells are flat translucent rectangles. No top-edge highlight, no depth shadow, no sense of being lifted off the surface. The declaration cards now have letterpress depth; these cells sit beside them looking like afterthoughts.

**Fix:** Apply the same material philosophy as the declaration cards — inner top highlight, subtle drop shadow, and a warm cream gradient that shifts from lighter top to slightly darker bottom. But at a smaller scale (these are compact tiles, not full declarations).

### B: Diamond Icons Are Disconnected from Content
The 5px diamonds float above each label without visual relationship. They pulse on hover but have no ambient state that connects them to the golden thread system established in the declarations above.

**Fix:** Add a subtle radial glow emanating from each diamond (matching the declaration card glow bridge from Step 4). The diamonds should breathe in a staggered pattern — not all in unison — creating a "living inventory" that feels like each item is gently confirming its presence. Stagger the animation delay by `index * 700ms` to create a wave pattern across the 6 tiles.

### C: No Visual Hierarchy Between Items
All six items look identical. But "Piano" and "Backup Piano" are the primary instruments; "Sound System" is the amplification; "Printed Cue Sheet" is the preparation artifact; "Liability Insurance" and "Rain Cover" are reassurance items. There is no visual differentiation — the visitor's eye scans flatly across identical cells.

**Fix:** This is subtle and should not break the grid's uniformity. Instead of size or color differences, add a slightly warmer left-edge accent (matching the declaration thread) to the first two items (Piano, Backup Piano) — the primary instruments. This creates a barely perceptible hierarchy that draws the eye to the instruments first, then lets it drift to the supporting items. The accent is a 2px inset left shadow in vow-yellow at 6% opacity.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Upgrade cell inline styles** — Replace the flat background with a vertical gradient matching the declaration card philosophy:
   - `background: 'linear-gradient(180deg, hsl(45 24% 95% / 0.6) 0%, hsl(42 18% 91% / 0.4) 100%)'`
   - `borderTop: '1px solid hsl(45 28% 93% / 0.45)'` (top-edge catch)
   - Remove `backdropFilter` (the letterpress paper effect is better than frosted glass)

2. **Add primary instrument accent** — For `index < 2` (Piano, Backup Piano), add an additional left-edge inset shadow: `inset 2px 0 6px -2px hsl(var(--vow-yellow) / 0.06)`

3. **Stagger diamond breathing** — Add `animationDelay: ${index * 700}ms` to each diamond's style to create a wave pattern instead of synchronous pulsing

### File: `src/index.css`

4. **Kit cell material depth** — Update `.witness-kit-cell` base styles:
   ```css
   box-shadow:
     0 1px 2px -1px hsl(40 20% 50% / 0.05),
     inset 0 1px 0 hsl(0 0% 100% / 0.1);
   ```

5. **Kit cell hover warmth** — Update `.witness-kit-cell:hover` to intensify the top highlight and add a subtle lift:
   ```css
   transform: translateY(-1px);
   box-shadow:
     0 3px 8px -2px hsl(45 25% 50% / 0.1),
     inset 0 1px 0 hsl(0 0% 100% / 0.15);
   ```

6. **Diamond glow halo** — Add `::after` pseudo-element to `.witness-kit-diamond`:
   ```css
   .witness-kit-diamond::after {
     content: '';
     position: absolute;
     inset: -4px;
     border-radius: 50%;
     background: radial-gradient(circle, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%);
     pointer-events: none;
   }
   ```
   This creates a warm glow halo around each diamond, connecting it visually to the vow-yellow system.

7. **Hover diamond glow intensification** — On `.witness-kit-cell:hover .witness-kit-diamond::after`, increase the glow to `0.12` opacity.

8. **Reduced motion fallbacks** — Disable hover transforms, diamond wave animation, and glow pseudo-elements under `prefers-reduced-motion: reduce`.

## What This Achieves

- Kit cells graduate from flat UI rectangles to embossed tiles with material presence matching the declaration cards
- Diamonds breathe in a staggered wave pattern, creating the feeling of a living inventory confirming each item's presence
- Primary instruments (Piano, Backup Piano) receive a barely perceptible warm accent that creates natural visual hierarchy without breaking grid uniformity
- Hovering a tile subtly lifts it and warms its diamond glow — acknowledging the visitor's attention
- The overall kit grid now feels like a checklist pressed into invitation stock, not a CSS component

