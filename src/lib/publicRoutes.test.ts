import { describe, expect, it } from "vitest";
import { PUBLIC_SERVICES } from "@/pages/PublicLanding";
import { isPublicRoute, PUBLIC_ROUTES } from "@/lib/publicRoutes";

describe("temporary public website rules", () => {
  it("exposes exactly the contact landing and gallery", () => {
    expect(PUBLIC_ROUTES).toEqual(["/", "/gallery"]);
    expect(isPublicRoute("/gallery/")).toBe(true);
  });

  it.each(["/weddings", "/events", "/teaching", "/pricing", "/contact", "/privacy-policy"])(
    "keeps %s outside the public allowlist",
    (route) => expect(isPublicRoute(route)).toBe(false),
  );

  it("offers the three requested inquiry types", () => {
    expect(PUBLIC_SERVICES).toEqual(["weddings", "events", "teaching"]);
  });
});