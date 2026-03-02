import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

/* ─── Genre accent colors (muted, warm) ─── */
const genreAccents: Record<string, string> = {
  hymns: "hsl(35 60% 55%)",
  worship: "hsl(45 70% 60%)",
  pop: "hsl(350 50% 55%)",
  classical: "hsl(40 30% 70%)",
  film: "hsl(200 30% 55%)",
};

/* ─── Per-genre atmospheric gradients ─── */
const genreGradients: Record<string, string> = {
  hymns: "radial-gradient(ellipse at 50% 40%, hsl(35 60% 20% / 0.4) 0%, transparent 70%)",
  worship: "radial-gradient(ellipse at 50% 40%, hsl(45 50% 18% / 0.35) 0%, transparent 70%)",
  pop: "radial-gradient(ellipse at 50% 40%, hsl(350 40% 18% / 0.3) 0%, transparent 70%)",
  classical: "radial-gradient(ellipse at 50% 40%, hsl(40 25% 16% / 0.3) 0%, transparent 70%)",
  film: "radial-gradient(ellipse at 50% 40%, hsl(200 30% 15% / 0.35) 0%, transparent 70%)",
};

/* ─── Mini waveform inside circle ─── */
function CircleWaveform({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-[2px] h-[14px]" aria-hidden="true">
      {[5, 9, 7, 4].map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            background: color,
            animation: `sound-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

interface GenreCardProps {
  id: string;
  label: string;
  context: string;
  image: string;
  isActive: boolean;
  isPlaying: boolean;
  trackCount: number;
  onClick: () => void;
}

export function GenreCard({
  id,
  label,
  context,
  image,
  isActive,
  isPlaying,
  trackCount,
  onClick,
}: GenreCardProps) {
  const accent = genreAccents[id] || "hsl(var(--vow-yellow))";
  const gradient = genreGradients[id] || genreGradients.hymns;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "genre-card group relative overflow-hidden rounded-xl",
        "aspect-[4/5] w-full",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.5)]",
        isActive && "genre-card--active"
      )}
      style={{
        border: isActive
          ? "1px solid hsl(var(--vow-yellow) / 0.35)"
          : `1px solid hsl(var(--vow-yellow) / ${isHovered ? 0.2 : 0.08})`,
        transform: isActive ? "scale(1.02)" : isHovered ? "translateY(-2px)" : "scale(1)",
        boxShadow: isActive
          ? "0 0 30px hsl(var(--vow-yellow) / 0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "all 300ms cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
      aria-label={`${label} — ${trackCount} tracks`}
      aria-pressed={isActive}
    >
      {/* Background image — blurred atmospheric */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.4]"
        style={{
          opacity: isActive ? 0.35 : 0.2,
          filter: "blur(4px) saturate(0.6)",
          animation: "ken-burns-drift 30s ease-in-out infinite alternate",
        }}
        loading="lazy"
        aria-hidden="true"
      />

      {/* Per-genre atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: gradient,
          opacity: isActive ? 1 : 0.7,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay — reduced to let imagery breathe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(220 15% 6% / 0.40) 0%, hsl(220 15% 4% / 0.50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Warm radial glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accent.replace(')', ' / 0.08)')} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="grain absolute inset-0 opacity-[0.04] pointer-events-none rounded-xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-3">
        {/* Circular play indicator */}
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            "border transition-all duration-[180ms]",
            "mb-4"
          )}
          style={{
            borderColor: isActive
              ? "hsl(var(--vow-yellow) / 0.35)"
              : "hsl(0 0% 100% / 0.15)",
            background: isActive
              ? `linear-gradient(135deg, hsl(var(--vow-yellow) / 0.12), ${accent.replace(')', ' / 0.08)')})`
              : `linear-gradient(135deg, hsl(0 0% 100% / 0.05), ${accent.replace(')', ' / 0.04)')})`,
            boxShadow: isActive
              ? `inset 0 2px 4px rgba(0,0,0,0.3), 0 0 16px ${accent.replace(')', ' / 0.15)')}`
              : "inset 0 2px 4px rgba(0,0,0,0.3)",
            animation: isActive && isPlaying
              ? "exhale-pulse 2.8s cubic-bezier(0.4,0,0.6,1) infinite"
              : "none",
          }}
        >
          {isActive && isPlaying ? (
            <CircleWaveform color={accent} />
          ) : isActive ? (
            <Pause size={18} style={{ color: accent }} />
          ) : (
            <Play size={18} className="ml-0.5" style={{ color: accent, opacity: 0.7 }} />
          )}
        </div>

        {/* Genre label */}
        <span
          className="text-[13px] uppercase tracking-[0.18em] font-display font-medium text-foreground/80"
        >
          {label}
        </span>

        {/* Context phrase — visible on hover or when active */}
        <span
          className={cn(
            "text-[11px] font-display italic text-foreground/40 mt-1.5 text-center leading-tight",
            "transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {context}
        </span>
      </div>

      {/* Bottom accent bar when active */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(to right, transparent, ${accent}, transparent)`
            : "transparent",
        }}
        aria-hidden="true"
      />
    </button>
  );
}
