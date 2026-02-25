

# Refinement: Skip Vigil Sequence on Return Navigation (Session-Aware Hero)

## Problem

The vigil sequence (8-second hero animation) replays every time a user navigates to `/weddings`. With the SPA navigation fix now in place, this means:

1. User lands on `/weddings` -- sees the full 6-second vigil (correct)
2. User navigates to `/about` via the menu
3. User returns to `/weddings` -- sees another 6-second black void before any content appears (broken)

The `MinimalHeader` logo and menu button also have `animationDelay: "6200ms"` hardcoded, meaning they disappear for 6.2 seconds on every remount. This makes the site feel broken on return visits.

## Solution

Use `sessionStorage` to track whether the vigil has already played during this browser session. On subsequent visits within the same session, skip directly to the "complete" phase.

## Technical Changes

### File: `src/hooks/useVigilSequence.ts`

At the start of the hook, check `sessionStorage` for a `vigil-complete` flag:

- If the flag exists, immediately return the `isComplete` phase (no timers, no delay)
- If the flag does not exist, run the normal sequence and set the flag when the sequence completes (at the 6000ms mark)

```tsx
export function useVigilSequence(): VigilPhase {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';

  const [phase, setPhase] = useState<VigilPhase>({
    isStillness: !hasPlayed,
    isKindling: false,
    isRevealing: false,
    isComplete: hasPlayed,
  });

  useEffect(() => {
    if (hasPlayed) return; // Already played this session

    // ... existing timer logic ...

    // At the 6000ms mark (revelation complete):
    const revealingTimer = setTimeout(() => {
      setPhase({ ... isComplete: true });
      sessionStorage.setItem('vigil-complete', 'true');
    }, 6000);

    // ...
  }, [hasPlayed]);

  return phase;
}
```

### File: `src/components/MinimalHeader.tsx`

The logo and menu button have `animationDelay: "6200ms"`. This should be conditional:

- If vigil has already played (check `sessionStorage`), set `animationDelay: "0ms"` so the header appears instantly
- If vigil has not played, keep the `6200ms` delay

```tsx
const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
const headerDelay = hasPlayed ? '0ms' : '6200ms';
```

Apply `headerDelay` to both the logo Link (line 42) and the menu button (line 83).

### File: `src/components/HeroTagline.tsx`

Same pattern -- check if this needs a similar conditional delay. The tagline should appear instantly on return visits.

## What Stays Unchanged

All visual design, animation choreography on first visit, section content, gradient transitions, and the full vigil experience for first-time visitors. The sequence still plays on hard refresh or new sessions.

## Expected Impact

- First visit: Full 8-second cinematic vigil experience (unchanged)
- Return navigation within session: Instant page render, no black void
- Header/menu visible immediately on return visits
- The site feels like a fluid, responsive application rather than replaying its intro on every page visit

