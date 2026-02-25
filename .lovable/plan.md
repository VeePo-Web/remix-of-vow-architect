

# Fix: FullScreenMenu SPA Navigation + ProcessSection Dead Code Removal

## Two Changes

### 1. FullScreenMenu: Replace `<a>` with React Router `<Link>`

**File: `src/components/FullScreenMenu.tsx`**

The menu currently uses plain `<a href="...">` tags (line 70-88), causing full-page reloads on every navigation. This destroys the cinematic experience -- the 8-second vigil sequence replays, audio stops, scroll position resets, and the site feels like disconnected pages rather than a fluid application.

**Changes:**
- Add `import { Link } from "react-router-dom";` (line 1 area)
- Replace `<a ... href={item.href}>` with `<Link ... to={item.href}>` on lines 70-88
- The existing `onClick={onClose}` handler stays, ensuring the menu closes before route transition

### 2. ProcessSection: Remove unused `sectionRef`

**File: `src/components/process/ProcessSection.tsx`**

After the previous refactor, `sectionRef` (line 72) is attached to the `<section>` element (line 86) but never observed by any hook or observer. It is dead code.

**Changes:**
- Line 1: Remove `useRef` import (no longer needed)
- Line 72: Remove `const sectionRef = useRef<HTMLElement>(null);`
- Line 86: Remove `ref={sectionRef}` from the `<section>` element

## What Stays Unchanged

All visual design, animations, gradient transitions, copy, imagery, menu styling, staggered reveal timing, escape-key dismissal, body scroll lock, and close button behavior.

## Expected Impact

- Navigation between pages becomes instant (client-side routing)
- The vigil sequence only plays once per session
- 3 lines of dead code removed from ProcessSection
- The site feels like a seamless, app-like experience

