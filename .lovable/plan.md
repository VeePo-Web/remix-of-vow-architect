

# Homepage Polish Round 6 — Remaining Will-Change Cleanup, Attribution Alignment, and Performance Containment

## Current State Assessment

The previous five rounds have elevated the homepage substantially. After thorough browser testing on both desktop (1920x1080) and mobile (390x844):

**Working correctly:**
- ThreePaths buttons are now visible (outline variant with white text)
- Reassurance text is centered with max-w-2xl constraint
- VowMoment Ken Burns is wrapped in overflow-hidden container
- Footer diamond separators replaced plain dots
- Testimonial cards have frosted glass with border-top treatment
- MobileStickyBar slides in with CTA glow
- Section fades work correctly in both directions

**Remaining issues (7 items):**

1. **Residual `will-change-[opacity]` on one-shot transitions** -- VowMoment has two `will-change-[opacity]` divs (warm fog layer and breathing glow) that fire once on load. TheExhale has one remaining `will-change-[opacity]` on the bloom glow layer. These consume GPU memory without benefit since the opacity only transitions once.

2. **TheWitnesses attribution text appears left-aligned within centered cards** -- The `text-center` class is on the parent card, but the attribution `<p>` inside its own `<div>` wrapper doesn't explicitly inherit centering on all browsers. Adding `text-center` directly on the attribution div ensures consistent rendering.

3. **TheWitnesses heading uses left-aligned label and rule** -- The section label "THE COVENANT KEPT" and golden rule separator are left-aligned in the container despite `text-center` on the wrapping div. The heading `<h2>` also has a redundant `text-center` class when the parent already centers. This looks intentional but creates a subtle misalignment with the section's overall centered flow.

4. **Style recalc still at 4.94s / 3165 recalcs** -- While some of this is Vite dev-mode overhead (162 script modules), adding `contain: layout style` to major section wrappers (.exhale-section, section--dark, the witnesses container) will reduce the scope of recalculation cascades.

5. **VowMoment breathing glow div still has `will-change-[opacity]`** -- This is the `vow-glow-breathe` animation which IS continuous (not one-shot), so `will-change` is appropriate. However, it uses the Tailwind class `will-change-[opacity]` on a static fog layer (line 43) that does NOT animate — this one should be removed.

6. **TheTransformation background images lack `loading="lazy"`** -- Both fear and life images use `will-change-transform` (appropriate for continuous Ken Burns) but neither has `loading="lazy"`, competing with above-fold resources. Adding `loading="lazy"` will defer loading until the section approaches the viewport.

7. **Footer social icons lack accessible labels** -- The email, phone, Instagram, and YouTube links use only icon components with no `aria-label`, making them invisible to screen readers.

---

## The 7-Step Plan

### Step 1: Remove One-Shot `will-change` from VowMoment and TheExhale

Remove `will-change-[opacity]` from the VowMoment warm fog layer (static, never animates) and the TheExhale bloom glow (transitions once). Keep `will-change` only on the VowMoment `vow-glow-breathe` div which has a continuous animation.

**Files:** `VowMoment.tsx` (line 43), `TheExhale.tsx` (line 73)

### Step 2: Fix TheWitnesses Attribution Centering

Add explicit `text-center` to the attribution `<div>` wrapper inside each testimonial card to guarantee cross-browser centering.

**File:** `TheWitnesses.tsx` (line 152)

### Step 3: Add `loading="lazy"` to TheTransformation Images

Add `loading="lazy"` attribute to both the fear and life background images in TheTransformation to defer their loading.

**File:** `TheTransformation.tsx` (lines ~54, ~120)

### Step 4: Add CSS Containment to Section Wrappers

Add `contain: layout style` to the exhale section, witnesses section container, and transformation section in `src/index.css` to limit style recalculation scope.

**File:** `src/index.css`

### Step 5: Add `aria-label` to Footer Social Links

Add descriptive `aria-label` attributes to the email, phone, Instagram, and YouTube links in the Footer for screen reader accessibility.

**File:** `Footer.tsx`

### Step 6: Clean Up Redundant CSS Classes in TheWitnesses

Remove the redundant `text-center` from the `<h2>` heading (parent already centers) and verify the section label positioning aligns with the centered layout.

**File:** `TheWitnesses.tsx`

### Step 7: Final Cross-Check Audit

Verify all changes render correctly on desktop and mobile. Confirm:
- No remaining unnecessary `will-change` on one-shot elements
- All continuous animations retain `will-change`
- All images below fold have `loading="lazy"`
- Footer links are accessible via screen reader
- Style recalc scope is reduced by CSS containment

---

## Files Modified Summary

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `VowMoment.tsx`, `TheExhale.tsx` | Remove one-shot `will-change` |
| 2 | `TheWitnesses.tsx` | Attribution centering fix |
| 3 | `TheTransformation.tsx` | Add `loading="lazy"` to images |
| 4 | `src/index.css` | CSS containment on section wrappers |
| 5 | `Footer.tsx` | Aria labels for social links |
| 6 | `TheWitnesses.tsx` | Clean up redundant classes |
| 7 | All modified files | Cross-check audit |

No content changes. No new dependencies. Pure performance, accessibility, and consistency fixes.

