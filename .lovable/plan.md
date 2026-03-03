

# THE PREPARATION — Full Spacing & Style Audit

## Current State Assessment

The section is architecturally sound: 5 atmospheric layers, asymmetric 2-column layout (2fr image / 3fr text), scroll-linked parallax, declaration cards with golden thread, sacred inventory kit grid, and a closing ghost CTA that bridges into Three Keys. The visual impression is strong — warm cream background, atmospheric depth, cinematic image frame.

This audit examines every spacing value, typography decision, reveal timing, and interaction detail against the brand system to bring it to world-class Fantasy.co standard.

---

## 1. Section Padding

**Current:** `section-padding-standard` class which maps to `py-20` (80px) desktop, `py-12` (48px) mobile via the CSS utility class. However, there's a conflict — the class is defined in *two places* in `index.css` (lines 690 and 4428), and the second definition overrides to `80px` on all viewports. The mobile override at line 4500 sets `48px`.

**Issue:** The section uses `section-padding-standard` which is correct for desktop (80px = fitz-9). However, this section is a substantial content section with parallax image — it needs more breathing room than a utility section. The Fitzgerald scale recommends `120px` (fitz-10) for grand section separation on desktop.

**Fix:** Replace `section-padding-standard` with explicit `py-[80px] md:py-[120px]` — matching TheWitnesses and ThreePaths (both already refined to this scale). This gives fitz-9 on mobile, fitz-10 on desktop.

---

## 2. Typography Audit

### 2a. Overline "THE PREPARATION"

**Current:** `text-xs uppercase tracking-[0.28em] text-muted-foreground`
**Issue:** Tracking is `0.28em` — the brand standard is `0.22em`. Also missing `font-sans` to ensure Inter rendering.
**Fix:** Change to `text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground`

### 2b. Headline

**Current:** `text-[clamp(28px,4vw,40px)] font-display font-light leading-tight`
**Issue:** The clamp starts at `28px` which is below the 3xl (30px) minimum for section headings. No letter-spacing specified (defaults to normal — should be `0.02em` for display headings).
**Fix:** Change to `text-[clamp(30px,4.5vw,40px)]` with `tracking-[0.02em]` — matching the 3xl-to-4xl range used in TheWitnesses and ThreePaths.

### 2c. Body paragraph

**Current:** `text-base md:text-lg leading-relaxed text-foreground/65 max-w-[42ch]`
**Issue:** 42ch is slightly wide for the brand's intimate reading experience. The spec recommends 22ch for quotes and narrower measures for body in editorial sections. However, this is a paragraph (not a quote), so a wider measure is acceptable. The opacity at `/65` is slightly low — brand standard `ink-soft` should be around `/70`.
**Fix:** Change to `max-w-[38ch]` and `text-foreground/70` for slightly narrower, more readable measure with better contrast.

### 2d. Declaration card text

**Current:** `text-base md:text-lg font-display font-light leading-relaxed text-foreground/90`
**Issue:** This is correct — Cormorant, light weight, relaxed leading, high opacity for primary content. No change needed.

### 2e. Kit grid labels

**Current:** `text-xs uppercase tracking-[0.18em] font-display text-muted-foreground`
**Issue:** Tracking at `0.18em` is below the `0.22em` brand standard for uppercase labels. Also uses `font-display` (Cormorant) — utility labels like these should use `font-sans` (Inter) for clarity.
**Fix:** Change to `text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground`

### 2f. "Everything I bring" label

**Current:** `font-display text-sm md:text-base font-light text-foreground/55`
**Issue:** As a section sublabel, this should use Inter, not Cormorant. The size is correct.
**Fix:** Change to `font-sans text-sm md:text-base text-foreground/55` (remove `font-display font-light`)

### 2g. "And this is what I carry with me" bridge text

**Current:** `font-display text-sm md:text-base font-light italic text-foreground/50`
**Issue:** This is an editorial/poetic bridge — Cormorant italic is correct here. The opacity at `/50` is slightly faint. `/55` would maintain the whisper while ensuring readability.
**Fix:** Change opacity to `text-foreground/55`

### 2h. Closing "Now—choose how long you want me there."

**Current:** `text-lg md:text-xl font-display font-light text-foreground/80`
**Issue:** Correct weight and font. Opacity at `/80` is appropriate for a closing statement. No change needed.

### 2i. Ghost CTA "See my three paths"

**Current:** `text-xs uppercase tracking-[0.18em] font-display`
**Issue:** Same tracking issue as kit labels — should be `0.22em`. And this is a CTA/navigation element — should use `font-sans` (Inter), not `font-display`.
**Fix:** Change to `text-xs font-sans uppercase tracking-[0.22em]`

---

## 3. Spacing Inventory (Vertical Rhythm)

Every gap is measured against the Fitzgerald scale.

| Element Gap | Current | Fitzgerald | Fix |
|------------|---------|-----------|-----|
| Section top/bottom padding | 80px (class) | fitz-9/fitz-10 | `py-[80px] md:py-[120px]` |
| Overline to thread bridge | `mb-0` + `my-3` | fitz-3 (12px) | Correct |
| Thread bridge height | `h-[24px]` | fitz-5 (24px) | Correct |
| Headline block bottom | `mb-10` (40px) | fitz-7 (40px) | Correct |
| Body paragraph bottom | `mb-10` (40px) | fitz-7 (40px) | Correct |
| Declarations container bottom | `mb-8 md:mb-12` (32/48px) | fitz-6/fitz-8 | Change to `mb-10 md:mb-14` (40/56px) for fitz-7/fitz-8 |
| Declaration card spacing | `space-y-4` (16px) | fitz-4 (16px) | Correct |
| Golden separator to bridge text | `mb-6 md:mb-10` | fitz-6/fitz-7 | Correct |
| Bridge text to kit label | `mb-4 md:mb-6` | fitz-4/fitz-5 | Correct |
| Kit label to grid | `mb-5` (20px) | Between fitz-4/fitz-5 | Change to `mb-4` (16px) for clean fitz-4 |
| Kit grid gap | `gap-3` (12px) | fitz-3 (12px) | Correct |
| Diamond separator margin | `my-6 md:my-10` (24/40px) | fitz-5/fitz-7 | Correct |
| Closing rule to text | `mb-3 md:mb-4` | fitz-3/fitz-4 | Correct |
| CTA top margin | `mt-4 md:mt-5` (16/20px) | fitz-4/fitz-5- | Correct |
| Column gap | `gap-10 md:gap-16` (40/64px) | fitz-7/fitz-8+ | Correct |

---

## 4. Reveal Animation Audit

### 4a. Translate distances

**Current state and fixes:**

| Element | Current translate | Brand standard | Fix |
|---------|------------------|---------------|-----|
| Label diamond + overline | `translate-y-4` (16px) | 12px | `translate-y-[12px]` |
| Headline | `translate-y-4` (16px) + `scale-[0.97]` | 12px, no scale | `translate-y-[12px]`, remove `scale-[0.97]` and `scale-100` |
| Body paragraph | `translate-y-4` (16px) | 12px | `translate-y-[12px]` |
| Declaration cards | `translate-x-[-12px]` | 12px horizontal is acceptable for side-entry | No change |
| Kit grid wrapper | `translate-y-4` (16px) + `scale-[0.98]` | 12px, no scale | `translate-y-[12px]`, remove scale |
| Kit cells | `translate-y-3` (12px) | 12px | Correct |
| Bridge text | `translate-y-4` (16px) | 12px | `translate-y-[12px]` |
| Closing text | `translate-y-4` (16px) + `blur-[4px]` | 12px + blur is acceptable | `translate-y-[12px]` |
| Ghost CTA | `translate-y-3` (12px) | 12px | Correct |
| Diamond separator | `scale-75` to `scale-100` | scale variant correct | No change |

### 4b. Stagger timing

**Current delays:**

```text
Label:          0ms (default)
Thread bridge:  150ms
Headline:       200ms
Body paragraph: 350ms
Declaration 1:  350ms (overlaps with paragraph!)
Declaration 2:  500ms
Declaration 3:  650ms
Golden sep:     700ms
Bridge text:    750ms
Kit wrapper:    800ms
Kit cell 1-6:   900-1300ms (80ms gaps — correct)
Diamond sep:    900ms (overlaps with kit!)
Closing rule:   950ms
Closing text:   1000ms
Ghost CTA:      1100ms
```

**Issues:**
- Declaration 1 starts at same time as body paragraph (350ms) — they should be sequenced
- Diamond separator (900ms) overlaps with kit cells starting at 900ms
- The overall sequence runs 1100ms total — acceptable but could be tightened

**Fix — revised stagger timeline:**

```text
Label:          0ms
Thread bridge:  100ms  (tightened from 150)
Headline:       200ms
Body paragraph: 350ms
Declaration 1:  500ms  (clear of paragraph)
Declaration 2:  600ms  (100ms gap)
Declaration 3:  700ms
Golden sep:     850ms
Bridge text:    900ms
Kit wrapper:    950ms
Kit cell 1-6:   1050-1450ms (80ms gaps)
Diamond sep:    1500ms (clear of kit)
Closing rule:   1550ms
Closing text:   1600ms
Ghost CTA:      1700ms
```

This extends the sequence slightly but eliminates all overlaps and maintains 80-120ms organic gaps.

---

## 5. Image Frame Refinements

**Current:** Image at 35% opacity with Ken Burns, candlelight shimmer, vignette, grain, and warm border (1px inset vow-yellow at 10%).

**Issues:**
- Image opacity at 35% is slightly high for the brand system (spec says 6-15% for backgrounds). However, this is the primary editorial image, not a background — 35% is acceptable for a foreground image frame. But it could be reduced to 28% for more atmospheric depth.
- The image frame `aspect-[3/4]` on mobile, `md:min-h-[520px]` on desktop — the 520px minimum might cause the image to extend below the text content on some viewports.

**Fix:**
- Reduce image opacity from `0.35` to `0.28` — more atmospheric, less photographic
- Change `md:min-h-[520px]` to `md:min-h-[480px]` — slightly shorter to ensure text and image bottom-align better

---

## 6. Kit Grid Refinements

**Current:** 2x3 grid with diamond icons, uppercase labels, warm card backgrounds with embossed box-shadows. First two cells have extra `inset glow` styling.

**Issues:**
- The special treatment on first two cells (Piano, Backup Piano) via `index < 2` creates arbitrary visual hierarchy — all six items are equally important
- Card backgrounds use inline gradient styles — these should be consistent with the declaration card material

**Fix:**
- Remove the `index < 2` conditional box-shadow — apply uniform styling to all kit cells
- Keep existing material depth (the CSS `.witness-kit-cell` class handles hover/shadow)

---

## 7. Accessibility

**Current:** Has `role="region"` and `aria-label="The Preparation"`, sr-only narrative block. Decorative elements have `aria-hidden="true"`.

**Status:** Correct. No changes needed.

---

## 8. Mobile-Specific Refinements

### 8a. Image frame
- On mobile, the image frame is `aspect-[3/4]` which creates a tall image above the text — on small screens this pushes content far down
- Change to `aspect-[4/3]` on mobile for a landscape orientation that takes less vertical space, keeping `md:aspect-auto` for desktop

### 8b. Kit grid
- Currently `grid-cols-2 md:grid-cols-3` — on mobile this creates 3 rows of 2, which is acceptable
- No change needed

### 8c. Column layout
- Currently `grid-cols-1 md:grid-cols-[2fr_3fr]` — stacks on mobile, which is correct
- No change needed

---

## Summary of All Changes

### File: `src/components/TheWitness.tsx`

| # | Change | Type |
|---|--------|------|
| 1 | Section padding: `section-padding-standard` to `py-[80px] md:py-[120px]` | Class swap |
| 2 | Overline: add `font-sans`, tracking `0.28em` to `0.22em` | Class swap |
| 3 | Headline: clamp `28px` to `30px`, add `tracking-[0.02em]` | Style value |
| 4 | Headline: remove `scale-[0.97]` and `scale-100` from reveal | Class removal |
| 5 | Body paragraph: `max-w-[42ch]` to `max-w-[38ch]`, `/65` to `/70` | Class swap |
| 6 | Bridge text: `/50` to `/55` | Class swap |
| 7 | Kit labels: `font-display` to `font-sans`, tracking `0.18em` to `0.22em` | Class swap |
| 8 | Kit sublabel: `font-display font-light` to `font-sans` | Class swap |
| 9 | Ghost CTA: `font-display` to `font-sans`, tracking `0.18em` to `0.22em` | Class swap |
| 10 | All `translate-y-4` reveals to `translate-y-[12px]` | Class swap |
| 11 | Remove `scale-[0.97]`/`scale-[0.98]` from headline and kit wrapper | Class removal |
| 12 | Image opacity: `0.35` to `0.28` | Style value |
| 13 | Image frame: `md:min-h-[520px]` to `md:min-h-[480px]` | Class swap |
| 14 | Mobile image: `aspect-[3/4]` to `aspect-[4/3]` | Class swap |
| 15 | Kit cell first-two special shadow: remove `index < 2` conditional | Logic removal |
| 16 | Declarations container: `mb-8 md:mb-12` to `mb-10 md:mb-14` | Class swap |
| 17 | Kit label spacing: `mb-5` to `mb-4` | Class swap |
| 18 | Revised stagger timing across all delay values | Style values |

**One file modified.** Zero CSS changes needed. Zero new dependencies. Zero new images. Pure spacing, typography, and timing calibration.

