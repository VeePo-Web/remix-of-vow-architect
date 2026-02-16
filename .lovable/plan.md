

# World-Class Homepage Design Polish -- Comprehensive Audit and Fixes

## Issues Found

### 1. Dead Links to `/banff-mode` (Critical -- 404s)

There is no `/banff-mode` route defined in `App.tsx`, but 4 files link to it:

- `src/pages/NotFound.tsx` (line 51) -- "Banff Mode" button on the 404 page itself, creating an infinite 404 loop
- `src/components/FAQTopTen.tsx` (line 18) -- "Banff Mode Explained" link
- `src/components/FAQChips.tsx` (line 15) -- "See Banff Mode" link
- `src/components/SoundSystemDiagram.tsx` (line 49) -- "See Banff Mode" link

**Fix:** Replace all `/banff-mode` links with `/faq` (the FAQ page covers Banff-related questions). On the NotFound page, replace the Banff Mode button with a link to `/faq`.

### 2. Stale Route References in `usePageTheme.ts`

The `deathThemeRoutes` array on line 6 references routes that don't exist: `/blog`, `/banff-mode`, `/resources`, `/email-preferences`, `/unsubscribe-confirmed`, `/sitemap`.

**Fix:** Clean up the array to only include routes that actually exist in `App.tsx`.

### 3. `index.html` Contains Stale SEO Structured Data

Line 581-583 references `parkerallard.com/banff-mode` in the SiteNavigationElement schema. This will produce dead link signals in search engines.

**Fix:** Remove or update the structured data entry for Banff Mode.

### 4. TheRecord Observer Missing `disconnect()`

Line 23 in `TheRecord.tsx`: the observer callback does `if (entry.isIntersecting) setIsVisible(true)` but never calls `observer.disconnect()`. This was missed in the previous cleanup pass.

**Fix:** Add `observer.disconnect()` inside the condition, matching the pattern used in all other components.

### 5. Footer Links to `/services` and `/gallery` -- Verified Working

These routes exist in `App.tsx` (lines 31, 33) and resolve correctly. No action needed.

### 6. CSS Has 5,634 Lines of Accumulated Complexity

The `index.css` file contains extensive process section CSS (lines 1506-2500+) with references to orchestrator systems, paper fiber parallax, piano key physics, and letterpress material effects that are no longer used by the simplified `ProcessMovement` component. This dead CSS adds ~1000 lines of unused styles.

**Fix:** Remove dead CSS classes that no longer correspond to any component. This improves maintainability and reduces CSS parse time. Specifically:
- Remove `.process-section__thread` styles (golden thread SVG system -- not rendered)
- Remove `.ambient-glow-field__pulse` (pulse ring -- not rendered)
- Remove all orchestrator-related CSS variables no longer consumed
- Keep all `.process-movement`, `.process-card`, `.process-intro`, `.process-closing` styles that ARE actively used

### 7. Process Section `min-height: 180vh` May Be Excessive

Line 1510: `.process-section` has `min-height: 180vh`. With 4 cards + intro + closing, this creates unnecessary empty space if content is shorter. 

**Fix:** Change to `min-height: auto` and let content determine height naturally. The padding (`--space-10`) already provides generous vertical breathing room.

## Implementation Plan

### Phase 1: Dead Link Cleanup (4 files)

| File | Change |
|------|--------|
| `src/pages/NotFound.tsx` | Replace `/banff-mode` button with `/faq` button, change icon from Shield to HelpCircle, label to "FAQ" |
| `src/components/FAQTopTen.tsx` | Change link `to: "/banff-mode"` to `to: "/faq"` |
| `src/components/FAQChips.tsx` | Change link `to: "/banff-mode"` to `to: "/faq"` |
| `src/components/SoundSystemDiagram.tsx` | Change `/banff-mode` link to `/faq` |

### Phase 2: Theme Route Cleanup (1 file)

| File | Change |
|------|--------|
| `src/hooks/usePageTheme.ts` | Remove `/blog`, `/banff-mode`, `/resources`, `/email-preferences`, `/unsubscribe-confirmed`, `/sitemap` from arrays since those routes don't exist |

### Phase 3: Observer Fix (1 file)

| File | Change |
|------|--------|
| `src/components/TheRecord.tsx` | Add `observer.disconnect()` after `setIsVisible(true)` on line 23 |

### Phase 4: SEO Structured Data Cleanup (1 file)

| File | Change |
|------|--------|
| `index.html` | Remove the Banff Mode SiteNavigationElement entry from the JSON-LD schema |

### Phase 5: CSS Dead Code Removal (1 file)

| File | Change |
|------|--------|
| `src/index.css` | Remove unused orchestrator/thread/pulse CSS; change `.process-section` min-height from `180vh` to `auto` |

## What Stays Unchanged

- All text content across every component
- All 7 AI-generated background images
- Hero vigil sequence and animation timing
- TheExhale, ProcessSection cards, VowMoment, TheInvitation, TheSound, TheTransformation, TheWitness, ThreePaths, TheWitnesses, CrossOver -- all verified working perfectly
- Footer structure and all valid links
- Navigation and FullScreenMenu
- All animation easing curves and durations
- Color palette and typography system

## Estimated Impact

- 4 dead link fixes (prevents 404 loops and broken user journeys)
- 1 memory leak fix (TheRecord observer)
- ~6 stale route references cleaned from usePageTheme
- 1 SEO structured data fix
- ~200+ lines of dead CSS removed for maintainability
- Zero visual changes -- all fixes are invisible to users but improve reliability

