

# Contact Pages — Deep Luxury Refinement

## What Still Feels Cheap

After visual audit, these elements undermine the luxury positioning:

### 1. Input Fields — Generic Dark Boxes
The `rounded-xl` inputs with `bg-card` look like every dark SaaS form. No visual distinction from a generic template. The `focus-visible:ring-4 focus-visible:ring-primary/70` on inputs is an aggressive 4px ring — too thick, too bright. Textarea has inconsistent ring (`ring-primary/20` vs input's `ring-primary/70`).

**Fix:** Reduce input border-radius to `rounded-lg` (8px — more editorial, less "app"). Unify focus ring to `ring-2 ring-primary/30` (subtle, not screaming). Add a bottom-border-only variant feel by making the default border nearly invisible (`border-border/30`) and letting the bottom edge be slightly more defined. This creates a "floating label" editorial feel without changing the HTML structure.

### 2. Form Card — `card-sacred card-keyline` Still Reads as a Box
The form sits in a visible bordered card with backdrop blur. On a dark atmospheric page, the card border creates a hard rectangle that breaks the atmospheric immersion.

**Fix:** Remove the visible border on the form card. Keep the backdrop blur but make the card nearly transparent — `bg-card/40 border-transparent`. The form floats in atmosphere rather than sitting in a box. The sidebar keeps its subtle border for contrast.

### 3. Breadcrumbs — Cheap "Home > Contact" Pattern
The `ChevronRight` breadcrumb with "Home > Hold Your Date" at the top is a utilitarian navigation pattern that breaks the emotional entry. No luxury brand puts breadcrumbs on a conversion page.

**Fix:** Remove breadcrumbs from all three contact pages. The header navigation is sufficient. The overline label ("The Crossing" / "The Conversation" / "The First Note") already establishes context.

### 4. Step Indicator Dots — Generic Progress Pattern
The three dots with connecting lines look like a checkout stepper. Too ecommerce.

**Fix:** Replace dots with a minimal typographic step counter: just the step label text, with a subtle `1 / 3` fraction in monospace beside it. `font-display italic` for the label, `font-mono text-[10px] text-muted-foreground/40` for the fraction. Clean and editorial.

### 5. "Continue" Button with ChevronRight Icon
The chevron arrow on the Continue button is a generic UI pattern. The button text itself is sufficient.

**Fix:** Remove `ChevronRight` from Continue buttons across all contact pages. Just "Continue" — clean. Same for removing `ChevronLeft` from Back buttons — just "Back."

### 6. Input Labels — Sans-Serif, Bold, Generic
Labels like "First & last name" in sans-serif `font-medium` look like any form. No editorial character.

**Fix:** Keep labels in sans-serif (they're functional) but reduce weight and add subtle letter-spacing: `text-xs tracking-wide uppercase text-muted-foreground` — matching the `.overline` style used elsewhere. This creates consistency with the brand's typographic system.

### 7. The SLA Timeline Section — Disconnected, Heavy
The "What happens after you reach out" section below the form is a separate full-width band that feels like a different page. On mobile it's especially disconnected — you finish the form, pass the footer, and find this timeline.

**Fix:** Move the SLA timeline content INTO the sidebar on desktop (below the testimonial). On mobile, place it below the form card but within the same atmospheric section — not as a separate `section--surface` band. Remove the `section--surface` wrapper entirely.

### 8. Sidebar Border Container — Visible Box
The sidebar `border border-border/30 rounded-lg` container is another box. On a dark page with atmospheric layers, these hard edges break immersion.

**Fix:** Remove the border container. Let the reassurance lines float freely with just the golden em-dash markers and dividers. The card boundary is unnecessary — the spatial separation from the form card is sufficient.

### 9. BentoSelector Rounded Corners — Too Rounded
`rounded-2xl` (16px) on bento cards is bubbly and playful — not luxury. Combined with `rounded-xl` inputs, the page has too many soft curves.

**Fix:** Change bento cards to `rounded-lg` (8px). Sharper edges read as more editorial and controlled.

### 10. Events & Teaching — Same Issues Apply
Both pages share the same cheap patterns (breadcrumbs, card borders, input styling). Apply all fixes consistently.

---

## Implementation — 6 Files

### `src/components/ui/input.tsx`
- Change `rounded-xl` → `rounded-lg`
- Change `focus-visible:ring-4 focus-visible:ring-primary/70` → `focus-visible:ring-2 focus-visible:ring-primary/30`
- Change border to `border-border/40`

### `src/components/ui/textarea.tsx`
- Match input styling: `rounded-lg`, `focus-visible:ring-2 focus-visible:ring-primary/30`, `border-border/40`

### `src/components/BentoSelector.tsx`
- Change `rounded-2xl` → `rounded-lg`

### `src/pages/Contact.tsx`
- Remove `Breadcrumbs` import and usage
- Remove `ChevronRight`, `ChevronLeft` from button content
- Change form card to `bg-card/40 border-transparent` (no visible box)
- Replace dot step indicator with typographic `1 / 3` fraction + italic label
- Remove sidebar border container — let items float with dividers only
- Move SLA timeline into sidebar (desktop) / inline after form (mobile) — remove separate `section--surface` wrapper
- Change label styling to uppercase tracking

### `src/pages/EventsContact.tsx`
- Remove `Breadcrumbs` and `ChevronRight` icon usage
- Remove card borders, match form card transparency
- Remove sidebar border container
- Replace step dots with fraction + label pattern
- Match label styling

### `src/pages/TeachingContact.tsx`
- Remove `Breadcrumbs`
- Remove form card visible border
- Match label styling

