

# Plan: Embed Teaching Questionnaire into Codebase

## What

Copy the CSV into the project at `.lovable/teaching-questionnaire.md` — converted from raw CSV into a clean, readable markdown Q&A document that serves as the primary decision-filter for all teaching-vertical work.

## Why Markdown, Not CSV

The CSV is a single-row spreadsheet with 80+ columns. As raw CSV it is unreadable. Converting it to a structured Q&A markdown makes it immediately useful as a reference document that AI and humans can scan.

## Document Structure

The markdown will preserve every question and every answer verbatim (with light spelling corrections for readability), organized by the 10 sections from the questionnaire:

1. **Section 1: The Core Vision** (Q1.1–1.8) — Philosophy, category creation, protection, expression
2. **Section 2: Meaning, Philosophy, and Interior Logic** (Q2.1–2.10) — Worldview, patience, expression, conversation before music, the sacred
3. **Section 3: Identity, Positioning, and Distinction** (Q3.1–3.9) — Differentiation, right-fit/wrong-fit, brand tension
4. **Section 4: The Personal Brand Dimension** (Q4.1–4.7) — First-person voice, personal story, trust
5. **Section 5: Audience, Resonance, and Emotional Fit** (Q5.1–5.10) — Target audience, fears, reframing
6. **Section 6: Messaging Architecture** (Q6.1–6.10) — Core message, page-level strategy, pacing
7. **Section 7: Website Experience and Creative Direction** (Q7.1–7.10) — Feel, pacing, anti-patterns, audio
8. **Section 8: Structure, Pages, and Content Priorities** (Q8.1–8.7) — Essential pages, nuance areas, offering framing
9. **Section 9: Inquiry, Conversion, and Right-Fit Filtering** (Q9.1–9.9) — Inquiry experience, conversion, anti-patterns
10. **Section 10: Long-Term Vision and Strategic Alignment** (Q10.1–10.7) — 3-5 year positioning, category ownership

The document will include a header stating its governance role: **all teaching-vertical decisions must be filtered through this questionnaire.**

## Key Insights to Highlight

A brief "Key Directives" summary at the top will extract the most critical decisions Parker made:

- **Deep, not wide** — 10 students max, bespoke mentorship
- **$60/hr flat rate** — no tiers, no packages
- **Piano as soul-expression tool** — not skill acquisition
- **Conversation before music** — the "why" anchors everything
- **Hero page is the most important page** — must fan the spark of hope into flame
- **Simple, low-stakes inquiry** — not a qualifying gauntlet
- **Fantasy.co pacing** — slow, spacious, clear, bold

## Scope

- **Creates:** `.lovable/teaching-questionnaire.md`
- **No code changes.** Reference document only.
- **Governance:** This document becomes the primary filter for all future teaching-vertical decisions, superseding assumptions.

