

# World-Class Design Polish -- Final Pass

## Audit Summary

The site has come a long way. The homepage is cinematic and polished. The About page now has atmospheric imagery. The Pricing, FAQ, and Contact pages all have subtle background treatments. However, several issues remain that prevent this from reaching true Fantasy.co-level quality.

## Issues Found

### 1. Contact Page Switches to Light Theme Unexpectedly
The Contact page renders in light mode (white background, light form cards) while every other page uses the dark "death" theme. This breaks the visual continuity. The `usePageTheme` hook likely classifies `/contact` as a "life" route, but given the brand's dark-dominant aesthetic, the Contact page hero should maintain dark atmosphere with the warm string lights image providing the only warmth.

### 2. Navigation Inconsistency Between Homepage and Subpages
The homepage uses `MinimalHeader` (Parker Allard left, MENU right -- cinematic minimal style), while all subpages use `Navigation` (Parker Allard left, full nav links + theme toggle + Check Availability button). This creates a jarring experience when navigating between pages. The subpage nav should match the homepage's quiet luxury -- remove the theme toggle and simplify the CTA button styling.

### 3. Breadcrumbs Use Left-Aligned Chapter Rule Instead of Centered
On the Pricing and FAQ pages, the `chapter-rule` element (a gold horizontal line) appears left-aligned beneath the breadcrumbs rather than centered beneath the heading. This breaks the symmetrical hierarchy the brand demands.

### 4. "Music Coming Soon" Placeholder on Homepage
The Sound section displays a "Music coming soon" placeholder with fake waveform bars. This feels unfinished and breaks the premium illusion. It should either be removed entirely or replaced with a more elegant "coming soon" treatment that feels intentional rather than placeholder.

### 5. Gallery/Proof Page Has No Section Transitions
The Proof page jumps between sections without the gradient fade transitions (`section-fade-top`, `section-fade-bottom`) that make the homepage flow seamlessly. Each section boundary is a hard cut.

### 6. About Page WitnessSustain Uses Hardcoded HSL Colors
The Sustain and Covenant sections use inline `style` with hardcoded `hsl(45 25% 96%)` backgrounds instead of using CSS custom properties. In "life" theme these would clash. They should use `bg-surface` or the existing warm cream variable.

### 7. Mobile: About Hero Text Alignment
On mobile (390px), the hero text "I don't perform at weddings" is left-aligned while "I witness them" is centered. The text alignment should be consistently centered on all viewport sizes.

## Implementation Plan

### Phase 1: Contact Page Theme Fix
**File: `src/hooks/usePageTheme.ts`**
- Ensure `/contact` is included in the dark theme routes so it maintains visual continuity with the rest of the site
- The atmospheric string lights image provides enough warmth without needing the full light theme

### Phase 2: Navigation Consistency
**File: `src/components/Navigation.tsx`**
- Remove the `ThemeToggle` component from the navigation bar (the theme should be controlled by the page, not the user -- per brand guidelines, the Death/Life rhythm is intentional)
- Simplify the "Check Availability" button to use a more restrained styling (outline or ghost variant) that doesn't compete with page CTAs

### Phase 3: Fix Chapter Rule Alignment
**Files: `src/pages/Pricing.tsx`, `src/pages/FAQ.tsx`**
- Move the `chapter-rule` element to sit directly beneath the `h1` heading, centered, rather than beneath the breadcrumbs
- Ensure consistent centering with `mx-auto` and proper spacing

### Phase 4: Refine TheSound Placeholder
**File: `src/components/TheSound.tsx`**
- Replace the "Music coming soon" waveform placeholder with a minimal, elegant treatment: just the track cards with a single line of text like "Samples arriving soon" in muted text beneath
- Remove the fake waveform bars entirely -- they look unfinished

### Phase 5: Add Section Transitions to Proof Page
**File: `src/pages/Proof.tsx`**
- Add `section-fade-bottom` and `section-fade-top` gradient dividers between each major section (hero to SPL, SPL to setup photos, etc.)
- Match the transition pattern used on the homepage

### Phase 6: CSS Variable Consistency
**Files: `src/components/witness/WitnessSustain.tsx`, `src/components/witness/WitnessCovenant.tsx`**
- Replace hardcoded `hsl(45 25% 96%)` with CSS custom property references (e.g., `hsl(var(--surface))` or the existing warm cream tokens)
- This ensures theme consistency if the user ever views in light mode

### Phase 7: Mobile Text Alignment Fix
**File: `src/components/witness/WitnessHero.tsx`**
- Ensure the `text-center` class is applied consistently to the h1 and p elements on all viewport sizes
- The current `max-w-4xl mx-auto text-center` wrapper should handle this, but verify the child elements inherit center alignment

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/usePageTheme.ts` | Add `/contact` to dark theme routes |
| `src/components/Navigation.tsx` | Remove ThemeToggle, simplify CTA button |
| `src/pages/Pricing.tsx` | Fix chapter-rule positioning |
| `src/pages/FAQ.tsx` | Fix chapter-rule positioning |
| `src/components/TheSound.tsx` | Remove waveform placeholder, simplify to elegant "coming soon" |
| `src/pages/Proof.tsx` | Add section fade transitions between sections |
| `src/components/witness/WitnessSustain.tsx` | Replace hardcoded HSL with CSS variables |
| `src/components/witness/WitnessCovenant.tsx` | Replace hardcoded HSL with CSS variables |
| `src/components/witness/WitnessHero.tsx` | Verify mobile text centering |

## What Stays Unchanged

- All text content across every page
- All pricing details and package information
- All process section content and cards
- Homepage hero vigil sequence and all animation timing
- All 7+ AI-generated background images
- Footer structure and all valid links
- Color palette and typography system
- About page narrative structure and content

## Design Principles Applied

- **Lagom**: Remove the theme toggle -- the Death/Life rhythm is architectural, not user-selectable
- **Funktionalism**: Remove the fake waveform -- if music isn't ready, don't pretend it is
- **Breathing rhythm**: Add section fade transitions to Proof page for consistent inhale/exhale flow
- **Consistency**: Navigation should feel the same across all pages

