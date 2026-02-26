

# Final Navigation Unification — NotFound, Legal, and PolicyLayout

## Current State

Three remaining files still import the old generic `Navigation.tsx`:

1. **`NotFound.tsx`** — The 404 page uses `Navigation` and has generic SaaS styling (bold `text-6xl` heading, lucide icons in outline buttons, a card with checkmarks). No atmospheric treatment, no brand voice.
2. **`Legal.tsx`** — The legal hub page uses `Navigation` directly. No grain, no atmospheric layers.
3. **`PolicyLayout.tsx`** — The shared layout wrapper for PrivacyPolicy, Terms, CookiePolicy, and Accessibility pages. Uses `Navigation`. Fixing this one file fixes four pages at once.

The Gateway page (`/`) has its own bespoke full-screen layout and does not need `MinimalHeader` — it is correct as-is.

The `/listen` and `/faq` routes now redirect to `/weddings` in the router, so those page files are effectively unused, but their nav swaps were already completed in the previous step.

---

## The 7-Step Transformation

### Step 1: PolicyLayout Navigation Swap

Replace `Navigation` with `MinimalHeader` in the shared `PolicyLayout.tsx`. This single change fixes **four pages** (PrivacyPolicy, Terms, CookiePolicy, Accessibility) at once.

**Changes in `PolicyLayout.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Add `<MobileStickyBar />` before closing div

### Step 2: Legal Page Navigation Swap

Replace `Navigation` with `MinimalHeader` in `Legal.tsx` and add `MobileStickyBar`.

**Changes in `Legal.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Add `<MobileStickyBar />` before closing div

### Step 3: NotFound Page Navigation Swap

Replace `Navigation` with `MinimalHeader` in `NotFound.tsx`. Add `MobileStickyBar`.

**Changes in `NotFound.tsx`:**
- Replace `import { Navigation }` with `import { MinimalHeader }` and `import { MobileStickyBar }`
- Replace `<Navigation />` with `<MinimalHeader />`
- Add `<MobileStickyBar />` before closing div/Footer

### Step 4: NotFound Page Brand Voice and Atmosphere

The 404 page currently uses generic SaaS copy and styling. Elevate it to match the brand's composed, reverent voice and add atmospheric treatment.

**Changes in `NotFound.tsx`:**
- Add grain overlay at `opacity-[0.04]` (warm section)
- Change the heading from bold `text-6xl` to `font-display font-light` with brand typography
- Rewrite copy to match brand voice: "This page has wandered beyond the threshold" or similar composed language (no exclamation marks, no urgency)
- Replace generic lucide icon buttons with simpler, brand-aligned text links using `DirectionalLink` or styled `Link` components
- Remove the "What makes ceremony audio reliable?" card — it's off-brand for a 404 page
- Add a golden thread separator and the covenant whisper at the bottom

### Step 5: Legal Page Atmospheric Polish

Add subtle atmospheric treatment to the Legal hub page.

**Changes in `Legal.tsx`:**
- Add grain overlay at `opacity-[0.04]`
- Add warm fog layer matching brand standard
- Ensure card hover states use `hover:border-primary/20` instead of default border treatment
- Change card icons from `text-primary` (which is fine) but verify hover transitions use `duration-[180ms]`

### Step 6: PolicyLayout Atmospheric Polish

Add subtle grain and warm fog to the policy layout wrapper so all four policy pages inherit atmospheric consistency.

**Changes in `PolicyLayout.tsx`:**
- Add a grain overlay at `opacity-[0.04]` to the main content area
- Verify the breadcrumb styling uses `text-primary` for active links (not vine-green)

### Step 7: Performance and Accessibility Audit

Verify all changes across the three files.

**Across all modified files:**
- Verify `focus-visible:ring-primary/70` on interactive elements
- Verify `MobileStickyBar` doesn't overlap footer content
- Verify `MinimalHeader` shows immediately on subpages (no vigil delay)
- Confirm the old `Navigation.tsx` component is no longer imported anywhere (can be deprecated)

---

## Summary of Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `PolicyLayout.tsx` | Nav swap (fixes 4 policy pages) |
| 2 | `Legal.tsx` | Nav swap + MobileStickyBar |
| 3 | `NotFound.tsx` | Nav swap + MobileStickyBar |
| 4 | `NotFound.tsx` | Brand voice + atmosphere + remove generic SaaS elements |
| 5 | `Legal.tsx` | Grain + fog + hover polish |
| 6 | `PolicyLayout.tsx` | Grain + fog atmospheric layer |
| 7 | All three files | Performance + accessibility audit |

No new components or dependencies. After this step, `Navigation.tsx` will have zero imports across the entire codebase and can be considered deprecated.

