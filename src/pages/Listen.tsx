import { useState, useRef, useEffect, useCallback } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Footer } from "@/components/Footer";
import { ListeningMovement } from "@/components/ListeningMovement";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import listenHero from "@/assets/listen-hero.jpg";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";

/* ── PianoKeyNav sections — 6 keys for proper density ── */
const listenSections = [
  { id: "listen-hero",      label: "The Room",        isBlackKey: false },
  { id: "listen-prelude",   label: "Prelude",         isBlackKey: true  },
  { id: "listen-ceremony",  label: "Ceremony",        isBlackKey: false },
  { id: "listen-words",     label: "Kind Words",      isBlackKey: true  },
  { id: "listen-cta",       label: "Reserve My Date!", isBlackKey: false },
];

/* ── Track data ── */
const movements = [
  {
    numeral: "I",
    title: "The Prelude",
    trackTitle: "Canon in D (reimagined)",
    context: "Movement I",
    src: "/audio/canon-in-d.mp3",
    description:
      "Before anyone arrives, the room fills with possibility. The first notes settle into empty chairs — a quiet promise that something sacred is about to begin.",
  },
  {
    numeral: "II",
    title: "The Processional",
    trackTitle: "A Thousand Years",
    context: "Movement II",
    src: "/audio/a-thousand-years.mp3",
    description:
      "The doors open. Footsteps begin. Every step down the aisle carries the weight of every moment that led here.",
  },
  {
    numeral: "III",
    title: "The Entrance",
    trackTitle: "Married Life",
    context: "Movement III",
    src: "/audio/married-life.mp3",
    description:
      "Everyone stands. Time stops. The room holds its breath — and in the silence between heartbeats, she appears.",
  },
  {
    numeral: "IV",
    title: "The Vow",
    trackTitle: "At Last",
    context: "Movement IV",
    src: "/audio/at-last.mp3",
    description:
      "The silence after 'I do.' A single note that carries the weight of a lifetime promise — played so it echoes beyond the room, beyond the day.",
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    quote: "I closed my eyes and I was back in that room. The piano brought me right back to the moment he said my name.",
    author: "Sarah & James",
    location: "Lake Louise",
  },
  {
    quote: "We listened to every sample before booking. By the second track, we both knew.",
    author: "Kaitlyn & Matthew",
    location: "Canmore",
  },
  {
    quote: "My grandmother in the last row heard every word. That is all I needed to know.",
    author: "Chantal",
    location: "Cochrane",
  },
];

/* ── Mini Now-Playing Bar ── */
function NowPlayingMini({
  visible,
  trackTitle,
  movementContext,
  isPlaying,
  progress,
  duration,
  onToggle,
}: {
  visible: boolean;
  trackTitle: string;
  movementContext: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onToggle: () => void;
}) {
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "now-playing-bar",
        visible && "is-visible"
      )}
    >
      <div className="now-playing-bar__progress" style={{ width: `${pct}%` }} />
      <div className="now-playing-bar__content">
        <button
          onClick={onToggle}
          className="now-playing-bar__toggle"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-px" />}
        </button>
        <span className="now-playing-bar__context">{movementContext}</span>
        <span className="now-playing-bar__separator" aria-hidden="true">&middot;</span>
        <span className="now-playing-bar__title">{trackTitle}</span>
      </div>
    </div>
  );
}

/* ── Gold diamond separator between testimonials ── */
function ListenDiamond() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden="true">
      <span
        className="h-px w-10"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2))" }}
      />
      <span
        className="inline-block w-[5px] h-[5px] rotate-45"
        style={{ background: "hsl(var(--vow-yellow) / 0.3)" }}
      />
      <span
        className="h-px w-10"
        style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.2), transparent)" }}
      />
    </div>
  );
}

/* ── Page ── */
export default function Listen() {
  usePageTheme();
  useEffect(() => {
    document.title = "The Listening Room — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Hear the sound before you choose. Four movements of a ceremony — prelude through vow — played so you feel what your day will sound like."
    );
  }, []);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Hero fade-in
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const playTrack = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (activeIndex !== index) {
        audio.pause();
        audio.src = movements[index].src;
        audio.load();
        setActiveIndex(index);
        setProgress(0);
        setDuration(0);
      }
      audio.play().catch(() => {});
      setIsPlaying(true);
    },
    [activeIndex]
  );

  const pauseTrack = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) pauseTrack();
    else if (activeIndex !== null) playTrack(activeIndex);
  }, [isPlaying, activeIndex, playTrack, pauseTrack]);

  const handleInView = useCallback(
    (index: number) => {
      if (!hasEntered) return;
      if (index !== activeIndex) {
        playTrack(index);
      }
    },
    [hasEntered, activeIndex, playTrack]
  );

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    playTrack(0);
  }, [playTrack]);

  return (
    <div className="min-h-screen" data-theme="death" style={{ background: "hsl(var(--rich-black))", color: "hsl(0 0% 100% / 0.9)" }}>
      <MinimalHeader />
      <PianoKeyNav sections={listenSections} />
      <audio ref={audioRef} preload="none" />

      {/* Film grain */}
      <div className="fixed inset-0 grain opacity-[0.06] pointer-events-none z-[1]" aria-hidden="true" />

      <main>

        {/* ═══ HERO ═══ */}
        <section id="listen-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden piano-section-target">
          {/* Hero background image */}
          <img
            src={listenHero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
            style={{ animation: "ken-burns 25s ease-in-out infinite alternate" }}
            loading="lazy"
            decoding="async"
          />
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(var(--vigil-void)) 100%)" }}
            aria-hidden="true"
          />

          {/* Breathing golden line */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[40vw] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--vow-yellow) / 0.5) 30%, hsl(var(--vow-yellow) / 0.8) 50%, hsl(var(--vow-yellow) / 0.5) 70%, transparent 100%)",
              animation: "listening-breathe 3s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div
            className={cn(
              "relative z-10 text-center px-6 transition-all duration-[800ms] ease-out",
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            {/* Eyebrow — tight coupling to headline */}
            <p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] mb-4"
              style={{ color: "hsl(var(--vow-yellow) / 0.6)" }}
            >
              An Immersive Experience
            </p>

            {/* Headline */}
            <h1
              className="font-display font-semibold tracking-[-0.03em] leading-[1.08]"
              style={{ fontSize: "clamp(40px, 7vw, 80px)", color: "hsl(var(--foreground))" }}
            >
              The Listening Room
            </h1>

            {/* Gold separator — balanced spacing */}
            <div
              className="mx-auto mt-10 mb-10"
              style={{
                width: "48px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)",
              }}
              aria-hidden="true"
            />

            {/* Body — refined measure */}
            <p
              className="font-display italic leading-[1.6] max-w-[26ch] mx-auto mb-14"
              style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "hsl(var(--foreground) / 0.5)" }}
            >
              Close your eyes. Press play. Feel what your ceremony sounds like.
            </p>

            {!hasEntered ? (
              <button
                onClick={handleEnter}
                className={cn(
                  "listen-enter-btn inline-flex items-center gap-3 px-8 py-4 rounded-full",
                  "transition-all duration-300 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
                )}
                style={{
                  border: "1px solid hsl(var(--vow-yellow) / 0.25)",
                  background: "hsl(var(--vow-yellow) / 0.06)",
                  color: "hsl(var(--vow-yellow))",
                  boxShadow: "0 0 40px hsl(var(--vow-yellow) / 0.06)",
                }}
              >
                <Play size={18} strokeWidth={2} className="ml-0.5" />
                <span className="font-display text-[15px] tracking-wide">
                  Enter the Room
                </span>
              </button>
            ) : (
              <p
                className="font-sans text-[13px] animate-fade-in"
                style={{ color: "hsl(var(--foreground) / 0.35)" }}
              >
                Scroll to journey through the ceremony.
              </p>
            )}
          </div>

          {/* Scroll cue */}
          {hasEntered && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in flex flex-col items-center gap-3">
              <p
                className="font-sans text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "hsl(var(--foreground) / 0.2)" }}
              >
                Scroll
              </p>
              <div
                className="w-px h-10 mx-auto"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.35), transparent)",
                }}
              />
            </div>
          )}
        </section>


        {/* ═══ MOVEMENTS I & II — The Prelude ═══ */}
        <div id="listen-prelude" className="piano-section-target">
          <ListeningMovement
            key={movements[0].numeral}
            index={0}
            numeral={movements[0].numeral}
            title={movements[0].title}
            trackTitle={movements[0].trackTitle}
            context={movements[0].context}
            src={movements[0].src}
            description={movements[0].description}
            isActive={activeIndex === 0}
            isPlaying={activeIndex === 0 && isPlaying}
            progress={activeIndex === 0 ? progress : 0}
            duration={activeIndex === 0 ? duration : 0}
            onPlay={playTrack}
            onPause={pauseTrack}
            onInView={handleInView}
          />

          {/* Gold thread between movements */}
          <div className="flex flex-col items-center py-4" aria-hidden="true">
            <div
              className="w-px h-20"
              style={{ background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.2), hsl(var(--vow-yellow) / 0.06))" }}
            />
            <div
              className="w-1 h-1 rounded-full mt-1"
              style={{ background: "hsl(var(--vow-yellow) / 0.15)" }}
            />
          </div>

          <ListeningMovement
            key={movements[1].numeral}
            index={1}
            numeral={movements[1].numeral}
            title={movements[1].title}
            trackTitle={movements[1].trackTitle}
            context={movements[1].context}
            src={movements[1].src}
            description={movements[1].description}
            isActive={activeIndex === 1}
            isPlaying={activeIndex === 1 && isPlaying}
            progress={activeIndex === 1 ? progress : 0}
            duration={activeIndex === 1 ? duration : 0}
            onPlay={playTrack}
            onPause={pauseTrack}
            onInView={handleInView}
          />
        </div>


        {/* ═══ INTERSTITIAL — Pull Quote ═══ */}
        <div className="relative py-28 md:py-40 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Vertical gold thread */}
            <div
              className="mx-auto mb-10"
              style={{
                width: "1px",
                height: "48px",
                background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.4), transparent)",
              }}
              aria-hidden="true"
            />

            {/* Quote */}
            <p
              className="font-display italic leading-[1.55]"
              style={{
                fontSize: "clamp(18px, 2.2vw, 26px)",
                color: "hsl(var(--foreground) / 0.5)",
                maxWidth: "30ch",
                margin: "0 auto",
              }}
            >
              The sound of a ceremony is not background music. It is the emotional architecture of the room.
            </p>

            {/* Attribution */}
            <p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] mt-10"
              style={{ color: "hsl(var(--vow-yellow) / 0.35)" }}
            >
              Why I Play
            </p>
          </div>
        </div>


        {/* ═══ MOVEMENTS III & IV — The Ceremony ═══ */}
        <div id="listen-ceremony" className="piano-section-target">
          <ListeningMovement
            key={movements[2].numeral}
            index={2}
            numeral={movements[2].numeral}
            title={movements[2].title}
            trackTitle={movements[2].trackTitle}
            context={movements[2].context}
            src={movements[2].src}
            description={movements[2].description}
            isActive={activeIndex === 2}
            isPlaying={activeIndex === 2 && isPlaying}
            progress={activeIndex === 2 ? progress : 0}
            duration={activeIndex === 2 ? duration : 0}
            onPlay={playTrack}
            onPause={pauseTrack}
            onInView={handleInView}
          />

          {/* Gold thread between movements */}
          <div className="flex flex-col items-center py-4" aria-hidden="true">
            <div
              className="w-px h-20"
              style={{ background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.2), hsl(var(--vow-yellow) / 0.06))" }}
            />
            <div
              className="w-1 h-1 rounded-full mt-1"
              style={{ background: "hsl(var(--vow-yellow) / 0.15)" }}
            />
          </div>

          <ListeningMovement
            key={movements[3].numeral}
            index={3}
            numeral={movements[3].numeral}
            title={movements[3].title}
            trackTitle={movements[3].trackTitle}
            context={movements[3].context}
            src={movements[3].src}
            description={movements[3].description}
            isActive={activeIndex === 3}
            isPlaying={activeIndex === 3 && isPlaying}
            progress={activeIndex === 3 ? progress : 0}
            duration={activeIndex === 3 ? duration : 0}
            onPlay={playTrack}
            onPause={pauseTrack}
            onInView={handleInView}
          />
        </div>


        {/* ═══ EDITORIAL IMAGE ═══ */}
        <div className="py-24 md:py-36">
          <div className="max-w-4xl mx-auto px-6">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "2.55 / 1" }}
            >
              <img
                src={handsKeysImg}
                alt="Pianist's hands on keys during a ceremony, warm candlelight"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Warm vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(var(--vigil-void) / 0.6) 100%)" }}
                aria-hidden="true"
              />
            </div>
            {/* Editorial caption */}
            <p
              className="font-sans text-[11px] uppercase tracking-[0.16em] text-center mt-6"
              style={{ color: "hsl(var(--foreground) / 0.2)" }}
            >
              Live ceremony performance &middot; Calgary
            </p>
          </div>
        </div>


        {/* ═══ KIND WORDS ═══ */}
        <section id="listen-words" className="relative py-28 md:py-40 px-6 piano-section-target">
          <div className="max-w-2xl mx-auto">
            {/* Section eyebrow with flanking rules */}
            <div
              className="flex items-center justify-center gap-5 mb-20"
            >
              <span
                className="h-px flex-1 max-w-[60px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15))" }}
                aria-hidden="true"
              />
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: "hsl(var(--vow-yellow) / 0.45)" }}
              >
                What Couples Say
              </p>
              <span
                className="h-px flex-1 max-w-[60px]"
                style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.15), transparent)" }}
                aria-hidden="true"
              />
            </div>

            <div className="space-y-0">
              {testimonials.map((t, i) => (
                <div key={i}>
                  {/* Diamond separator between quotes */}
                  {i > 0 && (
                    <div className="py-10">
                      <ListenDiamond />
                    </div>
                  )}

                  <div className="text-center">
                    <p
                      className="font-display italic leading-[1.55]"
                      style={{
                        fontSize: "clamp(17px, 2vw, 22px)",
                        color: "hsl(var(--foreground) / 0.55)",
                        maxWidth: "32ch",
                        margin: "0 auto",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p
                      className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] mt-7"
                      style={{ color: "hsl(var(--foreground) / 0.25)" }}
                    >
                      {t.author} &middot; {t.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ CTA — Asymmetric grid matching ivory standard ═══ */}
        <section id="listen-cta" className="relative py-28 md:py-40 px-6 piano-section-target overflow-hidden">
          {/* Warm radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="max-w-[980px] mx-auto relative z-10">
            {/* Divider */}
            <div
              className="mb-20"
              style={{
                height: "1px",
                background: "linear-gradient(to right, hsl(var(--vow-yellow) / 0.12), transparent 80%)",
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <p
                  className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] mb-5"
                  style={{ color: "hsl(var(--vow-yellow) / 0.4)" }}
                >
                  The Next Step
                </p>
                <h2
                  className="font-display font-semibold tracking-[-0.03em] leading-[1.1]"
                  style={{
                    fontSize: "clamp(32px, 5vw, 56px)",
                    color: "hsl(var(--foreground))",
                    maxWidth: "14ch",
                  }}
                >
                  Your ceremony deserves to be heard.
                </h2>
              </div>
              <div className="md:pt-3">
                <p
                  className="font-sans text-[15px] leading-[1.7]"
                  style={{ color: "hsl(var(--foreground) / 0.5)", maxWidth: "36ch" }}
                >
                  Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan built around your day.
                </p>
                <div className="mt-10">
                  <Link
                    to="/contact"
                    className="listen-cta-btn inline-flex items-center justify-center font-sans text-[14px] font-medium tracking-[0.04em] rounded-full px-10 py-4 transition-all duration-300"
                    style={{
                      background: "hsl(var(--vow-yellow) / 0.08)",
                      border: "1px solid hsl(var(--vow-yellow) / 0.25)",
                      color: "hsl(var(--vow-yellow))",
                      boxShadow: "0 0 40px hsl(var(--vow-yellow) / 0.06)",
                    }}
                  >
                    Reserve My Date
                  </Link>
                </div>
                <p
                  className="font-sans text-[12px] mt-8"
                  style={{ color: "hsl(var(--foreground) / 0.3)" }}
                >
                  No commitment. No obligation. Just a conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Now Playing mini bar */}
      <NowPlayingMini
        visible={isPlaying && hasEntered}
        trackTitle={activeIndex !== null ? movements[activeIndex].trackTitle : ""}
        movementContext={activeIndex !== null ? movements[activeIndex].context : ""}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        onToggle={togglePlayPause}
      />

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
