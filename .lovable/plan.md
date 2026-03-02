

# Round 60.0 — "The Witness": Copy Elevation Pass 1

## Section Context

The Witness sits between The Transformation (which addresses emotional fears about the music itself) and Three Paths (which presents the three offering tiers). Its role in the narrative funnel is transitional: it answers the unspoken question "But what about the logistics?" --- the practical anxieties that surface after the emotional ones have been resolved.

The couple has just read The Transformation and thought "This person understands what I want." Now the quiet follow-up fear arrives: "But will they actually be prepared? What if something goes wrong on the day?"

## Current Copy Assessment

**Headline**: "Not a performer --- your ceremony pianist." --- Strong. Clear differentiation. No change needed.

**Declarations** (the three lines):
- "I arrive before anyone else." --- Good intent but reads as a scheduling detail.
- "I sound-check every note before your guests arrive." --- Technical and process-focused. The couple does not care about sound-checks; they care about certainty.
- "I walk your cue sheet until it is second nature." --- Better, but "walk your cue sheet" is jargon-adjacent.

**Kit label**: "What I bring" --- Functional. Could carry more weight.

**Kit items**: Piano, Backup Piano, Speakers, Cue Sheet, Insurance, Rain Cover --- These are the right items but they are presented as a list. The mind-reading approach would reframe them as quiet answers to unspoken fears: "What if the piano fails?" (Backup Piano), "What if it rains?" (Rain Cover), "What if something gets damaged?" (Insurance).

**Closing**: "Now --- choose how deeply you want me there." --- Good bridge to Three Paths. Can be slightly elevated.

## Proposed Changes

### Declarations (Lines 7-9)

**Current**:
1. "I arrive before anyone else."
2. "I sound-check every note before your guests arrive."
3. "I walk your cue sheet until it is second nature."

**Proposed**:
1. "I arrive before anyone else --- and I leave after everyone."
2. "Every note is tested before your first guest walks in."
3. "Your cue sheet is rehearsed until it feels like memory."

**Rationale**:
- Declaration 1 now bookends the entire day. The unspoken fear: "Will the musician disappear after the ceremony?" This mirrors Resolution 4 from The Transformation ("I stay until the last guest has gone") and reinforces it as a pattern, not a one-off promise.
- Declaration 2 removes first-person "I sound-check" (technical/process language) and replaces with outcome-focused "Every note is tested." The couple does not need to know *how* --- they need to know *it is done*. "Before your first guest walks in" is more vivid than "before your guests arrive."
- Declaration 3 replaces "walk your cue sheet" (insider jargon) with "rehearsed until it feels like memory." "Memory" is emotionally loaded in the context of a wedding --- it suggests the pianist will treat the cue sheet with the same reverence as the couple treats their ceremony. The fear answered: "What if they miss a cue or get the timing wrong?"

### Kit Label (Line 170)

**Current**: "What I bring"

**Proposed**: "What arrives with me"

**Rationale**: "What I bring" is transactional --- it sounds like a packing list. "What arrives with me" is subtly different: it implies that these items are part of the pianist's presence, not separate deliverables. It also echoes the arrival language from Declaration 1.

### Kit Items (Lines 13-18)

**Current**: Piano, Backup Piano, Speakers, Cue Sheet, Insurance, Rain Cover

**Proposed**: Piano, Backup Piano, Sound System, Printed Cue Sheet, Liability Insurance, Rain Cover

**Rationale**: Surgical upgrades only:
- "Speakers" becomes "Sound System" --- more professional, implies completeness rather than individual components.
- "Cue Sheet" becomes "Printed Cue Sheet" --- the word "Printed" signals preparation and tangibility. It answers the fear "Will there actually be a plan?" by implying a physical document, not a phone note.
- "Insurance" becomes "Liability Insurance" --- specificity builds trust. "Insurance" is vague; "Liability Insurance" tells the couple (and their venue coordinator) exactly what kind.

### Closing Line (Line 210)

**Current**: "Now --- choose how deeply you want me there."

**Proposed**: "Now --- choose how long you want me there."

**Rationale**: "How deeply" is abstract and slightly philosophical. At this point in the funnel, the visitor is transitioning from emotional connection to practical decision-making. "How long" directly maps to the Three Paths tiers (Ceremony only / Extended / Full day) and makes the next section's structure immediately intuitive. It also subtly reframes the pricing decision as a question of duration, not cost --- reducing price anxiety.

## Implementation

### File: `src/components/TheWitness.tsx`

- **Lines 7-9**: Replace declarations array with three new lines.
- **Lines 13-18**: Replace standardKit array with updated item names.
- **Line 170**: Replace "What I bring" with "What arrives with me".
- **Line 210**: Replace closing line text.

### No other files modified. No design, layout, animation, or styling changes.

