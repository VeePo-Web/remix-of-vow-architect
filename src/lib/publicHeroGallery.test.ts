import { describe, expect, it } from "vitest";
import { PUBLIC_HERO_INTERVAL_MS } from "@/components/public/PublicHeroGallery";
import { publicHeroGallery } from "@/data/publicGallery";

describe("homepage hero gallery", () => {
  it("advances on the requested five-second interval", () => {
    expect(PUBLIC_HERO_INTERVAL_MS).toBe(5_000);
  });

  it("starts with Parker at his childhood piano", () => {
    expect(publicHeroGallery[0]?.alt).toBe("Parker as a young child at his first piano");
    expect(publicHeroGallery[0]?.heroOrder).toBe(1);
  });
});