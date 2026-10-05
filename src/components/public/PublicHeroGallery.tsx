import { useEffect, useState } from "react";
import { publicHeroGallery } from "@/data/publicGallery";

export const PUBLIC_HERO_INTERVAL_MS = 5_000;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PublicHeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    if (publicHeroGallery.length < 2 || prefersReducedMotion()) return;

    let timeoutId: number | undefined;
    let cancelled = false;

    const scheduleNext = () => {
      window.clearTimeout(timeoutId);
      if (document.hidden || cancelled) return;

      timeoutId = window.setTimeout(() => {
        setActiveIndex((currentIndex) => {
          const nextIndex = (currentIndex + 1) % publicHeroGallery.length;
          const nextImage = new Image();
          nextImage.src = publicHeroGallery[nextIndex].src;
          nextImage.decode().catch(() => undefined).then(() => {
            if (cancelled) return;
            setPreviousIndex(currentIndex);
            setActiveIndex(nextIndex);
            scheduleNext();
          });
          return currentIndex;
        });
      }, PUBLIC_HERO_INTERVAL_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) window.clearTimeout(timeoutId);
      else scheduleNext();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleNext();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (previousIndex === null) return;
    const timeoutId = window.setTimeout(() => setPreviousIndex(null), 1_200);
    return () => window.clearTimeout(timeoutId);
  }, [previousIndex]);

  const activeImage = publicHeroGallery[activeIndex];
  if (!activeImage) return null;

  const previousImage = previousIndex === null ? null : publicHeroGallery[previousIndex];
  const nextImage = publicHeroGallery[(activeIndex + 1) % publicHeroGallery.length];

  return (
    <div className="public-hero-gallery">
      {previousImage && (
        <img
          className={`public-hero__image public-hero__image--previous ${previousImage.heroClassName}`}
          src={previousImage.src}
          alt=""
          aria-hidden="true"
        />
      )}
      <img
        key={activeImage.src}
        className={`public-hero__image public-hero__image--active ${activeImage.heroClassName}`}
        src={activeImage.src}
        alt={activeImage.alt}
        fetchPriority={activeIndex === 0 ? "high" : "auto"}
      />
      {nextImage && <link rel="preload" as="image" href={nextImage.src} />}
      <div className="public-hero__photo-meta" aria-hidden="true">
        <p className="public-hero__caption">{activeImage.heroCaption}</p>
        <p className="public-hero__position">
          {String(activeIndex + 1).padStart(2, "0")} / {String(publicHeroGallery.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}