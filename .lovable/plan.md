

# Homepage Copy Audit -- Narrative Coherence Report

## Audit Summary

Every homepage section has been read line-by-line against the approved copy elevation plan and the brand's North Star document. The result: **all approved changes are live and correctly applied.** One housekeeping item and one minor copy inconsistency surfaced.

---

## Section-by-Section Verdict

### 1. Hero Tagline (HeroTagline.tsx)
- **Status:** Sacred. Untouched. Correct.

### 2. The Exhale (TheExhale.tsx)
- **Status:** Sacred. All four lines match. Correct.

### 3. The Process (ProcessSection.tsx)
- **Bridge:** Updated to "This is how I prepare for the moment that matters most." -- Correct.
- **Movement I:** "What does your heart sound like..." and "It begins with a conversation." -- Correct.
- **Movement II:** "Your love story, translated into sound." -- Correct.
- **Movement III:** "Does this sound like you?" and en-dash formatting -- Correct.
- **Movement IV:** "what you need" and "I guide, and I ask." -- Correct.
- **Closing:** Unchanged as planned. Correct.

### 4. Vow Moment (VowMoment.tsx)
- **Status:** Sacred. Untouched. Correct.

### 5. The Invitation (TheInvitation.tsx)
- **Headline:** "I have been at 200 ceremonies. I know what can go wrong." -- Correct.
- **Body 1:** Vivid scenes (wind, generator, back row) -- Correct.
- **Body 2:** "I designed every part of my process..." -- Correct.
- **Caption:** "60 seconds on what I do--and why." -- Correct.

### 6. The Sound (TheSound.tsx)
- **Subhead:** "The prelude. The procession. The vows. The walk into forever." -- Correct.
- **Closing:** "Every arrangement begins with a conversation--and ends with a sound that belongs only to you." -- Correct.

### 7. The Transformation (TheTransformation.tsx)
- **Fear 3:** "No proof the sound reached every seat" -- Correct.
- **Fear 4:** "The musician arrives with no plan for your ceremony" -- Correct.
- **Resolution 1-4:** All updated per plan. Correct.

### 8. The Witness (TheWitness.tsx)
- **Declarations:** "I arrive before anyone else." / "I test every microphone myself." / "I walk your cue sheet until it is second nature." -- All correct.
- **Kit label:** "What I bring" -- Correct.

### 9. Three Paths (ThreePaths.tsx)
- **Subhead:** "Three ways I can be present on your day." -- Correct.
- **Reassurance:** "You can move between these at any time--no penalty until two weeks before your day." -- Correct.

### 10. The Record (TheRecord.tsx)
- **Status:** Unchanged as planned. Correct.

### 11. The Witnesses (TheWitnesses.tsx)
- **Label:** "THE COVENANT KEPT" -- Correct.

### 12. CrossOver (CrossOver.tsx)
- **Trust line:** "Includes sound documentation, microphone setup, and your ceremony run-of-show." -- Correct.

---

## Issues Found

### Issue 1: Dead Component -- TheFourMovements.tsx
`TheFourMovements.tsx` is a duplicate of `ProcessSection.tsx` that is **not imported or used anywhere** in the application. It contains the OLD copy (e.g., "This is my process for ensuring it happens every time" and "Am I heading the right direction?"). This dead code should be deleted to prevent confusion if anyone references it in the future.

**Action:** Delete `src/components/TheFourMovements.tsx`.

---

## Narrative Flow Assessment

The homepage story arc flows correctly through all ten phases:

1. **Mystery** (Hero) -- Void, flame, "'Til Death; Unto Life."
2. **Recognition** (Exhale) -- "You're about to make a promise..." / "I understand the weight..."
3. **Understanding** (Process) -- Four movements showing how preparation happens now
4. **Altar** (Vow Moment) -- "Every vow spoken becomes sacred the moment it's heard."
5. **Authority** (Invitation) -- "I have been at 200 ceremonies. I know what can go wrong."
6. **Immersion** (Sound) -- "Music that holds the room still."
7. **Tension/Resolution** (Transformation) -- Fears answered by documented proof
8. **Identity** (Witness) -- "Not a musician--your ceremony witness."
9. **Decision** (Three Paths) -- "How deeply do you want me there?"
10. **Commitment** (CrossOver) -- "Your vows deserve to be heard." / "Hold my date"

No narrative gaps. No redundant echoes between sections (the previous "Before I play a single note" duplication between Process and Invitation has been resolved). The story builds correctly from feeling to understanding to trust to action.

---

## Implementation

| File | Action |
|------|--------|
| `src/components/TheFourMovements.tsx` | Delete (dead component with stale copy) |

No other changes needed. The homepage copy is complete and narratively coherent.

