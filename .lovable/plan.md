

# Comprehensive Site-Wide Luxury Polish Plan

## Priority 1: Fix Broken CTA Routing (Critical UX Bug)

Every Events and Teaching page CTA currently routes to `/contact` (the Weddings contact page) instead of the correct vertical-specific contact page. This is a conversion-killing bug.

**Files to fix:**
- `src/components/events/EventsCrossing.tsx` — `/contact` → `/events/contact`
- `src/components/events-about/EventsAboutCrossing.tsx` — `/contact` → `/events/contact`
- `src/pages/EventsPricing.tsx` — all `/contact` → `/events/contact`
- `src/components/teaching/TeachingCrossing.tsx` — `/contact` → `/teaching/contact`
- `src/components/teaching/TeachingOffering.tsx` — `/contact` → `/teaching/contact`
- `src/components/teaching-about/TeachingAboutCrossing.tsx` — `/contact` → `/teaching/contact`
- `src/pages/TeachingPricing.tsx` — `/contact` → `/teaching/contact`

## Priority 2: Proof Page — Remove Cheap Lucide Icons

Lines 107-119 of `src/pages/Proof.tsx` render four trust badges using `Shield, Zap, Layers, Clock` Lucide icons inside bordered cards. These read as generic SaaS trust badges.

**Replace with:** Gold gradient editorial numerals (01–04) above each label, no card backgrounds, no icons. Same horizontal row but using the editorial numeral pattern from the brand system.

**File:** `src/pages/Proof.tsx` — remove `Shield, Zap, Layers, Clock` import, replace trust stack grid with gold-numeral layout.

## Priority 3: Events About — Differentiate Sustain Section

`EventsAboutSustain.tsx` uses the same SVG three-node graphic as Weddings and Teaching. Replace with gold gradient editorial numerals (01, 02, 03) above each principle — no SVG, no connecting line, let whitespace create the connection.

**File:** `src/components/events-about/EventsAboutSustain.tsx` — remove SVG block (lines ~55-82), replace with numeral-based layout.

## Priority 4: Teaching About — Differentiate Sustain Section

`TeachingAboutSustain.tsx` uses the same SVG. Replace with a vertical stacked layout — three belief blocks separated by golden dot dividers, no horizontal grid. This matches the "patience" brand.

**File:** `src/components/teaching-about/TeachingAboutSustain.tsx` — remove SVG, switch from `grid md:grid-cols-3` to vertical stack with dot separators.

## Priority 5: Events About Presence — Unique Metric Display

`EventsAboutPresence.tsx` duplicates the Weddings "500+" big number + 6-card grid pattern. Replace the single big number with a horizontal stats row (3 metrics: "500+ Songs", "12 Years", "4 Venue Types") and reduce the card grid from 6 items to 3-4 for tighter editorial impact.

**File:** `src/components/events-about/EventsAboutPresence.tsx`

## Priority 6: Teaching About Presence — Reduce Card Count

`TeachingAboutPresence.tsx` shows 6 witness moment cards. Reduce to 3 (keep only the most emotionally resonant). Remove quotation marks from cards — they add visual noise.

**File:** `src/components/teaching-about/TeachingAboutPresence.tsx`

## Priority 7: AboutScrollProgress — Increase Golden Thread Visibility

`AboutScrollProgress.tsx` line 27: increase glow from `0.3` to `0.5` opacity for better visibility on the dark backgrounds.

**File:** `src/components/AboutScrollProgress.tsx`

## Summary

- **7 priority tiers**, ~12 files modified
- **No new dependencies** required
- **No new components** — all refinements to existing patterns
- **Highest impact first:** CTA routing fix ensures visitors land on correct contact forms

