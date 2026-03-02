

# Round 61.0 — "The Witness": Copy Elevation Pass 3

## Assessment

After two passes, the declarations form a clean arc: presence ("I stay until the room is empty"), precision ("every note is tested"), and preparation ("instinct"). The headline is the strongest line in the section. The kit label and items are professional. The closing bridges cleanly to Three Paths.

The remaining opportunity is subtle but significant. The section currently reads as three parallel reassurances. Each is strong individually. But they lack a *cumulative* effect --- the feeling that each line builds on the last, creating momentum toward the closing line. The visitor should feel increasing certainty with each declaration, so that by the closing line, the decision feels inevitable rather than optional.

There are two micro-opportunities:

### 1. Declaration 2 can be more vivid

**Current**: "Every note is tested before your first guest walks in."

"Every note is tested" is outcome-focused but still abstract --- the couple cannot *see* it happening. The fear this answers ("What if something sounds wrong?") is best addressed with an image of the pianist alone in the room, already playing, already certain. The word "tested" is clinical. The word "heard" is experiential.

**Proposed**: "Every note is heard in the room before your first guest walks in."

**Why**: "Heard in the room" does two things: (1) it implies the pianist is physically present, playing, listening to the acoustics --- not just running a technical check; (2) "heard" connects to the brand's core promise ("every vow spoken becomes sacred the moment it's heard"). The couple unconsciously recognises the echo. The fear of technical failure is answered not with process language but with the image of someone who has already *listened* to the space.

### 2. The closing line can carry more emotional weight

**Current**: "Now --- choose how long you want me there."

This is clean but purely functional. It bridges to Three Paths but does not leave an emotional residue. The visitor moves on without feeling anything. A slight reframe can make the transition feel like a natural continuation of the declarations' emotional arc rather than a navigation prompt.

**Proposed**: "Now --- choose how long you want me there."

**No change.** On reflection, the functional clarity is more valuable than emotional flourish at this transition point. The declarations carry the emotion; the closing line carries the visitor forward. Adding weight here would slow the momentum into Three Paths.

## Final Proposed Change

### File: `src/components/TheWitness.tsx`

- **Line 8**: Replace `"Every note is tested before your first guest walks in."` with `"Every note is heard in the room before your first guest walks in."`

### No other changes. One word swap: "tested" becomes "heard in the room." No design, layout, animation, or styling modifications.

## What This Achieves

- Shifts Declaration 2 from clinical process ("tested") to experiential image ("heard in the room")
- Creates an unconscious echo of the brand's core promise about hearing vows
- The three declarations now progress: physical presence ("I stay") → sensory presence ("heard in the room") → cognitive presence ("instinct") --- a complete arc from body to ear to mind
- The visitor feels increasing intimacy across the three lines, building certainty that this pianist *inhabits* the ceremony rather than merely attending it

