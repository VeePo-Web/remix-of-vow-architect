

# Critical Fix: Homepage Completely Broken — All Sections at 0 Height

## Problem

The homepage is catastrophically broken. Every section has `offsetHeight: 0` and the page `scrollHeight` is only 89px. The hero image is visible due to absolute positioning, but all flow-layout sections have collapsed. Additionally, Unicode escape sequences (`\u201C`, `\u201D`, `\u2018`, `\u2019`) are rendering as literal text strings instead of curly quote characters.

## Root Cause Analysis

### Issue 1: CSS Syntax or Cascade Failure
The `index.css` file is 5,877 lines long. The last edit appended new keyframes (`cta-breathe`, `divider-breathe`) and a `@media` block inside an existing `@layer components` block (lines 5845-5877). If this introduced a brace mismatch or CSS parse error, the browser would silently discard large portions of the stylesheet — including the Tailwind utilities that provide `min-h-screen`, `flex`, `py-24`, etc. This would explain why ALL elements collapse to 0 height.

**Fix:** Verify brace matching in `index.css`. The new CSS additions at lines 5845-5877 must be properly nested within the `@layer components` block that opens at line 5379. Count opening and closing braces to ensure they match.

### Issue 2: Unicode Escapes Rendering Literally
In JSX, `\u201C` inside a string (quotes) works correctly. But when written directly in JSX template text (outside quotes), it renders as the literal characters `\u201C`. The files `CrossOver.tsx`, `TheRecord.tsx`, `TheSacredGround.tsx`, and `TheWitnesses.tsx` all have this bug.

**Fix:** Replace all `\u201C` with the actual Unicode character `\u201C` (left double quotation mark) or use `{"\u201C"}` JSX expression syntax. Same for `\u201D`, `\u2018`, `\u2019`, `\u2014`.

## Implementation Steps

### Step 1: Fix CSS Brace Matching in `src/index.css`

Audit the brace structure around lines 5370-5877. The `@layer components` block that opens at line 5379 must have exactly one closing `}` at the very end. Verify that:
- Line 5379: `@layer components {` (opening)
- Line 5877: `}` (closing)
- All intermediate `@keyframes`, `@media`, and selector blocks are properly closed
- No extra or missing braces exist

If the brace count is off, fix it. This single issue could be collapsing the entire stylesheet.

### Step 2: Fix Unicode Escapes in JSX Files

**`src/components/CrossOver.tsx`** (lines 50, 62):
- Change `\u2018TIL DEATH` to `{'\u2018'}TIL DEATH`
- Change `\u201CYour vows deserve` to `{'\u201C'}Your vows deserve`
- Change `to be heard.\u201D` to `to be heard.{'\u201D'}`

**`src/components/TheRecord.tsx`** (lines 107, 110):
- Change `\u201CIf all failsafes fail,` to `{'\u201C'}If all failsafes fail,`
- Change `your remedy is automatic.\u201D` to `your remedy is automatic.{'\u201D'}`

**`src/components/TheSacredGround.tsx`** (line 82):
- Change `\u201CWhere the mountains are` to `{'\u201C'}Where the mountains are`
- Change `your amplifier.\u201D` to `your amplifier.{'\u201D'}`

**`src/components/TheWitnesses.tsx`** (line 78):
- Change `\u201C` to `{'\u201C'}`

### Step 3: Verify Process Section Has Min-Height

Check that the `.process-section` class in `index.css` still has its `min-height: 180vh` rule. Search for it — if it was accidentally removed or broken by the CSS cascade failure, re-add it.

### Step 4: Verify All Sections Render After CSS Fix

After the CSS brace fix, all Tailwind utility classes (`min-h-screen`, `flex`, `py-24`, `section-padding-standard`, etc.) should start applying again, restoring proper heights to all 13 sections.

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Fix CSS brace matching / syntax error causing cascade failure |
| `src/components/CrossOver.tsx` | Fix Unicode escapes to use JSX expressions |
| `src/components/TheRecord.tsx` | Fix Unicode escapes to use JSX expressions |
| `src/components/TheSacredGround.tsx` | Fix Unicode escapes to use JSX expressions |
| `src/components/TheWitnesses.tsx` | Fix Unicode escapes to use JSX expressions |

## Expected Result

- Page scrollHeight returns to ~7500px+
- All 13 sections render at proper heights with correct breathing rhythm
- Curly quotes render as proper typographic characters
- No literal `\u201D` text visible anywhere

