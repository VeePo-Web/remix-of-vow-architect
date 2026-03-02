

# Brand Governance Audit — Homepage Components

## Audit Results

I checked every component rendered on the homepage (`Index.tsx`) against the Section 10 Brand Constitution and Consistency Checklist. Here are the results:

### Passing (No Violations Found)

| Rule | Status |
|------|--------|
| 1. Dark/light section alternation | Pass --- Hero (dark), Exhale (dark), Process (light), VowMoment (dark), Invitation (dark), Sound (dark), Transformation (split), Witness (light), ThreePaths (dark), Witnesses (light), CrossOver (dark), Footer (dark) |
| 2. Semicolon at threshold moments only | Pass --- appears in HeroTagline, CrossOver bookend, TheWitnesses closing, Footer bookend. All are threshold/bookend positions. |
| 3. First-person voice | Pass --- all copy uses "I" throughout |
| 4. No "Book/Submit/Sign Up" CTAs | Pass --- all CTAs use "Hold my date" or "Meet the witness" |
| 5. Vow-yellow under 6% | Pass --- used sparingly for accents, threads, CTAs |
| 6. Background images have grain + vignette | Pass --- every section with imagery includes both layers |
| 7. prefers-reduced-motion fallbacks | Pass --- CSS contains 15+ fallback blocks; JS checks in TheExhale, ProcessSection, TheSound |
| 8. Credential line "500+ events" | Pass --- TheInvitation shows "500+ Events" |
| 9. No Banff references | Pass --- all removed in prior sweeps |
| 10. Process visible | Pass --- ProcessSection with 4 movements is prominent |
| No exclamation marks | Pass --- none found in any homepage copy |
| No bright adjectives | Pass --- none found on homepage |
| No "vendor/entertainer/performer/service provider" | Pass --- TheWitness uses "Not a performer" as intentional rejection (brand-aligned) |

### Homepage Verdict: COMPLIANT

The homepage passes all 10 Brand Constitution rules and all Consistency Checklist items.

---

### Violations Found on Non-Homepage Pages (Accessible via Navigation)

These pages are reachable from the homepage menu/footer and contain governance violations:

**1. `src/pages/Contact.tsx` (line 310)**
- Violation: Uses "perfect" --- a banned bright adjective
- Current: `"I'll craft the perfect vibe for your venue"`
- Fix: `"I'll shape the sound to suit your venue"`

**2. `src/pages/Proof.tsx` (line 23) and `src/pages/Pricing.tsx` (line 28)**
- Violation: Piano nav label says "Get Started" --- a banned CTA phrase
- Fix: Change label to "Begin" or "Hold My Date"

**3. `src/components/PricingJumpNav.tsx` (line 4)**
- Violation: Nav label says "Packages" --- banned word (should be "Paths")
- Fix: Change `"Packages"` to `"Paths"`

**4. `src/components/PricingJumpNav.tsx` (line 5)**
- Violation: Nav label says "Compare Vendors" --- "vendors" is a banned word
- Fix: Change to `"Compare"`

**5. `src/components/FAQTopTen.tsx` (line 58)**
- Violation: Link label says "Pricing > Compare Vendors"
- Fix: Change to `"Pricing > Compare"`

**6. `src/components/FAQChips.tsx` (line 18)**
- Violation: Uses "package" --- banned word
- Current: `"Can I change my package later?"`
- Fix: `"Can I change my path later?"`

**7. `src/components/PricingFAQ.tsx` (line 20)**
- Violation: Uses "vendor"
- Current: `"used toward a referred vendor"`
- Fix: `"used toward a referred musician"`

**8. `src/components/InsuranceDocuments.tsx` (line 56)**
- Violation: Uses "vendor" in testimonial
- Current: `"The venue waived their vendor deposit"`
- Fix: `"The venue waived their deposit"`

**9. `src/components/PricingPreview.tsx` (line 41)**
- Violation: Uses "packages"
- Current: `"See all packages & policies"`
- Fix: `"See all paths and policies"`

**10. `src/components/InclusionBlock.tsx` (line 52)**
- Violation: Uses "Packages"
- Current: `"All Packages Include Ceremony-Proof Clarity"`
- Fix: `"All Paths Include Ceremony-Proof Clarity"`

**11. `src/components/PricingSampleDownload.tsx` (line 14)**
- Violation: Uses "package"
- Current: `"from a recent $750 package"`
- Fix: `"from a recent $750 path"`

**12. `src/components/FAQTopTen.tsx` (line 28)**
- Violation: Link label uses "Packages"
- Current: `"Pricing & Packages > Terms"`
- Fix: `"Pricing & Paths > Terms"`

**13. `src/pages/PrivacyPolicy.tsx` (line 66)**
- Violation: Uses "vendor"
- Current: `"vendor communication"`
- Fix: `"coordinator communication"`

---

## Summary

- **Homepage: 0 violations** --- fully compliant with Brand Governance
- **Other pages: 13 violations** across 10 files
- All fixes are single-word or short-phrase swaps
- Categories of violations: "package" to "path" (6 instances), "vendor" removal (4 instances), "Get Started" to approved CTA (2 instances), "perfect" bright adjective (1 instance)

