

# THE COVENANT KEPT — Full Detail-Oriented Specification

## Current State

The section has been radically simplified to its essence: warm gradient background, vignette, film grain, top/bottom fades, and pure typography. Three placeholder testimonials with static golden separators and a closing semicolon. No CSS classes remain in `index.css` for this section — everything is inline or Tailwind. This is a strong foundation.

The spec below documents every detail of the current implementation and prescribes precise refinements to bring it to world-class standard without adding complexity back.

---

## Architecture (5 Layers)

```text
Layer 0: Warm gradient background (inline, 180deg cream-to-taupe)
Layer 1: Vignette (radial-gradient, transparent center, warm edge darkening)
Layer 2: Film grain (global .grain class, 6% opacity)
Layer 3: Top fade (dark-to-transparent, blending from previous dark section)
         Bottom fade (transparent-to-dark, blending into next dark section)
Layer 4: Content (header block + 3 testimonials + separators + semicolon)
```

No changes to this layer structure. It is correct and minimal.

---

## 12 Detail Refinements (2 files)

### File: `src/components/TheWitnesses.tsx`

**1. Overline tracking precision**
The overline "THE COVENANT KEPT" uses `tracking-[0.22em]` which is correct per the Fitzgerald system. But it lacks a `font-sans` class — it should use Inter, not inherit Cormorant from the section. Add `font-sans` to ensure the overline renders in Inter at xs size with proper tracking.

**2. Golden rule width and height**
The golden rule is `h-[2px] w-8`. Per the brand system, sacred separator lines should be `h-px` (1px) not 2px — thinner is more refined. The `rounded-full` on a 1px line has no visible effect and should be removed for code cleanliness.

**3. Heading font-size clamp refinement**
Currently `clamp(32px, 5vw, 48px)`. The Fitzgerald system locks sizes at 48px (5xl) for hero display and 36px (4xl) for page headings. This heading should use `clamp(30px, 4.5vw, 40px)` — mapping to the 3xl-to-4xl range (section heading to page heading), not hero display scale. 48px is reserved for hero-level content only.

**4. Heading letter-spacing**
Currently `0.01em`. The Fitzgerald system specifies `0.02em` for display headings. Update to `0.02em`.

**5. Underline glow on "stayed"**
The underline gradient runs from `0.65` to `0.2` opacity with a `10px` glow at `0.3`. This is well-calibrated. One refinement: add `border-radius: 1px` to the underline span to soften the endpoints microscopically — preventing pixel-sharp edges on the golden stroke.

**6. Testimonial stagger timing**
Currently `400 + index * 250ms`. The brand system specifies stagger delays of 80-120ms with slight variation for organic rhythm. The current 250ms gap between testimonials is too wide — it creates a noticeable sequential "cascade" rather than a cohesive group reveal. Change to `400 + index * 120ms` (400ms, 520ms, 640ms) for tighter, more organic staggering.

**7. Blockquote typography**
Currently `text-2xl` (24px) with `font-light italic`. This is correct for Cormorant quotes. Add `max-w-[22ch]` with `mx-auto` to cap the quote line length at the Fitzgerald maximum of 22 characters per line — this creates the narrow, intimate journal-page reading experience.

**8. Attribution hierarchy refinement**
Names at `15px` and venue at `12px uppercase` is correct. Add a golden diamond micro-ornament between name and venue: a 3px x 3px rotated square at `vow-yellow / 0.2` opacity. This replaces the generic vertical stacking with a branded separator that connects to the diamond motif used elsewhere. Implemented as a small `<span>` with inline styles.

**9. Separator opacity and transition**
Currently `opacity-30` when visible. Increase to `opacity-40` — at 30% against the warm cream background, the golden line nearly disappears. 40% maintains subtlety while ensuring visibility. Also change `w-8` (32px) to `w-12` (48px) for slightly more visual weight between testimonials.

**10. Semicolon sacred object**
Currently `28px` at `vow-yellow / 0.25`. This is too faint against the warm background. Increase to `0.35` opacity. The semicolon is a sacred object — it should be quiet but present, not invisible. Add a `transition-opacity duration-[3000ms]` with an alternating opacity between `0.25` and `0.4` using a CSS animation class to create the "vigil pulse" — the one ambient animation allowed in this stripped section.

**11. Section padding responsive**
Currently `py-[120px]` at all viewports. On mobile (< 768px), this is excessive. Add responsive: `py-[80px] md:py-[120px]` — mapping to fitz-9 on mobile, fitz-10 on desktop.

**12. Bottom fade gradient**
Currently fades to `hsl(240 9% 2%)` — this is nearly pure black but slightly warm. The next section (CrossOver) is a dark section. Verify this matches the CrossOver background. If CrossOver uses `hsl(240 9% 4%)` (rich-black), update the bottom fade to match: `hsl(240 9% 4%)`.

---

### File: `src/index.css`

**13. Add vigil-pulse keyframe for semicolon**
A single ambient animation for the closing semicolon — the only motion in the section beyond scroll reveals:

```css
@keyframes witnesses-vigil-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.4; }
}
```

Duration: 4000ms (material breathing tempo). Easing: ease-in-out. This is the "heartbeat" of the section — barely perceptible, deeply felt.

**14. Reduced motion override**
Under `@media (prefers-reduced-motion: reduce)`, disable the vigil-pulse animation and set the semicolon to static `opacity: 0.35`.

---

## Resulting DOM (exact node count: 16)

```text
<section>                          1
  <div> vignette                   2
  <div> grain                      3
  <div> top-fade                   4
  <div> container                  5
    <div> max-w-2xl                6
      <div> header block           7
        <p> overline               8
        <div> golden rule          9
        <h2> heading              10
      <div> testimonials space    11
        <div> testimonial 1       12  (blockquote + attribution inside)
        <div> separator 1         13
        <div> testimonial 2       14
        <div> separator 2         15
        <div> testimonial 3       16
      <div> semicolon             17
  <div> bottom-fade               18
```

18 nodes total. Zero images. One ambient animation (semicolon pulse). Zero pseudo-elements. Zero backdrop-filters. Zero GPU-heavy operations beyond the scroll-reveal transitions.

---

## Typography Spec (exact values)

| Element | Font | Weight | Size | Letter-spacing | Line-height | Color |
|---------|------|--------|------|---------------|-------------|-------|
| Overline | Inter | 400 | 12px (xs) | 0.22em | 1.5 | muted-foreground |
| Heading | Cormorant | 300 | clamp(30px, 4.5vw, 40px) | 0.02em | tight (1.1) | foreground |
| "stayed" underline | -- | -- | 3px height | -- | -- | vow-yellow gradient 0.65-0.2 |
| Quote | Cormorant | 300 | 24px (2xl) | normal | relaxed (1.625) | foreground/90 |
| Name | Cormorant | 500 | 15px | 0.04em | 1.5 | foreground/75 |
| Venue | Cormorant | 400 | 12px | 0.06em | 1.5 | foreground/50 |
| Semicolon | Cormorant | 400 | 28px | -- | 1 | vow-yellow/0.25-0.4 |

---

## Spacing Spec (exact values)

| Gap | Value | Fitzgerald |
|-----|-------|-----------|
| Section padding (desktop) | 120px | fitz-10 |
| Section padding (mobile) | 80px | fitz-9 |
| Header to testimonials | 80px (mb-20) | fitz-9 |
| Overline to golden rule | 16px (mb-4) | fitz-4 |
| Golden rule to heading | 24px (mb-6) | fitz-5 |
| Between testimonials | 64px (space-y-16) | fitz-8+ |
| Quote to attribution | 24px (mb-6) | fitz-5 |
| Name to venue | 4px (mt-1) | fitz-1 |
| Separator margin-top | 64px (mt-16) | fitz-8+ |
| Testimonials to semicolon | 64px (mt-16) | fitz-8+ |

---

## Animation Spec (exact timings)

| Animation | Duration | Easing | Delay | Type |
|-----------|----------|--------|-------|------|
| Overline reveal | 700ms | standard | 0ms | translateY(4px) + opacity |
| Golden rule reveal | 700ms | standard | 100ms | scaleX + opacity |
| Heading reveal | 700ms | standard | 200ms | translateY(4px) + opacity |
| "stayed" underline | 700ms | sacred (0.22, 0.61, 0.36, 1) | 700ms | scaleX |
| Testimonial 1 reveal | 700ms | standard | 400ms | translateY(6px) + opacity |
| Testimonial 2 reveal | 700ms | standard | 520ms | translateY(6px) + opacity |
| Testimonial 3 reveal | 700ms | standard | 640ms | translateY(6px) + opacity |
| Separator 1 reveal | 700ms | standard | 600ms | scaleX + opacity |
| Separator 2 reveal | 700ms | standard | 720ms | scaleX + opacity |
| Semicolon reveal | 700ms | standard | 1100ms | scale(0.9-1) + opacity |
| Semicolon pulse | 4000ms | ease-in-out | continuous | opacity 0.25-0.4 |

---

## Color Spec (exact values)

| Element | Color | Notes |
|---------|-------|-------|
| Section background top | hsl(45 25% 96%) | Warm cream |
| Section background bottom | hsl(45 20% 93%) | Warm taupe |
| Vignette edge | hsl(45 20% 93% / 0.8) | Matches bg bottom |
| Top fade target | hsl(240 9% 4%) | Rich black (from previous section) |
| Bottom fade target | hsl(240 9% 2%) | Near-black (into CrossOver) |
| Golden rule | hsl(var(--vow-yellow)) | Solid, 100% opacity |
| Underline gradient start | hsl(var(--vow-yellow) / 0.65) | Left edge |
| Underline gradient end | hsl(var(--vow-yellow) / 0.2) | Right edge, fade |
| Underline glow | hsl(var(--vow-yellow) / 0.3) | 10px blur shadow |
| Separators | hsl(var(--vow-yellow)) at 40% | Static lines |
| Semicolon | hsl(var(--vow-yellow) / 0.25-0.4) | Pulsing |
| Film grain | global .grain at 6% | Tactile warmth |

---

## Summary

| Change | File | Type |
|--------|------|------|
| Add `font-sans` to overline | TSX | Class addition |
| Golden rule 1px, remove rounded | TSX | Attribute tweak |
| Heading clamp to 30-40px | TSX | Style value |
| Heading letter-spacing 0.02em | TSX | Style value |
| Underline border-radius 1px | TSX | Style value |
| Stagger timing 120ms gaps | TSX | Style value |
| Quote max-width 22ch | TSX | Class addition |
| Golden diamond in attribution | TSX | New span element |
| Separator w-12, opacity-40 | TSX | Class tweak |
| Semicolon opacity 0.35, pulse class | TSX | Class + style |
| Responsive padding 80/120 | TSX | Class change |
| Bottom fade color match | TSX | Style value |
| vigil-pulse keyframe | CSS | New keyframe |
| Reduced motion override | CSS | New rule |

14 precise refinements. Zero new dependencies. Zero new images. One new CSS keyframe. Pure typographic and timing precision to bring the simplified section to world-class standard.

