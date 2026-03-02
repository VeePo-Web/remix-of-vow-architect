

# The Invitation — Ceremony-Grade Polish Pass

## Current Assessment

The two-column asymmetric layout, rewritten copy, and atmospheric layers from the previous plan are solid. However, several details still undercut the section's ceremony quality:

### Issues Found

1. **CTA pill uses `border-radius: 100px`** — a fully rounded pill shape. The brand system explicitly prohibits rounded corners larger than 8px. This reads as a consumer SaaS button, not a sacred invitation. The pill also has `backdrop-filter: blur(8px)` which is glassmorphism.

2. **Image double-border effect** — The `outline: 1px solid ... / 0.10` with `outlineOffset: 6px` creates a visible double-frame that reads as a CSS demo effect rather than a considered photographic frame. The inner `boxShadow` already provides the frame quality; the outline is redundant.

3. **The warm gradient is nearly invisible.** The gradient runs from `hsl(30 10% 14%)` to `hsl(28 8% 9%)` — a 5% lightness shift on a very dark base. The section should feel like a warm exhale between two dark sections (VowMoment above, TheSound below), but it reads as another dark void. The background image at 8% opacity with a 1px blur is also barely contributing.

4. **Text opacity is too low.** The epigraph sits at `opacity: 0.5` via CSS class. Body text at `text-white/55`. These are below the WCAG AA contrast threshold on a dark background. The text should be readable without straining — `text-white/65` for body, epigraph at 0.6 minimum.

5. **The label "THE INVITATION"** is fine but could benefit from a subtle vow-yellow accent to distinguish it from generic meta text.

## Technical Changes

### File: `src/components/TheInvitation.tsx`

1. **Remove image outline/outlineOffset** (lines 104-105) — delete the `outline` and `outlineOffset` properties from the frame style. The existing `border` and `boxShadow` provide sufficient framing.

2. **Increase body text opacity** — Change `text-white/55` to `text-white/65` on both body paragraphs (lines 199, 209) for better readability.

3. **Warm the background gradient** — Shift the gradient to create a more visible warm atmosphere: from `hsl(30 10% 14%)` to `hsl(28 12% 16%)` at 0%, and `hsl(25 8% 8%)` at 100%. This widens the lightness range and adds perceptible warmth.

4. **Increase background image opacity** — From 0.08 to 0.10, and reduce blur from 1px to 0px. The image should provide subtle texture, not just a vague smudge.

5. **Add a label accent** — Change the label color from `text-white/50` to include a subtle vow-yellow tint: `text-[hsl(45_60%_70%_/_0.5)]` to subtly signal this is a section name, not generic metadata.

### File: `src/index.css`

6. **Fix CTA pill border-radius** — Change `.invitation-cta--pill` `border-radius` from `100px` to `4px`. Remove `backdrop-filter: blur(8px)`. This transforms it from a SaaS pill into a quiet, considered invitation button.

7. **Fix CTA pill after pseudo-element** — Update `.invitation-cta--pill::after` positioning to match the new border-radius (adjust bottom/left/right to sit flush with the 4px radius).

8. **Increase epigraph opacity** — Change `.invitation-epigraph` `opacity` from `0.5` to `0.6`.

9. **Increase epigraph font size** — Nudge from `clamp(16px, 2.5vw, 18px)` to `clamp(17px, 2.5vw, 20px)` so the opening quote has more presence.

## What This Achieves

| Before | After |
|--------|-------|
| CTA pill with 100px radius (SaaS) | CTA with 4px radius (considered) |
| Image double-border outline effect | Single warm border frame |
| Background barely warm (14% to 9% lightness) | Visible warm gradient (16% to 8%) |
| Body text at 55% opacity (hard to read) | Body text at 65% opacity (comfortable) |
| Epigraph at 50% opacity, 16-18px | Epigraph at 60% opacity, 17-20px |
| Glassmorphism blur on CTA | No blur, clean surface |

The section moves from "implemented correctly" to "ceremony-grade" — every detail passes the North Star test without requiring structural changes.

