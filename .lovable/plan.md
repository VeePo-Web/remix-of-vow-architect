

# Piano Key Section Navigator — Bespoke In-Page Navigation System

## The Concept

A vertical navigation rail fixed to the right edge of every page, rendered as stylized piano keys. Each key represents a section of the current page. Pressing a key smooth-scrolls the visitor to that section. The active section illuminates its corresponding key with a vow-yellow glow — mirroring the brand's "Death to Life" arc as the user journeys down the page.

This is not a generic sidebar. It is an instrument — a visual extension of Parker's identity as a pianist, woven into the navigation itself.

---

## Visual Design Specification

### Key Anatomy

Each "key" is a horizontal rectangle anchored to the right viewport edge, protruding ~48px into the page (desktop) or ~36px (tablet). Keys stack vertically with 2px gaps between them, creating the impression of a piano keyboard viewed from the side.

```text
Viewport right edge
                    |
  ┌─────────────────┤  ← Key 1 (white key)
  └─────────────────┤
  ┌───────────┐     |  ← Key 2 (black key, shorter)
  └───────────┘     |
  ┌─────────────────┤  ← Key 3 (white key)
  └─────────────────┤
  ┌───────────┐     |  ← Key 4 (black key)
  └───────────┘     |
  ┌─────────────────┤  ← Key 5 (white key)
  └─────────────────┤
```

- **White keys**: Full width (48px), height ~40px, background `hsl(var(--foreground) / 0.06)`, border `1px solid hsl(var(--foreground) / 0.08)`, `border-radius: 4px 0 0 4px` (rounded on left, flush to viewport edge on right).
- **Black keys**: Shorter width (32px), height ~28px, background `hsl(var(--rich-black))`, border `1px solid hsl(var(--foreground) / 0.12)`, overlaid between white keys with a slight z-index bump.
- **Active key**: Background transitions to `hsl(var(--vow-yellow) / 0.15)`, left border becomes `2px solid hsl(var(--vow-yellow) / 0.6)`, and a subtle golden glow appears (`box-shadow: -4px 0 12px hsl(var(--vow-yellow) / 0.08)`).
- **Hover key**: Background lightens to `hsl(var(--foreground) / 0.1)`, a section label tooltip appears to the left of the key with a 180ms fade-in.

### Key Pattern (White/Black Alternation)

The white/black pattern follows an actual piano octave pattern (W-B-W-B-W-W-B-W-B-W-B-W) but simplified to match the number of sections. For a page with 9 sections, the pattern could be: W-B-W-B-W-W-B-W-W. The exact pattern is configurable per page via a data array.

### Tooltip Labels

On hover, a label appears to the left of the hovered key:

```text
                        ┌──────────────┐
   "The Invitation"  ◄──│              │──── viewport edge
                        └──────────────┘
```

- Font: `font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground`
- Background: `hsl(var(--rich-black) / 0.9)` with `backdrop-filter: blur(8px)`
- Padding: `4px 10px`, rounded `4px`
- Positioned absolutely to the left of the key with a 6px gap
- Appears with `opacity 0 -> 1` over `180ms ease-out`
- A tiny caret/arrow on the right side pointing toward the key

### Vertical Centering

The entire key cluster is vertically centered in the viewport (`top: 50%; transform: translateY(-50%)`), fixed position.

### Entrance Animation

The piano keys enter from the right edge after the user scrolls past the hero section (same trigger as the header scroll state — `window.scrollY > window.innerHeight`). Keys stagger in from the right with 40ms delay each, using `translateX(100%) -> translateX(0)` over 260ms with `cubic-bezier(0.22, 0.61, 0.36, 1)`.

When the user scrolls back to the hero, the keys reverse-stagger out to the right.

---

## Technical Architecture

### New Component: `PianoKeyNav.tsx`

```text
src/components/PianoKeyNav.tsx
```

**Props interface:**

```typescript
interface PianoSection {
  id: string;           // DOM id of the section element
  label: string;        // Tooltip label (e.g., "The Exhale")
  isBlackKey?: boolean; // Visual style — shorter, darker
}

interface PianoKeyNavProps {
  sections: PianoSection[];
}
```

**Internal state:**
- `activeIndex: number` — tracked via IntersectionObserver on each section
- `isVisible: boolean` — shown only after scrolling past hero
- `hoveredIndex: number | null` — for tooltip display
- `reducedMotion: boolean` — respects `prefers-reduced-motion`

**Active section detection:**
- Create one IntersectionObserver with `threshold: 0.3` observing all section elements by their `id`
- When a section intersects, update `activeIndex`
- Use `rootMargin: "-20% 0px -60% 0px"` to trigger when a section is roughly in the upper-middle of the viewport

**Scroll behavior:**
- On key click: `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Offset by header height (56px) using `scroll-margin-top` on each section

### Section ID Requirements

Each major section component needs a stable `id` attribute. Current state and required additions:

| Page | Section | Current ID | Needs Adding |
|------|---------|-----------|--------------|
| /weddings | Hero | none | `id="hero"` |
| /weddings | The Exhale | none | `id="the-exhale"` |
| /weddings | Process | `id="process"` | Already exists |
| /weddings | Vow Moment | none | `id="vow-moment"` |
| /weddings | The Invitation | none | `id="the-invitation"` |
| /weddings | The Sound | none | `id="the-sound"` |
| /weddings | The Transformation | none | `id="the-transformation"` |
| /weddings | The Witness | none | `id="the-witness"` |
| /weddings | Three Paths | none | `id="three-paths"` |
| /weddings | The Witnesses | none | `id="the-witnesses"` |
| /weddings | Cross Over | none | `id="the-crossing"` |

Similar IDs would be added to About, Pricing, and Proof page sections.

---

## Responsive Behavior

### Desktop (1280px+)
- Full piano key visualization, 48px wide keys, tooltips on hover
- Fixed to right edge, vertically centered

### Tablet (768px-1279px)
- Narrower keys (36px), smaller tooltips
- Still visible on the right edge

### Mobile (below 768px)
- **Hidden entirely.** The mobile experience already has the sticky bottom bar. Adding a right-edge rail on small screens would crowd the viewport and create touch-target conflicts. Instead, the piano key nav is a desktop/tablet enhancement only.

---

## Implementation Plan (5 Steps)

### Step 1: Create the `PianoKeyNav` component

Build the core component in `src/components/PianoKeyNav.tsx`:
- Render a `<nav>` with `role="navigation"` and `aria-label="Page sections"`
- Map over `sections` to render key buttons
- Each button: `<button>` with `aria-label={section.label}`, `onClick` scrolls to section
- Style white vs black keys via the `isBlackKey` prop
- Active state driven by `activeIndex` from IntersectionObserver
- Hover state shows tooltip label
- Entrance/exit controlled by scroll position (past hero = visible)
- Reduced motion: skip stagger animation, use opacity-only

### Step 2: Add section IDs to all page sections

Update the following component files to add `id` attributes to their root `<section>` elements:
- `TheExhale.tsx` — add `id="the-exhale"`
- `VowMoment.tsx` — add `id="vow-moment"`
- `TheInvitation.tsx` — add `id="the-invitation"`
- `TheSound.tsx` — add `id="the-sound"`
- `TheTransformation.tsx` — add `id="the-transformation"`
- `TheWitness.tsx` — add `id="the-witness"`
- `ThreePaths.tsx` — add `id="three-paths"`
- `TheWitnesses.tsx` — add `id="the-witnesses"`
- `CrossOver.tsx` — add `id="the-crossing"`
- Add `scroll-margin-top: 64px` to each section via a shared CSS class

### Step 3: Integrate into the Weddings page (`Index.tsx`)

- Import `PianoKeyNav`
- Define the sections array with labels and black-key assignments:
  ```
  { id: "the-exhale",        label: "The Exhale",        isBlackKey: false }
  { id: "process",           label: "Our Process",       isBlackKey: true  }
  { id: "vow-moment",        label: "The Vow",           isBlackKey: false }
  { id: "the-invitation",    label: "The Invitation",    isBlackKey: true  }
  { id: "the-sound",         label: "Hear Me Play",      isBlackKey: false }
  { id: "the-transformation",label: "The Transformation",isBlackKey: false }
  { id: "the-witness",       label: "The Witness",       isBlackKey: true  }
  { id: "three-paths",       label: "Three Paths",       isBlackKey: false }
  { id: "the-witnesses",     label: "Testimonials",      isBlackKey: true  }
  { id: "the-crossing",      label: "The Crossing",      isBlackKey: false }
  ```
- Render `<PianoKeyNav sections={sections} />` inside the page wrapper

### Step 4: Add CSS for piano key styles and animations

In `src/index.css`, add:
- `.piano-key` base styles (dimensions, background, border, border-radius, transitions)
- `.piano-key--black` modifier (shorter width, darker background, z-index bump)
- `.piano-key--active` state (vow-yellow glow, border accent, background warmth)
- `.piano-key-tooltip` styles (positioning, backdrop blur, typography, caret)
- `@keyframes piano-key-enter` for staggered entrance from right
- `scroll-margin-top: 64px` utility class for section scroll offset
- `@media (prefers-reduced-motion: reduce)` fallbacks — opacity only, no transforms

### Step 5: Extend to About, Pricing, and Proof pages

- Add section IDs to About page components (`WitnessHero`, `WitnessOrigin`, etc.)
- Add section IDs to Pricing page sections
- Add section IDs to Proof page sections
- Import and render `PianoKeyNav` on each page with page-specific section arrays
- Each page gets its own white/black key pattern reflecting its section count

---

## Accessibility

- Each key is a `<button>` with `aria-label` matching the section name
- The nav container uses `role="navigation"` and `aria-label="Page sections"`
- Active key gets `aria-current="true"`
- Keyboard navigation: Tab through keys, Enter/Space to activate
- Focus ring: `focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.5)]`
- Reduced motion: stagger disabled, opacity-only transitions
- Hidden on mobile (no accessibility burden on small screens)

## Performance

- Single IntersectionObserver instance observes all sections — not one per section
- No scroll event listeners for active tracking (IO handles it)
- Scroll position check for visibility uses a single passive scroll listener (already exists in header logic — could share)
- CSS animations are GPU-composited (`transform`, `opacity` only)
- Tooltip renders conditionally (not hidden via CSS — actually unmounted when not hovered)
- Total DOM footprint: ~12 elements for 10 sections

## Brand Alignment

- The piano key metaphor is deeply personal to Parker's identity — it is not decoration, it is identity made functional
- The white/black key alternation mirrors the "Death/Life" brand dichotomy
- Active-key golden glow uses the exact vow-yellow accent at brand-prescribed ratios
- Tooltip typography matches the existing navigation micro-copy style
- The instrument metaphor extends from the existing PianoStrings in TheSound, the piano keyboard in WitnessSustain, and the AmbientAudioPill — creating a cohesive "piano as interface" language across the entire site

