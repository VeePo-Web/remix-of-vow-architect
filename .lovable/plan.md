

# Plan: Footer Quality Pass — Fantasy.co Polish

The footer and header already have all the architectural features implemented (atmospheric layers, arrival state, polyrhythm, key depression, spotlight dimming). This pass is about precision refinement — the difference between "good implementation" and "Fantasy.co quality." Every value, every spacing, every accessibility detail, audited against the spec.

## What Changes

### 1. `src/components/Footer.tsx` — Precision Refinements

**Spacing corrections (Fitzgerald scale compliance):**
- Container padding: `py-20 px-4` → `py-fitz-9 md:py-fitz-10 px-fitz-4 md:px-fitz-5 lg:px-fitz-6`
- Grid gap: `gap-16` → `gap-fitz-9` (80px — matching the spec's "gap-fitz-10" but 64px is too tight for 4-col, 80px is correct)
- Golden thread top margin: `mb-12` → `mb-fitz-9` (80px breathing room)
- Separator thread: `mt-16 mb-10` → `mt-fitz-10 mb-fitz-7` (120px / 40px as spec)
- Bookend: `mt-10` → `mt-fitz-7` (40px)

**Accessibility hardening:**
- External social links (Instagram, YouTube) get `target="_blank" rel="noopener noreferrer"`
- Contact links in "Reach Me" get focus-visible ring styles
- Legal links get focus-visible ring styles

**Typography precision:**
- Column label "Navigate" and "Reach Me": verify `font-display` (Cormorant) — currently correct
- Mission line: add `leading-relaxed` — already present, verify `max-w-md`

**Minor structural:**
- Wrap the "Reach Me" content in an `<address>` or just keep as `<ul>` (current is fine for semantics)

### 2. No CSS changes needed

All keyframes are already in place and correct.

### 3. No header changes needed

Already has the arch aesthetic, arrival behavior, and vine thread.

## Files Modified

1. `src/components/Footer.tsx` — spacing corrections to Fitzgerald scale, accessibility focus rings on all interactive elements, external link attributes

## What Does NOT Change

- MinimalHeader.tsx, FullScreenMenu.tsx, index.css, CrossOver.tsx, MobileStickyBar.tsx
- All animation timings, atmospheric layers, arrival logic
- All copy/content

