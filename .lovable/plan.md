

# Phase 6: Teaching About Page Copy Overhaul — Grounded & Direct

## Problem
The Teaching About page (`/teaching/about`) still uses the old philosophical tone that was already corrected on the main Teaching page. Copy like "The instrument is not something to conquer — it is something to converse with" and "The most active form of attention" reads as abstract and literary rather than approachable. This page needs the same grounded treatment applied in Phase 5.

## Copy Changes by Component

### 1. TeachingAboutHero.tsx
- **Headline:** "I don't teach piano. / I sit beside you until it sounds like you." → "I teach piano differently. / I start by listening to you."
- **Subtitle:** "Patient mentorship that begins with a conversation, not a curriculum." → "One-on-one mentorship built around your goals, your pace, and the music you love."

### 2. TeachingAboutOrigin.tsx
- **Section label:** "THE FIRST NOTE" → "HOW IT STARTED"
- **Lead paragraph:** "I watched a student play their first chord after six months of patience." → "I watched a student play their first chord after six months. Not because they were slow — because they needed to be ready."
- **Body p1:** "Not because they couldn't learn faster, but because they needed to hear it when they were ready." → "That moment changed how I think about teaching. It is not about covering material. It is about paying attention."
- **Body p2:** "That silence before the sound taught me more about teaching than any method book ever could." → "Every student arrives with a different story. I have learned to start there — not with a syllabus."
- **Quote:** "The instrument is not something to conquer — it is something to converse with." → "The best lessons do not feel like lessons. They feel like conversations."

### 3. TeachingAboutSustain.tsx
- **Section label:** "THREE BELIEFS" → "WHAT GUIDES ME"
- **Heading:** "What I carry to every lesson." → "Three things I bring to every session."
- **Belief data:**

| Current | Proposed |
|---------|----------|
| Patience / "The most active form of attention." | Patience / "I will never rush you. We move at your speed, not mine." |
| Conversation / "The first question I ask is never about music." | Listening / "I ask about your goals before I assign a single piece." |
| Expression / "The instrument is not something to conquer — it is something to converse with." | Expression / "Technique serves the music. The music serves you." |

### 4. TeachingAboutPresence.tsx
- **Section label:** "THE YEARS" → "EXPERIENCE"
- **Subtitle:** "years at the keys." → "years of teaching."
- **Moment cards (less literary, more concrete):**

| Current | Proposed |
|---------|----------|
| "The adult who was told it was 'too late' — and played at their own wedding" | "An adult student who started at 48 and played at her own wedding a year later" |
| "The student who played for their dying grandmother — the only goodbye that mattered" | "A teenager who learned one piece to play for his grandmother in hospice" |
| "The teenager who found in the piano what words could not express" | "A returning student who quit at 12 and came back at 35 — and found it easier the second time" |

### 5. TeachingAboutCovenant.tsx
- **Promises (slightly less poetic, more direct):**

| Current | Proposed |
|---------|----------|
| "I will never rush your pace." | "I will never rush you." |
| "I will ask before I assume." | "I will ask what you want before I decide what you need." |
| "I will sit beside you as long as it takes." | "I will stay patient, even when you are not." |
| "I will not pretend it sounds right before it does." | "I will be honest about where you are — and where you can go." |
| "I will remember why you started when you forget." | "I will remind you why you started when it gets hard." |

### 6. TeachingAboutCrossing.tsx
- **Headline:** "The first question I ask is never about music." → "Ready to start?"
- **Body:** "Tell me what brought you to the piano — a memory, a person, a feeling you want to find again. We begin with a conversation." → "Your first session is a conversation. Tell me what you want to play, what has held you back, and we will figure out the rest together."
- **CTA:** "Begin the conversation" → "Get in touch"
- **Closing motif:** "'Til Death; Unto Life." → remove or replace with "No commitment required."

### 7. TeachingAbout.tsx (page)
- **Nav labels update:**

| Current | Proposed |
|---------|----------|
| "Welcome" | "Welcome" |
| "The First Note" | "How It Started" |
| "Beliefs" | "What Guides Me" |
| "Experience" | "Experience" |
| "My Promise" | "My Promise" |
| "Get in Touch" | "Get in Touch" |

- **Meta description:** "The philosophy, patience, and promise behind every lesson. I sit beside you until it sounds like you." → "How I teach, what guides me, and what I promise every student. Piano mentorship by Parker Gawryletz."

## Files to Modify
1. `src/components/teaching-about/TeachingAboutHero.tsx` — headline + subtitle
2. `src/components/teaching-about/TeachingAboutOrigin.tsx` — label, paragraphs, quote
3. `src/components/teaching-about/TeachingAboutSustain.tsx` — label, heading, beliefs data
4. `src/components/teaching-about/TeachingAboutPresence.tsx` — label, subtitle, moments data
5. `src/components/teaching-about/TeachingAboutCovenant.tsx` — promises data
6. `src/components/teaching-about/TeachingAboutCrossing.tsx` — headline, body, CTA, closing
7. `src/pages/TeachingAbout.tsx` — nav labels, meta description

## What Does NOT Change
- All scroll-reveal animations, signature SVG, gold shimmer effects
- Visual layout, spacing, typography sizes
- Dark/light scoping (Hero + Crossing stay dark, middle sections stay light)

