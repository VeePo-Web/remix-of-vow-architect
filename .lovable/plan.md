

# Step 1: Fantasy.co Typography — The Crossing

The typography in the CrossOver section is already partially refined from the previous audit. This step takes it to world-class Fantasy.co standard by addressing the remaining typographic details that separate "good" from "held breath."

---

## 1a. Tagline — Sacred Display Treatment

**Current:** `text-lg md:text-xl uppercase tracking-[0.22em] font-display font-light text-foreground/80`

**Issue:** The tagline "'Til Death ; Unto Life" is the brand's covenant — the most sacred typographic element on the entire page. At `text-lg` (18px) / `text-xl` (20px), it reads as a label, not a proclamation. It needs to sit at `2xl` (24px) on desktop and `xl` (20px) on mobile — sized as a subtitle, not an overline. The tracking at `0.22em` is the label standard, but for this specific phrase — the covenant itself — it should be slightly wider at `0.25em` to create the carved-in-stone feeling. This is the ONE exception to the `0.22em` rule.

**Fix:** Change to `text-xl md:text-2xl uppercase tracking-[0.25em] font-display font-light text-foreground/70`. Reduce opacity from `/80` to `/70` — the tagline floats above the headline as a whisper, not competing with it.

---

## 1b. Headline — Sacred Quote Sizing and Weight

**Current:** `text-[clamp(32px,5vw,48px)] font-display font-light leading-tight tracking-[0.02em]`

**Issue:** The headline is the emotional climax of the entire page. At `clamp(32px,5vw,48px)` it caps at 48px (5xl) which is correct for the type scale. However, `leading-tight` (1.25) is too compressed for a two-line quote — the lines crowd each other. Change to `leading-[1.15]` — tighter than `tight` but with enough air for the quote marks to breathe. Also, `font-light` (300) is correct for Cormorant display, but the quote marks themselves should feel more present. Wrap the curly quotes in spans with `font-normal` (400) to give them slightly more visual weight — they frame the sacred words.

**Fix:** Change leading to `leading-[1.15]`. Wrap opening and closing quote marks in `<span className="font-normal">` for subtle weight contrast. Remove the `<br />` tag and let `text-wrap: balance` handle the line break naturally — forced breaks create different results across viewports.

---

## 1c. Trust Anchor — Subordinate Clarity

**Current:** `text-sm font-sans text-foreground/50`

**Issue:** The trust anchor text is correctly sized and weighted. However, it's missing `leading-relaxed` (1.625) which would give the single line more vertical presence without increasing font size. Also, `max-w-sm` or `max-w-md` should constrain the line to prevent it from stretching too wide on large viewports.

**Fix:** Add `leading-relaxed max-w-md mx-auto` to ensure the text sits in a contained, readable measure.

---

## 1d. Commitment Statement — Closing Gravitas

**Current:** `text-lg font-display font-light text-foreground/90 italic` with `letterSpacing: 0.02em`

**Issue:** The commitment statement "Response within 24 hours. Always." is the final typographic element — the last words before the footer. It should feel like a closing vow. The `italic` is correct for Cormorant in this devotional context. However, "Always." as a standalone sentence deserves its own typographic emphasis. It should be set as a separate element — not inline — with a slightly different treatment: non-italic, vow-yellow, creating a one-word resolution after the italic promise.

**Fix:** Split into two elements. "Response within 24 hours." remains italic Cormorant. "Always." becomes its own `<span>` or `<p>` element: `text-primary font-display font-normal not-italic tracking-[0.04em]` — non-italic, vow-yellow, slightly wider tracking. This creates a two-beat rhythm: promise, then seal.

---

## 1e. CTA Button Text

**Current:** "Hold my date →" inside a `Button` with `text-base`

**Issue:** The arrow character `→` is a unicode arrow. For Fantasy.co-grade typography, this should use the proper right arrow entity or be removed entirely — the button's shape already implies directionality. Also, `text-base` (16px) is correct but should have explicit `font-sans` and `tracking-[0.02em]` for precision.

**Fix:** Remove the `→` arrow from the CTA text — let the vow-yellow button speak for itself. "Hold my date" is stronger without the arrow. Add `font-sans tracking-[0.02em]` to the button className for typographic precision.

---

## Summary

| Element | Change | Rationale |
|---------|--------|-----------|
| Tagline | `text-xl md:text-2xl`, tracking `0.25em`, opacity `/70` | Elevate from label to covenant proclamation |
| Headline | `leading-[1.15]`, weighted quote marks, remove `<br />` | Breathe between lines, frame the sacred words |
| Trust anchor | Add `leading-relaxed max-w-md mx-auto` | Contained measure, vertical presence |
| Commitment | Split "Always." into separate vow-yellow element | Two-beat closing rhythm: promise then seal |
| CTA | Remove arrow, add `font-sans tracking-[0.02em]` | Typographic precision, let the button speak |

**One file modified.** Five surgical typography changes. Zero new dependencies. Pure typographic calibration.

