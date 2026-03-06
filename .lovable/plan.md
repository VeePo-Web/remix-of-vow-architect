

# Plan: Create Master Style Guide Document

Create `.lovable/style-guide.md` — a unified Creative Director reference document that codifies the design system, animation standards, voice rules, atmospheric layering, and section-refinement process across all three verticals.

## What It Contains

1. **Design System Constants** — Typography (Fitzgerald scale), spacing (Fitzgerald spacing), color covenant (88/6/4 ratios), CSS variables
2. **Animation Standards ("Sacred Pacing")** — Locked timing values (180ms hovers, 160ms lifts, 700ms reveals, 80-120ms staggers), easing curves, choreographed component lifecycle (Entering/Idle/Active), reduced motion fallbacks
3. **Atmospheric Layering Stack** — The 5-layer system (background gradient, grain, warm fog, breathing glow, vignette) with opacity values and z-index order
4. **Voice Rules (Universal)** — First-person, no exclamation marks, verb-forward CTAs, Oxford comma, en-dashes, banned adjectives
5. **Vertical-Specific Language** — Allowed/banned word lists for Weddings, Events, and Teaching (references the existing brand identity docs)
6. **Emotional Funnel Mapping** — Section roles (Hero→Awe, Exhale→Recognition, Threshold→Conviction, Crossing→Action) and what each must achieve
7. **Section Refinement Process** — The 9-step audit checklist for elevating any individual section
8. **Quality Checklist (Fantasy.co Standard)** — 10 verification questions before any section is considered complete
9. **Tech Stack Reference** — Hooks (`useScrollReveal`), utilities (`cn`), component patterns (`Button asChild`), inline keyframe conventions
10. **Section Registry** — Current sections by page with their funnel role

## Scope

- **Creates:** `.lovable/style-guide.md`
- **Does NOT touch:** Any component files, CSS, or animation code on the weddings page or anywhere else

