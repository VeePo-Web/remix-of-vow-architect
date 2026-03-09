

# Luxury Polish — Round 6: Decorative Icon Purge in Remaining Components

## Audit Summary

Six components still use generic Lucide icons as decorative section iconography — the exact pattern eliminated from FAQ, Proof, About, and Pricing pages in Rounds 3-5. These are the final holdouts.

Additionally, `ProofBlock.tsx` and `FormSuccess.tsx` appear to be legacy/unused components (superseded by the dedicated `/proof` page sections and `ContactCelebration`), but they still contain icon patterns that would show up in any grep audit.

---

## Priority 1: EventsOccasions — Replace UtensilsCrossed/Church/Wine/Heart

**File:** `src/components/events/EventsOccasions.tsx`

Four occasion cards use `UtensilsCrossed`, `Church`, `Wine`, `Heart` as decorative 24px icons. Replace with gold gradient numerals (01-04) matching the established pattern.

---

## Priority 2: SoundDirectorSection — Replace Piano/Mic/Battery/Clock/FileCheck/Activity

**File:** `src/components/SoundDirectorSection.tsx`

Six kit items use Lucide icons as 24px decorative markers. Replace with gold gradient numerals (01-06) in a compact inline format.

---

## Priority 3: ContactReassuranceCards — Replace DollarSign/RefreshCw/Clock/Shield

**File:** `src/components/ContactReassuranceCards.tsx`

Four reassurance cards use 20px Lucide icons. Replace with gold gradient numerals (01-04).

---

## Priority 4: SetupTimeline — Replace ArrowRight + Numbered Circles

**File:** `src/components/SetupTimeline.tsx`

Uses `ArrowRight` between steps and numbered circles with `bg-primary/10 border-2 border-primary` — a very "SaaS onboarding" pattern. Replace arrows with en-dash connectors and numbered circles with gold gradient numerals.

---

## Priority 5: ProofBlock — Replace Download/ShieldCheck

**File:** `src/components/ProofBlock.tsx`

Uses `Download` icon in a button and `ShieldCheck` as a 28px decorative icon. Replace `ShieldCheck` with gold gradient numeral and remove `Download` icon from button (typography leads).

---

## Priority 6: FormSuccess — Replace CheckCircle2/Calendar/FileText

**File:** `src/components/FormSuccess.tsx`

Uses three Lucide icons as decorative markers. Replace `CheckCircle2` with a breathing semicolon (matching `ContactCelebration`), and remove `Calendar`/`FileText` icons from action buttons.

---

## Summary

- **6 files modified**
- Eliminates the final ~18 decorative Lucide icon instances
- Preserves functional icons: Play/Pause (audio), ChevronRight/ChevronDown (navigation), X (close menu), Mail/Phone/Instagram/Youtube (footer social), Moon/Sun (theme toggle), ArrowLeft (back navigation in ContactCelebration)
- No new dependencies

