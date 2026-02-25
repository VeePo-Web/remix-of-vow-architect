import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import soundKeys from "@/assets/sound-cathedral-ai.jpg";
import { AudioPlayer } from "./AudioPlayer";

const tracks = [
  { title: "Canon in D (reimagined)", context: "Processional", src: "/audio/canon-in-d.mp3" },
  { title: "A Thousand Years", context: "Bride's Entrance", src: "/audio/a-thousand-years.mp3" },
  { title: "Married Life", context: "Signing", src: "/audio/married-life.mp3" },
  { title: "At Last", context: "Recession", src: "/audio/at-last.mp3" },
];

function NowPlayingBar({
  visible,
  trackTitle,
  trackContext,
  isPlaying,
  progress,
  duration,
}: {
  visible: boolean;
  trackTitle: string;
  trackContext: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}) {
  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleToggle = () => {
    (window as any).__sacredSoundToggle?.();
  };

  return (
    <div
      className={cn(
        "now-playing-bar",
        visible ? "now-playing-bar--visible" : ""
      )}
      aria-label="Now playing"
      role="region"
    >
      {/* Progress track */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/5">
        <div
          className="h-full bg-[hsl(var(--vow-yellow))] transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleToggle}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
              isPlaying
                ? "bg-[hsl(var(--vow-yellow))] text-black"
                : "bg-foreground/10 text-foreground/70"
            )}
            style={{ transition: "all 180ms cubic-bezier(.22,.61,.36,1)" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} className="ml-0.5" />}
          </button>
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--vow-yellow)/0.7)] block leading-none mb-0.5">
              {trackContext}
            </span>
            <span className="text-xs text-foreground/80 font-display truncate block">
              {trackTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheSound() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [sectionInView, setSectionInView] = useState(true);
  const [playState, setPlayState] = useState({
    playing: false,
    trackIndex: null as number | null,
    progress: 0,
    duration: 0,
  });

  // Track whether section is in view for mini-bar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  const handlePlayStateChange = useCallback(
    (playing: boolean, trackIndex: number | null, progress: number, duration: number) => {
      setPlayState({ playing, trackIndex, progress, duration });
    },
    []
  );

  const showMiniBar = playState.playing && !sectionInView && playState.trackIndex !== null;
  const activeTrack = playState.trackIndex !== null ? tracks[playState.trackIndex] : null;

  return (
    <>
      <section
        ref={sectionRef}
        className="section--dark section-grain relative min-h-[400px] py-24 md:py-32 overflow-hidden"
        style={{ minHeight: '400px' }}
        aria-labelledby="sound-heading"
      >
        {/* Top fade from TheInvitation warm */}
        <div
          className="section-fade-top"
          style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
          aria-hidden="true"
        />

        {/* Background image layer */}
        <img
          src={soundKeys}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none"
          loading="lazy"
          aria-hidden="true"
        />
        {/* Subtle radial glow behind content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Label */}
            <span
              className={cn(
                "inline-block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              The Sound
            </span>

            {/* Headline */}
            <h2
              id="sound-heading"
              className={cn(
                "text-[clamp(28px,4vw,42px)] font-display font-light leading-tight text-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
            >
              Music that holds the room still.
            </h2>

            {/* Subhead */}
            <p
              className={cn(
                "text-lg font-display font-light italic text-muted-foreground mb-12 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              The prelude. The procession. The vows. The walk into forever.
            </p>

            {/* Interactive Audio Player */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
            >
              <AudioPlayer tracks={tracks} onPlayStateChange={handlePlayStateChange} />
            </div>

            {/* Closing Caption */}
            <p
              className={cn(
                "text-sm text-muted-foreground max-w-lg mx-auto transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              Every arrangement begins with a conversation—and ends with a sound that belongs only to you.
            </p>
          </div>
        </div>

        {/* Bottom fade into Transformation dark */}
        <div
          className="section-fade-bottom"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 15% 8%))' }}
          aria-hidden="true"
        />
      </section>

      {/* Floating Now Playing Mini-Bar */}
      <NowPlayingBar
        visible={showMiniBar}
        trackTitle={activeTrack?.title ?? ""}
        trackContext={activeTrack?.context ?? ""}
        isPlaying={playState.playing}
        progress={playState.progress}
        duration={playState.duration}
      />
    </>
  );
}
