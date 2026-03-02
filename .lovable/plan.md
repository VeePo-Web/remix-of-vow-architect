

# Replace Process Closing Background Image

## What's Changing
The background image on the "Because there's one chance to get this right" card (`src/assets/process/ceremony.jpg`) currently shows what appears to be a woman at a piano. This will be replaced with an AI-generated cinematic image of a man's hands on piano keys in warm, atmospheric candlelight — matching Parker's identity and the brand aesthetic.

## Steps

1. **Generate AI image** using the Nano banana pro model (`google/gemini-3-pro-image-preview`) with a prompt crafted for the brand: a cinematic, shallow depth-of-field photograph of a man's hands on grand piano keys, warm golden candlelight, desaturated film tones, dark moody atmosphere — no face visible, focus on hands and keys.

2. **Save the generated image** to `src/assets/process/ceremony.jpg`, replacing the current file. No code changes needed since `ProcessSection.tsx` already imports from this path.

