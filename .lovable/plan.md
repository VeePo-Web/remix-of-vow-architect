

# Step 3: Spacing Precision and Structural Formatting

This step addresses the structural formatting details that sit beneath typography and shadows — container discipline, internal element spacing, unnecessary wrapper complexity, and responsive padding alignment.

---

## 3a. Container Max-Width — Focused Emotional Funnel

**Current:** `max-w-4xl` (896px) on the content container.

**Issue:** The brand standard container is 1200px (`max-w-5xl` = 1024px or custom `max-w-[1200px]`). However, this section is the emotional crescendo — a single column of centered text leading to one CTA. At 896px, the headline and trust text can stretch too wide, breaking the intimate funnel feel. For a centered single-column CTA section like this, the content should be constrained tighter. Change to `max-w-3xl` (768px) — this creates a narrow reading column that draws the eye inward, mimicking the focus of a ceremony aisle.

**Fix:** Change `max-w-4xl` to `max-w-3xl` on the content container div.

---

## 3b. CTA Stack — Remove Unnecessary Flex Row

**Current:** `flex flex-col sm:flex-row gap-4 justify-center items-center mb-8`

**Issue:** There is only one button in this CTA stack. The `sm:flex-row` breakpoint and `gap-4` are artifacts from when there may have been two buttons. With a single CTA, the flex container adds unnecessary DOM complexity. Simplify to `flex flex-col items-center mb-8` — the `flex-col` + `items-center` is sufficient for centering the single button wrapper.

**Fix:** Remove `sm:flex-row gap-4 justify-center` — change to `flex flex-col items-center mb-8`.

---

## 3c. Section Min-Height — Fitzgerald Alignment

**Current:** `min-h-[400px]`

**Issue:** 400px is not on the Fitzgerald spacing scale. For a section with this much vertical padding (`py-[80px] md:py-[120px]`), the min-height is likely unnecessary — the content itself plus padding should fill adequately. However, if the section needs a minimum for short-content viewports, use a viewport-relative value instead: `min-h-[60vh]` on desktop ensures the section commands the screen without an arbitrary pixel value. On mobile, the content stack is taller so min-height is less critical.

**Fix:** Change `min-h-[400px]` to `min-h-[50vh] md:min-h-[60vh]` — proportional to viewport, not arbitrary.

---

## 3d. Section Horizontal Padding — Responsive Scale

**Current:** `px-4` (16px) on the section element.

**Issue:** The brand standard calls for responsive horizontal padding: 16px mobile, 24px tablet, 32px desktop. Currently only the mobile value is set. The container class handles centering, but the section itself should provide the outer padding guard.

**Fix:** Change `px-4` to `px-4 md:px-6 lg:px-8` (16px / 24px / 32px) — aligning to fitz-4 / fitz-5 / fitz-6.

---

## 3e. Headline Max-Width Tightening

**Current:** `max-w-2xl` (672px) on the headline.

**Issue:** With the container now at `max-w-3xl` (768px), the headline at `max-w-2xl` (672px) creates a 48px margin on each side. This is generous but for a single-line quote like "Your vows deserve to be heard." at 48px font size, `max-w-2xl` may force an unnecessary line break on mid-sized viewports. The headline should have enough room to sit on a single line when possible but wrap gracefully when needed. Keep `max-w-2xl` — at 48px Cormorant with the current text, this creates a natural single-line on desktop (the text is ~520px wide at 48px) and wraps elegantly on mobile. Confirmed correct.

**Fix:** No change needed.

---

## 3f. Trust Anchor Max-Width Refinement

**Current:** `max-w-md` (448px) on the trust anchor.

**Issue:** The trust text "Includes sound documentation, microphone setup, and your ceremony run-of-show." at 14px Inter is approximately 480px wide. At `max-w-md` (448px), it wraps to two lines. This is actually desirable — two short lines feel more intimate than one long line for footnote-level text. However, `max-w-sm` (384px) would be too tight. `max-w-md` is correct.

**Fix:** No change needed.

---

## 3g. Bottom Fade Positioning Precision

**Current:** The bottom fade div uses `section-fade-bottom` class with inline `height: 80px`.

**Issue:** The `section-fade-bottom` CSS class likely uses `position: absolute; bottom: 0`. The inline height override to 80px (from Step 15 of the original audit) is correct for the footer bridge handoff. However, the fade should sit within the section's overflow boundary. Confirm `overflow-hidden` is on the section — it is. No structural change needed.

**Fix:** No change needed.

---

## Summary

| # | Element | Change | Rationale |
|---|---------|--------|-----------|
| 3a | Content container | `max-w-4xl` to `max-w-3xl` | Tighter funnel, ceremony aisle focus |
| 3b | CTA stack | Remove `sm:flex-row gap-4 justify-center` | Single button, unnecessary complexity |
| 3c | Section min-height | `min-h-[400px]` to `min-h-[50vh] md:min-h-[60vh]` | Viewport-proportional, not arbitrary |
| 3d | Section padding | `px-4` to `px-4 md:px-6 lg:px-8` | Responsive padding scale |
| 3e | Headline max-width | Confirmed `max-w-2xl` correct | No change |
| 3f | Trust anchor max-width | Confirmed `max-w-md` correct | No change |
| 3g | Bottom fade | Confirmed correct | No change |

**One file modified.** Four structural formatting changes. Three confirmations. Zero new dependencies. Pure spatial discipline.

