

# Step 9: The Living Surface — Micro-Interaction & Hover State Mastery

## Current State

Steps 4-8 elevated the static composition of The Preparation: letterpress declarations, embossed kit tiles, sacred typography, narrative prose, and threshold closing. But the section is currently **dead on hover**. When the visitor's cursor moves across it, almost nothing responds. The kit cells have a basic `group-hover:text-foreground` color change. The ghost CTA has a CSS underline. The declaration cards have no hover state at all. The image frame sits inert.

In the Fantasy.co standard, every surface acknowledges the visitor's presence — not with entertainment, but with the quiet responsiveness of a living material. When you hover over hand-laid invitation paper, the light catches differently. When your finger approaches a gilded edge, the gold seems to warm. This is the standard.

## Five Deficiencies

### A: Declaration Cards Have No Hover Response

The three declaration cards are beautifully composed but completely inert. On hover, nothing shifts. In the brand system, cards lift subtly (translateY -2px) over 180ms with shadow expansion. These cards should feel like individual sheets of invitation stock — when the cursor approaches, the paper catches the light and lifts imperceptibly from the surface.

**Fix:** Add hover: translateY(-2px) with shadow deepening and a subtle warm border brightening. The golden thread diamond beside the hovered card should pulse its glow momentarily. Transition at 180ms with the standard mood curve.

### B: Kit Cells Lack Material Response

The kit tiles have a text color change on hover, but the tile itself does not respond. The embossed paper stock should catch light on hover — the top border brightens, the inner shadow shifts, and the diamond icon intensifies its glow. The effect should feel like tilting a letterpress card under a warm lamp.

**Fix:** On hover, increase top border opacity, add a subtle inner glow (box-shadow inset), and scale the diamond icon to 1.15x with increased glow radius. The text tracking could loosen by 0.02em for a micro-expansion feel. All at 180ms.

### C: Image Frame Has No Living Depth

The left column image frame sits at fixed opacity with Ken Burns drift. When the visitor hovers over it, nothing changes. A living photograph should respond to attention — the vignette could lighten slightly, revealing more of the image, as though the room's candlelight flared when someone drew near.

**Fix:** On hover, reduce the vignette opacity from 0.75 to 0.5 and increase the image opacity from 0.35 to 0.42 over 400ms (sacred reveal tempo). The warm border glow should intensify from 0.1 to 0.18. The effect is barely perceptible but creates the sensation of leaning closer into the frame.

### D: Ghost CTA Underline Draws Statically

The closing CTA "See my three paths" has a dash line beside it, but the hover underline (from CSS) draws uniformly. In the brand system, underlines draw from left to right with vow-yellow gradient, not appear instantly. The CTA also lacks the breathing glow backdrop that threshold CTAs should carry.

**Fix:** The existing `.witness-ghost-cta` CSS already has `::before` and `::after` pseudo-elements defined. Ensure the `::after` underline uses `transform: scaleX(0)` to `scaleX(1)` with `origin-left` on hover at 250ms. The `::before` glow backdrop should intensify from 0.03 to 0.06 opacity on hover.

### E: Golden Thread Does Not Respond to Proximity

The vertical golden thread beside the declarations breathes on a 4s cycle, but it does not respond to which card is being hovered. In a world-class implementation, the thread segment adjacent to the hovered card would brighten momentarily — as though the gold is warming near the point of attention.

**Fix:** Use CSS sibling selectors. When a declaration card is hovered, add a CSS rule that brightens the thread's opacity in that region. Since the thread is a single element, simulate this with a transition on the thread's overall opacity from 0.3 to 0.5 when any card within the container is hovered. This is achievable with a parent-level `:hover` on the declarations container targeting the thread child.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Declaration card hover classes** — Add `hover:-translate-y-[2px]` and `hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]` to each declaration card div. Add `hover:border-[hsl(45_25%_80%_/_0.4)]` for warm border brightening. Transition already set at 700ms for reveal; add a separate `duration-[180ms]` for hover by using the existing `transition-all` (which covers both).

2. **Kit cell hover enhancement** — Add `hover:-translate-y-[1px]` and `hover:shadow-[inset_0_1px_4px_hsl(var(--vow-yellow)_/_0.08)]` to each kit cell. The diamond inside gets `group-hover:scale-[1.15]` and `group-hover:shadow-[0_0_10px_hsl(var(--vow-yellow)_/_0.25)]`.

3. **Image frame hover** — Add a group class to the image frame container. On hover, the image opacity transitions from 0.35 to 0.42 and the vignette overlay reduces. Use inline style with a CSS class `.witness-image-frame:hover img` selector in index.css for clean separation.

4. **Thread proximity response** — Add a hover rule on the declarations container that increases the golden thread opacity. CSS: `.witness-declarations-container:hover .witness-golden-thread { opacity: 0.6; }`.

### File: `src/index.css`

5. **Declaration card hover** — Add `.witness-declaration-card:hover` with `transform: translateY(-2px)`, `box-shadow`, and `border-color` transitions at `180ms`.

6. **Declaration card diamond glow on hover** — `.witness-declaration-card:hover .witness-thread-diamond` increases `box-shadow` glow radius from 6px to 12px.

7. **Kit cell material response** — `.witness-kit-cell:hover` adds inner glow, top border brightening, and micro-lift. `.witness-kit-cell:hover .witness-kit-diamond` scales to 1.15 with expanded glow.

8. **Image frame living depth** — `.witness-image-frame:hover` reduces vignette, warms border glow, over 400ms sacred tempo.

9. **Thread proximity** — Parent container `:hover` brightens the golden thread from 0.3 to 0.5 opacity at 250ms.

10. **Reduced motion fallbacks** — Under `prefers-reduced-motion: reduce`, disable all translateY hover lifts (keep only opacity/color changes). The surface still acknowledges the visitor but without spatial movement.

## What This Achieves

- Every surface in the section responds to the visitor's cursor with the quiet acknowledgment of a living material
- Declaration cards lift like individual sheets of invitation paper catching candlelight
- Kit tiles brighten at the edges like embossed letterpress stock tilted under a warm lamp
- The image frame opens slightly on hover, as though the room's light flared when someone drew near
- The golden thread warms when the visitor's attention is near the declarations, connecting spatial proximity to material response
- The ghost CTA draws its underline with directional intention rather than appearing uniformly
- All hover states use the brand's 180ms acknowledgment tempo — never slow enough to feel deliberate, never fast enough to feel mechanical
- Reduced motion users still receive color and opacity acknowledgment without spatial movement

