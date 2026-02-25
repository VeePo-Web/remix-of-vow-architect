

# Simplify Navigation and Site Structure

## Current State

The site has 7 navigation items (Home, Services, About, Gallery, FAQ, Listen, Contact) plus separate legal pages. The user wants to reduce this to 5 core pages: **Home, Services, About, Contact, Case Studies** -- plus legal pages.

## Changes

### 1. Simplify the FullScreenMenu (`src/components/FullScreenMenu.tsx`)

Update the menu items array from 7 items to 5:

```text
01  Home        /weddings
02  Services    /services
03  About       /about
04  Case Studies /gallery
05  Contact     /contact
```

Note: "Case Studies" replaces "Gallery" and reuses the existing `/gallery` route and `Proof` page component. The FAQ and Listen pages are removed from primary navigation.

### 2. Simplify the MinimalHeader scroll nav (`src/components/MinimalHeader.tsx`)

Update the `navLinks` array from `[Services, About, FAQ]` to `[Services, About, Case Studies]`:

```text
Services    /services
About       /about
Case Studies /gallery
```

The "Hold My Date" CTA link stays.

### 3. Simplify the Navigation component (`src/components/Navigation.tsx`)

This component is used by subpages (Services, About, Contact, etc.). Update `navItems` to match the new simplified structure:

```text
Home        /weddings
Services    /services
About       /about
Case Studies /gallery
Contact     /contact
```

Remove Gallery, Listen, and FAQ from the nav items.

### 4. Update the Footer (`src/components/Footer.tsx`)

Update "Quick Links" to match the new 5-page structure:

```text
Services    /services
About       /about
Case Studies /gallery
Contact     /contact
```

Remove Gallery, Listen, and FAQ links from the footer.

### 5. Update App.tsx routes

- Add redirects for removed pages so old links don't break:
  - `/faq` redirects to `/weddings`
  - `/listen` redirects to `/weddings`
- Keep all existing routes functional (the pages still exist, they're just not in navigation)
- The `/gallery` route stays and renders the Proof/Case Studies page

### 6. What stays unchanged

- All page components remain in the codebase (no deletions)
- All legal pages stay as-is
- The Gateway page (`/`) stays as the entry point
- All visual design, animations, and content remain untouched
- The "Hold My Date" CTA remains in both header and nav

