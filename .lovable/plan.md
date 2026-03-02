

# The Invitation — Fantasy.co Final Detail Pass

## Current State

The section has strong foundations: asymmetric two-column layout, intimate first-person copy, warm atmospheric gradient, Ken Burns portrait, and staggered scroll reveals. The previous polish pass fixed the CTA radius, text contrast, and image framing. However, several details still fall short of Fantasy.co-level craft.

## Issues Identified

### 1. Portrait frame class not applied
The CSS defines `.invitation-portrait-frame` with hover states (border warmth, shadow expansion on hover) but the component uses a raw `div` with inline styles. The hover interaction — where the frame subtly warms when the visitor's cursor passes over — is missing entirely. This is a lost micro-interaction that acknowledges the visitor's attention.

### 2. Focus ring uses `border-radius: 100px`
Line 1571 of index.css: `.invitation-cta:focus-visible` has `border-radius: 100px`. This contradicts the brand system's 8px maximum rule and creates a pill-shaped focus ring on keyboard navigation.

### 3. Golden rule has no breathing animation
The horizontal golden rule between the epigraph and heading is static. Every golden element in the brand system breathes — the golden thread has a 4s opacity cycle, the golden diamond pulses. This rule should breathe with a subtle opacity shift to feel alive rather than painted on.

### 4. Credentials use plain middot separators
The `·` separators between credentials are generic. Other sections use golden dot or diamond separators for brand consistency. These should be styled as subtle vow-yellow dots.

### 5. No golden thread between sections
Adjacent sections (VowMoment above, TheSound below) transition via simple gradient fades. A golden thread — the brand's visual sacrament — positioned at the section boundary would create a threshold moment, signaling the visitor is crossing from one emotional space to another.

### 6. Background image lacks Ken Burns on the bg layer
The portrait image has Ken Burns drift (25s), but the background texture layer (the same image at 10% opacity behind everything) is static. Adding a very slow counter-drift would create parallax depth between the atmospheric layer and the foreground portrait.

### 7. The assurance text could use a sacred em-dash accent
The assurance line "Every arrangement I write begins with a single question — what was playing when you knew" ends without emphasis. The phrase "what was playing when you knew" is the emotional payload — it deserves a subtle vow-yellow tint on the em-dash or the final clause to draw the eye.

## Technical Changes

### File: `src/components/TheInvitation.tsx`

1. **Add `invitation-portrait-frame` class to image container** — Add this class to the frame div (line 95) alongside the existing `rounded-sm` class. This enables the CSS hover interaction where the border warms and shadows expand when the visitor hovers over the portrait.

2. **Add breathing animation to golden rule** — Add a CSS animation to the golden rule span that cycles opacity between 0.15 and 0.30 over 4 seconds, matching the brand's breathing rhythm. Use inline style with `animation: invitation-rule-breathe 4s ease-in-out infinite`.

3. **Style credential separators** — Change the `·` characters to `<span>` elements with vow-yellow color at low opacity, creating subtle golden dot separators instead of plain text middots.

4. **Add golden thread at section bottom** — Before the bottom fade, add a centered 1px vertical golden thread (40px tall) with the brand's breathing opacity cycle, positioned at the bottom boundary. This marks the threshold between The Invitation and TheSound.

5. **Add em-dash accent in assurance** — Split the assurance text so the em-dash and final clause "what was playing when you knew" are wrapped in a span with subtle vow-yellow tint (`text-[hsl(var(--vow-yellow))]` at reduced opacity).

6. **Add Ken Burns to background layer** — Add a `invitation-bg-ken-burns` class to the background image div with a 35s drift animation in the opposite direction of the portrait (scale 1 to 1.02), creating subtle parallax depth.

### File: `src/index.css`

7. **Add golden rule breathing keyframe** — New `@keyframes invitation-rule-breathe` that cycles opacity between 0.15 and 0.30 over 4 seconds.

8. **Add background Ken Burns keyframe** — New `@keyframes invitation-bg-ken-burns` with 35s `scale(1)` to `scale(1.02)` drift.

9. **Fix focus ring border-radius** — Change `.invitation-cta:focus-visible` `border-radius` from `100px` to `4px`.

10. **Add golden thread styles** — `.invitation-golden-thread` with 1px width, 40px height, vow-yellow background at 0.15 opacity, and a 4s breathing animation matching the brand's golden thread pattern.

11. **Add reduced motion fallbacks** — Disable the rule breathing, background Ken Burns, and golden thread animations under `prefers-reduced-motion: reduce`.

## What This Achieves

Every detail in the section now participates in the brand's visual language:

- The portrait frame responds to attention (hover warmth)
- The golden rule breathes like a living material
- Credential separators are golden, not generic
- A golden thread marks the sacred threshold between sections
- The assurance line draws the eye to its emotional payload
- Background and foreground layers drift at different rates (parallax depth)
- Keyboard accessibility uses brand-consistent radii

The section moves from "polished" to "every millisecond is intentional."

