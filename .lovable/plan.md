

# TheWitness Section — Copy Rewrite

## Current Problems

The copy positions Parker as a sound engineer: "I test every microphone myself," "2 mics," "Battery," "SPL meter." This misrepresents the service. Parker is a pianist who brings a keyboard, backup keyboard, speakers, a cue sheet, insurance, and a piano cover for weather protection.

## Copy Changes (No Design Changes)

### File: `src/components/TheWitness.tsx`

**Headline (lines 69-81):** Change from sound-tech framing to pianist identity.

| Element | Current | Proposed |
|---------|---------|----------|
| Headline | "Not a musician — your ceremony **witness**." | "Not a performer — your ceremony **pianist**." |

**Declarations array (lines 6-10):** Replace microphone/sound references with what Parker actually does.

| Current | Proposed |
|---------|----------|
| "I arrive before anyone else." | "I arrive before anyone else." (keep — it's true and strong) |
| "I test every microphone myself." | "I sound-check every note before your guests arrive." |
| "I walk your cue sheet until it is second nature." | "I walk your cue sheet until it is second nature." (keep — accurate) |

**Standard Kit array (lines 12-19):** Replace with actual equipment.

| Current | Proposed |
|---------|----------|
| 2 mics | Piano |
| Battery | Backup piano |
| SPL meter | Speakers |
| Cue sheet | Cue sheet |
| $4M ins. | Insurance |
| 24h plan | Rain cover |

**Icon updates:** Swap icons to match new items. Use `Piano` (from lucide — or `Music`), `Copy` (backup), `Volume2` (speakers), `FileText` (cue sheet), `Shield` (insurance), `Umbrella` (rain cover).

## What Stays Unchanged

- All design: layout, background image, gradients, golden thread separator, scroll reveal animations
- Section label "THE WITNESS"
- "What I bring" sub-label
- Grid layout (3x2 on mobile, 6 across on desktop)
- All CSS classes, transitions, hover states, and timing

