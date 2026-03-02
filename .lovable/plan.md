

# Step 4: Declaration Cards — Letterpress Elevation to Fantasy.co Standard

## Current State Assessment

The declaration cards exist as basic cream-gradient rectangles with a golden thread and diamond nodes. They function but feel like styled divs, not sacred promises. Three specific deficiencies prevent them from reaching Fantasy.co quality:

### Deficiency A: Cards Lack Material Presence
The cards use `hsl(45 22% 93% / 0.6)` with a simple gradient — this reads as translucent UI, not as invitation paper. They have no texture, no embossed quality, no sense of physical weight. TheInvitation's portrait frame feels like a material object; these cards feel like CSS rectangles.

**Fix:** Add a subtle inner top highlight (simulating a beveled letterpress edge) and a deeper bottom shadow to create the illusion of paper stock lifted off the surface. Replace the flat gradient with a warm cream that shifts from slightly lighter at the top to slightly darker at the bottom — how real paper catches overhead light.

### Deficiency B: The Golden Thread is Too Thin and Lifeless
The 1px golden thread connects the three declarations but at `hsl(var(--vow-yellow) / 0.15)` opacity, it barely registers against cream. The breathing animation exists but the base state is too faint to create visual continuity. The thread should feel like a gilt spine binding three promises together.

**Fix:** Increase the thread to show a warmer, more present base state. Add a subtle glow halo around the thread (2px blur at lower opacity) to create the impression of gold leaf catching light. The breathing animation should oscillate between "visible" and "luminous" — not between "invisible" and "barely visible."

### Deficiency C: Diamond Nodes Have No Relationship to Card Content
The diamonds sit on the thread but feel disconnected from the text. There is no visual bridge between the diamond (sacred object) and the declaration (sacred promise). The diamond should feel like it is anchoring the promise to the thread — a wax seal on a letter.

**Fix:** Add a subtle radial glow emanating from each diamond into the card, creating the illusion that the golden light of the thread bleeds into the declaration. On hover, this glow should intensify slightly — as if pressing the wax seal makes it catch more light.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Card styling upgrade** — Replace the flat gradient background with a more dimensional treatment:
   - Top edge: lighter warm (`hsl(45 25% 96% / 0.7)`)
   - Bottom: slightly darker (`hsl(42 18% 90% / 0.5)`)
   - Add `boxShadow` with top highlight + bottom depth shadow
   - Add a subtle left-edge gold accent (3px inset shadow) that connects to the thread

2. **Diamond glow bleed** — Add a `::before` pseudo-element on each declaration card that creates a small radial glow at the left edge (where the diamond sits), bleeding golden light from the thread into the card body

3. **Golden thread enhancement** — Increase thread opacity range and add glow halo via box-shadow on the thread element

### File: `src/index.css`

4. **Declaration card material depth** — Update `.witness-declaration-card` with:
   - Base shadow: `0 1px 3px -1px hsl(40 20% 50% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.12)` (top highlight + subtle drop)
   - The inset top highlight simulates overhead light catching a paper edge

5. **Declaration card hover warmth** — Upgrade `.witness-declaration-card:hover` to warm the left-edge glow and intensify the top highlight, creating the feeling of a hand passing over the card

6. **Diamond-to-card glow bridge** — Add `.witness-declaration-card::before` as a 24px radial glow positioned at the left edge, using vow-yellow at 4% base opacity, increasing to 8% on hover

7. **Thread glow halo** — Add `box-shadow: 0 0 3px hsl(var(--vow-yellow) / 0.08)` to `.witness-golden-thread` to create a soft gold-leaf halo around the 1px line

8. **Thread opacity range** — Update the breathing keyframe from `0.6-1.0` to `0.7-1.0` so the thread is always present, never ghostly

## What This Achieves

- Cards feel like letterpress promises on invitation stock — lifted, tactile, warm
- The golden thread reads as a gilt binding spine, not a CSS border
- Diamonds anchor promises to the thread like wax seals on letters
- Hovering a card subtly warms it, as if acknowledging the promise
- The left-edge gold bleed creates visual continuity between thread, diamond, and declaration text
- The overall effect: three sacred promises, bound by gold, pressed into paper

