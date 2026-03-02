import { cn } from "@/lib/utils";
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
        "genre-card group relative overflow-hidden rounded-lg",
        "aspect-[4/5] w-full",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.5)]",
        isActive && "genre-card--active"
      )}
      style={{
        border: isActive
          ? "1px solid hsl(var(--vow-yellow) / 0.35)"
          : `1px solid hsl(var(--vow-yellow) / ${isHovered ? 0.2 : 0.08})`,
        transform: isActive ? "translateY(-2px)" : isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isActive
          ? "0 6px 30px rgba(0,0,0,0.35), 0 0 30px hsl(var(--vow-yellow) / 0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 6px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      aria-label={`${label} — ${trackCount} tracks`}
      aria-pressed={isActive}
    >
      {/* Background image — blurred atmospheric, Ken Burns only when active */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: isActive ? 0.35 : 0.2,
          filter: "blur(4px) saturate(0.6)",
          animation: isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "ken-burns-drift 30s ease-in-out infinite alternate" : "none",
          transition: "opacity 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
        loading="lazy"
        aria-hidden="true"
      />

      {/* Per-genre atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradient,
          opacity: isActive ? 1 : 0.7,
          transition: "opacity 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(220 15% 6% / 0.40) 0%, hsl(220 15% 4% / 0.50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Inner glow — intensifies when active, replaces play icon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isActive
            ? `radial-gradient(circle at 50% 40%, ${accent.replace(")", " / 0.15)")} 0%, transparent 60%)`
            : `radial-gradient(circle at 50% 40%, ${accent.replace(")", " / 0.04)")} 0%, transparent 60%)`,
          transition: "background 400ms cubic-bezier(0.4,0,0.2,1)",
          animation: isActive && isPlaying && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "exhale-pulse 3.2s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="grain absolute inset-0 opacity-[0.04] pointer-events-none rounded-lg" aria-hidden="true" />

      {/* Content — label and context only */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-3">
        {/* Breathing golden dot — active indicator, idle breathe when resting */}
        <div
          className="mb-4"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: isActive ? "hsl(var(--vow-yellow))" : `${accent.replace(")", " / 0.25)")}`,
            boxShadow: isActive ? "0 0 12px hsl(var(--vow-yellow) / 0.4)" : "none",
            animation: isActive
              ? "divider-diamond-breathe 3s cubic-bezier(0.4,0,0.6,1) infinite"
              : "golden-dot-idle 6s cubic-bezier(0.4,0,0.6,1) infinite",
            transition: "background 180ms, box-shadow 180ms",
          }}
          aria-hidden="true"
        />

        {/* Genre label — Cormorant light (300-400 rule) */}
        <span className="text-[13px] uppercase tracking-[0.18em] font-display font-light text-foreground/80">
          {label}
        </span>

        {/* Context phrase — Inter (body sans, not display italic) */}
        <span
          className={cn(
            "text-[11px] font-sans text-foreground/40 mt-1.5 text-center leading-tight",
            "transition-opacity duration-[180ms]",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {context}
        </span>
      </div>

      {/* Bottom accent bar when active */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: isActive
            ? `linear-gradient(to right, transparent, ${accent}, transparent)`
            : "transparent",
          transition: "background 180ms cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />
    </button>
  );
}
