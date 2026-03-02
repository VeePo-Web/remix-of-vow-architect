

# Step 7: The Section Overture — Headline & Label Sacred Typography

## Current State

The top of the section — the first thing visitors see after scrolling past TheTransformation — contains:

- A small uppercase label: "THE PREPARATION" (`text-xs`, `tracking-[0.22em]`, `text-muted-foreground`)
- A headline: "Not a performer— / your ceremony pianist." with a vow-yellow underline under "pianist"
- A warm glow behind "pianist" (200x120px radial at 3% opacity)

After completing Steps 4-6 (letterpress declarations, embossed kit tiles, threshold closing), this opening now feels **under-designed by comparison**. The declarations below have golden threads, glow bridges, and material depth. The kit grid has staggered diamond breathing and embossed paper stock. The closing has a display-serif sacred invitation with a breathing diamond. But the headline — the section's first impression — is a plain text label and a heading with a thin underline.

## Three Deficiencies

### A: The Label Lacks Ceremony

"THE PREPARATION" is set in `text-xs` with standard tracking and muted color. It enters with a basic opacity/translate reveal. Every other section on the site treats its label as a ritualistic overline — a whispered announcement of what follows. This label needs a golden diamond prefix (matching the thread system) and slightly warmer color that responds to scroll depth.

**Fix:** Add a small golden diamond before the label text, breathing with the 4s thread cycle. Increase tracking to `0.28em` for more spacious ceremony pacing. Add a subtle warm shift using `--witness-warmth` that takes the label from cool muted to slightly warmer as the visitor scrolls deeper.

### B: The Headline Glow is Too Weak

The 200x120px glow behind "pianist" at 3% opacity is barely perceptible. On the cream background, it reads as nothing. The headline should feel as though candlelight is catching the word "pianist" — the same atmospheric treatment applied to the declaration cards' diamond glow bridges, but at headline scale.

**Fix:** Increase the glow pool to 300x160px at 5% base opacity, with warmth-responsive intensification (`calc(0.7 + var(--witness-warmth) * 0.3)`). Add a secondary, tighter glow (100x60px) directly behind the underline that pulses with the same 4s breathing cycle. The underline itself should have a soft glow halo (`box-shadow`) matching the golden thread treatment.

### C: No Visual Bridge Between Label and Headline

The label sits `mb-4` above the headline with nothing connecting them. In the brand system, the golden thread connects related elements (declarations to thread, diamonds to cards). Here, the label announces the section and the headline delivers its promise — but visually they float independently.

**Fix:** Add a short vertical golden thread segment (24px) between the label and headline, breathing with the standard 4s cycle. This creates continuity with the declaration thread below and establishes that the entire right column is "stitched" together by gold — from label to headline to declarations to kit to closing.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Label diamond prefix** — Add a 4px golden diamond (rotate-45) before "THE PREPARATION" text, using `witness-thread-diamond` class for breathing consistency. Increase tracking to `0.28em`.

2. **Thread bridge** — Insert a 24px vertical golden thread segment between the label and headline (below `mb-4`), using the same gradient and breathing animation as the declaration thread. Wrapped in a `flex justify-start` container with `my-3` spacing.

3. **Headline glow upgrade** — Increase the glow pool dimensions and base opacity. Add a secondary tighter glow behind the underline. Add `box-shadow` glow halo to the underline span itself.

4. **Warmth-responsive label** — Apply `opacity: calc(0.55 + var(--witness-warmth) * 0.15)` to the label so it subtly warms from cool to present as the visitor scrolls.

### File: `src/index.css`

5. **Label overline diamond** — Add `.witness-label-diamond` class with the same breathing animation as other diamonds, but at 4px scale for the label context.

6. **Thread bridge segment** — Add `.witness-label-thread` with the vertical gradient and 4s breathing opacity animation, matching `.witness-golden-thread`.

7. **Underline glow halo** — Add `.witness-pianist-underline` box-shadow: `0 0 8px hsl(var(--vow-yellow) / 0.08)` that breathes with 4s cycle to create the impression of gold leaf catching candlelight beneath the word.

8. **Reduced motion fallbacks** — Disable diamond breathing, thread breathing, underline glow, and warmth-responsive opacity under `prefers-reduced-motion: reduce`.

## What This Achieves

- The section label transforms from a plain overline into a ritualistic announcement, prefixed by a breathing golden diamond that connects it to the brand's sacred object system
- A short golden thread stitches the label to the headline, establishing visual continuity with the declaration thread below — the entire right column becomes one continuous golden spine
- The headline glow intensifies to create visible candlelight atmosphere behind the key word "pianist"
- The underline gains a soft glow halo, matching the golden thread treatment and elevating it from a CSS border to a gilded accent
- The section's first impression now matches the quality of everything below it — no longer the weakest element in a chain of strong ones

