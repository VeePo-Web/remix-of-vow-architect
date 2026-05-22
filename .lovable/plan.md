
# Navigation & UX Friction Audit — gawryletzmusic.com

Audit only. No code changes proposed in this pass — fixes are scoped for a follow-up build.

---

## 1. Executive Summary — Top 5 Highest-Impact Friction Points

1. **The Gateway (`/`) is a forced choice screen.** Every cold visitor — including the 70%+ arriving from a Google search for "wedding pianist Cochrane" — is dumped onto a black, animated 3-card chooser before they ever see Parker's offer, price, or proof. That is one extra click, one extra decision, and one extra "is this site even what I wanted?" moment for the highest-intent persona (engaged couples). Wedding searchers should land on `/weddings` by default.
2. **"Proof" is the reviews page, but no one knows that.** Cold visitors scan for "Reviews" or "Testimonials." The current label is poetic, not searchable. Estimated to bury social proof for the majority of first-time visitors.
3. **No star rating, review count, or venue logos in the header or above the fold.** Trust signals exist on `/proof` but never travel with the user. A pianist competing against 3 others in adjacent tabs needs a "★ 5.0 · 80+ reviews · 500+ weddings" anchor visible at all times.
4. **The hamburger menu is the ONLY way to reach Pricing/About/FAQ on the `/weddings` cinematic page.** The right-side dots are scene-jumps inside the cinematic, not site nav. New visitors don't recognize "Menu" as the primary nav — they expect a visible top bar with Services / Reviews / Contact.
5. **CTA language changes per page and per vertical** ("Reserve My Date" / "Discuss Your Event" / "Begin the Conversation" / "Step Inside" / "Start a Conversation"). Beautiful, but it makes the primary action feel different every time. Users hesitate because they aren't sure they're clicking the "right" button.

---

## 2. Full Friction Inventory

| # | Location | Friction | Persona | Sev (1–5) | Fix |
|---|----------|----------|---------|-----------|-----|
| 1 | `/` (Gateway) | Forced 3-way choice before any value shown; black void aesthetic feels like a teaser/landing pad, not a business site | Cold couple, venue coordinator | 5 | Make `/weddings` the default landing for organic search. Keep Gateway only as `/start` or for direct `gawryletzmusic.com` typed traffic. Or: collapse Gateway into a slim top-bar selector + put `/weddings` content below the fold. |
| 2 | Gateway copy | "Step Inside" CTA is not a verb a visitor uses; "'Til Death ; Unto Life" tagline is opaque without context | Cold couple | 4 | "See Wedding Packages →" / "View Pricing & Availability →" |
| 3 | Top nav on `/weddings` (CinematicNav) | Only logo + "Menu" hamburger visible. No inline Services/Reviews/Contact links | All | 5 | Add a visible 4-item top nav: Weddings · Pricing · Reviews · Contact. Keep "Menu" as overflow. |
| 4 | Right-side dot nav on `/weddings` | Confused with site nav; actually scene-jumps inside the cinematic | All on desktop | 3 | Add a tiny "Scenes" label above the dots; or move to far-right edge in low contrast so it reads as secondary. |
| 5 | Full-screen menu labels | "Proof," "Listen," "Lesson Plans" mixed in with "About," "FAQ" — inconsistent register | Cold couple | 4 | Rename: Proof → **Reviews**. Listen → **Music Samples**. Lesson Plans → **Lessons**. |
| 6 | Vertical switcher in FullScreenMenu | Buried below contact link at 9px uppercase, 14% opacity (per your own min-opacity 0.60 rule this is a violation) | Teaching parent who lands on `/weddings`, venue coord | 4 | Surface as 3 equal chips at the TOP of the menu, full opacity, with the active one bold. |
| 7 | CTA label inconsistency | 5+ different primary-CTA labels across the site | All | 4 | Standardize to **two** CTAs: "Check My Date" (weddings/events) and "Start Lessons" (teaching). Use everywhere. |
| 8 | Mobile sticky bar | Helpful, but the context line ("I would be honored to be there") is poetic, taking space from the only thing that matters on mobile — the CTA | Mobile couple | 3 | Replace context line with a 2-line trust micro: "★ 5.0 · Cochrane / Calgary" + the CTA. |
| 9 | `/weddings` "Footer reveal button" | Footer is hidden behind a tiny chevron at 95% scroll. Users miss contact info, address, hours, social links entirely | All | 5 | Show the footer normally. The cinematic ending shouldn't gate the footer. |
| 10 | Footer nav | 9-item link list w/ "Proof," "Listen," "Services," "About," "FAQ" mixed — no grouping | All | 3 | Group: **Explore** (Weddings/Events/Teaching) · **Info** (Pricing/Reviews/FAQ/About) · **Contact** (phone/email/form) · **Listen** as a featured side panel. |
| 11 | Pricing → "Services" label | "Services" is generic, doesn't communicate price | High-intent couple | 4 | Rename nav item to **Pricing** (Events vertical: keep "Packages"; Teaching: keep "Lessons"). |
| 12 | No visible phone number anywhere in the header or sticky bar | Mobile couple wanting to call now | High-intent | 4 | Add a tap-to-call icon in the mobile sticky bar and desktop nav. |
| 13 | No availability indicator visible from nav | All wedding personas | 4 | Add a live "Booking 2026 · 2 Sat dates left in Aug" chip in the top nav. (You already have `AvailabilityBadge.tsx`.) |
| 14 | Pricing page has its own JumpNav (Paths / Compare / Add-ons / FAQs / Download) layered under the PricingNav | Stacked sticky bars eat vertical space on mobile | Mobile pricing shoppers | 3 | Collapse JumpNav into the main PricingNav on scroll, or hide on mobile in favor of one accordion. |
| 15 | Contact pages have a different nav, no visible "back to where I came from" | Cold couple second-guessing | 3 | Add a breadcrumb or persistent vertical chip ("← Back to Weddings"). |
| 16 | `/listen`, `/proof`, `/about` use poetic page titles | SEO + sharing | All | 3 | Plain H1 + plain `<title>`: "Reviews & Testimonials," "Music Samples," "About Parker." Keep poetic subheads. |
| 17 | The cinematic scroll homepage takes 15–20 seconds of scroll before key info | Mobile, cellular | All | 4 | Add a "Skip to Pricing" / "Skip Intro" link top-right of the hero. |
| 18 | Color contrast in menu | Inactive vertical-switcher labels at 14% white opacity violate accessibility AA at small text | Low vision, older venue coords | 4 | Raise to ≥60% opacity per your own design rule. |
| 19 | No "★ Google Reviews" badge linked to the actual GBP profile | All | 4 | Add Google rating badge in nav + hero + footer, link to GBP. |
| 20 | Three different theme contexts (dark gateway → light pages → dark cinematic → light pricing) create flash-of-wrong-theme on navigation | All | 2 | Lock theme by route at the router level; preload theme class on `<html>` before paint. |
| 21 | No site search or sitemap link visible | Power user, venue coord | 1 | Add small "Sitemap" link in footer. |
| 22 | Hamburger says "Menu" but the trigger area is small on mobile (<44px high) | Mobile accessibility | 3 | Confirm hit target ≥44×44. |
| 23 | The interactive piano keyboard in the footer is delightful but adds 200+ lines of JS / audio context spin-up that delays footer rendering | Mobile cellular | 2 | Lazy-mount the keyboard on user gesture. |
| 24 | No FAQ visible from homepage; FAQ buried 2 clicks deep | Hesitant couple | 3 | Add top-5 FAQ accordion to bottom of each vertical landing. |
| 25 | Gateway "Coming Soon" treatment exists for cards even though all 3 are `available: true` — dead code that can re-introduce friction | — | 1 | Remove. |

---

## 3. Proposed Simplified Information Architecture

```text
                 gawryletzmusic.com  (default → /weddings)
                            │
   ┌────────────────────────┼─────────────────────────────┐
   │                        │                             │
/weddings              /events                       /teaching
   │                        │                             │
   ├ Pricing               ├ Pricing                     ├ Lessons
   ├ Reviews               ├ Reviews                     ├ Reviews
   ├ Music Samples         ├ Music Samples               ├ Studio Recordings
   ├ FAQ                   ├ FAQ                         ├ FAQ
   ├ About                 ├ About                       ├ About
   └ Contact (Check Date)  └ Contact (Get Quote)         └ Contact (Start Lessons)

Persistent everywhere:
  Top bar:  [Logo] [Weddings · Events · Teaching]  ⭐ 5.0 · 80 reviews   [Check My Date]
  Mobile:   sticky bottom CTA + tap-to-call
  Footer:   3 columns (Explore · Info · Contact) + Google reviews badge
```

**Top-nav wording (final):**

Desktop: `Weddings   Events   Teaching   |   Pricing   Reviews   FAQ   Contact   ★ 5.0`
Mobile: `[Menu]  [⭐ 5.0]  [Check My Date]   [📞]`

---

## 4. Reviews Integration Plan

1. **Rename** `/proof` → `/reviews` (301 redirect from `/proof`). Update nav labels everywhere.
2. **Header chip**: persistent `★ 5.0 (84) Google Reviews` in the top nav, linking to `/reviews`. Also links externally to Google Business Profile via `target=_blank` from `/reviews`.
3. **Hero proof bar**: under every vertical hero, a thin strip with: star rating · # reviews · # weddings performed · 2–3 venue logos.
4. **Inline on `/pricing`**: 3 short testimonials between packages (you have `PricingTestimonials.tsx` — promote it above the fold).
5. **Inline on `/contact`**: 1 short testimonial + venue logos directly under the form so the last thing they see before submitting is proof.
6. **Schema markup**: `AggregateRating` JSON-LD on `/reviews` and homepage. Individual `Review` items per testimonial. Already partially in `index.html` — verify counts match Google.
7. **Fresh reviews widget**: embed the live Google Reviews feed (not just static quotes) on `/reviews` so freshness is visible.
8. **Sticky mobile bar**: replace the poetic context line with `★ 5.0 · Cochrane / Calgary`.

---

## 5. Concrete Copy Changes

| Current | New | Why |
|---|---|---|
| Nav: **Proof** | **Reviews** | Searchability |
| Nav: **Listen** | **Music Samples** | Clear scent |
| Nav: **Services** | **Pricing** | Buyers search for "pricing" not "services" |
| Nav: **Lesson Plans** | **Lessons** | Shorter, matches user mental model |
| Gateway CTA: **Step Inside** | **See Wedding Packages →** | Action + benefit |
| Weddings CTA: **Reserve My Date** | **Check My Date** | Lower commitment, higher click rate |
| Events CTA: **Discuss Your Event** | **Get a Quote** | Direct |
| Teaching CTA: **Begin the Conversation** | **Start Lessons** | Direct |
| Mobile sticky text: "I would be honored to be there" | **★ 5.0 · Cochrane / Calgary / Banff** | Trust beats poetry on mobile |
| Page title `/weddings`: "Parker Gawryletz — Wedding Pianist, Southern Alberta" | Keep — already strong | — |
| Page title `/proof` | "Reviews — Cochrane & Calgary Wedding Pianist" | SEO + clarity |

---

## 6. Phased Rollout

**Phase 1 — Zero-risk wins (ship today, ~2 hours)**
- Rename nav labels: Proof → Reviews, Listen → Music Samples, Services → Pricing
- Add `★ 5.0 (XX) Google Reviews` chip to top nav (links to `/reviews`)
- Standardize CTA labels to "Check My Date" / "Get a Quote" / "Start Lessons"
- Mobile sticky bar: swap poetic text for trust micro
- Show footer by default on `/weddings` (remove gated reveal)
- Add `tel:` button to mobile sticky bar
- Set `/` (Gateway) to redirect search-engine traffic with `?ref=google` UTM to `/weddings`, OR make `/weddings` the canonical homepage and move Gateway to `/start`

**Phase 2 — Structural (1–2 days)**
- 301 redirect `/proof` → `/reviews`
- Add visible top-nav links on cinematic `/weddings` page (not just hamburger)
- Surface vertical switcher chips at top of FullScreenMenu, raise contrast to ≥60%
- Add hero proof bar (rating + reviews + venue logos) to all 3 vertical landings
- Add top-5 FAQ accordion to each vertical landing
- Add "Skip Intro" link to cinematic hero
- Wire live Google Reviews feed on `/reviews`

**Phase 3 — Deeper IA (3–5 days)**
- Re-architect Gateway as either a redirect or a 2-second splash
- Unify the three nav components (CinematicNav / PricingNav / TeachingCinematicNav / EventsCinematicNav) into one configurable `SiteNav` to eliminate per-page drift
- Lock theme by route at router level to kill flash-of-wrong-theme
- Lazy-mount footer piano keyboard
- Add `AggregateRating` + `Review` JSON-LD site-wide
- Add live availability badge ("Booking 2026 — 2 Sat dates left in Aug") to nav, sourced from a small JSON file you can hand-edit

---

## Closing Note

The visual craft on this site is exceptional — it's the strongest editorial pianist site I've audited. The friction isn't aesthetic; it's that the site assumes the visitor already knows Parker is the choice. The fixes above keep every drop of the editorial soul while letting a stranger who Googled "wedding pianist Cochrane" find price, proof, and a booking button in under 10 seconds.

Approve this audit to move to Phase 1 implementation.
