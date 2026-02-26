

# Round 34 — Fix Broken Navigation Routes and Menu Alignment

## Problem

Round 33 introduced a full-screen menu with 7 items, but 3 of those items link to routes that **redirect away** instead of serving their actual pages:

- `/faq` redirects to `/weddings` (but `FAQ.tsx` component exists)
- `/listen` redirects to `/weddings` (but `Listen.tsx` component exists)  
- `/proof` redirects to `/gallery` (but menu should use `/gallery` directly)

This means clicking "FAQ", "Listen", or "Proof" in the menu sends users to the wrong page.

Additionally, the header `navLinks` still show the old set (Services, About, Case Studies) rather than aligning with the updated menu structure.

## 3-Step Fix

### Step 1: Fix Router to Serve FAQ and Listen Pages

**File:** `src/App.tsx`

Change the `/faq` and `/listen` routes from redirects to actual page renders:

```
/faq    -> <FAQ />         (was: Navigate to /weddings)
/listen -> <Listen />      (was: Navigate to /weddings)
```

These components already exist and are imported. The redirects were likely placeholders from an earlier build.

### Step 2: Fix FullScreenMenu Route References

**File:** `src/components/FullScreenMenu.tsx`

Update `menuItems` to use routes that actually resolve:

| Current href | Fix to | Reason |
|---|---|---|
| `/weddings` | `/weddings` | Correct (keep) |
| `/services` | `/services` | Correct (keep) |
| `/about` | `/about` | Correct (keep) |
| `/proof` | `/gallery` | `/proof` redirects to `/gallery` -- use the canonical route |
| `/faq` | `/faq` | Now serves FAQ page (after Step 1) |
| `/listen` | `/listen` | Now serves Listen page (after Step 1) |
| `/contact` | `/contact` | Correct (keep) |

Also update the active-page matching to handle the home route correctly. Currently `location.pathname === item.href` won't match `/` against `/weddings`. Add a check: if on `/weddings`, also consider `Home` active.

### Step 3: Align Header NavLinks with Site Structure

**File:** `src/components/MinimalHeader.tsx`

Update `navLinks` to reflect the complete site structure more accurately. The current set (Services, About, Case Studies) is reasonable for the compact header bar -- no change needed to the labels themselves, but ensure `/gallery` label says "Proof" to match the menu, since that's the actual page name.

```
{ to: "/services", label: "Pricing" }     // was "Services"
{ to: "/about",    label: "About" }        // keep
{ to: "/gallery",  label: "Proof" }        // was "Case Studies"
```

This aligns the header labels with the full-screen menu labels for consistency.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `src/App.tsx` | Serve FAQ and Listen pages instead of redirecting |
| 2 | `src/components/FullScreenMenu.tsx` | Fix `/proof` to `/gallery`, add home route matching |
| 3 | `src/components/MinimalHeader.tsx` | Rename nav labels to match menu (Pricing, Proof) |

## What This Achieves

- All 7 menu items navigate to their correct pages -- no broken redirects
- Header labels match full-screen menu labels -- consistent navigation language
- FAQ and Listen pages become accessible for the first time via navigation

