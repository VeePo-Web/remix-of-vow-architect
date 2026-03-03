

# Step 11: Detail-Oriented Typography Refinement

This step elevates every typographic element in the CrossOver section to precision-grade quality, ensuring each text element honors the Fitzgerald typography system and brand standards.

---

## 11a. Tagline Typography — Weight and Tracking Refinement

**Current:** `font-display font-light text-xl md:text-2xl uppercase tracking-[0.18em] text-foreground/70`

**Issues:**
- `text-xl` (20px) to `text-2xl` (24px) is too small for a tagline that carries the brand covenant. The tagline "'Til Death ; Unto Life" is the most sacred text on the page — it should command presence without shouting.
- `tracking-[0.18em]` is slightly tight for uppercase display text at this scale. The brand standard specifies `0.22em` for uppercase labels.
- `font-light` (300) is correct for Cormorant Garamond display.

**Fix:**
- Scale up to `text-2xl md:text-3xl` (24px mobile, 30px desktop) — aligning with the Fitzgerald "section headings" tier.
- Increase tracking to `tracking-[0.22em]` — matching the brand's uppercase label standard.
- Keep `font-light` and `text-foreground/70`.

---

## 11b. Semicolon Scale — Proportional to Tagline

**Current:** `text-2xl md:text-3xl text-primary` — the semicolon is already one step larger than the surrounding text.

**Issue:** With the tagline scaling up (11a), the semicolon should maintain its proportional lead. It should be 1.25x the tagline size to create the "pivot" effect.

**Fix:** Scale the semicolon to `text-3xl md:text-4xl` (30px mobile, 36px desktop). This keeps the sacred object visually dominant within the tagline — the threshold between Death and Life.

---

## 11c. Sacred Quote (h2) — Line Height and Max-Width

**Current:** `font-display font-normal text-[clamp(32px,5vw,48px)] leading-[1.15] tracking-[0.02em] text-foreground max-w-2xl`

**Issues:**
- `font-normal` (400) — the brand standard for Cormorant Garamond headings is weight 300-400. At this display size (up to 48px), `font-light` (300) would create more elegance and breathing room. The weight 400 feels slightly heavy for a sacred quote at this scale.
- `max-w-2xl` (672px) — this is tight for the longer headline "Let your ceremony sound like what your hearts feel like." which may break awkwardly. Widening to `max-w-[720px]` gives the text one more word per line at desktop, creating a more balanced two-line break.
- `leading-[1.15]` — at 48px, this yields ~55px line-height. For a two-line sacred quote, `leading-[1.2]` (57.6px) gives slightly more breathing room between lines without feeling loose.

**Fix:**
- Change `font-normal` to `font-light` — whisper, don't speak.
- Change `max-w-2xl` to `max-w-[720px]` — better line breaks.
- Change `leading-[1.15]` to `leading-[1.2]` — more air between lines.

---

## 11d. Quotation Mark Treatment

**Current:** Opening and closing quotation marks use `font-light text-foreground/80` — they are the same weight as the surrounding text and only slightly dimmed.

**Issue:** In luxury typography, quotation marks on display text are typically de-emphasized further — they frame the quote without competing with it. The marks should feel like the edges of a frame, not part of the text.

**Fix:**
- Reduce opacity to `text-foreground/40` — the marks become whisper-quiet frames.
- Add a slight size reduction using `text-[0.8em]` — proportionally smaller than the quote text at any responsive size.
- Add `align-top` on the opening mark and slight negative margin to tuck it closer to the first letter.

---

## 11e. Trust Anchor — Typography Precision

**Current:** `font-sans text-sm leading-relaxed tracking-[0.01em] text-foreground/50`

**Issues:**
- `text-sm` (14px) with `leading-relaxed` (1.625) — this yields ~22.75px line-height. For a single-line trust anchor at this size, `leading-normal` (1.5) is sufficient and tighter.
- `tracking-[0.01em]` — nearly invisible tracking. For body text at 14px, `tracking-normal` (0) is cleaner.

**Fix:**
- Change `leading-relaxed` to `leading-normal` — tighter single-line text.
- Remove `tracking-[0.01em]` (use default) — cleaner at this size.

---

## 11f. Commitment Statement — "Always." Emphasis

**Current:** `font-display font-light text-lg italic tracking-[0.02em] text-foreground/70` with "Always." in `font-normal not-italic tracking-[0.04em] text-primary`.

**Issues:**
- `text-lg` (18px) — this is the "lead paragraph" tier. For a commitment statement that closes the section, it should feel slightly more present. However, it must not compete with the h2. Current size is correct.
- The "Always." treatment is good — the shift from italic serif to upright primary-colored text creates the emphasis. But `font-normal` (400) on "Always." when the surrounding text is `font-light` (300) creates a subtle weight contrast that is correct.
- `tracking-[0.04em]` on "Always." is slightly wide. Reducing to `tracking-[0.03em]` creates a more precise separation.

**Fix:**
- Tighten "Always." tracking from `tracking-[0.04em]` to `tracking-[0.03em]`.
- No other changes — the italic-to-upright shift and color change are working.

---

## Summary

| # | Element | Current | New | Impact |
|---|---------|---------|-----|--------|
| 11a | Tagline size | text-xl/text-2xl, 0.18em | text-2xl/text-3xl, 0.22em | More presence, brand-standard tracking |
| 11b | Semicolon | text-2xl/text-3xl | text-3xl/text-4xl | Proportional pivot maintained |
| 11c | Sacred quote | font-normal, max-w-2xl, 1.15 LH | font-light, max-w-[720px], 1.2 LH | Lighter weight, better line breaks, more air |
| 11d | Quote marks | text-foreground/80, same size | text-foreground/40, 0.8em | Whisper-quiet frames |
| 11e | Trust anchor | leading-relaxed, 0.01em | leading-normal, default | Tighter, cleaner |
| 11f | "Always." | tracking-[0.04em] | tracking-[0.03em] | Precision tightening |

**One file modified** (`CrossOver.tsx`). Six typographic refinements. Zero visual layout changes. Zero new dependencies. Pure typography precision.

