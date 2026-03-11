

# Phase 10: Duplicate Image Elimination + Site-Wide Editorial Polish

## Problem: Severe Image Duplication

The site reuses the same 3-4 images across dozens of components, creating a repetitive, low-budget feel that undermines the luxury positioning. Here is the duplicate map:

| Image | Used In (count) |
|-------|-----------------|
| `events-hero.jpg` | EventsHero, EventsThreshold, EventsAboutHero, EventsAboutOrigin, EventsAboutCrossing, EventsPricing, EventsContact — **7 uses** |
| `teaching-bench.jpg` | TeachingHero, TeachingExhale, TeachingStories, TeachingCrossing, TeachingThreshold, TeachingAboutHero, TeachingAboutCrossing, TeachingPricing, TeachingContact — **9 uses** |
| `teaching-keys.jpg` | TeachingPillars, TeachingStories, TeachingAboutOrigin — **3 uses** |
| `sound-keys.jpg` | TeachingStories, TeachingOffering, EventsCrossing — **3 uses** |
| `sound-bokeh-ai.jpg` | TheSound, EventsApproach — **2 uses** |
| `gateway-events.jpg` | Gateway, EventsExhale — **2 uses** |

**Unused images available as replacements:**
- `hero-piano.jpg` — completely unused
- `witness-ceremony.jpg` — completely unused
- `sound-keys-intimate-ai.jpg` — completely unused

---

## Part A: Generate New Images via AI

Use the Nano banana image generation API to create 6-8 unique editorial images. Each image should be distinct in composition and color temperature. Suggested prompts:

1. **Teaching warm studio** — "Warm sunlit piano studio, soft focus on sheet music, golden hour light, editorial photography style, 3:2 aspect ratio"
2. **Events grand piano room** — "Grand piano in elegant ballroom, ambient candlelight, wide shot, luxury editorial photography"
3. **Hands on keys close-up** — "Close-up of hands playing piano keys, shallow depth of field, warm tones, cinematic"
4. **Empty venue atmosphere** — "Empty elegant venue with chairs, golden hour through windows, atmospheric fog, editorial"
5. **Piano detail macro** — "Macro shot of piano hammers and strings, warm backlight, abstract artistic photography"
6. **Student learning moment** — "Adult student at piano with teacher nearby, warm natural light, candid editorial moment"

These images will be saved to `src/assets/` and replace duplicates so each page section has unique photography.

## Part B: Redistribute Images Across Pages

### Events vertical (reduce `events-hero.jpg` from 7 to 2 uses):
| Component | Current Image | New Image |
|-----------|--------------|-----------|
| EventsThreshold | `events-hero.jpg` | AI-generated "grand piano room" |
| EventsAboutOrigin | `events-hero.jpg` | `witness-ceremony.jpg` (unused) |
| EventsAboutCrossing | `events-hero.jpg` | AI-generated "empty venue atmosphere" |
| EventsPricing | `events-hero.jpg` | `hero-piano.jpg` (unused) |
| EventsContact | `events-hero.jpg` | AI-generated "events grand piano" |

### Teaching vertical (reduce `teaching-bench.jpg` from 9 to 2 uses):
| Component | Current Image | New Image |
|-----------|--------------|-----------|
| TeachingExhale | `teaching-bench.jpg` | AI-generated "teaching warm studio" |
| TeachingStories | `teaching-bench.jpg` (in array) | AI-generated "student learning moment" |
| TeachingCrossing | `teaching-bench.jpg` | `sound-keys-intimate-ai.jpg` (unused) |
| TeachingThreshold | `teaching-bench.jpg` | AI-generated "hands on keys close-up" |
| TeachingAboutCrossing | `teaching-bench.jpg` | AI-generated "piano detail macro" |
| TeachingPricing | `teaching-bench.jpg` | `hero-piano.jpg` or new AI image |
| TeachingContact | `teaching-bench.jpg` | `witness-ceremony.jpg` or new AI image |

### Other swaps:
| Component | Current Image | New Image |
|-----------|--------------|-----------|
| TeachingStories (array) | `teaching-keys.jpg` | AI-generated unique |
| TeachingOffering | `sound-keys.jpg` | `sound-keys-intimate-ai.jpg` |
| EventsCrossing | `sound-keys.jpg` | AI-generated "empty venue" |

## Part C: Add Editorial Image Bleeds to Pages That Still Lack Them

Several pages have hero background images but no editorial `GoldCornerImage` bleeds within the body:

1. **Pricing.tsx** — Add a side-bleed image in the packages section using `services-hero.jpg` or a new AI image
2. **FAQ.tsx** — Add an editorial image between the chips section and the fears section
3. **Proof.tsx** — Add a side-bleed image in the insurance or redundancy section
4. **Listen.tsx** — Add an atmospheric image between the movements list and the crossing CTA

Each uses the `GoldCornerImage` component with appropriate aspect ratios and the established asymmetric bleed pattern.

## Part D: Atmospheric Layer Consistency Check

Ensure every section across all pages has the minimum atmospheric stack: grain (0.04), breathing vignette, and warm radial glow. Pages to audit:
- Pricing.tsx sections
- FAQ.tsx sections
- Proof.tsx sections
- Listen.tsx sections

---

## Summary of Files to Modify

| File | Change |
|------|--------|
| `src/components/events/EventsThreshold.tsx` | Swap image |
| `src/components/events/EventsCrossing.tsx` | Swap image |
| `src/components/events-about/EventsAboutOrigin.tsx` | Swap image |
| `src/components/events-about/EventsAboutCrossing.tsx` | Swap image |
| `src/pages/EventsPricing.tsx` | Swap image |
| `src/pages/EventsContact.tsx` | Swap image |
| `src/components/teaching/TeachingExhale.tsx` | Swap image |
| `src/components/teaching/TeachingStories.tsx` | Swap images in array |
| `src/components/teaching/TeachingCrossing.tsx` | Swap image |
| `src/components/teaching/TeachingThreshold.tsx` | Swap image |
| `src/components/teaching/TeachingOffering.tsx` | Swap image |
| `src/components/teaching-about/TeachingAboutCrossing.tsx` | Swap image |
| `src/pages/TeachingPricing.tsx` | Swap image |
| `src/pages/TeachingContact.tsx` | Swap image |
| `src/pages/Pricing.tsx` | Add editorial image bleed |
| `src/pages/FAQ.tsx` | Add editorial image bleed |
| `src/pages/Proof.tsx` | Add editorial image bleed |
| `src/pages/Listen.tsx` | Add editorial image bleed |

## What Does NOT Change
- Weddings homepage (locked)
- Gateway page images (each service needs its own thumbnail)
- Hero section images (these are the "anchor" uses and should remain)
- All copy, animations, scroll-reveal patterns, and atmospheric layers already in place

