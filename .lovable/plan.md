

# Plan: Deep Expansion of Teaching Brand Identity Prompt

The current teaching identity document is 684 lines — structurally sound but lacking the operational depth required to actually build a Fantasy.co-grade website from it. The weddings site was built with an additional 10-page "Sacred Sound" philosophy document providing granular guidance on emotional phases, motion timing, copy frameworks, and micro-interaction specifications. The teaching identity needs that same operational depth embedded directly into the document.

## What Is Missing

After comparing the teaching document against both the weddings identity and the master "Sacred Sound" philosophy, the following gaps exist:

### 1. The Psychological Journey (entirely absent)
The weddings site has a detailed 5-phase emotional funnel (Mystery → Awe → Recognition → Trust → Desire → Commitment). The teaching document has no equivalent. Without this, every page designer must guess how to sequence content emotionally.

**Will add:** A complete 5-phase emotional journey map for the teaching visitor — from "I've always wanted to play" through "I want Parker as my mentor" — with specific emotional triggers, content types, and design treatments for each phase.

### 2. The Mind-Reading Copy Framework (absent)
The weddings site uses a "surface the fear, mirror it, resolve it" pattern that makes visitors feel understood. The teaching Customer Language Bank (Section 5) lists fears but doesn't specify *how* they appear on the page — the dramatic structure, the visual treatment, the pacing.

**Will add:** A full mind-reading framework with 8-10 fear/resolution pairs, each with the internal monologue phrasing, the first-person resolution, and the visual treatment (e.g., the fear in muted type, the resolution in warm cream with vow-yellow accent).

### 3. Motion Philosophy & Timing Table (skeletal reference only)
Line 465 mentions "220ms for hover, 900ms for reveals" but there is no structured timing table. The weddings brand doc references precise timing as "emotional language" — 180ms for acknowledgment, 450ms for sacred reveal, 3000-4000ms for ambient breathing. The teaching doc needs equivalent specificity.

**Will add:** A complete motion timing table with emotional labels, specific durations, easing curves, and the teaching-specific metaphor each timing serves (patience, discovery, breakthrough).

### 4. Page-by-Page Emotional Architecture (Appendix B is skeletal)
Appendix B lists page names and 1-line descriptions. A Fantasy.co-level prompt would specify, for each major section: the emotional state of the visitor entering, the emotional state leaving, the copy structure, the visual treatment, the sacred objects present, and the transition to the next section.

**Will add:** Full emotional architecture for the homepage (8 sections), with entry/exit emotional states, copy structure patterns, visual treatments, and transition logic.

### 5. The Silence → Sound Emotional Spectrum (underdeveloped)
Appendix A describes two states (Silence and Sound) but doesn't map the *gradient* between them — the way a practice session moves through frustration, patience, tentative discovery, near-miss, and breakthrough. This gradient is what the homepage sections should embody.

**Will add:** A 7-point emotional spectrum from deep silence to full resonance, with visual and tonal descriptors for each point, creating a precise tool for designers to place any section on the spectrum.

### 6. Sacred Objects Inventory (incomplete)
The weddings doc has the semicolon, golden diamond, golden thread, breathing flame, and vigil candle. The teaching doc mentions the semicolon, golden thread, and bench — but doesn't define their visual specifications, animation behaviors, or usage rules with the same precision.

**Will add:** A complete sacred objects inventory with visual specs, animation behaviors, meaning, and max-usage-per-page rules for each object.

### 7. The First Session Script (absent — unique to teaching)
No equivalent exists in weddings. This is the teaching vertical's most powerful differentiator: the first conversation. A Fantasy.co prompt would script the emotional arc of that first encounter so the website can dramatize it.

**Will add:** A narrative script of "The First Session" — the emotional beats of what happens when a new student sits down with Parker — which becomes the source material for the methodology section of the website.

### 8. Pricing Psychology Framework (absent)
The Offer Architecture (lines 347-353) names three tiers but doesn't specify the psychological framing, the visual hierarchy, the "most chosen" nudge logic, or the anxiety-reduction copy patterns.

**Will add:** A pricing psychology section specifying how each tier is framed, what fear each resolves, the visual treatment (piano-key metaphor carried from weddings), and the anti-anxiety microcopy.

### 9. Cross-Vertical Brand Coherence Rules (absent)
No section defines how the teaching vertical relates to weddings visually and tonally when a visitor navigates between them via the Gateway. The transition must feel like entering a different room in the same house — not a different house.

**Will add:** Cross-vertical coherence rules defining shared DNA (typography, spacing, sacred objects, semicolon) and permitted divergence (palette temperature, animation speed, photography style, voice warmth).

### 10. Accessibility & Performance Standards (absent)
The weddings site has detailed `prefers-reduced-motion` fallbacks, WCAG compliance patterns, and performance budgets embedded in the codebase. The teaching identity needs these codified.

**Will add:** Accessibility and performance standards section with WCAG targets, reduced-motion behavior specs, image optimization rules, and Core Web Vitals targets.

## Implementation

**Single file update:** `.lovable/teaching-brand-identity.md`

The document will expand from ~684 lines to approximately ~1200-1400 lines. New sections will be inserted as:

- **Section 6.5:** The Psychological Journey (5 phases)
- **Section 6.6:** The Mind-Reading Copy Framework
- **Section 9.5:** Motion Philosophy & Timing Table
- **Section 9.6:** Sacred Objects Inventory
- **Section 9.7:** The Silence → Sound Emotional Spectrum (7-point scale)
- **Appendix B expansion:** Full homepage emotional architecture (8 sections, detailed)
- **Appendix C:** The First Session (narrative script)
- **Appendix D:** Pricing Psychology Framework
- **Appendix E:** Cross-Vertical Brand Coherence
- **Appendix F:** Accessibility & Performance Standards

No code changes. No component modifications. This is governance depth that ensures every future design and copy decision has a North Star granular enough to eliminate guesswork.

