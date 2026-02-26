

# Remaining Subpages — Navigation Unification and Atmospheric Consistency

## Current State

Four subpages still use the old generic `Navigation.tsx` instead of the elevated `MinimalHeader`: **Contact**, **FAQ**, **Listen**, and **Proof**. These pages also have inconsistent atmospheric treatments (grain at `opacity-20` or `opacity-30` instead of the brand standard `opacity-[0.06]`, missing `will-change`, missing `overflow-hidden` on Ken Burns images, no `MobileStickyBar`).

**Pricing** and **Gateway** are already correct — Pricing uses `MinimalHeader`, Gateway has its own bespoke layout.

---

## The 7-Step Transformation

### Step 1: Contact Page — Navigation Swap

Replace `Navigation` with `MinimalHeader` and add `MobileStickyBar`. This is the highest-traffic subpage (the booking funnel endpoint) and must feel seamless with the homepage.

**Changes in `Contact.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Add `<MobileStickyBar />` before closing div

### Step 2: Contact Page — Atmospheric Fixes

Fix the hero atmospheric layers to match brand standards.

**Changes in `Contact.tsx`:**
- Wrap Ken Burns background image in `overflow-hidden` container, add `will-change: transform`
- Change grain from `opacity-20` to `opacity-[0.06]`
- Add warm fog layer: `radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)`
- Add cinematic vignette: `radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)`

### Step 3: FAQ Page — Navigation Swap and Atmosphere

Replace `Navigation` with `MinimalHeader` and add `MobileStickyBar`. Fix atmospheric consistency.

**Changes in `FAQ.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Add `<MobileStickyBar />` before closing div
- Wrap Ken Burns image in `overflow-hidden`, add `will-change: transform`
- Change grain from `opacity-20` to `opacity-[0.06]`
- Add warm fog and vignette layers matching brand standard

### Step 4: Listen Page — Navigation Swap and Atmosphere

Replace `Navigation` with `MinimalHeader`. The Listen page already has a bespoke dark environment but uses the old nav.

**Changes in `Listen.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Change the global grain layer from `opacity: 0.12` to `opacity-[0.06]` with `will-change: opacity`
- Add `will-change: transform` to the hero `<img>` Ken Burns element
- Add `overflow-hidden` to the hero section (already has it, verify)

### Step 5: Proof Page — Navigation Swap and Atmosphere

Replace `Navigation` with `MinimalHeader` and add `MobileStickyBar`. Fix heavy grain.

**Changes in `Proof.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Move `<MobileTrustBar />` before Footer, add `<MobileStickyBar />` before closing div (or keep MobileTrustBar if it serves a different purpose — verify it doesn't conflict)
- Wrap Ken Burns background in `overflow-hidden`, add `will-change: transform`
- Change grain from `opacity-30` to `opacity-[0.06]`
- Add warm fog and vignette layers

### Step 6: Grain and Ken Burns Consistency Audit

Verify all subpages now use consistent atmospheric values:
- Dark sections: grain `opacity-[0.06]`
- Warm/light sections: grain `opacity-[0.04]`
- All Ken Burns: `will-change: transform`, wrapped in `overflow-hidden`
- All grain layers: `will-change: opacity`
- Pricing page: verify its grain (currently `opacity-20` with mask) is corrected to `opacity-[0.06]`

**Changes in `Pricing.tsx`:**
- Fix grain from `opacity-20` to `opacity-[0.06]`
- Add `will-change: transform` to Ken Burns background
- Add `will-change: opacity` to grain layer
- Add `MobileStickyBar` (currently missing)

### Step 7: Performance and Accessibility Audit

Across all modified pages:
- Verify `focus-visible:ring-primary/70` on all interactive elements
- Verify `prefers-reduced-motion` disables Ken Burns and entrance animations
- Verify `MobileStickyBar` doesn't overlap footer content (Footer already has `pb-16 md:pb-0`)
- Verify MinimalHeader `sessionStorage` vigil detection works correctly on subpages (should skip vigil delay and show immediately)

---

## Summary of Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `Contact.tsx` | Nav swap to MinimalHeader + MobileStickyBar |
| 2 | `Contact.tsx` | Grain fix, overflow fix, fog + vignette |
| 3 | `FAQ.tsx` | Nav swap + atmospheric fixes |
| 4 | `Listen.tsx` | Nav swap + grain fix + will-change |
| 5 | `Proof.tsx` | Nav swap + grain fix + atmospheric layers |
| 6 | `Pricing.tsx` | Grain fix + will-change + MobileStickyBar |
| 7 | All files | Performance + accessibility audit |

No new components, no new dependencies, no content or pricing changes. Pure navigation unification and atmospheric consistency.

