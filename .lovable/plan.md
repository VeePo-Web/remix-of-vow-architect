

# Phase 17: Premium Polish — Strip card-sacred Chrome, Fix Sub-12px Remnants, Boost Crushed Labels

## Current State

After Phases 12-16, the site is structurally clean but three systemic patterns still undermine the luxury standard:

### Problem 1: `card-sacred` Card Chrome (91 instances, 16 files)
The `card-sacred` CSS class adds shimmer sweeps, gold glows, and decorative card effects that look gimmicky on a light editorial background. These appear across FAQ, Pricing, Listen, Proof, and shared components. This is the single largest source of "cheap" feeling remaining.

### Problem 2: Sub-12px Text Remnants
- `text-[0.55rem]` (8.8px) in `MinimalHeader.tsx` — page label in sticky nav
- `text-[0.65rem]` (10.4px) in `FullScreenMenu.tsx` — "Response within 24 hours" text
- These violate the 12px floor established in Phase 14

### Problem 3: Crushed Section Labels (opacity-40)
- `TeachingThreshold.tsx` line 281: section label at `opacity-40`
- `TeachingCrossing.tsx` line 187: section label at `opacity-40`
- `MinimalHeader.tsx` line 390: page label at `opacity-40`
- `FullScreenMenu.tsx` line 600: response time text at `opacity-40`

---

## Implementation Plan

### A. Strip `card-sacred` from all components (16 files)

Remove `card-sacred` and `card-sacred-hover` class references. Keep the base Tailwind styling (`bg-card/80`, `border`, `rounded-lg`, etc.) — the chrome overlay is what looks cheap, not the card structure itself.

**Files:**
| File | Instances |
|------|-----------|
| `FAQTrustStack.tsx` | 1 |
| `DownloadablePlans.tsx` | 1 |
| `SPLTriptych.tsx` | 2 |
| `FAQPolicyDownload.tsx` | 1 |
| `ListeningMovement.tsx` | 1 |
| `PricingTestimonials.tsx` | 1 |
| `InsuranceDocuments.tsx` | 2 |
| `InclusionBlock.tsx` | 1 |
| `PricingPreview.tsx` | 1 |
| `PricingSampleDownload.tsx` | 1 |
| `ComparisonTable.tsx` | 1 |
| `SetupPhotoGallery.tsx` | check |
| `RedundancyStack.tsx` | check |
| `PricingAddOns.tsx` | check |
| `PricingFAQ.tsx` | check |
| `SoundSystemDiagram.tsx` | check |

Simple find-and-remove of the class strings. No layout changes.

### B. Fix Sub-12px Text (2 files)

| File | Current | Fix |
|------|---------|-----|
| `MinimalHeader.tsx` line 390 | `text-[0.55rem]` (8.8px) | `text-xs` (12px) |
| `FullScreenMenu.tsx` line 600 | `text-[0.65rem]` (10.4px) | `text-xs` (12px) |

### C. Boost Crushed Labels to opacity-60 (4 files)

| File | Line | Current | Fix |
|------|------|---------|-----|
| `TeachingThreshold.tsx` | 281 | `opacity-40` | `opacity-60` |
| `TeachingCrossing.tsx` | 187 | `opacity-40` | `opacity-60` |
| `MinimalHeader.tsx` | 390 | `opacity-40` | `opacity-60` |
| `FullScreenMenu.tsx` | 600 | `opacity-40` | `opacity-60` |

### D. Remove `card-sacred` CSS definition from `index.css`

After stripping all usages, remove the `.card-sacred` and `.card-sacred-hover` CSS rules from `src/index.css` to prevent future reuse.

---

## Summary

| File | Changes |
|------|---------|
| 16 component files | Remove `card-sacred` / `card-sacred-hover` classes |
| `src/index.css` | Remove `.card-sacred` CSS definitions |
| `MinimalHeader.tsx` | Fix text size + opacity |
| `FullScreenMenu.tsx` | Fix text size + opacity |
| `TeachingThreshold.tsx` | Boost label opacity |
| `TeachingCrossing.tsx` | Boost label opacity |

Total: ~18 files, ~95 class removals + 4 opacity fixes + 2 text size fixes + CSS cleanup.

