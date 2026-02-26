

# Vow Moment — 7-Step Design Elevation to Fantasy.co Quality

## Current State Critique

The Vow Moment is the emotional apex of the entire homepage -- the "altar interstitial" where the brand's core promise is declared in proclamation scale. It sits between the warm Process section and The Invitation. Currently it has the right narrative intent but falls short of world-class execution in these ways:

1. **No atmospheric texture** -- The section is a flat radial gradient from `hsl(240 12% 5%)` to `hsl(240 9% 2%)` with a single 5%-opacity vow-yellow glow. No grain, no fog, no depth. Every other dark section on the page (hero, CrossOver) has film grain and atmospheric layers. This one feels like a colored rectangle.

2. **No cinematic background image** -- This is a full-viewport sacred moment but has zero imagery. A subtle, barely-visible background image (ceremony altar, candlelit aisle, hands exchanging rings) at very low opacity would give the void materiality without competing with the text.

3. **The quote has no staggered reveal** -- The entire blockquote fades in as one unit via `opacity-0` to `opacity-100`. Fantasy.co would reveal each line sequentially: "Every vow spoken" (first), "becomes sacred" (second, with underline draw), "the moment it's heard." (third). This creates reading rhythm and dramatic pacing.

4. **The underline animation is static** -- The golden underline beneath "becomes sacred" is rendered immediately with the text. It should draw from center outward (or left to right) with a 450ms delay, matching the brand's vow-underline reveal standard.

5. **No ambient breathing** -- The vow-yellow glow is static at 5% opacity. It should pulse very subtly (3% to 6% over 6 seconds) to create the sense that this moment is alive, breathing, waiting.

6. **Top/bottom section fades use hardcoded colors** -- The top fade from Process uses `hsl(45 30% 92%)` and the bottom fade to Invitation uses `hsl(45 25% 96%)`. These should match the actual neighboring section backgrounds precisely.

7. **No reduced-motion consideration for the ambient glow** -- While the global rule exists, the glow has no animation to reduce. Once we add breathing, we need to ensure the fallback works.

---

## The 7-Step Transformation

### Step 1: Generate a Sacred Ceremony Background Image

Generate an AI image for this section -- a softly lit ceremony altar scene, shallow depth of field, warm candlelight, with a cinematic film-grain aesthetic. This image will sit at 8-10% opacity behind the text, giving the void materiality and emotional context without competing with the proclamation.

**Technical:**
- Generate via AI image generation (Nano banana pro for quality)
- Save to `src/assets/vow-moment-altar.jpg`
- Add as an `<img>` element in VowMoment.tsx with `opacity-[0.08]`, `object-cover`, and `pointer-events-none`

### Step 2: Add Film Grain and Atmospheric Fog

Add the grain overlay and a warm fog layer consistent with hero and CrossOver sections. This eliminates the visual discontinuity where this section is the only dark section without atmospheric texture.

**Technical changes in `VowMoment.tsx`:**
- Add `grain` div with `opacity-[0.08]`, matching hero pattern
- Add a subtle warm fog radial gradient at 2-3% opacity
- Add `section-grain` class to the section element

### Step 3: Implement Staggered Line Reveal

Replace the single `opacity` transition with a three-phase staggered reveal:
- Line 1 ("Every vow spoken") at 0ms delay
- Line 2 ("becomes sacred") at 400ms delay
- Line 3 ("the moment it's heard.") at 800ms delay

Each line gets its own `<span className="block">` with independent opacity + translateY transitions. This creates the dramatic reading rhythm that Fantasy.co uses for proclamation moments.

**Technical changes in `VowMoment.tsx`:**
- Wrap each line in its own `<span>` with individual `transition-all duration-700` and staggered `transitionDelay`
- Each line transitions from `opacity-0 translate-y-4` to `opacity-100 translate-y-0`

### Step 4: Animate the Sacred Underline

The golden underline beneath "becomes sacred" should draw from center outward using `scale-x-0` to `scale-x-100` with `origin-center`. This uses the brand's standard 450ms vow-underline timing. The underline should appear after line 2 is fully visible (delay: 800ms from section visible).

**Technical changes in `VowMoment.tsx`:**
- Change the underline span to use `scale-x-0` / `scale-x-100` transition with `origin-center`
- Apply `transition-transform duration-[450ms]` with `transitionDelay: 800ms`
- Match the easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (brand standard)

### Step 5: Add Ambient Breathing to the Glow

The vow-yellow radial glow should breathe with a slow 6s cycle, oscillating between 3% and 6% opacity. This creates the sensation that the sacred moment is alive. Add a keyframe animation applied to the glow div.

**Technical changes in `src/index.css`:**
- Add `@keyframes vow-glow-breathe` with `0% { opacity: 0.03 }` and `100% { opacity: 0.06 }`
- Apply to the glow layer with `animation: vow-glow-breathe 6s ease-in-out infinite alternate`

**Technical changes in `VowMoment.tsx`:**
- Apply the animation class or inline style to the glow div
- Add `will-change: opacity` for GPU compositing

### Step 6: Refine Section Fade Transitions

Ensure the top fade precisely matches the Process section's exit color and the bottom fade matches The Invitation's entry color. Currently the Process section ends with a warm journal gradient, so the top fade should transition from that warm palette into the void. The bottom fade should match `hsl(45 25% 96%)` (The Invitation's background).

**Technical changes in `VowMoment.tsx`:**
- Top fade: `linear-gradient(to top, transparent, hsl(40 25% 90%))` (matching Process section's updated warm cream)
- Bottom fade: Keep `hsl(45 25% 96%)` (already correct for TheInvitation)

### Step 7: Performance and Accessibility

Ensure all new elements use compositor-only properties. The background image uses `loading="lazy"`. The grain overlay uses `pointer-events: none`. Add reduced-motion fallback for the breathing glow animation. Verify the staggered text reveal degrades to immediate visibility under reduced motion.

**Technical changes:**
- Add `will-change: opacity` to glow and fog layers
- Reduced-motion: glow breathing stops (static at 5%), text appears immediately without stagger
- Background image: `loading="lazy"` and `aria-hidden="true"`
- Film grain: `pointer-events: none` and low z-index

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `src/assets/vow-moment-altar.jpg`, `VowMoment.tsx` | New AI image + integration |
| 2 | `VowMoment.tsx` | Grain overlay + fog layer |
| 3 | `VowMoment.tsx` | Staggered 3-line reveal |
| 4 | `VowMoment.tsx` | Animated underline draw |
| 5 | `index.css`, `VowMoment.tsx` | Breathing glow animation |
| 6 | `VowMoment.tsx` | Section fade color refinement |
| 7 | `VowMoment.tsx`, `index.css` | Performance + reduced motion |

All changes are atmospheric and typographic refinements -- no layout restructuring, no new dependencies.

