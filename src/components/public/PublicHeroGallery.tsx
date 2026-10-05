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

    const scheduleNext = () => {
      window.clearTimeout(timeoutId);
      if (document.hidden) return;

      timeoutId = window.setTimeout(() => {
        setPreviousIndex(activeIndex);
        setActiveIndex((activeIndex + 1) % publicHeroGallery.length);
      }, PUBLIC_HERO_INTERVAL_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) window.clearTimeout(timeoutId);
      else scheduleNext();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleNext();

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timeoutId = window.setTimeout(() => setPreviousIndex(null), 1_200);
    return () => window.clearTimeout(timeoutId);
  }, [previousIndex]);

  const nextImage = publicHeroGallery[(activeIndex + 1) % publicHeroGallery.length];

  useEffect(() => {
    if (!nextImage || prefersReducedMotion()) return;
    const preload = new Image();
    preload.src = nextImage.src;
  }, [nextImage]);

  const activeImage = publicHeroGallery[activeIndex];
  if (!activeImage) return null;

  const previousImage = previousIndex === null ? null : publicHeroGallery[previousIndex];

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
      <div className="public-hero__photo-meta" aria-hidden="true">
        <p className="public-hero__caption">{activeImage.heroCaption}</p>
        <p className="public-hero__position">
          {String(activeIndex + 1).padStart(2, "0")} / {String(publicHeroGallery.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}