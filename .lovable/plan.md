

# Contact Pages — World-Class Quality Audit & Upgrade Plan

## Current State Assessment

All three contact pages are functional with bento card selectors, stepped forms, atmospheric layering, and vertical-aware navigation. The FullScreenMenu correctly routes Contact links per vertical. The foundation is solid — this plan addresses craft-level refinements to elevate from "good" to "world-class."

## Issues Identified

### 1. Weddings `/contact` — Craft Issues
- **"No obligation. Two-minute form." caption** uses `.caption` class — feels like a disclaimer, not reassurance. Should be integrated more elegantly.
- **Step indicator dots** are small and generic. No label transition animation between steps.
- **Step 3 expand link** ("Add ceremony time, phone...") reads like a feature list, not an invitation. Too utilitarian.
- **ValuePromiseBadge** is a bare pill floating next to the submit button — feels disconnected. The "PDF plan in 24h" copy is clinical.
- **Sidebar reassurance cards** all use the same card style with identical padding — no visual hierarchy between them. The DollarSign icon for "no cost" reads as financial/transactional, not sacred.
- **ContactFormSuccess** shows a "Add my planner now" form immediately after submission — too aggressive. The moment after commitment should breathe. The CheckCircle2 at 64px is oversized and generic.
- **ContactSLATimeline and ContactTestimonials** sections appear below the form as separate full-width sections — disconnects them from the conversion flow. On desktop they are invisible until you scroll past the form.

### 2. Events `/events/contact` — Craft Issues
- **Success state** is minimal (CheckCircle2 + text) but acceptable. Missing the warmth of the weddings success state.
- **"No obligation. Two-minute form."** repeated verbatim from weddings — should be events-specific microcopy.
- **Missing breathing vignette animation** — events page has a static vignette unlike weddings which has `contact-vignette-breathe`.
- **No micro-testimonial** in the sidebar (weddings has one, events does not).

### 3. Teaching `/teaching/contact` — Craft Issues
- **Most refined page** — deliberately minimal, which is correct for the brand.
- **Reassurance items** use `size={14}` icons — slightly too small for comfortable scanning on mobile.
- **Missing success state personality** — "I received your note" is good but lacks the warm specificity of the teaching brand ("not with a sales pitch, but with a question or two of my own" is excellent copy, keep it).

### 4. BentoSelector — Craft Issues
- **No keyboard arrow-key navigation** — radiogroup role is set but arrow keys don't cycle through options.
- **Selected glow** `shadow-[0_0_16px_hsl(var(--vow-yellow)/0.12)]` is good but the `scale-[1.01]` is barely perceptible — increase to `scale-[1.02]` for tactile feedback.
- **No focus ring on mobile tap** — `focus-visible` only triggers on keyboard, so mobile taps get no visual feedback beyond the selected state appearing.

---

## Upgrade Plan

### A. BentoSelector Polish (shared component)
- Increase selected scale from `1.01` to `1.02`
- Add `active:scale-[0.98]` for tactile "press" feedback on tap (piano-key depression philosophy)
- Add arrow-key navigation (left/right and up/down cycle through items)
- Add a subtle 80ms transition on the selected indicator dot appearing

### B. Weddings Contact Refinements
- Replace "No obligation. Two-minute form." with integrated reassurance text styled as `text-xs text-muted-foreground` beneath the lead paragraph (not a separate caption block)
- Refine step indicator: add a subtle connecting line between dots + label text that crossfades between step titles ("Your day" → "The sound" → "Final details")
- Rewrite Step 3 expand text: "Add ceremony time, planner details, or song requests" → more concise
- Remove ValuePromiseBadge from beside the submit button — instead place "You will receive a personalized ceremony plan within 24 hours" as helper text below the button (already exists, so just remove the badge)
- Reduce ContactFormSuccess CheckCircle2 from 64px to 48px; remove the immediate "Add my planner" form — replace with a calm success message + "I will respond within 24 hours with your personalized plan" + subtle "Add your planner's email" as an expandable option (not shown by default)
- Add breathing vignette animation timing to match events consistency

### C. Events Contact Refinements
- Add breathing vignette animation (currently static, weddings has it)
- Change "No obligation. Two-minute form." to "No obligation. One-minute form." (only 2 steps)
- Add a micro-testimonial in the sidebar below the 3 reassurance cards (events-specific)

### D. Teaching Contact — Minor Polish
- Increase reassurance icon size from 14 to 16 for better mobile readability
- The page is intentionally minimal — no structural changes needed

### E. Cross-Page Consistency
- Ensure all three contact pages use the same breathing vignette keyframe animation (currently only weddings defines `contact-vignette-breathe`)
- Standardize the success state pattern: 48px icon, display font heading, muted body text, no immediate follow-up form

### Implementation: 5 files
1. `src/components/BentoSelector.tsx` — scale, active state, arrow keys
2. `src/pages/Contact.tsx` — step indicator refinement, remove ValuePromiseBadge, caption cleanup
3. `src/components/ContactFormSuccess.tsx` — reduce icon, defer planner form
4. `src/pages/EventsContact.tsx` — breathing vignette, testimonial, microcopy
5. `src/pages/TeachingContact.tsx` — icon size bump

