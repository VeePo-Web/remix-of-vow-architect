

# About Page — Round 7: Remaining Label Centering and Minor Polish

## Issue Identified

The `pl-[0.3em]` approach for compensating letter-spacing optical shift is insufficient. The labels still appear left of center because the `text-center` class on the `p` element centers the text box, but `pl-[0.3em]` adds padding to the left side of the element itself — which doesn't affect inline text centering within a block-level centered element.

The correct fix is different: instead of `pl-[0.3em]` on the `p` tag, the text itself needs optical compensation. The standard CSS approach is to add **equal `padding-left` to the text inline** or use `text-indent` equal to the tracking value. However, the cleanest solution for centered text with letter-spacing is simply to **not add `pl-[0.3em]` at all** (it's doing nothing useful on a `text-center` block) and instead accept that the visual offset on short uppercase labels at `0.3em` tracking is within acceptable tolerance (~2px).

Alternatively, we can remove `pl-[0.3em]` and instead set `margin-left: 0.15em` on the text wrapper, which shifts the entire text block rightward by half the letter-spacing — the mathematically correct optical centering for tracked text.

## Recommended Fix

Replace `pl-[0.3em]` with `ml-[0.15em]` on all section labels. This shifts the rendered text block by half the letter-spacing value, achieving true optical center.

## Files to Modify

| File | Change |
|------|--------|
| WitnessHero.tsx | Replace `pl-[0.3em]` with `ml-[0.15em]` on label |
| WitnessSustain.tsx | Replace `pl-[0.3em]` with `ml-[0.15em]` on label |
| WitnessPresence.tsx | Replace `pl-[0.3em]` with `ml-[0.15em]` on label |
| WitnessCovenant.tsx | Replace `pl-[0.3em]` with `ml-[0.15em]` on label |
| WitnessCrossing.tsx | Replace `pl-[0.3em]` with `ml-[0.15em]` on label |

5 files, single class swap each.

