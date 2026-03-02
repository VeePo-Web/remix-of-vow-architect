

# Complete Design Overhaul: Three Paths as Piano Keys

## Vision

The current Three Paths section uses conventional pricing cards on a dark cinematic background. The redesign transforms the three tiers into literal piano keys — three tall white keys with two narrow black keys filling the gaps between them — creating a visual instrument the visitor reads like sheet music. The metaphor is immediate and uniquely Parker's: choosing a tier is choosing which keys to press.

## The Piano Key Layout

```text
Desktop (md+):

  ┌──────────┐ ┌──┐ ┌──────────┐ ┌──┐ ┌──────────┐
  │          │ │  │ │          │ │  │ │          │
  │  WHITE   │ │BK│ │  WHITE   │ │BK│ │  WHITE   │
  │  KEY 1   │ │  │ │  KEY 2   │ │  │ │  KEY 3   │
  │          │ │  │ │          │ │  │ │          │
  │  $650    │ └──┘ │  $750    │ └──┘ │  $1,200  │
  │          │      │          │      │          │
  │ Ceremony │      │ +Prelude │      │ +Cocktail│
  │  Only    │      │  30 min  │      │  Hour    │
  │          │      │          │      │          │
  │  [CTA]   │      │  [CTA]   │      │  [CTA]   │
  └──────────┘      └──────────┘      └──────────┘
```

- **White keys** are tall, narrow rectangles with flat bottoms and very subtle rounded tops (4px). They are the three pricing tiers. Ivory/cream surface with subtle vertical grain texture, like real piano keys.
- **Black keys** sit between the white keys, overlapping them slightly from the top. They are shorter (about 55-60% of white key height), narrower, and contain brief contextual details — small atmospheric copy or a sacred object. They use the rich-black/charcoal surface with a glossy sheen gradient.
- The middle white key (The Hour, $750) is the "most chosen" — it gets a subtle vow-yellow top edge glow and the "MOST CHOSEN" badge, like a key being pressed with golden light escaping from beneath.

## Content Changes

### Header Copy (new)
- Label: "THREE KEYS"
- Headline: "How deeply do you want me there."
- No subhead — the piano metaphor speaks for itself.

### White Key 1 — The Ceremony ($650)
- Name: "The Ceremony"
- Price: "$650"
- One-line description: "I play your ceremony — processional through recessional."
- A single composed sentence beneath: "Your vows, carried by piano. Nothing more, nothing less."
- CTA: "Hold my date"

### White Key 2 — The Prelude ($750) — Most Chosen
- Name: "The Prelude"
- Price: "$750"
- One-line description: "30 minutes of piano as your guests arrive, then your full ceremony."
- Composed sentence: "The room is already sacred before the first word is spoken."
- CTA: "Hold my date"

### White Key 3 — The Story ($1,200)
- Name: "The Story"
- Price: "$1,200"
- One-line description: "Prelude, ceremony, and live piano or curated DJ for cocktail hour."
- Composed sentence: "From the first guest to the last glass raised — I am there."
- CTA: "Hold my date"

### Black Key Content (decorative, not interactive)
- Black Key 1 (between Ceremony and Prelude): A small golden diamond icon. No text.
- Black Key 2 (between Prelude and Story): A small golden diamond icon. No text.

### Reassurance Line (below)
"You can move between these at any time — no penalty until two weeks before your ceremony."

## Technical Implementation

### File: `src/components/ThreePaths.tsx` — Full rewrite of content and layout

1. **Data structure** — Replace `paths` array with three tier objects containing: `name`, `price`, `description`, `sentence`, `ctaText`, `isChosen`. Remove the `features` array (bullet points eliminated — each tier gets one composed sentence instead).

2. **Layout** — Replace the `grid grid-cols-3` with a custom flex layout that interleaves white and black keys:
   - Container: `flex items-end` (keys align at bottom like a real piano)
   - White keys: `flex-1` with tall aspect ratio (`min-h-[480px] md:min-h-[560px]`), vertical flex column layout with content pushed to bottom third
   - Black keys: Fixed width (`w-[48px] md:w-[56px]`), shorter height (`h-[280px] md:h-[320px]`), positioned with negative horizontal margins (`-mx-3 md:-mx-4`) to overlap white keys, `z-10` to sit on top
   - Mobile: Stack vertically — white keys only, full width, black keys hidden (`hidden md:flex`)

3. **White key surface** — CSS class `.piano-white-key`:
   - Background: subtle ivory gradient (`linear-gradient(180deg, hsl(45 20% 96%) 0%, hsl(45 15% 92%) 100%)`)
   - Very subtle side borders simulating key edges: left border `1px solid hsl(45 10% 85%)`, right border `1px solid hsl(45 10% 88%)`
   - Bottom: flat (no border-radius). Top: `rounded-t-[4px]`
   - Shadow: `0 8px 32px rgba(0,0,0,0.3)` — keys floating above the dark background
   - Hover: `translateY(-4px)` like a key being released, shadow deepens
   - Text: dark (`hsl(240 9% 12%)`) — inverted from the rest of the site since keys are light surfaces

4. **Black key surface** — CSS class `.piano-black-key`:
   - Background: `linear-gradient(180deg, hsl(222 12% 14%) 0%, hsl(240 9% 8%) 85%, hsl(240 9% 6%) 100%)` — glossy top to matte bottom
   - Subtle highlight stripe across top 20%: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 20%)`
   - Border-radius: `0 0 4px 4px` (rounded at bottom, flat at top where it meets the "piano body")
   - Shadow: `0 4px 12px rgba(0,0,0,0.5)` — deeper shadow since they protrude
   - Width: narrower than white keys
   - Contains only a centered golden diamond icon

5. **Chosen key (middle)** — Additional styling:
   - Top border: `2px solid hsl(var(--vow-yellow) / 0.4)` — golden light escaping from the pressed key
   - Subtle glow: `box-shadow` includes `0 -4px 20px rgba(255,224,138,0.12)` at top
   - "MOST CHOSEN" badge positioned above with existing `paths-chosen-badge` styling
   - The key sits `4px` lower than flanking keys (`translate-y-1`) to simulate being pressed

6. **Typography inside white keys** — Dark text on ivory:
   - Name: `font-display text-xl font-light text-[hsl(240_9%_12%)]`
   - Price: `font-display text-[clamp(32px,4vw,44px)] font-light text-[hsl(240_9%_8%)]`
   - Description: `text-sm text-[hsl(240_9%_30%)]`
   - Composed sentence: `font-display text-sm font-light italic text-[hsl(240_9%_40%)]`
   - CTA button: Uses a new variant or inline override — dark background with ivory text, or outline with dark border

7. **Scroll reveal** — Keep existing `useScrollReveal` pattern. White keys stagger at 450ms, 350ms, 550ms (center first). Black keys fade in at 500ms and 600ms.

8. **Background** — Keep the existing cinematic background (pathsPianoCandle image, vignette, grain, warm spotlight). The dark atmospheric background makes the ivory white keys pop dramatically.

### File: `src/index.css` — New piano key styles

9. **`.piano-white-key`** — Base styles for ivory surface, shadows, border simulation, hover lift at 180ms.

10. **`.piano-white-key--chosen`** — Golden top glow, pressed position (translateY +2px relative to siblings).

11. **`.piano-black-key`** — Glossy gradient, highlight stripe, deeper shadow, rounded bottom corners.

12. **`.piano-white-key:hover`** — Lift -4px, shadow expansion, subtle warmth increase on border.

13. **Reduced motion fallbacks** — Disable translateY hover on piano keys, keep only opacity/border-color changes.

14. **Mobile layout** — On screens below `md`, white keys stack vertically at full width with reduced height (`min-h-[auto]`, padding-based sizing). Black keys are `hidden`. A thin golden thread separator appears between stacked keys instead.

### File: `src/components/PricingPreview.tsx` — Update to match

15. Update the `packages` data to match the new tier names ("The Ceremony", "The Prelude", "The Story") and descriptions. This component is a simplified preview used elsewhere — it should reflect the same naming convention but does not need the piano key visual treatment.

## What This Achieves

- The section becomes a literal visual instrument — uniquely Parker's, impossible to confuse with any other vendor
- Three ivory keys on a dark atmospheric background create dramatic contrast and immediate recognition
- Black keys between the tiers add rhythmic visual punctuation without carrying content weight
- The "pressed" middle key with golden glow naturally draws the eye to the $750 tier (the compromise-effect anchor)
- Eliminating bullet-point feature lists in favor of single composed sentences maintains the narrative voice
- Dark-text-on-ivory within the keys creates an inverted reading experience that signals "this is a different surface" — like reading sheet music placed on the piano
- The bottom-aligned layout (keys sit on a shared baseline like a real keyboard) creates architectural stability
- Mobile gracefully degrades to stacked cards with golden thread separators, maintaining the brand rhythm without forcing a horizontal piano on small screens

