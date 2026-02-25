

# Secondary Pages Elevation -- Services, Gallery, FAQ, Contact

## Current State

The homepage and About page are fully polished with AI-generated images, section transition fades, vinyl disc animation, now-playing mini-bar, golden rule separators, and breathing footer. The secondary pages are functional but lack the same cinematic depth.

**What needs attention:**
- Services, Gallery, FAQ, and Contact pages all share the same `services-hero.jpg` background or have minimal atmospheric treatment
- No section transition fades between sections on any of these pages
- No Ken Burns animation on background images
- FAQ final CTA section contains meta-commentary text ("Buttons use clear, first-person labels...") that reads like design documentation, not user-facing copy
- Gallery/Proof page hero lacks Ken Burns and vignette polish
- Contact page background image at only 8% opacity with no Ken Burns

---

## Plan: 3 AI-Generated Images

### Image 1: Services Page Hero
**File:** `src/assets/services-hero.jpg` (replace existing -- currently shared across Services and FAQ)
**Prompt:** "Elegant grand piano setup at a luxury wedding venue, warm ambient lighting, crystal chandeliers in soft bokeh, intimate reception space, rich dark wood tones, cinematic photography, shallow depth of field, editorial luxury style"
**Purpose:** Give the Services page its own dedicated cinematic identity

### Image 2: FAQ Page Hero
**File:** `src/assets/faq-hero.jpg` (new)
**Prompt:** "Close-up of professional audio equipment and microphone on a piano, warm golden backlighting, soft focus background showing wedding chairs, technical precision meets artistry, moody dark atmosphere, cinematic photography"
**Purpose:** FAQ page currently shares the services image -- needs its own identity that conveys technical precision and trust

### Image 3: Gallery/Proof Page Hero
**File:** `src/assets/gallery-hero.jpg` (replace existing)
**Prompt:** "Wedding ceremony setup from behind the piano, looking toward rows of guest chairs and a floral arch, outdoor mountain setting, golden hour light streaming through, sound equipment subtly visible, cinematic wide-angle photography"
**Purpose:** Gallery hero needs to convey proof and professionalism -- seeing the setup from the pianist's perspective

---

## Plan: 6 Component Refinements

### 1. Services Page -- Ken Burns + Section Fades
**File:** `src/pages/Pricing.tsx`
- Add Ken Burns animation to background image (25s alternate)
- Add `section-fade-bottom` gradient at bottom of hero area before InclusionBlock

### 2. FAQ Page -- Dedicated Image + Remove Meta-Copy
**File:** `src/pages/FAQ.tsx`
- Import new `faq-hero.jpg` instead of `services-hero.jpg`
- Add Ken Burns animation to background image
- Fix the final CTA section: remove the meta-commentary paragraph ("Buttons use clear, first-person labels. Download links include file type and size. All images include alt text describing function (not decoration).") -- this reads like internal design notes, not user-facing copy

### 3. Gallery/Proof Page -- Ken Burns + Vignette Polish
**File:** `src/pages/Proof.tsx`
- Add Ken Burns animation to hero background image (30s alternate)
- Add subtle ambient golden glow behind hero content
- Add `section-fade-bottom` at end of hero section for smoother transition

### 4. Contact Page -- Ken Burns + Section Fade
**File:** `src/pages/Contact.tsx`
- Add Ken Burns animation to background image
- Increase background opacity from 0.08 to 0.10
- Add subtle golden ambient glow in hero area

### 5. FAQ Chips + Top Ten -- Golden Rule Separators
**Files:** `src/components/FAQChips.tsx`, `src/components/FAQTopTen.tsx`
- Add golden rule separator between section labels and headings for visual consistency with homepage and About page

### 6. Services Page -- Pricing Cards Section Fade
**File:** `src/pages/Pricing.tsx`
- Add `section-fade-bottom` gradient at the very bottom of the page before the footer for a smoother exit

---

## Files Changed Summary

| File | Action | Change |
|------|--------|--------|
| `src/assets/services-hero.jpg` | Replace | AI-generated luxury piano venue |
| `src/assets/faq-hero.jpg` | Create | AI-generated audio equipment close-up |
| `src/assets/gallery-hero.jpg` | Replace | AI-generated ceremony setup from pianist's POV |
| `src/pages/Pricing.tsx` | Edit | Ken Burns on hero image, section fade |
| `src/pages/FAQ.tsx` | Edit | New dedicated image, remove meta-copy |
| `src/pages/Proof.tsx` | Edit | Ken Burns, golden glow, section fade |
| `src/pages/Contact.tsx` | Edit | Ken Burns, increased opacity, golden glow |
| `src/components/FAQChips.tsx` | Edit | Golden rule separator |
| `src/components/FAQTopTen.tsx` | Edit | Golden rule separator |

## What Stays Unchanged

- All copy, pricing, and service details (except removing the FAQ meta-commentary)
- Homepage and About page (already polished)
- All existing animation timing
- Navigation, footer structure
- Process section and form functionality

