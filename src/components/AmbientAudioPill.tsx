import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
  { title: "Nocturne", src: "" },
  { title: "Canon in D", src: "" },
  { title: "Clair de Lune", src: "" },
];

function WaveformBars({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-[14px]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-[3px] rounded-full",
            active ? "bg-[hsl(var(--vow-yellow))]" : "bg-foreground/15"
          )}
          style={{
            height: active && !reduced ? undefined : `${4 + Math.sin(i * 1.2) * 5}px`,
            animation: active && !reduced
              ? `ambient-wave 900ms ease-in-out ${i * 120}ms infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function AmbientAudioPill() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => {
      const next = (activeIndex + 1) % tracks.length;
      setActiveIndex(next);
      if (tracks[next].src) {
        audio.src = tracks[next].src;
        audio.play().catch(() => {});
      } else {
        setIsPlaying(false);
      }
    };
    const onErr = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, [activeIndex]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src || audio.src === window.location.href) {
        const t = tracks[activeIndex];
        if (!t.src) return; // no src yet
        audio.src = t.src;
      }
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, activeIndex]);

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} preload="none" />
      <style>{`
        @keyframes ambient-wave {
          0% { height: 4px; }
          100% { height: 14px; }
        }
        @keyframes pill-surface {
          0% { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pill-surface {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        }
      `}</style>
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause ambient piano" : "Hear me play"}
        className={cn(
          "fixed bottom-16 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-30",
          "h-10 rounded-full px-4 flex items-center gap-2",
          "backdrop-blur-sm select-none",
          "opacity-0",
          "transition-[background-color,border-color] duration-[180ms]",
          "border",
          isPlaying
            ? "bg-white/[0.08]"
            : "bg-white/[0.06] hover:bg-white/[0.10]"
        )}
        style={{
          animation: "pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) 2000ms forwards",
          borderColor: isPlaying ? "hsl(var(--vow-yellow) / 0.15)" : "rgba(255,255,255,0.08)",
        }}
      >
        <span className="relative w-[14px] h-[14px] flex-shrink-0">
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            <Play size={12} strokeWidth={2} className="text-foreground/70 translate-x-[1px]" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
          >
            <Pause size={12} strokeWidth={2} className="text-foreground/70" />
          </span>
        </span>

        <span className="relative min-w-[80px] h-[14px] flex items-center">
          <span
            className={cn(
              "absolute inset-0 flex items-center font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-opacity duration-[180ms]",
              isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            Hear me play
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-opacity duration-[180ms]",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
          >
            {tracks[activeIndex].title}
          </span>
        </span>

        <div
          className={cn(
            "overflow-hidden transition-all duration-[260ms]",
            isPlaying ? "opacity-100 max-w-[40px]" : "opacity-0 max-w-0"
          )}
        >
          <WaveformBars active={isPlaying} reduced={reduced} />
        </div>

        {/* Progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-full overflow-hidden">
          <div
            className="h-full bg-[hsl(var(--vow-yellow)/0.4)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </button>
    </>
  );
}
