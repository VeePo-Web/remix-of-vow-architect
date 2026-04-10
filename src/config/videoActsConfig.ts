/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  THE SACRED SCROLL — Sales Funnel as Story                    ║
 * ║                                                                ║
 * ║  FUNNEL: Hook → Story → Authority → Fear Kill → Offer →      ║
 * ║          Proof → Close ("I Do.")                              ║
 * ║                                                                ║
 * ║  VIDEO: 77.3s total (7×10s + 1×7s). All I-frames.           ║
 * ║  Section boundaries: 0.000, 0.129, 0.259, 0.388, 0.517,    ║
 * ║                       0.647, 0.776, 0.905, 1.000            ║
 * ║                                                                ║
 * ║  Every word exists to build trust, extinguish fear, and       ║
 * ║  position Parker as the only pianist they would trust         ║
 * ║  with the most important hour of their lives.                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export interface ScrollTextItem {
  enterAt: number;
  exitAt: number;
  text: string;
  className?: string;
  position?: 'center' | 'left' | 'right';
  animation?: 'fade-up' | 'fade' | 'scale' | 'blur';
  isLabel?: boolean;
  isDivider?: boolean;
  isCta?: boolean;
  href?: string;
  hasGlow?: boolean;
  isGlass?: boolean;
  isScrollCue?: boolean;
  hasHtml?: boolean;
}

export const VIDEO_SRC = '/videos/weddings-full.mp4';
export const VIDEO_POSTER = '/videos/section-1-poster.png';
export const SCROLL_HEIGHT = '2800vh';

export const NAV_SECTIONS = [
  { id: 'act-vigil',      label: 'Home',            isBlackKey: false },
  { id: 'act-process',    label: 'My Process',      isBlackKey: true  },
  { id: 'act-crafting',   label: 'Your Music',      isBlackKey: false },
  { id: 'act-invitation', label: 'About',           isBlackKey: true  },
  { id: 'act-sound',      label: 'The Promise',     isBlackKey: false },
  { id: 'act-witness',    label: 'Services',        isBlackKey: true  },
  { id: 'act-covenant',   label: 'Testimonials',    isBlackKey: false },
  { id: 'act-crossing',   label: 'Contact',         isBlackKey: false },
];

const H1 = 'font-display text-[clamp(40px,7vw,84px)] leading-[1.08] font-normal tracking-[0.02em]';
const H2 = 'font-display text-[clamp(30px,5vw,58px)] leading-[1.15] font-normal tracking-[0.01em]';
const H3 = 'font-display text-[clamp(24px,3.5vw,42px)] leading-[1.25] font-normal';
const BODY = 'font-sans text-[clamp(17px,2.2vw,24px)] leading-[1.8] font-normal tracking-[0.01em]';
const BODY_SM = 'font-sans text-[clamp(15px,1.8vw,20px)] leading-[1.8]';
const LABEL = 'text-[13px] uppercase tracking-[0.35em] font-sans font-semibold luxury-label';
const QUOTE = 'font-display text-[clamp(22px,3vw,34px)] italic leading-[1.6] font-normal luxury-quote';

// "I do." gets ceremonial scale — larger than standard H1
const H1_SACRED = 'font-display text-[clamp(48px,9vw,96px)] leading-[1.08] font-normal tracking-[0.08em]';

export const TEXT_OVERLAYS: ScrollTextItem[] = [

  // ═══════════════════════════════════════════════════════════
  // ACT I — THE HOOK (0.000 – 0.129)
  // VIDEO: Black void → single candle flame emerges
  // Text appears in the darkness. Name + title first,
  // then the emotional hook as the flame grows.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.010, exitAt: 0.058,
    text: 'PARKER\nGAWRYLETZ',
    position: 'center', animation: 'fade',
    hasGlow: true,
    className: H1 + ' tracking-[0.15em] uppercase',
  },
  {
    enterAt: 0.020, exitAt: 0.052,
    text: 'Ceremony Pianist',
    position: 'center', animation: 'fade-up',
    className: LABEL + ' mt-6',
  },
  {
    enterAt: 0.062, exitAt: 0.108,
    text: 'You are about to stand\nbefore everyone you love\nand make a promise.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[20ch] mx-auto',
  },
  // ── Scroll cue — visible in first moments only ──
  {
    enterAt: 0.005, exitAt: 0.040,
    text: 'Scroll',
    position: 'center', animation: 'fade',
    isScrollCue: true,
    className: '',
  },
  {
    enterAt: 0.118, exitAt: 0.129,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT II — THE STORY (0.129 – 0.259)
  // VIDEO: Candlelight grows, fabric edges emerge. Intimate.
  // Show depth of preparation. Build trust through detail.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.132, exitAt: 0.150,
    text: 'MY PROCESS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.147, exitAt: 0.178,
    text: 'The music at your ceremony\nwill not be left to chance.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.175, exitAt: 0.205,
    text: 'It begins months before.',
    position: 'center', animation: 'scale',
    className: H1 + ' italic',
  },
  {
    enterAt: 0.202, exitAt: 0.230,
    text: 'I start with one question:\nWhat song was playing\nwhen you knew?',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.227, exitAt: 0.252,
    text: 'From there, I learn\nwhat you want to feel\nthe moment you begin your walk —\nand what silence needs protecting.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[420px] mx-auto',
  },
  {
    enterAt: 0.249, exitAt: 0.259,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT III — YOUR MUSIC (0.259 – 0.388)
  // VIDEO: Golden dawn through sheer fabric, veil appears.
  // Show craftsmanship, then climax with the vow cascade.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.262, exitAt: 0.278,
    text: 'YOUR MUSIC',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.275, exitAt: 0.302,
    text: 'My one goal is to make\nthe music <span class="gold-underline">sound</span> like what\nyour heart <span class="gold-underline">feels</span> like.',
    position: 'center', animation: 'fade-up',
    hasHtml: true,
    className: H2 + ' italic max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.299, exitAt: 0.324,
    text: 'Your ceremony music is not pulled\nfrom a playlist.\nIt is composed from our conversation —\nnote by note, for the two of you.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[420px] mx-auto',
  },
  {
    enterAt: 0.321, exitAt: 0.345,
    text: 'I send you a first draft.\nYou shape it.\nWe refine it together until it sounds\nexactly as you imagined.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[420px] mx-auto',
  },
  // ── The vow cascade — choreographed: each fades out as the next fades in ──
  // ── Vertically offset so they don't stack on each other ──
  {
    enterAt: 0.342, exitAt: 0.362,
    text: 'Every vow spoken',
    position: 'center', animation: 'fade',
    className: H1 + ' italic -translate-y-[24px]',
  },
  {
    enterAt: 0.358, exitAt: 0.378,
    text: 'becomes sacred',
    position: 'center', animation: 'fade',
    hasGlow: true,
    className: H1 + ' italic',
  },
  {
    enterAt: 0.374, exitAt: 0.390,
    text: 'the moment it is heard.',
    position: 'center', animation: 'fade',
    className: H1 + ' italic translate-y-[24px]',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT IV — THE AUTHORITY (0.388 – 0.517)
  // VIDEO: Threshold to outdoors, mountains, gold particles.
  // Scarcity anchor + credibility + first CTA.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.390, exitAt: 0.400,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.398, exitAt: 0.414,
    text: 'ABOUT',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.411, exitAt: 0.440,
    text: 'I take five weddings\na year.',
    position: 'center', animation: 'fade-up',
    className: H1,
  },
  {
    enterAt: 0.437, exitAt: 0.465,
    text: 'Not because I have to.\nBecause yours deserves\nmy full attention.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },
  {
    enterAt: 0.462, exitAt: 0.492,
    text: 'While other pianists juggle dozens\nof bookings, every couple I work with\nreceives months of devoted preparation.\nNot a template.\nA score written for two people.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[420px] mx-auto',
  },
  {
    enterAt: 0.489, exitAt: 0.504,
    text: '500+ events · SOCAN licensed · Insured',
    position: 'center', animation: 'fade',
    className: LABEL,
  },
  {
    enterAt: 0.502, exitAt: 0.517,
    text: 'Begin the Conversation →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT V — THE FEAR KILL (0.517 – 0.647)
  // VIDEO: Shadow passes then light returns brighter.
  // Name the fear. Voice it. Destroy it.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.519, exitAt: 0.529,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.527, exitAt: 0.543,
    text: 'THE PROMISE',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.540, exitAt: 0.568,
    text: 'You have a fear you have\nnot said out loud yet.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.565, exitAt: 0.596,
    text: '"What if the pianist treats\nour ceremony like just another\nSaturday booking?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.593, exitAt: 0.640,
    text: 'That will never happen here.\nBecause I do not start\nwith a setlist.\nI start with your story.',
    position: 'center', animation: 'fade-up',
    className: H3 + ' max-w-[480px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VI — THE OFFER (0.647 – 0.776)
  // VIDEO: Full outdoor ceremony, sunlit, open, spacious.
  // Services + pricing. Clean, confident, no shadows.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.649, exitAt: 0.659,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.657, exitAt: 0.672,
    text: 'SERVICES',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.669, exitAt: 0.695,
    text: 'Everything is handled.\nYou do not need to worry\nabout a single note.',
    position: 'center', animation: 'fade-up',
    className: H2 + ' max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.692, exitAt: 0.716,
    text: 'I arrive before anyone else.\nEvery note is sound-checked\nin the room before your first\nguest walks in.\nYour cue sheet is rehearsed\nuntil it feels like instinct.',
    position: 'center', animation: 'fade-up',
    className: BODY + ' max-w-[420px] mx-auto',
  },
  {
    enterAt: 0.713, exitAt: 0.732,
    text: 'Every booking includes:\nPiano · Backup Piano · Sound System\nPrinted Cue Sheet · Liability Insurance · Rain Cover',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: BODY_SM + ' max-w-[420px] mx-auto',
  },
  // ── Pricing ──
  {
    enterAt: 0.729, exitAt: 0.744,
    text: 'PRICING',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  {
    enterAt: 0.741, exitAt: 0.762,
    text: 'The Vow — $650\nThe ceremony itself.\n30 to 45 minutes of devoted presence\nat the most sacred hour of your life.',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: H3 + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.759, exitAt: 0.780,
    text: 'The Hour — $750\nMost Chosen\nFrom guest arrival through the ceremony\nand into your first moments as married.',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: H3 + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.777, exitAt: 0.798,
    text: 'The Story — $1,200\nYour full-day witness.\nFrom the first guest arriving\nto the last glass raised.',
    position: 'center', animation: 'fade-up',
    isGlass: true,
    className: H3 + ' max-w-[460px] mx-auto',
  },
  {
    enterAt: 0.795, exitAt: 0.810,
    text: 'Reserve My Date! →',
    position: 'center', animation: 'scale',
    isCta: true, href: '/contact',
    className: 'cn-inline-cta',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VII — THE PROOF (0.776 – 0.905)
  // VIDEO: Peak brightness, flower petals begin falling,
  // ethereal luminance. Names merged into quotes for
  // tighter pacing. The vow question begins here as
  // petals fall — "sacredness and celebration" lands
  // with the visual climax of ACT VII.
  // ═══════════════════════════════════════════════════════════

  {
    enterAt: 0.810, exitAt: 0.820,
    text: '', isDivider: true,
    position: 'center', animation: 'fade', className: '',
  },
  {
    enterAt: 0.818, exitAt: 0.832,
    text: 'TESTIMONIALS',
    isLabel: true,
    position: 'center', animation: 'fade-up',
    className: LABEL,
  },
  // ── Quotes with names — tight pacing to make room for the close ──
  {
    enterAt: 0.829, exitAt: 0.856,
    text: '"He played the song I walked down\nthe aisle to — and I forgot\nthere were a hundred people watching."\n— Sarah & James, Priddis',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  {
    enterAt: 0.853, exitAt: 0.878,
    text: '"Our guests still talk about\nthe music. Not the food.\nNot the flowers. The music."\n— Emily & David, Fairmont Macdonald',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[500px] mx-auto',
  },
  // ── The vow question begins as petals fall — late ACT VII ──
  {
    enterAt: 0.875, exitAt: 0.895,
    text: 'If you ask me:',
    position: 'center', animation: 'fade-up',
    className: H3 + ' italic',
  },
  // ── "sacredness and celebration" — enters WITH the petals falling ──
  {
    enterAt: 0.888, exitAt: 0.914,
    text: '"Parker Gawryletz,\nDo you promise to hold\nthe tension of the sacred\nand the celebration?',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[520px] mx-auto',
  },

  // ═══════════════════════════════════════════════════════════
  // ACT VIII — THE CLOSE (0.905 – 1.000)
  // VIDEO: Veil parts, silhouette figure in gold light,
  // particles dense as stars. Sacred stillness.
  //
  // "hope and the depth" enters as ACT VIII begins —
  // the veil parts, the silhouette appears.
  // "I will answer:" fades. Then SILENCE. A breath.
  // Then "I do." emerges alone with the silhouette.
  // ═══════════════════════════════════════════════════════════

  // ── "hope and the depth" — enters as veil parts, ACT VIII begins ──
  {
    enterAt: 0.910, exitAt: 0.935,
    text: 'Both the hope\nand the depth?"',
    position: 'center', animation: 'fade-up',
    className: QUOTE + ' max-w-[520px] mx-auto',
  },
  {
    enterAt: 0.932, exitAt: 0.952,
    text: 'I will answer:',
    position: 'center', animation: 'fade',
    className: H3 + ' italic',
  },
  // ── THE BREATH — no text from 0.955 to 0.965 ──
  // ── The silhouette stands alone in gold light ──
  // ── THE ANSWER — "I do." upper center, CTA anchored at bottom ──
  {
    enterAt: 0.965, exitAt: 1.5,
    text: 'I do.',
    position: 'center', animation: 'scale',
    hasGlow: true,
    className: H1_SACRED + ' italic final-hero',
  },
  {
    enterAt: 0.970, exitAt: 1.5,
    text: 'Reserve My Date! →',
    position: 'center', animation: 'fade-up',
    isCta: true, href: '/contact',
    className: 'cn-inline-cta cn-inline-cta--large final-anchor',
  },
];
