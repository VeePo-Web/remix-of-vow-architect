

# Contact Pages — Luxury Audit & Cheap Element Replacement

## Cheap Elements Identified

### 1. Lucide Icons Used as Decorative Elements
The `CheckCircle2`, `Clock`, `Shield`, `RefreshCw`, `MessageCircle`, `Users` icons are generic Lucide stroke icons — they read as "SaaS dashboard" not "luxury ceremony brand." Every sidebar reassurance card and success state uses these commodity icons as the primary visual signal.

**Fix:** Replace all decorative Lucide icons with brand-native visual elements:
- **Sidebar reassurance items** — Replace icon+card pattern with a minimal text-only list using a thin golden em-dash or semicolon as the list marker (brand motif). Remove the `Card` wrapper entirely — the card-per-line pattern feels like a SaaS pricing page. Replace with a single subtle container holding all reassurance lines separated by fine `border-border/30` dividers.
- **Success states** — Replace `CheckCircle2` with a glowing semicolon (`;`) — the brand's sacred threshold symbol. Render it in `font-display` at ~32px with a subtle `vow-yellow` glow pulse. This is the brand's signature, not a generic check mark.

### 2. Step Indicator — "Step 1 of 2" Label (Events)
Line 167: `Step {step} of 2` reads like a checkout flow. The weddings page has the better pattern (crossfading labels). Events should match.

**Fix:** Replace "Step 1 of 2" with the same crossfading label pattern: "Your gathering" → "The occasion"

### 3. SLA Timeline Component — Numbered Circles
`ContactSLATimeline` uses numbered circles (`w-12 h-12 rounded-full bg-primary/10 border-2 border-primary`) — this is a generic onboarding stepper pattern. Looks cheap.

**Fix:** Replace numbered circles with thin golden vertical thread connecting three time markers. Each step becomes: golden em-dash + time in `font-display` italic + description. No circles, no numbers. The vertical golden thread (1px `bg-primary/20`) runs along the left edge, connecting the steps like the "held breath" line motif used elsewhere.

### 4. Upload Zone — Dashed Border
The file upload zone (line 293) uses `border-2 border-dashed` — this is the default HTML drag-and-drop pattern. Reads as utilitarian.

**Fix:** Replace dashed border with a subtle solid `border-border/40` + inner `bg-card/30` with a single line of text: "Attach a file (PDF, DOCX, JPG, MP3)" as an underlined text-link that triggers the file input. No box, no Upload icon, no dashed border. If a file is selected, show the filename inline with an × to remove.

### 5. Teaching Reassurance Icons
`MessageCircle`, `Clock`, `Users` at 16px are still generic Lucide. The teaching page's minimalism is correct but the icons break the editorial tone.

**Fix:** Replace icons with a simple centered `·` (middle dot) or thin em-dash before each line. Pure typographic list markers, no icons.

### 6. ContactTestimonials Section — Disconnected
The `ContactTestimonials` section sits as a separate full-width band below the form — visually disconnected from the conversion context.

**Fix:** Remove the standalone `ContactTestimonials` section below the form. The sidebar micro-testimonial already serves this purpose. Keep only the `ContactSLATimeline` section (restyled) below the form as the single post-form reinforcement.

---

## Implementation — 6 Files

### `src/components/ContactFormSuccess.tsx`
- Replace `CheckCircle2` with a glowing semicolon in `font-display`
- Add subtle `vow-yellow` glow animation (`box-shadow` pulse, 4s cycle)
- Remove `Mail` and `ChevronDown` icon imports

### `src/pages/Contact.tsx`
- **Sidebar**: Replace 4 icon+Card items with a single container of text lines separated by fine dividers, using `—` em-dash prefix instead of icons
- **Upload zone**: Replace dashed-border box with inline text-link file trigger
- Remove `ContactTestimonials` section (keep SLA only)
- Remove `Upload`, `RefreshCw`, `Clock`, `Shield` icon imports (keep `ChevronRight`, `ChevronLeft`)

### `src/pages/EventsContact.tsx`
- Replace "Step {step} of 2" with crossfading labels ("Your gathering" / "The occasion")
- **Sidebar**: Replace icon+Card pattern with em-dash text list (same as weddings)
- Replace success `CheckCircle2` with glowing semicolon
- Remove `Shield`, `Clock` icon imports

### `src/pages/TeachingContact.tsx`
- Replace `MessageCircle`, `Clock`, `Users` icons with typographic `·` dot markers
- Replace success `CheckCircle2` with glowing semicolon
- Remove all icon imports except none needed

### `src/components/ContactSLATimeline.tsx`
- Replace numbered circles with golden vertical thread + em-dash time markers
- Remove the circle/number pattern entirely
- Use `font-display italic` for time labels

### `src/components/BentoSelector.tsx`
- No changes needed — already refined in previous pass

