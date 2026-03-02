
# Round 57 — "The Invitation": Interaction Depth and Focus State Polish

## Current State

Rounds 53-56 established atmospheric depth layers, cinematic double-frame, unified credential plaque with ARIA semantics, fluid typography across all text elements, reduced-motion fallbacks, `will-change` hints on golden rules, `.text-balance` CSS utility, and consistent `/50` contrast tier. The section is structurally complete, accessible, and performant.

## Critique: What Remains Below Fantasy.co Standard

### 1. CTA Has No Touch-Friendly Minimum Size
The "Meet the witness" pill CTA has `padding: 10px 28px` which on mobile with small text can result in a touch target below the recommended 44px minimum height. The pill needs explicit `min-height: 44px` to guarantee comfortable tapping on all devices.

### 2. Image Frame Lacks Hover Interaction
The cinematic portrait frame is static. At Fantasy.co quality, premium image frames respond to hover with a subtle luminance shift --- a barely perceptible brightening of the border glow that signals the image is alive, not a flat poster. This adds the "breathing" material feel.

### 3. Golden Underline on "wrong" Uses `bg-vow-gold` Which May Not Exist
The headline underline uses `bg-vow-gold` class, but the Tailwind config only defines `vow-yellow`. If `vow-gold` is not defined, this underline is invisible. It should use `bg-vow-yellow` or be verified.

### 4. CTA Focus-Visible Ring Could Be Tighter
The `focus-visible` outline uses `outline-offset: 3px` which on a pill shape creates an awkward gap. For rounded pill buttons, `outline-offset: 2px` with `border-radius: inherit` on the outline creates a tighter, more intentional focus ring.

### 5. Credential Plaque Lacks Focus-Within State
If a screen reader user tabs into the credential area, there is no visual feedback. Adding a subtle `focus-within` glow to the plaque container would signal keyboard presence.

---

## 5-Step Implementation Plan

### Step 1: Enforce Touch-Friendly CTA Size

Add `min-height: 44px` and `display: inline-flex; align-items: center;` to `.invitation-cta--pill` in CSS. This guarantees the CTA meets touch target accessibility guidelines on all devices without changing the visual design.

**File**: `index.css` --- update `.invitation-cta--pill` block.

### Step 2: Add Hover Glow to Image Frame

Add a CSS transition on `.invitation-portrait-frame` that subtly increases the border and box-shadow glow opacity on hover. The transition should be 260ms (matching the brand's "comfortable transition" timing). This creates the impression of candlelight flickering brighter as the viewer approaches.

**File**: `index.css` --- add `.invitation-portrait-frame` hover rule after the existing frame declaration.

### Step 3: Fix Golden Underline Color Class

Verify and correct the underline on "wrong" --- change `bg-vow-gold` to `bg-vow-yellow` to match the defined Tailwind color token. This ensures the underline actually renders.

**File**: `TheInvitation.tsx` --- update className on the underline span.

### Step 4: Tighten CTA Focus Ring

Update `.invitation-cta:focus-visible` to use `outline-offset: 2px` and add `border-radius: 100px` to the outline so it follows the pill shape. This creates a more polished, intentional focus indicator.

**File**: `index.css` --- update the focus-visible rule.

### Step 5: Add Focus-Within to Credential Plaque

Add `.invitation-credential-plaque:focus-within` rule with a subtle golden border glow, matching the existing hover state but at reduced intensity. This provides visual feedback for keyboard users navigating through the credentials.

**File**: `index.css` --- add focus-within rule after the existing hover rule.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `index.css` | Touch-friendly CTA minimum size |
| 2 | `index.css` | Image frame hover glow |
| 3 | `TheInvitation.tsx` | Fix underline color class |
| 4 | `index.css` | Tighter pill focus ring |
| 5 | `index.css` | Credential plaque focus-within |

## What This Achieves

- CTA meets WCAG touch target guidelines on all devices
- Image frame feels alive and responsive, not static
- Golden underline on "wrong" is guaranteed to render correctly
- Focus states are polished and intentional for keyboard users
- Credential plaque provides visual feedback for assistive technology navigation
