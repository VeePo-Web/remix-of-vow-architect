
# Audit: ProcessSection Still Uses Hand-Rolled IntersectionObserver

## Finding

During the scroll-reveal refactor, ProcessSection was excluded because it observes two separate elements (introRef and closingRef) within the same section. However, this means it still carries 22 lines of manual `IntersectionObserver` boilerplate (lines 78-100) including its own `prefers-reduced-motion` check, which duplicates logic already centralized in `useScrollReveal`.

The existing `useScrollReveal` hook can be called multiple times in a single component — each call creates its own ref and visibility state. This is the standard React hooks pattern.

## The Refinement

Replace the manual observer block in ProcessSection with two `useScrollReveal` calls, one for the intro and one for the closing block.

### Technical Changes

**File: `src/components/process/ProcessSection.tsx`**

**1. Replace imports (line 1):**

Current:
```tsx
import { useEffect, useRef, useState } from 'react';
```

New:
```tsx
import { useRef } from 'react';
```

Add import:
```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
```

**2. Replace state and observer logic (lines 71-100):**

Remove:
- `const sectionRef = useRef<HTMLElement>(null);`
- `const [introVisible, setIntroVisible] = useState(false);`
- `const [closingVisible, setClosingVisible] = useState(false);`
- `const introRef = useRef<HTMLDivElement>(null);`
- `const closingRef = useRef<HTMLDivElement>(null);`
- The entire `useEffect` block (lines 78-100)

Replace with:
```tsx
const sectionRef = useRef<HTMLElement>(null);
const { ref: introRef, isVisible: introVisible } = useScrollReveal({ threshold: 0.2 });
const { ref: closingRef, isVisible: closingVisible } = useScrollReveal({ threshold: 0.2 });
```

**3. Update ref assignments (lines 125 and 158):**

The `introRef` and `closingRef` from `useScrollReveal` return `RefObject<HTMLElement>`, which needs to be cast for the div elements. Update the ref assignments:

Line 125: `ref={introRef as React.RefObject<HTMLDivElement>}`
Line 158: `ref={closingRef as React.RefObject<HTMLDivElement>}`

## What Stays Unchanged

All visual design, movement cards, gradient background, ceremony image, animations, section structure, and content. This is purely a boilerplate reduction.

## Expected Impact

- 22 lines of duplicated observer logic removed
- Reduced-motion handling now fully centralized in `useScrollReveal`
- Consistent threshold (0.2) matching the rest of the homepage
- ProcessSection follows the same pattern as all other homepage sections
