

# Full-Screen Menu & Header — Premium UX Overhaul

## Problem
The full-screen menu feels unbalanced: all content is left-aligned with massive dead space on the right. The alternating black-key indentation on page links creates visual noise rather than hierarchy. The two zones (verticals + pages) feel disconnected. Compared to hickoryandrose's centered, symmetrical composition, this reads as incomplete.

The VeePo footer is confirmed good — no changes there.

## Changes

### 1. FullScreenMenu — Center-Balanced Composition (`src/components/FullScreenMenu.tsx`)

**Layout restructure:**
- Change the main container from `items-start` → `items-center text-center` so all content is centered both vertically and horizontally (matching hickoryandrose's approach)
- Add the "Parker Gawryletz" brand mark above Zone 1 with a gold shimmer sweep and a small gold divider line beneath it (like H&R's mobile brand mark)
- Move contact info and covenant bookend to a bottom-anchored footer row, not inline with the nav

**Zone 1 (Verticals):**
- Keep horizontal row but center it. Add `justify-center` to the flex container
- Reduce gap slightly for tighter grouping

**Golden thread separator:**
- Center it with `mx-auto`

**Zone 2 (Page links):**
- Remove the black-key indentation entirely — all items align consistently (cleaner scan path, less confusion)
- Center-align all links
- Keep numbered indices (01-06) but position them consistently to the left of each label

**CTA in menu:**
- Add a "Hold My Date" (or vertical-aware CTA) button below the page links, styled with a border + gold shimmer sweep on hover (matching hickoryandrose's Inquire button pattern)
- `border border-foreground/20 text-foreground hover:border-primary` with the diagonal shimmer overlay

**Contact info repositioning:**
- Move location, email, trust signal to `absolute bottom-8` center-aligned row — gives the menu breathing room and a cleaner footer zone

### 2. MinimalHeader — Minor Polish (`src/components/MinimalHeader.tsx`)

**Hide/show on scroll direction:**
- Add scroll-direction awareness (like hickoryandrose): hide header on scroll-down past 300px, reveal on scroll-up. Currently the header is always visible when scrolled, which takes up space. This is a standard luxury pattern.
- Use `lastScrollY` ref comparison in the existing `updateScroll` callback
- Apply `transform: translateY(-100%)` when hidden, with 400ms cubic-bezier transition

**Page context label fix:**
- The current `text-muted-foreground/40` uses fractional opacity on a semantic token (violates token governance). Replace with `text-muted-foreground opacity-40`

### 3. Keyframe Updates

Add to FullScreenMenu's inline `<style>`:
- No new keyframes needed — reuse existing `shimmer-sweep` for the CTA gold sweep

## Files Modified
1. `src/components/FullScreenMenu.tsx` — layout centering, remove black-key indent, add brand mark, add CTA button, reposition contact info
2. `src/components/MinimalHeader.tsx` — scroll-direction hide/show, fix fractional opacity token

## Technical Notes
- No new dependencies
- All changes are CSS/layout — no new state management
- Touch targets remain 44×44px minimum
- `prefers-reduced-motion` fallbacks already in place for all animated elements

