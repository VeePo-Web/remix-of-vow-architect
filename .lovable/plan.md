

# Luxury Polish — Round 7: Final Decorative Icon + Craft Refinements

## Remaining Decorative Icon

**One file remains:** `PolicyHighlightBox.tsx` uses `Info`, `AlertTriangle`, `CheckCircle` as decorative variant markers inside policy/legal pages. Replace with brand-consistent marks:
- `info` variant: gold diamond marker (matching InclusionBlock)
- `warning` variant: en-dash `—` in `text-primary`
- `success` variant: gold diamond with vine-green tint

## StarBar — Functional but Cheap

`StarBar.tsx` renders 5 Lucide `Star` icons as a rating display. While functional, the generic star shape reads as "review widget." Replace with 5 gold diamond markers — same `w-2 h-2 rotate-45` pattern, filled diamonds for earned rating, hollow/faded for unearned. This is a visual upgrade, not a functional change.

## FormStepper — SaaS Progress Dots

`FormStepper.tsx` uses two `w-3 h-3 rounded-full` circles as a step indicator — standard SaaS onboarding pattern. Replace with a minimal editorial fraction: `1 / 2` or `2 / 2` in `font-display text-xs` with the active number in `text-primary`. Removes the generic dot-stepper look entirely.

## PolicyHighlightBox — Border Radius

Uses `rounded-lg` which is the standard Tailwind 8px radius. Policy/legal content should feel more editorial. Change to `rounded-sm` (2px) with a gold left-rule border instead of full border, matching the letterpress insert pattern from DownloadablePlans.

## Contact Pages — Trust Stats Row Consistency

All three contact pages (Contact, EventsContact, TeachingContact) render a trust stats row with identical structure but slightly different styling. The pattern is good but the stats use raw `text-foreground` for values. Upgrade: apply the gold gradient numeral treatment to the stat values for brand consistency.

---

## Files to Modify

1. `src/components/PolicyHighlightBox.tsx` — replace icons with brand marks + letterpress border style
2. `src/components/StarBar.tsx` — replace Star icons with gold diamond rating system
3. `src/components/FormStepper.tsx` — replace dot-stepper with editorial fraction
4. `src/pages/Contact.tsx` — gold gradient treatment on trust stat values
5. `src/pages/EventsContact.tsx` — same gold gradient treatment
6. `src/pages/TeachingContact.tsx` — same gold gradient treatment

## Summary

- 6 files modified
- Eliminates the final 3 decorative Lucide icon usages (Info, AlertTriangle, CheckCircle) plus 5 Star instances
- Upgrades 2 generic UI patterns (dot-stepper, star-rating) to bespoke editorial equivalents
- Adds gold gradient consistency to contact page trust stats
- No new dependencies

