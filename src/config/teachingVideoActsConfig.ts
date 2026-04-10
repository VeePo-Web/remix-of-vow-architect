/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PIANO MENTORSHIP — Sales Funnel as Story                    ║
 * ║                                                                ║
 * ║  FUNNEL: Hook → Origin Story → Authority (Pillars) →         ║
 * ║          Process → Fear Kill → Proof → Offer → Close         ║
 * ║                                                                ║
 * ║  VIDEO: 80.3s total. 8 equal sections of ~10s each.          ║
 * ║  Section boundaries: 0, 0.125, 0.250, 0.375, 0.500,         ║
 * ║                       0.625, 0.750, 0.875, 1.000             ║
 * ║                                                                ║
 * ║  Every word exists to dissolve the shame of starting late,   ║
 * ║  position Parker as the only teacher who truly understands,  ║
 * ║  and make booking feel like the most natural next step.      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type { ScrollTextItem } from './videoActsConfig';

export const TEACHING_VIDEO_SRC = '/videos/teaching-full.mp4';
export const TEACHING_VIDEO_POSTER = '/videos/teaching-poster.png';
export const TEACHING_SCROLL_HEIGHT = '2800vh';

export const TEACHING_NAV_SECTIONS = [
  { id: 'teach-welcome',     label: 'Welcome',          isBlackKey: false },
  { id: 'teach-exhale',      label: 'Your Story',       isBlackKey: true  },
  { id: 'teach-pillars',     label: 'How I Teach',      isBlackKey: false },
  { id: 'teach-method',      label: 'The Process',      isBlackKey: true  },
  { id: 'teach-threshold',   label: 'The Truth',        isBlackKey: false },
  { id: 'teach-stories',     label: 'Proof',            isBlackKey: true  },
  { id: 'teach-offering',    label: 'Your Investment',  isBlackKey: false },
  { id: 'teach-crossing',    label: 'Begin',            isBlackKey: false },
];

const H1 = 'font-display text-[clamp(40px,7vw,84px)] leading-[1.08] font-normal tracking-[0.02em]';
const H2 = 'font-display text-[clamp(30px,5vw,58px)] leading-[1.15] font-normal tracking-[0.01em]';
const H3 = 'font-display text-[clamp(24px,3.5vw,42px)] leading-[1.25] font-normal';
const BODY = 'font-sans text-[clamp(17px,2.2vw,24px)] leading-[1.8] font-normal tracking-[0.01em]';
const BODY_SM = 'font-sans text-[clamp(15px,1.8vw,20px)] leading-[1.8]';
const LABEL = 'text-[13px] uppercase tracking-[0.35em] font-sans font-semibold luxury-label';
const QUOTE = 'font-display text-[clamp(22px,3vw,34px)] italic leading-[1.6] font-normal luxury-quote';

export const TEACHING_TEXT_OVERLAYS: ScrollTextItem[] = [

  // ═══════════════════════════════════════════════════════════
  // ACT I — THE HOOK (0.000 – 0.125)
  // VIDEO: Dark, atmospheric opening. Stillness. A single
  // warm light emerging from void.
  //
  // COPY PURPOSE: Speak to the person at 11pm googling
  // "piano lessons for adults." Do not sell. Name the feeling
  // they carry in silence: "I have always wanted to play."
  // The subtext tells them you already know who they are.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.010, exitAt: 0.055,
    text: 'PARKER\nGAWRYLETZ',
    position: 'center', animation: 'fade',
    hasGlow: true,
    className: H1 + ' tracking-[0.15em] uppercase',
  },
  {
    enterAt: 0.020, exitAt: 0.050,
    text: 'Piano Mentorship',
    position: 'center', animation: 'fade-up',
    className: LABEL + ' mt-6',
  },
  {
    enterAt: 0.055, exitAt: 0.095,
    text: 'You have always wanted\nto play.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[20ch] mx-auto',
  },
  {
    enterAt: 0.090, exitAt: 0.120,
    text: 'That quiet thought\nthat surfaces at dinner parties,\nin the car, late at night —\nit brought you here.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  // ── Scroll cue ──
  {
    enterAt: 0.005, exitAt: 0.045,
    text: 'Scroll',
    position: 'center', animation: 'fade',
    isScrollCue: true,
    className: '',
  },
  {
    enterAt: 0.117, exitAt: 0.125,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT II — THE ORIGIN STORY (0.125 – 0.250)
  // VIDEO: Warm candlelight grows. Fabric textures emerge.
  // Intimate, quiet space — like a private room at dawn.
  //
  // COPY PURPOSE: Meet them in their shame. Every adult who
  // considers piano carries the same regret. Name it before
  // they do. Then dissolve it. Reframe: the right time is now.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.128, exitAt: 0.146,
    text: 'YOUR STORY',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.143, exitAt: 0.170,
    text: 'Everyone who sits down\nat my piano says\nthe same thing.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.167, exitAt: 0.197,
    text: '"I should have\nstarted sooner."',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic',
  },
  {
    enterAt: 0.194, exitAt: 0.220,
    text: 'Maybe you played as a child and stopped.\nMaybe life got in the way.\nMaybe no one ever showed you how.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.217, exitAt: 0.245,
    text: 'None of that matters now.\nWhat matters is\nyou are here.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.242, exitAt: 0.250,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT III — THE AUTHORITY (0.250 – 0.375)
  // VIDEO: Golden dawn light through fabric. The space opens.
  // Warmth intensifies. Morning becoming day.
  //
  // COPY PURPOSE: Competitor reframe. "Most teachers follow a
  // curriculum. I follow you." Position each pillar as a
  // promise against the status quo. Make the reader think:
  // "This is completely different from lessons I tried before."
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.253, exitAt: 0.268,
    text: 'HOW I TEACH',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.265, exitAt: 0.290,
    text: 'Most piano teachers\nfollow a curriculum.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.287, exitAt: 0.312,
    text: 'I follow you.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic',
  },
  {
    enterAt: 0.309, exitAt: 0.332,
    text: 'No deadlines. No grades.\nNo fixed syllabus.\nWe move at whatever speed\nlets the music breathe.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.329, exitAt: 0.350,
    text: 'You will play real songs —\nnot just exercises.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.347, exitAt: 0.366,
    text: 'Hymns, film scores, pop songs,\nclassical — the music you love,\nfrom the very first week.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.363, exitAt: 0.375,
    text: 'Expression over perfection.\nAlways.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2,
  },

  // ═══════════════════════════════════════════════════════════
  // ACT IV — THE PROCESS (0.375 – 0.500)
  // VIDEO: Threshold to outdoors. Golden light floods in.
  // The world opens. Confidence builds.
  //
  // COPY PURPOSE: Show exactly what happens when they book.
  // Eliminate the unknown. "The first lesson is not a lesson.
  // It is a conversation." Then paint the journey. First CTA.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.377, exitAt: 0.385,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.383, exitAt: 0.398,
    text: 'THE PROCESS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.395, exitAt: 0.420,
    text: 'The first lesson\nis not a lesson.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.417, exitAt: 0.442,
    text: 'It is a conversation.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic',
  },
  {
    enterAt: 0.439, exitAt: 0.464,
    text: 'I want to know what brought you\nto the piano. What songs you love.\nWhat you hope to be able to do.\nAnd what has held you back.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.461, exitAt: 0.485,
    text: 'From that single conversation,\nI build a plan around your life —\nnot a syllabus I hand to everyone.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.482, exitAt: 0.498,
    text: 'Start the Conversation →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/teaching/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT V — THE FEAR KILL (0.500 – 0.625)
  // VIDEO: Brief shadow passes, then light returns stronger.
  // Tension followed by resolution.
  //
  // COPY PURPOSE: Name every fear in their exact internal
  // language. Then destroy each one with absolute conviction.
  // Three fears, three kills. Close with the line that stays:
  // "The piano does not care when you begin — and neither do I."
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.502, exitAt: 0.510,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.507, exitAt: 0.522,
    text: 'THE TRUTH',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.519, exitAt: 0.540,
    text: 'You have a fear\nyou have not said\nout loud yet.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.537, exitAt: 0.554,
    text: '"What if I start\nand quit again?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.551, exitAt: 0.570,
    text: 'You did not quit last time.\nThe method quit on you.\nThis is not that.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.567, exitAt: 0.584,
    text: '"What if I am too old\nto learn?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.581, exitAt: 0.600,
    text: 'Most of my students are adults.\nI have taught people who started\nat 30, 50, and 70.\nAge is not a barrier.\nIt is depth.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.597, exitAt: 0.622,
    text: 'The piano does not care\nwhen you begin —\nand neither do I.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H1 + ' italic max-w-[520px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VI — THE PROOF (0.625 – 0.750)
  // VIDEO: Peak brightness. Luminous. Ethereal light.
  // The most beautiful visual moment.
  //
  // COPY PURPOSE: Transformation stories. Not testimonials —
  // narratives. Each one follows the arc: who they were →
  // what happened → their own words. The reader must think:
  // "That could be me."
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.627, exitAt: 0.635,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.632, exitAt: 0.648,
    text: 'WHAT HAPPENED',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.645, exitAt: 0.664,
    text: 'Margaret had never\ntouched a piano.\nShe walked in at 52,\napologising before she sat down.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.661, exitAt: 0.680,
    text: 'Six months later,\nshe played a piece for her husband\non their anniversary.\nShe did not apologise once.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.677, exitAt: 0.695,
    text: '"The first gift I ever made\nwith my own hands."',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.692, exitAt: 0.694,
    text: '— Margaret, age 52',
    position: 'center', animation: 'fade',
    className: BODY_SM,
  },
  {
    enterAt: 0.696, exitAt: 0.716,
    text: 'David quit piano at 14.\nTwenty years passed.\nWhen he finally sat down again,\nhis hands remembered\nmore than he expected —\nand the music carried\nsomething it never could have at 14.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.713, exitAt: 0.730,
    text: '"The sound carried everything\nI had lived through."',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.727, exitAt: 0.729,
    text: '— David, returned after 20 years',
    position: 'center', animation: 'fade',
    className: BODY_SM,
  },
  {
    enterAt: 0.731, exitAt: 0.748,
    text: 'Sarah wanted to play one song\nat her own wedding.\nWe spent four months preparing\nthree minutes of music.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.745, exitAt: 0.750,
    text: '"My hands shook.\nBut the music did not."',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H1 + ' italic max-w-[520px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VII — THE OFFER (0.750 – 0.875)
  // VIDEO: Spacious, confident light. The ceremony space is
  // ready. Clean. Open. No shadows.
  //
  // COPY PURPOSE: Scarcity anchor first — "I only take 15
  // students at a time." Reframe as gift, not boast. Then:
  // clear pricing, zero friction, risk reversal. The reader
  // should feel: "This is simple. This is safe. This is mine."
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.752, exitAt: 0.760,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.757, exitAt: 0.773,
    text: 'YOUR INVESTMENT',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.770, exitAt: 0.792,
    text: 'I only take 15 students\nat a time.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.789, exitAt: 0.810,
    text: 'Not because I have to.\nBecause yours deserves\nmy full attention.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.807, exitAt: 0.818,
    text: 'While other teachers cycle through\ndozens of students a week,\nevery person I work with\nreceives a plan built for them alone.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.816, exitAt: 0.836,
    text: '$60 per hour',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1,
  },
  {
    enterAt: 0.833, exitAt: 0.852,
    text: 'Full 60-minute sessions\nNo packages · No contracts\nNo commitments · Pay as you go',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: BODY + ' max-w-[420px] mx-auto',
  },
  {
    enterAt: 0.849, exitAt: 0.866,
    text: 'Your first session is just a conversation.\nNo preparation needed.\nIf it does not feel right,\nyou owe nothing.',
    position: 'center', animation: 'fade-up',
    className: BODY_SM + ' max-w-[440px] mx-auto italic',
  },
  {
    enterAt: 0.863, exitAt: 0.878,
    text: 'Book a Conversation →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/teaching/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VIII — THE CLOSE (0.875 – 1.000)
  // VIDEO: Veil, silhouette, transcendent light. Sacred
  // stillness. The journey is complete.
  //
  // COPY PURPOSE: The permission close. Cascade of objection
  // removals: "You do not need to be talented. You do not need
  // to be young. You do not need to be ready." Then the
  // answer: "You just need to begin." CTA + trust hold forever.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.877, exitAt: 0.885,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.883, exitAt: 0.905,
    text: 'You do not need\nto be talented.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.902, exitAt: 0.924,
    text: 'You do not need\nto be young.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.921, exitAt: 0.943,
    text: 'You do not need\nto be ready.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  // ── THE ANSWER — holds forever, vertically stacked ──
  {
    enterAt: 0.940, exitAt: 1.5,
    text: 'You just need\nto begin.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic stack-top',
  },
  {
    enterAt: 0.952, exitAt: 1.5,
    text: 'Book a Conversation →',
    position: 'center', animation: 'fade-up',
    isCta: true, href: '/teaching/contact',
    className: 'cn-inline-cta cn-inline-cta--large stack-mid',
  },
  {
    enterAt: 0.964, exitAt: 1.5,
    text: 'Response within 24 hours. Always.',
    position: 'center', animation: 'fade',
    className: BODY_SM + ' italic stack-bottom',
  },
];
