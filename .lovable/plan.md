

# Fix: "Hear Me Play" Section — Text Alignment and Track Panel Formatting

## Issues Identified

### Text alignment/sizing (TheSound.tsx)
1. **Subhead paragraph** (line 410-418) has `w-full` forcing full container width instead of being naturally constrained — makes the line feel unanchored on wide screens. Also has redundant `text-center` class AND inline `textAlign: 'center'`.
2. **Heading `mb-4`** (16px) between "Hear me play." and the golden rule, then `mb-6` (24px) between rule and subhead — proportionally tight. The rule itself has no vertical breathing.
3. **Subhead `mb-20`** (80px) gap before the genre grid is correct by fitz scale, but the overall intro block floats without a constraining `max-w`.

### Track panel formatting (GenreTrackPanel.tsx)
4. **Panel width** `max-w-2xl` (672px) inside a `max-w-5xl` (1024px) container — panel feels narrow relative to the genre grid above it (`max-w-4xl`, 896px). Creates a jarring width shift.
5. **Track items** use `font-display text-[15px]` — display serif (Cormorant) at 15px is below the locked type scale minimum of 16px body. Should be `text-base` (16px) for legibility.
6. **Header label** `text-[11px]` is below the xs scale (12px). Should be `text-xs`.
7. **Footer text** `text-[11px]` — same issue, below scale minimum.
8. **Track count badge** `text-[9px]` is far below the type scale. Should be `text-[10px]` minimum or `text-xs`.

## Plan

### File 1: `src/components/TheSound.tsx`
- Line 412: Remove `w-full`, keep `text-lg text-center`, remove redundant inline `textAlign`. Add `max-w-md mx-auto` to constrain subhead width.
- Line 391: Change `mb-4` to `mb-5` (20px) for breathing between heading and rule.
- Line 400: Change `mb-6` to `mb-8` (32px) for more space between rule and subhead.

### File 2: `src/components/GenreTrackPanel.tsx`
- Line 64: Change `max-w-2xl` to `max-w-3xl` (768px) so the panel width is proportional to the genre grid above.
- Line 89: Change `text-[11px]` to `text-xs` (12px) for category label.
- Line 95: Change `text-[9px]` to `text-[10px]` for track count.
- Line 128: Change `text-[15px]` to `text-base` (16px) for track titles.
- Line 159: Keep `text-[10px]` for track numbers (they're metadata, exception allowed).
- Line 182: Change `text-[11px]` to `text-xs` for footer text.

