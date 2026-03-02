

# Apply Brand Identity North Star to /weddings Page

## Scope

The /weddings page is rendered by `Index.tsx` and composes these sections: MinimalHeader, Hero (VigilReveal + HeroTagline), TheExhale, ProcessSection, VowMoment, TheInvitation, TheSound, TheTransformation, TheWitness, ThreePaths, TheWitnesses, CrossOver, Footer, and MobileStickyBar.

This plan covers every file rendered on that page (plus shared components like Footer and FullScreenMenu) that contains brand-violating copy. Changes fall into three categories:

1. **Remove all Banff Mode references** (the user does not do Banff)
2. **Update name from "Parker Allard" to "Parker Gawryletz"**
3. **Update credentials from "ceremonies" to "events" and align copy with the North Star document**

---

## Files to Change and What Changes

### Category A: Banff Mode Removal

**1. `src/components/HeroTrustBadges.tsx`**
- Remove the "Banff Mode compliant" badge entirely (line with `Mountain` icon)
- Remove `Mountain` from the lucide import
- Grid adjusts from 5 to 4 columns on lg

**2. `src/components/PricingAddOns.tsx`**
- Remove the entire "Banff Mode Upgrade" add-on entry (icon Mountain, $0)
- Remove `Mountain` from import

**3. `src/components/ComparisonTable.tsx`**
- Remove the "Banff Mode compatibility" row from the comparison data

**4. `src/components/SoundSystemDiagram.tsx`**
- Change the "See Banff Mode FAQ" DirectionalLink to "See full FAQ" pointing to `/faq`

**5. `src/components/FAQTopTen.tsx`**
- Rewrite Q2 answer: remove "Banff-legal when amplification is prohibited" --- replace with "My rig is silent battery --- no generators, no permits, no hum."
- Change Q2 link label from "FAQ --- Banff Mode Explained" to "FAQ" or similar

**6. `src/components/FAQChips.tsx`**
- Rewrite Q1 answer: remove "unless guest count is under ~10 and you're in Banff Mode" --- replace with "Yes. I include lapel + handheld, both live-mixed for clarity."

**7. `src/components/DownloadablePlans.tsx`**
- Change venue from "Cascade Gardens (Banff Mode)" to "Cascade Gardens"

**8. `src/components/AboutCredentials.tsx`**
- Remove the "Parks Canada" / "Banff Mode" credential entry entirely
- Remove `Mountain` from import

**9. `src/components/AboutEvolutionTimeline.tsx`**
- Remove or rewrite the 2022 milestone ("Create Banff Mode for no-PA bylaws") --- replace with something like "Standardize run-of-show documentation and SPL logging."

**10. `src/components/ContactSLATimeline.tsx`**
- Remove "(or Banff Mode)" from the 0-24 hours description

**11. `src/components/SPLTriptych.tsx`**
- Remove "These logs are especially valuable for Parks Canada and other strict-sound venues" from the description

**12. `src/components/TestimonialsWithMetrics.tsx`**
- Rewrite testimonial #2: change "We were Banff-legal with zero stress" to something like "Every guest heard our vows --- even the back row." Remove "Unamplified; proximity arc applied" metric.

**13. `src/components/ContactTestimonials.tsx`**
- Change venue from "Banff" to "Cochrane" or another Southern Alberta venue (not Banff)

**14. `src/components/SetupPhotoGallery.tsx`**
- Change alt text: remove "Banff" from "outdoor wedding Banff"
- Change testimonial venue from "Banff Centre" to "Deane House" or another non-Banff venue

**15. `src/components/Footer.tsx`**
- Change location line from "Calgary, Cochrane, Canmore and Banff" to "Calgary, Cochrane, Canmore and Okotoks"

**16. `src/components/FullScreenMenu.tsx`**
- Same location change: "Calgary, Cochrane, Canmore & Banff" to "Calgary, Cochrane, Canmore & Okotoks"

**17. `src/pages/Terms.tsx`**
- Remove Banff Mode references from Services Overview and venue responsibility sections
- Change service area from "Calgary, Cochrane, Canmore, Banff" to "Calgary, Cochrane, Canmore, Okotoks"

**18. `src/pages/PrivacyPolicy.tsx`**
- Remove "Banff" from service area list
- Remove "Banff Mode guidance" from data usage description

---

### Category B: Name Correction

**19. `src/components/TheSound.tsx`**
- Line 498: Change `cite="Parker Allard"` to `cite="Parker Gawryletz"`
- Line 504: Change `--- Parker Allard` to `--- Parker Gawryletz`

**20. `src/components/ThemeProvider.tsx`**
- Line 15: Change `storageKey="parker-allard-theme"` to `storageKey="parker-gawryletz-theme"` (cosmetic but consistent)

---

### Category C: Credential and Copy Alignment

**21. `src/components/TheInvitation.tsx`**
- Change credential from `{ value: '500+', label: 'Ceremonies' }` to `{ value: '500+', label: 'Events' }`

**22. `src/components/witness/WitnessPresence.tsx`**
- Change comment from "200+ Ceremonies Witnessed" to "500+ Events"
- Change the displayed number from "200" to "500"
- Change subtitle text from "ceremonies witnessed" to "events performed"

**23. `src/components/MobileStickyBar.tsx`**
- Change `/gallery` text from "200+ ceremonies witnessed" to "500+ events performed"

**24. `src/pages/About.tsx`**
- Update comment referencing "200+ ceremonies witnessed" to "500+ events"

**25. `src/components/SetupPhotoGallery.tsx`**
- Change testimonial copy: "most prepared vendor" --- the word "vendor" violates the brand. Change to "most prepared musician" or "most prepared person"

---

## Summary

- **25 files** modified total
- **18 files** for Banff Mode removal
- **2 files** for name correction (Allard to Gawryletz)
- **5 files** for credential/copy alignment (ceremonies to events, vendor to musician, 200+ to 500+)
- No new files created, no dependencies added
- All changes are copy/data-level --- no structural or layout changes except removing one badge from HeroTrustBadges and one add-on from PricingAddOns

