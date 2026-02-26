

# Round 31 — Piano Key Navigator: Deep Refinement and Multi-Page Extension

## Critical Audit of Current Implementation

The PianoKeyNav component (built in the previous round) establishes the foundation: fixed right-edge keys, IntersectionObserver active tracking, hover tooltips, staggered entrance/exit, reduced motion support, and ARIA semantics. However, several gaps remain before this reaches Fantasy.co caliber:

### Issue 1: Animation Re-triggers on Every Visibility Toggle

The current implementation assigns a fresh `animation` CSS string on every render based on `isVisible`. When the user scrolls back to the hero and then past it again, all keys re-run their entrance animation from scratch. This creates a jarring "pop-in" effect on repeat visits. At Fantasy.co quality, the keys should animate in once, then simply toggle opacity on subsequent show/hide cycles -- the stagger entrance is a first-impression moment only.

### Issue 2: No Key Press Depression Effect

Clicking a piano key scrolls to the section but provides no visual feedback that the key was "pressed." A real piano key depresses when struck. At Fantasy.co quality, clicking a key would briefly translate it 2px to the right (into the viewport edge) with a 60ms spring, simulating a physical key press before the scroll begins.

### Issue 3: No Progress Indicator Between Keys

The active key illuminates, but there is no visual indication of scroll progress between sections. At Fantasy.co quality, a thin golden line would connect the keys vertically, with a fill that tracks scroll progress -- like a golden thread running through the keyboard, filling downward as the user journeys through the page. This reinforces the brand's "golden thread" motif.

### Issue 4: Black Keys Have No Visual Depth

Black keys on a real piano sit slightly above and in front of white keys, creating a layered, three-dimensional effect. Currently, black keys are merely narrower with a darker background. At Fantasy.co quality, black keys would have a subtle top highlight (1px lighter border-top), a bottom shadow, and a slight negative margin overlapping adjacent white keys -- creating the illusion of depth.

### Issue 5: No Extension to About, Pricing, or Proof Pages

The piano nav only exists on the weddings page. The plan specified extending it to all major pages. Each page has its own section structure that needs IDs and a page-specific section array.

---

## 5-Step Implementation Plan

### Step 1: First-Impression-Only Stagger Animation

**File:** `src/components/PianoKeyNav.tsx`

Add a `hasAnimated` ref that tracks whether the entrance stagger has already played:

```tsx
const hasAnimated = useRef(false);

useEffect(() => {
  if (isVisible && !hasAnimated.current) {
    hasAnimated.current = true;
  }
}, [isVisible]);
```

Update the button's `style` to use the stagger animation only on the first appearance. On subsequent show/hide cycles, use a simple opacity fade (no translateX, no stagger):

```tsx
style={{
  animation: isVisible
    ? hasAnimated.current
      ? 'none'  // Already animated once -- just show via className opacity
      : `piano-key-enter 260ms cubic-bezier(0.22,0.61,0.36,1) ${enterDelay}ms both`
    : hasAnimated.current
      ? 'none'  // Just hide via className opacity
      : reducedMotion ? 'none' : `piano-key-exit 200ms ease-in ${enterDelay}ms both`,
  opacity: hasAnimated.current ? (isVisible ? 1 : 0) : undefined,
  transform: hasAnimated.current ? 'translateX(0)' : undefined,
  transition: hasAnimated.current ? 'opacity 260ms ease' : undefined,
}}
```

This ensures the beautiful staggered entrance plays exactly once (the first scroll past the hero), and all subsequent visibility toggles are smooth, non-distracting opacity fades.

### Step 2: Key Press Depression Animation

**File:** `src/components/PianoKeyNav.tsx` and `src/index.css`

Add a `pressedIndex` state and a brief timeout to simulate key depression:

```tsx
const [pressedIndex, setPressedIndex] = useState<number | null>(null);

const handleKeyPress = useCallback((id: string, index: number) => {
  setPressedIndex(index);
  setTimeout(() => {
    setPressedIndex(null);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}, []);
```

Add a CSS class for the pressed state:

```css
.piano-key--pressed {
  transform: translateX(3px);
  transition: transform 60ms cubic-bezier(0.22, 0.61, 0.36, 1);
  background: hsl(var(--vow-yellow) / 0.2);
}
```

Apply `piano-key--pressed` when `pressedIndex === i`. This creates a brief 80ms "key depression" -- the key slides 3px into the viewport edge (simulating being pushed in), then springs back as the scroll begins. Subtle but unmistakably tactile.

### Step 3: Golden Thread Progress Line

**File:** `src/components/PianoKeyNav.tsx` and `src/index.css`

Add a vertical golden thread line behind the keys that fills based on scroll progress. Inside the `<nav>`, before the key map, render:

```tsx
{/* Golden thread progress */}
<div className="piano-key-thread" aria-hidden="true">
  <div
    className="piano-key-thread-fill"
    style={{ height: `${scrollProgress}%` }}
  />
</div>
```

Calculate `scrollProgress` from the active index relative to total sections:

```tsx
const scrollProgress = activeIndex >= 0
  ? ((activeIndex + 1) / sections.length) * 100
  : 0;
```

CSS for the thread:

```css
.piano-key-thread {
  position: absolute;
  right: 24px;  /* Center of white key width */
  top: 0;
  bottom: 0;
  width: 1px;
  background: hsl(var(--foreground) / 0.04);
  z-index: -1;
}

.piano-key-thread-fill {
  width: 100%;
  background: linear-gradient(
    to bottom,
    hsl(var(--vow-yellow) / 0.3),
    hsl(var(--vow-yellow) / 0.15)
  );
  transition: height 450ms cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow: 0 0 6px hsl(var(--vow-yellow) / 0.06);
}
```

This golden thread fills downward as the user progresses through the page -- a visual echo of the brand's golden thread motif that connects all sections. The transition duration (450ms) matches the brand's "sacred reveal" timing.

### Step 4: Black Key Three-Dimensional Depth

**File:** `src/index.css`

Update `.piano-key--black` with depth cues:

```css
.piano-key--black {
  width: 32px;
  height: 28px;
  background: linear-gradient(
    to bottom,
    hsl(var(--foreground) / 0.08) 0%,
    hsl(var(--rich-black)) 15%,
    hsl(var(--rich-black)) 85%,
    hsl(0 0% 3%) 100%
  );
  border-color: hsl(var(--foreground) / 0.12);
  border-top-color: hsl(var(--foreground) / 0.18);
  z-index: 1;
  margin-top: -4px;
  margin-bottom: -4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 hsl(var(--foreground) / 0.06);
}
```

The negative margins make the black keys overlap adjacent white keys slightly (as on a real piano). The gradient from lighter top to darker bottom simulates light hitting the raised surface. The inset highlight at the top and the drop shadow at the bottom complete the dimensional illusion. Combined with the existing `z-index: 1`, this creates a convincing layered keyboard effect.

### Step 5: Extend PianoKeyNav to About, Pricing, and Proof Pages

**About page** (`src/pages/About.tsx`):
- Import `PianoKeyNav`
- Define sections array:
  ```
  { id: "witness-hero",      label: "The Resonance",  isBlackKey: false }
  { id: "witness-origin",    label: "The Origin",     isBlackKey: true  }
  { id: "witness-sustain",   label: "The Sustain",    isBlackKey: false }
  { id: "witness-presence",  label: "The Presence",   isBlackKey: true  }
  { id: "witness-covenant",  label: "The Covenant",   isBlackKey: false }
  { id: "witness-crossing",  label: "The Crossing",   isBlackKey: false }
  ```
- Add IDs to each witness component's root `<section>`:
  - `WitnessHero.tsx` -- `id="witness-hero"`
  - `WitnessOrigin.tsx` -- `id="witness-origin"`
  - `WitnessSustain.tsx` -- `id="witness-sustain"`
  - `WitnessPresence.tsx` -- `id="witness-presence"`
  - `WitnessCovenant.tsx` -- `id="witness-covenant"`
  - `WitnessCrossing.tsx` -- `id="witness-crossing"`
- Add `piano-section-target` class to each

**Pricing page** (`src/pages/Pricing.tsx`):
- Import `PianoKeyNav`
- Define sections array for hero, packages, add-ons, comparison, testimonials, FAQ, download, and CTA sections
- Add IDs and `piano-section-target` class to each major `<section>` or wrapper `<div>` that serves as a landmark

**Proof page** (`src/pages/Proof.tsx`):
- Import `PianoKeyNav`
- Define sections array for hero, SPL triptych, setup gallery, insurance, redundancy, downloadable plans, and final CTA
- Add IDs and `piano-section-target` class to each section

Each page gets its own white/black key pattern reflecting its unique section count and narrative arc. The component is reusable -- only the `sections` prop changes per page.

---

## Files Modified Summary

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `src/components/PianoKeyNav.tsx` | First-impression-only stagger with `hasAnimated` ref |
| 2 | `src/components/PianoKeyNav.tsx`, `src/index.css` | Key press depression animation with 80ms delay |
| 3 | `src/components/PianoKeyNav.tsx`, `src/index.css` | Golden thread progress line behind keys |
| 4 | `src/index.css` | Black key 3D depth (gradient, shadow, negative margins) |
| 5 | `src/pages/About.tsx`, `src/pages/Pricing.tsx`, `src/pages/Proof.tsx`, 6+ witness components | Multi-page extension with section IDs |

---

## What This Achieves

- **First-impression magic:** The staggered entrance plays once to create wonder, then subsequent toggles are smooth and non-distracting -- respecting the user's time on repeat interactions
- **Tactile identity:** The key press depression makes each click feel like playing a note on a real piano -- deepening the instrument metaphor from visual to kinesthetic
- **Narrative progression:** The golden thread progress line creates a visual journey indicator that echoes the brand's golden thread motif across all sections
- **Material realism:** Three-dimensional black keys with gradients and shadows transform flat rectangles into a convincing keyboard cross-section
- **Site-wide cohesion:** Extending to About, Pricing, and Proof pages makes the piano key nav a signature interaction pattern -- a bespoke navigation language unique to this brand

## Technical Notes

- `hasAnimated` ref persists across re-renders without causing them -- zero performance cost
- Key press uses `setTimeout` (80ms) which is imperceptible as delay but creates clear visual feedback
- Golden thread `height` transition uses CSS `transition` (GPU-composited) -- no JS animation loop
- Black key negative margins only affect the visual layer (keys are in a flex column with `gap: 2px`) -- touch targets remain correctly sized
- All new section IDs follow the `kebab-case` convention established in Round 31
- `piano-section-target` class provides consistent `scroll-margin-top: 64px` across all pages

