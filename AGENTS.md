# Project architecture rules

- Keep the archived multi-page experience in source, but expose only `/` and `/gallery`; all other browser routes redirect to `/` so the temporary public surface is reversible.
- Keep the public photography selection in one typed manifest so image uniqueness, dimensions, ordering, and alternative text remain auditable.