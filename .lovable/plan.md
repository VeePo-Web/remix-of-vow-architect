

# TheWitnesses Section — Copy Rewrite

## Current Problems

1. **Sound-engineering jargon.** "62 dBA at aisle mid," "unamplified; proximity arc applied," "68 dBA peak ceremony reading" — these reference SPL meters and acoustic engineering, not a pianist's work.
2. **Specific names and venues.** User wants generic placeholders for now — no real couple names or venue names.
3. **Headline references hearing vows.** Should reference the emotional impact of the music instead.

## Proposed Copy Changes

### File: `src/components/TheWitnesses.tsx`

**Section label** (line 64): No change — "THE COVENANT KEPT" stays.

**Headline** (line 85):

| Current | Proposed |
|---------|----------|
| "They heard their vows" | "The music stayed with them" |

**Testimonial 1:**

| Element | Current | Proposed |
|---------|---------|----------|
| quote | "Every guest heard us — even the back row." | "The moment the first note played, every worry I had disappeared." |
| names | "Sarah & James" | "Future couple" |
| venue | "Spruce Meadows" | "Outdoor ceremony" |
| metric line | "62 dBA at aisle mid" | *removed* |

**Testimonial 2:**

| Element | Current | Proposed |
|---------|---------|----------|
| quote | "We were Banff-legal with zero stress." | "Our guests still talk about the music more than anything else." |
| names | "Emily & David" | "Future couple" |
| venue | "Cascade Gardens" | "Mountain venue" |
| metric line | "unamplified; proximity arc applied" | *removed* |

**Testimonial 3:**

| Element | Current | Proposed |
|---------|---------|----------|
| quote | "The SPL log let us skip our venue's site visit requirement." | "He played the song from our first date. I did not know I could cry that much and still say I do." |
| names | "Rachel & Marcus" | "Future couple" |
| venue | "Lake House" | "Lakeside ceremony" |
| metric line | "68 dBA peak ceremony reading" | *removed* |

### Metric line removal

Remove the `<p>` element that renders `[ {testimonial.metric} ]` in the mono font. The `metric` field will be removed from the data array entirely. This eliminates all sound-engineering references.

## What Stays Unchanged

- All CSS classes, animations, scroll reveal, stagger timing
- Section background gradient, background image, fades
- Decorative opening quote marks
- Golden rule separators between testimonials
- Layout structure (max-w-3xl, spacing, padding)
- Section label "THE COVENANT KEPT"

