

# Luxury Polish — Round 5: Remaining Icon Purge and Craft Consistency

## Audit Findings

After the Proof page icon purge in Round 4, several other components across Pricing, FAQ support, Legal, and utility components still use generic Lucide icons as decorative section iconography — the same "SaaS trust badge" pattern already eliminated elsewhere.

Additionally, the `ComparisonTable` and `EventsPricing` comparison sections use raw Lucide `Check`, `X`, and `AlertTriangle` icons — functional but visually cheap compared to the gold diamond system established elsewhere.

---

## Priority 1: ComparisonTable — Replace Check/X/AlertTriangle with Brand Marks

**File:** `src/components/ComparisonTable.tsx`

The DJ/Band columns use generic red `X` and yellow `AlertTriangle` icons. Parker's column already uses a `GoldenCheck` diamond. Extend the system:
- Replace `X` (false) with an en-dash `—` in `text-muted-foreground/40` (typographic, editorial)
- Replace `AlertTriangle` (warning) with a small `·` dot in `text-primary/50` (minimal, not alarming)
- Remove lucide-react import entirely

## Priority 2: EventsPricing ComparisonTable — Same Treatment

**File:** `src/pages/EventsPricing.tsx` (lines 19, and the comparison table section ~line 160+)

Same pattern — uses `Check`, `X`, `AlertTriangle` inline. Apply identical editorial replacements.

## Priority 3: Legal Page — Replace Shield/FileText/Cookie/Eye Icons

**File:** `src/pages/Legal.tsx`

Four policy cards use `Shield`, `FileText`, `Cookie`, `Eye` as `w-8 h-8` decorative icons. Replace with gold gradient numerals (01–04) consistent with the FAQ trust stack and Proof page treatments.

## Priority 4: SoundSystemDiagram — Replace Mic/Battery/Activity Icons

**File:** `src/components/SoundSystemDiagram.tsx`

Three system cards use `Mic`, `Battery`, `Activity` as `size={32}` decorative icons. Replace with gold gradient numerals (01–03).

## Priority 5: HeroTrustBadges — Replace Check Icons + Unused Icon Imports

**File:** `src/components/HeroTrustBadges.tsx`

Uses `Check` icon but also imports `Mic, Battery, Activity, ShieldCheck` that are never rendered. Replace `Check` with the gold diamond marker (already used in InclusionBlock). Clean up dead imports.

## Priority 6: TrustStrip — Replace Shield/Music/Zap Icons

**File:** `src/components/TrustStrip.tsx`

Three trust items use `Shield`, `Music`, `Zap` as decorative icons. Replace with gold diamond markers for consistency.

## Priority 7: MobileTrustBar — Replace Shield/Activity/Layers Icons

**File:** `src/components/MobileTrustBar.tsx`

Mobile bottom bar uses `Shield`, `Activity`, `Layers`. Replace with gold diamond markers.

## Priority 8: PricingSampleDownload — Replace Download Icon in Button

**File:** `src/components/PricingSampleDownload.tsx`

The download button has a `Download` icon. This is functional (action button), but per the pattern established in InsuranceDocuments, the button text is clear enough. Remove the icon for cleaner typography.

## Priority 9: MostSelectedPill — Remove Unused Star Import

**File:** `src/components/MostSelectedPill.tsx`

Imports `Star` from lucide-react but never uses it. Clean up the dead import.

## Priority 10: PainOutcomeFlip — Replace X/Check with Editorial Marks

**File:** `src/components/PainOutcomeFlip.tsx`

Uses `X` (red) and `Check` (green) as list markers. Replace with:
- Pain column: en-dash `—` in destructive color
- Outcome column: gold diamond marker

---

## Summary

- **10 files modified**
- Eliminates ~20 remaining decorative Lucide icon instances
- Replaces all with the gold diamond / editorial numeral / typographic mark system validated in Rounds 3–4
- No new dependencies
- Functional icons (Play/Pause in audio, ChevronRight in navigation, social icons in footer) are preserved — those serve interaction purposes

