

# Homepage Visual Elevation -- Fantasy.co Quality

## Current State Assessment

The homepage structure and copy are strong. The vigil-to-covenant narrative arc flows well across 12 sections. However, several areas lack the visual richness and cinematic polish expected at Fantasy.co quality:

**What is already working well:**
- Hero section with vigil flame sequence and Ken Burns piano image
- The Exhale sacred pause with golden glow layers
- Process section with dawn gradient and movement cards
- Vow Moment full-viewport interstitial
- Transformation split-screen with fear/life panels
- Audio player in The Sound section (newly built)
- Name changed to "Parker Gawryletz" throughout

**What needs elevation:**
- Several background images are low-opacity overlays that add texture but lack cinematic depth
- The Invitation section image is a static photo without visual drama
- Some sections feel visually sparse without supporting imagery
- The overall "inhale/exhale" rhythm between dark and light sections could be more dramatic with richer visual layers
- No AI-generated imagery exists yet -- all images are uploaded JPGs

---

## Plan: AI-Generated Cinematic Images

Generate 6 high-quality AI images to replace or enhance the visual layer across key homepage sections. Each image is tailored to the brand's Death/Life dichotomy and the sacred ceremony narrative.

### Image 1: The Invitation Portrait
**Section:** TheInvitation.tsx (line 94-99)
**Current:** `invitation-portrait.jpg` -- a real photo of hands on piano keys
**New image prompt:** "Cinematic close-up of a pianist's hands on grand piano keys, warm candlelight, shallow depth of field, golden rim light on fingers, dark moody background, film grain, shot on medium format camera, Kodak Portra 800 film look, intimate and sacred atmosphere"
**Purpose:** Replace the existing portrait with a more cinematic, high-end version that matches the luxury brand positioning
**File:** `src/assets/invitation-portrait-ai.jpg`

### Image 2: The Sound Background
**Section:** TheSound.tsx (line 56-62)
**Current:** `sound-keys.jpg` at 15% opacity
**New image prompt:** "Overhead view of a grand piano in a dimly lit cathedral or chapel, single beam of golden light falling across the keys, long shadows, architectural columns in background, dust particles floating in light, ultra cinematic, dark and moody, film noir lighting"
**Purpose:** Deepen the immersive listening environment behind the audio player
**File:** `src/assets/sound-cathedral-ai.jpg`

### Image 3: Transformation Fear Panel
**Section:** TheTransformation.tsx (line 57-63)
**Current:** `transformation-fear.jpg` at 15% opacity
**New image prompt:** "Empty outdoor ceremony chairs from behind, wind blowing fabric on seats, overcast sky, muted desaturated colors, a sense of anxiety and uncertainty, shallow depth of field on fabric motion, cinematic 2.39:1 aspect feel, cold blue-grey tones"
**Purpose:** Viscerally communicate the fear of ceremony audio failure
**File:** `src/assets/transformation-fear-ai.jpg`

### Image 4: Transformation Life Panel
**Section:** TheTransformation.tsx (line 91-97)
**Current:** `transformation-life.jpg` at 12% opacity
**New image prompt:** "Close-up of two hands intertwined during a ceremony, warm golden hour light, soft bokeh of guests in background, elegant wedding attire visible, warmth and intimacy, shot on 85mm f/1.4, golden tones, hopeful and sacred atmosphere"
**Purpose:** Communicate the warmth and relief of a ceremony where every word was heard
**File:** `src/assets/transformation-life-ai.jpg`

### Image 5: CrossOver Background
**Section:** CrossOver.tsx (line 29-35)
**Current:** `crossover-dance.jpg` at 10% opacity
**New image prompt:** "Silhouette of a couple in their first dance, backlit by warm golden light, ballroom or tent ceiling with string lights above, romantic bokeh, dreamy and celebratory, cinematic film grain, Fuji Pro 400H color palette, sacred and joyful"
**Purpose:** The final CTA section needs maximum emotional warmth to drive conversion
**File:** `src/assets/crossover-dance-ai.jpg`

### Image 6: Witness Ceremony Background
**Section:** TheWitness.tsx (line 44-50)
**Current:** `witness-ceremony.jpg` at 8% opacity
**New image prompt:** "Side angle of a wedding ceremony setup, rows of chairs leading to an altar, grand piano positioned to the side, natural outdoor setting with mountains in soft focus background, warm afternoon light, elegant minimalist setup, Banff or Rocky Mountain landscape feel"
**Purpose:** Reinforce the "ceremony witness" identity with a setup that shows the piano's position in the ceremony space
**File:** `src/assets/witness-setup-ai.jpg`

---

## Implementation Details

### How images will be integrated

Each AI-generated image will be created using the Nano banana model, then saved to `src/assets/`. The existing component imports will be updated to reference the new files. No layout, spacing, typography, or animation changes -- only the image source paths change.

### Opacity and treatment

All background images maintain their current opacity levels and CSS filter treatments. The AI images are designed to work at low opacity as atmospheric texture layers, not as foreground content. The existing gradient overlays, vignettes, and grain textures remain untouched.

### Performance

- Images will be optimized for web (compressed)
- All images already use `loading="lazy"`
- No new JavaScript or animation overhead
- No layout shifts -- images are positioned absolutely behind content

---

## Files Changed Summary

| File | Action | Change |
|------|--------|--------|
| `src/assets/invitation-portrait-ai.jpg` | Create | AI-generated cinematic piano hands |
| `src/assets/sound-cathedral-ai.jpg` | Create | AI-generated cathedral piano overhead |
| `src/assets/transformation-fear-ai.jpg` | Create | AI-generated empty ceremony chairs in wind |
| `src/assets/transformation-life-ai.jpg` | Create | AI-generated intertwined hands in golden light |
| `src/assets/crossover-dance-ai.jpg` | Create | AI-generated first dance silhouette |
| `src/assets/witness-setup-ai.jpg` | Create | AI-generated ceremony setup with piano |
| `src/components/TheInvitation.tsx` | Edit | Update image import path |
| `src/components/TheSound.tsx` | Edit | Update image import path |
| `src/components/TheTransformation.tsx` | Edit | Update two image import paths |
| `src/components/CrossOver.tsx` | Edit | Update image import path |
| `src/components/TheWitness.tsx` | Edit | Update image import path |

## What stays unchanged

- All copy, headlines, and CTAs
- All layout, spacing, and typography
- All animations and timing
- All pricing details
- Process section (already has strong imagery)
- Hero section (user confirmed it is good)
- The Exhale and Vow Moment (pure text sections by design)
- The Record and The Witnesses sections (data-driven, text-focused)
- Footer, navigation, and all other pages

