

# Step 6: In-Depth Detail Audit — Element-by-Element Precision Pass

This step is a forensic audit of every remaining detail in the CrossOver section. Steps 1-5 addressed typography/shadows, copy, spacing/formatting, transitions, and atmospheric depth. Step 6 examines the micro-details that separate "good" from "sacred": reveal choreography timing, CTA glow calibration, golden thread proportions, trust anchor legibility, commitment statement weight, and the semantic HTML structure.

---

## 6a. Reveal Stagger Choreography — Organic Rhythm

**Current delays:** Tagline 0ms, Headline 120ms, CTA 320ms, Trust anchor 450ms, Golden thread 580ms, Commitment 700ms.

**Issue:** The intervals between reveals are: 120, 200, 130, 130, 120ms. The brand standard calls for stagger delays that are "never uniform — slight variation creates organic rhythm." The current pattern is close but the 200ms gap between headline and CTA is disproportionately large, creating a perceived pause that breaks the processional flow. The sequence should accelerate slightly as it approaches the CTA (the emotional peak), then decelerate after it (the resolution).

**Fix:** Adjust to: Tagline 0ms, Headline 150ms, CTA 300ms, Trust anchor 420ms, Golden thread 560ms, Commitment 700ms. This creates intervals of 150, 150, 120, 140, 140ms — a gentle acceleration into the CTA followed by a settling rhythm. The total sequence duration remains 700ms.

---

## 6b. CTA Ambient Glow — Radial Precision

**Current:** The CTA wrapper has a `relative` div containing:
- An absolute radial glow with `-inset-x-12 -inset-y-6` and `hsl(45 100% 76% / 0.14)` fading to transparent at 70%.

**Issue:** The `-inset-x-12 -inset-y-6` creates a 48px horizontal / 24px vertical overflow. Combined with `inset-0`, this means the glow extends 48px beyond the button on each side horizontally and 24px vertically. This is a generous halo. However, at 14% opacity, the glow is quite prominent for a section that already has a warm fog layer at 3% and floating dust. The cumulative yellow could push past the 6% accent budget.

**Fix:** Reduce glow opacity from `0.14` to `0.10`. This creates a perceptible but restrained halo that works with (not against) the warm fog layer. Also change the spread from `-inset-x-12 -inset-y-6` to `-inset-x-10 -inset-y-5` (40px/20px) for a tighter, more intimate glow pool.

---

## 6c. CTA Button Sizing — Touch Target Audit

**Current:** `size="lg"` with overrides `px-10 py-5 h-auto text-base`. The `lg` variant provides `h-11 px-8 py-3`, but the overrides replace these entirely.

**Issue:** `py-5` = 20px top + 20px bottom = 40px vertical padding. With `text-base` (16px) and line-height, the button height is approximately 56px. This exceeds the 44px minimum touch target — good. However, `px-10` = 40px horizontal padding with "Hold my date" text creates a very wide button. At 16px Inter, "Hold my date" is approximately 108px wide, making the total button approximately 188px. This is proportional for the section width but verify it does not look oversized on mobile.

**Assessment:** The button dimensions are correct. On mobile within `max-w-3xl`, 188px is approximately 55% of the 375px viewport minus padding — visually balanced. No change needed, but confirm `h-auto` is necessary (it overrides the `h-11` from the `lg` variant, allowing `py-5` to determine height).

**Fix:** No change to dimensions. Confirm `h-auto` is intentional — it is, because `py-5` defines the height instead of the locked `h-11`.

---

## 6d. Trust Anchor — Legibility at Low Opacity

**Current:** `text-sm font-sans text-foreground/50 leading-relaxed max-w-md tracking-[0.01em]`.

**Issue:** `text-foreground/50` on a dark background with film grain at 8% opacity creates a legibility challenge. At 14px Inter, 50% opacity white text against near-black has a contrast ratio of approximately 5.3:1 — passing WCAG AA for small text (4.5:1 minimum). However, the grain overlay reduces perceived contrast. The `tracking-[0.01em]` is minimal and correct for body text.

**Assessment:** Contrast passes AA. The grain is at z-[1] and content at z-10, so grain does not literally overlay the text (it sits behind due to z-index). Legibility is maintained. No change needed.

---

## 6e. Golden Thread — Proportional Audit

**Current:** `h-[1px] w-12 mx-auto mb-8`. The thread is 48px wide, 1px tall, with a gradient from transparent to `vow-yellow/0.3` and back, plus an 8px box-shadow glow at `vow-yellow/0.15`.

**Issue:** 48px is on the Fitzgerald scale (fitz-7 = 40px, but 48px is between fitz-7 and fitz-8 = 56px). This is an off-scale value. However, the golden thread is a sacred object — its width is visual, not structural, and 48px provides a proportional accent within the 768px container (6.25% of container width). The `mb-8` (32px = fitz-6) below the thread before the commitment statement is correct.

The `scale-x-0` to `scale-x-100` reveal animation is good — the thread grows from center outward, which is more ceremonial than a fade.

**Assessment:** The 48px thread width is acceptable as a sacred object exception. The box-shadow glow at 0.15 creates a subtle 8px halo — this is correct. No change needed.

---

## 6f. Commitment Statement — Typography Weight

**Current:** `text-lg font-display font-light text-foreground/90 italic` with "Always." in `text-primary font-normal not-italic tracking-[0.04em]`.

**Issue:** The commitment statement uses `font-light` (300) italic Cormorant, which is correct for a sacred closing statement. "Always." switches to `font-normal` (400) non-italic primary color — this creates a weight contrast that emphasizes the word. The `tracking-[0.04em]` on "Always." adds slight letterspace for emphasis.

However, `text-foreground/90` for the main statement is very close to full white. In a section where the headline is `text-foreground` (100%), having the commitment at 90% creates only a 10% difference — insufficient hierarchy. The commitment statement should be softer than the headline to maintain the visual cascade: Tagline (70%) > Headline (100%) > Trust anchor (50%) > Commitment (70-80%).

**Fix:** Change `text-foreground/90` to `text-foreground/70` on the commitment statement. This creates clear hierarchy: the headline commands, the commitment whispers. "Always." remains at primary color for accent.

---

## 6g. Semantic HTML — Heading Level Audit

**Current:** The sacred quote uses `<h2>`. The tagline and commitment use `<p>`.

**Issue:** On the /weddings page, there should be only one `<h1>` (likely in the hero). This `<h2>` is appropriate for a major section heading. The tagline as `<p>` is correct — it is a decorative overline, not a heading. The commitment as `<p>` is correct — it is a closing statement.

**Assessment:** Semantic structure is correct. No change needed.

---

## 6h. Spacing Between CTA and Trust Anchor

**Current:** CTA wrapper has `mb-8` (32px). Trust anchor has `mb-10` (40px).

**Issue:** The gap between the button bottom and the trust text top is 32px. This is fitz-6 — correct for "card internal spacing" but possibly too generous between a CTA and its supporting microcopy. The trust anchor is a direct footnote to the CTA — it should feel attached to the button, not separated from it. Reduce to `mb-6` (24px = fitz-5) for "comfortable breathing" that still feels connected.

The trust anchor's own `mb-10` (40px) before the golden thread is correct — it creates separation between the trust text and the decorative thread.

**Fix:** Change CTA wrapper `mb-8` to `mb-6`. This tightens the CTA-to-trust-anchor relationship from 32px to 24px.

---

## Summary

| # | Element | Change | Rationale |
|---|---------|--------|-----------|
| 6a | Reveal stagger | Adjust delays to 0/150/300/420/560/700ms | Organic acceleration into CTA peak |
| 6b | CTA glow | Opacity 0.14 to 0.10, insets -12/-6 to -10/-5 | Restrained halo, tighter pool |
| 6c | CTA button sizing | Confirmed correct | No change |
| 6d | Trust anchor contrast | Confirmed AA-passing | No change |
| 6e | Golden thread | Confirmed proportional | No change |
| 6f | Commitment opacity | `/90` to `/70` | Hierarchy cascade with headline |
| 6g | Semantic HTML | Confirmed correct | No change |
| 6h | CTA-to-trust gap | `mb-8` to `mb-6` | Tighten CTA microcopy relationship |

**One file modified** (`CrossOver.tsx`). Four refinements. Four confirmations. Zero new dependencies. Pure detail calibration.

