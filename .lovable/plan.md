

# Full-Screen Menu + VeePo Footer — Hickory & Rose-Inspired Upgrade

## Context
The [hickoryandrose](/projects/7f1ad5b8-2dd7-4239-9f44-54c33d440e80) project demonstrates a significantly more polished navigation and VeePo attribution pattern. The current Parker Gawryletz site needs to adopt key UX/visual patterns from that reference while staying true to the Sacred Sound brand identity.

---

## Part 1: VeePo Footer Attribution — Full Upgrade

The hickoryandrose VeePo section is dramatically bolder: centered, larger card (`max-w-lg md:max-w-xl`), with the actual VeePo logo image, dual gradient borders (top + bottom), a shimmer sweep animation, and much more vertical presence.

### Changes to `src/components/Footer.tsx` (lines 329-376)

1. **Copy VeePo logo asset** from hickoryandrose (`src/assets/veepo-logo.png`) into current project
2. **Expand card dimensions**: `max-w-md` → `max-w-lg md:max-w-xl`, increase padding from `px-8 py-5` → `px-14 py-10 md:px-20 md:py-12`
3. **Add dual gradient borders**: Orange-to-teal 2px line at both top AND bottom (currently only bottom), with reversed gradient direction on bottom for visual interest
4. **Embed VeePo logo image**: Replace text-only wordmark with the actual logo (`h-14 md:h-20`), with drop-shadow glow on hover (`rgba(255,140,42,0.25)`)
5. **Add shimmer sweep**: CSS keyframe animation on hover — a diagonal light sweep across the card
6. **Restructure layout**: Stack vertically and center-align (like hickoryandrose) instead of horizontal row:
   - "This experience was crafted by" (micro-label)
   - Orange-green accent divider line (10px wide)
   - VeePo logo image (hero-sized)
   - "veepo.ca" domain text
   - "Where Vision Meets Precision" + arrow
7. **Warm radial background**: Add `radial-gradient(ellipse at center, rgba(255,140,42,0.06) 0%, transparent 70%)` behind `#0a0a0a` base
8. **Hover box-shadow**: Add outer glow on hover — `0 0 60px rgba(255,140,42,0.12), 0 0 120px rgba(46,175,75,0.06)`
9. **Add shimmer keyframe** in inline `<style>`:
   ```css
   @keyframes shimmer-sweep {
     0% { transform: translateX(-100%); }
     100% { transform: translateX(200%); }
   }
   ```

---

## Part 2: Full-Screen Menu — Premium UX Upgrade

Inspired by hickoryandrose's `NavigationMobileMenu.tsx` which features gold corner accents, breathing center diamond, numbered links, brand mark with shimmer, and mobile CTA with gold sweep. Apply these patterns to the existing FullScreenMenu while keeping the two-zone structure.

### Changes to `src/components/FullScreenMenu.tsx`

1. **Gold corner accents** (lines ~170-230 area): Add two L-shaped gold gradient corner marks — top-left and bottom-right — with staggered entrance (delay 400ms, 500ms). Each is a 10px×10px element with 1px gold gradient lines on two edges.

2. **Center breathing diamond**: Add a breathing golden diamond behind the nav content at `top-1/2 left-1/2` — a 40px gold radial gradient circle that pulses between 0.05 and 0.12 opacity on a 5s cycle. Purely atmospheric.

3. **Numbered page links**: Add zero-padded index numbers before each page link label (01–06) in the Zone 2 nav items. Style: `text-[0.5rem] tracking-[0.15em] text-foreground/20 tabular-nums`, positioned before the label text.

4. **Top decorative line**: After Zone 1 verticals, add a scale-x animated 1px gold gradient line (replaces the current static golden thread separator) — animates from `scaleX(0)` to `scaleX(1)` with 600ms duration at delay 200ms.

5. **Trust signal below contact info** (after line 514): Add a micro-text line: "Response within 24 hours · Always" at `text-[0.65rem] italic text-foreground/15`, entering with 700ms delay.

6. **Remove black key shadow** complexity (lines 433-444): The 2px gradient black-key shadow indicator feels busy. Replace with simpler left-padding indentation only (`md:pl-4 lg:pl-6` for black key items) — cleaner, more hickoryandrose-like.

---

## Part 3: Header Refinements

### Changes to `src/components/MinimalHeader.tsx`

1. **Logo shimmer sweep**: Add a one-time diagonal gold shimmer sweep across the "Parker Gawryletz" wordmark on first appearance (like hickoryandrose's `overflow-hidden` + sweeping gradient span). Duration: 1.2s, delay: matches `headerDelay + 400ms`.

2. **Page context label**: When scrolled, show a small context label next to the logo (current page name) with a gold dot separator — `text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground/40`. Animates in with `opacity: 0 → 1, x: -6 → 0` at 400ms delay.

---

## Technical Notes

- No new dependencies needed (no framer-motion required — all done with CSS transitions/keyframes matching existing patterns)
- VeePo logo asset copied via `cross_project--copy_project_asset`
- All animations include `prefers-reduced-motion` fallbacks
- Touch targets remain 44×44px minimum

