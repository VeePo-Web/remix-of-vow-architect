

# Round 56 — "The Invitation": Micro-Craft and Interaction Refinement

## Current State

Rounds 53-55 established atmospheric depth (6 light layers), cinematic double-frame, unified credential plaque, semantic reveal choreography, CTA glass pill, fluid typography, improved contrast, async image decoding, and full-section grain. The section is structurally complete and visually rich.

## Critique: What Remains Below Fantasy.co Standard

### 1. Section Label Contrast Too Low
The "The Invitation" label at the top uses `text-white/40` --- the same low contrast that was already corrected for the caption and body text in Round 55. At 40% opacity on a dark background, this falls below comfortable readability. Should match the corrected caption at `/50`.

### 2. Credential Label Contrast Inconsistent
The credential sub-labels ("Ceremonies", "Licensed", "Insured") use `text-white/40`, while the credential values use `text-white/80`. The sub-labels should be raised to `/50` to match the accessibility improvements made elsewhere in the section.

### 3. No `prefers-reduced-motion` Handling for Scroll Reveals
All the `transition-all` reveal animations (translate + opacity) lack a reduced-motion fallback. Users who prefer reduced motion still get `translate-y` movement. The section should detect reduced motion and skip the translate transforms, showing only instant opacity changes.

### 4. Headline `textWrap: 'balance'` Has No TypeScript Safety
The `textWrap: 'balance'` is cast with `as any` which suppresses type checking. This is a minor code quality issue --- it should use a proper `React.CSSProperties` extension or be applied via a CSS class instead.

### 5. Golden Rules Lack `will-change` for Scale Animation
The three golden rule dividers animate `scale-x` on reveal but don't hint `will-change: transform` to the browser. Adding this promotes the elements to their own compositing layer for smoother animation, then removes it after transition completes.

---

## 5-Step Implementation Plan

### Step 1: Harmonize All Low-Contrast Text to `/50`

Update the section label from `text-white/40` to `text-white/50` and the credential sub-labels from `text-white/40` to `text-white/50`. This creates a consistent "whispered but readable" tier across all secondary text in the section.

**File**: `TheInvitation.tsx` --- update className on the label `<p>` (line 96) and the credential label `<span>` (line 313).

### Step 2: Add Reduced-Motion Fallback for Reveals

Add a CSS rule that targets `@media (prefers-reduced-motion: reduce)` and removes all `translate-y` transforms within `#the-invitation`, making reveals instant opacity-only. This respects user accessibility preferences without requiring changes to the component logic.

**File**: `index.css` --- add a media query block near the existing invitation styles.

### Step 3: Replace `textWrap` Inline Cast with CSS Class

Create a `.text-balance` utility class in the CSS that applies `text-wrap: balance` and remove the inline `style={{ textWrap: 'balance' as any }}` from the headline. This eliminates the TypeScript `as any` cast and keeps styling in CSS where it belongs.

**File**: `index.css` --- add `.text-balance { text-wrap: balance; }` utility.
**File**: `TheInvitation.tsx` --- add `text-balance` to the headline className and remove the `textWrap` from the style prop.

### Step 4: Add `will-change` Hint to Golden Rules

Add `will-change: transform` to the three golden rule `<span>` elements via their style prop. This is a lightweight performance hint that helps the browser optimize the `scale-x` reveal animation. Since these are one-shot animations, the hint is acceptable.

**File**: `TheInvitation.tsx` --- add `willChange: 'transform'` to the style objects of the three golden rule spans.

### Step 5: Add `aria-label` to Credential Plaque for Screen Readers

The credential plaque container has no semantic label. Screen readers encounter three stat blocks with no context. Add `role="group"` and `aria-label="Professional credentials"` to the plaque container so assistive technology users understand the purpose of the data.

**File**: `TheInvitation.tsx` --- add `role="group"` and `aria-label` to the plaque wrapper div.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | Consistent `/50` contrast on labels |
| 2 | `index.css` | Reduced-motion fallback for reveals |
| 3 | `index.css`, `TheInvitation.tsx` | `text-balance` CSS class |
| 4 | `TheInvitation.tsx` | `will-change` on golden rules |
| 5 | `TheInvitation.tsx` | Aria semantics on credential plaque |

## What This Achieves

- Every secondary text element in the section shares a consistent contrast tier
- Users who prefer reduced motion see clean instant reveals without jarring translate animations
- TypeScript code is clean with no `as any` casts for styling
- Scale animations are GPU-promoted for smoother rendering
- Screen reader users understand the credential data in context

