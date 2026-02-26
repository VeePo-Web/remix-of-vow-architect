

# Homepage Round 14 — Section Fade Color Mismatch Fix and Final Typography Pass

## Critical Bug Found

Round 12 introduced a bottom fade to TheInvitation (`hsl(220 15% 8%)` — dark), but TheSound's top fade still references `hsl(45 25% 96%)` (warm). This creates a visible warm-dark-warm seam at the junction between sections. The same class of issue may exist at other junctions where fades were added in later rounds without updating adjacent sections.

---

## Audit — Section Junction Color Map

Tracing the exit/entry color at every junction across the 7 sections:

| From Section | Exit Fade Color | To Section | Entry Fade Color | Match? |
|---|---|---|---|---|
| VowMoment | `hsl(45 25% 96%)` (warm) | TheInvitation | `hsl(240 9% 4%)` (dark) | YES — VowMoment exits warm, Invitation enters from dark (VowMoment side). Correct. |
| TheInvitation | `hsl(220 15% 8%)` (dark) | TheSound | `hsl(45 25% 96%)` (warm) | **BUG** — Invitation exits dark but Sound expects warm at top. |
| TheSound | `hsl(220 15% 8%)` (dark) | TheTransformation | `hsl(220 15% 8%)` (dark) | YES |
| TheTransformation | `hsl(45 25% 96%)` (warm) | TheWitness | `hsl(42 28% 91%)` (warm) | Close enough — both warm tones |
| TheWitness | `hsl(240 9% 4%)` (dark) | ThreePaths | `hsl(45 20% 93%)` (warm) | **BUG** — Witness exits dark but ThreePaths expects warm at top. |
| ThreePaths | `hsl(45 20% 93%)` (warm) | TheWitnesses | `hsl(240 9% 4%)` (dark) | **MISMATCH** — ThreePaths exits warm but Witnesses expects dark at top. Wait — ThreePaths is dark, so its bottom fade goes TO warm (for Witnesses). Witnesses top fade goes FROM dark (ThreePaths dark). Actually ThreePaths bottom = `hsl(45 20% 93%)` and TheWitnesses top = `hsl(240 9% 4%)`. One says warm, other says dark. **BUG.** |
| TheWitnesses | `hsl(240 9% 2%)` (dark) | CrossOver | `hsl(45 20% 93%)` (warm) | **BUG** — Witnesses exits dark, CrossOver expects warm at top. |

Four mismatches total. These create thin visible color seams between sections.

---

## Additional Finding — Typography Consistency

TheInvitation caption line 104 uses `—` (keyboard dash surrounded by spaces) instead of proper em-dash `\u2014`, inconsistent with the fix applied to TheWitness in Round 12.

---

## The 7-Step Plan

### Step 1: Fix TheSound Top Fade
Change TheSound's top fade from `hsl(45 25% 96%)` to `hsl(220 15% 8%)` to match TheInvitation's dark exit.

**File:** `src/components/TheSound.tsx` (line 274)

### Step 2: Fix ThreePaths Top Fade
Change ThreePaths' top fade from `hsl(45 20% 93%)` to match TheWitness's dark exit color `hsl(240 9% 4%)`.

**File:** `src/components/ThreePaths.tsx` (line 65)

### Step 3: Fix ThreePaths Bottom Fade Direction
ThreePaths is a dark section exiting to TheWitnesses (warm). Its bottom fade `hsl(45 20% 93%)` is warm — correct direction. But TheWitnesses' top fade is `hsl(240 9% 4%)` (dark) which assumes dark above. These two overlap correctly: ThreePaths blends dark-to-warm at bottom, Witnesses blends dark-to-transparent at top. The dark color in Witnesses' top fade should match ThreePaths' dark body, not conflict. This is actually correct — no change needed.

Revised: Only fix ThreePaths' TOP fade (Step 2).

### Step 4: Fix CrossOver Top Fade
CrossOver's top fade uses `hsl(45 20% 93%)` (warm) but TheWitnesses exits to `hsl(240 9% 2%)` (dark). Change CrossOver's top fade to match TheWitnesses' dark exit.

**File:** `src/components/CrossOver.tsx` (line 64)

### Step 5: TheInvitation Caption Em-Dash
Replace the plain dashes in "A moment with me — before the moment with you" with proper em-dashes for typographic consistency.

**File:** `src/components/TheInvitation.tsx` (line 104)

### Step 6: Verify TheWitness Bottom Fade to ThreePaths
TheWitness exits to `hsl(240 9% 4%)` and ThreePaths is dark (`section--dark`). After Step 2 fix, ThreePaths' top fade will come FROM this same dark color. Verify alignment — should be seamless now.

**File:** Verification only, no change expected.

### Step 7: Visual Smoke Test
After applying the four color fixes, scroll through all seven sections to confirm no visible seams remain at any junction.

---

## Files Modified Summary

| Step | File | Change |
|---|---|---|
| 1 | `TheSound.tsx` | Top fade color: warm to dark |
| 2 | `ThreePaths.tsx` | Top fade color: warm to dark |
| 3 | Removed (was redundant) | |
| 4 | `CrossOver.tsx` | Top fade color: warm to dark |
| 5 | `TheInvitation.tsx` | Caption em-dash fix |

Four files, four color fixes, one typography fix. No copy changes. No pricing changes. No new dependencies.

