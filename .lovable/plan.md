

# Pricing and Proof Pages — Deep Design Elevation

## Current State

Navigation unification is complete across the entire site. The **Pricing** (`/services`) and **Proof** (`/proof`) pages now use `MinimalHeader` + `MobileStickyBar` with correct grain and atmospheric hero treatments. However, the internal content of both pages remains at a generic SaaS quality level — far below the homepage's Fantasy.co standard.

### Critical Issues

**Pricing Page (`Pricing.tsx`):**
1. **Typography inconsistency** — Uses `font-bold` (Inter weight 700) on pricing card headings instead of `font-display font-light` (Cormorant). The `text-4xl font-bold text-primary` price numerals are heavy and aggressive, violating the brand's "whisper, never shout" principle.
2. **No scroll-reveal animations** — Every section appears instantly with no staggered entrance. The homepage uses `RevealOnScroll` and `StaggerChildren` throughout; this page has none beyond the hero `animate-fade-in`.
3. **Generic card styling** — Cards use basic `bg-card border-border` with no frosted glass, no inset shadows, no golden hover glow. The "Most Selected" card has a hardcoded `boxShadow` instead of the brand's atmospheric glow pattern.
4. **Missing section breathing** — All content sits in a single `section-padding` block with no inhale/exhale rhythm. No golden thread separators between major content areas.
5. **CTA buttons lack brand treatment** — "Hold my date" buttons use default `Button` variant instead of `primary-dark` with `cta-breathe-glow`. No ambient radial glow behind CTAs.
6. **Final CTA section** — Uses generic `space-y-6` layout with no atmospheric layering (no grain, no fog, no vignette).

**Proof Page (`Proof.tsx`):**
1. **SPLTriptych uses `font-bold`** — Heading "Clarity. Documented." uses `text-3xl font-bold` instead of `h2` class with `font-display`. Card titles use `font-bold text-lg`.
2. **No scroll-reveal on sections** — Content appears instantly. No `RevealOnScroll` wrapping.
3. **Section transitions are crude** — Uses inline-styled `div` elements for fades instead of the established `section-fade-top`/`section-fade-bottom` CSS classes.
4. **SetupPhotoGallery, InsuranceDocuments, RedundancyStack** — These sub-components likely have similar generic styling issues.
5. **Final CTA** — Uses `text-3xl font-bold text-ink-inverse` instead of `font-display font-light`.
6. **`MobileTrustBar` placement** — Placed before `Footer` which may conflict with `MobileStickyBar`.

---

## The 7-Step Transformation

### Step 1: Pricing Page — Typography and Card Elevation

Upgrade all typography to the Fitzgerald system. Elevate pricing cards to frosted glass standard.

**Changes in `Pricing.tsx`:**
- Change price numerals from `text-4xl font-bold` to `font-display text-[clamp(32px,4vw,48px)] font-light`
- Add `backdrop-blur-[8px]` and inset shadows to pricing cards: `shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.15)]`
- Add `hover:shadow-[0_0_24px_rgba(255,224,138,0.06)]` for golden hover glow on cards
- Replace "Most Selected" card border with subtle `border-primary/15` and add breathing glow via class
- Change "Hold my date" buttons to `variant="primary-dark"` with `cta-breathe-glow` class
- Final CTA: change to `font-display font-light` with atmospheric layering (grain, fog, vignette)

### Step 2: Pricing Page — Scroll Reveal and Section Rhythm

Add `RevealOnScroll` animations to all content blocks and golden thread separators between sections.

**Changes in `Pricing.tsx`:**
- Wrap `InclusionBlock`, pricing grid, `PricingAddOns`, comparison table, testimonials, FAQ, download, and final CTA in `RevealOnScroll` components
- Add golden thread separators (`h-[1px]` with gradient) between major sections
- Add `80px` vertical spacing between sections (matching homepage `section-gap` standard)
- Wrap the pricing card grid in `StaggerChildren` with `staggerDelay={120}`

### Step 3: InclusionBlock Component Elevation

Upgrade the inclusion block from generic card to atmospheric component.

**Changes in `InclusionBlock.tsx`:**
- Change heading from `font-bold` (via `h2` class) to `font-display font-light text-[clamp(28px,3.5vw,40px)]`
- Add `backdrop-blur-[8px]` and border `border-primary/10` to the container
- Icon containers: change from `bg-primary/10` to `bg-primary/[0.06]` with `border border-primary/10`
- Item labels: change from `h4` to `font-display text-base font-medium`
- Add `StaggerChildren` wrapper around the grid with `staggerDelay={80}`

### Step 4: SPLTriptych Component Elevation

Upgrade the SPL section from generic to atmospheric.

**Changes in `SPLTriptych.tsx`:**
- Change heading from `text-3xl font-bold` to `h2` class (which maps to `font-display`)
- Card titles: change from `font-bold text-lg` to `font-display text-lg font-medium`
- SPL range values: change from `text-3xl font-bold text-primary` to `font-display text-[clamp(24px,3vw,32px)] font-light text-primary`
- Progress bars: add `overflow-hidden rounded-full` and subtle glow: `shadow-[0_0_8px_hsl(var(--vow-yellow)/0.1)]`
- Add `RevealOnScroll` wrapper
- Testimonial card: add frosted glass treatment

### Step 5: Proof Page — Section Transitions and Typography

Fix section transitions and typography across the Proof page.

**Changes in `Proof.tsx`:**
- Replace inline-styled fade divs with `section-fade-bottom` / `section-fade-top` CSS classes
- Final CTA heading: change from `text-3xl font-bold text-ink-inverse` to `font-display text-[clamp(28px,3.5vw,40px)] font-light text-foreground`
- Add `cta-breathe-glow` to CTA buttons
- Add golden thread separator above final CTA
- Fix `MobileTrustBar` placement — move after `MobileStickyBar` or remove if redundant
- Wrap all content sections in `RevealOnScroll`

### Step 6: Sub-Component Polish (SetupPhotoGallery, InsuranceDocuments, RedundancyStack)

Audit and fix typography and card styling in the three sub-components.

**Changes across sub-components:**
- Replace any `font-bold` headings with `font-display font-medium` or `font-display font-light`
- Add `backdrop-blur` and golden hover glow to cards
- Ensure all sections use `RevealOnScroll` or `StaggerChildren`
- Verify `transition-all duration-[180ms]` on hover states (not default `duration-300`)

### Step 7: Performance and Consistency Audit

Verify all changes maintain performance and visual consistency.

**Across all modified files:**
- Verify `will-change: transform` on any Ken Burns animations
- Verify `prefers-reduced-motion` fallbacks on all new `RevealOnScroll` instances
- Verify golden thread separator colors are consistent (`hsl(var(--vow-yellow) / 0.3)`)
- Verify card hover transitions use `duration-[180ms]` (brand standard)
- Verify `focus-visible:ring-primary/70` on all interactive elements
- Test on mobile viewport: verify no horizontal overflow from frosted glass blur

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `Pricing.tsx` | Typography + card elevation + CTA treatment |
| 2 | `Pricing.tsx` | Scroll reveal + section rhythm + golden threads |
| 3 | `InclusionBlock.tsx` | Typography + atmospheric container + stagger |
| 4 | `SPLTriptych.tsx` | Typography + card elevation + progress glow |
| 5 | `Proof.tsx` | Section transitions + typography + CTA polish |
| 6 | `SetupPhotoGallery.tsx`, `InsuranceDocuments.tsx`, `RedundancyStack.tsx` | Typography + card + animation fixes |
| 7 | All modified files | Performance + consistency audit |

No new components or dependencies. All changes are typography upgrades, atmospheric refinements, and scroll animation additions. Content and pricing details remain unchanged.

