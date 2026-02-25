

# Audit: Scroll-Triggered Fade Masks for Track List

## Finding

The panel already has top and bottom fade masks (lines 262-269 and 346-353) implemented as `sticky` positioned divs with linear gradients from `rich-black` to `transparent`. However, they are always visible regardless of scroll position. This creates two problems:

1. **Top mask shows on load** even though the list starts at the top -- there is nothing to fade into, so the gradient feels like a visual artifact rather than a functional cue.
2. **Bottom mask persists when scrolled to the end** -- the user has reached the last track, but the gradient still implies more content below.

World-class scroll containers (Apple Music, Spotify desktop, Linear) only show fade masks when there is content in that direction. The mask appears as a scroll-awareness signal and disappears when the edge is reached. This is the difference between "decorative gradient" and "intelligent spatial cue."

## The Refinement

Track scroll position within the scroll container using an `onScroll` handler and `useRef`. Derive two booleans:

- `canScrollUp`: `scrollTop > 2` (2px threshold to avoid sub-pixel flicker)
- `canScrollDown`: `scrollTop + clientHeight < scrollHeight - 2`

Apply these as opacity values to the existing fade mask divs, transitioning with `180ms ease-out` to match the panel's motion language.

### Technical Changes in `src/components/PianoPanel.tsx`

**1. Add scroll state (inside the component, near existing refs):**
- Add `const scrollRef = useRef<HTMLDivElement>(null)`
- Add `const [canScrollUp, setCanScrollUp] = useState(false)`
- Add `const [canScrollDown, setCanScrollDown] = useState(false)`

**2. Add scroll handler:**
- Create a `handleScroll` callback that reads `scrollRef.current.scrollTop`, `clientHeight`, and `scrollHeight` to update the two booleans.
- Attach `onScroll={handleScroll}` to the scroll container div (line 254).
- Also run the check once when `isOpen` changes to `true` (via a `useEffect`) to set the initial state correctly -- the bottom mask should appear on open if the list overflows.

**3. Apply ref to scroll container:**
- Add `ref={scrollRef}` to the scroll container div (line 254).

**4. Update fade mask opacity:**
- Top mask (line 263): Add `opacity: canScrollUp ? 1 : 0` and `transition: "opacity 180ms ease-out"` to the existing style object.
- Bottom mask (line 348): Add `opacity: canScrollDown ? 1 : 0` and `transition: "opacity 180ms ease-out"` to the existing style object.

**5. Add `useState` to imports:**
- Add `useState` to the existing `useEffect, useRef, useCallback` import from React.

## What Stays Unchanged

Fade mask height (h-6), gradient colors, sticky positioning, z-index, pointer-events, all other panel styling, piano strings, caret, audio logic, track data.

