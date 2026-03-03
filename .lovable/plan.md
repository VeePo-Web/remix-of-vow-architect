

# Step 2: Pixel-Perfect Spacing, Text Shadows, and Typographic Depth

This step adds the material depth layer that separates flat web typography from Fantasy.co-grade cinematic text. Every element gets measured shadow treatment, refined vertical spacing, and typographic weight calibration.

---

## 2a. Headline Text Shadow — Cinematic Depth

**Current:** No text-shadow on the headline.

**Issue:** On a dark atmospheric background with grain, vignette, and fog layers, the headline text sits flat against the noise. A subtle text-shadow creates the impression that the words are hovering slightly above the surface — the same technique used in cinematic title cards. This is not a glow effect; it is depth.

**Fix:** Add `textShadow: '0 2px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2)'` to the headline's inline style. Two layers: a tight directional shadow (2px down, 20px blur) for depth, and a wide ambient shadow (40px blur) for atmospheric integration. Both use pure black — never colored shadows on text.

---

## 2b. Tagline Text Shadow — Whisper Depth

**Current:** No text-shadow on the tagline.

**Issue:** The tagline at `/70` opacity is intentionally subdued, but on the noisy background it can merge with the grain. A lighter shadow than the headline — just enough to lift it off the grain layer.

**Fix:** Add `textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)'` to the tagline paragraph's inline style. Single layer, subtle, directional. The semicolon already has its own glow via the heartbeat animation — no additional shadow needed on it.

---

## 2c. Commitment Statement Shadow — Closing Weight

**Current:** No text-shadow on the commitment statement.

**Issue:** As the final typographic element before the footer, the commitment statement needs the same material presence as the headline but at reduced intensity — it whispers, but it whispers with authority.

**Fix:** Add `textShadow: '0 1px 16px rgba(0, 0, 0, 0.35)'` to the commitment statement's inline style.

---

## 2d. Vertical Spacing Precision — The Full Stack Audit

Current vertical rhythm from top of content to bottom:

```text
Tagline wrapper:     mb-10 (40px)     -- fitz-7  ✓
Headline:            mb-14 (56px)     -- fitz-8  ✓
CTA wrapper:         mb-8  (32px)     -- fitz-6  ✓
Trust anchor:        mb-10 (40px)     -- fitz-7  ✓
Golden thread:       mb-8  (32px)     -- fitz-6  ✓
Commitment:          mb-0  (0px)      -- terminal ✓
```

**Assessment:** All spacing values land on Fitzgerald scale points. The rhythm reads: 40 → 56 → 32 → 40 → 32 → 0. This creates a pattern of generous → grand → tight → generous → tight → terminal. The "tight" (32px) values around the CTA and golden thread compress the section's emotional climax, drawing the eye inward. This is correct — no changes needed.

---

## 2e. CTA Button Shadow Enhancement

**Current:** The `cta-breathe-glow` class handles the ambient breathing shadow. The `default` variant adds `shadow-[0_8px_24px_rgba(255,224,138,0.18)]`.

**Issue:** The button shadow is correct but the glow div behind it (`-inset-x-12 -inset-y-6`) uses `hsl(45 100% 76% / 0.10)` which is slightly warm. Increase to `0.12` for the glow to be more visible against the dark atmospheric background — the CTA is the section's emotional apex and deserves maximum presence.

**Fix:** Change the ambient glow gradient from `0.10` to `0.14` opacity — just enough to create a warm halo without competing with the button's own shadow system.

---

## 2f. Trust Anchor Letter-Spacing

**Current:** No explicit letter-spacing on the trust anchor text.

**Issue:** At `text-sm` (14px) with Inter, the default letter-spacing can feel slightly tight on dark backgrounds where grain and atmospheric noise compete with small text. Adding `tracking-[0.01em]` (a micro-adjustment) opens the text just enough for better legibility without changing its visual weight.

**Fix:** Add `tracking-[0.01em]` to the trust anchor paragraph className.

---

## 2g. Golden Thread Shadow Enhancement

**Current:** The golden thread uses `background: linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)` — no box-shadow.

**Issue:** The thread is a 1px line. Without a soft glow beneath it, it disappears into the grain texture. A subtle box-shadow creates the impression that the thread is emitting light — like a hair-thin wire catching candlelight.

**Fix:** Add `boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.15)'` to the golden thread's inline style. This creates a warm glow bloom around the 1px line without thickening it.

---

## Summary of All Changes

| # | Element | Change | Type |
|---|---------|--------|------|
| 2a | Headline | Add dual-layer text-shadow for cinematic depth | Inline style |
| 2b | Tagline | Add single-layer text-shadow for whisper depth | Inline style |
| 2c | Commitment | Add text-shadow for closing authority | Inline style |
| 2d | Vertical spacing | Audited and confirmed correct — no changes | No change |
| 2e | CTA ambient glow | Increase opacity from `0.10` to `0.14` | Style value |
| 2f | Trust anchor | Add `tracking-[0.01em]` for dark-background legibility | Class addition |
| 2g | Golden thread | Add `boxShadow` glow bloom | Inline style |

**One file modified.** Six surgical additions — five shadow/glow refinements and one micro-tracking adjustment. Zero layout changes. Zero new dependencies. Pure material depth calibration.

