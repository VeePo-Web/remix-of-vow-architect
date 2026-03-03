

# Fix: ThreePaths Section — Heading Copy and Centering

## Changes

### File: `src/components/ThreePaths.tsx`

1. **Line 176** — Replace "How deeply do you want me there." with a new heading that honors the covenant voice while feeling fresh. Proposed: "Choose the presence that fits your day." — frames the decision as selecting a level of presence rather than a transactional package choice. Stays first-person-adjacent, verb-forward, and composed.

2. **Lines 169-177** — The heading already has `margin: "0 auto"` and the parent div has `items-center`, but the `h2` itself lacks `text-center`. Add `text-center` to ensure multiline wrapping centers properly on all viewports.

3. **Line 163** — The label "THREE KEYS" is already centered. No change needed.

All other formatting (golden thread, stagger reveals, piano key layout) remains untouched.

