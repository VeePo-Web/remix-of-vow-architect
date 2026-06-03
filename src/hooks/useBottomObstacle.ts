import { useEffect, useId } from "react";
import { registerObstacle, scheduleRecompute } from "@/lib/mobileBottomObstacles";

/**
 * Register a sticky bottom element so floating UI (like the audio pill)
 * can lift above it. Pass `isVisible=false` to report 0 without unmounting.
 */
export function useBottomObstacle(
  ref: React.RefObject<HTMLElement>,
  isVisible: boolean,
) {
  const uid = useId();

  useEffect(() => {
    const unregister = registerObstacle(uid, () => {
      const el = ref.current;
      if (!el || !isVisible) return 0;
      return el.offsetHeight;
    });
    scheduleRecompute();

    const ro = ref.current ? new ResizeObserver(scheduleRecompute) : null;
    if (ro && ref.current) ro.observe(ref.current);
    window.addEventListener('resize', scheduleRecompute);
    return () => {
      unregister();
      ro?.disconnect();
      window.removeEventListener('resize', scheduleRecompute);
    };
  }, [ref, isVisible, uid]);
}