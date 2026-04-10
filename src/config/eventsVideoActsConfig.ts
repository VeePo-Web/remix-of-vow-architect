/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PRIVATE EVENTS — Sales Funnel as Story                      ║
 * ║                                                                ║
 * ║  FUNNEL: Hook → Atmosphere → Occasions → Process →           ║
 * ║          Fear Kill → Proof → Offer → Close                    ║
 * ║                                                                ║
 * ║  VIDEO: events-full.mp4 (all I-frames).                      ║
 * ║  8 equal sections. Section boundaries at 0.125 intervals.    ║
 * ║                                                                ║
 * ║  Voice: Warm, adaptable, inviting. Less sacred than weddings ║
 * ║  but still elevated. Specializes in intimate settings.        ║
 * ║  CTA is low-stakes "Message Me" — like texting a friend.     ║
 * ║                                                                ║
 * ║  Key differentiators: Custom setlists, brings own piano,     ║
 * ║  black curtain (behind-the-scenes), comes to you, adapts     ║
 * ║  to the feel of the room in real time.                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type { ScrollTextItem } from './videoActsConfig';

export const EVENTS_VIDEO_SRC = '/videos/events-full.mp4';
export const EVENTS_VIDEO_POSTER = '/videos/events-poster.png';
export const EVENTS_SCROLL_HEIGHT = '2800vh';

export const EVENTS_NAV_SECTIONS = [
  { id: 'events-welcome',    label: 'Welcome',          isBlackKey: false },
  { id: 'events-atmosphere',  label: 'The Room',         isBlackKey: true  },
  { id: 'events-occasions',  label: 'I Play For',       isBlackKey: false },
  { id: 'events-approach',   label: 'How It Works',     isBlackKey: true  },
  { id: 'events-threshold',  label: 'Your Questions',   isBlackKey: false },
  { id: 'events-proof',      label: 'What Happens',     isBlackKey: true  },
  { id: 'events-offering',   label: 'Your Event',       isBlackKey: false },
  { id: 'events-crossing',   label: 'Message Me',       isBlackKey: false },
];

const H1 = 'font-display text-[clamp(40px,7vw,84px)] leading-[1.08] font-normal tracking-[0.02em]';
const H2 = 'font-display text-[clamp(30px,5vw,58px)] leading-[1.15] font-normal tracking-[0.01em]';
const H3 = 'font-display text-[clamp(24px,3.5vw,42px)] leading-[1.25] font-normal';
const BODY = 'font-sans text-[clamp(17px,2.2vw,24px)] leading-[1.8] font-normal tracking-[0.01em]';
const BODY_SM = 'font-sans text-[clamp(15px,1.8vw,20px)] leading-[1.8]';
const LABEL = 'text-[13px] uppercase tracking-[0.35em] font-sans font-semibold luxury-label';
const QUOTE = 'font-display text-[clamp(22px,3vw,34px)] italic leading-[1.6] font-normal luxury-quote';

export const EVENTS_TEXT_OVERLAYS: ScrollTextItem[] = [

  // ═══════════════════════════════════════════════════════════
  // ACT I — THE HOOK (0.000 – 0.125)
  // You're not looking for a vendor. You're looking for
  // a feeling. Meet them where the search starts: the gut.
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
    text: 'Private Event Pianist',
    position: 'center', animation: 'fade-up',
    className: LABEL + ' mt-6',
  },
  {
    enterAt: 0.055, exitAt: 0.095,
    text: 'You are not looking\nfor a musician.\nYou are looking\nfor a feeling.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2 + ' max-w-[20ch] mx-auto',
  },
  {
    enterAt: 0.090, exitAt: 0.118,
    text: 'Something intimate.\nSomething that makes\nthe room exhale.',
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
  // ACT II — THE ROOM (0.125 – 0.250)
  // Paint the picture. Make them feel the evening before
  // it exists. Agitate the gap between playlist and presence.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.128, exitAt: 0.146,
    text: 'THE ROOM',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.143, exitAt: 0.170,
    text: 'Picture the evening.\nLow light. Good wine.\nConversation that stays\nquiet enough to matter.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.167, exitAt: 0.197,
    text: 'Now imagine a playlist\nplaying over it.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.194, exitAt: 0.218,
    text: 'It does not\nfeel right.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.215, exitAt: 0.245,
    text: 'Live piano does not compete\nwith the evening.\nIt carries it.\nThe music becomes invisible —\nuntil someone realizes\nthey cannot imagine\nthe night without it.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.242, exitAt: 0.250,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT III — I PLAY FOR (0.250 – 0.375)
  // Show the range. Intimate settings first (specialty),
  // then breadth. Close with the differentiator:
  // "I read the room. I never play the same way twice."
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.253, exitAt: 0.268,
    text: 'I PLAY FOR',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.265, exitAt: 0.288,
    text: 'Surprise proposals\nwhere the song says\nwhat words cannot.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.285, exitAt: 0.308,
    text: 'Private dinners for two\nwhere I set up, play,\nand disappear behind\na black curtain —\ntruly behind the scenes.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.305, exitAt: 0.325,
    text: 'Art galleries. Fundraisers.\nDessert auctions.\nValentine galas.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.322, exitAt: 0.345,
    text: 'Church services. Pub nights.\nIn-home gatherings.\nOld folks home visits\nwhere the music matters\nmore than anywhere.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.342, exitAt: 0.373,
    text: 'I read the room.\nI adapt in real time.\nI never play the same\nway twice.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2 + ' max-w-[500px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT IV — HOW IT WORKS (0.375 – 0.500)
  // Process = trust. Show them it's effortless on their end.
  // Custom setlist, own piano, curtain setup, come to you.
  // First CTA — low stakes.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.375, exitAt: 0.383,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.381, exitAt: 0.396,
    text: 'HOW IT WORKS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.393, exitAt: 0.415,
    text: 'You tell me what\nthe evening should\nfeel like.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.412, exitAt: 0.435,
    text: 'That is all I need\nto begin.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.432, exitAt: 0.455,
    text: 'I build a custom setlist\naround your vision\nand the feel of the room —\nnot a generic playlist\npulled from a folder.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.452, exitAt: 0.475,
    text: 'I bring my own piano.\nI set up early and quietly.\nIf you want me invisible,\nI have a black curtain\nfor exactly that.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.472, exitAt: 0.492,
    text: 'I come to you.\nLiving rooms. Restaurants.\nChurches. Rooftops.\nWherever your evening lives.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[440px] mx-auto',
  },
  {
    enterAt: 0.489, exitAt: 0.500,
    text: 'Message Me →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/events/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT V — THE FEAR KILL (0.500 – 0.625)
  // Name the real fears: awkward, forced, wrong volume,
  // ruining the vision. Voice them. Destroy them.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.502, exitAt: 0.510,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.507, exitAt: 0.522,
    text: 'YOUR QUESTIONS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.519, exitAt: 0.538,
    text: 'You have a fear\nyou have not\nsaid out loud.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.535, exitAt: 0.553,
    text: '"What if it feels\nawkward or forced?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.550, exitAt: 0.568,
    text: 'I do not perform at your event.\nI become part of it.\nThe music adapts to the energy\nof the room — not the other way around.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.565, exitAt: 0.583,
    text: '"What if it is too loud —\nor too quiet?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.580, exitAt: 0.598,
    text: 'I calibrate to your space\nand your guest count.\nPresent enough to feel.\nNever enough to intrude.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.595, exitAt: 0.613,
    text: '"What if it does not match\nour vision?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.610, exitAt: 0.625,
    text: 'Your vision is where I start.\nEvery setlist is built\nfrom your words,\nnot mine.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H3 + ' max-w-[480px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VI — WHAT HAPPENS (0.625 – 0.750)
  // Paint transformation scenes. No fake testimonials.
  // Show what the evening BECOMES with live piano.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.627, exitAt: 0.635,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.632, exitAt: 0.648,
    text: 'WHAT HAPPENS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.645, exitAt: 0.665,
    text: 'The evening changes.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H1,
  },
  {
    enterAt: 0.662, exitAt: 0.688,
    text: 'Guests lean in closer.\nConversation gets quieter —\nnot because they are told to,\nbut because the room\nasked them to.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.685, exitAt: 0.710,
    text: 'Someone slow-dances\nwho was not\nplanning to.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.707, exitAt: 0.730,
    text: 'The host stops worrying\nabout the music\nand starts being\na guest at their own event.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.727, exitAt: 0.748,
    text: 'That is what I do.\nI make the room feel\nlike it was always\nsupposed to sound this way.',
    position: 'center', animation: 'fade-up',
    hasGlow: true,
    className: H3 + ' max-w-[480px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VII — YOUR EVENT (0.750 – 0.875)
  // No pricing tiers — every event is custom.
  // Show what's included. Make the CTA feel effortless.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.752, exitAt: 0.760,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.757, exitAt: 0.773,
    text: 'YOUR EVENT',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.770, exitAt: 0.793,
    text: 'Every event is different.\nSo every quote is too.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.790, exitAt: 0.815,
    text: 'Tell me what you are planning,\nwhen it is, and what\nthe room should feel like.\nI will send you a clear quote —\nno surprises, no hidden fees.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.812, exitAt: 0.837,
    text: 'What I bring:\nMy piano. My setup.\nA custom setlist built for your night.\nBlack curtain if you want me\nbehind the scenes.\nI come to you — wherever that is.',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: H3 + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.834, exitAt: 0.855,
    text: 'Private dinners start at $300.\nEverything else depends on\nthe evening you are building.',
    position: 'center', animation: 'fade-up',
    className: BODY_SM + ' max-w-[440px] mx-auto italic',
  },
  {
    enterAt: 0.852, exitAt: 0.878,
    text: 'Message Me →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/events/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VIII — THE CLOSE (0.875 – 1.000)
  // Mirror the hook. Warm permission close.
  // "Message Me" holds forever — low stakes, high warmth.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.877, exitAt: 0.885,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.880, exitAt: 0.900,
    text: 'You already know\nwhat the evening\nshould feel like.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.897, exitAt: 0.915,
    text: 'Now let someone else\nworry about the music.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  // ── Holds forever, vertically stacked ──
  {
    enterAt: 0.910, exitAt: 1.5,
    text: 'Tell me about it.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1 + ' italic stack-top',
  },
  {
    enterAt: 0.920, exitAt: 1.5,
    text: 'Message Me →',
    position: 'center', animation: 'fade-up',
    isCta: true, href: '/events/contact',
    className: 'cn-inline-cta cn-inline-cta--large stack-mid',
  },
  {
    enterAt: 0.930, exitAt: 1.5,
    text: 'No commitment. Just a conversation.',
    position: 'center', animation: 'fade',
    className: BODY_SM + ' italic stack-bottom',
  },
];
