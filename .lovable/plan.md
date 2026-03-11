

# Phase 7: TeachingContact & TeachingPricing Copy Overhaul

## TeachingPricing.tsx — Current → Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Page title | "The Offering — Piano Mentorship" | "Pricing — Piano Mentorship \| Parker Gawryletz" |
| Meta desc | "One rate. One hour. One bench. $60 per hour..." | "Piano mentorship for $60 per hour. No packages, no contracts. Pay as you go." |
| Nav label "The Price" | "The Price" | "Pricing" |
| Nav label "Included" | "Included" | "Included" |
| Nav label "Questions" | "Questions" | "Questions" |
| Nav label "Begin" | "Begin" | "Get Started" |
| Overline | "The Offering" | "Pricing" |
| h1 | "One rate. One hour. One bench." | "One rate. No surprises." |
| Lead paragraph | "The simplicity is the signal. No tiers, no packages, no upselling — just honest time together at the instrument." | "Piano mentorship for a flat hourly rate. No packages, no contracts, no upselling." |
| Price subtitle | "per hour" (fine) | Keep |
| Price body | "No packages. No commitments. One conversation at a time." | "60-minute sessions. No commitments. Pay as you go." |
| Price italic | "The first session begins with a question, not a scale." | "Your first session is a conversation — no preparation needed." |
| Inclusions heading | "What every hour includes." | "What every session includes." |
| Inclusion items | "One-to-one mentorship — never group" | "One-on-one, never group lessons" |
| | "Expression-focused methodology" | "Focus on expression, not just technique" |
| | "Repertoire chosen together" | "You choose the music we work on" |
| | "In-person (Calgary) or virtual" | "In-person (Calgary) or online" |
| | "Response within 24 hours" | "I reply within 24 hours" |
| Fears heading | "You might be wondering." | "Common questions." |
| Fears subtitle | "The questions you carry but rarely ask." | Remove — heading is sufficient |
| Fear 1 Q | "Is this worth the investment?" | Keep |
| Fear 1 A | "One hour of focused, one-to-one mentorship — no curriculum to sell, no recital to prepare for, no external agenda..." | "You get a full hour of one-on-one time with no curriculum to sell and no recital to prepare for. The focus is entirely on you." |
| Fear 2 Q | "What if I start and quit again?" | Keep |
| Fear 2 A | "There is no contract, no package to finish, no guilt. If you stop, you stop. If you return, I will be here. The bench does not keep score." | "There is no contract and no package to finish. If you stop, you stop. If you come back, I will be here. No questions asked." |
| Fear 3 Q | "What if I am too old to start?" | Keep |
| Fear 3 A | "I have sat beside students who began at sixty and played at their own anniversary. The piano does not ask your age — only your attention." | "Most of my students are adults. I have taught people who started at 30, 50, and 70. Age has never been a barrier." |
| CTA heading | "The first question I ask is never about music." | "Ready to start?" |
| CTA body | "Tell me what brought you to the piano — a memory, a person, a feeling you want to find again. This is a conversation, not a commitment." | "Your first session is a conversation. Tell me what you want to play and we will figure out the rest together. No commitment required." |
| CTA button | "Begin the conversation" | "Get in touch" |

## TeachingContact.tsx — Current → Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Page title | "Begin the Conversation — Piano Mentorship" | "Get in Touch — Piano Mentorship \| Parker Gawryletz" |
| Meta desc | "The first question I ask is never about music..." | "Reach out about piano mentorship. No audition, no obligation — just a conversation." |
| Overline | "The First Note" | "Get in Touch" |
| h1 | "The first question I ask / is never about music." | "Interested in lessons? / Let's talk." |
| Subtitle | "A name, an email, and whatever brought you here — that is enough to begin." | "A name, an email, and whatever brought you here. That is all I need." |
| Textarea label | "What brought you to the piano?" | Keep — this is good and grounded |
| Textarea placeholder | "A memory, a person, a song, a feeling..." | "A song you love, a goal you have, or just curiosity..." |
| Textarea helper | "There is no wrong answer." | Keep |
| Submit button | "Begin the Conversation" | "Send Message" |
| Privacy note | "I only use your information to write back. Nothing else." | Keep — clear and direct |
| Trust stats | "24hr / Response Time", "No / Audition", "Free / First Chat" | Keep — already grounded |

## Files to Modify
1. `src/pages/TeachingPricing.tsx` — all copy changes listed above
2. `src/pages/TeachingContact.tsx` — all copy changes listed above

## What Does NOT Change
- Visual layout, animations, atmospheric layers, ken-burns effects
- Form validation schema and field structure
- Trust stats grid
- $60/hr pricing
- Golden thread dividers and breathing dot animations

