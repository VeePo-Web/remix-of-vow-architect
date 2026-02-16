

# World-Class Design Overhaul -- Full Website

## Current State Summary

After auditing every page and component, the site has strong narrative architecture but falls short of Fantasy.co-level polish in several areas. The homepage is the strongest page; the About, Gallery (Proof), Services, FAQ, and Contact pages lack the atmospheric imagery, refined spacing, and cinematic transitions that make the homepage work.

## Critical Issues Across the Site

### 1. About Page -- Needs Complete Visual Redesign
The About page (WitnessHero, WitnessOrigin, WitnessSustain, WitnessPresence, WitnessCovenant, WitnessCrossing) is text-only with no imagery. The "empty memory space" on WitnessOrigin is literally empty -- 60% of the viewport shows a faint dot. The piano keyboard in WitnessSustain looks like a crude diagram, not a world-class visual. The WitnessPresence "floating moments" cards are plain bordered boxes with no atmosphere. This page needs atmospheric background images, refined section transitions, and the same cinematic treatment as the homepage.

### 2. Gallery/Proof Page -- Generic Trust Stack Layout
The Gallery page uses generic icon + text cards (Shield, Zap, Layers, Clock) that look like every other SaaS product page. No imagery, no atmospheric depth. The SPLTriptych, SetupPhotoGallery, and InsuranceDocuments sections need cinematic treatment.

### 3. Services/Pricing Page -- Functional but Not Premium
The pricing cards work but lack the atmospheric depth layers (gradients, vignettes, grain) that make the homepage sections feel premium. The "Assured Ceremony Audio" label and grid of inclusions look like a standard feature list.

### 4. FAQ Page -- Standard Accordion Layout
Clean but standard. Missing the Death/Life emotional rhythm and atmospheric treatment.

### 5. Contact Page -- Standard Form
Functional form but lacks atmospheric imagery and the emotional warmth of the brand.

### 6. Missing AI-Generated Images Throughout
The user specifically requested AI-generated stock images to add visual richness. Currently, only the homepage has atmospheric images. Every other page is text-only.

---

## Implementation Plan

### Phase 1: Generate AI Images for All Pages (7 images)

Using the AI image generation API, create atmospheric, cinematic images:

| Image | Purpose | Prompt Direction |
|-------|---------|-----------------|
| about-hero.jpg | About page hero background | Soft-focus grand piano in cathedral light, golden hour, dust motes |
| about-origin.jpg | WitnessOrigin right panel | Empty wedding ceremony chairs at twilight, wind-blown aisle |
| about-presence.jpg | WitnessPresence background | Overhead view of wedding ceremony, soft bokeh, warm tones |
| gallery-hero.jpg | Gallery page hero background | Sound equipment setup detail shot, matte black, golden accents |
| gallery-setup.jpg | Setup gallery placeholder | Grand piano in mountain venue, Banff-style landscape |
| services-hero.jpg | Services page hero background | Piano keys close-up with warm candlelight glow |
| contact-hero.jpg | Contact page background | Intimate wedding venue at dusk, warm string lights |

### Phase 2: About Page Redesign (6 components)

**WitnessHero.tsx**
- Add the about-hero.jpg as a background layer with 12% opacity, Ken Burns animation
- Add film grain overlay consistent with homepage hero
- Add vignette radial gradient for cinematic depth

**WitnessOrigin.tsx**
- Replace the empty "memory space" (60% column) with the about-origin.jpg image
- Add the same cinematic vignette overlay used in TheInvitation
- Maintain the text column at 40% with current copy

**WitnessSustain.tsx**
- Replace the crude 7-key piano diagram with a refined, minimal visualization
- Use abstract golden dots/lines instead of literal piano key rectangles
- Maintain the three-column Words/Silence/Memory layout with warm cream background

**WitnessPresence.tsx**
- Add about-presence.jpg as 8% opacity background
- Add radial gradient vignette for depth
- Refine the floating moments cards with subtle border-primary/10 glow and no explicit quotes

**WitnessCovenant.tsx**
- Add a subtle warm texture/grain to the certificate
- Refine corner ornament sizing and spacing
- Add a breathing golden glow behind the signature area

**WitnessCrossing.tsx**
- Add atmospheric background image (reuse crossover-dance.jpg) at low opacity
- Add the cta-breathe-glow animation to the CTA button (matching CrossOver on homepage)
- Add vignette overlay for cinematic depth

### Phase 3: Gallery Page Visual Polish (1 file)

**Proof.tsx**
- Add gallery-hero.jpg as hero section background with overlay
- Add film grain to hero section
- Add atmospheric depth gradients between sections
- Apply card-lift hover effects to trust stack items

### Phase 4: Services Page Visual Polish (1 file)

**Pricing.tsx**
- Add services-hero.jpg as hero background with dark overlay
- Add section-fade transitions between sections
- Add subtle grain texture to pricing cards section
- Apply the same breathing glow to the "Most Selected" card border

### Phase 5: FAQ + Contact Page Polish (2 files)

**FAQ.tsx**
- Add atmospheric gradient background to hero section
- Add section-fade transitions between FAQ sections

**Contact.tsx**
- Add contact-hero.jpg as subtle background element
- Add warm atmospheric glow behind the form card
- Refine vibe selector styling to match brand aesthetic (remove emoji, use elegant icons)

### Phase 6: Section Transition Consistency (CSS)

Add consistent section-fade-top and section-fade-bottom dividers to all page transitions across all pages, matching the homepage pattern. Ensure every dark-to-light and light-to-dark transition has the proper gradient fade.

---

## Files to Modify

| File | Changes |
|------|---------|
| src/components/witness/WitnessHero.tsx | Add background image, grain, vignette layers |
| src/components/witness/WitnessOrigin.tsx | Replace empty space with atmospheric image |
| src/components/witness/WitnessSustain.tsx | Refine piano visualization to abstract minimal design |
| src/components/witness/WitnessPresence.tsx | Add background image, refine cards |
| src/components/witness/WitnessCovenant.tsx | Add warm texture and glow effects |
| src/components/witness/WitnessCrossing.tsx | Add background image and breathing CTA |
| src/pages/Proof.tsx | Add hero background image and atmospheric layers |
| src/pages/Pricing.tsx | Add hero background and section transitions |
| src/pages/FAQ.tsx | Add atmospheric gradients |
| src/pages/Contact.tsx | Add background imagery, refine vibe selector |
| src/index.css | Add any new utility classes for page-level transitions |

## What Stays Unchanged

- All text content on Services, FAQ, Contact pages (per user request)
- All pricing details and package information
- All process section content and cards
- Homepage design (already polished)
- Footer and Navigation structure
- Color palette, typography system, animation timings
- All existing AI images on the homepage

## Technical Approach

- Generate 7 AI images using google/gemini-2.5-flash-image via edge function
- All images will use lazy loading with loading="lazy"
- All background images will use low opacity (6-15%) to maintain readability
- All images will include aria-hidden="true" for decorative backgrounds
- prefers-reduced-motion will disable Ken Burns and breathing animations
- Images will be compressed and optimized for web delivery

## Design Principles Applied

- **Inhale/Exhale rhythm**: Every page alternates between dark (vigil) and light (celebration) sections with proper gradient transitions
- **88/6/4 color ratio**: Background images never introduce new colors, only add atmospheric depth
- **Lagom principle**: Images at low opacity -- enough to add atmosphere, never enough to distract from content
- **Funktionalism**: Every visual element serves the emotional narrative, nothing decorative
- **Breathing metaphor**: CTA buttons use the 4s cta-breathe animation, section glows pulse subtly

