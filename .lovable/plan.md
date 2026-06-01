## Goal

Transform the mobile `/contact` experience into Fantasy.co-tier quality, modeled on the **Fly4Me ContactModal mobile flow**. Desktop layout stays exactly as it is today. Light theme stays. Wedding copy stays. We are only changing how the page **feels and behaves on phones**.

## Why the current mobile form fails

- All four blocks (hero, image, dark form, next-steps) stack into a long monotonous scroll.
- Form is the same dense stacked block as desktop — three big inputs with floating labels visible at once, no rhythm, no progression.
- "Reserve My Date" CTA sits below the keyboard fold on most phones.
- "What happens next" + "Trust stats" + "Testimonial" + "Disclaimer" are all competing for attention below the form — none breathe.
- No keyboard handling, no draft persistence, no inline validation feedback, no haptics-of-progress.

## The Fly4Me pattern we are stealing (mobile only)

One question at a time. The active field is large, alone, and centered. Completed answers collapse into editable one-line summaries above. Upcoming questions sit below as quiet text labels you can tap to jump to. The keyboard never covers the input. Submit only appears once required fields are filled.

```text
┌──────────────────────────────┐
│  Wedding Piano               │  ← micro strap (16vh hero image strip)
│         51° N · Canmore      │
├──────────────────────────────┤
│  ✎ Name      Sarah Chen      │  ← completed summary (tap to edit)
│  ─────────────────────────── │
│                              │
│  Email                       │  ← ACTIVE field (large label)
│  ┌────────────────────────┐ │
│  │ you@email.com          │ │
│  └────────────────────────┘ │
│  Never shared. Never spammed.│
│                              │
│  Your ceremony               │  ← upcoming (muted, tappable)
│  Date (optional)             │
│                              │
│  [ Begin the conversation ↗ ]│  ← sticky bottom, appears when ready
└──────────────────────────────┘
```

## Mobile redesign — section by section

### 1. Header strap (replaces hero + hero image stack)
- Collapse the current 2-section hero into a single **16vh image strip** with a dark gradient overlay.
- Overlay text: eyebrow "Wedding Piano" (left) · location "Canmore · Alberta" (right), both in `pricing-eyebrow` style at 11px / 0.18em.
- Removes ~600px of mobile scroll before the form.

### 2. Headline (above form, inside light section)
- One tight line: **"What deserves the song?"** — `font-display` 32px, max 18ch, animate-fade-up.
- Sub: "Tell me one thing at a time." — 14px muted.
- Remove the current long `contact-lede`.

### 3. Conversational form (the core change)
- New component `ContactConversation.tsx` (mobile-only render, `md:hidden`).
- Field order: `name → email → ceremony (textarea) → date (optional) → venue (optional)`.
- State machine: `activeStep`, `STEP_ORDER`, `hasValue()`, `displayValue()`, `placeholderFor()`, `labelFor()` — mirroring Fly4Me's pattern.
- **Completed** fields render as a one-line `summary()` row with pencil icon, hairline border, tap-to-edit.
- **Active** field renders large: 11px eyebrow label + 24px input, no border-box — bottom hairline that thickens on focus (reuse `.pricing-input` token but scaled up).
- **Upcoming** fields render as 13px muted labels, tappable to jump.
- Enter key on input advances to next step. Optional fields show "Skip" link.
- Inline validation: email shows "Looks right ✓" in vow-yellow on valid blur; errors shake the active field (`field-error` keyframe, 320ms).
- Draft persistence in `sessionStorage` under `vow:contact:draft`. Rate-limit submit to once per 60s in `localStorage`.
- Honeypot field (`company_website`, off-screen) for spam.

### 4. Sticky submit bar
- Fixed bottom, `safe-area-inset-bottom`, 72px tall, paper background with top hairline.
- "Reserve My Date ↗" — `pricing-cta--inverted`, full-width minus 24px gutters.
- Appears (fade-up 240ms) only when name + email + ceremony are filled.
- Above it, micro line: "I respond within 24 hours." (12px, 0.55 opacity).

### 5. Mobile keyboard handling
- `useViewportOffset()` hook reads `visualViewport.height` to push the active field above the keyboard. Same trick Fly4Me uses (`keyboardOffset`).
- Active field auto-scrolls into view 80px from top on focus.

### 6. Trust + testimonial + next-steps (post-submit area)
- **Hide** all of trust-stats / diamond-sep / testimonial / next-steps on mobile while form is active.
- They reappear in the **success state** (`ContactCelebration`), not on the form page itself. Reduces mobile scroll dramatically and removes the "wall of marketing below the form" feeling.

### 7. Success state (mobile-tuned)
- Reuse `ContactCelebration` but pass `compact` prop: drop hero image, headline tightens to 28px, three "What happens next" rows become a single vertical numbered list with hairlines, testimonial appears once below as a quiet quote.

### 8. Motion choreography (mobile only)
- Field transition between steps: outgoing field fades + slides up 8px (180ms), incoming field fades + slides up 12px (260ms, 80ms delay).
- Summary row insertion: fade-up 220ms.
- Sticky CTA: opacity 0→1 + translateY(8px → 0) 280ms when unlocked.
- All gated by `prefers-reduced-motion: reduce` → opacity-only, 160ms.

### 9. Accessibility
- Each step is a `<fieldset>` with `aria-current="step"`.
- Summary rows are real `<button>` with `aria-label="Edit name, Sarah Chen"`.
- Sticky CTA gets `aria-disabled` until requirements met (not visually hidden — disabled is announced).
- Min tap target 44×44 on every interactive element.
- Focus ring: 1px vow-yellow outline + 2px offset on `:focus-visible`.

## Files to touch

- **New:** `src/components/contact/ContactConversation.tsx` — mobile-only conversation form.
- **New:** `src/components/contact/ContactStickyCta.tsx` — sticky submit bar.
- **New:** `src/hooks/useKeyboardOffset.ts` — `visualViewport` tracking.
- **Edit:** `src/pages/Contact.tsx` — render mobile vs desktop branches (`md:hidden` / `hidden md:block`). Desktop block stays byte-identical.
- **Edit:** `src/index.css` — add `.contact-mobile-*` scoped block (~120 lines): strap, active-field, summary row, sticky CTA, field-error shake keyframe.
- **Edit:** `src/components/ContactCelebration.tsx` — accept `compact` prop for mobile success state.

## Out of scope (do not touch)

- Desktop `/contact` (≥768px) — pixel-identical.
- Wedding copy/voice, palette, fonts.
- Supabase edge function `send-contact-email` (form payload shape unchanged).
- `/teaching/contact` and `/events/contact` — same pattern can apply later, this PR is weddings only.

## Acceptance checks

1. iPhone 12 (390×844): only header strap + headline + first active field visible above the fold. No scroll required to start typing.
2. Keyboard open: active input stays visible, sticky CTA hidden behind keyboard (expected), submit possible via Enter on last step.
3. Filling name → email → message reveals sticky CTA with fade-up; tapping it submits.
4. Refresh mid-flow restores draft from sessionStorage.
5. Submitting twice within 60s shows toast "Just a moment — already sent."
6. Desktop (≥768px) renders the current two-column form unchanged.
7. `prefers-reduced-motion`: all slides become opacity fades ≤160ms.

Confirm and I'll build it.
