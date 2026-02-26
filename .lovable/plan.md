

# Round 35 — Mobile Navigation: Page-Aware Sticky Bar and Touch Piano Keys

## Current State

The desktop navigation is now world-class: header with active page indicators, full-screen menu with spotlight hover, and piano key section nav with golden thread progress. However, mobile users (likely 60%+ of wedding site traffic) get a minimal experience:

1. **MobileStickyBar** shows the same "I would be honored to be there" + "Hold my date" CTA on every page, with no page awareness
2. **PianoKeyNav** is hidden on mobile (`hidden md:flex`) -- mobile users have no section navigation at all
3. On `/contact`, the sticky bar still says "Hold my date" -- redundant when already on the contact page

## 4-Step Implementation

### Step 1: Page-Aware Mobile Sticky Bar

**File:** `src/components/MobileStickyBar.tsx`

Use `useLocation()` to detect the current page and adapt the bar contextually:

| Page | Left text | CTA label | CTA link |
|------|-----------|-----------|----------|
| Home (`/`, `/weddings`) | "I would be honored to be there" | "Hold my date" | `/contact` |
| Pricing (`/services`) | "Find the right presence" | "Hold my date" | `/contact` |
| About (`/about`) | "The witness behind the keys" | "Hold my date" | `/contact` |
| Proof (`/gallery`) | "200+ ceremonies witnessed" | "Hold my date" | `/contact` |
| FAQ (`/faq`) | "Every question, answered" | "Hold my date" | `/contact` |
| Listen (`/listen`) | "Hear what your day could sound like" | "Hold my date" | `/contact` |
| Contact (`/contact`) | Hide the bar entirely (already on the page) | -- | -- |

This gives each page a unique emotional hook while maintaining the single conversion CTA.

### Step 2: Mobile Section Progress Indicator

**File:** `src/components/MobileStickyBar.tsx`

Add a thin (2px) golden progress bar at the top edge of the sticky bar that fills based on scroll depth through the page. This gives mobile users the same "golden thread" orientation that desktop users get from the piano key nav -- without taking extra screen space.

Implementation: Use a scroll listener to calculate `scrollY / (documentHeight - viewportHeight)` as a 0-1 percentage. Render a `div` with `width: ${percentage}%` and the vow-yellow gradient. Transition: `width 100ms linear` for smooth tracking.

### Step 3: Mobile Section Dots (Compact Piano Keys)

**File:** `src/components/PianoKeyNav.tsx`

On mobile (below `md` breakpoint), replace the hidden piano keys with a compact vertical dot indicator on the right edge. Each section gets a small dot (6px diameter). Active dot gets vow-yellow fill. Tapping a dot scrolls to that section.

This preserves the section navigation concept on mobile without the visual weight of full piano keys. The dots appear at `right: 8px` to stay within thumb reach on large phones.

CSS changes: Replace `hidden md:flex` with responsive sizing. On mobile, keys become dots via media query or a `useIsMobile()` hook check.

### Step 4: Haptic-Style Tap Feedback on Mobile

**File:** `src/components/PianoKeyNav.tsx`

On mobile dot tap, add a brief scale pulse (1.0 to 1.4 to 1.0 over 200ms) on the tapped dot to provide visual "haptic" feedback since CSS cannot trigger actual device haptics. This mirrors the desktop key press depression effect in a touch-appropriate way.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `MobileStickyBar.tsx` | Page-aware text and contact-page hiding |
| 2 | `MobileStickyBar.tsx` | Golden scroll progress bar at top edge |
| 3 | `PianoKeyNav.tsx` | Mobile dot indicators replacing hidden keys |
| 4 | `PianoKeyNav.tsx` | Tap pulse animation on mobile dots |

## What This Achieves

- Mobile users gain section navigation (dots) and scroll orientation (progress bar) -- matching desktop parity
- Each page feels contextual rather than generic -- the sticky bar speaks to where you are
- Contact page hides the redundant CTA -- respecting the user's current intent
- Zero new dependencies; all changes use existing CSS animation patterns and hooks

