

# Delete Unused Navigation.tsx

The `src/components/Navigation.tsx` component is not imported by any file in the codebase. The site uses `MinimalHeader.tsx` and `FullScreenMenu.tsx` for navigation instead.

## Action

Delete `src/components/Navigation.tsx`.

No other files need to be updated -- there are zero imports of this component anywhere in the project.

