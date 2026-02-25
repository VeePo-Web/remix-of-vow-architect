

# Gateway Page -- Status and Refinements

## Current State

The Service Gateway at `/` is already built and live from the previous approved plan. It includes:
- Three cinematic bento cards with AI-generated backgrounds (Weddings, Teaching, Events)
- Staggered fade-in reveal sequence (400ms wordmark, 600ms subtitle, 800-1200ms cards, 1400ms tagline)
- "Weddings" card links to `/weddings`, Teaching and Events show "Coming Soon"
- Dark void background with film grain, golden accents on the semicolon
- Viewport-locked `h-screen` layout with no scroll

## One Bug to Fix

**`/weddings` route missing from theme configuration.** The `usePageTheme.ts` file lists `/` in `deathThemeRoutes` but does not include `/weddings`. When a user clicks the Weddings card and lands on the wedding homepage, the theme may not apply correctly.

**Fix:** Add `"/weddings"` to the `deathThemeRoutes` array in `src/hooks/usePageTheme.ts`.

## Files Changed

| File | Change |
|------|--------|
| `src/hooks/usePageTheme.ts` | Add `"/weddings"` to `deathThemeRoutes` array |

## What Stays Unchanged

Everything else -- the Gateway page, all routing, all other pages, all animations and styling remain exactly as they are.

