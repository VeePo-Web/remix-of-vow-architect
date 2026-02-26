

# Round 31 — "Hear Me Play" Listening Room: Next Frontier

## Completed (Round 30)

1. ✅ Clamped scroll parallax offset to ±40px — visual stability on long pages
2. ✅ Conditional card breathing — paused when section not visible (`sectionInView`)
3. ✅ Blockquote hover warmth — color shifts toward vow-yellow on hover
4. ✅ Keyboard seek support — Arrow keys (5%), Home/End on NowPlayingBar
5. ✅ Ken Burns pause — animation stops when section not in viewport

## Files Modified (Round 30)

| File | Changes |
|------|---------|
| `src/components/TheSound.tsx` | Parallax clamp, card breathing + Ken Burns conditional on `sectionInView`, keyboard seek on slider |
| `src/index.css` | `.blockquote-warm` hover color transition to vow-yellow |
