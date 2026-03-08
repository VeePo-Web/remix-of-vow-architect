import { useState, useRef, useEffect, useCallback } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Footer } from "@/components/Footer";
import { ListeningMovement } from "@/components/ListeningMovement";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import listenHero from "@/assets/listen-hero.jpg";

const listenSections = [
  { id: "listen-hero",     label: "The Room",       isBlackKey: false },
  { id: "listen-movements", label: "The Movements", isBlackKey: true  },
  { id: "listen-crossing",  label: "The Crossing",  isBlackKey: false },
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

/* ── Mini Now-Playing Bar ── */
function NowPlayingMini({
  visible,
  trackTitle,
  isPlaying,
  progress,
  duration,
  onToggle,
}: {
  visible: boolean;
  trackTitle: string;
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
        <span className="now-playing-bar__title">{trackTitle}</span>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function Listen() {
  usePageTheme();

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
      // Auto-play when scrolling into a new movement
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
    <div className="min-h-screen bg-background text-foreground">
      <MinimalHeader />
      <PianoKeyNav sections={listenSections} />
      <audio ref={audioRef} preload="none" />

      {/* Film grain */}
      <div className="grain opacity-[0.06]" style={{ willChange: "opacity" }} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <img
          src={listenHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
          style={{ animation: "ken-burns 25s ease-in-out infinite alternate", willChange: "transform" }}
          loading="eager"
          aria-hidden="true"
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
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[hsl(var(--vow-yellow)/0.6)] mb-6">
            An Immersive Experience
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">
            The Listening Room
          </h1>
          <div className="chapter-rule mx-auto mb-6" />
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed">
            Close your eyes. Press play. Feel what your ceremony sounds like.
          </p>

          {!hasEntered ? (
            <button
              onClick={handleEnter}
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300",
                "border border-[hsl(var(--vow-yellow)/0.3)] bg-[hsl(var(--vow-yellow)/0.08)]",
                "text-[hsl(var(--vow-yellow))] hover:bg-[hsl(var(--vow-yellow)/0.14)]",
                "hover:border-[hsl(var(--vow-yellow)/0.5)] hover:scale-[1.03]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.5)]"
              )}
            >
              <Play size={18} strokeWidth={2} className="ml-0.5" />
              <span className="font-display text-[15px] tracking-wide">
                Enter the Room
              </span>
            </button>
          ) : (
            <p className="text-sm text-muted-foreground/50 animate-fade-in">
              Scroll to journey through the ceremony.
            </p>
          )}
        </div>

        {/* Scroll cue */}
        {hasEntered && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in">
            <div
              className="w-px h-12 mx-auto"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.4), transparent)",
              }}
            />
          </div>
        )}
      </section>

      {/* Section fade from hero to movements */}
      <div className="section-fade-bottom" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--vigil-void)))", marginTop: "-80px", height: "80px", position: "relative", zIndex: 2 }} aria-hidden="true" />

      {/* ── Golden vertical thread ── */}
      <div
        className="fixed left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, hsl(var(--vow-yellow) / 0.06) 30%, hsl(var(--vow-yellow) / 0.06) 70%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      {/* ── MOVEMENTS ── */}
      {movements.map((movement, i) => (
        <ListeningMovement
          key={movement.numeral}
          index={i}
          numeral={movement.numeral}
          title={movement.title}
          trackTitle={movement.trackTitle}
          context={movement.context}
          src={movement.src}
          description={movement.description}
          isActive={activeIndex === i}
          isPlaying={activeIndex === i && isPlaying}
          progress={activeIndex === i ? progress : 0}
          duration={activeIndex === i ? duration : 0}
          onPlay={playTrack}
          onPause={pauseTrack}
          onInView={handleInView}
        />
      ))}

      {/* Section fade before crossing */}
      <div className="section-fade-bottom" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--vigil-void)))", height: "80px", position: "relative", zIndex: 2 }} aria-hidden="true" />

      {/* ── THE CROSSING CTA ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[hsl(var(--vow-yellow)/0.6)] mb-4">
            The Crossing
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground/90 mb-3">
            Every arrangement begins with a conversation.
          </h2>
          <div className="chapter-rule mx-auto mb-8" />
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Hold My Date
            </Button>
          </Link>
        </div>
      </section>

      {/* Now Playing mini bar */}
      <NowPlayingMini
        visible={isPlaying && hasEntered}
        trackTitle={activeIndex !== null ? movements[activeIndex].trackTitle : ""}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        onToggle={togglePlayPause}
      />


      <Footer />
    </div>
  );
}
