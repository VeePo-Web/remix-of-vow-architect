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
      `}</style>
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause ambient piano" : "Hear me play"}
        className={cn(
          "fixed bottom-4 left-4 md:bottom-6 md:left-6 z-30",
          "h-10 rounded-full px-4 flex items-center gap-2",
          "backdrop-blur-sm select-none",
          "opacity-0 animate-fade-in",
          "transition-[background-color,border-color] duration-[180ms]",
          isPlaying
            ? "bg-white/[0.08] border border-[hsl(var(--vow-yellow)/0.15)]"
            : "bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10]"
        )}
        style={{ animationDelay: "2000ms", animationFillMode: "forwards" }}
      >
        {isPlaying ? (
          <Pause size={12} strokeWidth={2} className="text-foreground/70" />
        ) : (
          <Play size={12} strokeWidth={2} className="text-foreground/70 ml-0.5" />
        )}

        <span
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-opacity duration-[180ms]"
        >
          {isPlaying ? tracks[activeIndex].title : "Hear me play"}
        </span>

        {isPlaying && <WaveformBars active reduced={reduced} />}

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
