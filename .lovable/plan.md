

# Contact Pages Luxury Overhaul — hickoryandrose Quality

## Current State Audit — What's Cheap

### Weddings Contact (`/contact`)
1. **Multi-step complexity** — 3 steps with visible progress indicators feels like a SaaS onboarding flow, not a luxury inquiry
2. **BentoSelector component** — Grid tiles with checkmarks feel product-y, not editorial
3. **Sidebar clutter** — Reassurance lines with em-dashes + testimonial + SLA timeline creates visual noise
4. **Generic success state** — ContactFormSuccess uses shimmer semicolon but lacks hickoryandrose's celebratory restraint
5. **File upload UI** — Inline file attach with X icon feels like Gmail, not refined
6. **Step indicator** — "1 / 3" fraction feels operational, not atmospheric

### Events Contact (`/events/contact`)
1. **Same BentoSelector issue** — Occasion + duration grids look transactional
2. **Two-step wizard** — Still feels like a process vs. a conversation
3. **Generic success semicolon** — Copy lacks warmth and specificity

### Teaching Contact (`/teaching/contact`)
1. **Single-step simplicity is good** — But form card lacks material depth
2. **Missing atmospheric warmth** — Background too stark, needs more grain/glow
3. **Success state too simple** — Misses opportunity for emotional resonance

## hickoryandrose Luxury Patterns (from Inquire.tsx)

### What Makes It Premium:
1. **Single-page wizard with invisible steps** — No visible "step 2 of 4", just smooth content transitions with AnimatePresence
2. **Editorial left-column imagery** — Sticky image with gold corner accents (appears on hover), large watermark text behind
3. **Borderless inputs** — Only bottom border (`border-b`), no box containers
4. **Gold gradient accents** — Subtle `linear-gradient(135deg, hsl(var(--gold) / 0.5), ...)` on numerals and CTAs
5. **Pill selectors** — Simple border buttons, not card grids
6. **Minimal step indicator** — Small dots or labeled "About You" / "Wedding Details" with no fractions
7. **Trust signals below form** — "48hr / 100% / Free" stats in centered row, not sidebar list
8. **Celebration page** — Dedicated `InquireCelebration` component (likely full-page with animation)
9. **Parallax hero** — Cinematic image with overlay text + gold frame inset
10. **Typography hierarchy** — `font-serif-wedding` for headlines, `font-sans-wedding` for labels (small caps, 0.18em tracking)

## Proposed Luxury Replacement Architecture

### Phase 1: Foundation Components

**Create:** `src/components/ui/luxury-input.tsx`
```tsx
// Borderless input with bottom gold-gradient focus
<input className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/60 
  focus:border-transparent focus:outline-none transition-colors duration-300
  font-sans text-base text-foreground font-light
  placeholder:text-muted-foreground/40" />
// Gold focus line appears via ::after pseudo-element
```

**Create:** `src/components/ui/pill-selector.tsx`
```tsx
// Simple button pills (no card backgrounds)
<button className={cn(
  "px-5 py-2.5 text-xs tracking-[0.12em] uppercase font-light border transition-all duration-200",
  selected ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border/60 hover:border-primary/40"
)} />
```

**Create:** `src/components/ContactCelebration.tsx`
```tsx
// Full-page success state with breathing golden semicolon, warm message, "What happens next" timeline
// Similar to InquireCelebration but brand-aligned
```

### Phase 2: Weddings Contact Overhaul (`/contact`)

**New Structure:**
1. **Remove 3-step wizard** → Single scrollable form with invisible section reveals
2. **Replace BentoSelector** → Use PillSelector for vibe + guest count
3. **Remove sidebar** → Move trust signals to bottom (centered row)
4. **Replace step indicator** → Small "Your day" / "The sound" labels at top (no fractions)
5. **Replace file upload** → Text link only, no X icon UI
6. **Success state** → Redirect to ContactCelebration page with personalized copy

**Layout:**
```tsx
<section className="py-16 md:py-24">
  <div className="container max-w-4xl">
    {/* Centered header */}
    <div className="text-center mb-12">
      <p className="overline text-primary/60 mb-2">The Crossing</p>
      <h1 className="font-display text-4xl font-light">Every arrangement begins with a conversation.</h1>
      <p className="p-lead text-muted-foreground mt-6">Tell me about your day — I will respond within 24 hours.</p>
    </div>

    {/* Single form card */}
    <div className="p-10 bg-card/40 backdrop-blur-[8px] rounded-lg max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Essentials */}
        <div>
          <p className="font-overline text-primary/60 mb-4">About Your Day</p>
          <div className="space-y-6">
            <LuxuryInput label="First & last name" id="name" required />
            <LuxuryInput label="Email address" id="email" type="email" required />
            <div className="grid sm:grid-cols-2 gap-6">
              <LuxuryInput label="Event date" id="date" type="date" />
              <LuxuryInput label="Venue name + location" id="venue" placeholder="Silvertip Resort, Canmore" />
            </div>
          </div>
        </div>

        {/* Section 2: The Sound */}
        <div className="pt-6 border-t border-border/20">
          <p className="font-overline text-primary/60 mb-4">Shape the Sound</p>
          <div className="space-y-6">
            <div>
              <label className="font-overline text-muted-foreground mb-3 block">Ceremony vibe</label>
              <PillSelector options={vibeItems} value={vibe} onChange={setVibe} />
            </div>
            <div>
              <label className="font-overline text-muted-foreground mb-3 block">Guest count</label>
              <PillSelector options={guestItems} value={guests} onChange={setGuests} />
            </div>
          </div>
        </div>

        {/* Section 3: Optional extras (collapsed by default) */}
        {!showExtras ? (
          <button type="button" onClick={() => setShowExtras(true)} 
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
            Add ceremony time or song requests
          </button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <LuxuryInput label="Ceremony start time" id="time" type="time" />
            <LuxuryTextarea label="Song requests or ceremony vision" id="notes" rows={3} placeholder="Song requests, meaningful moments..." />
          </div>
        )}

        {/* Submit */}
        <div className="pt-6 border-t border-border/20">
          <button type="submit" className="w-full px-10 py-4 bg-primary text-primary-foreground 
            text-xs tracking-[0.18em] uppercase font-light hover:bg-primary/90 transition-all
            relative overflow-hidden group">
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, hsl(var(--vow-yellow) / 0.15), transparent 60%)' }} />
            <span className="relative z-10">Hold My Date</span>
          </button>
          <p className="text-xs text-muted-foreground/40 mt-4 text-center font-light">
            You will receive a personalized ceremony plan within 24 hours.
          </p>
        </div>
      </form>
    </div>

    {/* Trust signals — centered row below form */}
    <div className="mt-12 grid grid-cols-3 gap-4 text-center max-w-2xl mx-auto">
      {[
        { value: "24hr", label: "Response Time" },
        { value: "100%", label: "Response Rate" },
        { value: "Free", label: "Ceremony Plan" },
      ].map((stat, i) => (
        <div key={stat.label}>
          <p className="font-display text-xl text-foreground/50 font-light">{stat.value}</p>
          <div className="w-4 h-px mx-auto my-1.5 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          <p className="text-[0.5rem] tracking-[0.15em] uppercase text-muted-foreground/30">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Phase 3: Events/Teaching Contact Simplification

**Events (`/events/contact`):**
- Same single-form pattern
- Replace BentoSelector with PillSelector
- Remove 2-step wizard
- Simplify to: Name/Email/Date/Venue → Occasion pills → Duration pills → Optional notes → Submit

**Teaching (`/teaching/contact`):**
- Already simple (keep structure)
- Enhance form card material (increase blur to 12px, add inset gold border glow)
- Upgrade success state to full celebration page
- Add trust signals below form

### Phase 4: Success State — ContactCelebration Component

**Create:** `src/components/ContactCelebration.tsx`
```tsx
export function ContactCelebration({ vertical = "weddings" }: { vertical?: "weddings" | "events" | "teaching" }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ 
        background: 'radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.03), transparent 60%)'
      }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 animate-fade-in">
        {/* Breathing semicolon */}
        <span className="inline-block font-display text-[80px] font-light text-primary mb-8"
          style={{
            textShadow: '0 0 30px hsl(var(--vow-yellow) / 0.5), 0 0 60px hsl(var(--vow-yellow) / 0.2)',
            animation: 'semicolon-success-glow 6s ease-in-out infinite'
          }}>
          ;
        </span>

        <h1 className="font-display text-4xl font-light text-foreground mb-6">
          Your details have been received.
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          {vertical === "weddings" && "I will send a personalized ceremony plan within 24 hours — repertoire suggestions, timeline, and clarity for your day."}
          {vertical === "events" && "I will send a tailored proposal within 24 hours — venue considerations, repertoire, and logistics for your gathering."}
          {vertical === "teaching" && "I will write back within 24 hours — not with a sales pitch, but with a question or two of my own."}
        </p>

        {/* What happens next timeline */}
        <div className="border-t border-border/20 pt-10 max-w-md mx-auto">
          <p className="font-overline text-primary/60 mb-6">What Happens Next</p>
          <div className="space-y-4 text-left">
            {[
              { time: "Within 24 hours", action: "You receive a personalized response" },
              { time: "Day 2", action: "We schedule a 15-minute clarification call (optional)" },
              { time: "Day 3–5", action: "You receive a final plan with all details confirmed" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-display text-lg font-light text-primary/50 mt-0.5 shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--primary) / 0.3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{step.time}</p>
                  <p className="text-xs text-muted-foreground/60 font-light">{step.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return link */}
        <div className="mt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

## Files to Modify/Create

**New Components:**
1. `src/components/ui/luxury-input.tsx` — Borderless input with gold focus
2. `src/components/ui/pill-selector.tsx` — Simple button pills
3. `src/components/ContactCelebration.tsx` — Full-page success state

**Updated Pages:**
1. `src/pages/Contact.tsx` — Remove wizard, BentoSelector, sidebar; add PillSelector + trust signals
2. `src/pages/EventsContact.tsx` — Same pattern
3. `src/pages/TeachingContact.tsx` — Enhance form card material + success redirect

**Deprecated Components:**
1. `src/components/ContactFormSuccess.tsx` — Replace with ContactCelebration redirect
2. `src/components/ContactSLATimeline.tsx` — Merge into trust signals row
3. `src/components/BentoSelector.tsx` — Replace with PillSelector (keep for other pages if needed)

## Success Criteria

**Before:**
- Multi-step wizards with visible progress
- Card grid selectors
- Sidebar clutter
- Generic success overlays

**After:**
- Single scrollable form with invisible section reveals
- Simple pill selectors
- Centered trust signals below form
- Full-page celebration with breathing semicolon + timeline
- Gold gradient accents on CTAs + numerals
- Borderless inputs with bottom gold focus line

**Measurement:**
- Form completion time should decrease (fewer steps = lower friction)
- Visual hierarchy matches hickoryandrose editorial luxury
- Success state feels celebratory yet restrained
- Mobile experience simplified (no horizontal scroll from grid cards)

