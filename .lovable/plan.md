

# Replace Invitation Portrait with a Landscape-Oriented Image

## The Issue

The "Invitation" section uses a cinematic landscape frame (`aspect-[3/2]`) but the current image (`invitation-portrait-ai.jpg`) was shot vertically. This means the image is being cropped heavily via `object-cover`, losing its intended composition and likely showing an awkward slice of the original.

## The Solution

Generate a new landscape-oriented AI image that suits the 3:2 cinematic crop and matches the brand's warm, sacred aesthetic --- piano keys in candlelight, intimate and reverent.

## Steps

### Step 1: Generate a Landscape AI Image

Use the Nano banana pro model to generate a high-quality 16:9 or 3:2 landscape image. The prompt will describe warm candlelit piano keys, shallow depth of field, cinematic color grading --- aligned with the brand's Death-to-Life warmth palette (charcoal tones with golden accents).

Save the generated image as `src/assets/invitation-landscape-ai.jpg`.

### Step 2: Update TheInvitation.tsx

- Change the import from `invitation-portrait-ai.jpg` to `invitation-landscape-ai.jpg`
- The background texture layer (at 3% opacity) and the main portrait `<img>` both reference this import, so both will update automatically
- Update the alt text to reflect the new image content
- No layout changes needed --- the `aspect-[3/2]` frame is already correct for a landscape image

### Files Modified

| File | Change |
|------|--------|
| `src/assets/invitation-landscape-ai.jpg` | New generated landscape image |
| `src/components/TheInvitation.tsx` | Update import path and alt text |

