

# Round 60.5 — "The Witness": Copy Elevation Pass 2

## Analysis

The Pass 1 edits strengthened the declarations and kit. But the section still reads as a list of operational reassurances. The mind-reading effect --- the "Oh, this is exactly who I need" reaction --- requires one more layer: each declaration should quietly answer a specific unspoken fear without naming it.

The three fears this section must silently address:

1. "What if the musician shows up late or leaves early?" --- answered by Declaration 1
2. "What if something sounds wrong and no one catches it?" --- answered by Declaration 2
3. "What if they forget the timing or miss a cue?" --- answered by Declaration 3

The current declarations answer these, but they can be sharpened. The headline is strong. The kit is solid. The closing line works. The biggest opportunity is in the declarations themselves --- making them feel less like process statements and more like quiet vows.

## Proposed Changes

### Declarations (Lines 7-9)

**Current**:
1. "I arrive before anyone else --- and I leave after everyone."
2. "Every note is tested before your first guest walks in."
3. "Your cue sheet is rehearsed until it feels like memory."

**Proposed**:
1. "I arrive before anyone else --- and I stay until the room is empty."
2. "Every note is tested before your first guest walks in."
3. "Your cue sheet is rehearsed until it feels like instinct."

**Rationale**:
- Declaration 1: "I leave after everyone" is factual. "I stay until the room is empty" is visual and emotional --- the couple can *see* this. An empty room after a wedding is one of the most poignant images in the ceremony experience. It also implies dedication beyond obligation.
- Declaration 2: No change. This line is already outcome-focused and vivid.
- Declaration 3: "Memory" is good but passive --- you can forget a memory. "Instinct" is deeper. Instinct cannot fail. It answers the fear "What if they miss a cue?" with something that feels involuntary, automatic, certain. The pianist does not *remember* the cue sheet --- they *feel* it.

### Headline (Lines 99-117)

**Current**: "Not a performer --- your ceremony pianist."

**Proposed**: No change. This is the strongest possible positioning line for the section.

### Kit Label and Items

No change. Pass 1 upgrades are working.

### Closing Line (Line 210)

**Current**: "Now --- choose how long you want me there."

**Proposed**: No change. Clean bridge to Three Paths.

## Implementation

### File: `src/components/TheWitness.tsx`

- **Line 7**: Replace "and I leave after everyone" with "and I stay until the room is empty"
- **Line 9**: Replace "memory" with "instinct"

### No other files modified. No design, layout, animation, or styling changes.

## What This Achieves

- Declaration 1 shifts from factual ("I leave after everyone") to visual ("the room is empty") --- the couple sees the image, feels the dedication
- Declaration 3 shifts from passive recall ("memory") to involuntary certainty ("instinct") --- eliminating the fear that cues could be missed
- Only 2 words change across the entire section, preserving the integrity of Pass 1
- The three declarations now form a complete arc: presence (I stay), precision (every note tested), and preparation (instinct-level rehearsal)

