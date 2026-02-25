

# About Page Elevation + Final Homepage Polish -- Fantasy.co Quality

## Current State

### Homepage (95% complete)
The homepage is strong with vigil sequence, AI images, vinyl disc animation, now-playing mini-bar, section transitions, typography polish, and breathing footer separator all implemented. No console errors.

### About Page (70% complete -- primary focus)
The About page has excellent narrative structure (Hero/Origin/Sustain/Presence/Covenant/Crossing) but lacks the visual richness of the homepage:
- **WitnessHero**: Has `about-hero.jpg` at 12% opacity -- works but image needs to be more cinematic
- **WitnessOrigin**: Has `about-origin.jpg` -- adequate but could be more emotionally resonant
- **WitnessSustain**: No background image at all -- feels flat compared to homepage sections
- **WitnessPresence**: Has `about-presence.jpg` at 6% opacity -- barely visible
- **WitnessCovenant**: No background imagery -- feels disconnected from the cinematic language
- **WitnessCrossing**: Uses `crossover-dance.jpg` from homepage -- should have its own identity
- **Missing section transitions**: No `section-fade-bottom` divs between sections (hard cuts)
- **Missing golden rule separators**: No visual anchoring between section labels and headings

---

## Plan: 4 AI-Generated Images for About Page

### Image 1: About Hero Background
**File:** `src/assets/about-hero.jpg` (replace existing)
**Prompt:** "Grand piano in a cathedral with stained glass windows, moody dramatic lighting, single beam of warm light illuminating the piano, vast empty space around it, cinematic composition, dark atmosphere, film grain, architectural photography style"
**Purpose:** The hero needs to convey solitude, sacredness, and the weight of being a witness

### Image 2: About Origin Story
**File:** `src/assets/about-origin.jpg` (replace existing)
**Prompt:** "Empty outdoor wedding ceremony chairs at dusk, scattered flower petals on the ground, no people, wind-blown fabric on chairs, moody overcast sky with last light on horizon, shallow depth of field, sense of abandonment and lost moment, cinematic film photography"
**Purpose:** Visually convey the origin story -- the wedding where vows were lost to the wind

### Image 3: About Presence / Ceremonies
**File:** `src/assets/about-presence.jpg` (replace existing)
**Prompt:** "Aerial overhead view of a wedding ceremony in progress, circular seating arrangement, grand piano visible to the side, outdoor mountain setting, warm golden hour light, guests seated, beautiful natural landscape, cinematic drone photography style"
**Purpose:** Convey the scale and intimacy of 200+ ceremonies witnessed

### Image 4: Witness Crossing Background
**File:** `src/assets/witness-crossing-ai.jpg` (new)
**Prompt:** "Close-up of piano keys with warm candlelight reflections on the lacquered surface, intimate and sacred, golden warm tones, extremely shallow depth of field, one candle reflected in the black piano surface, dark moody atmosphere"
**Purpose:** Give the About page crossing section its own visual identity rather than sharing the homepage's dance image

---

## Plan: Component Polish (6 refinements)

### 1. Section Transition Fades
Add `section-fade-bottom` and `section-fade-top` divs between all About page sections to eliminate hard visual cuts.

**Files affected:**
- `WitnessHero.tsx` -- add bottom fade into Origin (warm direction)
- `WitnessOrigin.tsx` -- add bottom fade into Sustain (warm surface)
- `WitnessSustain.tsx` -- add bottom fade into Presence (dark direction)
- `WitnessPresence.tsx` -- add bottom fade into Covenant (warm direction)
- `WitnessCovenant.tsx` -- add bottom fade into Crossing (dark direction)

### 2. Sustain Section -- Add Atmospheric Background
The Sustain section currently has no background image and feels flat. Add a subtle radial gradient glow and the same grain texture as other sections.

**File:** `WitnessSustain.tsx`
- Add `grain` overlay at 15% opacity
- Add radial golden glow behind the SVG visualization

### 3. Presence Section -- Increase Image Visibility
The background image is at 6% opacity which is nearly invisible. Increase to 10% and add a Ken Burns animation to bring it to life.

**File:** `WitnessPresence.tsx`
- Increase opacity from `0.06` to `0.10`
- Add Ken Burns animation matching homepage style

### 4. Crossing Section -- Use Dedicated Image
Replace the shared `crossover-dance.jpg` with a new dedicated image for the About page crossing.

**File:** `WitnessCrossing.tsx`
- Import new `witness-crossing-ai.jpg` instead of `crossover-dance.jpg`
- Increase opacity slightly to 10% (from 8%)

### 5. Golden Rule Separators
Add the same golden rule separator pattern used on the homepage to key About page section headers for visual consistency.

**Files:** `WitnessPresence.tsx`, `WitnessCovenant.tsx`
- Add a 48px golden gradient line between section labels and headings

### 6. Covenant Certificate -- Enhanced Warmth
The certificate section is well-designed but the container feels cold. Add a warm inner glow and slightly warmer border treatment.

**File:** `WitnessCovenant.tsx`
- Change border from `border-border/30` to `border-primary/15`
- Add inner box shadow with warm golden tone
- Enhance corner ornament opacity from `border-primary/30` to `border-primary/40`

---

## Files Changed Summary

| File | Action | Change |
|------|--------|--------|
| `src/assets/about-hero.jpg` | Replace | AI-generated cathedral piano |
| `src/assets/about-origin.jpg` | Replace | AI-generated empty ceremony chairs at dusk |
| `src/assets/about-presence.jpg` | Replace | AI-generated aerial ceremony view |
| `src/assets/witness-crossing-ai.jpg` | Create | AI-generated piano keys with candlelight |
| `src/components/witness/WitnessHero.tsx` | Edit | Section fade bottom |
| `src/components/witness/WitnessOrigin.tsx` | Edit | Section fade bottom |
| `src/components/witness/WitnessSustain.tsx` | Edit | Grain overlay, radial glow, section fade bottom |
| `src/components/witness/WitnessPresence.tsx` | Edit | Increase bg opacity, Ken Burns, golden rule, section fade |
| `src/components/witness/WitnessCovenant.tsx` | Edit | Warmer certificate, golden rule, section fade bottom |
| `src/components/witness/WitnessCrossing.tsx` | Edit | New dedicated background image |

## What Stays Unchanged

- All copy, text, and content on every page
- All pricing and service details
- Homepage sections (already polished)
- Process section structure
- Navigation, footer, and all other pages
- All existing animation timing and interaction patterns

