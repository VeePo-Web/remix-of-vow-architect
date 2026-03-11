

# Phase 14: Readability and Contrast Overhaul

## Problem

The site has a systemic readability crisis caused by three compounding issues:

1. **Microscopic text**: `text-[0.5rem]` (8px) used for helper text, trust signal labels, and privacy notes across all three contact pages
2. **Crushed opacity**: `text-muted-foreground/25`, `/28`, `/30` applied to already-soft muted-foreground color (HSL 30 12% 42%), producing near-invisible text on warm white
3. **Yellow overline labels on white**: `text-primary/40` and `text-primary/50` applied to `--primary` (vow-yellow, HSL 45 100% 76%) — yellow text on near-white has catastrophic contrast

These patterns appear in **68+ instances** across 10 files, making much of the site's secondary content illegible.

---

## Fix Strategy

### A. Establish Minimum Readability Floor

**Rule**: No text below `text-xs` (12px). No opacity below `/60` on `muted-foreground`. No fractional opacity on `primary` for text — use `ink-soft` instead.

### B. Contact Pages (3 files — highest impact)

**Files**: `TeachingContact.tsx`, `EventsContact.tsx`, `Contact.tsx`

All three share identical patterns. For each:

| Current | Fix |
|---------|-----|
| `text-[0.5rem] text-muted-foreground/30` helper text | `text-xs text-muted-foreground` (no opacity) |
| `text-[0.5rem] text-muted-foreground/25` submit note | `text-xs text-muted-foreground` |
| `text-[0.5rem] text-muted-foreground/28` trust labels | `text-xs text-muted-foreground` |
| `overline text-primary/50` section labels | `overline text-ink-soft` (remove yellow) |
| `overline text-primary/40` form section labels | `overline text-ink-soft` |
| `text-muted-foreground/55` pill labels | `text-xs text-muted-foreground` |
| `text-muted-foreground/40` "add more" link | `text-xs text-muted-foreground underline` |
| Trust stat values with yellow gradient text | Use `text-foreground` (dark brown) — the values ARE the content |
| Trust stat separator lines at `/0.25` | `/0.4` minimum |
| Form card `bg-card/0.45` + `border/0.2` | `bg-card/0.6` + `border/0.35` for visible containment |

### C. Luxury Input Component

**File**: `src/components/ui/luxury-input.tsx`

| Current | Fix |
|---------|-----|
| Label: `text-muted-foreground/60` | `text-muted-foreground` (full opacity) |
| Placeholder: `placeholder:text-muted-foreground/30` | `placeholder:text-muted-foreground/50` |
| Border: `border-border/40` | `border-border/60` |

### D. Pill Selector Component

**File**: `src/components/ui/pill-selector.tsx`

| Current | Fix |
|---------|-----|
| Unselected: `text-muted-foreground/60 border-border/40` | `text-muted-foreground border-border/60` |

### E. Footer VeePo Attribution

**File**: `src/components/Footer.tsx`

| Current | Fix |
|---------|-----|
| `text-muted-foreground/40` label | `text-muted-foreground/60` |
| `text-muted-foreground/50` domain | `text-muted-foreground/70` |
| `text-muted-foreground/35` tagline | `text-muted-foreground/60` |
| `text-muted-foreground/30` arrow | `text-muted-foreground/50` |

### F. Pricing Page List Bullets

**File**: `src/pages/Pricing.tsx`

| Current | Fix |
|---------|-----|
| `text-muted-foreground/60` bullet dots | `text-muted-foreground` |

### G. Comparison Table Markers

**Files**: `src/components/ComparisonTable.tsx`, `src/pages/EventsPricing.tsx`

| Current | Fix |
|---------|-----|
| `text-muted-foreground/30` for "not included" dash | `text-muted-foreground/60` |
| `text-muted-foreground/50` for "partial" dot | `text-muted-foreground/70` |

---

## Summary

| File | Changes |
|------|---------|
| `src/pages/TeachingContact.tsx` | Fix 6 text opacity/size issues, fix trust signals |
| `src/pages/EventsContact.tsx` | Fix 8 text opacity/size issues, fix trust signals |
| `src/pages/Contact.tsx` | Fix 8 text opacity/size issues, fix trust signals |
| `src/components/ui/luxury-input.tsx` | Fix label, placeholder, border opacity |
| `src/components/ui/pill-selector.tsx` | Fix unselected state opacity |
| `src/components/Footer.tsx` | Fix VeePo attribution opacity |
| `src/pages/Pricing.tsx` | Fix bullet opacity |
| `src/components/ComparisonTable.tsx` | Fix marker opacity |
| `src/pages/EventsPricing.tsx` | Fix marker opacity |

Total: ~68 opacity/size fixes across 9 files. No layout changes, no content changes — purely contrast and legibility.

