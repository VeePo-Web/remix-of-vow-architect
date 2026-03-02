

# Round 54 — "The Invitation": Final Polish and Mobile Refinement

## Current State

Round 53 added atmospheric depth layers, cinematic double-frame, unified credential plaque, semantic reveal choreography, and CTA glass pill. The section is now structurally complete and visually rich on desktop.

## Critique: What Still Falls Below Fantasy.co Standard

### 1. Mobile Credential Plaque Breaks Layout
The credential plaque uses fixed `px-8` horizontal padding per cell. On viewports below 380px, the three cells overflow or compress text awkwardly. The plaque needs responsive padding and a stacked layout for very small screens.

### 2. Image Frame Outer Outline Invisible on Some Displays
The `outline: 1px solid hsl(var(--vow-yellow) / 0.06)` with `outlineOffset: 4px` is so faint it registers on retina displays but vanishes on standard monitors. This creates inconsistent perceived quality. The opacity should increase slightly to 0.10.

### 3. Section Transition Seams Are Visible
The top fade uses `hsl(240 9% 4%)` and the bottom fade uses `hsl(220 15% 8%)`, but the section body uses `hsl(30 8% 12%)`. These hue mismatches create subtle visible seams where the gradient doesn't blend perfectly into neighboring sections. The fade colors should sample from the actual adjacent section backgrounds.

### 4. Epigraph Line-Height Feels Cramped at Mobile Sizes
The `.invitation-epigraph` uses a fixed `18px` font-size. On mobile, this doesn't scale and the `line-height: 1.7` feels tight when the text wraps to 4+ lines. A fluid `clamp()` size and slightly increased mobile line-height would improve readability.

### 5. No Grain Layer on Section Background
The image frame has a grain overlay, but the section background itself has no grain. This creates a material discontinuity --- the image feels textured and physical while the surrounding space feels digitally flat. A very subtle full-section grain (1-2% opacity) would unify the material language.

---

## 5-Step Implementation Plan

### Step 1: Make Credential Plaque Responsive

Add a responsive breakpoint so that on screens below `sm` (640px), the plaque cells reduce padding from `px-8` to `px-5` and the stat font-size drops from `text-2xl` to `text-xl`. Below 380px, stack the cells vertically with horizontal golden dividers instead of vertical ones. This ensures the plaque never overflows.

**File**: `TheInvitation.tsx` --- update credential cell classes with responsive variants (`px-5 sm:px-8`, `text-xl sm:text-2xl`). Add a `flex-col sm:flex-row` on the plaque container. Change dividers to render as `w-10 h-px` on mobile vs `w-px h-10` on desktop using responsive classes.

### Step 2: Strengthen Outer Frame Outline

Increase the outer outline opacity from `0.06` to `0.10` and adjust the `outlineOffset` from `4px` to `6px` for slightly more breathing room. This makes the double-frame treatment perceptible across all display types without being heavy.

**File**: `TheInvitation.tsx` --- update the `outline` and `outlineOffset` style values on the image frame div.

### Step 3: Fix Section Fade Seams

Update the top gradient to sample from the actual previous section's background color (the VowMoment section uses near-black `hsl(240 9% 4%)`). Update the bottom gradient to match the next section (TheSound, which uses `hsl(220 15% 6%)`). Verify these match by checking the adjacent components.

**File**: `TheInvitation.tsx` --- update the `background` values on the top and bottom fade divs.

### Step 4: Make Epigraph Typography Fluid

Change `.invitation-epigraph` from fixed `18px` to `clamp(16px, 2.5vw, 18px)` and increase `line-height` to `1.8` for better mobile readability. Also add `text-wrap: balance` to prevent orphaned words.

**File**: `index.css` --- update `.invitation-epigraph` font-size and line-height.

### Step 5: Add Full-Section Grain Layer

Add a grain overlay to the entire section background at 2% opacity, using the existing `.grain` class that is already applied inside the image frame. Position it as an additional absolute layer beneath the content but above the atmospheric glows. This unifies the material feel.

**File**: `TheInvitation.tsx` --- add one more `div` with `className="absolute inset-0 grain opacity-[0.02] pointer-events-none"` after the atmospheric layers.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | Responsive credential plaque layout |
| 2 | `TheInvitation.tsx` | Stronger outer frame outline |
| 3 | `TheInvitation.tsx` | Corrected fade seam colors |
| 4 | `index.css` | Fluid epigraph typography |
| 5 | `TheInvitation.tsx` | Full-section grain layer |

## What This Achieves

- The credential plaque is usable and elegant on all screen sizes down to 320px
- The double-frame treatment is visible on all display types, not just retina
- Section transitions are seamless with no hue-shift seams
- Epigraph text is comfortable to read on mobile with balanced line breaks
- The entire section shares a unified physical "paper" material feel, not just the image

