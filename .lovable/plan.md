
# Round 36 — Footer Navigation Alignment and Full-Site Nav Consistency Audit

## Problem

The footer navigation still uses outdated labels and an incomplete page list from before the Round 33-35 navigation overhaul:

1. **Footer "Navigate" section** shows only 4 links: Services, About, Case Studies, Contact
   - "Services" should be "Pricing" (matching header and menu)
   - "Case Studies" should be "Proof" (matching header and menu)
   - Missing: FAQ, Listen (added to menu in Round 33 but never to footer)

2. **Footer email** shows `ParJorFraGaw@gmail.com` in two places, while the full-screen menu shows `parker@parkergawryletz.com` -- inconsistent contact info

3. **Footer location** says "Banff, Alberta" and "Calgary Region" while the menu says "Calgary, Cochrane, Canmore & Banff" -- different phrasing

## 3-Step Fix

### Step 1: Align Footer Navigation Labels and Links

**File:** `src/components/Footer.tsx`

Update the "Navigate" list to match the full-screen menu's 7 pages (minus Home, which is the logo click):

| Current | Updated |
|---------|---------|
| Services (`/services`) | Pricing (`/services`) |
| About (`/about`) | About (`/about`) |
| Case Studies (`/gallery`) | Proof (`/gallery`) |
| Contact (`/contact`) | FAQ (`/faq`) |
| -- | Listen (`/listen`) |
| -- | Contact (`/contact`) |

This ensures every navigable page is reachable from the footer -- standard best practice for accessibility and SEO.

### Step 2: Unify Contact Information

**File:** `src/components/Footer.tsx`

Update the email address in both the social icons `mailto:` link and the "Reach Me" section to use `parker@parkergawryletz.com` -- matching the full-screen menu. Update the location text to match the menu: "Calgary, Cochrane, Canmore and Banff".

### Step 3: Unify Full-Screen Menu Email

**File:** `src/components/FullScreenMenu.tsx`

Verify the email matches (it already shows `parker@parkergawryletz.com`). No change needed here -- this step is a confirmation audit only.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `Footer.tsx` | Update nav labels (Pricing, Proof) and add FAQ + Listen links |
| 2 | `Footer.tsx` | Unify email to `parker@parkergawryletz.com` and location text |
| 3 | `FullScreenMenu.tsx` | Audit only -- already consistent |

## What This Achieves

- Every navigation surface (header, menu, footer, mobile bar) uses identical labels and routes
- All 7 pages are accessible from the footer for SEO and accessibility
- Contact information is consistent site-wide
- Zero new components or dependencies -- label and text changes only
