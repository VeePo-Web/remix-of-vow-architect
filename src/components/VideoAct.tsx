import { useRef, useCallback, useState } from 'react';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { cn } from '@/lib/utils';
import type { ScrollTextItem } from '@/config/videoActsConfig';
import { TEXT_OVERLAYS, VIDEO_SRC, VIDEO_POSTER, SCROLL_HEIGHT } from '@/config/videoActsConfig';
import { PetalCursorTrail } from './PetalCursorTrail';

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CinematicScroll — Single Continuous Video Experience         ║
 * ║                                                                ║
 * ║  One 76-second video. One scroll zone (2800vh). All text      ║
 * ║  overlays at precise % positions. Zero section breaks.        ║
 * ║  Zero React re-renders during scroll.                         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

function calcTextStyle(item: ScrollTextItem, progress: number) {
  const range = item.exitAt - item.enterAt;
  // Cap fade durations at 0.03 (3% scroll) so hold-forever items (exitAt: 1.5) fade in quickly
  const fadeIn = Math.min(range * 0.22, 0.03);
  const fadeOut = Math.min(range * 0.22, 0.03);
  const fadeInEnd = item.enterAt + fadeIn;
  const fadeOutStart = item.exitAt - fadeOut;

  let opacity = 0;
  if (progress < item.enterAt || progress > item.exitAt) {
    opacity = 0;
  } else if (progress < fadeInEnd) {
    opacity = (progress - item.enterAt) / fadeIn;
  } else if (progress > fadeOutStart) {
    opacity = 1 - (progress - fadeOutStart) / fadeOut;
  } else {
    opacity = 1;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  const inP = Math.max(0, Math.min(1, (progress - item.enterAt) / fadeIn));
  let transform = '';
  const anim = item.animation || 'fade-up';
  if (anim === 'fade-up') transform = `translateY(${(1 - inP) * 24}px)`;
  else if (anim === 'scale') transform = `scale(${0.93 + inP * 0.07})`;

  return { opacity, transform };
}

const posClasses: Record<string, string> = {
  center: 'items-center justify-center text-center',
  left: 'items-start justify-center text-left pl-[6%] md:pl-[10%] lg:pl-[12%]',
  right: 'items-end justify-center text-right pr-[6%] md:pr-[10%] lg:pr-[12%]',
};

export function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [petalsActive, setPetalsActive] = useState(false);
  const petalsActiveRef = useRef(false);

  const onProgress = useCallback((progress: number) => {
    // ── Text overlays ──
    TEXT_OVERLAYS.forEach((item, i) => {
      const el = textRefs.current[i];
      if (!el) return;
      const { opacity, transform } = calcTextStyle(item, progress);
      el.style.opacity = String(opacity);
      el.style.transform = transform;
      el.style.visibility = opacity < 0.005 ? 'hidden' : 'visible';
    });

    // ── ACT VIII radiance lift — video brightens to full luminance ──
    // Ramps from 0.905 (ACT VIII start) to 0.97 (peak)
    const liftStart = 0.905;
    const liftEnd = 0.97;
    const lift = Math.max(0, Math.min(1, (progress - liftStart) / (liftEnd - liftStart)));

    if (videoRef.current) {
      // opacity: 0.55 → 0.92, brightness: 0.55 → 1.0, saturate: 0.85 → 1.0, blur: 1px → 0px
      const op = 0.55 + lift * 0.37;
      const br = 0.55 + lift * 0.45;
      const sat = 0.85 + lift * 0.15;
      const bl = 1 - lift;
      videoRef.current.style.opacity = String(op);
      videoRef.current.style.filter = `brightness(${br}) saturate(${sat}) blur(${bl}px)`;
    }
    if (vignetteRef.current) {
      // Fade vignette out during final scene
      vignetteRef.current.style.opacity = String(1 - lift * 0.85);
    }
    if (grainRef.current) {
      // Kill grain completely in final scene
      grainRef.current.style.opacity = String(0.04 * (1 - lift));
    }

    // ── Petal cursor trail — activates at the final "I do." frame ──
    const shouldPetals = progress >= 0.98;
    if (shouldPetals !== petalsActiveRef.current) {
      petalsActiveRef.current = shouldPetals;
      setPetalsActive(shouldPetals);
    }
  }, []);

  const { isVideoReady } = useVideoScrub({
    containerRef,
    videoRef,
    onProgress,
  });

  return (
    <>
    <PetalCursorTrail active={petalsActive} />
    <div
      id="weddings-cinema"
      ref={containerRef}
      className="video-act"
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="video-act__sticky">

        {/* Poster */}
        <div
          className="video-act__poster"
          style={{
            backgroundImage: `url(${VIDEO_POSTER})`,
            opacity: isVideoReady ? 0 : 1,
            transition: 'opacity 600ms ease',
          }}
          aria-hidden="true"
        />

        {/* Single continuous video */}
        <video
          ref={videoRef}
          className="video-act__video"
          muted
          playsInline
          preload="auto"
          poster={VIDEO_POSTER}
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 600ms ease',
          }}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Vignette */}
        <div ref={vignetteRef} className="video-act__vignette" aria-hidden="true" />

        {/* Film grain */}
        <div ref={grainRef} className="video-act__grain grain" aria-hidden="true" />

        {/* ── Luxury text overlays ── */}
        {TEXT_OVERLAYS.map((item, i) => (
          <div
            key={`text-${i}`}
            ref={(el) => { textRefs.current[i] = el; }}
            className={cn(
              'absolute inset-0 flex flex-col z-10',
              item.isCta ? 'pointer-events-auto' : 'pointer-events-none',
              posClasses[item.position || 'center'],
            )}
            style={{ opacity: 0, visibility: 'hidden', willChange: 'opacity, transform' }}
          >
            {/* ── Ornamental divider (diamond + golden rules) ── */}
            {item.isDivider ? (
              <div className="luxury-divider">
                <div className="luxury-rule--wide luxury-rule" />
                <div className="luxury-diamond" />
                <div className="luxury-rule--wide luxury-rule" />
              </div>

            /* ── Scroll cue ── */
            ) : item.isScrollCue ? (
              <div className="scroll-cue">
                <span>{item.text}</span>
                <div className="scroll-cue__arrow" />
              </div>

            /* ── CTA button ── */
            ) : item.isCta ? (
              <a
                href={item.href || '/contact'}
                className={cn('max-w-[90vw]', item.className)}
              >
                {item.text}
              </a>

            /* ── Standard text with luxury card treatment ── */
            ) : item.hasHtml ? (
              <div
                className={cn(
                  'max-w-[90vw]',
                  'luxury-card',
                  item.isGlass && 'luxury-card--glass',
                  item.hasGlow && 'luxury-glow',
                  item.className,
                )}
                dangerouslySetInnerHTML={{
                  __html: item.text.split('\n').map(line => `<span class="block">${line}</span>`).join(''),
                }}
              />
            ) : (
              <div className={cn(
                'max-w-[90vw]',
                'luxury-card',
                item.isGlass && 'luxury-card--glass',
                item.hasGlow && 'luxury-glow',
                item.className,
              )}>
                {item.text.split('\n').map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
