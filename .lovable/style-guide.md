# The Sacred Sound — Master Style Guide

> **Role:** Creative Director reference for all design, copy, animation, and refinement decisions.
> **Scope:** All three verticals (Weddings, Events, Teaching) and shared pages (About, Contact, FAQ, Pricing, Listen).
> **Rule:** Do not modify weddings page animations — they are locked and approved.

---

## 1. Design System Constants

### 1.1 Typography — Fitzgerald Scale (9 sizes, locked)

| Token | Size | Line Height | Font | Usage |
|---|---|---|---|---|
| H1 | 64px | 1.05 | Cormorant Garamond | Page heroes, single-use per page |
| H2 | 40px | 1.1 | Cormorant Garamond | Section headings |
| H3 | 28px | 1.2 | Cormorant Garamond | Subsection headings, card titles |
| H4 | 22px | 1.25 | Cormorant Garamond | Tertiary headings |
| Lead | 18px | 1.7 | Inter | Section intros, pull quotes |
| Body | 16px | 1.6 | Inter | Paragraph text |
| Small | 14px | 1.5 | Inter | Captions, metadata |
| XS | 12px | 1.5 | Inter | Fine print, timestamps |
| Label | 11px | — | Inter | Uppercase, tracking-[0.22em] |

**Rules:**
- All headings capped at `max-width: 12–22ch` for narrow reading
- No font sizes outside this scale — ever
- Display font (Cormorant) for emotional/editorial content; Inter for utility/descriptive

### 1.2 Spacing — Fitzgerald Scale (10 steps, locked)

| Token | Value | Tailwind Class | Common Usage |
|---|---|---|---|
| fitz-1 | 4px | `p-fitz-1` | Hairline gaps |
| fitz-2 | 8px | `p-fitz-2` | Icon padding |
| fitz-3 | 12px | `p-fitz-3` | Label→heading gap |
| fitz-4 | 16px | `p-fitz-4` | Mobile horizontal padding, H1→body gap |
| fitz-5 | 24px | `p-fitz-5` | Tablet horizontal padding, sibling gaps |
| fitz-6 | 32px | `p-fitz-6` | Desktop horizontal padding |
| fitz-7 | 40px | `p-fitz-7` | Tight section padding |
| fitz-8 | 56px | `p-fitz-8` | Standard section padding, between major elements |
| fitz-9 | 80px | `p-fitz-9` | Grand section padding |
| fitz-10 | 120px | `p-fitz-10` | Hero/crossing vertical padding |

**Responsive horizontal padding pattern:** `px-fitz-4 sm:px-fitz-5 lg:px-fitz-6`

### 1.3 Color Covenant

| Role | Color | CSS Variable | Max Coverage |
|---|---|---|---|
| Foundation | Charcoal / Rich Black | `hsl(var(--rich-black))` | 88–92% |
| Sacred Accent | Vow Yellow #FFE08A | `hsl(var(--vow-yellow))` | ≤6% |
| Life Accent | Vine Green #9BE15D | `hsl(var(--vine-green))` | ≤4% |

**Usage discipline:**
- Yellow appears at **threshold moments**: CTAs, underlines beneath sacred words, the semicolon, period accents
- Green appears at **confirmation moments**: available dates, success states, growth references
- Overuse of either dilutes impact — discipline is everything

**Temperature shifts:**
- Cold sections: true black, blue-undertone charcoals (vigil, introspection)
- Warm sections: cream, warm white, taupe undertones (celebration, exhale)
- The shift from cold to warm mirrors the journey from vigil to vow

**Semantic tokens (use these, never raw colors):**
- `hsl(var(--background))`, `hsl(var(--foreground))`
- `hsl(var(--primary))`, `hsl(var(--primary-foreground))`
- `hsl(var(--surface-elevated))`, `hsl(var(--surface-dark-band))`
- `hsl(var(--ink-primary))`, `hsl(var(--ink-soft))`, `hsl(var(--ink-inverse))`
- `hsl(var(--lines))`, `hsl(var(--lines-soft))`

---

## 2. Animation Standards — "Sacred Pacing"

### 2.1 Locked Timing Values

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Button hover scale (1.04) | 180ms | cubic-bezier(.22,.61,.36,1) | No wobble |
| Link underline grow | 160ms | cubic-bezier(.22,.61,.36,1) | Center → edges |
| Card lift on hover | 160ms | — | translateY(-2px) |
| Vow underline reveal | 450ms | — | Hero only, first view |
| Sticky nav hide/reveal | 240ms | ease-out | — |
| Form success banner | 260ms | — | Height + opacity |
| Theme cross-fade | 260ms | — | Background color shift |
| Standard scroll reveal | 700ms | cubic-bezier(0.4, 0, 0.2, 1) | translateY(12px) + opacity |
| Stagger between siblings | 80–120ms | — | Per child delay |

### 2.2 Named Easing Curves

| Name | Value | When to Use |
|---|---|---|
| Mood Curve | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard reveals, section transitions |
| Sacred Curve | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Hover states, button interactions, delicate reveals |

### 2.3 Choreographed Component Lifecycle

Every animated component has exactly three states:

| State | Duration | Behavior |
|---|---|---|
| **Entering** ("Surfacing") | 600ms | 16px rise + slight scale + opacity 0→1, or multi-beat scroll reveal |
| **Idle** ("Breathing") | 4000–6000ms | Ambient pulse — opacity oscillation or box-shadow breathing |
| **Active** ("Responding") | varies | Ambient animations suspend; functional feedback takes over |

### 2.4 Reveal System

All reveals use `useScrollReveal` hook (IntersectionObserver-based):
- Default threshold: `0.15`
- Default rootMargin: `'-60px 0px'`
- Default triggerOnce: `true`
- Delay applied via `setTimeout` inside observer callback

**Standard reveal pattern:**
```tsx
const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
// Apply via cn():
className={cn(
  'transition-all duration-700',
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
)}
style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
```

**Stagger pattern:**
```tsx
{items.map((item, i) => (
  <div
    className={cn(
      'transition-all duration-700',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
    )}
    style={{
      transitionDelay: `${400 + i * 100}ms`,
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }}
  />
))}
```

### 2.5 Reduced Motion — Non-Negotiable

Every animation must have a fallback:
- All transforms → removed
- All animations → opacity-only fade at 120ms
- Breathing/ambient pulses → static
- Inline `<style>` blocks must include `@media (prefers-reduced-motion: reduce)` overrides

---

## 3. Atmospheric Layering Stack

Every section should include some or all of these layers, in this z-order:

| Layer | z-index | Element | Opacity | Purpose |
|---|---|---|---|---|
| 0 — Background | 0 | Gradient (radial or linear) or solid color | 100% | Foundation |
| 1 — Film Grain | 1 | Noise texture overlay | 6–8% | Tactile texture |
| 2 — Warm Fog | 2 | Radial gradient, vow-yellow center | 2–3% | Emotional warmth |
| 3 — Breathing Glow | 3 | Vow-yellow radial, animated pulse | 4–6% | Living presence |
| 4 — Vignette | 4 | Radial gradient, transparent→dark | 100% | Focus attention |
| Content | 10+ | Text, cards, CTAs | — | Above all layers |

**Implementation pattern:**
```tsx
{/* Layer 1: Film Grain */}
<div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none z-[1]"
     style={{ backgroundImage: 'url(/placeholder.svg)', backgroundSize: '200px' }} />

{/* Layer 2: Warm Fog */}
<div className="absolute inset-0 pointer-events-none z-[2]"
     style={{ background: 'radial-gradient(ellipse at 50% 60%, hsl(var(--vow-yellow) / 0.03), transparent 70%)' }} />

{/* Layer 4: Vignette */}
<div className="absolute inset-0 pointer-events-none z-[4]"
     style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--rich-black) / 0.4) 100%)' }} />
```

---

## 4. Voice Rules — Universal

### 4.1 Core Rules (All Verticals)

- **First-person:** "I will," "I understand," "I arrive" — never "we" or third-person
- **No exclamation marks** — ever. Confidence doesn't shout.
- **Verb-forward CTAs:** "Hold my date," "Discuss your event," "Begin your first conversation" — never "Submit," "Book now," "Sign up"
- **Oxford comma** — always
- **En-dashes** for pauses — creates breathing room in text
- **No bright adjectives:** never "amazing," "incredible," "stunning," "magical," "special"
- **Frame cost as investment/clarity insurance** — not price
- **Specific over generic:** "24 hours" not "quickly," "17 years" not "extensive experience"
- **Copy sells moments, not minutes**

### 4.2 CTA Transformation Table

| Never Say | Say Instead |
|---|---|
| "Book now" | "Hold my date" (weddings), "Discuss your event" (events) |
| "Submit" | "Send your details" |
| "Sign up" | "Begin your first conversation" (teaching) |
| "Learn more" | "Explore my repertoire" |
| "Get a quote" | "Request a proposal" |
| "Check availability" | "See if your date is open" |
| "Contact us" | "Start a conversation" |

---

## 5. Vertical-Specific Language

### 5.1 Weddings

**Allowed:** sacred, vigil, covenant, vow, witness, threshold, ceremony, devotion, held breath, exhale, crossing, reverence, sound director, choreography

**Banned:** background music, DJ, performer, entertainer, gig, vendor, act, teacher, student, atmosphere (events-specific framing)

**Tone:** Sacred, composed, reverent. Vigil-to-celebration arc. Quietly luxurious.

**Reference:** `.lovable/wedding-brand-identity.md`

### 5.2 Events

**Allowed:** atmosphere, presence, intention, room, gather, occasion, curate, adapt, respond, read (the room), shape, professional, intimate, conversational, warm, polished, repertoire

**Banned:** sacred, vigil, covenant, vow, witness, mentor, student, journey, growth, background music, filler, entertainment, performer, amazing, incredible, stunning, book now, limited, hurry

**Tone:** Professional, atmospheric, polished. Confident without being stiff.

**Reference:** `.lovable/events-brand-identity.md`

### 5.3 Teaching

**Allowed:** silence, sound, bench, patience, conversation, expression, voice, listen, beside, discover, find, mentorship, semicolon, golden thread

**Banned:** teacher (institutional), school, academy, program, lesson (as primary noun), beginner, advanced, master, conquer, sign up, enroll, register

**Tone:** Patient, warm, expression-focused. Intimate mentorship.

**Reference:** `.lovable/teaching-brand-identity.md`

---

## 6. Emotional Funnel Mapping

Every page follows a psychological journey. Each section has a specific role:

| Section Role | Emotional Phase | Visitor State | What It Must Achieve |
|---|---|---|---|
| **Hero** | Mystery → Awe | "What is this?" | Make them feel before they think |
| **Exhale** | Recognition → Trust | "They understand me" | Honor the visitor's emotional state |
| **Process / Approach** | Understanding → Desire | "This is what I need" | Frame features as sacred duties / atmospheric promises |
| **Threshold** | Conviction → Commitment | "What if...?" | Address fears as internal monologue, answer with assurance |
| **Offering** | Commitment → Selection | "How deeply do I want this?" | Reduce choice anxiety — depth tiers, not feature lists |
| **Experience / Witnesses** | Validation → Confidence | "Others trusted and were satisfied" | Witness stories, not reviews. Specific moments, named emotions. |
| **Crossing** | Action → Resolution | "I will do this" | Maximum warmth, golden glow, promise of response time |

**Key principle:** The first impression is emotional. The last impression is a promise kept.

---

## 7. Section Refinement Process — 9-Step Audit

When refining any section:

1. **Identify the vertical** (weddings/events/teaching) → apply correct voice rules
2. **Identify the section's funnel role** → reference Section 6 above
3. **Audit copy** against voice rules — fix any violations (exclamation marks, banned words, passive voice, generic adjectives)
4. **Audit animations** — ensure Sacred Pacing timing (700ms reveals, 80-120ms staggers, correct easing curves)
5. **Add micro-delights** that are invisible until noticed:
   - A golden thread connecting to the next section
   - A breathing glow that pulses at 4–6s intervals
   - A subtle parallax on background elements (0.15 rate)
   - A word that reveals with a vow-yellow underline at the right moment
   - Typography that shifts weight at a threshold scroll point
6. **Ensure atmospheric layering** — grain, fog, and at least one glow layer per section
7. **Verify spacing** — fitz-9+ between sections, breathing room everywhere
8. **Check reduced motion** — every animation has an opacity-only fallback
9. **Preserve what works** — never remove approved animations. Build on them.

---

## 8. Quality Checklist — Fantasy.co Standard

Before any section is considered complete, verify all 10:

- [ ] Does this make visitors **feel before they think**?
- [ ] Is every millisecond of animation **intentional**?
- [ ] Has it been **reduced until it hurts**, then reduced again?
- [ ] Is the interface **invisible**? (Navigation hidden until needed, complexity backstage)
- [ ] Does it **breathe**? (Inhale/exhale rhythm, dark/light, pause/release)
- [ ] Could anyone else say this copy, or is it **uniquely Parker's**?
- [ ] Does it honor the correct **vertical's tone**?
- [ ] Are all CTAs **verb-forward**?
- [ ] **Zero exclamation marks**?
- [ ] Does **reduced motion** still feel premium?

---

## 9. Tech Stack Reference

### Hooks
- `useScrollReveal({ threshold, rootMargin, triggerOnce, delay })` → returns `{ ref, isVisible, hasTriggered }`
- `usePageTheme()` → applies page-level theme styling
- `useHeroReveal()` → hero-specific reveal orchestration
- `useVigilSequence()` → weddings vigil sequence (DO NOT MODIFY)

### Utilities
- `cn()` from `@/lib/utils` — conditional Tailwind class merging
- `<Button asChild>` pattern for link buttons wrapping `<Link to="...">`

### Component Patterns
- `RevealOnScroll` — wrapper component for scroll reveals (variant: up/scale/left/right/blur)
- `StaggerChildren` — auto-staggers child elements on scroll reveal
- `AnimatedSection` — section-level animation wrapper

### Inline Keyframes Convention
Component-specific `@keyframes` go in inline `<style>` tags within the component, always with `@media (prefers-reduced-motion: reduce)` override:

```tsx
<style>{`
  @keyframes section-breathe {
    0%, 100% { opacity: 0.04; }
    50% { opacity: 0.07; }
  }
  @media (prefers-reduced-motion: reduce) {
    .section-glow { animation: none; opacity: 0.05; }
  }
`}</style>
```

---

## 10. Section Registry

### Homepage — Weddings (`/`)
| Section | Component | Funnel Role | Status |
|---|---|---|---|
| Hero | VigilReveal + HeroTagline + VigilFlame + MinimalScrollCue | Mystery → Awe | ✅ Locked |
| The Exhale | TheExhale | Recognition → Trust | ✅ Locked |
| Process | ProcessSection (4 movements) | Understanding → Desire | ✅ Locked |
| Vow Moment | VowMoment | Sacred interstitial | ✅ Locked |
| The Invitation | TheInvitation | Meet Parker | ✅ Locked |
| The Sound | TheSound | Dark listening environment | ✅ Locked |
| The Transformation | TheTransformation | Fear → hope | ✅ Locked |
| The Witness | TheWitness | Exhale surface | ✅ Locked |
| Three Paths | ThreePaths | Offering / Commitment | ✅ Locked |
| The Witnesses | TheWitnesses | Validation | ✅ Locked |
| CrossOver | CrossOver | Action / Crossing | ✅ Locked |

### Events (`/events`)
| Section | Component | Funnel Role | Status |
|---|---|---|---|
| Hero | EventsHero | Mystery → Awe | 🔧 Refinable |
| Exhale | EventsExhale | Recognition → Trust | 🔧 Refinable |
| Occasions | EventsOccasions | Understanding → Desire | 🔧 Refinable |
| Approach | EventsApproach | Process / How I Work | 🔧 Refinable |
| Threshold | EventsThreshold | Conviction (address fears) | 🔧 Refinable |
| Experience | EventsExperience | Validation | 🔧 Refinable |
| Offering | EventsOffering | Commitment / Selection | 🔧 Refinable |
| Crossing | EventsCrossing | Action / Crossing | 🔧 Refinable |

### Teaching (`/teaching`)
| Section | Component | Funnel Role | Status |
|---|---|---|---|
| Hero | TeachingHero | Mystery → Awe | 🔧 Refinable |
| Exhale | TeachingExhale | Recognition → Trust | 🔧 Refinable |
| Pillars | TeachingPillars | Understanding → Desire | 🔧 Refinable |
| Methodology | TeachingMethodology | Process / Deep dive | 🔧 Refinable |
| Stories | TeachingStories | Validation | 🔧 Refinable |
| Offering | TeachingOffering | Commitment / Selection | 🔧 Refinable |
| Threshold | TeachingThreshold | Conviction (address fears) | 🔧 Refinable |
| Crossing | TeachingCrossing | Action / Crossing | 🔧 Refinable |

### About (`/about`)
| Section | Component | Funnel Role | Status |
|---|---|---|---|
| Hero | WitnessHero | Mystery → Awe | 🔧 Refinable |
| Origin | WitnessOrigin | Recognition → Trust | 🔧 Refinable |
| Sustain | WitnessSustain | Understanding → Desire | 🔧 Refinable |
| Presence | WitnessPresence | Validation | 🔧 Refinable |
| Covenant | WitnessCovenant | Sacred interstitial | 🔧 Refinable |
| Crossing | WitnessCrossing | Action / Crossing | 🔧 Refinable |

---

*This document governs all design, copy, animation, and refinement decisions. When in doubt, ask the seven North Star Questions from the brand vision document. If the answer to any is "no," reconsider. When in doubt, reduce.*
