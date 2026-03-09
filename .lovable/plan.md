

# Luxury Polish — Round 4: Proof Page Icon Purge and Remaining Craft Issues

## Audit Summary

Five Proof page subcomponents still use generic Lucide icons (`Activity`, `Mic`, `Zap`, `Users`, `Shield`, `Package`, `FileText`, `Download`, `FileCheck`, `Piano`, `Speaker`) inside bordered circles — the exact "SaaS trust badge" pattern already removed from FAQTrustStack and the Proof hero. These are the last remaining cheap-feeling icon treatments across the site.

Additionally, the Proof page's "Setup Gallery" section lacks actual photography — it shows icon placeholders where setup photos should be. This is the most conspicuously "template" section on the entire site.

---

## Priority 1: SPLTriptych — Replace Activity Icons with Gold Numerals

**File:** `src/components/SPLTriptych.tsx`

- Remove `Activity` import from lucide-react
- Replace the icon-in-circle block (lines 44-47) with gold gradient numerals (`01`, `02`, `03`) using the same `linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))` pattern established on the Proof hero
- Remove the `w-10 h-10 rounded-lg bg-primary/[0.06]` wrapper — let the numeral stand alone next to the phase title

## Priority 2: InsuranceDocuments — Replace Shield/Package Icons

**File:** `src/components/InsuranceDocuments.tsx`

- Remove `Shield, FileCheck, Package` from lucide-react
- Replace icon circles (line 42-44) with gold gradient numerals (`01`, `02`, `03`)
- Keep `FileCheck` only for the download button (line 52) — this is functional, not decorative
- Actually remove `FileCheck` from the button too — the button text "Download sample certificate of insurance" is clear enough without a leading icon

## Priority 3: RedundancyStack — Replace Mic/Zap/Piano/Speaker Icons

**File:** `src/components/RedundancyStack.tsx`

- Remove all four Lucide icon imports
- Replace the icon circle (lines 50-53) with a gold gradient numeral (`01`–`04`)
- Keep the "highlight" treatment on the primary system: make its numeral use full `vow-yellow` color with a subtle text-shadow glow, while others use `muted-foreground`

## Priority 4: SetupPhotoGallery — Replace Icon Placeholders

**File:** `src/components/SetupPhotoGallery.tsx`

- Remove `Mic, Zap, Users` Lucide imports
- Replace the large icon circles (`w-20 h-20`) with a gold gradient numeral above the title
- This section was originally meant for photos — since no setup photos exist yet, convert it from a photo gallery into an editorial list (like the hickoryandrose "What to Expect" pattern): numeral + title + description in a clean single-column stack

## Priority 5: DownloadablePlans — Replace FileText/Download Icons

**File:** `src/components/DownloadablePlans.tsx`

- Remove `FileText, Download` from lucide-react
- Replace the tall icon placeholder block (`aspect-[3/4] bg-muted/40`, lines 37-39) with a minimal document representation: a simple bordered rectangle with the plan title inside, styled like a letterpress insert (cream background, single gold rule border-left). This removes the empty "placeholder card" appearance
- Keep the gold numeral above each card for hierarchy

---

## Summary

- **5 files modified**
- Removes the last 12 Lucide icon instances used as decorative section iconography
- Replaces all with the gold gradient numeral pattern already validated on the Proof hero and FAQ trust stack
- No new dependencies

