

# Step 1: Atmospheric Depth Layers — Deep Implementation

## The Core Problem

The Preparation section currently reads as a flat cream rectangle floating between two cinematic sections. Five specific technical issues make the atmospheric layers invisible or broken:

### Issue A: Top Fade Color Mismatch Creates a Dark Stripe
TheTransformation's bottom fade exits to `hsl(45 25% 96%)` (warm cream). But TheWitness's top fade paints `hsl(35 20% 14%)` (warm dark) — the exact opposite direction. This creates a visible dark horizontal bar at the section boundary instead of a seamless transition. The Witness top fade should match TheTransformation's exit: a warm cream, not a dark value.

### Issue B: Background Image at 5% Opacity is Invisible on Cream
The `witness-keys-ai.jpg` background sits at `opacity: 0.05` against a cream background (`hsl(45 22% 95%)`). On a Life-space (light) section, 5% opacity is genuinely invisible — the contrast between a desaturated photo and cream at 5% produces zero perceptible texture. TheInvitation's dark-space background images work at 6-8% because dark backgrounds amplify subtle imagery. On cream, the minimum threshold for perceptibility is 8-12%.

### Issue C: Warm Fog is Too Small and Too Faint
The radial fog ellipse uses `at 50% 30%` with only 4% vow-yellow opacity and a 65% gradient stop. On a cream background, 4% yellow-on-cream is imperceptible. The ellipse also stops at 65%, meaning it covers less than half the section. For a Life-space section, the fog needs to be larger (80%+ stop) and use a warmer, more visible amber rather than relying solely on vow-yellow.

### Issue D: Vignette Has No Visible Effect
The vignette uses `hsl(42 18% 85% / 0.12)` — an 85%-lightness color at 12% opacity applied to a 91-95% lightness background. The difference is ~2-3% lightness at the edges. This is computationally present but visually nonexistent. A Life-space vignette needs to use a noticeably darker warm tone (70-75% lightness) at 15-20% opacity to create edge containment.

### Issue E: Breathing Glow Pool is Positioned Off-Content
The glow pool sits at `left: 10%, top: 20%` — which on desktop places it in the far-left margin area, away from both the image and the text content. It should be positioned near the image column where candlelight would naturally pool, or centered between the columns to create ambient warmth across the content area.

## The Fix — Layer by Layer

### Layer 0: Refined Base Gradient
Change the gradient from a simple top-to-bottom cream to a **three-stop warm gradient** that creates subtle vertical temperature variation:
- Top: `hsl(40 18% 94%)` (slightly cooler entry from the dark Transformation)
- Center: `hsl(45 22% 95%)` (warmest point — the "exhale" peak)
- Bottom: `hsl(38 15% 90%)` (cooling slightly as it approaches the dark ThreePaths below)

This creates an organic warmth arc instead of a flat slab.

### Layer 1: Background Image at Visible Opacity
Increase `witness-keys-ai.jpg` opacity from `0.05` to `0.10` and adjust the filter to create more contrast against cream:
- `opacity: 0.10` (doubled — now perceptible as subtle piano-key texture)
- `filter: saturate(0.4) sepia(0.2) contrast(1.15) brightness(0.85)` — darker, warmer, more contrasty to register against cream
- Maintain the 30s Ken Burns drift via existing `.witness-bg-drift` class

### Layer 2: Intensified Warm Fog with Larger Coverage
Replace the current fog with a two-part fog system:
- **Primary fog:** `radial-gradient(ellipse at 40% 40%, hsl(40 45% 80% / 0.08) 0%, transparent 80%)` — a warm amber cloud positioned near the image column, covering 80% of the section. Using `hsl(40 45% 80%)` instead of pure vow-yellow creates a softer, more atmospheric warmth.
- **Secondary fog:** `radial-gradient(ellipse at 70% 70%, hsl(45 40% 85% / 0.05) 0%, transparent 60%)` — a smaller warm pool near the closing area, giving the bottom third its own glow center.

Both respond to `--witness-warmth` scroll variable: `opacity: calc(0.8 + var(--witness-warmth) * 0.2)`.

### Layer 3: Visible Radial Vignette
Replace the invisible vignette with one that actually darkens the edges:
- `radial-gradient(ellipse at center, transparent 35%, hsl(40 15% 75% / 0.18) 100%)`
- This uses a 75%-lightness warm tone at 18% opacity — creating a visible 8-10% darkening at the edges that contains the section spatially without feeling heavy.

### Layer 4: Repositioned Breathing Glow Pool
Move the glow pool to sit behind/near the image column where it creates the illusion of candlelight spilling from the photograph:
- Desktop: `left: 15%, top: 30%` — overlapping the left column
- Size: `500px x 500px` (up from 400px) to wash across both columns
- Add a second smaller glow pool at `right: 20%, bottom: 30%` near the closing area (200px x 200px), creating a warm pull toward the CTA
- Both breathe via the existing `witness-glow-breathe` keyframe (4s cycle)

### Layer 5: Corrected Top Fade
Replace the dark top fade with a cream-matching gradient:
- `linear-gradient(to top, transparent, hsl(45 25% 96%))` — matching TheTransformation's bottom exit exactly
- This creates a seamless blend instead of a dark stripe

### Film Grain Adjustment
Increase grain opacity from `0.04` to `0.06` on Life-space sections. On cream backgrounds, grain at 4% is invisible; at 6% it creates the tactile paper texture that makes the section feel like invitation stock rather than a screen.

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Layer 0** — Update the section's `background` style to a three-stop gradient
2. **Layer 1** — Increase background image opacity to `0.10` and update filter values
3. **Layer 2** — Replace single fog div with two fog divs (primary + secondary), both wired to `--witness-warmth`
4. **Layer 3** — Update vignette gradient to use darker warm tone at higher opacity
5. **Layer 4** — Reposition the breathing glow pool to `left: 15%, top: 30%` at 500px; add second smaller glow pool near closing
6. **Layer 5** — Fix top fade from `hsl(35 20% 14%)` to `hsl(45 25% 96%)`
7. **Grain** — Update grain opacity from `0.04` to `0.06`

### File: `src/index.css`

8. No CSS changes needed for Step 1 — all atmospheric layers are inline styles or existing utility classes. The breathing keyframes are already defined.

## What This Achieves

The section transforms from a flat cream rectangle into a warm, spatially contained room:
- The visitor sees subtle piano-key texture through the cream (background image at 10%)
- Warm amber fog creates pools of light that shift as they scroll
- Edge vignetting gives the section spatial boundaries — it feels like being inside a room, not looking at a panel
- The glow pool near the image creates the sensation of candlelight spilling from the photograph
- The top transition is seamless — no dark stripe, just a gentle fade from TheTransformation's warm exit into this section's warm cream
- The grain adds tactile paper quality — invitation stock, not screen glass
