import {
  useEffect, useLayoutEffect, useRef, useState, useCallback,
} from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Track {
  title:    string;
  src:      string;
  duration?: string;
}
export interface Category {
  id:         string;
  label:      string;
  descriptor: string;
  initial:    string;
  tracks:     Track[];
}

export const categories: Category[] = [
  { id: "hymns",     label: "Hymns",     descriptor: "Sacred tradition",        initial: "H", tracks: [
    { title: "Amazing Grace",             src: "", duration: "3:24" },
    { title: "Be Thou My Vision",         src: "", duration: "2:58" },
    { title: "Great Is Thy Faithfulness", src: "", duration: "4:12" },
  ]},
  { id: "worship",   label: "Worship",   descriptor: "Contemporary devotional", initial: "W", tracks: [
    { title: "10,000 Reasons",            src: "", duration: "3:47" },
    { title: "How Great Thou Art",        src: "", duration: "4:01" },
    { title: "What a Beautiful Name",     src: "", duration: "3:55" },
  ]},
  { id: "pop",       label: "Pop",       descriptor: "Modern favourites",       initial: "P", tracks: [
    { title: "A Thousand Years",          src: "", duration: "4:45" },
    { title: "All of Me",                 src: "", duration: "4:29" },
    { title: "Turning Page",              src: "", duration: "4:08" },
  ]},
  { id: "classical", label: "Classical", descriptor: "Timeless instrumental",   initial: "C", tracks: [
    { title: "Clair de Lune",             src: "", duration: "5:02" },
    { title: "Canon in D",               src: "", duration: "3:50" },
    { title: "Nocturne Op. 9 No. 2",     src: "", duration: "4:32" },
  ]},
  { id: "film",      label: "Film",      descriptor: "Cinematic & evocative",   initial: "F", tracks: [
    { title: "River Flows in You",        src: "", duration: "3:38" },
    { title: "Comptine d'un autre été",  src: "", duration: "2:54" },
    { title: "Moon River",               src: "", duration: "3:15" },
  ]},
];

export const allTracks: Track[] = categories.flatMap((c) => c.tracks);

function getCategoryStart(catId: string): number {
  let idx = 0;
  for (const cat of categories) {
    if (cat.id === catId) return idx;
    idx += cat.tracks.length;
  }
  return 0;
}

function getCategoryForTrack(trackIndex: number): Category | null {
  for (const cat of categories) {
    const start = getCategoryStart(cat.id);
    if (trackIndex >= start && trackIndex < start + cat.tracks.length) return cat;
  }
  return null;
}

function getLocalTrackIndex(globalIndex: number): number {
  const cat = getCategoryForTrack(globalIndex);
  if (!cat) return globalIndex;
  return globalIndex - getCategoryStart(cat.id);
}

function pad2(n: number): string {
  return String(n + 1).padStart(2, "0");
}

function fmt(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

const C = {
  bg:           "hsl(22 10% 5% / 0.90)",   // semi-transparent for backdrop-filter
  bgSolid:      "hsl(22 10% 5%)",
  bgCard:       "hsl(28 8% 9.5%)",
  bgCardHover:  "hsl(28 8% 12%)",
  border:       "hsl(var(--vow-yellow) / 0.16)",
  borderCard:   "hsl(var(--vow-yellow) / 0.08)",
  borderActive: "hsl(var(--vow-yellow) / 0.24)",
  divider:      "hsl(28 8% 12%)",
  hoverRow:     "hsl(28 8% 8.5%)",
  activeRow:    "radial-gradient(ellipse at 0% 50%, hsl(var(--vow-yellow) / 0.08) 0%, transparent 70%)",
  ivory:        "hsl(40 18% 84%)",
  warm:         "hsl(40 10% 55%)",
  faint:        "hsl(40 8% 36%)",
  ghost:        "hsl(40 6% 22%)",
  gold:         "hsl(var(--vow-yellow))",
} as const;

const T = {
  spring: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  out:    "cubic-bezier(0.33, 1, 0.68, 1)",
  in:     "cubic-bezier(0.55, 0, 1, 0.45)",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   PIANO STRINGS
   ═══════════════════════════════════════════════════════════════════════════ */

const STRING_POS = [6, 8.5, 11, 24, 26.5, 29, 45, 47.5, 50, 66, 68.5, 71, 87, 89.5];

function PianoStrings({ visible }: { visible: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
      <div style={{
        position: "absolute", left: 0, right: 0, top: "9px", height: "1px",
        background: "linear-gradient(90deg, transparent 2%, hsl(var(--vow-yellow)/.12) 10%, hsl(var(--vow-yellow)/.17) 50%, hsl(var(--vow-yellow)/.12) 90%, transparent 98%)",
        opacity: visible ? 1 : 0, transition: "opacity 200ms ease-out 80ms",
      }} />
      {STRING_POS.map((pct, i) => (
        <div key={i} style={{
          position: "absolute", top: "9px", bottom: 0, left: `${pct}%`, width: "0.75px",
          background: "linear-gradient(to bottom, hsl(var(--vow-yellow)/.14) 0%, hsl(var(--vow-yellow)/.04) 40%, transparent 100%)",
          opacity: visible ? 1 : 0,
          transition: `opacity 200ms ease-out ${90 + i * 10}ms`,
        }} />
      ))}
      {STRING_POS.map((pct, i) => (
        <div key={`p${i}`} style={{
          position: "absolute", top: "4px", left: `calc(${pct}% - 1px)`,
          width: "2.5px", height: "5px", borderRadius: "1px",
          background: "hsl(var(--vow-yellow)/.20)",
          opacity: visible ? 1 : 0,
          transition: `opacity 200ms ease-out ${100 + i * 10}ms`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow)/.025) 0%, transparent 55%)",
        opacity: visible ? 1 : 0, transition: "opacity 280ms ease-out 120ms",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PIANO KEYS FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function PianoKeysFoot() {
  const W = 14, wPx = 22, gap = 1;
  const totalW = W * wPx + (W - 1) * gap;
  // Acoustically correct: C D E F G A B × 2 — black keys after white-key indices 0,1,3,4,5,7,8,10,11,12
  const blackAfter = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];

  return (
    <div style={{
      position: "relative", height: "38px", flexShrink: 0,
      borderTop: "1px solid hsl(var(--vow-yellow)/.08)",
      background: "linear-gradient(180deg, hsl(22 10% 4%) 0%, hsl(22 10% 5.5%) 100%)",
      overflow: "hidden",
    }} aria-hidden="true">
      <svg viewBox={`0 0 ${totalW} 38`} style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid meet">
        {Array.from({ length: W }).map((_, i) => {
          const x = i * (wPx + gap);
          return (
            <g key={`w${i}`}>
              <rect x={x} y={2} width={wPx} height={35} rx={2} fill="hsl(38 12% 10%)" stroke="hsl(var(--vow-yellow)/.06)" strokeWidth={0.5} />
              <rect x={x + 1} y={2} width={wPx - 2} height={5} rx={1.5} fill="hsl(var(--vow-yellow)/.03)" />
              <rect x={x + wPx - 1} y={4} width={1} height={31} rx={0.5} fill="hsl(0 0% 0% / .25)" />
            </g>
          );
        })}
        {blackAfter.map((wi) => {
          const bx = wi * (wPx + gap) + wPx - 6;
          return (
            <g key={`b${wi}`}>
              <rect x={bx} y={2} width={13} height={22} rx={2} fill="hsl(20 8% 3%)" stroke="hsl(var(--vow-yellow)/.04)" strokeWidth={0.5} />
              <rect x={bx + 2} y={2} width={5} height={5} rx={1} fill="hsl(var(--vow-yellow)/.04)" />
            </g>
          );
        })}
      </svg>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "14px",
        background: "linear-gradient(to bottom, transparent, hsl(22 10% 5% / .7))",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPECTRUM WAVEFORM — true center-axis, CSS-variable-driven animation
   Each bar carries --h-idle and --h-max; one keyframe handles all 20 bars.
   ═══════════════════════════════════════════════════════════════════════════ */

// [topMaxH, botMaxH, opacity] — bell curve peaking at center (index 9)
const SPECTRUM: [number, number, number][] = [
  [6,  4, 0.28], [10, 6, 0.46], [8,  5, 0.38], [14, 9, 0.64],
  [10, 6, 0.46], [18,12, 0.84], [13, 8, 0.58], [17,11, 0.76],
  [9,  6, 0.44], [22,16, 1.00], [14, 9, 0.64], [19,13, 0.82],
  [12, 8, 0.54], [16,10, 0.72], [8,  5, 0.36], [20,14, 0.90],
  [11, 7, 0.48], [15,10, 0.68], [7,  5, 0.34], [13, 8, 0.58],
];

function SpectrumWaveform({ active, reduced }: { active: boolean; reduced: boolean }) {
  const H = 44;
  return (
    <div style={{ display: "flex", gap: "2.5px", height: `${H}px`, padding: "0 1px", overflow: "hidden" }} aria-hidden="true">
      {SPECTRUM.map(([topH, botH, op], i) => {
        const dur   = 750 + (i * 89) % 600;
        const del   = i * 44;
        const alpha = active ? op : 0.08;
        return (
          <div key={i} style={{ flex: 1, position: "relative", height: `${H}px` }}>
            {/* Top bar — grows upward from center axis */}
            <div style={{
              position: "absolute", bottom: "50%", left: 0, right: 0,
              borderRadius: "1px 1px 0 0",
              background: `hsl(var(--vow-yellow) / ${alpha})`,
              height: active && !reduced ? undefined : `${topH * 0.35}px`,
              "--h-idle": `${topH * 0.35}px`,
              "--h-max":  `${topH}px`,
              animation:  active && !reduced ? `sw-bar ${dur}ms ease-in-out ${del}ms infinite alternate` : "none",
              transition: active ? "background 300ms ease" : "height 500ms ease, background 300ms ease",
            } as React.CSSProperties} />
            {/* Center axis hairline */}
            <div style={{
              position: "absolute", top: "50%", left: 0, right: 0, height: "1px",
              transform: "translateY(-50%)",
              background: `hsl(var(--vow-yellow) / ${active ? op * 0.20 : 0.04})`,
              transition: "background 300ms ease",
            }} />
            {/* Bottom bar — grows downward from center axis */}
            <div style={{
              position: "absolute", top: "50%", left: 0, right: 0,
              borderRadius: "0 0 1px 1px",
              background: `hsl(var(--vow-yellow) / ${alpha * 0.5})`,
              height: active && !reduced ? undefined : `${botH * 0.35}px`,
              "--h-idle": `${botH * 0.35}px`,
              "--h-max":  `${botH}px`,
              animation:  active && !reduced ? `sw-bar ${dur + 200}ms ease-in-out ${del + 85}ms infinite alternate` : "none",
              transition: active ? "background 300ms ease" : "height 500ms ease, background 300ms ease",
            } as React.CSSProperties} />
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MINI WAVEFORM (pill / track rows)
   ═══════════════════════════════════════════════════════════════════════════ */

function MiniWaveform({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px", flexShrink: 0 }} aria-hidden="true">
      {[6, 10, 7, 9, 5].map((h, i) => (
        <div key={i} style={{
          width: "2px", borderRadius: "1px",
          background: `hsl(var(--vow-yellow) / ${[0.55, 1, 0.7, 0.85, 0.45][i]})`,
          height: active && !reduced ? undefined : `${h * 0.5}px`,
          "--h-idle": `${h * 0.5}px`,
          "--h-max":  `${h}px`,
          animation: active && !reduced ? `mw-bar ${800 + i * 180}ms ease-in-out ${i * 120}ms infinite alternate` : "none",
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSPORT ICONS — filled SVG, crisper than lucide at small sizes
   ═══════════════════════════════════════════════════════════════════════════ */

function IconSkipBack() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" stroke="none">
      <rect x="2" y="2.5" width="2" height="10" rx="1" />
      <path d="M13 2.5L6.5 7.5L13 12.5V2.5Z" />
    </svg>
  );
}

function IconSkipForward() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" stroke="none">
      <rect x="11" y="2.5" width="2" height="10" rx="1" />
      <path d="M2 2.5L8.5 7.5L2 12.5V2.5Z" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke="none">
      <path d="M5 3L17 10L5 17V3Z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke="none">
      <rect x="4" y="3" width="4.5" height="14" rx="1.5" />
      <rect x="11.5" y="3" width="4.5" height="14" rx="1.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NOW PLAYING CARD
   keyed on trackIndex so it remounts (and re-animates) on track change
   ═══════════════════════════════════════════════════════════════════════════ */

interface NowPlayingCardProps {
  trackIndex:  number;
  progress:    number;
  duration:    number;
  reduced:     boolean;
  isPlaying:   boolean;
  canPrev:     boolean;
  canNext:     boolean;
  onSeek?:     (ratio: number) => void;
  onPlayPause: () => void;
  onPrev:      () => void;
  onNext:      () => void;
}

function NowPlayingCard({
  trackIndex, progress, duration, reduced,
  isPlaying, canPrev, canNext,
  onSeek, onPlayPause, onPrev, onNext,
}: NowPlayingCardProps) {
  const track    = allTracks[trackIndex];
  const category = getCategoryForTrack(trackIndex);
  if (!track || !category) return null;

  const localIdx   = getLocalTrackIndex(trackIndex);
  const localTotal = category.tracks.length;
  const pct        = duration > 0 ? (progress / duration) * 100 : 0;
  const remaining  = duration > 0 ? duration - progress : 0;

  const scrubRef    = useRef<HTMLDivElement>(null);
  const [scrubHover, setScrubHover] = useState(false);

  // Unified pointer seek — works for both mouse and touch
  const getSeekRatio = useCallback((clientX: number) => {
    if (!scrubRef.current) return 0;
    const { left, width } = scrubRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - left) / width));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!onSeek) return;
    e.preventDefault();
    onSeek(getSeekRatio(e.clientX));
    const move = (ev: MouseEvent) => onSeek(getSeekRatio(ev.clientX));
    const up   = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [onSeek, getSeekRatio]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!onSeek) return;
    onSeek(getSeekRatio(e.touches[0].clientX));
    const move = (ev: TouchEvent) => onSeek(getSeekRatio(ev.touches[0].clientX));
    const end  = () => { window.removeEventListener("touchmove", move); window.removeEventListener("touchend", end); };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
  }, [onSeek, getSeekRatio]);

  return (
    <div style={{
      position: "relative", overflow: "hidden",
      borderBottom: "1px solid hsl(var(--vow-yellow)/.12)",
      background: "linear-gradient(155deg, hsl(var(--vow-yellow)/.07) 0%, hsl(var(--vow-yellow)/.02) 50%, transparent 100%)",
      flexShrink: 0,
      animation: reduced ? "none" : "card-enter 280ms ease-out both",
    }}>
      {/* Oversized watermark numeral */}
      <div style={{
        position: "absolute", right: "-4px", top: "-16px",
        fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
        fontSize: "100px", fontWeight: 300, lineHeight: 1,
        color: "hsl(var(--vow-yellow)/.045)",
        userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em",
      }} aria-hidden="true">
        {pad2(localIdx)}
      </div>

      <div style={{ padding: "16px 20px 0", position: "relative" }}>
        {/* Top meta row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
              background: C.gold,
              boxShadow: "0 0 6px hsl(var(--vow-yellow)/.65), 0 0 14px hsl(var(--vow-yellow)/.18)",
              animation: reduced ? "none" : "dot-pulse 2.2s ease-in-out infinite alternate",
            }} aria-hidden="true" />
            <span style={{
              fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase" as const,
              color: C.faint,
            }}>
              Now playing · {category.label}
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "9px",
            fontVariantNumeric: "tabular-nums", color: C.ghost,
            letterSpacing: "0.06em",
          }}>
            {pad2(localIdx)}<span style={{ opacity: 0.4 }}>/</span>{String(localTotal).padStart(2, "0")}
          </span>
        </div>

        {/* Track title */}
        <p style={{
          fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
          fontSize: "22px", fontStyle: "italic", fontWeight: 400,
          lineHeight: 1.15, color: C.gold,
          margin: "0 0 14px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {track.title}
        </p>

        {/* Spectrum */}
        <SpectrumWaveform active reduced={reduced} />
      </div>

      {/* Scrubber — expanded hit zone 36px, track expands on hover */}
      <div
        ref={scrubRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setScrubHover(true)}
        onMouseLeave={() => setScrubHover(false)}
        role="slider"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Seek"
        style={{
          position: "relative", height: "32px",
          margin: "10px 0 0", padding: "0 20px",
          cursor: onSeek ? "pointer" : "default",
          display: "flex", alignItems: "center",
        }}
      >
        {/* Track */}
        <div style={{
          position: "absolute", left: "20px", right: "20px",
          height: scrubHover ? "4px" : "2px",
          borderRadius: "2px",
          background: "hsl(var(--vow-yellow)/.10)",
          overflow: "hidden",
          transition: "height 140ms ease",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            width: `${pct}%`,
            background: "linear-gradient(90deg, hsl(var(--vow-yellow)/.55), hsl(var(--vow-yellow)))",
            boxShadow: pct > 1 ? "0 0 8px hsl(var(--vow-yellow)/.45)" : "none",
            transition: "width 250ms linear",
          }} />
        </div>
        {/* Thumb — visible only on hover */}
        <div style={{
          position: "absolute",
          left: `calc(20px + (100% - 40px) * ${pct / 100} - 5px)`,
          width: "10px", height: "10px", borderRadius: "50%",
          background: C.gold,
          boxShadow: "0 0 10px hsl(var(--vow-yellow)/.7)",
          opacity: scrubHover && pct > 0 ? 1 : 0,
          transform: `scale(${scrubHover && pct > 0 ? 1 : 0.3})`,
          transition: "opacity 140ms ease, transform 140ms ease, left 250ms linear",
          pointerEvents: "none",
        }} aria-hidden="true" />
      </div>

      {/* Time row */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px 2px" }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "10px",
          fontVariantNumeric: "tabular-nums", color: C.warm, letterSpacing: "0.04em",
        }}>
          {fmt(progress)}
        </span>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "10px",
          fontVariantNumeric: "tabular-nums", color: C.faint, letterSpacing: "0.04em",
        }}>
          {duration > 0 ? `\u2212${fmt(remaining)}` : (track.duration ?? "\u2014")}
        </span>
      </div>

      {/* Transport controls */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "28px", padding: "10px 20px 16px",
      }}>
        {/* Prev */}
        <button
          onClick={onPrev}
          aria-label="Previous track"
          disabled={!canPrev}
          style={{
            background: "none", border: "none", padding: "6px",
            cursor: canPrev ? "pointer" : "default",
            color: canPrev ? C.warm : C.ghost,
            opacity: canPrev ? 1 : 0.28,
            transition: "color 130ms, opacity 130ms, transform 80ms",
            display: "flex", alignItems: "center",
          }}
          onMouseEnter={(e) => { if (canPrev) e.currentTarget.style.color = C.ivory; }}
          onMouseLeave={(e) => { if (canPrev) e.currentTarget.style.color = C.warm; }}
        >
          <IconSkipBack />
        </button>

        {/* Play / Pause — center, always gold */}
        <button
          onClick={onPlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={{
            background: "none", border: "none", padding: "4px",
            cursor: "pointer",
            color: C.gold,
            transition: "color 130ms, transform 80ms",
            display: "flex", alignItems: "center",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.ivory; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.gold; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.86)"; }}
          onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          aria-label="Next track"
          disabled={!canNext}
          style={{
            background: "none", border: "none", padding: "6px",
            cursor: canNext ? "pointer" : "default",
            color: canNext ? C.warm : C.ghost,
            opacity: canNext ? 1 : 0.28,
            transition: "color 130ms, opacity 130ms, transform 80ms",
            display: "flex", alignItems: "center",
          }}
          onMouseEnter={(e) => { if (canNext) e.currentTarget.style.color = C.ivory; }}
          onMouseLeave={(e) => { if (canNext) e.currentTarget.style.color = C.warm; }}
        >
          <IconSkipForward />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GENRE CARD — name-first hierarchy
   ═══════════════════════════════════════════════════════════════════════════ */

interface GenreCardProps {
  cat:        Category;
  isActive:   boolean;
  reduced:    boolean;
  idx:        number;
  rowDur:     number;
  rowStagger: number;
  onClick:    (id: string) => void;
}

function GenreCard({ cat, isActive, reduced, idx, rowDur, rowStagger, onClick }: GenreCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(cat.id); }}
      className="focus-visible:outline-none text-left"
      style={{
        position: "relative", width: "100%",
        padding: "14px 14px 12px",
        background: isActive
          ? `radial-gradient(ellipse at 10% 90%, hsl(var(--vow-yellow)/.10) 0%, ${C.bgCard} 65%)`
          : hovered ? C.bgCardHover : C.bgCard,
        border: `1px solid ${isActive ? C.borderActive : hovered ? "hsl(var(--vow-yellow)/.14)" : C.borderCard}`,
        borderRadius: "10px", overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isActive
          ? `0 4px 20px hsl(var(--vow-yellow)/.07), inset 0 1px 0 hsl(var(--vow-yellow)/.09)`
          : hovered
            ? `0 8px 28px hsl(0 0% 0% / .40), inset 0 1px 0 hsl(40 20% 88% / .05)`
            : `0 2px 8px hsl(0 0% 0% / .22), inset 0 1px 0 hsl(40 20% 88% / .03)`,
        transition: "background 160ms, border-color 160ms, transform 160ms, box-shadow 160ms",
        animation: reduced ? "none" : `row-enter ${rowDur}ms ${T.out} ${idx * rowStagger}ms both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Watermark initial — bottom-right */}
      <div style={{
        position: "absolute", right: "-2px", bottom: "-10px",
        fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
        fontSize: "62px", fontWeight: 300, fontStyle: "italic", lineHeight: 1,
        color: isActive ? "hsl(var(--vow-yellow)/.09)" : "hsl(var(--vow-yellow)/.04)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 160ms",
      }} aria-hidden="true">
        {cat.initial}
      </div>

      {/* Name — hero, first thing you read */}
      <p style={{
        fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
        fontSize: "18px", fontStyle: "italic", fontWeight: 400, lineHeight: 1.1,
        color: isActive ? C.gold : C.ivory,
        margin: "0 0 3px",
        transition: "color 160ms",
      }}>
        {cat.label}
      </p>

      {/* Descriptor */}
      <p style={{
        fontFamily: "var(--font-sans, 'Inter', sans-serif)",
        fontSize: "9px", fontWeight: 500,
        letterSpacing: "0.07em", textTransform: "uppercase" as const,
        color: isActive ? "hsl(var(--vow-yellow)/.45)" : C.faint,
        lineHeight: 1, margin: "0 0 10px",
        transition: "color 160ms",
      }}>
        {cat.descriptor}
      </p>

      {/* Footer row: dot/waveform + track count + chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{
          width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0,
          background: isActive ? C.gold : C.ghost,
          boxShadow: isActive ? "0 0 5px hsl(var(--vow-yellow)/.5)" : "none",
          transition: "background 160ms, box-shadow 160ms",
        }} aria-hidden="true" />
        {isActive && <MiniWaveform active reduced={reduced} />}
        <span style={{ flex: 1 }} />
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "9px",
          letterSpacing: "0.06em",
          color: isActive ? "hsl(var(--vow-yellow)/.55)" : C.ghost,
          transition: "color 160ms",
        }}>
          {cat.tracks.length} pieces
        </span>
        {/* Chevron */}
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: isActive ? "hsl(var(--vow-yellow)/.55)" : "hsl(40 8% 28%)", flexShrink: 0, transition: "color 160ms, transform 150ms", transform: hovered ? "translateX(2px)" : "none" }}>
          <path d="M3 1.5L7.5 5.5L3 9.5" />
        </svg>
      </div>

      {/* Active bottom accent */}
      {isActive && (
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)/.4), transparent)",
          borderRadius: "0 0 10px 10px",
        }} aria-hidden="true" />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRACK ROW — play icon replaces track number on hover
   ═══════════════════════════════════════════════════════════════════════════ */

interface TrackRowProps {
  track:      Track;
  localIdx:   number;
  localTotal: number;
  isActive:   boolean;
  hasSrc:     boolean;
  progress:   number;
  duration:   number;
  reduced:    boolean;
  animDelay:  number;
  rowDur:     number;
  onSelect:   () => void;
}

function TrackRow({ track, localIdx, localTotal, isActive, hasSrc, progress, duration, reduced, animDelay, rowDur, onSelect }: TrackRowProps) {
  const [hovered, setHovered] = useState(false);
  const pct = isActive && duration > 0 ? (progress / duration) * 100 : 0;
  const showPlayIcon = hovered && hasSrc && !isActive;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); if (hasSrc) onSelect(); }}
      aria-current={isActive ? "true" : undefined}
      aria-disabled={!hasSrc}
      style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: "10px",
        width: "100%", padding: "13px 20px",
        background: isActive ? C.activeRow : hovered && hasSrc ? C.hoverRow : "transparent",
        cursor: hasSrc ? "pointer" : "default",
        transition: "background 140ms ease",
        animation: reduced ? "none" : `row-enter ${rowDur}ms ${T.out} ${animDelay}ms both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number / Play icon slot — crossfade on hover */}
      <span style={{ position: "relative", width: "16px", height: "16px", flexShrink: 0 }}>
        {/* Track number */}
        <span style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          fontFamily: "var(--font-sans)", fontSize: "10px",
          fontVariantNumeric: "tabular-nums",
          color: isActive ? "hsl(var(--vow-yellow)/.65)" : C.ghost,
          opacity: showPlayIcon ? 0 : 1,
          transition: "opacity 140ms ease, color 160ms",
        }}>
          {pad2(localIdx)}
        </span>
        {/* Play icon — appears on hover for playable tracks */}
        <span style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.warm,
          opacity: showPlayIcon ? 1 : 0,
          transition: "opacity 140ms ease",
        }} aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" stroke="none">
            <path d="M2 1.5L10 5.5L2 9.5V1.5Z" />
          </svg>
        </span>
      </span>

      {/* Gold accent bar */}
      <span style={{
        width: "2px", flexShrink: 0, borderRadius: "1px",
        height: isActive ? "18px" : "2px",
        background: isActive ? C.gold : C.ghost,
        boxShadow: isActive ? "0 0 6px hsl(var(--vow-yellow)/.4)" : "none",
        transition: `height 220ms ${T.spring}, background 180ms, box-shadow 180ms`,
      }} aria-hidden="true" />

      {/* Title + duration */}
      <span style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{
          fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
          fontSize: "15px", fontStyle: "italic", lineHeight: 1.3,
          color: !hasSrc ? C.ghost : isActive ? C.gold : hovered ? C.ivory : C.ivory,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          flex: 1,
          transition: "color 160ms",
        }}>
          {track.title}
        </span>
        {!hasSrc ? (
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "9px",
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
            color: C.ghost, flexShrink: 0,
          }}>
            soon
          </span>
        ) : (
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "10px",
            fontVariantNumeric: "tabular-nums",
            color: isActive ? "hsl(var(--vow-yellow)/.45)" : C.ghost,
            flexShrink: 0, letterSpacing: "0.03em",
            opacity: isActive || hovered ? 1 : 0.55,
            transition: "color 160ms, opacity 160ms",
          }}>
            {track.duration ?? "\u2014"}
          </span>
        )}
      </span>

      {isActive && <MiniWaveform active reduced={reduced} />}

      {/* Progress strip */}
      {isActive && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "hsl(var(--vow-yellow)/.07)",
        }} aria-hidden="true">
          <div style={{ height: "100%", width: `${pct}%`, background: "hsl(var(--vow-yellow)/.5)", transition: "width 250ms linear" }} />
        </div>
      )}

      {/* Separator — indented, not edge-to-edge */}
      {localIdx < localTotal - 1 && (
        <div style={{ position: "absolute", bottom: 0, left: "48px", right: "20px", height: "1px", background: C.divider }} aria-hidden="true" />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

type NavDir = "initial" | "forward" | "back";

export interface PianoPanelProps {
  isOpen:           boolean;
  onClose:          () => void;
  activeTrackIndex: number | null;
  onSelectTrack:    (globalIndex: number) => void;
  reduced:          boolean;
  progress?:        number;
  duration?:        number;
  isPlaying?:       boolean;
  onSeek?:          (ratio: number) => void;
  onPlayPause?:     () => void;
  onPrev?:          () => void;
  onNext?:          () => void;
}

export default function PianoPanel({
  isOpen, onClose, activeTrackIndex, onSelectTrack, reduced,
  progress = 0, duration = 0, isPlaying = false,
  onSeek, onPlayPause, onPrev, onNext,
}: PianoPanelProps) {
  const outerRef    = useRef<HTMLDivElement>(null);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [view,    setView   ] = useState<"genres" | "tracks">("genres");
  const [catId,   setCatId  ] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [epoch,   setEpoch  ] = useState(0);
  const [panelH,  setPanelH ] = useState(0);
  const [navDir,  setNavDir ] = useState<NavDir>("initial");

  const shownCat = catId ? categories.find((c) => c.id === catId) ?? null : null;
  const catStart = catId ? getCategoryStart(catId) : 0;

  const canPrev = activeTrackIndex !== null && activeTrackIndex > 0;
  const canNext = activeTrackIndex !== null && activeTrackIndex < allTracks.length - 1;

  useLayoutEffect(() => {
    if (!outerRef.current) return;
    const h = outerRef.current.scrollHeight;
    if (h > 4) setPanelH(h);
  }, [view, isOpen, activeTrackIndex !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useCallback((nextView: "genres" | "tracks", nextCatId: string | null, dir: NavDir) => {
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    setNavDir(dir);
    setVisible(false);
    navTimerRef.current = setTimeout(() => {
      setView(nextView);
      setCatId(nextCatId);
      setEpoch((e) => e + 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 120);
  }, []);

  const toTracks = useCallback((id: string) => navigate("tracks", id, "forward"), [navigate]);
  const toGenres = useCallback(()            => navigate("genres", null, "back"), [navigate]);

  useEffect(() => {
    if (isOpen) { setNavDir("initial"); setEpoch((e) => e + 1); setVisible(true); }
    else {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      const t = setTimeout(() => setVisible(true), 260);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      view === "tracks" ? toGenres() : onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, onClose, view, toGenres]);

  // Directional transition: slide from right on forward, left on back
  const xEnter = navDir === "forward" ? 6 : navDir === "back" ? -6 : 0;
  const rowDur     = reduced ? 0 : 150;
  const rowStagger = reduced ? 0 : 32;

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes sw-bar   { 0%{height:var(--h-idle)} 100%{height:var(--h-max)} }
        @keyframes mw-bar   { 0%{height:var(--h-idle)} 100%{height:var(--h-max)} }
        @keyframes row-enter  { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        @keyframes card-enter { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes dot-pulse  {
          0%  { box-shadow:0 0 5px hsl(var(--vow-yellow)/.4); }
          100%{ box-shadow:0 0 10px hsl(var(--vow-yellow)/.75), 0 0 22px hsl(var(--vow-yellow)/.18); }
        }
        @keyframes idle-glow  { 0%{opacity:0.42} 100%{opacity:0.68} }
      `}</style>

      {isOpen && (
        <div className="fixed inset-0 z-29" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-hidden="true" />
      )}

      {/* ════════════════════════════════════════════════════════════════
          PANEL — backdrop-filter glass over cinematic video
          ════════════════════════════════════════════════════════════════ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Listening Room"
        data-theme="death"
        className={cn(
          "fixed z-30 overflow-hidden rounded-2xl flex flex-col",
          "bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]",
          "left-1/2 -translate-x-1/2",
          "w-[calc(100vw-24px)] max-w-[420px]",
          "md:bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))]",
          "md:left-6 md:translate-x-0 md:w-[360px] md:max-w-none",
        )}
        style={{
          background:       C.bg,
          backdropFilter:   "blur(24px) saturate(130%) brightness(0.65)",
          WebkitBackdropFilter: "blur(24px) saturate(130%) brightness(0.65)",
          border: `1px solid ${C.border}`,
          boxShadow: [
            "inset 0 1px 0 hsl(40 20% 88% / 0.06)",
            "0 40px 100px hsl(0 0% 0% / 0.75)",
            "0 0 0 1px hsl(0 0% 0% / 0.40)",
            "0 0 60px hsl(var(--vow-yellow) / 0.04)",
          ].join(", "),
          opacity:   isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : reduced ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          transition: isOpen
            ? `opacity 260ms ${T.spring}, transform 260ms ${T.spring}`
            : `opacity 180ms ${T.in}, transform 180ms ${T.in}`,
          pointerEvents:   isOpen ? "auto" : "none",
          transformOrigin: "bottom center",
        }}
      >
        <PianoStrings visible={isOpen} />

        {/* Top gold hairline */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: "1px" }} aria-hidden="true">
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, hsl(var(--vow-yellow)/.10) 15%, hsl(var(--vow-yellow)/.30) 35%, hsl(var(--vow-yellow)/.40) 50%, hsl(var(--vow-yellow)/.30) 65%, hsl(var(--vow-yellow)/.10) 85%, transparent 100%)",
          }} />
        </div>

        {/* ── Header ── */}
        <div style={{
          position: "relative", flexShrink: 0,
          borderBottom: "1px solid hsl(var(--vow-yellow)/.07)",
          height: "54px", zIndex: 10,
        }}>
          {/* State A — Genre list */}
          <div style={{
            position: "absolute", inset: 0, padding: "0 20px",
            display: "flex", flexDirection: "column" as const, justifyContent: "center",
            opacity: view === "genres" ? 1 : 0,
            transform: view === "genres" ? "none" : "translateX(-6px)",
            transition: reduced ? "none" : "opacity 130ms ease, transform 130ms ease",
            pointerEvents: view === "genres" ? "auto" : "none",
          }} aria-hidden={view !== "genres"}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {activeTrackIndex !== null && (
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                    background: C.gold,
                    boxShadow: "0 0 7px hsl(var(--vow-yellow)/.55)",
                    animation: reduced ? "none" : "dot-pulse 2.2s ease-in-out infinite alternate",
                  }} aria-hidden="true" />
                )}
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.warm,
                }}>
                  Listening Room
                </span>
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: C.ghost, fontVariantNumeric: "tabular-nums" }}>
                {allTracks.length} pieces
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontSize: "11px", fontStyle: "italic", color: C.faint,
              marginTop: "4px", lineHeight: 1,
              opacity: activeTrackIndex === null ? 1 : 0,
              transition: reduced ? "none" : "opacity 220ms ease",
              animation: activeTrackIndex === null && !reduced ? "idle-glow 4s ease-in-out infinite alternate" : "none",
            }}>
              Select a piece to hear a sample
            </p>
          </div>

          {/* State B — Track list */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            opacity: view === "tracks" ? 1 : 0,
            transform: view === "tracks" ? "none" : "translateX(6px)",
            transition: reduced ? "none" : `opacity 130ms ease ${view === "tracks" ? "50ms" : "0ms"}, transform 130ms ease ${view === "tracks" ? "50ms" : "0ms"}`,
            pointerEvents: view === "tracks" ? "auto" : "none",
          }} aria-hidden={view !== "tracks"}>
            <button
              onClick={toGenres}
              tabIndex={view === "tracks" ? 0 : -1}
              className="self-stretch flex items-center gap-1.5 pl-4 pr-5 group/back focus-visible:outline-none"
              aria-label="Back to genres"
            >
              <ChevronLeft
                size={13} strokeWidth={2}
                className={cn("flex-shrink-0 transition-transform duration-150", !reduced && "group-hover/back:-translate-x-[2px]")}
                style={{ color: "hsl(var(--vow-yellow)/.65)" }}
              />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.warm }}>
                Genres
              </span>
            </button>
            <div style={{ paddingRight: "20px", textAlign: "right" as const }}>
              <p style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)", fontSize: "15px", fontStyle: "italic", color: C.ivory, lineHeight: 1.1, margin: 0 }}>
                {shownCat?.label}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.07em", textTransform: "uppercase" as const, color: C.faint, margin: "2px 0 0" }}>
                {shownCat?.descriptor}
              </p>
            </div>
          </div>
        </div>

        {/* ── Content — height animated, directional transitions ── */}
        <div style={{
          position: "relative", zIndex: 10, overflow: "hidden",
          height: panelH > 0 ? `${panelH}px` : "auto",
          transition: reduced ? "none" : `height 200ms ${T.out}`,
        }}>
          <div ref={outerRef}>
            {/* Now Playing Card — keyed on trackIndex so it re-animates on track change */}
            {activeTrackIndex !== null && (
              <NowPlayingCard
                key={activeTrackIndex}
                trackIndex={activeTrackIndex}
                progress={progress}
                duration={duration}
                reduced={reduced}
                isPlaying={isPlaying}
                canPrev={canPrev}
                canNext={canNext}
                onSeek={onSeek}
                onPlayPause={onPlayPause ?? (() => {})}
                onPrev={onPrev ?? (() => {})}
                onNext={onNext ?? (() => {})}
              />
            )}

            {/* Directional content crossfade */}
            <div style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "none" : `translateX(${xEnter}px)`,
              transition: reduced ? "none" : "opacity 120ms ease, transform 120ms ease",
            }}>
              {view === "genres" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "12px" }}>
                  {categories.map((cat, idx) => {
                    const start    = getCategoryStart(cat.id);
                    const isActive = activeTrackIndex !== null && activeTrackIndex >= start && activeTrackIndex < start + cat.tracks.length;
                    const lastOdd  = categories.length % 2 !== 0 && idx === categories.length - 1;
                    return (
                      <div key={`${cat.id}-${epoch}`} style={{ gridColumn: lastOdd ? "1 / -1" : undefined }}>
                        <GenreCard cat={cat} isActive={isActive} reduced={reduced} idx={idx} rowDur={rowDur} rowStagger={rowStagger} onClick={toTracks} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ paddingTop: "6px", paddingBottom: "8px" }}>
                  {shownCat?.tracks.map((track, tIdx) => {
                    const globalIdx = catStart + tIdx;
                    const isActive  = activeTrackIndex === globalIdx;
                    return (
                      <TrackRow
                        key={`${track.title}-${epoch}`}
                        track={track}
                        localIdx={tIdx}
                        localTotal={shownCat.tracks.length}
                        isActive={isActive}
                        hasSrc={!!track.src}
                        progress={progress}
                        duration={duration}
                        reduced={reduced}
                        animDelay={tIdx * rowStagger}
                        rowDur={rowDur}
                        onSelect={() => onSelectTrack(globalIdx)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <PianoKeysFoot />

        {/* Caret */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0"
          style={{ bottom: "-9px", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `9px solid ${C.border}`, pointerEvents: "none" }}
          aria-hidden="true" />
        <div className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0"
          style={{ bottom: "-7px", width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `8px solid ${C.bgSolid}`, pointerEvents: "none" }}
          aria-hidden="true" />
      </div>
    </>
  );
}
