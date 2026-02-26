
# Services Page Design Audit — Typography, Spacing, and Visual Hierarchy

## Current State Assessment

The Services page has solid content and information architecture, but several design inconsistencies prevent it from matching the homepage's refined quality. The page uses the `Navigation` component (different from the homepage's `MinimalHeader`), includes a sticky jump navigation bar, breadcrumbs, star ratings, colored status dots, and multiple sections with typography that bypasses the Fitzgerald system.

## Issues Identified

### 1. Navigation inconsistency
The Services page uses `Navigation` while the homepage uses `MinimalHeader`. This creates a jarring experience when navigating between pages — different header heights, different styling, different behavior.

**Fix**: Replace `Navigation` with `MinimalHeader` in `Pricing.tsx`.

### 2. PricingJumpNav adds visual clutter
The sticky sub-navigation bar creates a double-header effect (main nav + jump nav = 2 bars stacked). For a page that scrolls linearly, this is unnecessary complexity. Luxury sites let content breathe — they don't need persistent wayfinding on a single-scroll page.

**Fix**: Remove `PricingJumpNav` from the page entirely. The page is not long enough to warrant it.

### 3. Breadcrumbs are off-brand
Breadcrumbs are a utilitarian UI pattern for deep, multi-level sites. This is a 5-page site. They add visual noise at the top of the hero area and break the luxury aesthetic.

**Fix**: Remove `Breadcrumbs` from `Pricing.tsx`.

### 4. Typography bypasses Fitzgerald system (4 components)
Four sub-components use raw Tailwind heading classes instead of the Fitzgerald `.h2` class:
- `InclusionBlock.tsx`: `text-2xl md:text-3xl font-bold` (should be `.h2`)
- `PricingAddOns.tsx`: `text-3xl md:text-4xl font-bold` (should be `.h2`)
- `PricingFAQ.tsx`: `text-3xl md:text-4xl font-bold` (should be `.h2`)
- `PricingSampleDownload.tsx`: `text-3xl md:text-4xl font-bold` (should be `.h2`)

All use `font-bold` (700) instead of the system's `font-weight: 500`. This makes these headings visually heavier than the page's own hero and tier headings that correctly use `.h2`.

**Fix**: Replace raw heading classes with `h2` class (the global CSS rule handles font-family, size, weight, max-width, and centering automatically).

### 5. StarBar on pricing cards feels commodity
Five gold stars on every card reads like an Amazon review widget, not a luxury brand. The brand doc explicitly warns against "bright adjectives" and commodity positioning.

**Fix**: Remove `StarBar` from all three pricing cards.

### 6. Colored status dots are off-brand
Green (`bg-green-500`), blue (`bg-blue-500`), and purple (`bg-purple-500`) dots on card headers violate the color covenant (88% charcoal, 6% vow-yellow, 4% vine-green). These colors appear nowhere else in the brand.

**Fix**: Remove the colored dots from pricing card headers.

### 7. PricingFAQ contains broken links
The `DirectionalLink` components link to `/faq` (redirects to `/weddings`) and `/proof` (redirects to `/gallery`). These create circular or confusing navigation.

**Fix**: Update links — remove the `/faq` link (user is already on a page with FAQs), change `/proof` to `/gallery`, keep `/contact` link.

### 8. InclusionBlock h3 uses raw `font-semibold`
The inclusion item titles use `font-semibold` without the `.h4` class. They should use the Fitzgerald H4 for consistency.

**Fix**: Add `h4` class to inclusion item titles.

### 9. Section spacing inconsistency
Some sections use `py-16`, the download section uses `py-16 bg-muted/30`, the testimonials use `py-16`, but the page's main container already provides `section-padding`. This creates inconsistent vertical rhythm.

**Fix**: Standardize section gaps within the page container to use consistent margins (`mb-20` between major sections, matching the 80px luxury gap from the spacing system).

### 10. "Amounts shown before GST" text left-aligned
The disclaimer text under pricing cards uses `text-center` but the `max-width: 22ch` on the parent `p` element's computed style may cause left-shifting (same root cause as the homepage issue). Since this is a `p` element, not `h2`, it should be fine — but verify visually.

**Fix**: No code change needed — just verification.

## Plan of Changes

### File 1: `src/pages/Pricing.tsx`
- Replace `Navigation` import with `MinimalHeader`
- Remove `PricingJumpNav` import and usage
- Remove `Breadcrumbs` import and usage
- Remove `StarBar` import
- Remove colored dots from pricing card headers
- Remove `StarBar` components from all three cards
- Standardize section spacing with consistent `mb-20` gaps
- Add `text-center` explicitly to the "Amounts shown before GST" note

### File 2: `src/components/InclusionBlock.tsx`
- Replace raw `text-2xl md:text-3xl font-bold` on h2 with `h2` class
- Add `h4` class to inclusion item h3 titles
- Add `text-center` to the h2 for explicit centering

### File 3: `src/components/PricingAddOns.tsx`
- Replace raw `text-3xl md:text-4xl font-bold text-center` on h2 with `h2 text-center` class

### File 4: `src/components/PricingFAQ.tsx`
- Replace raw `text-3xl md:text-4xl font-bold text-center` on h2 with `h2 text-center` class
- Fix DirectionalLink: remove `/faq` link, change `/proof` to `/gallery`

### File 5: `src/components/PricingSampleDownload.tsx`
- Replace raw heading classes on h2 with `h2 text-center` class
- Replace raw `text-lg` on subtitle with `p-lead` class

## What Stays Unchanged
- All pricing amounts ($650, $750, $1,200)
- All package names and descriptions
- All add-on content and pricing
- All FAQ questions and answers
- All comparison table data
- All testimonial content
- MostSelectedPill on middle card
- Footer content and structure
- All CTA button text and behavior

## Expected Impact
- Consistent navigation experience across all pages (MinimalHeader everywhere)
- Reduced visual clutter (no jump nav, no breadcrumbs, no star ratings, no colored dots)
- Typography follows Fitzgerald system uniformly (font-weight 500, proper sizing)
- The page reads as a refined, confident presentation of services — not a SaaS pricing page
