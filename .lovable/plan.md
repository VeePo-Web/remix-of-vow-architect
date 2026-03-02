

# The Invitation — Final Micro-Detail Pass

## Current State

After three successive elevation passes (layout restructure, polish, and detail pass), the section is 95% ceremony-grade. The two-column layout, atmospheric depth, breathing golden elements, portrait hover warmth, and vow-yellow accents are all in place. What remains are the kinds of details that separate "very good" from "every millisecond is intentional."

## Remaining Issues

### 1. Dead CSS: `.invitation-credential-plaque` (lines 1494-1505)
The old glassmorphism credential container was removed in a previous pass, but its CSS rules (hover shadow, focus-within state) still exist. Dead code signals incomplete work — a Fantasy studio ships clean.

### 2. No `role="region"` or screen reader narrative
TheExhale has `role="region"` and `aria-label`. TheInvitation has `aria-labelledby` but lacks `role="region"` and has no `sr-only` span narrating the section's purpose for screen reader users. The brand covenant includes "reverence for every person who might visit."

### 3. Mobile gap between image and text is too generous
The grid uses `gap-16` (64px) on mobile. When the image stacks above the copy, 64px of empty space between them feels like a disconnect rather than breathing room. `gap-10` (40px) on mobile preserves intimacy while `md:gap-20` (80px) on desktop keeps the luxury spacing.

### 4. Top/bottom fade colors create temperature mismatch
The top fade goes to `hsl(240 9% 4%)` — a cool blue-black. But the section background starts at `hsl(28 12% 16%)` — a warm brown. The cool-to-warm seam is visible. The top fade should blend from the VowMoment's dark color space (which is also cool `hsl(240 12% 5%)`), so this is actually correct. However, the bottom fade also goes to `hsl(240 9% 4%)` while TheSound below starts at approximately `hsl(220 15% 8%)`. The bottom fade should match TheSound's color temperature for a seamless transition.

### 5. The heading `text-balance` may cause uneven line breaks
The `text-balance` utility on the heading can cause unexpected wrapping at certain viewport widths, pushing "could be one of them." to a third line. Replacing with `text-pretty` (or removing it and relying on max-width) gives the browser more freedom to wrap naturally at the longest-line-first strategy, which reads better for this copy.

### 6. CTA rule (en-dash) lacks `will-change` for smooth hover
The extending en-dash rule animates `width` on hover — a layout property. This triggers reflow and can jank on lower-end devices. Switching to a `scaleX` transform on hover with a fixed width container would be GPU-composited and silky smooth.

### 7. Portrait image `decoding="async"` should pair with `fetchpriority="low"`
The image is lazy-loaded and below the fold, but lacks `fetchpriority="low"` to signal the browser that this image can yield to above-the-fold resources. Minor performance detail but consistent with "performance as design."

## Technical Changes

### File: `src/components/TheInvitation.tsx`

1. **Add `role="region"` to section** — Add this attribute alongside the existing `aria-labelledby`. Also add a `sr-only` span inside the section that narrates: "Parker's personal invitation — he plays only five weddings a year and devotes months of preparation to each one."

2. **Fix mobile gap** — Change `gap-16 md:gap-20` to `gap-10 md:gap-20` on the grid container (line 74). 40px on mobile, 80px on desktop.

3. **Fix bottom fade color** — Change the bottom fade from `hsl(240 9% 4%)` to `hsl(220 15% 8%)` to match TheSound's color space for seamless transition.

4. **Replace `text-balance` with `text-pretty`** on the heading (line 170) for more natural line breaking.

5. **Add `fetchpriority="low"`** to the portrait `img` element (line 106-111).

### File: `src/index.css`

6. **Remove dead `.invitation-credential-plaque` CSS** (lines 1494-1505) — These styles are orphaned from the removed glassmorphism container.

7. **Fix CTA rule animation to use transform** — Change `.invitation-cta-rule` from animating `width` to using a fixed width with `scaleX` transform. Set `width: 24px` with `transform: scaleX(0.5)` as default, and `transform: scaleX(1)` on hover. This eliminates layout-triggered reflow.

## What This Achieves

| Detail | Before | After |
|--------|--------|-------|
| Dead CSS | 12 lines of orphaned credential plaque styles | Clean, no dead rules |
| Screen reader | No section narrative | Full sr-only description |
| Mobile gap | 64px (disconnected) | 40px (intimate) |
| Bottom fade | Cool blue-black seam against TheSound | Matched color temperature |
| Heading wrap | `text-balance` (unpredictable) | `text-pretty` (natural) |
| CTA rule hover | Layout reflow (`width`) | GPU transform (`scaleX`) |
| Image priority | No priority signal | `fetchpriority="low"` |

These are the final 1% details. After this pass, the section is complete — every pixel, every transition, every accessibility consideration is intentional.

