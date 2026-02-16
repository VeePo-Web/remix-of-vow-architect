

# Homepage Design Overhaul and Site Simplification

## The Problem

The site currently has 9 navigation pages plus 8 legal/utility pages -- far too many for a solo wedding pianist. Pages like "Banff Mode," "Resources," "Blog," and "Proof & Trust" fragment the user journey and dilute the emotional impact. The homepage process section cards, while functional, feel over-engineered with complex orchestration systems (5-phase SVG morphing, spring physics, paper fiber parallax) that add fragility without proportional emotional return.

## The Simplification

### New Site Structure (6 core pages)

| Page | Purpose | Current Status |
|------|---------|----------------|
| **Home** | Emotional journey + conversion funnel | Redesign (this plan) |
| **Services** | Pricing tiers + what's included | Exists as /pricing -- rename and simplify |
| **About** | Origin story + credentials | Exists -- keep as-is |
| **FAQ** | Risk elimination | Exists -- keep as-is |
| **Contact** | Hold your date form | Exists -- keep as-is |
| **Gallery / Case Studies** | Visual proof of work | New -- replaces Proof & Trust |

### Pages to Remove

- **/banff-mode** -- Fold Banff info into a FAQ answer or a brief mention on Services
- **/proof** -- Replace with a simpler Gallery/Case Studies page
- **/blog** -- Remove (no content yet; can add later)
- **/resources** -- Remove (no content yet; can add later)
- **/email-preferences**, **/unsubscribe-confirmed**, **/sitemap** -- Remove (no backend)

Legal pages (Privacy, Terms, Cookies, Accessibility) remain in footer only.

### Navigation Update

Header nav links become: **Services | About | FAQ | Contact**
Full-screen menu items become: **Home | Services | About | Gallery | FAQ | Contact**

---

## Homepage Redesign -- Section by Section

The homepage keeps its existing emotional journey structure (inhale/exhale breathing rhythm) but each section gets a design quality pass focused on clarity, performance, and polish. No text changes.

### Section 1: Hero (keep as-is)
The vigil flame sequence, Ken Burns, and tagline reveal are already world-class. No changes.

### Section 2: TheExhale (keep as-is)
Golden dot, recognition statement, golden thread. Working well.

### Section 3: ProcessSection -- Major Simplification

**Current problem:** The process section has 5+ interconnected animation systems (held breath SVG morphing, paper fiber parallax, spring physics card tilt, ink bloom text, embossed numeral light-catching) creating a fragile, over-engineered experience. The visual complexity competes with the content.

**Redesign approach:**
- Remove the HeldBreath SVG morphing line system entirely
- Remove paper fiber parallax layers
- Remove spring physics card tilt
- Remove ink bloom text animation
- Keep the 4 movement cards with their photography and alternating left/right layout
- Replace complex animations with simple, reliable IntersectionObserver fade-in reveals (opacity + translateY, 400ms, staggered 150ms per element)
- Keep the warm dawn gradient background
- Keep the closing ceremony image with CTA
- Result: Same emotional content, 80% less code, zero fragility

**Technical changes:**
- Simplify ProcessMovement.tsx to remove all physics/bloom dependencies
- Remove useProcessOrchestrator, usePathMorph, useCardPhysics, useKeyDepression, useStrikeAnimation hooks
- Remove LetterpressCard, InkBloomText, PaperFiberLayers, HeldBreath, HeldBreathPath, CardConnector, EmbossedNumeral, GoldRuleShimmer, ResonanceRing, ChordRadiance, KeyOverlay components
- Keep ProcessSection, ProcessMovement (simplified), MovementImage, GradientDawnBackground, HandwrittenNote
- Cards become clean, minimal containers with cream background and a single gold left-border accent

### Section 4: VowMoment (keep as-is)
Full-viewport sacred quote. Working well.

### Section 5: TheInvitation (keep as-is)
Video placeholder with trust badges. Working well.

### Section 6: TheSound (keep as-is)
Track cards with breathing waveform. Working well.

### Section 7: TheTransformation (keep as-is)
Split-screen fears/resolutions with golden divider. Working well.

### Section 8: TheWitness (keep as-is)
Ceremony witness positioning. Working well.

### Section 9: ThreePaths (minor update)
Update the "Learn more" links to point to /services instead of /pricing.

### Section 10: TheSacredGround -- Remove
This is the Banff Mode section. Remove from homepage since Banff Mode page is being removed.

### Section 11: TheRecord (keep as-is)
SPL reading cards. Working well.

### Section 12: TheWitnesses (keep as-is)
Testimonials. Working well.

### Section 13: CrossOver (keep as-is)
Final CTA. Working well.

---

## Technical Implementation Plan

### Step 1: Simplify Process Section
1. Create a new simplified ProcessMovement component using basic IntersectionObserver + CSS transitions
2. Remove the orchestrator hook and all physics/material design hooks
3. Remove 15+ process sub-components, keeping only essential ones
4. Test that 4 cards render correctly with photography and alternating layout

### Step 2: Remove TheSacredGround from Homepage
1. Remove the import and JSX from Index.tsx

### Step 3: Simplify Navigation
1. Update MinimalHeader navLinks to: Services, About, FAQ (remove Banff Mode, Proof)
2. Update FullScreenMenu items to: Home, Services, About, Gallery, FAQ, Contact
3. Update Navigation.tsx nav items similarly
4. Update Footer quick links to match

### Step 4: Remove Unnecessary Pages
1. Remove route entries from App.tsx for: /banff-mode, /blog, /resources, /email-preferences, /unsubscribe-confirmed, /sitemap
2. Rename /pricing route to /services (keep /pricing as redirect)
3. Rename /proof route to /gallery

### Step 5: Performance Audit
1. Verify zero console errors after all removals
2. Confirm all remaining animations use GPU-accelerated properties (transform, opacity)
3. Ensure all IntersectionObserver instances properly disconnect on unmount
4. Verify reduced-motion media query fallbacks work

### Estimated Impact
- ~20 component files removed
- ~6 custom hooks removed
- ~3 page files removed
- Significantly reduced JavaScript bundle size
- Faster initial page load
- Zero risk of "broken" process cards -- simple CSS transitions only

