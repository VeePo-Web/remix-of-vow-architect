

# Plan: Build the Teaching Homepage — 8-Section Emotional Architecture

## Scope

Create a new Teaching homepage at `/teaching` with 8 sections following the Appendix B architecture from the teaching brand identity. This requires:

1. A new page component (`src/pages/Teaching.tsx`)
2. Eight section components in `src/components/teaching/`
3. A route addition in `App.tsx`
4. Enabling the Gateway Teaching card (available: true)

## Architecture

### Route & Gateway

- Add `/teaching` route in `App.tsx` pointing to `Teaching.tsx`
- Update `Gateway.tsx`: set Teaching card `available: true`

### Page: `src/pages/Teaching.tsx`

Minimal shell matching the weddings `Index.tsx` pattern — imports all 8 sections, renders them in sequence. Uses `usePageTheme` for theme management. Includes `MinimalHeader` and `Footer` (shared components).

### The 8 Sections

Each section follows the brand identity's Silence → Sound spectrum positioning.

**Section 1: `TeachingHero.tsx` — The Empty Bench**
- Spectrum: Point 1 (Deep Silence)
- Full-viewport hero. Warm cream background. Empty bench photograph at 12-15% opacity as atmospheric layer.
- Tagline: "From Silence; Unto Sound." with vow-yellow semicolon.
- Role label: "Piano Mentor" (whispered, uppercase, tracking-wide)
- Breathing scroll cue (golden dot, 3s cycle)
- Ken Burns drift on bench image at 30-40s cycle
- Grain overlay, vignette, fog layers matching weddings hero pattern but warmer
- No nav intrusion, no features, no pricing

**Section 2: `TeachingExhale.tsx` — The Exhale (Recognition)**
- Spectrum: Point 2 (Longing)
- Text-only section. Warm cream bg. Centered, max-width 680px.
- Copy: "You have a song inside you that you have never been able to play. You have heard it in the car, in the quiet, in the space between what you feel and what you can say. I understand. The piano has been waiting."
- Cormorant Garamond italic. Line-by-line stagger reveal (200ms gaps, 400ms per line, discovery easing)
- No sacred objects — absence creates contrast
- 120px padding bottom, no decorative divider

**Section 3: `TeachingPillars.tsx` — The Three Pillars (Desire)**
- Spectrum: Point 3 (Tentative Approach)
- Three centered blocks: Patient Mentorship, Emotional Fluency, Lifelong Relationship
- Cormorant headlines + Inter supporting sentence
- Golden thread vertical line connecting three pillars, breathing at 4s
- Golden dots as pillar markers
- 80px between pillars. Scroll-triggered stagger reveal

**Section 4: `TeachingMethodology.tsx` — The First Question**
- Spectrum: Point 3-4
- Display question: "What do you want to say through this instrument?" in large Cormorant Garamond
- Background shifts to soft charcoal (first dark section). Text inverts to cream-on-dark.
- Close-up keys photograph at 8% opacity
- Pencil annotation appears: handwritten "listen" in margin (clip-path write-on reveal, 600ms)
- 3-4 sentence narrative from the First Session script (Appendix C, Beat 2)

**Section 5: `TeachingThreshold.tsx` — The Threshold (Mind-Reading)**
- Spectrum: Point 4-5 (Patience → Near-Miss)
- 4 fear/resolution pairs (Age, Impossibility, School Trauma, Quitting Again)
- Fear in Cormorant italic at 70% opacity → 40-60px pause → Resolution in Inter at 100%
- Vow-yellow underline on key word per resolution (450ms, one-time, scroll-triggered)
- Charcoal background maintained. Atmospheric grain at 3-4%
- Semicolon threshold marker between this section and next, at 1.5x scale

**Section 6: `TeachingStories.tsx` — Student Stories (Validation)**
- Spectrum: Point 6 (Breakthrough)
- 2-3 student transformation narratives (placeholder content initially)
- Each: 3-4 sentence narrative in Inter + pull quote in Cormorant italic
- Warmest section. Full Sound-state. Cream at maximum warmth. Vow-yellow at peak
- Golden dots as story separators. Golden thread horizontal beneath each story

**Section 7: `TeachingOffering.tsx` — The Offering (Choice)**
- Spectrum: Point 6-7
- Framing question: "Where are you in your relationship with the instrument?"
- Three tier cards: The Conversation, The Practice (Most Chosen), The Devotion
- Piano-key visual metaphor. Most Chosen card elevated (-4px translateY), vow-yellow left border, pill
- Golden dots replace bullets. 220ms hover lift. Warm cream bg.
- CTAs link to `/contact` (or future teaching contact page)

**Section 8: `TeachingCrossing.tsx` — The Crossing (Commitment)**
- Spectrum: Point 7 (Full Resonance)
- Tagline bookend: "From Silence; Unto Sound."
- CTA: "Sit down with me." button (vow-yellow, 180ms hover fill)
- Anti-anxiety: "Response within 24 hours. Always." and "This is a conversation, not a commitment."
- Bench photograph at 6-8% opacity — occupied this time (transformation marker)
- Maximum warmth. Golden thread from above.

## Visual & Technical Standards

- **Palette:** Warm cream dominant (60-70%), charcoal for Section 4-5 only (20-30%), vow-yellow ≤6%, vine-green ≤4%
- **Typography:** Cormorant Garamond for display, Inter for body. Same 9-size scale as weddings.
- **Spacing:** 80px+ section gaps. Fitzgerald spacing system.
- **Motion:** All timings from Section 9.5 timing table. All animations have `prefers-reduced-motion` fallbacks.
- **Images:** Lazy-loaded below fold. Hero image preloaded. Ken Burns 30-40s. WebP format.
- **Accessibility:** WCAG 2.1 AA. Keyboard nav. Proper heading hierarchy (single H1 in hero). aria-labels on sacred objects.

## Files to Create/Modify

**Create:**
- `src/pages/Teaching.tsx`
- `src/components/teaching/TeachingHero.tsx`
- `src/components/teaching/TeachingExhale.tsx`
- `src/components/teaching/TeachingPillars.tsx`
- `src/components/teaching/TeachingMethodology.tsx`
- `src/components/teaching/TeachingThreshold.tsx`
- `src/components/teaching/TeachingStories.tsx`
- `src/components/teaching/TeachingOffering.tsx`
- `src/components/teaching/TeachingCrossing.tsx`
- `src/components/teaching/index.ts` (barrel export)

**Modify:**
- `src/App.tsx` — add `/teaching` route
- `src/pages/Gateway.tsx` — set Teaching `available: true`

This is a large build. Implementation will proceed section by section, ensuring each meets the brand identity's emotional architecture before moving to the next.

