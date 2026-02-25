import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
  // Classical
  { title: "Nocturne", src: "" },
  { title: "Clair de Lune", src: "" },
  { title: "Canon in D", src: "" },
  // Contemporary
  { title: "A Thousand Years", src: "" },
  { title: "Turning Page", src: "" },
  { title: "All of Me", src: "" },
  // Film / Cinematic
  { title: "River Flows in You", src: "" },
  { title: "Comptine d'un autre été", src: "" },
  { title: "Moon River", src: "" },
];

function fisherYatesShuffle(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const barHeights = [10, 14, 12, 8];
const barOpacities = [0.7, 1, 0.85, 0.6];
const idleHeights = [5, 7, 6, 4];

function WaveformBars({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-[16px]" aria-hidden="true">
      {barHeights.map((maxH, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: active && !reduced ? undefined : `${idleHeights[i]}px`,
            background: active
              ? `hsl(var(--vow-yellow) / ${barOpacities[i]})`
              : "hsl(var(--foreground) / 0.15)",
            animation: active && !reduced
              ? `ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`
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
  const [shuffledOrder, setShuffledOrder] = useState<number[]>(() => fisherYatesShuffle(tracks.length));
  const [shufflePos, setShufflePos] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(() => tracks[fisherYatesShuffle(tracks.length)[0]]?.title ?? "");
  const [titleVisible, setTitleVisible] = useState(true);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const activeTrackIndex = shuffledOrder[shufflePos] ?? 0;

  // Initialize displayedTitle from first shuffled track
  useEffect(() => {
    setDisplayedTitle(tracks[shuffledOrder[0]]?.title ?? "");
  }, []);

  // Title crossfade on track change
  useEffect(() => {
    setTitleVisible(false);
    const t = setTimeout(() => {
      setDisplayedTitle(tracks[activeTrackIndex]?.title ?? "");
      setTitleVisible(true);
    }, 120);
    return () => clearTimeout(t);
  }, [activeTrackIndex]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => advanceTrack();
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
  }, [shufflePos, shuffledOrder]);

  const advanceTrack = useCallback(() => {
    const nextPos = shufflePos + 1;
    if (nextPos >= shuffledOrder.length) {
      const newOrder = fisherYatesShuffle(tracks.length);
      setShuffledOrder(newOrder);
      setShufflePos(0);
      const t = tracks[newOrder[0]];
      if (t.src) {
        audioRef.current!.src = t.src;
        audioRef.current!.play().catch(() => {});
      }
    } else {
      setShufflePos(nextPos);
      const t = tracks[shuffledOrder[nextPos]];
      if (t.src) {
        audioRef.current!.src = t.src;
        audioRef.current!.play().catch(() => {});
      }
    }
  }, [shufflePos, shuffledOrder]);

  const skipToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (audio) audio.pause();
    advanceTrack();
  }, [advanceTrack]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const t = tracks[activeTrackIndex];
      if (t.src) {
        if (!audio.src || audio.src === window.location.href) {
          audio.src = t.src;
        }
        audio.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  }, [isPlaying, activeTrackIndex]);

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} preload="none" />
      <style>{`
        @keyframes ambient-wave-0 { 0% { height: 3px; } 100% { height: 10px; } }
        @keyframes ambient-wave-1 { 0% { height: 4px; } 100% { height: 14px; } }
        @keyframes ambient-wave-2 { 0% { height: 3px; } 100% { height: 12px; } }
        @keyframes ambient-wave-3 { 0% { height: 2px; } 100% { height: 8px; } }
        @keyframes pill-surface {
          0% { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pill-breathe {
          0% { opacity: 0.82; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pill-surface {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes pill-breathe {
            0% { opacity: 1; }
            100% { opacity: 1; }
          }
        }
      `}</style>
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause ambient piano" : "Hear me play"}
        className={cn(
          "fixed bottom-16 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-30",
          "h-11 rounded-full px-5 flex items-center gap-2",
          "backdrop-blur-md select-none",
          entranceComplete ? "opacity-100" : "opacity-0",
          "transition-[background-color,border-color] duration-[180ms]",
          "border",
          isPlaying
            ? "bg-black/50"
            : "bg-black/40 hover:bg-black/45"
        )}
        style={{
          animation: !entranceComplete
            ? "pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) 2000ms forwards"
            : entranceComplete && !isPlaying && !reduced
              ? "pill-breathe 4000ms ease-in-out infinite alternate"
              : "none",
          borderColor: isPlaying ? "hsl(var(--vow-yellow) / 0.20)" : "rgba(255,255,255,0.12)",
          boxShadow: isPlaying
            ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px rgba(255,224,138,0.06)"
            : "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <span className="relative w-[14px] h-[14px] flex-shrink-0">
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            <Play size={14} strokeWidth={2} className="text-foreground/70 translate-x-[1px]" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
          >
            <Pause size={14} strokeWidth={2} className="text-foreground/70" />
          </span>
        </span>

        <span className="relative min-w-[100px] h-5 flex items-center">
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap font-sans text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-[180ms]",
              isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            Hear me play
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-sans text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-[120ms]",
              isPlaying && titleVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {displayedTitle}
          </span>
        </span>

        <div
          className={cn(
            "overflow-hidden transition-all duration-[260ms] flex items-center gap-1",
            isPlaying ? "opacity-100 max-w-[60px]" : "opacity-0 max-w-0"
          )}
        >
          <WaveformBars active={isPlaying} reduced={reduced} />
          <span
            role="button"
            tabIndex={0}
            aria-label="Skip to next track"
            onClick={skipToNext}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); skipToNext(e as any); } }}
            className={cn(
              "flex-shrink-0 cursor-pointer transition-opacity duration-[180ms]",
              isPlaying ? "opacity-40 hover:opacity-70" : "opacity-0 pointer-events-none"
            )}
          >
            <Shuffle size={10} className="text-muted-foreground" />
          </span>
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
