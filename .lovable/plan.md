

# Gateway Refinement -- Entrance Animation Choreography and Card Aspect Ratio Tuning

## Audit Finding

### 1. Card Aspect Ratio Creates Excess Dead Space Above Content

The cards use `md:aspect-[3/4]` which produces tall, portrait-oriented rectangles. On a 1280px desktop viewport, each card is roughly 350px wide by 467px tall. The content cluster (title, description, CTA) occupies approximately 120px at the bottom, leaving over 340px of image-only space above. This ratio works for photography-dominant layouts, but here the images are intentionally muted (20-35% opacity) -- they function as atmospheric texture, not focal content. The result is a large dark void above the text that reads as emptiness rather than luxury breathing room.

A shift from `3/4` to `3/3.5` (approximately `6/7`) reduces the card height by roughly 50px. The image atmosphere is preserved, but the content cluster sits in better proportion to the card frame. The cards feel more intentional -- the image serves the text rather than overwhelming it. On mobile, cards already use `flex-1` without aspect ratio, so this change is desktop-only.

### 2. Entrance Animation Stagger Is Too Tight Between Header and Cards

The current stagger sequence is:
- Wordmark: 400ms
- Subtitle: 600ms  
- Cards: 800ms / 1000ms / 1200ms
- Golden thread: 1400ms
- Footer tagline: 1400ms

The gap between the subtitle (600ms) and the first card (800ms) is only 200ms. At the animation duration of 220ms (`animate-fade-in`), the subtitle is still mid-transition when the Weddings card begins appearing. This creates visual overlap -- two elements competing for attention simultaneously. World-class reveal sequences (Fantasy, Apple product pages) use deliberate pauses between compositional layers to let each element "land" before the next begins.

Shifting the card stagger to 1000ms / 1200ms / 1400ms (adding 200ms to each) creates a clear 400ms gap after the subtitle completes (600ms + 220ms duration = ~820ms finish, first card starts at 1000ms). The golden thread and footer shift to 1600ms to maintain their position as the final layer. Each compositional group -- header, cards, connective details -- now has its own breathing room in the sequence.

---

## Specifications

### Card Aspect Ratio
- Desktop: change `md:aspect-[3/4]` to `md:aspect-[6/7]`
- Mobile: no change (cards use `flex-1 min-h-0`)

### Entrance Animation Stagger
- Wordmark: 400ms (unchanged)
- Subtitle: 600ms (unchanged)
- Weddings card delay: 800ms changes to 1000ms
- Teaching card delay: 1000ms changes to 1200ms
- Events card delay: 1200ms changes to 1400ms
- Golden thread: 1400ms changes to 1600ms
- Footer tagline: 1400ms changes to 1600ms

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Update `md:aspect-[3/4]` to `md:aspect-[6/7]` on card container class; update delay values in services array (800/1000/1200 to 1000/1200/1400); update golden thread and footer `animationDelay` from 1400ms to 1600ms |

## What Stays Unchanged

All typography hierarchy, vertical rhythm, routing, images, opacity layers, gradient overlays, border luminance, semicolon breathing, arrow affordance, hover scale/lift/glow, parallax, and mobile layout remain exactly as they are.
