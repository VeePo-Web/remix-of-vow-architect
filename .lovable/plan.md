# Square Logo for Google Business Profile

## Goal
Create a square (1:1) logo at 1024x1024px optimized for Google Business Profile, using the existing Gawrylet brand.

## Approach
1. Use the existing `public/logos/hero-dark.png` (dark wordmark on light) as the source of brand truth.
2. Use `imagegen--edit_image` to recompose the wordmark into a centered 1:1 square with proper padding (Google recommends safe margins).
3. Produce two variants so the user can pick:
   - **Light version**: dark text/mark on clean off-white background
   - **Dark version**: light text/mark on deep charcoal background
4. Save both to `/mnt/documents/` as PNGs.
5. QA each by viewing the rendered image — check centering, clarity, no clipping, sufficient margins.
6. Bundle into `parker-square-logo.zip` and deliver via `<presentation-artifact>`.

## Output
- `/mnt/documents/parker-logo-square-light.png` (1024x1024)
- `/mnt/documents/parker-logo-square-dark.png` (1024x1024)
- `/mnt/documents/parker-square-logo.zip`
