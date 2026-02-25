

# Final Polish Pass -- Homepage Remaining Sections + Listening Room Hero Image

## Current State Assessment

The site is 90% complete across all pages. The major gaps remaining are:

1. **Listening Room hero has no background image** -- it's a pure black void, missing the cinematic depth that every other page hero has
2. **Homepage sections missing AI background images**: TheWitnesses (uses `witnesses-venue.jpg` at 6% -- likely a placeholder), TheInvitation (uses portrait but no ambient background), CrossOver (uses `crossover-dance-ai.jpg` -- good)
3. **Gallery/Proof page still has `[Setup Photo]` placeholder text** in `SetupPhotoGallery.tsx` -- three cards show `[Setup Photo]` instead of actual images
4. **Navigation "Hold My Date" button doesn't link to `/contact`** -- it's a plain Button with no `asChild` or Link wrapper
5. **Mobile menu "Hold My Date" button also doesn't link** -- same issue
6. **Listen page `<style>` tags inside JSX** -- both `Listen.tsx` and `ListeningMovement.tsx` inject `<style>` tags per render; these keyframes should be in `index.css`

---

## Plan: 2 AI-Generated Images

### Image 1: Listening Room Hero Background
**File:** `src/assets/listen-hero.jpg` (new)
**Prompt:** "Dimly lit concert grand piano from audience perspective, single warm spotlight from above, dark concert hall auditorium with rows of empty seats barely visible, intimate and sacred atmosphere, cinematic shallow depth of field, moody dark tones with golden light accent"
**Purpose:** Give the Listening Room hero the same cinematic depth as every other page

### Image 2: Witnesses / Testimonials Background
**File:** `src/assets/witnesses-venue.jpg` (replace existing)
**Prompt:** "Elegant outdoor wedding ceremony venue at golden hour, mountain backdrop with soft warm light, rows of white chairs set up with aisle, floral arrangements on stands, no people, soft focus, cinematic landscape photography, warm golden tones"
**Purpose:** The current `witnesses-venue.jpg` is a generic placeholder; this gives the testimonials section emotional resonance

---

## Plan: 6 Technical Fixes

### 1. Navigation "Hold My Date" -- Add Link to /contact
**Files:** `src/components/Navigation.tsx` (lines 58-59, 89)
- Wrap both desktop and mobile "Hold My Date" buttons with `<Link to="/contact">` using `asChild`

### 2. Listening Room -- Add Hero Background Image
**File:** `src/pages/Listen.tsx`
- Import new `listen-hero.jpg`
- Add background image layer with Ken Burns animation at 8% opacity behind the hero section
- Add vignette and film grain overlays matching About page hero pattern

### 3. Move Inline Keyframes to CSS
**Files:** `src/pages/Listen.tsx`, `src/components/ListeningMovement.tsx`, `src/index.css`
- Remove the `<style>` tags from Listen.tsx (`listening-breathe` keyframes) and ListeningMovement.tsx (`waveform-bar` keyframes)
- Add both keyframe definitions to `src/index.css` where all other keyframes live
- This prevents re-injecting style tags on every render (performance optimization)

### 4. SetupPhotoGallery -- Replace Placeholder Text with Icons
**File:** `src/components/SetupPhotoGallery.tsx`
- The three cards currently show `<div>[Setup Photo]</div>` as placeholder
- Replace with a larger, more prominent icon display (the icons are already defined but small) and remove the placeholder `[Setup Photo]` divs
- This makes the section look intentional rather than unfinished

### 5. TheWitnesses -- Increase Background Image Opacity
**File:** `src/components/TheWitnesses.tsx`
- Increase background image opacity from `0.06` to `0.10`
- Add Ken Burns animation matching other sections (25s alternate)

### 6. Listen Page Section Fades
**File:** `src/pages/Listen.tsx`
- Add `section-fade-bottom` gradient between the hero section and the first movement
- Add `section-fade-bottom` gradient before the Crossing CTA section
- These eliminate the hard visual cuts that break the breathing rhythm

---

## Files Changed Summary

| File | Action | Change |
|------|--------|--------|
| `src/assets/listen-hero.jpg` | Create | AI-generated concert hall piano |
| `src/assets/witnesses-venue.jpg` | Replace | AI-generated outdoor venue at golden hour |
| `src/components/Navigation.tsx` | Edit | Link "Hold My Date" buttons to /contact |
| `src/pages/Listen.tsx` | Edit | Hero image, section fades, move keyframes to CSS |
| `src/components/ListeningMovement.tsx` | Edit | Remove inline style tag |
| `src/index.css` | Edit | Add listening-breathe and waveform-bar keyframes |
| `src/components/SetupPhotoGallery.tsx` | Edit | Remove [Setup Photo] placeholders |
| `src/components/TheWitnesses.tsx` | Edit | Increase bg opacity, add Ken Burns |

## What Stays Unchanged

- All copy, pricing, and service details
- Homepage hero, Exhale, Process, VowMoment, Sound, Transformation, Witness, ThreePaths, Record, CrossOver sections
- About page (already polished)
- FAQ, Contact, Services pages (already polished)
- All existing animation timing and interaction patterns
- Footer structure

