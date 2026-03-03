

# Step 14: Visual, UI, and UX Refinement — The Crossing as Sacred Space

This step is a comprehensive audit and polish of every visual, UI, and UX detail in The Crossing section. Steps 1-13 built the architecture, atmosphere, and transitions. Step 14 refines the lived experience — the precise spacing between elements, the typographic weight of each word, the visual hierarchy that guides the eye from tagline to button to promise without conscious effort.

---

## 14-A. Vertical Spacing Audit — Fitzgerald Scale Enforcement

The current spacing uses Tailwind utilities (`mb-10`, `mb-14`, `mb-6`, `mb-8`) which map to arbitrary values (40px, 56px, 24px, 32px). These are close to the Fitzgerald scale but not exact. This step locks every vertical gap to the scale:

| Element pair | Current | Corrected | Fitz token |
|---|---|---|---|
| Vertical thread to tagline | mb-8 (32px) | 32px | fitz-6 (correct) |
| Tagline to sacred quote | mb-10 (40px) | 56px | fitz-8 (generous separation) |
| Sacred quote to CTA button | mb-14 (56px) | 56px | fitz-8 (correct) |
| CTA button to trust anchor | mb-6 (24px) | 24px | fitz-5 (correct) |
| Trust anchor to golden thread | mb-10 (40px) | 32px | fitz-6 (tighten — thread is a divider, not a section) |
| Golden thread to commitment | mb-8 (32px) | 24px | fitz-5 (tighten — these are a couplet) |

Key change: increase tagline-to-quote gap from 40px to 56px to create more reverence before the main declaration. Tighten the bottom cluster (trust anchor, thread, commitment) to feel like a unified "closing block" rather than separate elements.

---

## 14-B. Typography Weight and Size Refinement

Current issues:
- The tagline "'TIL DEATH ; UNTO LIFE" uses `text-2xl md:text-3xl` (24px/30px) with `tracking-[0.22em]`. The letter-spacing is correct for overlines but the size is slightly small for the emotional weight it carries. Increase to `text-[28px] md:text-[34px]` — a custom size that sits between the scale points, justified because this is the brand's covenant, not a standard heading.
- The sacred quote uses `clamp(32px, 5vw, 48px)` which is correct.
- The trust anchor text at `text-sm` (14px) is correct for supporting copy.
- "Always." in the commitment line uses `text-primary` (vow-yellow). Verify this renders as the warm gold, not a generic primary.

---

## 14-C. CTA Button Visual Polish

The button currently has `cta-commitment cta-breathe-glow` classes. This step adds:
- Explicit `rounded-[6px]` to enforce the brand maximum (under 8px). The current `rounded-full` from button defaults is too casual for this sacred moment.
- `font-sans font-medium` to ensure Inter at weight 500 — confident without shouting.
- Verify the gilded border from Step 12 (`border border-[hsl(45_100%_76%_/_0.25)]`) renders correctly. If the Tailwind arbitrary value syntax fails, move to an inline `style` prop.

---

## 14-D. Accessibility Pass

- The `h2` sacred quote is the only heading in the section. Verify it is semantically correct (the previous section should end with its own heading hierarchy).
- Add `role="text"` to the tagline `p` element to prevent screen readers from splitting "'TIL DEATH" and "UNTO LIFE" into separate announcements.
- Verify the CTA link has sufficient contrast: vow-yellow text on dark background passes WCAG AA (ratio ~11:1 — passes).
- Add `aria-describedby` linking the CTA button to the trust anchor text, so screen readers announce "Hold my date. Includes your bespoke ceremony arrangement..." as a unified action.

---

## 14-E. Focus State and Keyboard UX

- The CTA button's focus ring should use `focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(240_9%_2%)]` — a vow-yellow ring with a dark offset that matches the section background.
- Tab order: vertical thread (decorative, skip) -> tagline (no interaction, skip) -> CTA button (focusable) -> commitment text (no interaction). Only one focusable element in the section — clean.

---

## 14-F. Mobile UX Refinement

- On mobile (`< 768px`), the section padding is `py-[80px]` which is correct (fitz-9).
- The sacred quote at `clamp(32px, 5vw, 48px)` renders at ~32px on 375px screens — verify this is readable and does not orphan words awkwardly.
- The CTA button padding `px-10 py-5` (40px/20px) — verify touch target height is at least 44px. With py-5 (20px top + 20px bottom) + text line-height, the total should be ~56px. Passes.
- The vertical golden thread (40px tall, 1px wide) is decorative and invisible to assistive tech — correct.

---

## 14-G. Reduced Motion Verification

Ensure all animated elements degrade gracefully:
- Ken Burns on background image: add `@media (prefers-reduced-motion: reduce)` override to stop animation.
- Semicolon heartbeat: should already have a reduced motion check (conditional `animation` based on `isVisible`). Add an explicit CSS fallback.
- Breathing vignette, floating motes, particle dust: all should freeze under reduced motion. Verify the existing `prefers-reduced-motion` rules in `index.css` cover these keyframe names.
- The scroll-triggered reveals (opacity + translateY) should snap to final state under reduced motion — the `useScrollReveal` hook already handles this.

---

## Summary of Changes

| # | Refinement | File | Impact |
|---|---|---|---|
| 14-A | Spacing audit | CrossOver.tsx | Fitzgerald-locked vertical rhythm |
| 14-B | Typography size | CrossOver.tsx | Tagline size increase, weight check |
| 14-C | Button polish | CrossOver.tsx | Rounded corners, font enforcement |
| 14-D | Accessibility | CrossOver.tsx | aria-describedby, role attributes |
| 14-E | Focus states | CrossOver.tsx | Vow-yellow focus ring on CTA |
| 14-F | Mobile UX | CrossOver.tsx | Touch target + readability verification |
| 14-G | Reduced motion | index.css | Fallbacks for all CrossOver animations |

**Two files modified:** `CrossOver.tsx` (spacing, typography, accessibility, button) and `index.css` (reduced motion fallbacks). Seven refinements. The section moves from "built" to "crafted."

