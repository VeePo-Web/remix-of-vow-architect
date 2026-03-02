

# Round 55 — "The Invitation": Typographic Fluidity, Accessibility, and Performance Polish

## Current State

Rounds 53-54 delivered atmospheric depth, cinematic framing, responsive credential plaque, unified grain, and fluid epigraph typography. The section is visually rich and structurally sound. This round addresses the remaining craft-level details that separate "very good" from "Fantasy.co standard."

## Critique: What Still Falls Below Fantasy.co Standard

### 1. Assurance Text Is Not Fluid
The `.invitation-assurance` uses a fixed `22px` font-size. On mobile viewports (320-375px), this creates awkward line breaks. It should use `clamp()` like the epigraph and headline already do.

### 2. Low-Contrast Caption and Body Text
The caption uses `text-white/40` (roughly 3:1 contrast on dark backgrounds) and the body text uses `text-white/45`. Both fall below WCAG AA minimum (4.5:1 for normal text). While this is an intentional design choice for the "whispered" aesthetic, increasing to `/50` and `/55` respectively maintains the quiet feel while improving readability.

### 3. Missing `decoding="async"` on Image
The portrait image has `loading="lazy"` but lacks `decoding="async"`, which allows the browser to decode the image off the main thread. A small but meaningful performance optimization for a large hero image.

### 4. CTA Underline Positioning Conflict
The `.invitation-cta::after` pseudo-element sets `bottom: -2px` and `left/right: 28px`, but `.invitation-cta--pill::after` overrides to `bottom: 10px`. The `left/right` values are also set in the base rule, meaning the pill variant relies on cascade order. This should be cleaned up so the pill variant is self-contained.

### 5. Body Text Line-Height Could Be Tighter on Desktop
The body paragraph uses `leading-[1.9]` which is generous. At `text-lg` (18px) on desktop, this creates 34px line-height --- slightly too airy for a single paragraph. `leading-[1.8]` would tighten the paragraph into a more cohesive block while still being comfortable.

---

## 5-Step Implementation Plan

### Step 1: Make Assurance Typography Fluid

Change `.invitation-assurance` font-size from fixed `22px` to `clamp(18px, 3vw, 22px)`. This scales gracefully from mobile to desktop without breaking lines awkwardly.

**File**: `index.css` --- update `.invitation-assurance` font-size value.

### Step 2: Improve Text Contrast for Accessibility

- Update caption from `text-white/40` to `text-white/50` in `TheInvitation.tsx`
- Update body text from `text-white/45` to `text-white/55` in `TheInvitation.tsx`

These are minimal increases that preserve the whispered aesthetic while meaningfully improving readability.

### Step 3: Add `decoding="async"` to Portrait Image

Add `decoding="async"` attribute to the `<img>` element for the portrait. This is a one-line performance improvement that prevents image decoding from blocking the main thread.

**File**: `TheInvitation.tsx` --- add attribute to the img tag.

### Step 4: Clean Up CTA Underline Cascade

Consolidate the `::after` positioning so the base `.invitation-cta::after` only sets shared properties (height, background, transform, transition), and the `--pill` variant sets its own `bottom`, `left`, `right` values. Remove the duplicate `left/right: 28px` from the base rule that only applies to the pill variant.

**File**: `index.css` --- restructure the `::after` rules.

### Step 5: Tighten Body Text Line-Height

Change `leading-[1.9]` to `leading-[1.8]` on the body paragraph. This creates a slightly more cohesive text block on desktop while remaining comfortable for reading.

**File**: `TheInvitation.tsx` --- update the className on the body paragraph.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `index.css` | Fluid assurance font-size |
| 2 | `TheInvitation.tsx` | Improved text contrast |
| 3 | `TheInvitation.tsx` | `decoding="async"` on image |
| 4 | `index.css` | Clean CTA underline cascade |
| 5 | `TheInvitation.tsx` | Tighter body line-height |

## What This Achieves

- All typographic elements are now fluid across all viewport sizes
- Text contrast meets a higher accessibility bar while preserving the whispered design language
- Image decoding is offloaded from the main thread for smoother scroll performance
- CSS cascade is clean and maintainable with no positional overrides relying on source order
- Body paragraph reads as a cohesive unit rather than floating lines

