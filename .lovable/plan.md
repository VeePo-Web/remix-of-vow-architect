

# THE CROSSING — 15-Step Fantasy.co Precision Audit

## Current State

The CrossOver section is the final emotional threshold on the weddings page — the last moment before the visitor crosses from consideration into action. It currently renders: tagline overline, sacred quote headline, primary CTA button with ambient glow, trust anchor text, golden thread separator, and the "24 hours" commitment statement. Background has Ken Burns image, particle dust, vignette, warm fog, and film grain.

The section is structurally sound but needs 15 precision calibrations to reach world-class standard — every spacing value, typography decision, reveal timing, and atmospheric detail measured against the brand system.

---

## File: `src/components/CrossOver.tsx` (all 15 steps in one file)

### Step 1: Section Padding — Fitzgerald Scale Alignment

**Current:** `py-24 px-4` (96px vertical)
**Issue:** 96px is between fitz-9 (80px) and fitz-10 (120px) — an arbitrary value. This is the grandest emotional moment on the page; it deserves fitz-10 on desktop and fitz-9 on mobile.
**Fix:** Replace `py-24 px-4` with `py-[80px] md:py-[120px] px-4`

### Step 2: Section Accessibility Semantics

**Current:** No `role` or `aria-label`.
**Fix:** Add `role="region"` and `aria-label="Final call to action"` to the section element. This gives screen readers a meaningful landmark for the page's culminating moment.

### Step 3: Tagline Overline Typography

**Current:** `text-[clamp(16px,2vw,20px)] uppercase tracking-[0.4em] font-display font-light text-foreground/80`
**Issues:**
- Tracking at `0.4em` is nearly double the brand standard of `0.22em` — this creates an overly airy, diffused feel. The tagline should feel carved, not scattered.
- Uses `font-display` (Cormorant) — but this is an overline/label element. However, for THE tagline specifically, Cormorant is appropriate since "'Til Death ; Unto Life" is a sacred display phrase, not a utility label.
- The clamp range `16px-20px` is too large for an overline. The tagline should sit at `xl` (20px) fixed on desktop, `lg` (18px) on mobile — it's a display element but not the headline.
- Opacity at `/80` is correct for this context.
**Fix:** Change to `text-lg md:text-xl uppercase tracking-[0.22em] font-display font-light text-foreground/80`. Remove `text-shadow` inline style — text-shadow adds a glow effect that competes with the semicolon's heartbeat animation.

### Step 4: Tagline Spacing Below

**Current:** `mb-10` (40px) below tagline, before headline.
**Issue:** 40px (fitz-7) is correct as a section-internal gap between overline and headline. No change needed. Confirmed.

### Step 5: Headline Typography

**Current:** `text-[clamp(32px,5vw,56px)] font-display font-light leading-tight mb-12 text-foreground max-w-2xl`
**Issues:**
- The clamp range `32px-56px` reaches `56px` which exceeds the locked 5xl (48px) maximum in the typography scale. This headline is powerful but it should cap at the system maximum.
- `mb-12` (48px) is between fitz-7 (40px) and fitz-8 (56px). Since this gap separates the headline from the CTA — the most critical transition on the page — it should be fitz-8 (56px) to give the CTA maximum breathing room.
- Missing `tracking-[0.02em]` for display headings.
- `text-foreground` is correct for the primary heading in a dark section.
**Fix:** Change clamp to `text-[clamp(32px,5vw,48px)]`, add `tracking-[0.02em]`, change `mb-12` to `mb-14` (56px = fitz-8).

### Step 6: CTA Button Wrapper Spacing

**Current:** `mb-6` (24px) below the CTA stack, before the trust anchor.
**Issue:** 24px (fitz-5) is slightly tight. The trust anchor text ("Includes sound documentation...") needs enough separation from the CTA to feel like a footnote, not a label. Change to `mb-8` (32px = fitz-6).
**Fix:** Change `mb-6` to `mb-8`.

### Step 7: CTA Button Variant and Sizing

**Current:** `variant="primary-dark"` with `text-base px-8 py-6 h-auto cta-commitment cta-breathe-glow`.
**Issues:**
- The `primary-dark` variant renders as white background with dark text. For this specific section — the emotional crescendo — the primary vow-yellow CTA would be more appropriate. It signals warmth, invitation, and the Life side of the covenant.
- `px-8 py-6` is generous. The vertical padding creates a tall button. `px-10 py-5` would be slightly wider and marginally shorter — more elegant.
**Fix:** Change `variant="primary-dark"` to `variant="default"` (vow-yellow primary). Adjust padding to `px-10 py-5`.

### Step 8: Trust Anchor Typography

**Current:** `text-sm text-foreground/60 mb-10`
**Issues:**
- `text-sm` (14px) is correct for a footnote element.
- `/60` opacity is slightly low — should be `/50` to feel more like a whisper and less like content competing with the CTA.
- `mb-10` (40px) before the golden thread is correct (fitz-7). No change.
- Missing `font-sans` to ensure Inter rendering.
**Fix:** Change to `text-sm font-sans text-foreground/50 mb-10`.

### Step 9: Golden Thread Separator

**Current:** `h-[1px] w-8 mx-auto mb-8` with golden gradient and 600ms delay.
**Issues:**
- `w-8` (32px) is slightly narrow. The footer's opening golden thread is `w-12` (48px). This thread should match for visual continuity — it's the same sacred object bridging from section to footer.
- `mb-8` (32px) is correct (fitz-6) — comfortable separation before the commitment statement.
- The `scaleX` reveal animation is correct for horizontal expansion.
**Fix:** Change `w-8` to `w-12` for consistency with footer thread.

### Step 10: Commitment Statement Typography

**Current:** `text-lg font-display font-light text-foreground/90 italic` with inline `letterSpacing: "0.03em"`.
**Issues:**
- `text-lg` (18px) is correct for this closing statement.
- The inline letter-spacing `0.03em` is close to the `0.02em` brand standard for display text. Align to `0.02em`.
- The `<span>` around "24 hours" uses `text-primary font-normal not-italic text-lg font-semibold`. The `font-semibold` (600 weight) on Cormorant is too heavy — the brand specifies 300-400 only. Change to `font-medium` (500) maximum, or better, `font-normal` (400) with the vow-yellow color providing sufficient emphasis.
- `text-foreground/90` is correct for the commitment statement.
**Fix:** Change inline `letterSpacing` to `0.02em`. Change "24 hours" span to `text-primary font-normal not-italic` (remove `font-semibold` and redundant `text-lg`).

### Step 11: Reveal Distance Standardization

**Current:** All reveals use `translate-y-4` (16px).
**Issue:** Brand standard is 12px for the "up" reveal variant. All `translate-y-4` instances should be `translate-y-[12px]`.
**Fix:** Replace all four instances of `translate-y-4` with `translate-y-[12px]`.

### Step 12: Stagger Timing Tightening

**Current delays:**
```text
Tagline:     0ms
Headline:    150ms
CTA:         300ms
Trust:       450ms
Thread:      600ms
Commitment:  750ms
```

**Issue:** The 150ms gaps are uniform — the brand calls for organic variation (80-120ms). Also, the tagline-to-headline gap (150ms) should be tighter since they're semantically coupled, while the headline-to-CTA gap should be wider since the CTA is the section's dramatic climax.

**Fix — revised timeline:**
```text
Tagline:     0ms
Headline:    120ms   (tighter coupling)
CTA:         320ms   (200ms gap — dramatic pause before the action)
Trust:       450ms   (130ms gap)
Thread:      580ms   (130ms gap)
Commitment:  700ms   (120ms gap)
```

### Step 13: Background Image Opacity

**Current:** `opacity-[0.10]` (10%) on the Ken Burns background image.
**Issue:** 10% is within the brand range (6-15%) but this section needs slightly more atmospheric presence — it's the emotional climax. Increase to `opacity-[0.12]` for a touch more depth without competing with content.
**Fix:** Change `opacity-[0.10]` to `opacity-[0.12]`.

### Step 14: Top Fade Color Match

**Current:** Top fade is `linear-gradient(to top, transparent, hsl(240 9% 2%))`.
**Issue:** The section above (TheWitnesses) is a warm cream section. The top fade should blend FROM the warm cream tone, not from the dark `hsl(240 9% 2%)`. However, since TheWitnesses already has its own bottom fade that handles the warm-to-dark transition, this top fade's job is to darken the top edge of CrossOver's own background to prevent a hard line. The current color `hsl(240 9% 2%)` matches the outer edge of the section's radial gradient — this is correct. No change needed. Confirmed.

### Step 15: Bottom Fade to Footer Bridge

**Current:** Bottom fade is `linear-gradient(to bottom, transparent, hsl(240 9% 4%))`.
**Issue:** The footer background is `section--dark` which resolves to `hsl(240 9% 4%)`. The bottom fade targets the same color — this is correct for a seamless blend. However, the footer also has a `footer-fade-bridge` element (60px overlap positioned at `top: -60px`). This creates redundant fading. The CrossOver bottom fade and the footer bridge should work in concert, not overlap.

The current setup works but the bottom fade height (controlled by `.section-fade-bottom` at 120px desktop / 80px mobile) may create a slightly over-gradual transition. Since the footer bridge handles 60px of overlap, the CrossOver bottom fade can be slightly shorter. Add an explicit `style={{ height: '80px' }}` to the bottom fade div to override the CSS default and create a crisper handoff.
**Fix:** Add `style={{ height: '80px' }}` to the bottom fade div.

---

## Summary

| Step | Element | Change | Type |
|------|---------|--------|------|
| 1 | Section padding | `py-24` to `py-[80px] md:py-[120px]` | Class swap |
| 2 | Section semantics | Add `role="region"`, `aria-label` | Attribute |
| 3 | Tagline typography | Tracking `0.4em` to `0.22em`, fixed size, remove text-shadow | Class + style |
| 4 | Tagline spacing | Confirmed correct (`mb-10`) | No change |
| 5 | Headline typography | Cap at 48px, add tracking, `mb-12` to `mb-14` | Class + style |
| 6 | CTA wrapper spacing | `mb-6` to `mb-8` | Class swap |
| 7 | CTA button | `primary-dark` to `default`, padding adjustment | Class swap |
| 8 | Trust anchor | Add `font-sans`, `/60` to `/50` | Class swap |
| 9 | Golden thread | `w-8` to `w-12` | Class swap |
| 10 | Commitment text | Letter-spacing `0.02em`, remove `font-semibold` | Style + class |
| 11 | Reveal distances | All `translate-y-4` to `translate-y-[12px]` | Class swap |
| 12 | Stagger timing | Organic variation (120/200/130/130/120ms gaps) | Style values |
| 13 | Background opacity | `0.10` to `0.12` | Class swap |
| 14 | Top fade | Confirmed correct | No change |
| 15 | Bottom fade | Add explicit 80px height | Style addition |

**One file modified.** Zero CSS changes. Zero new dependencies. Zero new images. Pure precision calibration across spacing, typography, animation timing, and atmospheric depth.

