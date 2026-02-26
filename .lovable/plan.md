

# ThreePaths Section — Copy Rewrite

## Problems Identified

1. **Headline feels arrogant.** "How deeply do you want me there?" centres Parker's importance rather than the couple's day. Needs to be reframed around the couple's choice.
2. **Features reference sound engineering.** "Officiant/vow microphones," "Silent battery power," "3 SPL readings logged," "Extended SPL monitoring," "Full-day SPL documentation," "Reception DJ & MC" — Parker is a pianist, not a sound tech or DJ.
3. **Descriptions need accuracy.** The Vow = ceremony only. The Hour = prelude + ceremony. The Story = prelude + ceremony + reception.

## Copy Changes (No Design Changes)

### File: `src/components/ThreePaths.tsx`

**Headline (line 85):**

| Current | Proposed |
|---------|----------|
| "How deeply do you want me there?" | "Choose the moment that matters most." |

**Subheadline (line 94):**

| Current | Proposed |
|---------|----------|
| "Three ways I can be present on your day." | "Three ways I can shape the music of your day." |

**The Vow — features (lines 21-25):**

| Current | Proposed |
|---------|----------|
| "Officiant/vow microphones" | "Live piano for your ceremony" |
| "Silent battery power" | "Processional and recessional pieces" |
| "3 SPL readings logged" | "Custom arrangement consultation" |
| "Run-of-show cue sheet" | "Run-of-show cue sheet" |

**The Hour — description and features (lines 32-37):**

| Element | Current | Proposed |
|---------|---------|----------|
| Description | "Prelude + Ceremony + Cocktails" | "Prelude + Ceremony" |
| Feature 1 | "Everything in The Vow" | "Everything in The Vow" |
| Feature 2 | "Live piano prelude (30 min)" | "30-minute piano prelude as guests arrive" |
| Feature 3 | "Cocktail hour music" | "Backup piano and speakers included" |
| Feature 4 | "Extended SPL monitoring" | "Rain cover for outdoor ceremonies" |

**The Story — description and features (lines 44-51):**

| Element | Current | Proposed |
|---------|---------|----------|
| Description | "Full wedding day" | "Prelude + Ceremony + Reception" |
| Feature 1 | "Everything in The Hour" | "Everything in The Hour" |
| Feature 2 | "Reception DJ & MC" | "Live piano through dinner and reception" |
| Feature 3 | "Full-day SPL documentation" | "Full-day timeline consultation" |
| Feature 4 | "Timeline consultation" | "Insurance and all equipment included" |

**CTA text — all three cards (lines 27, 40, 52):**

| Current | Proposed |
|---------|----------|
| "Choose this presence" | "Hold my date" |

This aligns with the brand voice rule: verb-forward CTAs, never "Submit."

## What Stays Unchanged

- All design: card layout, dark backgrounds, radial gradients, box shadows, border styles
- Section label "YOUR PRESENCE"
- Prices ($650, $750, $1,200)
- Card names (The Vow, The Hour, The Story)
- "MOST SELECTED" badge on middle card
- Reassurance line at bottom
- All CSS classes, scroll reveal animations, stagger timing

