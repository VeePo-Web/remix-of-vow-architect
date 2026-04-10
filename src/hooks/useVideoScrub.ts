import { useEffect, useRef, useCallback, useState } from 'react';
import { useSmoothScroll } from '@/components/SmoothScrollProvider';

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  useVideoScrub — Scroll-Driven Video Scrubbing               ║
 * ║                                                                ║
 * ║  ZERO RE-RENDERS during scroll. Progress is stored in a ref   ║
 * ║  and communicated to children via a callback, not React state.║
 * ║  video.currentTime is set directly. All-intra keyframe videos ║
 * ║  ensure instant seeking at any position.                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

interface UseVideoScrubOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Called on every scroll frame with current progress (0–1). Use for direct DOM updates. */
  onProgress?: (progress: number) => void;
  enabled?: boolean;
  /** Cap the video time at this fraction of duration (0–1). Text overlays still run to 1.0. */
  videoEndFraction?: number;
}

interface UseVideoScrubReturn {
  /** Ref containing current progress — read this, don't use state */
  progressRef: React.RefObject<number>;
  isVideoReady: boolean;
}

export function useVideoScrub({
  containerRef,
  videoRef,
  onProgress,
  enabled = true,
  videoEndFraction = 1,
}: UseVideoScrubOptions): UseVideoScrubReturn {
  const lenis = useSmoothScroll();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const progressRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // ── Video readiness ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const check = () => {
      if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
        setIsVideoReady(true);
      }
    };

    check();
    video.addEventListener('loadedmetadata', check);
    video.addEventListener('canplay', check);
    return () => {
      video.removeEventListener('loadedmetadata', check);
      video.removeEventListener('canplay', check);
    };
  }, [videoRef]);

  // ── Progress calculation (no state, no re-render) ──
  const calcProgress = useCallback((): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = rect.height - vh;
    if (scrollable <= 0) return 0;
    return Math.max(0, Math.min(1, -rect.top / scrollable));
  }, [containerRef]);

  // ── Core scroll handler — ZERO React re-renders ──
  const tick = useCallback(() => {
    if (!enabled) return;

    const p = calcProgress();
    progressRef.current = p;

    // Set video time directly (capped by videoEndFraction)
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && video.readyState >= 1) {
      const t = Math.min(p, videoEndFraction) * video.duration;
      if (Math.abs(video.currentTime - t) > 0.01) {
        video.currentTime = t;
      }
    }

    // Notify parent for direct DOM manipulation of text overlays
    onProgressRef.current?.(p);
  }, [enabled, calcProgress, videoRef]);

  // ── IntersectionObserver: preload when section approaches ──
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.preload !== 'auto') {
          video.preload = 'auto';
          video.load();
        }
      },
      { rootMargin: '100% 0px 100% 0px', threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, videoRef]);

  // ── Scroll listener ──
  useEffect(() => {
    if (!enabled) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (lenis) {
      const handler = () => tick();
      lenis.on('scroll', handler);
      requestAnimationFrame(tick);
      return () => { lenis.off('scroll', handler); };
    } else {
      const handler = () => tick();
      window.addEventListener('scroll', handler, { passive: true });
      requestAnimationFrame(tick);
      return () => { window.removeEventListener('scroll', handler); };
    }
  }, [lenis, tick, enabled]);

  return { progressRef, isVideoReady };
}
