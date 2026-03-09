
# Comprehensive Site-Wide Luxury Polish — Round 3

## Audit Findings

After reviewing the Weddings About sections, FAQ, Pricing, Gateway, and supporting components, the following "template" repetition and cheap-feeling elements remain:

---

## Priority 1: FAQTrustStack — Remove Lucide Icons

`src/components/FAQTrustStack.tsx` (lines 2, 26-29) uses `AlertTriangle, HelpCircle, FileText, Heart` from lucide-react inside a "psychological journey" row. These generic icons break brand guidelines.

**Fix:** Replace the icon-based journey row with gold gradient editorial numerals (01–04) or abstract golden dots connected by a gradient thread — matching the Proof page treatment.

---

## Priority 2: WitnessHero — Increase Height to Match Events/Teaching

`WitnessHero.tsx` line 23 uses `min-h-[85vh]`. Events and Teaching heroes were upgraded to `90vh` for more breathing room. Weddings About should match.

**Fix:** Change `min-h-[85vh]` → `min-h-[90vh]`.

---

## Priority 3: WitnessPresence — Reduce Card Count + Remove Quotes

`WitnessPresence.tsx` shows 6 witness moment cards (lines 12-19). Events/Teaching were reduced to 3-4 for tighter editorial impact. The Weddings About should follow the same pattern for consistency.

**Fix:** 
- Reduce `witnessedMoments` array from 6 to 4 items (keep the most emotionally resonant).
- The text is already clean (no quotes) — no copy change needed.

---

## Priority 4: WitnessCovenant — Reduce Corner Ornament Size

`WitnessCovenant.tsx` lines 77-80 use `w-16 h-16` for corner ornaments. Events/Teaching were reduced to `w-12 h-12` for better mobile proportions.

**Fix:** Change all four corner ornament divs from `w-16 h-16` to `w-12 h-12`.

---

## Priority 5: Gateway — Add Breathing Halo Behind Semicolon

The Gateway tagline has a breathing semicolon (lines 216-218) but lacks the warm halo/glow found on the Weddings homepage. This creates an inconsistent sacred object treatment.

**Fix:** Add a radial gradient glow behind the semicolon, similar to the vigil flame on the homepage.

---

## Priority 6: Pricing Page — Verify All CTAs Route to `/contact`

`src/pages/Pricing.tsx` has 4 "Hold my date" buttons (lines 159, 196, 228, 317-319) all linking to `/contact`. This is correct for the Weddings vertical. No change needed, but EventsPricing and TeachingPricing CTAs were fixed in the previous round to route to their respective contact pages.

**Verification only** — no code change.

---

## Summary

- **5 files modified**
- FAQTrustStack: Remove Lucide icons, replace with gold dots/numerals
- WitnessHero: Increase height to 90vh
- WitnessPresence: Reduce cards from 6 to 4
- WitnessCovenant: Reduce corner ornaments to w-12
- Gateway: Add breathing halo behind semicolon
