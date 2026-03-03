

# Step 7: Typography Overhaul — Bold, Sacred, Pixel-Perfect

This step transforms the CrossOver section's typography from "correct" to "commanding." Every text element is re-examined for font size, weight, tracking, line-height, and hierarchy to ensure the section reads as the emotional crescendo of the entire page.

---

## 7a. Tagline — Increase Presence

**Current:** `text-xl md:text-2xl uppercase tracking-[0.25em] font-display font-light text-foreground/70`
- Mobile: 20px, Desktop: 24px. Weight 300. Tracking 0.25em.

**Issue:** The tagline "'Til Death ; Unto Life" is the brand's covenant — the most sacred phrase on the entire site. At 24px desktop, it is smaller than the headline below it (48px), which is correct hierarchically, but the gap is too large (2x ratio). The tagline should occupy the "section subtitle" tier (24px) confidently, but needs tighter tracking to feel more composed. 0.25em is very wide — it fragments the words. Reduce to 0.18em for a more unified reading while maintaining the uppercase overline aesthetic.

**Fix:** Change `tracking-[0.25em]` to `tracking-[0.18em]`. Keep sizes and weight unchanged — the hierarchy is correct.

---

## 7b. Sacred Quote (Headline) — Typographic Command

**Current:** `text-[clamp(32px,5vw,48px)] font-display font-light leading-[1.15] tracking-[0.02em]`
- Ranges from 32px mobile to 48px desktop. Weight 300. Line-height 1.15.

**Issue:** This is the section's dominant statement. At `font-light` (300), the headline whispers — which aligns with the brand's "whispers authority" principle. However, for the closing CTA section — the final emotional crescendo — the headline should carry slightly more weight. Increase to `font-normal` (400) for the headline text itself, while keeping the quotation marks at `font-light` (300) to create a subtle weight contrast that frames the quote.

The `clamp(32px,5vw,48px)` range is correct for the Fitzgerald scale (32px = near fitz-6, 48px = hero display). Line-height 1.15 is tight but appropriate for a single-line display quote. Tracking 0.02em is correct for display serif.

**Fix:** Change `font-light` to `font-normal` on the `<h2>`. Change the quotation mark spans from `font-normal` to `font-light` — this inverts their current relationship, making the quote text heavier than its decorative marks.

---

## 7c. Quotation Marks — Typographic Refinement

**Current:** Quotation marks use `<span className="font-normal">` wrapping Unicode characters `\u201C` and `\u201D`.

**Issue:** With the headline moving to `font-normal` (400), the quotation marks should step down to `font-light` (300) to create a visual bracket effect — lighter marks framing heavier content. Additionally, the marks should be slightly larger than the body text to create proper typographic "hanging punctuation" feel. Add a subtle opacity reduction (90%) so the marks feel like ornamentation, not content.

**Fix:** Change quotation mark spans to `font-light text-foreground/80`. This creates a clear hierarchy: marks (300 weight, 80% opacity) frame the quote (400 weight, 100% opacity).

---

## 7d. CTA Button Text — Precision Audit

**Current:** `font-sans tracking-[0.02em]` on the Link inside the Button with `text-base` (16px).

**Issue:** The CTA text "Hold my date" uses Inter at 16px with 0.02em tracking. This is correct — CTAs use the sans-serif body font, not the display serif. The 0.02em tracking adds slight breathability without fragmenting. However, the brand standard for CTAs calls for verb-forward text with optional period. Consider whether "Hold my date" benefits from a period: "Hold my date." The period adds finality and compositional weight.

**Assessment:** The period is optional per brand standards. Without it, the CTA reads as a gentle invitation. With it, it reads as a composed statement. For the closing section — the final CTA on the page — the period adds appropriate gravitas.

**Fix:** Add period: "Hold my date."

---

## 7e. Trust Anchor — Body Typography Check

**Current:** `text-sm font-sans text-foreground/50 leading-relaxed tracking-[0.01em]`
- 14px Inter, 50% opacity, relaxed line-height (~1.625), minimal tracking.

**Assessment:** This is correct. The trust anchor is supporting microcopy — it should be the quietest text in the section. 14px Inter at 50% opacity on dark creates sufficient legibility (confirmed in Step 6d) while receding behind the CTA. No change needed.

---

## 7f. Commitment Statement — Sacred Closing Weight

**Current:** `text-lg font-display font-light text-foreground/70 italic` with `tracking-[0.02em]` via inline style. "Always." uses `text-primary font-normal not-italic tracking-[0.04em]`.

**Issue:** The commitment statement "Response within 24 hours." is the brand's promise of reliability. At `text-lg` (18px) Cormorant italic, it reads as a gentle footnote. This is appropriate — it should not compete with the headline. However, the inline `letterSpacing: "0.02em"` duplicates the className tracking approach used elsewhere. Convert to Tailwind class for consistency.

Also, the "Always." accent word uses `tracking-[0.04em]` which is wider than the surrounding text's 0.02em. This 2x tracking difference creates a subtle visual "lift" on the word — correct for emphasis. The `not-italic` override on "Always." creates a weight contrast against the italic context — also correct.

**Assessment:** Typography is sound. One consistency fix: move inline `letterSpacing` to Tailwind `tracking-[0.02em]` class.

**Fix:** Remove inline `letterSpacing: "0.02em"` from the style prop. Add `tracking-[0.02em]` to the className string.

---

## 7g. Tagline Semicolon — Scale Relative to Text

**Current:** The semicolon inherits `text-xl md:text-2xl` from its parent `<p>`, plus `text-primary inline-block`.

**Issue:** The semicolon is the brand's most sacred typographic element. At the same size as the surrounding text, it blends in. For the closing section — where the tagline appears as a bookend — the semicolon should be slightly larger than its context to create a visual "pivot" effect. Increase by one step to create emphasis without breaking the line.

**Fix:** Add `text-2xl md:text-3xl` to the semicolon span, making it one size step larger than the surrounding text (20/24px text becomes 24/30px semicolon). This creates a subtle scale contrast that draws the eye to the threshold character.

---

## Summary

| # | Element | Change | Rationale |
|---|---------|--------|-----------|
| 7a | Tagline tracking | `0.25em` to `0.18em` | More composed, less fragmented |
| 7b | Headline weight | `font-light` to `font-normal` | Emotional crescendo demands authority |
| 7c | Quotation marks | `font-normal` to `font-light text-foreground/80` | Lighter marks frame heavier content |
| 7d | CTA text | Add period: "Hold my date." | Composed finality for closing CTA |
| 7e | Trust anchor | Confirmed correct | No change |
| 7f | Commitment tracking | Inline style to Tailwind class | Consistency |
| 7g | Semicolon scale | One size step larger than context | Sacred pivot emphasis |

**One file modified** (`CrossOver.tsx`). Five typographic refinements, one consistency fix, one confirmation. Zero new dependencies.

