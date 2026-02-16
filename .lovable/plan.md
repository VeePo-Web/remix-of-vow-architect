

# World-Class Visual Enhancement -- AI-Generated Imagery

## Current State

The homepage has real photography in only two places: the hero background (piano keys) and the four Process section movement cards. Every other section is text on solid color backgrounds with no imagery whatsoever. This creates a visually sparse, template-like feel that falls short of the Fantasy.co standard.

Additionally, TheRecord section (line 133) still has a dead link to `/resources` that needs to be removed.

## Image Generation Strategy

Generate 7 AI images using the Nano banana pro model (google/gemini-3-pro-image-preview) for maximum quality. Each image serves a specific emotional purpose aligned with the brand's Death/Life visual rhythm.

### Image 1: TheInvitation -- Pianist Portrait
**Prompt:** "Cinematic portrait of a male pianist's hands gracefully resting on ivory piano keys, warm golden candlelight reflecting off the polished black grand piano surface, shallow depth of field, intimate ceremony setting, dark moody background with warm highlights, editorial wedding photography style, 35mm film grain"
**Placement:** Replace the dark video placeholder box with this image
**Emotional purpose:** Establishes Parker as a real person, creates intimacy and trust

### Image 2: TheTransformation -- Left Panel (Fear/Vigil)
**Prompt:** "Empty wedding ceremony chairs in dim blue-grey twilight, outdoor mountain venue, no people, overcast sky, anxious atmospheric mood, soft out-of-focus bokeh, desaturated cool tones, editorial photography, sense of anticipation and vulnerability"
**Placement:** Subtle background behind the fears column (left panel), at 15% opacity
**Emotional purpose:** Reinforces the anxiety of "what if" before the transformation

### Image 3: TheTransformation -- Right Panel (Resolution/Life)
**Prompt:** "Bride and groom exchanging vows in warm golden hour sunlight, intimate close-up of their hands, outdoor ceremony with soft bokeh flowers in background, warm cream and gold tones, joyful and peaceful atmosphere, editorial wedding photography, shallow depth of field"
**Placement:** Subtle background behind the resolutions column (right panel), at 12% opacity
**Emotional purpose:** Reinforces the warmth and certainty of the resolution

### Image 4: TheWitness -- Ceremony Setup
**Prompt:** "Elegant piano setup at an outdoor wedding ceremony, white chairs arranged in rows, microphone stand beside grand piano, mountain landscape in soft background, golden hour light, professional and meticulous arrangement, editorial photography style"
**Placement:** Full-width background image behind the section content, at 8% opacity
**Emotional purpose:** Shows the professional setup -- "this is what I do"

### Image 5: TheSound -- Piano Keys Close-Up
**Prompt:** "Extreme close-up of piano keys being played by elegant hands, motion blur on fingers, warm amber stage lighting, black and white keys in sharp focus, moody cinematic lighting, dark background, sense of musical performance, editorial photography"
**Placement:** Behind the waveform placeholder area, at 15% opacity
**Emotional purpose:** Creates visual connection to the music being described

### Image 6: TheWitnesses -- Wedding Venue Atmosphere
**Prompt:** "Dreamy wedding reception venue with warm string lights overhead, elegant table settings, soft golden bokeh, out-of-focus romantic atmosphere, cream and champagne tones, editorial wedding photography, sense of celebration and warmth"
**Placement:** Subtle background behind testimonials section, at 6% opacity
**Emotional purpose:** Wraps testimonials in real wedding warmth

### Image 7: CrossOver -- Sacred Final Moment
**Prompt:** "First dance of bride and groom, silhouetted against warm golden light, grand piano visible in soft focus background, romantic and emotional moment, cinematic lighting with lens flare, editorial wedding photography, deep shadows with golden highlights"
**Placement:** Background behind the final CTA section, at 10% opacity with radial gradient mask
**Emotional purpose:** The emotional peak -- "this could be you"

## Technical Implementation

### Step 1: Generate all 7 images using AI
- Use google/gemini-3-pro-image-preview for maximum quality
- Save each as a named file in `src/assets/` (e.g., `invitation-portrait.jpg`, `transformation-fear.jpg`, etc.)

### Step 2: Place images in components
Each image placement follows the same pattern:
- Import the image
- Add as an absolutely positioned background layer with appropriate opacity
- Apply CSS `object-fit: cover` for responsive scaling
- Add `loading="lazy"` for performance
- Use gradient overlays to ensure text remains readable

### Step 3: Fix TheRecord dead link
- Remove the "Download sample report" button linking to `/resources` (line 132-137 in TheRecord.tsx)
- Same pattern as the CrossOver fix

### Step 4: Fix TheWitnesses observer cleanup
- Add `observer.disconnect()` in TheWitnesses.tsx (line 32) -- this was missed in the previous cleanup pass

## Files to Modify

| File | Change |
|------|--------|
| `src/components/TheInvitation.tsx` | Replace video placeholder with portrait image |
| `src/components/TheTransformation.tsx` | Add fear/resolution background images |
| `src/components/TheWitness.tsx` | Add ceremony setup background image |
| `src/components/TheSound.tsx` | Add piano keys background image |
| `src/components/TheWitnesses.tsx` | Add venue background image + fix observer |
| `src/components/CrossOver.tsx` | Add first dance background image |
| `src/components/TheRecord.tsx` | Remove dead `/resources` link |

## Performance Considerations

- All images use `loading="lazy"` to prevent blocking initial page load
- Background images kept at low opacity (6-15%) so compression artifacts are invisible
- Images sized appropriately for web (no larger than 1920px wide)
- `will-change: transform` only on animated elements, not static backgrounds
- Total additional payload: approximately 500-700KB across 7 images (acceptable for a luxury brand site)

## What Stays Unchanged

- All text content
- Hero section and hero image
- Process section cards and their existing photography
- VowMoment (intentionally void -- no image needed)
- TheExhale (intentionally void -- no image needed)
- All animations and timing
- Color palette and typography

