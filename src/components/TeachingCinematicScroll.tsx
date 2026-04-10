import { useRef, useCallback } from 'react';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { cn } from '@/lib/utils';
import type { ScrollTextItem } from '@/config/videoActsConfig';
import {
  TEACHING_TEXT_OVERLAYS,
  TEACHING_VIDEO_SRC,
  TEACHING_VIDEO_POSTER,
  TEACHING_SCROLL_HEIGHT,
} from '@/config/teachingVideoActsConfig';

/**
 * TeachingCinematicScroll — Same architecture as CinematicScroll (weddings)
 * but driven by the teaching config. One 80-second video, one scroll zone,
 * all text overlays at precise % positions. Zero React re-renders during scroll.
 */

function calcTextStyle(item: ScrollTextItem, progress: number) {
  const range = item.exitAt - item.enterAt;
  const fadeIn = range * 0.22;
  const fadeOut = range * 0.22;
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

export function TeachingCinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onProgress = useCallback((progress: number) => {
    TEACHING_TEXT_OVERLAYS.forEach((item, i) => {
      const el = textRefs.current[i];
      if (!el) return;
      const { opacity, transform } = calcTextStyle(item, progress);
      el.style.opacity = String(opacity);
      el.style.transform = transform;
      el.style.visibility = opacity < 0.005 ? 'hidden' : 'visible';
    });
  }, []);

  const { isVideoReady } = useVideoScrub({
    containerRef,
    videoRef,
    onProgress,
  });

  return (
    <div
      id="teaching-cinema"
      ref={containerRef}
      className="video-act"
      style={{ height: TEACHING_SCROLL_HEIGHT }}
    >
      <div className="video-act__sticky">

        {/* Poster */}
        <div
          className="video-act__poster"
          style={{
            backgroundImage: `url(${TEACHING_VIDEO_POSTER})`,
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
          poster={TEACHING_VIDEO_POSTER}
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 600ms ease',
          }}
          aria-hidden="true"
        >
          <source src={TEACHING_VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Vignette */}
        <div className="video-act__vignette" aria-hidden="true" />

        {/* Film grain */}
        <div className="video-act__grain grain" aria-hidden="true" />

        {/* ── Luxury text overlays ── */}
        {TEACHING_TEXT_OVERLAYS.map((item, i) => (
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
                href={item.href || '/teaching/contact'}
                className={cn('max-w-[90vw]', item.className)}
              >
                {item.text}
              </a>

            /* ── Standard text with luxury card treatment ── */
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
  );
}
