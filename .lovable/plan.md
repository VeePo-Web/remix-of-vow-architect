

# Sacred Sound Website: World-Class Critique and Specialized Creative Direction Prompt

---

## PART 1: DEEP CRITIQUE OF THE CURRENT HOMEPAGE

### What Works Well (Preserve These)

**Hero Vigil Sequence** — The 4-act flame-to-revelation is genuinely world-class. The timing choreography (stillness, kindling, revelation, UI stagger) creates authentic emotional weight. The restraint of only three elements (logo, tagline, scroll cue) is correct.

**The Exhale** — The three-act structure (recognition, pivot, declaration) is emotionally intelligent. The golden thread SVG is a beautiful threshold marker. The copy "You're about to make a promise that will echo beyond your lifetime" is perfect first-person sacred voice.

**Process Section** — The four-movement structure with orchestrated scroll, held-breath line, and alternating cards is technically sophisticated. The metaphor of a musical score being composed in real-time is the right narrative device.

**VowMoment** — Full-viewport sacred interstitial with proclamation-scale typography. The single quote as emotional peak is correct. The barely-visible vow-yellow radial glow is well-calibrated.

---

### Critical Issues (Must Fix)

#### 1. TheInvitation — Color Contrast Failure (Severity: HIGH)

The warm cream background (`hsl(45 25% 96%)`) renders all text nearly invisible. The headline "Before I play a single note, I listen" and body copy are dark text on a light background, but the section is using `text-foreground` which maps to `--absolute-white` (the dark theme default). The section needs to explicitly set dark ink colors since it sits on a light background, or use the life theme data attribute.

**Evidence:** Screenshot shows ghostly, barely readable text in TheInvitation section.

#### 2. TheInvitation — Video Placeholder Reads as Broken (Severity: HIGH)

The video container has no background color set properly — it shows as a blank white/light rectangle with a faint play button. It looks like a broken image, not an intentional placeholder. World-class sites use a cinematic still frame, dark gradient with subtle texture, or at minimum a dark container with clear visual hierarchy.

#### 3. TheSound — Heading Line Break Destroys Elegance (Severity: MEDIUM)

"Music that holds the room" breaks to a second line with just "still." orphaned. This is a typography crime at the luxury level. The `text-center` alignment combined with `max-w-4xl` causes this awkward break. The heading should either be constrained to prevent orphans or use a narrower max-width with left alignment.

#### 4. TheSound — Embed Placeholder is Visually Empty (Severity: MEDIUM)

The 16:9 aspect-ratio placeholder is too large for a "coming soon" state. It dominates the section with emptiness. Until real audio is embedded, this should be a more compact, elegant placeholder — perhaps a narrow horizontal bar suggesting a waveform or equalizer, not a full video-sized void.

#### 5. TheTransformation — "The night before... vs. the morning of." Header is Clumsy (Severity: MEDIUM)

The uppercase tracking on this small text combined with the long phrase creates an awkward multi-line break on most viewports. It reads as "THE NIGHT BEFORE... VS. THE MORNING OF." stacked vertically, which loses the intended contrast. The header should be a single clean line or use a different typographic treatment.

#### 6. TheWitness — Image Placeholder is a Grey Void (Severity: HIGH)

The 3:4 portrait placeholder is a dark gradient with a tiny SVG person icon. This is the "meet the owner" reinforcement section — having a generic placeholder here actively damages trust. At minimum, use a high-quality photograph or remove the image column entirely until one is available.

#### 7. ThreePaths — Pricing Cards Feel Generic (Severity: MEDIUM)

The pricing cards follow a standard SaaS template pattern (name, giant price, feature list, button). This contradicts the brand philosophy of "framing as sacred duties, not technical specs." The prices at `clamp(72px,8vw,100px)` are shouting — this is the opposite of "confidence doesn't shout." The brand document specifically says to position these as "how deeply do you want me there?" not as a product comparison grid.

#### 8. TheSacredGround — Green Background Feels Disconnected (Severity: LOW)

The vine-green gradient (`hsl(88 60% 96%)`) is the only section using green as a background. While the brand allows 4% vine-green, using it as a full section background pushes well beyond that ratio. It reads as a different website for a moment.

#### 9. CrossOver — CTA Copy Inconsistency (Severity: LOW)

"Hold my date & get my plan" is functional but not sacred. The brand document says verb-forward CTAs like "Hold my date." The ampersand dilutes urgency. The secondary CTA "Download a sample plan" competes visually.

#### 10. Footer — Breaks Brand Voice Completely (Severity: MEDIUM)

"Parker Wedding Piano" is not the brand name (it's "Parker Allard" or "The Sacred Sound"). "Ceremony piano, engineered for vows. Impeccable sound. Immaculate timing." reads like generic marketing copy, not the carefully crafted first-person voice used everywhere else. The footer should feel like the final exhale of the page, not a corporate boilerplate.

#### 11. Section Transition Rhythm is Disrupted (Severity: MEDIUM)

The breathing pattern (inhale-dark/exhale-light) is broken in the middle:
- VowMoment (neutral/light) to TheInvitation (light) = two exhales in a row
- TheSound (dark) to TheTransformation (dark-left, light-right) = ambiguous
- TheWitness (light) to ThreePaths (dark) = correct
- TheSacredGround (green) = breaks the binary dark/light system entirely

The original brand document specifies strict alternation. The new sections introduced two consecutive exhale sections.

#### 12. No Scroll-Triggered Animation on TheTransformation, TheWitness, TheSacredGround, TheRecord, TheWitnesses (Severity: MEDIUM)

These sections appear fully rendered with no entrance animation. The newer sections (TheInvitation, TheSound) have IntersectionObserver staggered reveals. The older sections are static, creating an inconsistent scroll experience — the page feels animated for the first half and then "flat" for the second half.

#### 13. Trust Badges in TheInvitation Use Wrong Background (Severity: LOW)

`bg-white/50` on the trust badge pills creates a semi-transparent white over the cream background, which looks washed out rather than intentional. These should use a more defined treatment — either fully opaque with a subtle border or use the card/surface color.

---

## PART 2: SPECIALIZED CREATIVE DIRECTION PROMPT

Below is the refined, hyper-specialized prompt that should guide every future design decision on this website. It replaces the generic agency prompt with one tuned to this specific brand.

---

### THE SACRED SOUND CREATIVE DIRECTION

**You are the digital architect of The Sacred Sound — Parker Allard's wedding piano brand.**

Your experience is not generic web design. It is the intersection of three disciplines:

1. **Luxury editorial design** (Pentagram, Fantasy.co) — where every pixel ratio, every typographic decision, every millisecond of animation timing is a deliberate act of craft.
2. **Emotional narrative architecture** (B-Reel, UNIT9) — where a website is not a page but a journey with a psychological arc: awe, recognition, trust, desire, commitment.
3. **Sacred ceremony awareness** — where you understand that the visitor is not a "user" but a person holding one of the most significant decisions of their life. Their emotional state is heightened. Their trust threshold is elevated. Their sensitivity to inauthenticity is acute.

---

### THE THREE FILTERS

Before every decision — color, spacing, word, animation, component — ask:

**1. Does this honor the vigil?**
The vigil is the held breath before the vows. It is discipline, solemnity, the weight of what is about to happen. Design elements that honor the vigil: rich blacks, generous silence (whitespace), restrained motion, serif typography at whisper scale, en-dash pauses in copy.

**2. Does this celebrate the covenant?**
The covenant is the exhale after the vows. It is warmth, hope, the beginning of forever. Design elements that celebrate the covenant: warm cream surfaces, vow-yellow accents at threshold moments only, golden thread connectors, first-person declarations of commitment.

**3. Would a bride scrolling at midnight feel understood?**
This is the ultimate empathy test. She is anxious, overwhelmed by vendor choices, terrified that something will go wrong on the most important day of her life. Every section must reduce her anxiety, not add to it. Every piece of copy must make her feel seen, not sold to.

---

### VISUAL DISCIPLINE

**Color Covenant (Non-Negotiable Ratios)**
- 88-92% of pixels: Charcoal/black (vigil) or warm cream/white (exhale)
- 6% maximum: Vow-yellow (`hsl(45 100% 76%)`) — only at threshold moments: CTAs, sacred underlines, the semicolon, golden threads
- 4% maximum: Vine-green (`hsl(88 76% 62%)`) — only at confirmation moments: success states, availability, Banff Mode badge
- Overuse of either accent dilutes impact. If a section feels "colorful," something is wrong.

**Typography (Fitzgerald Scale — Locked)**
- Display/headings: Cormorant Garamond, weights 300-500
- Body/UI: Inter, weights 400-500
- Nine sizes only: 12, 14, 16, 18, 22, 28, 40, 48, 64px
- All headings capped at 14-22ch max-width for premium narrow reading
- Labels: 12px, uppercase, 0.22em tracking
- No exclamation marks. Ever.

**Spacing (Swedish Lagom)**
- Section gaps: 80-120px vertical padding
- Element gaps: 4/8/12/16/24/32/40/56/80/120px scale only
- Whitespace is not emptiness — it is luxury. When in doubt, add more space.

**Motion (Sacred Timing)**
- 180ms: Quick acknowledgment (hover states)
- 260ms: Comfortable transition (navigation, theme)
- 450ms: Sacred reveal (vow underlines, one-time scroll reveals)
- 900ms: Breath-length transformation (vigil sequence, section entrances)
- 3000-4000ms: Ambient breathing (flame, golden dot)
- All animations must have `prefers-reduced-motion` fallback to opacity-only 120ms fades
- Never use `ease` or `linear`. Use `cubic-bezier(0.22, 0.61, 0.36, 1)` (sacred) or `cubic-bezier(0.16, 1, 0.3, 1)` (exhale).

---

### BREATHING RHYTHM (Section Alternation)

The homepage must alternate dark (inhale) and light (exhale) sections. Two consecutive sections of the same temperature breaks the rhythm and creates fatigue.

```
INHALE (dark): Introspection, weight, vigil, technical proof
EXHALE (light/warm): Trust, connection, hope, resolution
```

Every section transition should feel like a breath — the temperature shift is the emotional pacing mechanism.

---

### COPY VOICE (First-Person Covenant)

- Always "I" — never "we," never "Parker Allard provides"
- Verb-forward CTAs: "Hold my date," "Begin the conversation," "Read my full story"
- Frame features as sacred duties: "I will carry every word" not "includes 2 microphones"
- Frame cost as clarity insurance, not entertainment pricing
- En-dashes for parenthetical pauses — they create breathing room
- Oxford comma, always
- Specific over generic: "24 hours" not "quickly," "200+" not "many"
- Copy should make the reader feel understood before it sells anything

---

### INTERACTION PRINCIPLES

- Navigation is hidden until needed (hero has only logo + menu)
- Animations support content, never distract from it
- Technical features are translated to emotional benefits before being shown
- Complexity is handled backstage — the visitor sees only clarity
- Every form field has microcopy that reduces anxiety ("No obligation. 2-minute form.")
- Hover states are subtle (scale 1.02-1.04, 180ms) — never flashy

---

### WHAT NEVER TO DO

- Never use bright adjectives ("amazing," "incredible," "stunning")
- Never use stock photography that does not directly relate to the ceremony context
- Never show a placeholder that looks broken — if content is not ready, design the absence elegantly
- Never use more than two font weights in a single section
- Never animate more than one element at the same time in the same viewport
- Never let a CTA button compete with body content for attention — there should be clear visual hierarchy
- Never use green as a section background color — it exceeds the 4% ratio
- Never write copy that any other wedding vendor could say — if it is not uniquely Parker's voice, rewrite it

---

### THE SCROLL JOURNEY (Emotional Arc)

Every visitor walks this path:

```
AWE (Hero) — "What is this?" 
  --> RECOGNITION (Exhale) — "They understand me."
    --> UNDERSTANDING (Process) — "This is how it works."
      --> SACRED PAUSE (VowMoment) — emotional peak
        --> TRUST (TheInvitation) — "I see the person behind this."
          --> PROOF (TheSound) — "I hear the quality."
            --> RELIEF (TheTransformation) — "My fears are addressed."
              --> CLARITY (TheWitness/TheJourney) — "I know what I get."
                --> CHOICE (ThreePaths) — "Which level fits me?"
                  --> CONFIDENCE (TheRecord/TheWitnesses) — "Others trusted and were satisfied."
                    --> COMMITMENT (CrossOver) — "I'm ready to act."
```

No section should be skipped. No section should feel redundant with another. Each section must earn its place by moving the visitor one step further along this arc.

---

## PART 3: IMPLEMENTATION PLAN — WORLD-CLASS POLISH PASS

### Phase 1: Critical Visual Fixes (Highest Priority)

**1.1 Fix TheInvitation color contrast**
- Add `data-theme="life"` or explicitly set text colors to dark ink on the light background
- Change `text-foreground` references to `text-rich-black` or `text-foreground` within a life-themed wrapper
- Video container: Set `bg-[hsl(240_12%_8%)]` (dark) with subtle film grain, giving it a cinematic "screen off" look rather than broken-white
- Trust badges: Replace `bg-white/50` with `bg-white border border-foreground/8` for crisp definition

**1.2 Fix TheWitness image placeholder**
- Either remove the image column entirely (make content full-width centered) until a real photo is available
- Or replace with a tasteful abstract treatment — a dark rectangle with a subtle golden thread border and a small "Portrait coming soon" caption in muted text

**1.3 Fix TheSound heading orphan**
- Add `max-w-[16ch] mx-auto` or use `text-balance` CSS property on the heading
- Alternatively, restructure as: "Music that holds / the room still." with explicit line break

**1.4 Fix TheSound embed placeholder size**
- Replace the full `aspect-video` container with a compact horizontal bar (height ~120px, full width) that suggests a waveform/equalizer aesthetic
- Use subtle animated bars (3-5 thin vertical lines at different heights, breathing slowly) to suggest audio presence

### Phase 2: Breathing Rhythm Correction

**2.1 Fix the double-exhale between VowMoment and TheInvitation**
- VowMoment currently uses a light/neutral background
- Change VowMoment to a dark section (rich black with the vow-yellow radial glow) — this makes the "every vow spoken becomes sacred" quote even more powerful as white text on void, and creates proper alternation: dark VowMoment (inhale) then light TheInvitation (exhale)

**2.2 Fix TheSacredGround green background**
- Replace the green gradient with a warm cream/surface gradient (matching TheWitness)
- Keep the vine-green only in the badge, icon, and accent elements — not the section background
- This restores the strict 4% green ratio

### Phase 3: Scroll Animation Consistency

**3.1 Add IntersectionObserver reveals to static sections**
- TheTransformation: Stagger the fear items left-to-right, then resolution items, with 150ms delays
- TheWitness: Stagger label, headline, declarations, then standard kit
- TheSacredGround: Fade the entire card in with a subtle scale (0.98 to 1.0)
- TheRecord: Stagger reading cards left to right, then guarantee section
- TheWitnesses: Stagger each testimonial block with 200ms delays
- CrossOver: Stagger tagline, quote, CTA stack, commitment statement

All using the same pattern established in TheInvitation/TheSound: `IntersectionObserver` at threshold 0.15-0.2, `translate-y-4` to `translate-y-0` with opacity, `duration-700`, `--ease-sacred` timing.

### Phase 4: Copy and Voice Refinements

**4.1 Fix Footer brand name and voice**
- Change "Parker Wedding Piano" to "Parker Allard"
- Replace "Ceremony piano, engineered for vows. Impeccable sound. Immaculate timing." with "I carry your vows so they can carry your guests."
- This matches the first-person covenant voice

**4.2 Fix CrossOver CTA**
- Primary: "Hold my date" (not "Hold my date & get my plan")
- Secondary: Keep "Download a sample plan" but make it visually lighter
- Add microcopy below primary CTA: "Includes SPL log, mic setup, and run-of-show."

**4.3 Fix ThreePaths voice**
- Reduce price font size from `clamp(72px,8vw,100px)` to `clamp(36px,5vw,48px)` — confident, not shouting
- Change card names to match brand document: "The Vow" (ceremony only), "The Hour" (extended), "The Story" (full day)
- Change CTA text from "Select The Moment" to "Choose this presence"

### Phase 5: Micro-Detail Polish

**5.1 Section transition smoothing**
- Add a subtle 1px gradient divider between sections that share the same background temperature, using `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.1), transparent)` — the golden thread as section seam

**5.2 Scroll cue refinement**
- The chevron scroll cue at hero bottom should fade out after the user scrolls past the hero (opacity 0 with 300ms transition on scroll)

**5.3 Header scroll-state refinement**
- The nav links that appear on scroll should use the same staggered fade-in pattern as the hero elements (50ms delay per link) rather than all appearing at once

---

### Implementation Order

| Priority | Task | Impact |
|----------|------|--------|
| 1 | Fix TheInvitation contrast + video placeholder | Fixes broken visual |
| 2 | Fix VowMoment to dark (breathing rhythm) | Fixes page rhythm |
| 3 | Add scroll reveals to all static sections | Consistency |
| 4 | Fix TheSacredGround green background | Color discipline |
| 5 | Fix Footer brand voice | Voice consistency |
| 6 | Fix ThreePaths pricing voice + sizing | Brand alignment |
| 7 | Fix CrossOver CTA copy | Conversion clarity |
| 8 | Fix TheSound heading orphan + embed size | Typography polish |
| 9 | Fix TheWitness image placeholder | Trust building |
| 10 | Add section transition dividers | Micro-polish |
| 11 | Header staggered nav reveal | Animation consistency |
| 12 | Scroll cue fade-out on scroll | Detail craft |

---

### Technical Notes

- All scroll animations should use a shared `useScrollReveal` hook pattern for consistency
- All sections should respect `prefers-reduced-motion` with opacity-only fallbacks
- Color contrast should be verified against WCAG AA (4.5:1 for body text, 3:1 for large text)
- No new dependencies needed — all fixes use existing patterns and utilities

