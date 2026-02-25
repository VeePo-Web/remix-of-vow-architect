

# Gateway Mobile Fix -- Viewport-Locked Card Layout

## The Problem

On mobile (375x812), the Gateway page overflows and scrolls. The wordmark is clipped at the top, the third card (Events) is cut off, and the tagline is completely hidden below the fold. This breaks the core design intent of a viewport-locked, no-scroll experience.

**Root cause:** Each card uses `aspect-[3/4]` on both mobile and desktop. Three cards at 3:4 aspect ratio stacked vertically (plus header margins and footer) far exceed the mobile viewport height.

## The Fix

Replace the fixed aspect ratio on mobile with a flex-based layout that distributes available vertical space evenly across the three cards. The aspect ratio remains on desktop where the cards sit side-by-side.

### Specific changes in `src/pages/Gateway.tsx`:

1. **Card container:** Change from simple `flex-col` to a flex layout that fills available space on mobile. Add `flex-1 min-h-0` so the card group stretches to fill the space between header and footer without overflow.

2. **Individual cards:** Remove `aspect-[3/4]` on mobile. Use `flex-1 min-h-0` so each card takes equal share of the available height. Keep `md:aspect-[3/4]` for desktop where the horizontal layout has room.

3. **Outer wrapper margins:** Reduce `mb-10` on the header and `mt-10` on the footer to `mb-6`/`mt-6` on mobile to reclaim vertical space. Keep the larger `md:mb-14`/`md:mt-14` values for desktop.

### Technical detail

```text
Before (mobile):
  h-screen container (justify-center)
    header (mb-10)
    cards-row (3 x aspect-3/4 stacked) -- OVERFLOWS
    footer (mt-10)

After (mobile):
  h-screen container (no justify-center on mobile)
    header (mb-6, shrink-0)
    cards-row (flex-1, min-h-0, children flex-1) -- FILLS REMAINING SPACE
    footer (mt-6, shrink-0)
```

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Fix mobile layout: remove fixed aspect ratio on small screens, use flex-fill distribution, reduce mobile margins |

## What Stays Unchanged

Desktop layout, all animations, parallax, semicolon breathing, routing, and all other pages remain exactly as they are.

