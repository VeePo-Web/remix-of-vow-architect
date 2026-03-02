

# Brand Identity Alignment — Remaining Violations on /weddings Page

The previous sweep addressed 25 files. This pass catches the remaining brand violations visible on the `/weddings` page and its shared components.

---

## Changes Required

### 1. FAQTrustStack.tsx — Remove "Banff" location
- Line 8: Change `location: "Banff"` to `location: "Okotoks"`

### 2. ProcessSection.tsx — Replace "big day" (banned phrase)
- Line 150: Change `"Excellence on the big day doesn't happen on the big day."` to `"Excellence on the day of your ceremony doesn't happen the day of your ceremony."`
- Line 222 (sr-only): Change `"Excellence on the big day happens through careful preparation now."` to `"Excellence on the day of your ceremony happens through careful preparation now."`

### 3. ThreePaths.tsx — Replace "your day" (banned phrase)
- Line 152: Change `"Three ways I can shape the music of your day."` to `"Three ways I can shape the music of your ceremony."`
- Line 332: Change `"no penalty until two weeks before your day."` to `"no penalty until two weeks before your ceremony."`

### 4. MobileStickyBar.tsx — Replace "your day" (banned phrase)
- Line 12: Change `"Hear what your day could sound like"` to `"Hear what your ceremony could sound like"`

### 5. TheWitness.tsx — "Not a performer" headline
- Line 140: The word "performer" is used in the headline "Not a performer—your ceremony pianist." This is brand-aligned because it *rejects* the label and positions Parker correctly. **No change needed** — this is intentional differentiation copy.

### 6. PricingJumpNav.tsx, Pricing.tsx, PricingPreview.tsx — "Packages" and "Vendors" labels
- These are on the `/pricing` page, not `/weddings`. However, since shared navigation (PricingJumpNav) and FAQ links reference them, they should be updated in a future pass. **Not in scope for this /weddings-only sweep.**

---

## Summary

- **4 files** modified
- **6 string replacements** total
- All changes are single-word or phrase swaps — no structural changes
- "big day" replaced with "the day of your ceremony"
- "your day" replaced with "your ceremony"
- "Banff" location replaced with "Okotoks"

