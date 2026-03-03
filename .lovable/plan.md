

# THE COVENANT KEPT — Radical Simplification

## Philosophy

The current section is overengineered: 6 atmospheric overlay divs, letterpress card materials with pseudo-element grain textures, SVG quote motifs, diamond-endpoint separators, breathing animations, and candle pool glows. This violates the lagom principle. The testimonials should feel like whispered truths in a warm room — not a layered Photoshop composition.

The directive is clear: **simple, bold, clear.** Strip to essence. Let typography and space do the work. Replace all quote text with "Placeholder."

---

## Changes

### File 1: `src/components/TheWitnesses.tsx` — Rewrite to essence

**Remove entirely:**
- The `QuoteMotif` SVG component
- 4 of 6 atmospheric overlay divs (keep only the vignette and film grain)
- The background image and Ken Burns animation
- Card rotations (`cardRotations` array)
- Diamond ornaments in attribution
- The `witnesses-testimonial-card` class (cards become invisible containers — no material, no borders, no shadows)
- The `witnesses-thread-breathing` class on separators

**Simplify to:**
- Clean warm gradient background (single div, no image)
- One vignette layer
- One grain layer
- Section fades top/bottom (keep)

**Testimonial content:**
- All three quotes become `"Placeholder"`
- Attribution names become `"Placeholder"`
- Venue becomes `"Placeholder"`
- Remove the `blockquote` font-size clamp — use a single clean `text-2xl` (24px) Cormorant
- Remove attribution diamonds — just the name and venue, centered, clean hierarchy

**Typography refinements:**
- Heading: keep "The music stayed with them" with the golden underline on "stayed" — this is the one bold moment
- Overline: keep "THE COVENANT KEPT" label
- Golden rule separator: keep but simplify to a solid `w-8` line

**Separators between testimonials:**
- Replace the breathing diamond-endpoint thread with a simple `w-8 h-px` golden line at 30% opacity. No animation. No pseudo-elements. Static, quiet, precise.

**Semicolon:**
- Keep but remove the glow pool pseudo-element. Just the character at reduced opacity.

**Performance gains:**
- Removes 1 image load (witnesses-venue-ai.jpg)
- Removes 4 DOM nodes (atmospheric divs)
- Removes `backdrop-filter: blur(8px)` from cards (expensive compositor operation)
- Removes SVG quote motifs (3 inline SVGs)
- Removes Ken Burns animation (GPU layer)
- Removes breathing thread animation
- Removes card grain texture SVG data URI

### File 2: `src/index.css` — Strip witnesses styles

**Remove or simplify:**
- `.witnesses-testimonial-card` — reduce to `position: relative` only (no background, no border, no shadow, no backdrop-filter)
- `.witnesses-testimonial-card::before` — remove entirely (candle pool glow)
- `.witnesses-testimonial-card::after` — remove entirely (grain texture)
- `.witnesses-testimonial-card:hover` — remove entirely (no hover state needed for text-only cards)
- `.witnesses-thread-breathing` — remove animation, remove pseudo-elements
- `@keyframes witnesses-thread-breathe` — remove
- `@keyframes witnesses-ken-burns` — remove
- `.witnesses-semicolon::after` — remove (glow pool)
- Corresponding reduced-motion overrides — simplify since there is less to override

---

## Resulting Structure

```text
Section
  Layer 0: Warm gradient background (inline style)
  Layer 1: Vignette (1 div)
  Layer 2: Film grain (1 div)
  Layer 3: Top/bottom fades (2 divs)
  Layer 4: Content
    - "THE COVENANT KEPT" overline
    - Golden rule (w-8)
    - "The music stayed with them" heading
    - Testimonial 1: "Placeholder" / Placeholder / Placeholder
    - Golden separator (w-8, static)
    - Testimonial 2: "Placeholder" / Placeholder / Placeholder
    - Golden separator (w-8, static)
    - Testimonial 3: "Placeholder" / Placeholder / Placeholder
    - Semicolon (;)
```

Total DOM nodes reduced from ~25+ to ~15. Zero animations in section (except scroll reveal transitions). Zero images loaded. Zero backdrop-filter operations. Zero pseudo-element overlays on cards.

---

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Atmospheric divs | 6 | 2 |
| Background images | 1 (Ken Burns) | 0 |
| Card CSS classes | 5 (base, before, after, hover, breathing) | 1 (position only) |
| Animations | 3 (Ken Burns, thread breathe, semicolon pulse) | 0 |
| SVG elements | 3 (quote motifs) | 0 |
| Pseudo-elements | 8 (card before/after x3, thread before/after) | 0 |
| backdrop-filter | Yes (blur 8px) | No |
| Quote text | 3 unique quotes | "Placeholder" x3 |

Two files modified. No new dependencies. Pure subtraction to reach essence.

