

# VeePo Footer Attribution — Fix URL to veepo.ca

## Issue
The wordmark currently reads "VEEPO" but should read "VEEPO.CA" to distinguish from veepo.com. The link href is already correct (`https://veepo.ca/case-studies`), but the displayed text needs updating.

## Changes — 1 file: `src/components/Footer.tsx`

### 1. Wordmark text (line 365)
Change `VEEPO` → `VEEPO.CA`

The `.CA` distinguishes from veepo.com. Style the `.CA` portion slightly smaller (`text-[16px]`) and at reduced opacity (`opacity-70`) so "VEEPO" remains the dominant read while ".CA" acts as a qualifier — a common premium pattern for domain-based branding.

### 2. No other changes needed
The href, gradient border, brand dot, hover states, and tagline all remain as-is.

