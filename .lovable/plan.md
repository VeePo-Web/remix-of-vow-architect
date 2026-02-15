

# World-Class Design Polish Pass — Fantasy.co Quality Standard

## Current State Assessment

All 13 homepage sections are now visible and functional. The breathing rhythm (dark/light alternation) is working. The core narrative arc flows correctly. The audit reveals specific design craft issues that separate the current implementation from Fantasy.co-level quality.

## Design Issues Identified (No Text Changes)

### 1. Section Transition Seams
Currently, sections have hard color cuts between dark and light backgrounds. World-class sites use gradient bleeds or subtle overlap zones so the eye flows rather than jumps. Between each section pair, we need 1-2px soft gradient transitions that prevent the "stacked blocks" feeling.

### 2. TheWitness Section — Left-Aligned on Life Surface, Feels Unfinished
The section uses `text-center md:text-left` but without a visual anchor (image, illustration, or decorative element) on the right, it reads as incomplete. The Standard Kit icons need more breathing room and better visual hierarchy. The heading "Not a musician — your ceremony witness" needs the golden vow underline treatment on "witness" to match the brand system.

### 3. TheTransformation — Missing Section Label Typography
The "The Transformation" label at the top uses `text-muted-foreground` which resolves to grey on a white background (since no explicit dark bg is set on the header area). The header `div` sits above the split panels but has no background, creating a disconnect. It should be integrated into the left (dark) panel or given its own dark background to maintain the Death/Life narrative.

### 4. ThreePaths — Pricing Cards Need Luxury Polish
- Card backgrounds need subtle texture differentiation (the "invitation-texture" class on the chosen card is correct, but the non-chosen cards feel flat)
- The "MOST SELECTED" badge uses a star character that feels generic — should use a more refined indicator
- Feature check marks use `text-accent` (vine-green) which is correct, but the checkmark circle/container needs subtle refinement
- Card hover state needs more luxurious shadow progression

### 5. TheSacredGround — Card Needs Glass Morphism Refinement
The Banff Mode card uses `bg-card/80 backdrop-blur-sm` but the card bg resolves to ebon-charcoal on a cream background (because it's in `data-theme="life"` context but `--card` may not be remapped). Needs explicit warm cream card bg with refined glass effect.

### 6. TheRecord — SPL Cards Typography Polish
The dBA readings use `text-5xl font-display` but should use tabular/monospace numbers for technical data credibility. The card backgrounds are `bg-card/50` which on dark sections creates a barely visible card. Need more defined card boundaries.

### 7. TheWitnesses — Testimonial Formatting
Testimonial quotes need proper typographic quotation marks (curly quotes, not straight). The decorative opening quote mark at `-left-8 -top-4` could clip on mobile. The golden separators between testimonials are beautiful but need consistent sizing.

### 8. CrossOver — CTA Button Glow Needs Refinement
The "Hold my date" button has a `shadow-[0_0_40px...]` glow that could be more refined with a pulsing animation on the glow (not the button itself) to create a breathing heartbeat effect matching the brand's breath metaphor.

### 9. Footer — Missing Luxury Spacing
The footer uses basic grid without the brand's signature generous spacing. Footer headings should use the display font. Link hover states need the golden underline treatment.

### 10. Debug Overlay Visible in Production
The ProcessDebugOverlay is visible (shown in screenshots at bottom-right). It checks `process.env.NODE_ENV === 'development'` but Vite uses `import.meta.env.DEV`. This must be fixed so it does not show in production.

### 11. Header — Nav Links Use `<a>` Instead of React Router `<Link>`
The MinimalHeader nav links and footer links should use React Router's `Link` component for SPA navigation instead of `<a>` tags which cause full page reloads.

### 12. Scroll Cue Persistence
The MinimalScrollCue should fade out after the user starts scrolling, not persist.

## Implementation Plan

### Phase 1: Critical Craft Fixes (Foundational)

**File: `src/index.css`**
- Add section transition gradient overlays (pseudo-elements on section boundaries)
- Add `.section-transition-blend` class for soft color transitions between sections
- Fix the debug overlay visibility (if CSS-controlled)

**File: `src/components/process/ProcessDebugOverlay.tsx`**
- Change `process.env.NODE_ENV === 'development'` to `import.meta.env.DEV` so the debug overlay is hidden in preview/production builds

**File: `src/components/MinimalHeader.tsx`**
- Replace `<a>` tags with React Router `<Link>` components for SPA navigation
- Improve nav link transitions with staggered reveal animation when `isScrolled` changes

**File: `src/components/MinimalScrollCue.tsx`**
- Add scroll listener to fade out the scroll cue after user scrolls past ~100px

### Phase 2: Section-Level Polish

**File: `src/components/TheTransformation.tsx`**
- Move the "The Transformation" header label inside the left (dark) panel, or give the header area a dark gradient background so the label has proper contrast
- Add a subtle animation to the center divider (breathing glow rather than `animate-pulse-slow`)

**File: `src/components/TheWitness.tsx`**
- Center the layout fully (remove `md:text-left` for consistent centered presentation)
- Add golden vow underline on the word "witness" in the heading
- Increase vertical spacing between declarations for better breathing room
- Add subtle border/separator between declarations section and Standard Kit

**File: `src/components/ThreePaths.tsx`**
- Replace star character in "MOST SELECTED" badge with a refined diamond or simple dot
- Add subtle gradient border on non-chosen cards for depth
- Improve card hover transitions (lift + shadow + border glow progression at 180ms)
- Ensure equal card heights across the grid

**File: `src/components/TheSacredGround.tsx`**
- Fix card background to use explicit warm cream with refined border
- Add Mountain icon animation (subtle parallax drift) on scroll

**File: `src/components/TheRecord.tsx`**
- Apply monospace/tabular font to dBA numbers for technical credibility
- Increase card border visibility slightly for definition
- Center the guarantee text ("If all failsafes fail") properly

**File: `src/components/TheWitnesses.tsx`**
- Use proper curly typographic quotes
- Ensure decorative quote mark does not clip on mobile
- Add subtle entrance animation to the golden separators

**File: `src/components/CrossOver.tsx`**
- Add breathing glow animation on the CTA button shadow (4s cycle, matching brand timing)
- Improve "Download a sample plan" ghost button visibility

**File: `src/components/Footer.tsx`**
- Apply display font to footer headings ("Parker Allard", "Quick Links", "Contact")
- Add golden underline hover effect to footer links
- Increase vertical spacing between footer sections
- Add a subtle golden thread separator above the copyright row

### Phase 3: Motion and Interaction Refinement

**File: `src/index.css`**
- Add CSS keyframe `@keyframes cta-breathe` for the CrossOver CTA glow pulse
- Add CSS for smooth section-to-section gradient bleed zones
- Ensure all reveal animations use the sacred timing curve `cubic-bezier(0.22, 0.61, 0.36, 1)` consistently

**File: `src/components/MobileStickyBar.tsx`**
- Improve the mobile CTA bar styling to match the luxury aesthetic (use golden accent border-top instead of generic border)
- Use display font for the CTA text

## Files Modified Summary

| Priority | File | Changes |
|----------|------|---------|
| P0 | `src/components/process/ProcessDebugOverlay.tsx` | Fix dev-only check to use `import.meta.env.DEV` |
| P0 | `src/components/MinimalHeader.tsx` | Use React Router Links, staggered nav reveal |
| P0 | `src/components/MinimalScrollCue.tsx` | Fade out on scroll |
| P1 | `src/components/TheTransformation.tsx` | Fix header label contrast, improve divider |
| P1 | `src/components/TheWitness.tsx` | Center layout, add vow underline, spacing |
| P1 | `src/components/ThreePaths.tsx` | Refine badge, card hover, equal heights |
| P1 | `src/components/TheSacredGround.tsx` | Fix card background color |
| P1 | `src/components/TheRecord.tsx` | Monospace numbers, card definition |
| P1 | `src/components/TheWitnesses.tsx` | Curly quotes, mobile-safe quote mark |
| P1 | `src/components/CrossOver.tsx` | CTA breathing glow animation |
| P1 | `src/components/Footer.tsx` | Display font, golden hovers, spacing |
| P1 | `src/components/MobileStickyBar.tsx` | Luxury styling refinement |
| P2 | `src/index.css` | Section blend transitions, CTA keyframes |

## Design Principles Applied

Every change follows the brand covenant:
- **Lagom**: No superfluous additions. Each refinement earns its place.
- **Funktionalism**: Motion and visual changes serve usability and emotion, not decoration.
- **Color Covenant**: Yellow remains at 6% or less; green at 4% or less. No new colors introduced.
- **Sacred Timing**: All transitions use the established timing system (180ms hover, 260ms nav, 450ms sacred reveal).
- **Reduced Motion**: All new animations respect `prefers-reduced-motion` with opacity-only fallbacks.

